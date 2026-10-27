import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("uses ActiveCampaign form 371 for the video gift", async () => {
  const source = await readFile(
    new URL("../app/landings/video-regalo/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /const ACTIVE_CAMPAIGN_FORM_ID = 371;/);
  assert.match(source, /embed\.php\?id=\$\{ACTIVE_CAMPAIGN_FORM_ID\}/);
  assert.doesNotMatch(source, /ACTIVE_CAMPAIGN_FORM_ID = 291/);
});
