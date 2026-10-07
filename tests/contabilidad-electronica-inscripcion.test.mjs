import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL(
  "../app/landings/contabilidad-electronica/inscripcion/page.tsx",
  import.meta.url,
);
const trackingUrl = new URL(
  "../app/landings/contabilidad-electronica/inscripcion/tracking.tsx",
  import.meta.url,
);
const configUrl = new URL(
  "../app/landings/contabilidad-electronica/inscripcion/config.ts",
  import.meta.url,
);

test("links Contabilidad Electrónica 2026 to the confirmed Hotmart offer", async () => {
  const offersSource = await readFile(
    new URL("../config/hotmart-offers.ts", import.meta.url),
    "utf8",
  );
  const configSource = await readFile(configUrl, "utf8");

  assert.match(
    offersSource,
    /contabilidadElectronicaInscripcion:\s*{[\s\S]*?route: "\/landings\/contabilidad-electronica\/inscripcion"/,
  );
  assert.match(offersSource, /productUcode: "a2a5c8a5-329f-42f8-8928-9c60a862d877"/);
  assert.match(offersSource, /offerCode: "bg8976r5"/);
  assert.match(offersSource, /fallbackPrice: 1287/);
  assert.match(
    offersSource,
    /contabilidadElectronicaInscripcion:\s*{[\s\S]*?enabled: true/,
  );
  assert.match(
    configSource,
    /pay\.hotmart\.com\/A105920735V\?off=bg8976r5&checkoutMode=10/,
  );
});

test("tracks the sales funnel without firing Purchase from the landing", async () => {
  const trackingSource = await readFile(trackingUrl, "utf8");

  assert.match(trackingSource, /"ViewContent"/);
  assert.match(trackingSource, /"InitiateCheckout"/);
  assert.match(trackingSource, /Purchase se confirma exclusivamente en Hotmart/);
  assert.doesNotMatch(trackingSource, /trackMetaEvent\("Purchase"/);
  assert.match(trackingSource, /content_ids/);
});

test("keeps the inscription skeleton and Hotmart-backed price", async () => {
  const pageSource = await readFile(pageUrl, "utf8");

  assert.match(pageSource, /El problema/);
  assert.match(pageSource, /Lo que vas a lograr/);
  assert.match(pageSource, /Ruta de aprendizaje/);
  assert.match(pageSource, /Esto es para ti si/);
  assert.match(pageSource, /Qué incluye tu inscripción/);
  assert.match(pageSource, /Preguntas frecuentes/);
  assert.match(pageSource, /offer="contabilidadElectronicaInscripcion"/);
  assert.match(pageSource, /location="mobile_sticky"/);
});
