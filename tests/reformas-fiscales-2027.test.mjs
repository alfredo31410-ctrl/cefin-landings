import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { productConfig } from "../app/landings/low-tickets/reformas-fiscales-2027/config.ts";

const routeDirectory = new URL(
  "../app/landings/low-tickets/reformas-fiscales-2027/",
  import.meta.url,
);

test("centralizes the confirmed commercial data without inventing checkout", () => {
  assert.equal(productConfig.productName, "Reformas Fiscales 2027");
  assert.equal(productConfig.price, 297);
  assert.equal(productConfig.originalPrice, null);
  assert.equal(productConfig.checkoutUrl, null);
  assert.equal(productConfig.trackingValue, 297);
  assert.equal(productConfig.cta, "INSCRIBIRME YA");
  assert.equal(productConfig.fallbackCta, "INSCRIBIRME YA");
  assert.equal(productConfig.modality, "Curso online");
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
  assert.ok(
    ctaSource.indexOf("if (!productConfig.checkoutUrl) return;") <
      ctaSource.indexOf('trackMetaEvent("InitiateCheckout"'),
  );
});

test("presents four consistent sales CTAs and the confirmed price", async () => {
  const [heroSource, vatSource, finalSource] = await Promise.all([
    readFile(new URL("components/hero-and-pain.tsx", routeDirectory), "utf8"),
    readFile(new URL("components/vat-comparison.tsx", routeDirectory), "utf8"),
    readFile(new URL("components/final-sections.tsx", routeDirectory), "utf8"),
  ]);
  const salesSource = [heroSource, vatSource, finalSource].join("\n");

  assert.equal((salesSource.match(/INSCRIBIRME YA/g) ?? []).length, 4);
  assert.match(finalSource, /Pago único/);
  assert.match(finalSource, /Pago procesado de forma segura por Hotmart/);
  assert.doesNotMatch(salesSource, /Información comercial en preparación/);
  assert.doesNotMatch(salesSource, /Conoce el contenido antes de que abramos inscripciones/);
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

test("keeps the low-ticket story concise with a local instructor section", async () => {
  const componentFiles = [
    "components/hero-and-pain.tsx",
    "components/reform-sections.tsx",
    "components/vat-comparison.tsx",
    "components/audience-learning-transformation.tsx",
    "components/instructor-section.tsx",
    "components/final-sections.tsx",
  ];
  const sources = await Promise.all(
    componentFiles.map((file) => readFile(new URL(file, routeDirectory), "utf8")),
  );
  const sectionCount = sources.reduce(
    (total, source) => total + (source.match(/<section\b/g) ?? []).length,
    0,
  );

  assert.equal(sectionCount, 7);
  assert.doesNotMatch(sources.join("\n"), /Contador reactivo/);
  assert.match(sources.join("\n"), /instructorConfig\.image/);
});
