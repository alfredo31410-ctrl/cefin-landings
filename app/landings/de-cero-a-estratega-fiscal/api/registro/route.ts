import { NextRequest } from "next/server";
import { landingConfig as config } from "../../config";
import {
  assertEstrategaFiscalRegistrationConfigured,
  ESTRATEGA_FISCAL_REGISTRATION_COOKIE,
  ESTRATEGA_FISCAL_REGISTRATION_TTL_SECONDS,
  estrategaFiscalRegistrationCookieOptions,
  issueEstrategaFiscalRegistrationProof,
} from "@/lib/estratega-fiscal-registration";
import {
  HOTMART_ATTRIBUTION_PARAM_NAMES,
  type UtmParamName,
} from "@/lib/hotmart-utms";
import {
  getContentType,
  isSameOrigin,
  jsonNoStore,
  readBoundedUtf8Body,
} from "@/lib/registration-http";

const MAX_BODY_BYTES = 12 * 1024;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 32;
const MAX_ATTRIBUTION_LENGTH = 250;
const JSON_CONTENT_TYPE = "application/json";
const CONTROL_CHARACTER = /[\u0000-\u001f\u007f]/;
const ACTIVE_CAMPAIGN_FORM_USER = /^[A-F0-9]{13}$/i;
const ACTIVE_CAMPAIGN_FORM_ORIGIN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ALLOWED_INPUT_NAMES = new Set([
  "name",
  "email",
  "phone",
  "consent",
  "website",
  ...HOTMART_ATTRIBUTION_PARAM_NAMES,
]);

type RegistrationBody = Record<string, unknown>;

function getActiveCampaignConfiguration() {
  const activeCampaign = config.activeCampaign;
  const fieldIdsAreValid = Object.values(
    activeCampaign.attributionFieldIds,
  ).every(
    (fieldId) =>
      fieldId === null || (Number.isInteger(fieldId) && fieldId > 0),
  );

  if (
    !config.activation.registrationEnabled ||
    !config.privacy.url ||
    !activeCampaign.enabled ||
    !activeCampaign.endpoint ||
    !Number.isInteger(activeCampaign.formId) ||
    !activeCampaign.formId ||
    !activeCampaign.formUser ||
    !ACTIVE_CAMPAIGN_FORM_USER.test(activeCampaign.formUser) ||
    !activeCampaign.formOrigin ||
    !ACTIVE_CAMPAIGN_FORM_ORIGIN.test(activeCampaign.formOrigin) ||
    !fieldIdsAreValid
  ) {
    return null;
  }
  return activeCampaign;
}

function isPlainObject(value: unknown): value is RegistrationBody {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.getPrototypeOf(value) === Object.prototype,
  );
}

function getString(body: RegistrationBody, name: string) {
  const value = body[name];
  return typeof value === "string" ? value : null;
}

function normalizeText(value: string | null, maxLength: number) {
  if (!value) return null;
  const normalized = value.replace(/\s+/g, " ").trim();
  if (
    !normalized ||
    normalized.length > maxLength ||
    CONTROL_CHARACTER.test(normalized)
  ) {
    return null;
  }
  return normalized;
}

function normalizeEmail(value: string | null) {
  const normalized = value?.trim().toLowerCase() || "";
  if (
    !normalized ||
    normalized.length > MAX_EMAIL_LENGTH ||
    CONTROL_CHARACTER.test(normalized) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
  ) {
    return null;
  }
  return normalized;
}

function normalizePhone(value: string | null) {
  const trimmed = value?.trim() || "";
  if (
    !trimmed ||
    trimmed.length > MAX_PHONE_LENGTH ||
    CONTROL_CHARACTER.test(trimmed) ||
    !/^[+\d().\-\s]+$/.test(trimmed)
  ) {
    return null;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return `${trimmed.startsWith("+") ? "+" : ""}${digits}`;
}

function readAttribution(body: RegistrationBody) {
  const attribution = {} as Record<UtmParamName, string>;
  for (const name of HOTMART_ATTRIBUTION_PARAM_NAMES) {
    const rawValue = body[name];
    if (rawValue !== undefined && typeof rawValue !== "string") return null;
    const value = typeof rawValue === "string" ? rawValue.trim() : "";
    if (
      value.length > MAX_ATTRIBUTION_LENGTH ||
      CONTROL_CHARACTER.test(value)
    ) {
      return null;
    }
    attribution[name] = value;
  }
  return attribution;
}

function buildActiveCampaignParams(
  body: RegistrationBody,
  activeCampaign: NonNullable<
    ReturnType<typeof getActiveCampaignConfiguration>
  >,
) {
  if (!Object.keys(body).every((name) => ALLOWED_INPUT_NAMES.has(name))) {
    return null;
  }
  if ((getString(body, "website") || "").trim()) return null;

  const name = normalizeText(getString(body, "name"), MAX_NAME_LENGTH);
  const email = normalizeEmail(getString(body, "email"));
  const phone = normalizePhone(getString(body, "phone"));
  const consent = body.consent === true;
  const attribution = readAttribution(body);

  const nameParts = name?.split(" ").filter(Boolean) || [];
  if (
    nameParts.length < 2 ||
    !email ||
    !phone ||
    !consent ||
    !attribution
  ) {
    return null;
  }
  const [firstname, ...lastnameParts] = nameParts;
  const lastname = lastnameParts.join(" ");

  const outgoing = new FormData();
  outgoing.set("u", activeCampaign.formUser!);
  outgoing.set("f", String(activeCampaign.formId));
  outgoing.set("s", "");
  outgoing.set("c", "0");
  outgoing.set("m", "0");
  outgoing.set("act", "sub");
  outgoing.set("v", "2");
  outgoing.set("or", activeCampaign.formOrigin!);
  outgoing.set("firstname", firstname);
  outgoing.set("lastname", lastname);
  outgoing.set("email", email);
  outgoing.set("phone", phone);
  outgoing.set("sms_consent", "on");

  for (const attributionName of HOTMART_ATTRIBUTION_PARAM_NAMES) {
    const fieldId = activeCampaign.attributionFieldIds[attributionName];
    if (fieldId) {
      outgoing.set(`field[${fieldId}]`, attribution[attributionName]);
    }
  }
  return outgoing;
}

function isExpectedThankYouLocation(value: string | null) {
  if (!value) return false;
  try {
    const url = new URL(value, "https://registration.invalid");
    return (
      !url.username &&
      !url.password &&
      url.pathname.replace(/\/+$/, "") === config.routes.thankYou
    );
  } catch {
    return false;
  }
}

function classifyActiveCampaignResponse(
  response: Response,
  responseText: string,
) {
  try {
    const result = JSON.parse(responseText) as {
      action?: unknown;
      data?: { url?: unknown };
    };
    if (result.action === "show_error") return "error" as const;
    if (result.action === "show_thank_you") return "success" as const;
    if (
      result.action === "redirect" &&
      typeof result.data?.url === "string" &&
      isExpectedThankYouLocation(result.data.url)
    ) {
      return "success" as const;
    }
  } catch {
    // ActiveCampaign can also return its legacy JavaScript response format.
  }
  if (/\b_?show_error\s*\(/i.test(responseText)) return "error" as const;
  if (/(?:window\.)?_show_thank_you\s*\(/i.test(responseText)) {
    return "success" as const;
  }
  if (
    response.status >= 300 &&
    response.status < 400 &&
    isExpectedThankYouLocation(response.headers.get("location"))
  ) {
    return "success" as const;
  }
  const redirectMatch = responseText.match(
    /window\.top\.location\.href\s*=\s*["']([^"']+)["']\s*;?/i,
  );
  return isExpectedThankYouLocation(redirectMatch?.[1] || null)
    ? ("success" as const)
    : ("unknown" as const);
}

function failedRegistration(status: number, code: string) {
  return jsonNoStore({ ok: false, code }, status);
}

async function handleRegistration(request: NextRequest) {
  if (!isSameOrigin(request)) return jsonNoStore({ ok: false }, 403);
  if (getContentType(request) !== JSON_CONTENT_TYPE) {
    return jsonNoStore({ ok: false }, 415);
  }

  const activeCampaign = getActiveCampaignConfiguration();
  if (!activeCampaign) {
    return failedRegistration(503, "registration_not_configured");
  }
  try {
    assertEstrategaFiscalRegistrationConfigured();
  } catch {
    return failedRegistration(503, "registration_not_configured");
  }

  const bodyResult = await readBoundedUtf8Body(request, MAX_BODY_BYTES);
  if (!bodyResult.ok) {
    return failedRegistration(
      bodyResult.reason === "too_large" ? 413 : 400,
      "invalid_request",
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(bodyResult.body);
  } catch {
    return failedRegistration(400, "invalid_request");
  }
  if (!isPlainObject(body)) {
    return failedRegistration(400, "invalid_request");
  }

  const outgoing = buildActiveCampaignParams(body, activeCampaign);
  if (!outgoing) return failedRegistration(400, "invalid_fields");

  try {
    const activeCampaignResponse = await fetch(activeCampaign.endpoint!, {
      method: "POST",
      cache: "no-store",
      redirect: "manual",
      headers: {
        accept: "application/json",
      },
      body: outgoing,
      signal: AbortSignal.any([
        request.signal,
        AbortSignal.timeout(15_000),
      ]),
    });
    const responseText = (await activeCampaignResponse.text()).slice(0, 64_000);
    const result = classifyActiveCampaignResponse(
      activeCampaignResponse,
      responseText,
    );

    if (result === "error") {
      return failedRegistration(422, "registration_rejected");
    }
    if (
      (!activeCampaignResponse.ok &&
        !(activeCampaignResponse.status >= 300 &&
          activeCampaignResponse.status < 400)) ||
      result !== "success"
    ) {
      return failedRegistration(502, "unconfirmed_response");
    }

    const { token } = issueEstrategaFiscalRegistrationProof();
    const response = jsonNoStore({
      ok: true,
      redirect: config.routes.thankYou,
    });
    response.cookies.set(ESTRATEGA_FISCAL_REGISTRATION_COOKIE, token, {
      ...estrategaFiscalRegistrationCookieOptions,
      maxAge: ESTRATEGA_FISCAL_REGISTRATION_TTL_SECONDS,
    });
    return response;
  } catch {
    return failedRegistration(502, "registration_unavailable");
  }
}

export async function POST(request: NextRequest) {
  try {
    return await handleRegistration(request);
  } catch {
    return failedRegistration(500, "unexpected_error");
  }
}
