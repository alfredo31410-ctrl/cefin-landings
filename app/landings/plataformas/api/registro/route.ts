import { NextRequest, NextResponse } from "next/server";
import {
  classifyActiveCampaignResponse,
  issuePlataformasRegistrationProof,
  PLATAFORMAS_REGISTRATION_COOKIE,
  PLATAFORMAS_REGISTRATION_TTL_SECONDS,
  PLATAFORMAS_THANK_YOU_PATH,
  plataformasRegistrationCookieOptions,
} from "@/lib/plataformas-registration";
import {
  getContentType,
  isSameOrigin,
  jsonNoStore,
  readBoundedUtf8Body,
} from "./http";

const ACTIVE_CAMPAIGN_ENDPOINT =
  "https://cefincapacitacion.activehosted.com/proc.php";
const ACTIVE_CAMPAIGN_FORM_USER = "6A860B40BD1D7";
const ACTIVE_CAMPAIGN_FORM_ORIGIN = "20c5eb9e-be35-43b0-b3a5-fd1cc0e487a2";
// A normal Form 323 payload is below 2 KiB, including the four current UTMs.
const MAX_BODY_BYTES = 8 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_LASTNAME_LENGTH = 150;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 32;
const MAX_UTM_LENGTH = 250;
const MAX_SUBSCRIPTION_SOURCE_LENGTH = 500;
const FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
const CONTROL_CHARACTER = /[\u0000-\u001f\u007f]/;

function getSingleValue(params: URLSearchParams, name: string) {
  const values = params.getAll(name);
  return values.length === 1 ? values[0].trim() : null;
}

function isReasonableText(
  value: string | null,
  maxLength: number,
): value is string {
  return Boolean(
    value && value.length <= maxLength && !CONTROL_CHARACTER.test(value),
  );
}

function buildActiveCampaignParams(params: URLSearchParams) {
  const firstname = getSingleValue(params, "firstname");
  const lastname = getSingleValue(params, "lastname");
  const email = getSingleValue(params, "email");
  const phone = getSingleValue(params, "phone");
  const smsConsent = getSingleValue(params, "sms_consent");

  if (
    !isReasonableText(firstname, MAX_NAME_LENGTH) ||
    !isReasonableText(lastname, MAX_LASTNAME_LENGTH) ||
    !isReasonableText(email, MAX_EMAIL_LENGTH) ||
    !isReasonableText(phone, MAX_PHONE_LENGTH) ||
    smsConsent !== "on" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[+\d().\-\s]+$/.test(phone)
  ) {
    return null;
  }

  const phoneDigitCount = phone.replace(/\D/g, "").length;
  if (phoneDigitCount < 7 || phoneDigitCount > 15) return null;

  const optionalFields = [
    ["s", MAX_SUBSCRIPTION_SOURCE_LENGTH],
    ["field[7]", MAX_UTM_LENGTH],
    ["field[8]", MAX_UTM_LENGTH],
    ["field[9]", MAX_UTM_LENGTH],
    ["field[10]", MAX_UTM_LENGTH],
  ] as const;

  const optionalValues = new Map<string, string>();
  for (const [name, maxLength] of optionalFields) {
    const value = getSingleValue(params, name);
    if (
      value === null ||
      value.length > maxLength ||
      CONTROL_CHARACTER.test(value)
    ) {
      return null;
    }
    optionalValues.set(name, value);
  }

  const outgoing = new URLSearchParams();
  outgoing.set("u", ACTIVE_CAMPAIGN_FORM_USER);
  outgoing.set("f", "323");
  outgoing.set("s", optionalValues.get("s") || "");
  outgoing.set("c", "0");
  outgoing.set("m", "0");
  outgoing.set("act", "sub");
  outgoing.set("v", "2");
  outgoing.set("or", ACTIVE_CAMPAIGN_FORM_ORIGIN);
  outgoing.set("firstname", firstname);
  outgoing.set("lastname", lastname);
  outgoing.set("email", email);
  outgoing.set("phone", phone);
  outgoing.set("sms_consent", "on");
  outgoing.set("field[7]", optionalValues.get("field[7]") || "");
  outgoing.set("field[8]", optionalValues.get("field[8]") || "");
  outgoing.set("field[9]", optionalValues.get("field[9]") || "");
  outgoing.set("field[10]", optionalValues.get("field[10]") || "");
  outgoing.set("jsonp", "true");
  return outgoing;
}

function clearPreviousRegistration(response: NextResponse) {
  response.cookies.set(PLATAFORMAS_REGISTRATION_COOKIE, "", {
    ...plataformasRegistrationCookieOptions,
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}

function failedRegistration(status: number, reason: string) {
  return clearPreviousRegistration(jsonNoStore({ ok: false, reason }, status));
}

async function handleRegistration(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return jsonNoStore({ ok: false }, 403);
  }

  if (getContentType(request) !== FORM_CONTENT_TYPE) {
    return jsonNoStore({ ok: false }, 415);
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
    const result = classifyActiveCampaignResponse(responseScript);

    if (result === "error") {
      return failedRegistration(422, "activecampaign_rejected");
    }

    if (!activeCampaignResponse.ok || result !== "success") {
      return failedRegistration(502, "unconfirmed_response");
    }

    const { token } = issuePlataformasRegistrationProof();
    const response = jsonNoStore({
      ok: true,
      redirect: PLATAFORMAS_THANK_YOU_PATH,
    });
    response.cookies.set(PLATAFORMAS_REGISTRATION_COOKIE, token, {
      ...plataformasRegistrationCookieOptions,
      maxAge: PLATAFORMAS_REGISTRATION_TTL_SECONDS,
    });
    return response;
  } catch {
    return failedRegistration(502, "activecampaign_unavailable");
  }
}

export async function POST(request: NextRequest) {
  try {
    return await handleRegistration(request);
  } catch {
    return jsonNoStore({ ok: false }, 500);
  }
}
