import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  nifRegistrationCookieOptions,
  NIF_REGISTRATION_CONFIRMATION_COOKIE,
  verifyRegistrationToken,
} from "@/lib/nif-registration";

export async function POST() {
  const cookieStore = await cookies();
  const confirmation = verifyRegistrationToken(
    cookieStore.get(NIF_REGISTRATION_CONFIRMATION_COOKIE)?.value,
  );
  if (!confirmation) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json(
    { ok: true, registrationId: confirmation.registrationId },
    { headers: { "cache-control": "no-store" } },
  );
  response.cookies.set(NIF_REGISTRATION_CONFIRMATION_COOKIE, "", {
    ...nifRegistrationCookieOptions,
    maxAge: 0,
  });
  return response;
}
