import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { MEDICOS_CONFIRMATION_COOKIE } from "@/app/landings/medicos/config";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(MEDICOS_CONFIRMATION_COOKIE)?.value;
  const secret = process.env.NIF_REGISTRATION_CONFIRMATION_SECRET;
  let valid = false; let registrationId = "";
  if (token && secret) {
    const [id, expires, signature] = token.split(".");
    const payload = `${id}.${expires}`;
    const expected = createHmac("sha256", secret).update(payload).digest("base64url");
    try { valid = Boolean(id && Number(expires) > Date.now() && signature && timingSafeEqual(Buffer.from(signature), Buffer.from(expected))); registrationId = id; } catch { valid = false; }
  }
  const response = NextResponse.json({ ok: valid, registrationId: valid ? registrationId : undefined }, { status: valid ? 200 : 401, headers: { "cache-control": "no-store" } });
  response.cookies.set(MEDICOS_CONFIRMATION_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return response;
}
