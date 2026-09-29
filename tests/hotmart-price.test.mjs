import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  fetchOfferByCode,
  formatHotmartPrice,
  HotmartApiError,
  requestAccessToken,
  resolveHotmartPrice,
} from "../lib/hotmart/api.ts";

const baseConfig = {
  route: "/test",
  productUcode: "11111111-1111-1111-8111-111111111111",
  offerCode: "offer-exact",
  fallbackPrice: 5987,
  currency: "MXN",
  locale: "es-MX",
  enabled: true,
};

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("accepts a valid Hotmart response and selects the exact offerCode", async () => {
  const offer = await fetchOfferByCode({
    productUcode: baseConfig.productUcode,
    offerCode: baseConfig.offerCode,
    accessToken: "access-token",
    fetchImplementation: async () =>
      jsonResponse({
        items: [
          { code: "main-but-wrong", is_main_offer: true, price: { value: 999, currency_code: "MXN" } },
          { code: "offer-exact", is_main_offer: false, price: { value: 6123, currency_code: "MXN" } },
        ],
        page_info: { next_page_token: null },
      }),
  });

  assert.equal(offer.code, "offer-exact");
  assert.equal(offer.price.value, 6123);
});

test("throws a controlled error when the exact offer does not exist", async () => {
  await assert.rejects(
    fetchOfferByCode({
      productUcode: baseConfig.productUcode,
      offerCode: "missing",
      accessToken: "access-token",
      fetchImplementation: async () =>
        jsonResponse({
          items: [{ code: "other", price: { value: 100, currency_code: "MXN" } }],
          page_info: { next_page_token: null },
        }),
    }),
    (error) => error instanceof HotmartApiError && error.status === 404,
  );
});

test("reports authentication errors without exposing credentials", async () => {
  const credentials = {
    clientId: "private-client-id",
    clientSecret: "private-client-secret",
    basicToken: "private-basic-token",
  };

  await assert.rejects(
    requestAccessToken(credentials, async () => jsonResponse({ error: "unauthorized" }, 401)),
    (error) => {
      assert.equal(error.status, 401);
      assert.doesNotMatch(error.message, /private-client|private-basic/);
      return true;
    },
  );
});

test("aborts a Hotmart request after the configured timeout", async () => {
  const neverCompletes = (_url, init) =>
    new Promise((_resolve, reject) => {
      init.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    });

  await assert.rejects(
    requestAccessToken(
      { clientId: "id", clientSecret: "secret", basicToken: "basic" },
      neverCompletes,
      5,
    ),
    /timed out/,
  );
});

test("uses the fallback when the Hotmart API is unavailable", async () => {
  const result = await resolveHotmartPrice(baseConfig, async () => {
    throw new TypeError("network unavailable");
  });

  assert.equal(result.source, "fallback");
  assert.equal(result.value, 5987);
  assert.equal(result.formatted, "$5,987 MXN");
});

test("formats MXN with Intl.NumberFormat", () => {
  assert.equal(formatHotmartPrice(5987, "MXN", "es-MX"), "$5,987 MXN");
});

test("uses a valid live price instead of the fallback", async () => {
  const result = await resolveHotmartPrice(baseConfig, async () => ({
    code: "offer-exact",
    price: { value: 6200, currency_code: "MXN" },
  }));

  assert.equal(result.source, "hotmart");
  assert.equal(result.formatted, "$6,200 MXN");
});

async function listSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory() && [".git", ".next", "node_modules"].includes(entry.name)) {
        return [];
      }
      return entry.isDirectory() ? listSourceFiles(path) : [path];
    }),
  );
  return files.flat();
}

test("keeps Hotmart credentials out of Client Components", async () => {
  const sourceFiles = await listSourceFiles(fileURLToPath(new URL("../", import.meta.url)));
  const relevantFiles = sourceFiles.filter(
    (path) => /\.(ts|tsx)$/.test(path) && !path.includes("/node_modules/") && !path.includes("/.next/"),
  );

  for (const path of relevantFiles) {
    const source = await readFile(path, "utf8");
    if (/^["']use client["'];/m.test(source)) {
      assert.doesNotMatch(
        source,
        /HOTMART_(CLIENT_ID|CLIENT_SECRET|BASIC_TOKEN)/,
        `Credential reference found in Client Component: ${path}`,
      );
    }
  }

  const serverSource = await readFile(new URL("../lib/hotmart/server.ts", import.meta.url), "utf8");
  assert.match(serverSource, /import ["']server-only["']/);
});
