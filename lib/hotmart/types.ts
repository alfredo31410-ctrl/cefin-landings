export type HotmartCurrency = "MXN" | "USD" | "BRL" | "EUR";

export type HotmartOfferConfig = {
  route: string;
  productUcode: string;
  offerCode: string;
  fallbackPrice: number;
  currency: HotmartCurrency;
  locale: string;
  enabled: boolean;
};

export type HotmartCredentials = {
  clientId: string;
  clientSecret: string;
  basicToken: string;
};

export type HotmartAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type?: string;
};

export type HotmartOffer = {
  code: string;
  price: {
    value: number;
    currency_code: HotmartCurrency;
  };
};

export type HotmartOffersPage = {
  items: HotmartOffer[];
  page_info: {
    next_page_token?: string | null;
  };
};

export type HotmartPriceResult = {
  value: number;
  currency: HotmartCurrency;
  formatted: string;
  source: "hotmart" | "fallback";
};
