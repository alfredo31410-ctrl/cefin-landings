const ATTRIBUTION_STORAGE_KEY = "cefinMasClientes30DiasAttribution";
const REGISTRATION_PENDING_KEY =
  "cefin_mas_clientes_30_dias_registration_pending";
const REGISTRATION_SESSION_KEY =
  "cefin_mas_clientes_30_dias_registration_session";
const REGISTRATION_PENDING_TTL_MS = 30 * 60 * 1000;
const REGISTRATION_SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_ATTRIBUTION_VALUE_LENGTH = 250;

export const MAS_CLIENTES_30_DIAS_ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "campaign_id",
  "adset_id",
  "ad_id",
  "placement",
  "source_platform",
  "fbclid",
] as const;

export const MAS_CLIENTES_30_DIAS_ACTIVE_CAMPAIGN_UTM_FIELDS = [
  { name: "utm_source", fieldId: 7 },
  { name: "utm_medium", fieldId: 8 },
  { name: "utm_campaign", fieldId: 9 },
  { name: "utm_content", fieldId: 10 },
  { name: "utm_term", fieldId: 11 },
] as const;

type AttributionParam =
  (typeof MAS_CLIENTES_30_DIAS_ATTRIBUTION_PARAMS)[number];
export type MasClientes30DiasAttribution = Partial<
  Record<AttributionParam, string>
>;

type RegistrationProof = {
  id: string;
  createdAt: number;
};

export type MasClientes30DiasRegistrationSession = RegistrationProof & {
  completeRegistrationSent: boolean;
  joinGroupSent: boolean;
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeAttributionValue(value: string | null | undefined) {
  return value?.trim().slice(0, MAX_ATTRIBUTION_VALUE_LENGTH) || "";
}

function isAttributionParam(name: string): name is AttributionParam {
  return MAS_CLIENTES_30_DIAS_ATTRIBUTION_PARAMS.includes(
    name as AttributionParam,
  );
}

function readStoredAttribution() {
  if (typeof window === "undefined") return {};

  try {
    const serialized = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!serialized) return {};

    const parsed = JSON.parse(serialized) as Record<string, unknown>;
    const attribution: MasClientes30DiasAttribution = {};

    Object.entries(parsed).forEach(([name, value]) => {
      if (!isAttributionParam(name) || typeof value !== "string") return;

      const normalized = normalizeAttributionValue(value);
      if (normalized) attribution[name] = normalized;
    });

    return attribution;
  } catch {
    return {};
  }
}

export function readMasClientes30DiasAttribution(search: string) {
  const searchParams = new URLSearchParams(search);
  const attribution: MasClientes30DiasAttribution = {};

  MAS_CLIENTES_30_DIAS_ATTRIBUTION_PARAMS.forEach((name) => {
    const value = normalizeAttributionValue(searchParams.get(name));
    if (value) attribution[name] = value;
  });

  return attribution;
}

export function captureMasClientes30DiasAttribution() {
  if (typeof window === "undefined") return {};

  const attribution = {
    ...readStoredAttribution(),
    ...readMasClientes30DiasAttribution(window.location.search),
  } satisfies MasClientes30DiasAttribution;

  if (Object.keys(attribution).length > 0) {
    try {
      window.sessionStorage.setItem(
        ATTRIBUTION_STORAGE_KEY,
        JSON.stringify(attribution),
      );
    } catch {
      // Attribution must never interrupt registration.
    }
  }

  return attribution;
}

export function syncMasClientes30DiasAttributionFields(
  form: HTMLFormElement,
) {
  const attribution = captureMasClientes30DiasAttribution();

  MAS_CLIENTES_30_DIAS_ACTIVE_CAMPAIGN_UTM_FIELDS.forEach(
    ({ name, fieldId }) => {
      const value = attribution[name];
      if (!value) return;

      let input = form.querySelector<HTMLInputElement>(
        `input[name="field[${fieldId}]"]`,
      );

      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = `field[${fieldId}]`;
        input.dataset.cefinAttribution = name;
        form.appendChild(input);
      }

      input.value = value;
    },
  );
}

export function withMasClientes30DiasAttribution(
  href: string,
  attribution: MasClientes30DiasAttribution,
) {
  const baseUrl =
    typeof window === "undefined" ? "https://cefin.mx" : window.location.origin;

  try {
    const url = new URL(href, baseUrl);
    MAS_CLIENTES_30_DIAS_ATTRIBUTION_PARAMS.forEach((name) => {
      const value = attribution[name];
      if (value) url.searchParams.set(name, value);
    });

    if (href.startsWith("/")) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return url.toString();
  } catch {
    return href;
  }
}

export function getMasClientes30DiasAttributionUrl(href: string) {
  return withMasClientes30DiasAttribution(
    href,
    captureMasClientes30DiasAttribution(),
  );
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

export function createMasClientes30DiasRegistrationProof() {
  if (typeof window === "undefined") return null;

  try {
    const pendingSerialized = window.sessionStorage.getItem(
      REGISTRATION_PENDING_KEY,
    );
    if (pendingSerialized) {
      const pending = JSON.parse(pendingSerialized) as unknown;
      if (isValidProof(pending, REGISTRATION_PENDING_TTL_MS)) return pending;
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

export function getMasClientes30DiasRegistrationSession() {
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
          completeRegistrationSent: false,
          joinGroupSent: false,
        } satisfies MasClientes30DiasRegistrationSession;
        persistMasClientes30DiasRegistrationSession(session);
        return session;
      }
    }

    const sessionSerialized = window.sessionStorage.getItem(
      REGISTRATION_SESSION_KEY,
    );
    if (!sessionSerialized) return null;

    const stored = JSON.parse(sessionSerialized) as unknown;
    if (!isValidProof(stored, REGISTRATION_SESSION_TTL_MS)) {
      window.sessionStorage.removeItem(REGISTRATION_SESSION_KEY);
      return null;
    }

    const session = stored as Partial<MasClientes30DiasRegistrationSession>;
    return {
      id: stored.id,
      createdAt: stored.createdAt,
      completeRegistrationSent: session.completeRegistrationSent === true,
      joinGroupSent: session.joinGroupSent === true,
    } satisfies MasClientes30DiasRegistrationSession;
  } catch {
    return null;
  }
}

export function persistMasClientes30DiasRegistrationSession(
  session: MasClientes30DiasRegistrationSession,
) {
  try {
    window.sessionStorage.setItem(
      REGISTRATION_SESSION_KEY,
      JSON.stringify(session),
    );
  } catch {
    // Stable event IDs still protect Meta from duplicate events.
  }
}

export function getMasClientes30DiasEventId(
  event: "complete-registration" | "join-group",
  sessionId: string,
) {
  return `mas-clientes-30-dias-${event}-${sessionId}`;
}
