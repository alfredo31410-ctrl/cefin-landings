import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { productConfig } from "../app/landings/low-tickets/reformas-fiscales-2027/config.ts";

const routeDirectory = new URL(
  "../app/landings/low-tickets/reformas-fiscales-2027/",
  import.meta.url,
);

test("keeps unconfirmed commercial data hidden in central config", () => {
  assert.equal(productConfig.productName, "Reformas Fiscales 2027");
  assert.equal(productConfig.price, null);
  assert.equal(productConfig.originalPrice, null);
  assert.equal(productConfig.checkoutUrl, null);
  assert.equal(productConfig.trackingValue, null);
  assert.equal(productConfig.fallbackCta, "REVISAR EL CONTENIDO");
});

test("implements one semantic H1 and the confirmed metadata", async () => {
  const [pageSource, heroSource] = await Promise.all([
    readFile(new URL("page.tsx", routeDirectory), "utf8"),
    readFile(new URL("components/hero-and-pain.tsx", routeDirectory), "utf8"),
  ]);

  assert.match(pageSource, /Reformas Fiscales 2027 \| CEFIN/);
  assert.equal((heroSource.match(/<h1\b/g) ?? []).length, 1);
});

test("tracks CTA clicks and only initiates checkout when a URL exists", async () => {
  const ctaSource = await readFile(
    new URL("components/cta-link.tsx", routeDirectory),
    "utf8",
  );

  assert.match(ctaSource, /"CTAButtonClick"/);
  assert.match(ctaSource, /if \(!productConfig\.checkoutUrl\) return;/);
  assert.match(ctaSource, /"InitiateCheckout"/);
  assert.match(ctaSource, /productConfig\.trackingValue !== null/);
  assert.match(ctaSource, /fallbackChildren/);
});

test("keeps the IVA comparison responsive without a table", async () => {
  const vatSource = await readFile(
    new URL("components/vat-comparison.tsx", routeDirectory),
    "utf8",
  );

  assert.match(vatSource, /lg:grid-cols-2/);
  assert.doesNotMatch(vatSource, /<table\b/);
  assert.match(vatSource, /El 7% no es automáticamente mejor/);
});

test("keeps the low-ticket story to six sections", async () => {
  const componentFiles = [
    "components/hero-and-pain.tsx",
    "components/reform-sections.tsx",
    "components/vat-comparison.tsx",
    "components/audience-learning-transformation.tsx",
    "components/final-sections.tsx",
  ];
  const sources = await Promise.all(
    componentFiles.map((file) => readFile(new URL(file, routeDirectory), "utf8")),
  );
  const sectionCount = sources.reduce(
    (total, source) => total + (source.match(/<section\b/g) ?? []).length,
    0,
  );

  assert.equal(sectionCount, 6);
  assert.doesNotMatch(sources.join("\n"), /Contador reactivo/);
});
