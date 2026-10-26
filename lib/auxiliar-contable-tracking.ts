const REGISTRATION_PENDING_KEY =
  "cefin_auxiliar_contable_registration_pending";
const REGISTRATION_SESSION_KEY =
  "cefin_auxiliar_contable_registration_session";
const PENDING_TTL_MS = 30 * 60 * 1000;
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

type RegistrationProof = {
  id: string;
  createdAt: number;
};

export type AuxiliarContableRegistrationSession = RegistrationProof & {
  completeRegistrationSent: boolean;
  joinGroupSent: boolean;
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isValidProof(value: unknown, ttlMs: number): value is RegistrationProof {
  if (!value || typeof value !== "object") return false;

  const proof = value as Partial<RegistrationProof>;
  const now = Date.now();

  return (
    typeof proof.id === "string" &&
    proof.id.length > 0 &&
    Number.isFinite(proof.createdAt) &&
    Number(proof.createdAt) <= now &&
    now - Number(proof.createdAt) <= ttlMs
  );
}

export function createAuxiliarContableRegistrationProof() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.sessionStorage.getItem(REGISTRATION_PENDING_KEY);
    if (stored) {
      const pending = JSON.parse(stored) as unknown;
      if (isValidProof(pending, PENDING_TTL_MS)) return pending;
    }

    const proof = {
      id: createId(),
      createdAt: Date.now(),
    } satisfies RegistrationProof;

    window.sessionStorage.setItem(
      REGISTRATION_PENDING_KEY,
      JSON.stringify(proof),
    );
    return proof;
  } catch {
    return null;
  }
}

export function getAuxiliarContableRegistrationSession() {
  if (typeof window === "undefined") return null;

  try {
    const pendingSerialized = window.sessionStorage.getItem(
      REGISTRATION_PENDING_KEY,
    );
    window.sessionStorage.removeItem(REGISTRATION_PENDING_KEY);

    if (pendingSerialized) {
      const pending = JSON.parse(pendingSerialized) as unknown;
      if (isValidProof(pending, PENDING_TTL_MS)) {
        const session = {
          id: pending.id,
          createdAt: pending.createdAt,
          completeRegistrationSent: false,
          joinGroupSent: false,
        } satisfies AuxiliarContableRegistrationSession;
        persistAuxiliarContableRegistrationSession(session);
        return session;
      }
    }

    const sessionSerialized = window.sessionStorage.getItem(
      REGISTRATION_SESSION_KEY,
    );
    if (!sessionSerialized) return null;

    const stored = JSON.parse(sessionSerialized) as unknown;
    if (!isValidProof(stored, SESSION_TTL_MS)) {
      window.sessionStorage.removeItem(REGISTRATION_SESSION_KEY);
      return null;
    }

    const session = stored as Partial<AuxiliarContableRegistrationSession>;
    return {
      id: stored.id,
      createdAt: stored.createdAt,
      completeRegistrationSent: session.completeRegistrationSent === true,
      joinGroupSent: session.joinGroupSent === true,
    } satisfies AuxiliarContableRegistrationSession;
  } catch {
    return null;
  }
}

export function persistAuxiliarContableRegistrationSession(
  session: AuxiliarContableRegistrationSession,
) {
  try {
    window.sessionStorage.setItem(
      REGISTRATION_SESSION_KEY,
      JSON.stringify(session),
    );
  } catch {
    // El tracking nunca debe bloquear el flujo del usuario.
  }
}

export function getAuxiliarContableEventId(
  event: "complete-registration" | "join-group",
  sessionId: string,
) {
  return `auxiliar-contable-${event}-${sessionId}`;
}
