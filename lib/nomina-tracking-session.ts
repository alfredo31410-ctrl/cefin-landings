export const NOMINA_REGISTRATION_ATTEMPT_KEY = "cefin_nomina_registration_attempt";
export const NOMINA_WHATSAPP_INTENT_KEY = "cefin_nomina_whatsapp_intent";

const REGISTRATION_TTL_MS = 10 * 60 * 1000;
const WHATSAPP_INTENT_TTL_MS = 5 * 60 * 1000;

type TemporaryProof = {
  id: string;
  createdAt: number;
  expiresAt: number;
};

const getCookieMaxAge = (expiresAt: number) => Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function writeProof(key: string, proof: TemporaryProof) {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(proof);
  try {
    window.sessionStorage.setItem(key, serialized);
  } catch {
    // The cookie remains as a short-lived fallback.
  }

  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${key}=${encodeURIComponent(serialized)}; Max-Age=${getCookieMaxAge(proof.expiresAt)}; Path=/; SameSite=Lax${secure}`;
  } catch {
    // Storage restrictions must never block the original navigation.
  }
}

function removeProof(key: string) {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Ignore storage restrictions.
  }

  try {
    document.cookie = `${key}=; Max-Age=0; Path=/; SameSite=Lax`;
  } catch {
    // Ignore cookie restrictions.
  }
}

function readCookie(key: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((item) => item.startsWith(`${key}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(key.length + 1));
}

function readProof(key: string) {
  if (typeof window === "undefined") return null;

  let serialized: string | null = null;
  try {
    serialized = window.sessionStorage.getItem(key);
  } catch {
    serialized = null;
  }
  serialized ??= readCookie(key);
  if (!serialized) return null;

  try {
    const proof = JSON.parse(serialized) as TemporaryProof;
    if (!proof.id || !Number.isFinite(proof.createdAt) || !Number.isFinite(proof.expiresAt)) return null;
    if (proof.createdAt > Date.now() || proof.expiresAt <= Date.now()) return null;
    return proof;
  } catch {
    return null;
  }
}

function createProof(ttlMs: number) {
  const createdAt = Date.now();
  return { id: createId(), createdAt, expiresAt: createdAt + ttlMs } satisfies TemporaryProof;
}

export function createNominaRegistrationAttempt() {
  const proof = createProof(REGISTRATION_TTL_MS);
  writeProof(NOMINA_REGISTRATION_ATTEMPT_KEY, proof);
}

export function consumeNominaRegistrationAttempt() {
  const proof = readProof(NOMINA_REGISTRATION_ATTEMPT_KEY);
  removeProof(NOMINA_REGISTRATION_ATTEMPT_KEY);
  return proof;
}

export function createNominaWhatsAppIntent() {
  const proof = createProof(WHATSAPP_INTENT_TTL_MS);
  writeProof(NOMINA_WHATSAPP_INTENT_KEY, proof);
}

export function consumeNominaWhatsAppIntent() {
  const proof = readProof(NOMINA_WHATSAPP_INTENT_KEY);
  removeProof(NOMINA_WHATSAPP_INTENT_KEY);
  return proof;
}

export function getNominaEventKey(eventName: string, proofId: string) {
  return `cefin_nomina_${eventName}_${proofId}`;
}

export function waitForNominaMetaPixel(onReady: () => void, onTimeout: () => void) {
  let attempts = 20;
  let timeoutId: number | undefined;
  let cancelled = false;

  const check = () => {
    if (cancelled) return;
    if (window.fbq) {
      onReady();
      return;
    }
    if (attempts <= 0) {
      onTimeout();
      return;
    }
    attempts -= 1;
    timeoutId = window.setTimeout(check, 100);
  };

  check();
  return () => {
    cancelled = true;
    if (timeoutId) window.clearTimeout(timeoutId);
  };
}
