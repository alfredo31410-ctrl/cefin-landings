import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the NIF thank-you page scrollable across viewport sizes", async () => {
  const [styles, client] = await Promise.all([
    readFile(
      new URL(
        "../app/landings/nif/registro/gracias/gracias-nif.module.css",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../app/landings/nif/registro/gracias/gracias-nif-client.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  const pageRule = styles.match(/\.page\s*\{[\s\S]*?\}/)?.[0] ?? "";
  assert.match(pageRule, /flex-shrink:\s*0/);
  assert.match(pageRule, /overflow:\s*clip/);
  assert.match(pageRule, /touch-action:\s*pan-y/);
  assert.doesNotMatch(pageRule, /overflow:\s*hidden/);

  assert.match(client, /function unlockDocumentScroll\(\)/);
  assert.match(client, /removeProperty\("overflow"\)/);
  assert.match(client, /removeProperty\("overflow-y"\)/);
  assert.match(client, /useEffect\(\(\) => \{\s*unlockDocumentScroll\(\);/);
});
