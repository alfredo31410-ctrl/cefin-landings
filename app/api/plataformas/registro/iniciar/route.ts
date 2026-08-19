import { NextRequest } from "next/server";
import {
  PLATAFORMAS_REGISTRATION_COOKIE,
  plataformasRegistrationCookieOptions,
} from "@/lib/plataformas-registration";
import {
  isSameOrigin,
  jsonNoStore,
  methodNotAllowed,
  optionsResponse,
} from "../http";

function handleRegistrationStart(request: NextRequest) {
  if (!isSameOrigin(request)) return jsonNoStore({ ok: false }, 403);

  const response = jsonNoStore({ ok: true });
  response.cookies.set(PLATAFORMAS_REGISTRATION_COOKIE, "", {
    ...plataformasRegistrationCookieOptions,
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}

export async function POST(request: NextRequest) {
  try {
    return handleRegistrationStart(request);
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
