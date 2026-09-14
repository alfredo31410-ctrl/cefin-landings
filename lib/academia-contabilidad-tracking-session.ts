import {
  getStoredUtmParams,
  readUtmParamsFromSearch,
  saveUtmParams,
  type UtmParamName,
} from "@/lib/hotmart-utms";

const REGISTRATION_PENDING_KEY =
  "cefin_academia_contabilidad_registration_pending";
const REGISTRATION_COMPLETED_KEY =
  "cefin_academia_contabilidad_registration_completed";
const REGISTRATION_PENDING_TTL_MS = 15 * 60 * 1000;
const REGISTRATION_COMPLETED_TTL_MS = 24 * 60 * 60 * 1000;

const ACTIVE_CAMPAIGN_UTM_FIELDS = [
  { name: "utm_source", fieldId: 7 },
  { name: "utm_medium", fieldId: 8 },
  { name: "utm_campaign", fieldId: 9 },
  { name: "utm_content", fieldId: 10 },
  { name: "utm_term", fieldId: 11 },
] as const satisfies ReadonlyArray<{ name: UtmParamName; fieldId: number }>;

type RegistrationProof = {
  id: string;
  createdAt: number;
};

export type AcademiaRegistrationSession = RegistrationProof & {
  registrationTracked: boolean;
  contactTracked: boolean;
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
  const createdAt = Number(proof.createdAt);
  const now = Date.now();

  return (
    typeof proof.id === "string" &&
    proof.id.length > 0 &&
    Number.isFinite(createdAt) &&
    createdAt <= now &&
    now - createdAt <= ttlMs
  );
}

export function captureAcademiaAttribution() {
  if (typeof window === "undefined") return {};

  const attribution = {
    ...getStoredUtmParams(),
    ...readUtmParamsFromSearch(window.location.search),
  };
  saveUtmParams(attribution);
  return attribution;
}

export function syncAcademiaAttributionFields(form: HTMLFormElement) {
  const attribution = captureAcademiaAttribution();

  ACTIVE_CAMPAIGN_UTM_FIELDS.forEach(({ name, fieldId }) => {
    const input = form.querySelector<HTMLInputElement>(
      `input[name="field[${fieldId}]"]`,
    );
    if (input) input.value = attribution[name] || "";
  });
}

export function createAcademiaRegistrationProof() {
  if (typeof window === "undefined") return null;

  const proof = {
    id: createId(),
    createdAt: Date.now(),
  } satisfies RegistrationProof;

  try {
    window.sessionStorage.setItem(
      REGISTRATION_PENDING_KEY,
      JSON.stringify(proof),
    );
    return proof;
  } catch {
    return null;
  }
}

export function clearAcademiaRegistrationProof() {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(REGISTRATION_PENDING_KEY);
  } catch {
    // Storage must never interrupt the ActiveCampaign form.
  }
}

export function getAcademiaRegistrationSession() {
  if (typeof window === "undefined") return null;

  try {
    const pendingSerialized = window.sessionStorage.getItem(
      REGISTRATION_PENDING_KEY,
    );
    window.sessionStorage.removeItem(REGISTRATION_PENDING_KEY);

    if (pendingSerialized) {
      const pending = JSON.parse(pendingSerialized) as unknown;
      if (isValidProof(pending, REGISTRATION_PENDING_TTL_MS)) {
        const session = {
          id: pending.id,
          createdAt: pending.createdAt,
          registrationTracked: false,
          contactTracked: false,
        } satisfies AcademiaRegistrationSession;
        persistAcademiaRegistrationSession(session);
        return session;
      }
    }

    const completedSerialized = window.sessionStorage.getItem(
      REGISTRATION_COMPLETED_KEY,
    );
    if (!completedSerialized) return null;

    const completed = JSON.parse(completedSerialized) as unknown;
    if (!isValidProof(completed, REGISTRATION_COMPLETED_TTL_MS)) {
      window.sessionStorage.removeItem(REGISTRATION_COMPLETED_KEY);
      return null;
    }

    const session = completed as Partial<AcademiaRegistrationSession>;
    return {
      id: completed.id,
      createdAt: completed.createdAt,
      registrationTracked: session.registrationTracked === true,
      contactTracked: session.contactTracked === true,
    } satisfies AcademiaRegistrationSession;
  } catch {
    return null;
  }
}

export function persistAcademiaRegistrationSession(
  session: AcademiaRegistrationSession,
) {
  try {
    window.sessionStorage.setItem(
      REGISTRATION_COMPLETED_KEY,
      JSON.stringify(session),
    );
  } catch {
    // Stable event IDs still protect Meta from duplicate conversions.
  }
}

export function getAcademiaEventId(
  event: "registration" | "contact",
  sessionId: string,
) {
  return `academia-contabilidad-${event}-${sessionId}`;
}
