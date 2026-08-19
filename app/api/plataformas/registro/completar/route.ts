import { NextRequest } from "next/server";
import {
  PLATAFORMAS_REGISTRATION_COOKIE,
  plataformasRegistrationCookieOptions,
  signPlataformasRegistrationProof,
  verifyPlataformasRegistrationProof,
} from "@/lib/plataformas-registration";
import {
  getContentType,
  isSameOrigin,
  jsonNoStore,
  methodNotAllowed,
  optionsResponse,
  readBoundedUtf8Body,
} from "../http";

const COMPLETE_CONTENT_TYPE = "application/json";
const MAX_COMPLETE_BODY_BYTES = 1024;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function handleCompletion(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return jsonNoStore({ ok: false }, 403);
  }

  if (getContentType(request) !== COMPLETE_CONTENT_TYPE) {
    return jsonNoStore({ ok: false }, 415);
  }

  const bodyResult = await readBoundedUtf8Body(request, MAX_COMPLETE_BODY_BYTES);
  if (!bodyResult.ok) {
    return jsonNoStore(
      { ok: false },
      bodyResult.reason === "too_large" ? 413 : 400,
    );
  }

  let eventId: string;
  try {
    const body = JSON.parse(bodyResult.body) as { eventId?: unknown };
    eventId = typeof body.eventId === "string" ? body.eventId : "";
  } catch {
    return jsonNoStore({ ok: false }, 400);
  }

  if (!UUID_PATTERN.test(eventId)) return jsonNoStore({ ok: false }, 400);

  const proof = verifyPlataformasRegistrationProof(
    request.cookies.get(PLATAFORMAS_REGISTRATION_COOKIE)?.value,
  );
  if (!proof || proof.eventId !== eventId) {
    return jsonNoStore({ ok: false }, 401);
  }

  if (proof.state === "sent") {
    return jsonNoStore({ ok: true });
  }

  const sentProof = { ...proof, state: "sent" as const };
  const response = jsonNoStore({ ok: true });
  response.cookies.set(
    PLATAFORMAS_REGISTRATION_COOKIE,
    signPlataformasRegistrationProof(sentProof),
    {
      ...plataformasRegistrationCookieOptions,
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

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const OPTIONS = optionsResponse;
