import { NextRequest } from "next/server";
import {
  ESTRATEGA_FISCAL_REGISTRATION_COOKIE,
  estrategaFiscalRegistrationCookieOptions,
  signEstrategaFiscalRegistrationProof,
  verifyEstrategaFiscalRegistrationProof,
} from "@/lib/estratega-fiscal-registration";
import {
  getContentType,
  isSameOrigin,
  jsonNoStore,
  readBoundedUtf8Body,
} from "@/lib/registration-http";
import { landingConfig as config } from "../../../config";

const JSON_CONTENT_TYPE = "application/json";
const MAX_BODY_BYTES = 1024;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function handleCompletion(request: NextRequest) {
  if (!isSameOrigin(request, [config.routes.publicOrigin])) {
    return jsonNoStore({ ok: false }, 403);
  }
  if (getContentType(request) !== JSON_CONTENT_TYPE) {
    return jsonNoStore({ ok: false }, 415);
  }
  if (!config.activation.registrationEnabled) {
    return jsonNoStore({ ok: false }, 503);
  }

  const bodyResult = await readBoundedUtf8Body(request, MAX_BODY_BYTES);
  if (!bodyResult.ok) {
    return jsonNoStore(
      { ok: false },
      bodyResult.reason === "too_large" ? 413 : 400,
    );
  }

  let eventId = "";
  try {
    const body = JSON.parse(bodyResult.body) as { eventId?: unknown };
    eventId = typeof body.eventId === "string" ? body.eventId : "";
  } catch {
    return jsonNoStore({ ok: false }, 400);
  }
  if (!UUID_PATTERN.test(eventId)) return jsonNoStore({ ok: false }, 400);

  const proof = verifyEstrategaFiscalRegistrationProof(
    request.cookies.get(ESTRATEGA_FISCAL_REGISTRATION_COOKIE)?.value,
  );
  if (!proof || proof.eventId !== eventId) {
    return jsonNoStore({ ok: false }, 401);
  }
  if (proof.state === "sent") return jsonNoStore({ ok: true });

  const response = jsonNoStore({ ok: true });
  response.cookies.set(
    ESTRATEGA_FISCAL_REGISTRATION_COOKIE,
    signEstrategaFiscalRegistrationProof({ ...proof, state: "sent" }),
    {
      ...estrategaFiscalRegistrationCookieOptions,
      maxAge: Math.max(1, Math.ceil((proof.expiresAt - Date.now()) / 1000)),
    },
  );
  return response;
}

export async function POST(request: NextRequest) {
  try {
    return await handleCompletion(request);
  } catch {
    return jsonNoStore({ ok: false }, 500);
  }
}
