import { NextResponse } from "next/server";
import {
  issueRegistrationToken,
  nifRegistrationCookieOptions,
  NIF_REGISTRATION_INTENT_COOKIE,
} from "@/lib/nif-registration";

export async function POST() {
  try {
    const { token } = issueRegistrationToken(10 * 60);
    const response = NextResponse.json({ ok: true }, { headers: { "cache-control": "no-store" } });
    response.cookies.set(NIF_REGISTRATION_INTENT_COOKIE, token, {
      ...nifRegistrationCookieOptions,
      maxAge: 10 * 60,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        hasSecret: Boolean(
          process.env.NIF_REGISTRATION_CONFIRMATION_SECRET,
        ),
        errorType: error instanceof Error ? error.name : "UnknownError",
      },
      { status: 503 },
    );
  }
}
