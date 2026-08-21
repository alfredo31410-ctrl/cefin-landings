import { NextRequest, NextResponse } from "next/server";
import {
  assertDespiertaRegistrationConfigured,
  classifyDespiertaActiveCampaignResponse,
  DESPIERTA_REGISTRATION_COOKIE,
  DESPIERTA_REGISTRATION_TTL_SECONDS,
  DESPIERTA_THANK_YOU_PATH,
  despiertaRegistrationCookieOptions,
  issueDespiertaRegistrationProof,
} from "@/lib/despierta-potencial-registration";
import {
  HOTMART_ATTRIBUTION_PARAM_NAMES,
  type UtmParamName,
} from "@/lib/hotmart-utms";
import { landingConfig as config } from "../../config";
import {
  getContentType,
  isSameOrigin,
  jsonNoStore,
  readBoundedUtf8Body,
} from "./http";

const ACTIVE_CAMPAIGN_ENDPOINT =
  "https://cefincapacitacion.activehosted.com/proc.php";
const MAX_BODY_BYTES = 16 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_LASTNAME_LENGTH = 150;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 32;
const MAX_ATTRIBUTION_LENGTH = 250;
const MAX_SUBSCRIPTION_SOURCE_LENGTH = 2048;
const FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
const CONTROL_CHARACTER = /[\u0000-\u001f\u007f]/;

const VERIFIED_ACTIVE_CAMPAIGN_FIELDS = Object.entries(
  config.activeCampaign.attributionFieldIds,
).filter((entry): entry is [UtmParamName, number] =>
  typeof entry[1] === "number",
);

const ALLOWED_INPUT_NAMES = new Set([
  "u",
  "f",
  "s",
  "c",
  "m",
  "act",
  "v",
  "or",
  "firstname",
  "lastname",
  "email",
  "phone",
  "sms_consent",
  ...VERIFIED_ACTIVE_CAMPAIGN_FIELDS.map(([, fieldId]) => `field[${fieldId}]`),
  ...HOTMART_ATTRIBUTION_PARAM_NAMES,
]);

function getSingleValue(params: URLSearchParams, name: string) {
  const values = params.getAll(name);
  return values.length === 1 ? values[0].trim() : null;
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

function hasOnlyExpectedFields(params: URLSearchParams) {
  return Array.from(params.keys()).every((name) => ALLOWED_INPUT_NAMES.has(name));
}

function hasExpectedFormIdentity(params: URLSearchParams) {
  const { activeCampaign } = config;
  return (
    getSingleValue(params, "u") === activeCampaign.formUser &&
    getSingleValue(params, "f") === String(activeCampaign.formId) &&
    getSingleValue(params, "c") === "0" &&
    getSingleValue(params, "m") === "0" &&
    getSingleValue(params, "act") === "sub" &&
    getSingleValue(params, "v") === "2" &&
    getSingleValue(params, "or") === activeCampaign.formOrigin
  );
}

function readAttribution(params: URLSearchParams) {
  const values = {} as Record<UtmParamName, string>;

  for (const name of HOTMART_ATTRIBUTION_PARAM_NAMES) {
    const value = getSingleValue(params, name);
    if (
      value === null ||
      value.length > MAX_ATTRIBUTION_LENGTH ||
      CONTROL_CHARACTER.test(value)
    ) {
      return null;
    }
    values[name] = value;
  }

  return values;
}

function buildActiveCampaignParams(params: URLSearchParams) {
  if (!hasOnlyExpectedFields(params) || !hasExpectedFormIdentity(params)) {
    return null;
  }

  const firstname = normalizeText(
    getSingleValue(params, "firstname"),
    MAX_NAME_LENGTH,
  );
  const lastname = normalizeText(
    getSingleValue(params, "lastname"),
    MAX_LASTNAME_LENGTH,
  );
  const email = normalizeEmail(getSingleValue(params, "email"));
  const phone = normalizePhone(getSingleValue(params, "phone"));
  const smsConsent = getSingleValue(params, "sms_consent");
  const subscriptionSource = getSingleValue(params, "s");
  const attribution = readAttribution(params);

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    smsConsent !== "on" ||
    subscriptionSource === null ||
    subscriptionSource.length > MAX_SUBSCRIPTION_SOURCE_LENGTH ||
    CONTROL_CHARACTER.test(subscriptionSource) ||
    !attribution
  ) {
    return null;
  }

  const outgoing = new URLSearchParams();
  outgoing.set("u", config.activeCampaign.formUser);
  outgoing.set("f", String(config.activeCampaign.formId));
  outgoing.set("s", subscriptionSource);
  outgoing.set("c", "0");
  outgoing.set("m", "0");
  outgoing.set("act", "sub");
  outgoing.set("v", "2");
  outgoing.set("or", config.activeCampaign.formOrigin);
  outgoing.set("firstname", firstname);
  outgoing.set("lastname", lastname);
  outgoing.set("email", email);
  outgoing.set("phone", phone);
  outgoing.set("sms_consent", "on");

  for (const [name, fieldId] of VERIFIED_ACTIVE_CAMPAIGN_FIELDS) {
    outgoing.set(`field[${fieldId}]`, attribution[name]);
  }

  outgoing.set("jsonp", "true");
  return outgoing;
}

function clearPreviousRegistration(response: NextResponse) {
  response.cookies.set(DESPIERTA_REGISTRATION_COOKIE, "", {
    ...despiertaRegistrationCookieOptions,
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}

function failedRegistration(status: number, reason: string) {
  return clearPreviousRegistration(jsonNoStore({ ok: false, reason }, status));
}

async function handleRegistration(request: NextRequest) {
  if (!isSameOrigin(request)) return jsonNoStore({ ok: false }, 403);
  if (getContentType(request) !== FORM_CONTENT_TYPE) {
    return jsonNoStore({ ok: false }, 415);
  }

  try {
    assertDespiertaRegistrationConfigured();
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[despierta-registration] Registration unavailable:", message);
    return failedRegistration(503, "registration_not_configured");
  }

  const bodyResult = await readBoundedUtf8Body(request, MAX_BODY_BYTES);
  if (!bodyResult.ok) {
    return jsonNoStore(
      { ok: false },
      bodyResult.reason === "too_large" ? 413 : 400,
    );
  }
  if (!bodyResult.body) return jsonNoStore({ ok: false }, 400);

  const params = buildActiveCampaignParams(
    new URLSearchParams(bodyResult.body),
  );
  if (!params) return jsonNoStore({ ok: false }, 400);

  try {
    const activeCampaignResponse = await fetch(
      `${ACTIVE_CAMPAIGN_ENDPOINT}?${params.toString()}`,
      {
        cache: "no-store",
        redirect: "manual",
        signal: AbortSignal.any([
          request.signal,
          AbortSignal.timeout(15_000),
        ]),
      },
    );
    const responseScript = await activeCampaignResponse.text();
    const result = classifyDespiertaActiveCampaignResponse(responseScript);

    if (result === "error") {
      return failedRegistration(422, "activecampaign_rejected");
    }
    if (!activeCampaignResponse.ok || result !== "success") {
      return failedRegistration(502, "unconfirmed_response");
    }

    const { token } = issueDespiertaRegistrationProof();
    const response = jsonNoStore({
      ok: true,
      redirect: DESPIERTA_THANK_YOU_PATH,
    });
    response.cookies.set(DESPIERTA_REGISTRATION_COOKIE, token, {
      ...despiertaRegistrationCookieOptions,
      maxAge: DESPIERTA_REGISTRATION_TTL_SECONDS,
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[despierta-registration] Registration unavailable:", message);
    const isConfigurationError = message.includes(
      "DESPIERTA_POTENCIAL_REGISTRATION_SECRET",
    );
    return failedRegistration(
      isConfigurationError ? 503 : 502,
      isConfigurationError ? "registration_not_configured" : "activecampaign_unavailable",
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    return await handleRegistration(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[despierta-registration] Unexpected failure:", message);
    return jsonNoStore({ ok: false }, 500);
  }
}
