import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { CONTABILIDAD_ELECTRONICA_CAMPAIGN } from "../app/landings/contabilidad-electronica/campaign.ts";
import {
  CONTABILIDAD_ELECTRONICA_ACTIVE_CAMPAIGN_UTM_FIELDS,
  createContabilidadElectronicaRegistrationProof,
  getContabilidadElectronicaRegistrationSession,
  readContabilidadElectronicaAttribution,
  withContabilidadElectronicaAttribution,
} from "../lib/contabilidad-electronica-tracking.ts";
import { META_PIXEL_ID } from "../lib/meta-pixel.ts";

test("uses the confirmed ActiveCampaign form and WhatsApp group", async () => {
  assert.equal(CONTABILIDAD_ELECTRONICA_CAMPAIGN.activeCampaignFormId, 351);
  assert.equal(
    CONTABILIDAD_ELECTRONICA_CAMPAIGN.whatsappUrl,
    "https://chat.whatsapp.com/EBdVO3j1ot21ItKlDBqJni",
  );

  const landingSource = await readFile(
    new URL(
      "../app/landings/contabilidad-electronica/page.tsx",
      import.meta.url,
    ),
    "utf8",
  );
  const campaignSource = await readFile(
    new URL(
      "../app/landings/contabilidad-electronica/campaign.ts",
      import.meta.url,
    ),
    "utf8",
  );

  assert.doesNotMatch(landingSource, /form-189|_form_189|id=189/);
  assert.doesNotMatch(campaignSource, /L9kXQbshY6eAotS7H3zjQr/);
});

test("uses the UTM field IDs confirmed in form 351", () => {
  assert.deepEqual(CONTABILIDAD_ELECTRONICA_ACTIVE_CAMPAIGN_UTM_FIELDS, [
    { name: "utm_source", fieldId: 7 },
    { name: "utm_medium", fieldId: 8 },
    { name: "utm_campaign", fieldId: 9 },
    { name: "utm_content", fieldId: 10 },
    { name: "utm_term", fieldId: 11 },
  ]);
});

test("uses the confirmed Meta Pixel without landing-specific secrets", async () => {
  assert.equal(META_PIXEL_ID, "733425513099672");

  const sources = await Promise.all(
    [
      "../app/landings/contabilidad-electronica/page.tsx",
      "../app/landings/contabilidad-electronica/gracias/page.tsx",
      "../app/landings/contabilidad-electronica/campaign.ts",
      "../lib/contabilidad-electronica-tracking.ts",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  );

  sources.forEach((source) => {
    assert.doesNotMatch(
      source,
      /process\.env|Authorization|Bearer\s|API_KEY|CLIENT_SECRET|ACCESS_TOKEN/,
    );
  });
});

test("keeps the confirmed webinar date and time in one campaign config", () => {
  assert.equal(CONTABILIDAD_ELECTRONICA_CAMPAIGN.eventDate, "2026-10-06");
  assert.equal(
    CONTABILIDAD_ELECTRONICA_CAMPAIGN.dateLabel,
    "Martes 6 de octubre de 2026",
  );
  assert.equal(CONTABILIDAD_ELECTRONICA_CAMPAIGN.timeLabel, "11:00 a. m.");
  assert.equal(CONTABILIDAD_ELECTRONICA_CAMPAIGN.timeZoneLabel, "Hora CDMX");
});

test("captures the required Meta attribution parameters", () => {
  const attribution = readContabilidadElectronicaAttribution(
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
});

test("preserves attribution when building the thank-you and WhatsApp URLs", () => {
  const attribution = {
    utm_source: "facebook",
    utm_medium: "paid_social",
    campaign_id: "campaign-123",
  };

  assert.equal(
    withContabilidadElectronicaAttribution(
      "/landings/contabilidad-electronica/gracias",
      attribution,
    ),
    "/landings/contabilidad-electronica/gracias?utm_source=facebook&utm_medium=paid_social&campaign_id=campaign-123",
  );

  assert.equal(
    withContabilidadElectronicaAttribution(
      CONTABILIDAD_ELECTRONICA_CAMPAIGN.whatsappUrl,
      attribution,
    ),
    `${CONTABILIDAD_ELECTRONICA_CAMPAIGN.whatsappUrl}?utm_source=facebook&utm_medium=paid_social&campaign_id=campaign-123`,
  );
});

test("gates CompleteRegistration behind an ActiveCampaign success proof", async () => {
  const landingSource = await readFile(
    new URL(
      "../app/landings/contabilidad-electronica/page.tsx",
      import.meta.url,
    ),
    "utf8",
  );
  const thankYouSource = await readFile(
    new URL(
      "../app/landings/contabilidad-electronica/gracias/page.tsx",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(landingSource, /wrappedShowThankYou/);
  assert.match(
    landingSource,
    /createContabilidadElectronicaRegistrationProof\(\)/,
  );
  assert.match(
    thankYouSource,
    /if \(!session \|\| session\.completeRegistrationSent\) return;/,
  );
  assert.match(thankYouSource, /"CompleteRegistration"/);
  assert.match(thankYouSource, /"JoinGroup"/);
  assert.doesNotMatch(thankYouSource, /trackMetaEvent\("Lead"/);
});

test("does not create a registration session for a manual thank-you visit", () => {
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
    assert.equal(getContabilidadElectronicaRegistrationSession(), null);

    const proof = createContabilidadElectronicaRegistrationProof();
    assert.ok(proof?.id);

    const session = getContabilidadElectronicaRegistrationSession();
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
