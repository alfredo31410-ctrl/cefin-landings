export const HOTMART_UTM_STORAGE_KEY = "cefinHotmartUtmParams";

export const HOTMART_ATTRIBUTION_PARAM_NAMES = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "campaign_id",
  "adset_id",
  "ad_id",
  "placement",
  "landing",
  "producto",
] as const;

export const UTM_PARAM_NAMES = HOTMART_ATTRIBUTION_PARAM_NAMES;

export type UtmParamName = (typeof HOTMART_ATTRIBUTION_PARAM_NAMES)[number];
export type UtmParams = Partial<Record<UtmParamName, string>>;

export function hasUtmParams(params: UtmParams) {
  return Object.keys(params).length > 0;
}

function isUtmParamName(name: string): name is UtmParamName {
  return HOTMART_ATTRIBUTION_PARAM_NAMES.includes(name as UtmParamName);
}

function isHotmartUrl(url: URL) {
  return url.hostname === "hotmart.com" || url.hostname.endsWith(".hotmart.com");
}

export function readUtmParamsFromSearch(search: string) {
  const searchParams = new URLSearchParams(search);
  const utmParams: UtmParams = {};

  HOTMART_ATTRIBUTION_PARAM_NAMES.forEach((name) => {
    const value = searchParams.get(name);

    const normalized = value?.trim();
    if (normalized) {
      utmParams[name] = normalized;
    }
  });

  return utmParams;
}

export function saveUtmParams(params: UtmParams) {
  if (!hasUtmParams(params) || typeof window === "undefined") return;

  const serialized = JSON.stringify(params);
  try {
    window.sessionStorage.setItem(HOTMART_UTM_STORAGE_KEY, serialized);
  } catch {
    // Attribution must never interrupt navigation or registration.
  }

  try {
    window.localStorage.setItem(HOTMART_UTM_STORAGE_KEY, serialized);
  } catch {
    // Local storage is only a fallback when session storage is unavailable.
  }
}

function readStoredUtmParams(storage: Storage) {
  try {
    const storedValue = storage.getItem(HOTMART_UTM_STORAGE_KEY);
    if (!storedValue) return {};

    const parsedValue = JSON.parse(storedValue) as Record<string, unknown>;
    const utmParams: UtmParams = {};

    Object.entries(parsedValue).forEach(([name, value]) => {
      if (isUtmParamName(name) && typeof value === "string" && value.trim()) {
        utmParams[name] = value.trim();
      }
    });

    return utmParams;
  } catch {
    return {};
  }
}

export function getStoredUtmParams() {
  if (typeof window === "undefined") return {};

  try {
    const session = readStoredUtmParams(window.sessionStorage);
    if (hasUtmParams(session)) return session;

    return readStoredUtmParams(window.localStorage);
  } catch {
    return {};
  }
}

export function getActiveUtmParams() {
  if (typeof window === "undefined") return {};

  const currentUtmParams = readUtmParamsFromSearch(window.location.search);

  if (hasUtmParams(currentUtmParams)) {
    saveUtmParams(currentUtmParams);
    return currentUtmParams;
  }

  return getStoredUtmParams();
}

export function withHotmartUtmParams(href: string, utmParams: UtmParams) {
  if (!hasUtmParams(utmParams) || typeof window === "undefined") return href;

  try {
    const url = new URL(href, window.location.href);

    if (!isHotmartUrl(url)) {
      return href;
    }

    UTM_PARAM_NAMES.forEach((name) => {
      const value = utmParams[name];

      if (value) {
        url.searchParams.set(name, value);
      }
    });

    return url.toString();
  } catch {
    return href;
  }
}
