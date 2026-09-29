import "server-only";

import { cache } from "react";
import { getHotmartOfferConfig, type HotmartOfferKey } from "@/config/hotmart-offers";
import {
  fetchOfferByCode,
  HotmartApiError,
  requestAccessToken,
  resolveHotmartPrice,
} from "@/lib/hotmart/api";
import type {
  HotmartAccessTokenResponse,
  HotmartCredentials,
  HotmartPriceResult,
} from "@/lib/hotmart/types";

const TOKEN_EXPIRY_SAFETY_WINDOW_MS = 60_000;

let cachedToken: { value: string; expiresAt: number } | null = null;
let tokenRequest: Promise<HotmartAccessTokenResponse> | null = null;

function getCredentials(): HotmartCredentials {
  const clientId = process.env.HOTMART_CLIENT_ID;
  const clientSecret = process.env.HOTMART_CLIENT_SECRET;
  const basicToken = process.env.HOTMART_BASIC_TOKEN;

  if (!clientId || !clientSecret || !basicToken) {
    throw new HotmartApiError("Hotmart server credentials are not configured.");
  }

  return { clientId, clientSecret, basicToken };
}

async function getAccessToken(forceRefresh = false) {
  if (!forceRefresh && cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  if (!forceRefresh && tokenRequest) {
    return (await tokenRequest).access_token;
  }

  tokenRequest = requestAccessToken(getCredentials());

  try {
    const response = await tokenRequest;
    const lifetimeMs = response.expires_in * 1_000;
    const safetyWindowMs = Math.min(
      TOKEN_EXPIRY_SAFETY_WINDOW_MS,
      Math.max(1_000, lifetimeMs * 0.1),
    );
    cachedToken = {
      value: response.access_token,
      expiresAt: Date.now() + lifetimeMs - safetyWindowMs,
    };
    return response.access_token;
  } finally {
    tokenRequest = null;
  }
}

async function loadOffer(productUcode: string, offerCode: string) {
  const accessToken = await getAccessToken();

  try {
    return await fetchOfferByCode({ productUcode, offerCode, accessToken });
  } catch (error) {
    if (!(error instanceof HotmartApiError) || error.status !== 401) {
      throw error;
    }

    cachedToken = null;
    const refreshedAccessToken = await getAccessToken(true);
    return fetchOfferByCode({
      productUcode,
      offerCode,
      accessToken: refreshedAccessToken,
    });
  }
}

const getCachedHotmartPrice = cache(async (key: HotmartOfferKey): Promise<HotmartPriceResult> => {
  const config = getHotmartOfferConfig(key);
  return resolveHotmartPrice(config, () => loadOffer(config.productUcode, config.offerCode));
});

export const getHotmartPrice = getCachedHotmartPrice;
