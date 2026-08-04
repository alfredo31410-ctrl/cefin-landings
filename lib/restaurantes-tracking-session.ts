export const RESTAURANTES_REGISTRATION_ATTEMPT_KEY =
  "cefin_restaurantes_registration_attempt";

const REGISTRATION_TTL_MS = 10 * 60 * 1000;

type TemporaryProof = {
  id: string;
  createdAt: number;
  expiresAt: number;
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function writeProof(proof: TemporaryProof) {
  if (typeof window === "undefined") return;
  const serialized = JSON.stringify(proof);
  try {
    window.sessionStorage.setItem(
      RESTAURANTES_REGISTRATION_ATTEMPT_KEY,
      serialized,
    );
  } catch {}
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${RESTAURANTES_REGISTRATION_ATTEMPT_KEY}=${encodeURIComponent(serialized)}; Max-Age=${Math.ceil(REGISTRATION_TTL_MS / 1000)}; Path=/; SameSite=Lax${secure}`;
  } catch {}
}

function removeProof() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(RESTAURANTES_REGISTRATION_ATTEMPT_KEY);
  } catch {}
  try {
    document.cookie = `${RESTAURANTES_REGISTRATION_ATTEMPT_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
  } catch {}
}

function readCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${RESTAURANTES_REGISTRATION_ATTEMPT_KEY}=`));
  return match
    ? decodeURIComponent(match.slice(RESTAURANTES_REGISTRATION_ATTEMPT_KEY.length + 1))
    : null;
}

export function createRestaurantesRegistrationAttempt() {
  const createdAt = Date.now();
  const proof = {
    id: createId(),
    createdAt,
    expiresAt: createdAt + REGISTRATION_TTL_MS,
  } satisfies TemporaryProof;
  writeProof(proof);
  return proof;
}

export function consumeRestaurantesRegistrationAttempt() {
  if (typeof window === "undefined") return null;
  let serialized: string | null = null;
  try {
    serialized = window.sessionStorage.getItem(
      RESTAURANTES_REGISTRATION_ATTEMPT_KEY,
    );
  } catch {}
  serialized ??= readCookie();
  removeProof();
  if (!serialized) return null;

  try {
    const proof = JSON.parse(serialized) as TemporaryProof;
    if (
      !proof.id ||
      !Number.isFinite(proof.createdAt) ||
      !Number.isFinite(proof.expiresAt) ||
      proof.createdAt > Date.now() ||
      proof.expiresAt <= Date.now()
    ) {
      return null;
    }
    return proof;
  } catch {
    return null;
  }
}

export function getRestaurantesEventKey(eventName: string, proofId: string) {
  return `cefin_restaurantes_${eventName}_${proofId}`;
}
