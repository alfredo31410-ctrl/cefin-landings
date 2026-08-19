import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const PLATAFORMAS_REGISTRATION_COOKIE =
  "cefin_plataformas_registration";
export const PLATAFORMAS_REGISTRATION_TTL_SECONDS = 15 * 60;
export const PLATAFORMAS_THANK_YOU_PATH = "/landings/plataformas/gracias";

const TOKEN_VERSION = "v1";
const CANONICAL_THANK_YOU_URL = `https://cefin.mx${PLATAFORMAS_THANK_YOU_PATH}`;

export type PlataformasRegistrationState = "pending" | "sent";

export type PlataformasRegistrationProof = {
  eventId: string;
  state: PlataformasRegistrationState;
  expiresAt: number;
};

function getSecret() {
  const secret = process.env.PLATAFORMAS_REGISTRATION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("PLATAFORMAS_REGISTRATION_SECRET is not configured");
  }
  return secret;
}

function getPayload(proof: PlataformasRegistrationProof) {
  return [TOKEN_VERSION, proof.eventId, proof.state, proof.expiresAt].join(".");
}

function signPayload(payload: string) {
  return createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
}

export function signPlataformasRegistrationProof(
  proof: PlataformasRegistrationProof,
) {
  const payload = getPayload(proof);
  return `${payload}.${signPayload(payload)}`;
}

export function issuePlataformasRegistrationProof() {
  const proof: PlataformasRegistrationProof = {
    eventId: randomUUID(),
    state: "pending",
    expiresAt: Date.now() + PLATAFORMAS_REGISTRATION_TTL_SECONDS * 1000,
  };

  return { proof, token: signPlataformasRegistrationProof(proof) };
}

export function verifyPlataformasRegistrationProof(
  token: string | undefined,
) {
  if (!token) return null;

  const [version, eventId, stateValue, expiresAtValue, signature, ...rest] =
    token.split(".");
  const expiresAt = Number(expiresAtValue);
  const state = stateValue as PlataformasRegistrationState;

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
    // Compare the canonical base64url strings, not only their decoded bytes.
    // Distinct final characters can otherwise decode to the same digest bits.
    const expected = Buffer.from(signPayload(getPayload(proof)), "utf8");
    const actual = Buffer.from(signature, "utf8");

    if (
      actual.length !== expected.length ||
      !timingSafeEqual(actual, expected)
    ) {
      return null;
    }

    return proof satisfies PlataformasRegistrationProof;
  } catch {
    return null;
  }
}

export function classifyActiveCampaignResponse(script: string) {
  if (/\b_?show_error\s*\(/i.test(script)) return "error" as const;

  const redirectMatch = script.match(
    /window\.top\.location\.href\s*=\s*["']([^"']+)["']\s*;?/i,
  );
  if (!redirectMatch) return "unknown" as const;

  try {
    return new URL(redirectMatch[1]).toString() === CANONICAL_THANK_YOU_URL
      ? ("success" as const)
      : ("unknown" as const);
  } catch {
    return "unknown" as const;
  }
}

export const plataformasRegistrationCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  priority: "high" as const,
};
