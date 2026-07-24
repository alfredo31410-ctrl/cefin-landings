import { NextRequest, NextResponse } from "next/server";
import {
  nifRegistrationCookieOptions,
  NIF_REGISTRATION_CONFIRMATION_COOKIE,
  NIF_REGISTRATION_INTENT_COOKIE,
  signRegistrationToken,
  verifyRegistrationToken,
} from "@/lib/nif-registration";

const registerPath = "/landings/nif/registro";
const thanksPath = "/landings/nif/registro/gracias";

export async function GET(request: NextRequest) {
  const intent = verifyRegistrationToken(
    request.cookies.get(NIF_REGISTRATION_INTENT_COOKIE)?.value,
  );
  const target = new URL(intent ? thanksPath : registerPath, request.url);
  const response = NextResponse.redirect(target);

  if (!intent) return response;

  try {
    response.cookies.set(NIF_REGISTRATION_INTENT_COOKIE, "", {
      ...nifRegistrationCookieOptions,
      maxAge: 0,
    });
    response.cookies.set(
      NIF_REGISTRATION_CONFIRMATION_COOKIE,
      signRegistrationToken(intent.registrationId, 5 * 60),
      { ...nifRegistrationCookieOptions, maxAge: 5 * 60 },
    );
    return response;
  } catch {
    return NextResponse.redirect(new URL(registerPath, request.url));
  }
}
