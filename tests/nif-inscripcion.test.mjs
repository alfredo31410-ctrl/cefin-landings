import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = new URL(
  "../app/landings/nif/inscripcion-nif/page.tsx",
  import.meta.url,
);
const trackingPath = new URL(
  "../app/landings/nif/inscripcion-nif/taller-tracking-client.tsx",
  import.meta.url,
);

test("keeps the confirmed NIF workshop offer and Hotmart checkout", async () => {
  const source = await readFile(pagePath, "utf8");

  assert.match(source, /Taller Práctico de NIF/);
  assert.match(source, /23—27 NOV 2026/);
  assert.match(source, /11:00 A\. M\. CDMX/);
  assert.match(source, /\$587|>587</);
  assert.match(source, /Precio de preventa/);
  assert.match(source, /precio subirá/i);
  assert.match(source, /src="\/alfredo-nif\.png"/);
  assert.match(
    source,
    /https:\/\/pay\.hotmart\.com\/H108211101R\?off=9c34jhld&checkoutMode=10/,
  );
});

test("tracks checkout intent without firing a purchase", async () => {
  const source = await readFile(trackingPath, "utf8");

  assert.match(source, /"InitiateCheckout"/);
  assert.doesNotMatch(source, /trackMetaEvent\("Purchase"/);
});
