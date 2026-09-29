import { readFile } from "node:fs/promises";
import { requestAccessToken } from "../lib/hotmart/api.ts";

const PRODUCT_API = "https://developers.hotmart.com/products/api/v1/products";
const REQUIRED_VARIABLES = [
  "HOTMART_CLIENT_ID",
  "HOTMART_CLIENT_SECRET",
  "HOTMART_BASIC_TOKEN",
];

function parseExpectedOffers(audit) {
  return audit
    .split(/\r?\n/)
    .filter((line) => line.startsWith("| `/landings/"))
    .map((line) => {
      const columns = line.split("|").slice(1, -1).map((column) => column.trim());
      const clean = (value) => value.replaceAll("`", "");
      return {
        route: clean(columns[0]),
        offerCode: columns[4] === "Ausente" ? null : clean(columns[4]),
      };
    });
}

async function getJson(url, accessToken, label) {
  let response;

  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    throw new Error(`${label} is unavailable.`);
  }

  if (!response.ok) {
    throw new Error(`${label} failed with HTTP ${response.status}.`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error(`${label} returned invalid JSON.`);
  }
}

async function getAllPages(buildUrl, accessToken, label) {
  const items = [];
  const seenTokens = new Set();
  let pageToken = null;

  for (let page = 0; page < 1_000; page += 1) {
    const url = buildUrl(pageToken);
    const payload = await getJson(url, accessToken, label);

    if (!payload || !Array.isArray(payload.items)) {
      throw new Error(`${label} returned an invalid page.`);
    }

    items.push(...payload.items);
    const nextToken = payload.page_info?.next_page_token;
    if (typeof nextToken !== "string" || nextToken.length === 0) {
      return items;
    }
    if (seenTokens.has(nextToken)) {
      throw new Error(`${label} returned a repeated page token.`);
    }

    seenTokens.add(nextToken);
    pageToken = nextToken;
  }

  throw new Error(`${label} exceeded the pagination safety limit.`);
}

function productListUrl(pageToken) {
  const url = new URL(PRODUCT_API);
  url.searchParams.set("max_results", "50");
  if (pageToken) url.searchParams.set("page_token", pageToken);
  return url;
}

function productOffersUrl(productUcode, pageToken) {
  const url = new URL(`${PRODUCT_API}/${encodeURIComponent(productUcode)}/offers`);
  url.searchParams.set("max_results", "50");
  if (pageToken) url.searchParams.set("page_token", pageToken);
  return url;
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

async function main() {
  const presence = Object.fromEntries(
    REQUIRED_VARIABLES.map((name) => [name, Boolean(process.env[name])]),
  );
  const missing = REQUIRED_VARIABLES.filter((name) => !presence[name]);

  console.log(JSON.stringify({ credentialPresence: presence }));
  if (missing.length > 0) {
    process.exitCode = 1;
    return;
  }

  const token = await requestAccessToken({
    clientId: process.env.HOTMART_CLIENT_ID,
    clientSecret: process.env.HOTMART_CLIENT_SECRET,
    basicToken: process.env.HOTMART_BASIC_TOKEN,
  });
  console.log(JSON.stringify({ authentication: "success" }));

  const products = await getAllPages(productListUrl, token.access_token, "Hotmart product list");
  console.log(JSON.stringify({ productCount: products.length }));
  const validProducts = products.filter(
    (product) => typeof product?.ucode === "string" && typeof product?.name === "string",
  );
  const productsWithOffers = await mapWithConcurrency(validProducts, 8, async (product) => {
    const offers = await getAllPages(
      (pageToken) => productOffersUrl(product.ucode, pageToken),
      token.access_token,
      "Hotmart product offers",
    );
    return { name: product.name, productUcode: product.ucode, offers };
  });

  const audit = await readFile(new URL("../docs/hotmart-price-audit.md", import.meta.url), "utf8");
  const expectedOffers = parseExpectedOffers(audit);
  const matches = expectedOffers.map(({ route, offerCode }) => {
    if (!offerCode) {
      return {
        route,
        productName: null,
        productUcode: null,
        expectedOfferCode: null,
        foundOfferCode: null,
        price: null,
        currency: null,
        directLink: null,
        match: "blocked-missing-offer-code",
      };
    }

    const found = productsWithOffers.flatMap((product) =>
      product.offers
        .filter((offer) => offer?.code === offerCode)
        .map((offer) => ({ product, offer })),
    );
    const first = found[0];

    return {
      route,
      productName: first?.product.name ?? null,
      productUcode: first?.product.productUcode ?? null,
      expectedOfferCode: offerCode,
      foundOfferCode: first?.offer.code ?? null,
      price: first?.offer.price?.value ?? null,
      currency: first?.offer.price?.currency_code ?? null,
      directLink: first?.offer.direct_offer_link_for_creator ?? null,
      match: found.length === 0 ? "not-found" : found.length === 1 ? "unique" : "duplicate",
      matchCount: found.length,
    };
  });

  console.log(JSON.stringify({ expectedRouteCount: expectedOffers.length }));
  console.log(JSON.stringify({ matches }));
}

main().catch((error) => {
  console.error(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error." }));
  process.exitCode = 1;
});
