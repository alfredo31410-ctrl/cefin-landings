const STORAGE_KEY = "cefin:traffic-attribution";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "landing_slug",
] as const;

export type TrafficAttribution = Partial<
  Record<(typeof ATTRIBUTION_KEYS)[number], string>
>;

type StoredAttribution = {
  capturedAt: number;
  values: TrafficAttribution;
};

function readStoredAttribution(): StoredAttribution | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as StoredAttribution;

    if (Date.now() - stored.capturedAt > MAX_AGE_MS) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return stored;
  } catch {
    // Un storage bloqueado no debe impedir que el embudo siga funcionando.
    return null;
  }
}

// Conserva la primera atribución de la sesión y completa solo campos que aún no existían.
export function captureTrafficAttribution(
  search: string,
  landingSlug: string,
): TrafficAttribution {
  const current = readStoredAttribution()?.values ?? {};
  const params = new URLSearchParams(search);
  const incoming: TrafficAttribution = { landing_slug: landingSlug };

  ATTRIBUTION_KEYS.forEach((key) => {
    const value = params.get(key)?.trim();
    if (value) incoming[key] = value;
  });

  // Las UTMs originales prevalecen, pero el slug siempre describe la landing actual.
  const values = { ...incoming, ...current, landing_slug: landingSlug };
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ capturedAt: Date.now(), values }),
    );
  } catch {
    // La atribución es auxiliar: nunca bloquea registro ni navegación.
  }
  return values;
}

export function getTrafficAttribution(): TrafficAttribution {
  return readStoredAttribution()?.values ?? {};
}

// Solo anexa claves permitidas para evitar propagar parámetros arbitrarios entre rutas.
export function withTrafficAttribution(path: string): string {
  const url = new URL(path, window.location.origin);
  const attribution = getTrafficAttribution();
  ATTRIBUTION_KEYS.forEach((key) => {
    const value = attribution[key];
    if (value) url.searchParams.set(key, value);
  });
  return `${url.pathname}${url.search}`;
}
