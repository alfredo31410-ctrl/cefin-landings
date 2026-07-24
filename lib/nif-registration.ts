import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const NIF_REGISTRATION_INTENT_COOKIE = "nif_registration_intent";
export const NIF_REGISTRATION_CONFIRMATION_COOKIE =
  "nif_registration_confirmation";

const getSecret = () => {
  const secret = process.env.NIF_REGISTRATION_CONFIRMATION_SECRET;
  if (!secret) throw new Error("NIF_REGISTRATION_CONFIRMATION_SECRET is not configured");
  return secret;
};

export function signRegistrationToken(registrationId: string, ttlSeconds: number) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  const payload = `${registrationId}.${expiresAt}`;
  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function issueRegistrationToken(ttlSeconds: number) {
  const registrationId = randomUUID();
  return { registrationId, token: signRegistrationToken(registrationId, ttlSeconds) };
}

export function verifyRegistrationToken(token: string | undefined) {
  if (!token) return null;
  const [registrationId, expiresAtValue, signature] = token.split(".");
  const expiresAt = Number(expiresAtValue);
  if (!registrationId || !signature || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return null;
  }

  try {
    const expected = createHmac("sha256", getSecret())
      .update(`${registrationId}.${expiresAt}`)
      .digest("base64url");
    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (
      actualBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      return null;
    }
    return { registrationId, expiresAt };
  } catch {
    return null;
  }
}

export const nifRegistrationCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};
