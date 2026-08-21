import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const DESPIERTA_REGISTRATION_COOKIE =
  "cefin_despierta_potencial_registration";
export const DESPIERTA_REGISTRATION_TTL_SECONDS = 15 * 60;
export const DESPIERTA_THANK_YOU_PATH =
  "/landings/despierta-tu-potencial-contable/gracias";

const TOKEN_VERSION = "v1";
const ALLOWED_ACTIVE_CAMPAIGN_THANK_YOU_PATHS = new Set([
  DESPIERTA_THANK_YOU_PATH,
  "/landings/contadora-estrategica/gracias",
]);
const ACTIVE_CAMPAIGN_REDIRECT_ORIGIN = "https://cefin.mx";
const MAX_ACTIVE_CAMPAIGN_QUERY_LENGTH = 2048;

export type DespiertaRegistrationState = "pending" | "sent";

export type DespiertaRegistrationProof = {
  eventId: string;
  state: DespiertaRegistrationState;
  expiresAt: number;
};

function getSecret() {
  const secret = process.env.DESPIERTA_POTENCIAL_REGISTRATION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "DESPIERTA_POTENCIAL_REGISTRATION_SECRET is not configured",
    );
  }
  return secret;
}

export function assertDespiertaRegistrationConfigured() {
  getSecret();
}

function getPayload(proof: DespiertaRegistrationProof) {
  return [TOKEN_VERSION, proof.eventId, proof.state, proof.expiresAt].join(".");
}

function signPayload(payload: string) {
  return createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
}

export function signDespiertaRegistrationProof(
  proof: DespiertaRegistrationProof,
) {
  const payload = getPayload(proof);
  return `${payload}.${signPayload(payload)}`;
}

export function issueDespiertaRegistrationProof() {
  const proof: DespiertaRegistrationProof = {
    eventId: randomUUID(),
    state: "pending",
    expiresAt: Date.now() + DESPIERTA_REGISTRATION_TTL_SECONDS * 1000,
  };

  return { proof, token: signDespiertaRegistrationProof(proof) };
}

export function verifyDespiertaRegistrationProof(token: string | undefined) {
  if (!token) return null;

  const [version, eventId, stateValue, expiresAtValue, signature, ...rest] =
    token.split(".");
  const expiresAt = Number(expiresAtValue);
  const state = stateValue as DespiertaRegistrationState;

  if (
    rest.length > 0 ||
    version !== TOKEN_VERSION ||
    !eventId ||
    (state !== "pending" && state !== "sent") ||
    !Number.isFinite(expiresAt) ||
    expiresAt <= Date.now() ||
    !signature
  ) {
    return null;
  }

  try {
    const proof = { eventId, state, expiresAt };
    const expected = Buffer.from(signPayload(getPayload(proof)), "utf8");
    const actual = Buffer.from(signature, "utf8");

    if (
      actual.length !== expected.length ||
      !timingSafeEqual(actual, expected)
    ) {
      return null;
    }

    return proof satisfies DespiertaRegistrationProof;
  } catch {
    return null;
  }
}

export function classifyDespiertaActiveCampaignResponse(script: string) {
  if (/\b_?show_error\s*\(/i.test(script)) return "error" as const;

  if (/(?:window\.)?_show_thank_you\s*\(/i.test(script)) {
    return "success" as const;
  }

  const redirectMatch = script.match(
    /window\.top\.location\.href\s*=\s*["']([^"']+)["']\s*;?/i,
  );
  if (!redirectMatch) return "unknown" as const;

  try {
    const redirectUrl = new URL(redirectMatch[1]);
    const normalizedPath =
      redirectUrl.pathname.length > 1
        ? redirectUrl.pathname.replace(/\/+$/, "")
        : redirectUrl.pathname;
    const isAllowed =
      redirectUrl.origin === ACTIVE_CAMPAIGN_REDIRECT_ORIGIN &&
      !redirectUrl.username &&
      !redirectUrl.password &&
      redirectUrl.search.length <= MAX_ACTIVE_CAMPAIGN_QUERY_LENGTH &&
      ALLOWED_ACTIVE_CAMPAIGN_THANK_YOU_PATHS.has(normalizedPath);

    return isAllowed ? ("success" as const) : ("unknown" as const);
  } catch {
    return "unknown" as const;
  }
}

export const despiertaRegistrationCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  priority: "high" as const,
};
