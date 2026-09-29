import type {
  HotmartAccessTokenResponse,
  HotmartCredentials,
  HotmartCurrency,
  HotmartOffer,
  HotmartOfferConfig,
  HotmartOffersPage,
  HotmartPriceResult,
} from "./types";

const AUTH_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";
const OFFERS_API_BASE = "https://developers.hotmart.com/products/api/v1/products";
const SUPPORTED_CURRENCIES = new Set<HotmartCurrency>([
  "MXN",
  "USD",
  "BRL",
  "EUR",
]);
const PRODUCT_UCODE_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type FetchImplementation = typeof fetch;

type NextFetchInit = RequestInit & {
  next?: {
    revalidate: number;
    tags: string[];
  };
};

export class HotmartApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "HotmartApiError";
    this.status = status;
  }
}

function withTimeout(timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeout),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseAccessToken(payload: unknown): HotmartAccessTokenResponse {
  if (
    !isRecord(payload) ||
    typeof payload.access_token !== "string" ||
    payload.access_token.length === 0 ||
    typeof payload.expires_in !== "number" ||
    !Number.isFinite(payload.expires_in) ||
    payload.expires_in <= 0
  ) {
    throw new HotmartApiError("Hotmart returned an invalid authentication response.");
  }

  return {
    access_token: payload.access_token,
    expires_in: payload.expires_in,
    token_type: typeof payload.token_type === "string" ? payload.token_type : undefined,
  };
}

function parseOffer(payload: unknown): HotmartOffer | null {
  if (!isRecord(payload) || typeof payload.code !== "string" || !isRecord(payload.price)) {
    return null;
  }

  const value = payload.price.value;
  const currency = payload.price.currency_code;

  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    typeof currency !== "string" ||
    !SUPPORTED_CURRENCIES.has(currency as HotmartCurrency)
  ) {
    return null;
  }

  return {
    code: payload.code,
    price: {
      value,
      currency_code: currency as HotmartCurrency,
    },
  };
}

function parseOffersPage(payload: unknown): HotmartOffersPage {
  if (!isRecord(payload) || !Array.isArray(payload.items)) {
    throw new HotmartApiError("Hotmart returned an invalid offers response.");
  }

  const items = payload.items.map(parseOffer).filter((offer): offer is HotmartOffer => offer !== null);
  const pageInfo = isRecord(payload.page_info) ? payload.page_info : {};
  const nextPageToken =
    typeof pageInfo.next_page_token === "string" ? pageInfo.next_page_token : null;

  return {
    items,
    page_info: { next_page_token: nextPageToken },
  };
}

async function readJson(response: Response, errorMessage: string) {
  if (!response.ok) {
    throw new HotmartApiError(errorMessage, response.status);
  }

  try {
    return await response.json();
  } catch {
    throw new HotmartApiError("Hotmart returned a non-JSON response.", response.status);
  }
}

export async function requestAccessToken(
  credentials: HotmartCredentials,
  fetchImplementation: FetchImplementation = fetch,
  timeoutMs = 8_000,
) {
  const url = new URL(AUTH_URL);
  url.searchParams.set("grant_type", "client_credentials");
  url.searchParams.set("client_id", credentials.clientId);
  url.searchParams.set("client_secret", credentials.clientSecret);

  const timeout = withTimeout(timeoutMs);
  const authorization = credentials.basicToken.startsWith("Basic ")
    ? credentials.basicToken
    : `Basic ${credentials.basicToken}`;

  try {
    const response = await fetchImplementation(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      signal: timeout.signal,
    });

    const payload = await readJson(response, "Hotmart authentication failed.");
    return parseAccessToken(payload);
  } catch (error) {
    if (error instanceof HotmartApiError) {
      throw error;
    }
    if (timeout.signal.aborted) {
      throw new HotmartApiError("Hotmart authentication timed out.");
    }
    throw new HotmartApiError("Hotmart authentication is unavailable.");
  } finally {
    timeout.clear();
  }
}

async function requestOffersPage(
  productUcode: string,
  accessToken: string,
  pageToken: string | null,
  fetchImplementation: FetchImplementation,
  timeoutMs: number,
  revalidateSeconds: number,
) {
  const url = new URL(`${OFFERS_API_BASE}/${encodeURIComponent(productUcode)}/offers`);
  url.searchParams.set("max_results", "50");
  if (pageToken) {
    url.searchParams.set("page_token", pageToken);
  }

  const timeout = withTimeout(timeoutMs);

  try {
    const init: NextFetchInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: revalidateSeconds,
        tags: [`hotmart-offers-${productUcode}`],
      },
      signal: timeout.signal,
    };
    const response = await fetchImplementation(url, init);
    const payload = await readJson(response, "Hotmart offers request failed.");
    return parseOffersPage(payload);
  } catch (error) {
    if (error instanceof HotmartApiError) {
      throw error;
    }
    if (timeout.signal.aborted) {
      throw new HotmartApiError("Hotmart offers request timed out.");
    }
    throw new HotmartApiError("Hotmart offers API is unavailable.");
  } finally {
    timeout.clear();
  }
}

export async function fetchOfferByCode({
  productUcode,
  offerCode,
  accessToken,
  fetchImplementation = fetch,
  timeoutMs = 8_000,
  revalidateSeconds = 300,
}: {
  productUcode: string;
  offerCode: string;
  accessToken: string;
  fetchImplementation?: FetchImplementation;
  timeoutMs?: number;
  revalidateSeconds?: number;
}) {
  let pageToken: string | null = null;

  for (let page = 0; page < 10; page += 1) {
    const response = await requestOffersPage(
      productUcode,
      accessToken,
      pageToken,
      fetchImplementation,
      timeoutMs,
      revalidateSeconds,
    );
    const exactOffer = response.items.find((offer) => offer.code === offerCode);

    if (exactOffer) {
      return exactOffer;
    }

    pageToken = response.page_info.next_page_token ?? null;
    if (!pageToken) {
      break;
    }
  }

  throw new HotmartApiError("The configured Hotmart offer was not found.", 404);
}

export function formatHotmartPrice(
  value: number,
  currency: HotmartCurrency,
  locale: string,
) {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

  return `${formatted} ${currency}`;
}

export function isHotmartProductUcode(value: string) {
  return PRODUCT_UCODE_PATTERN.test(value);
}

export async function resolveHotmartPrice(
  config: HotmartOfferConfig,
  loadOffer: () => Promise<HotmartOffer>,
): Promise<HotmartPriceResult> {
  if (config.enabled && isHotmartProductUcode(config.productUcode) && config.offerCode) {
    try {
      const offer = await loadOffer();
      return {
        value: offer.price.value,
        currency: offer.price.currency_code,
        formatted: formatHotmartPrice(
          offer.price.value,
          offer.price.currency_code,
          config.locale,
        ),
        source: "hotmart",
      };
    } catch {
      // A checkout must never be blocked by a pricing API failure.
    }
  }

  return {
    value: config.fallbackPrice,
    currency: config.currency,
    formatted: formatHotmartPrice(config.fallbackPrice, config.currency, config.locale),
    source: "fallback",
  };
}
