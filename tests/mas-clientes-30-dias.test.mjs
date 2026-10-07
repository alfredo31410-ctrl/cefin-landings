import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { MAS_CLIENTES_30_DIAS_CAMPAIGN } from "../app/landings/mas-clientes-30-dias/campaign.ts";
import {
  createMasClientes30DiasRegistrationProof,
  getMasClientes30DiasRegistrationSession,
  readMasClientes30DiasAttribution,
  withMasClientes30DiasAttribution,
} from "../lib/mas-clientes-30-dias-tracking.ts";

test("uses the confirmed campaign details", () => {
  assert.equal(MAS_CLIENTES_30_DIAS_CAMPAIGN.activeCampaignFormId, 359);
  assert.equal(MAS_CLIENTES_30_DIAS_CAMPAIGN.eventDate, "2026-10-13");
  assert.equal(
    MAS_CLIENTES_30_DIAS_CAMPAIGN.whatsappUrl,
    "https://chat.whatsapp.com/H5DkkqR9pAx9rXp5p0kFGX",
  );
});

test("captures and preserves campaign attribution", () => {
  const attribution = readMasClientes30DiasAttribution(
    "?utm_source=facebook&utm_medium=paid_social&utm_campaign=octubre&utm_content=video&utm_term=contadores&campaign_id=1&adset_id=2&ad_id=3&placement=feed&source_platform=facebook&ignored=value",
  );

  assert.deepEqual(attribution, {
    utm_source: "facebook",
    utm_medium: "paid_social",
    utm_campaign: "octubre",
    utm_content: "video",
    utm_term: "contadores",
    campaign_id: "1",
    adset_id: "2",
    ad_id: "3",
    placement: "feed",
    source_platform: "facebook",
  });

  assert.equal(
    withMasClientes30DiasAttribution(
      "/landings/mas-clientes-30-dias/gracias",
      attribution,
    ),
    "/landings/mas-clientes-30-dias/gracias?utm_source=facebook&utm_medium=paid_social&utm_campaign=octubre&utm_content=video&utm_term=contadores&campaign_id=1&adset_id=2&ad_id=3&placement=feed&source_platform=facebook",
  );
});

test("requires a valid form attempt before tracking registration", () => {
  const values = new Map();
  const originalWindow = globalThis.window;
  globalThis.window = {
    sessionStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, String(value)),
      removeItem: (key) => values.delete(key),
    },
  };

  try {
    assert.equal(getMasClientes30DiasRegistrationSession(), null);

    const proof = createMasClientes30DiasRegistrationProof();
    assert.ok(proof?.id);
    assert.equal(createMasClientes30DiasRegistrationProof()?.id, proof.id);

    const session = getMasClientes30DiasRegistrationSession();
    assert.equal(session?.id, proof.id);
    assert.equal(session?.completeRegistrationSent, false);
    assert.equal(session?.joinGroupSent, false);
  } finally {
    if (originalWindow === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = originalWindow;
    }
  }
});

test("keeps the form inline and deduplicates conversion events", async () => {
  const [landingSource, thankYouSource, metaSource] = await Promise.all(
    [
      "../app/landings/mas-clientes-30-dias/page.tsx",
      "../app/landings/mas-clientes-30-dias/gracias/page.tsx",
      "../lib/mas-clientes-30-dias-meta.ts",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  );

  assert.match(landingSource, /id="registro"/);
  assert.doesNotMatch(landingSource, /isModalOpen/);
  assert.match(landingSource, /wrappedShowThankYou/);
  assert.match(landingSource, /"activecampaign_callback"/);
  assert.match(landingSource, /phoneInstance\.setCountry\("mx"\)/);
  assert.match(landingSource, /padding-left:\s*104px !important/);
  assert.match(thankYouSource, /"thank_you_redirect"/);
  assert.match(thankYouSource, /"JoinGroup"/);
  assert.doesNotMatch(thankYouSource, /trackMetaEvent\("Lead"/);
  assert.match(
    metaSource,
    /if \(session\.completeRegistrationSent\) return false;/,
  );
});
