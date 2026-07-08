export const HOTMART_UTM_STORAGE_KEY = "cefinHotmartUtmParams";

export const UTM_PARAM_NAMES = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmParamName = (typeof UTM_PARAM_NAMES)[number];
export type UtmParams = Partial<Record<UtmParamName, string>>;

function hasUtmParams(params: UtmParams) {
  return Object.keys(params).length > 0;
}

function isUtmParamName(name: string): name is UtmParamName {
  return UTM_PARAM_NAMES.includes(name as UtmParamName);
}

function isHotmartUrl(url: URL) {
  return url.hostname === "hotmart.com" || url.hostname.endsWith(".hotmart.com");
}

export function readUtmParamsFromSearch(search: string) {
  const searchParams = new URLSearchParams(search);
  const utmParams: UtmParams = {};

  UTM_PARAM_NAMES.forEach((name) => {
    const value = searchParams.get(name);

    if (value) {
      utmParams[name] = value;
    }
  });

  return utmParams;
}

export function saveUtmParams(params: UtmParams) {
  if (!hasUtmParams(params) || typeof window === "undefined") return;

  window.sessionStorage.setItem(
    HOTMART_UTM_STORAGE_KEY,
    JSON.stringify(params),
  );
}

export function getStoredUtmParams() {
  if (typeof window === "undefined") return {};

  try {
    const storedValue = window.sessionStorage.getItem(HOTMART_UTM_STORAGE_KEY);
    if (!storedValue) return {};

    const parsedValue = JSON.parse(storedValue) as Record<string, unknown>;
    const utmParams: UtmParams = {};

    Object.entries(parsedValue).forEach(([name, value]) => {
      if (isUtmParamName(name) && typeof value === "string" && value) {
        utmParams[name] = value;
      }
    });

    return utmParams;
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

