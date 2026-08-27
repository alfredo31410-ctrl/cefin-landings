import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { landingConfig } from "@/app/landings/de-cero-a-estratega-fiscal/config";

export const ESTRATEGA_FISCAL_REGISTRATION_COOKIE =
  "cefin_estratega_fiscal_registration";
export const ESTRATEGA_FISCAL_REGISTRATION_TTL_SECONDS = 15 * 60;

const TOKEN_VERSION = "v1";

export type EstrategaFiscalRegistrationState = "pending" | "sent";

export type EstrategaFiscalRegistrationProof = {
  eventId: string;
  state: EstrategaFiscalRegistrationState;
  expiresAt: number;
};

function getSecret() {
  const secret = process.env.ESTRATEGA_FISCAL_REGISTRATION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ESTRATEGA_FISCAL_REGISTRATION_SECRET is not configured");
  }
  return secret;
}

export function assertEstrategaFiscalRegistrationConfigured() {
  getSecret();
}

function getPayload(proof: EstrategaFiscalRegistrationProof) {
  return [TOKEN_VERSION, proof.eventId, proof.state, proof.expiresAt].join(".");
}

function signPayload(payload: string) {
  return createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
}

export function signEstrategaFiscalRegistrationProof(
  proof: EstrategaFiscalRegistrationProof,
) {
  const payload = getPayload(proof);
  return `${payload}.${signPayload(payload)}`;
}

export function issueEstrategaFiscalRegistrationProof() {
  const proof: EstrategaFiscalRegistrationProof = {
    eventId: randomUUID(),
    state: "pending",
    expiresAt:
      Date.now() + ESTRATEGA_FISCAL_REGISTRATION_TTL_SECONDS * 1000,
  };
  return {
    proof,
    token: signEstrategaFiscalRegistrationProof(proof),
  };
}

export function verifyEstrategaFiscalRegistrationProof(
  token: string | undefined,
) {
  if (!token) return null;

  const [version, eventId, stateValue, expiresAtValue, signature, ...rest] =
    token.split(".");
  const expiresAt = Number(expiresAtValue);
  const state = stateValue as EstrategaFiscalRegistrationState;

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
    return proof satisfies EstrategaFiscalRegistrationProof;
  } catch {
    return null;
  }
}

export const estrategaFiscalRegistrationCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: landingConfig.routes.root,
  priority: "high" as const,
};
