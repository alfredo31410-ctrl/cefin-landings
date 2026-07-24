const PROOF_KEY = "cefin:auxiliar-contable:registration-proof";
const PROOF_MAX_AGE_MS = 30 * 60 * 1000;

type RegistrationProof = {
  createdAt: number;
  token: string;
  completeRegistrationTrackedAt?: number;
  joinGroupTrackedAt?: number;
};

function readProof(): RegistrationProof | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(PROOF_KEY);
    if (!raw) return null;
    const proof = JSON.parse(raw) as RegistrationProof;

    if (!proof.token || Date.now() - proof.createdAt > PROOF_MAX_AGE_MS) {
      window.sessionStorage.removeItem(PROOF_KEY);
      return null;
    }
    return proof;
  } catch {
    return null;
  }
}

function writeProof(proof: RegistrationProof) {
  try {
    window.sessionStorage.setItem(PROOF_KEY, JSON.stringify(proof));
  } catch {
    // Si sessionStorage no está disponible, se falla de forma cerrada y no se cuenta conversión.
  }
}

// Esta prueba solo debe crearse cuando ActiveCampaign muestre una confirmación de envío exitoso.
export function createRegistrationProof() {
  const token =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  writeProof({ createdAt: Date.now(), token });
}

export function consumeCompleteRegistrationProof(): boolean {
  const proof = readProof();
  if (!proof || proof.completeRegistrationTrackedAt) return false;
  proof.completeRegistrationTrackedAt = Date.now();
  writeProof(proof);
  return true;
}

export function hasRecentRegistrationProof(): boolean {
  return Boolean(readProof());
}

export function hasCompletedRegistration(): boolean {
  return Boolean(readProof()?.completeRegistrationTrackedAt);
}

export function consumeJoinGroupProof(): boolean {
  const proof = readProof();
  if (!proof?.completeRegistrationTrackedAt || proof.joinGroupTrackedAt) {
    return false;
  }
  proof.joinGroupTrackedAt = Date.now();
  writeProof(proof);
  return true;
}
