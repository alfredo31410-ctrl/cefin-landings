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

test("keeps the NIF workshop checkout without showing a price", async () => {
  const source = await readFile(pagePath, "utf8");

  assert.match(source, /Taller Práctico de NIF/);
  assert.match(source, /23—27 NOV 2026/);
  assert.match(source, /11:00 A\. M\. CDMX/);
  assert.doesNotMatch(source, /\$687|>687</);
  assert.doesNotMatch(source, /Precio de preventa/i);
  assert.doesNotMatch(source, /precio subirá/i);
  assert.equal((source.match(/INSCRIBIRME AHORA/g) ?? []).length, 6);
  assert.match(source, /className="nif-enrollment-card"/);
  assert.match(
    source,
    /src="https:\/\/cefin-landings-z9uk\.vercel\.app\/alfredo-nif\.png"/,
  );
  assert.match(source, /unoptimized/);
  assert.match(
    source,
    /https:\/\/pay\.hotmart\.com\/H108211101R\?off=9c34jhld&checkoutMode=10/,
  );
});

test("tracks checkout intent without firing a purchase", async () => {
  const source = await readFile(trackingPath, "utf8");

  assert.match(source, /"InitiateCheckout"/);
  assert.match(source, /const TALLER_PRICE = 687/);
  assert.doesNotMatch(source, /\b587\b/);
  assert.doesNotMatch(source, /trackMetaEvent\("Purchase"/);
});
