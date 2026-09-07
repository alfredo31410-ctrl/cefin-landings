export const CONSTRUCTORAS_REGISTRATION_ATTEMPT_KEY =
  "cefin_constructoras_registration_attempt";

const CONSTRUCTORAS_ATTRIBUTION_KEY = "cefinConstructorasAttribution";
const REGISTRATION_TTL_MS = 15 * 60 * 1000;

const ATTRIBUTION_FIELDS = [
  { names: ["utm_source"], fieldId: 7 },
  { names: ["utm_medium"], fieldId: 8 },
  { names: ["utm_campaign"], fieldId: 9 },
  { names: ["utm_content"], fieldId: 10 },
  { names: ["utm_term"], fieldId: 11 },
  { names: ["paiscampana", "pais_campana"], fieldId: 12 },
] as const;

type TemporaryProof = {
  id: string;
  createdAt: number;
  expiresAt: number;
};

type AttributionValues = Record<string, string>;

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readStoredAttribution() {
  try {
    const serialized = window.sessionStorage.getItem(
      CONSTRUCTORAS_ATTRIBUTION_KEY,
    );
    if (!serialized) return {};

    const parsed = JSON.parse(serialized) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] =>
          typeof entry[1] === "string" && Boolean(entry[1].trim()),
      ),
    );
  } catch {
    return {};
  }
}

export function captureConstructorasAttribution() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(
    ATTRIBUTION_FIELDS.flatMap(({ names }) => {
      const value = names
        .map((name) => params.get(name)?.trim() || "")
        .find(Boolean);
      return value ? [[names[0], value]] : [];
    }),
  );
  const attribution = {
    ...readStoredAttribution(),
    ...current,
  } satisfies AttributionValues;

  if (Object.keys(attribution).length > 0) {
    try {
      window.sessionStorage.setItem(
        CONSTRUCTORAS_ATTRIBUTION_KEY,
        JSON.stringify(attribution),
      );
    } catch {
      // Attribution must never interrupt registration.
    }
  }

  return attribution;
}

export function syncConstructorasAttributionFields(form: HTMLFormElement) {
  const attribution = captureConstructorasAttribution();

  ATTRIBUTION_FIELDS.forEach(({ names, fieldId }) => {
    const input = form.querySelector<HTMLInputElement>(
      `input[name="field[${fieldId}]"]`,
    );
    if (input) input.value = attribution[names[0]] || "";
  });
}

export function createConstructorasRegistrationAttempt() {
  if (typeof window === "undefined") return null;

  const createdAt = Date.now();
  const proof = {
    id: createId(),
    createdAt,
    expiresAt: createdAt + REGISTRATION_TTL_MS,
  } satisfies TemporaryProof;

  try {
    window.sessionStorage.setItem(
      CONSTRUCTORAS_REGISTRATION_ATTEMPT_KEY,
      JSON.stringify(proof),
    );
  } catch {
    return null;
  }

  return proof;
}

export function consumeConstructorasRegistrationAttempt() {
  if (typeof window === "undefined") return null;

  let serialized: string | null = null;
  try {
    serialized = window.sessionStorage.getItem(
      CONSTRUCTORAS_REGISTRATION_ATTEMPT_KEY,
    );
    window.sessionStorage.removeItem(CONSTRUCTORAS_REGISTRATION_ATTEMPT_KEY);
  } catch {
    return null;
  }
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

export function getConstructorasEventKey(eventName: string, eventId: string) {
  return `cefin_constructoras_${eventName}_${eventId}`;
}

export function waitForConstructorasMetaPixel(
  onReady: () => void,
  onTimeout: () => void,
) {
  let attempts = 40;
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
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
}
