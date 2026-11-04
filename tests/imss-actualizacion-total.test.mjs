import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { imssCampaign, imssTopics } from "../app/landings/IMSS/config.ts";

const sourceDirectory = new URL("../app/landings/IMSS/", import.meta.url);
const routeDirectory = new URL(
  "../app/landings/imss-actualizacion-total/",
  import.meta.url,
);

test("uses the confirmed ActiveCampaign form while downstream steps remain pending", () => {
  assert.equal(imssCampaign.registration.enabled, true);
  assert.equal(imssCampaign.registration.activeCampaignFormId, 375);
  assert.equal(
    imssCampaign.registration.activeCampaignEmbedUrl,
    "https://cefincapacitacion.activehosted.com/f/embed.php?id=375",
  );
  assert.equal(imssCampaign.registration.whatsappGroupUrl, null);
  assert.equal(
    imssCampaign.registration.thankYouPath,
    "/landings/imss-actualizacion-total/gracias",
  );
});
test("exposes the requested public route from the IMSS source folder", async () => {
  const pageSource = await readFile(new URL("page.tsx", routeDirectory), "utf8");

  assert.match(pageSource, /\.\.\/IMSS\/landing/);
  assert.equal(imssCampaign.publicPath, "/landings/imss-actualizacion-total");
});
test("centralizes the approved context and renders one semantic heading", async () => {
  const landingSource = await readFile(new URL("landing.tsx", sourceDirectory), "utf8");

  assert.equal(imssTopics.length, 4);
  assert.equal(imssCampaign.statement, "Contador: el IMSS cambió. ¿Ya estás al día?");
  assert.equal(imssTopics[0].title, "Accesos y trámites digitales");
  assert.equal(imssTopics[1].title, "Buzón IMSS y Tarjeta Patronal Digital");
  assert.equal(imssTopics[2].title, "Actualizaciones del SUA");
  assert.equal(imssTopics[3].title, "Cambios que impactan el cálculo de cuotas");
  assert.equal(imssCampaign.portrait.src, "/alfredo/DSC_5172-sin-fondo.webp");
  assert.match(landingSource, /<Image/);
  assert.equal((landingSource.match(/<h1\b/g) ?? []).length, 1);
  assert.match(landingSource, /imssTopics\.map/);
  assert.equal(imssCampaign.schedule.dateLabel, "Martes 10 de noviembre");
  assert.equal(imssCampaign.schedule.timeLabel, "11:00 a. m.");
  assert.equal(imssCampaign.schedule.isoDateTime, "2026-11-10T11:00:00-06:00");
});
test("initializes Meta and tracks the landing view before confirmed registration", async () => {
  const trackingSource = await readFile(
    new URL("components/campaign-tracking.tsx", sourceDirectory),
    "utf8",
  );

  assert.match(trackingSource, /initializeMetaPixel/);
  assert.match(trackingSource, /trackMetaEvent\("PageView"\)/);
  assert.match(trackingSource, /imssCampaign\.tracking\.viewEvent/);
  assert.equal(imssCampaign.tracking.viewEvent, "ViewContent");
  assert.equal(imssCampaign.tracking.formSubmissionEvent, "Lead");
  assert.equal(imssCampaign.tracking.joinIntentEvent, "JoinGroupIntent");
  assert.equal(imssCampaign.tracking.conversionEvent, "CompleteRegistration");
});
test("defaults WhatsApp to Mexico and only tracks a verified confirmation", async () => {
  const [adapterSource, formSource, thankYouTrackingSource] = await Promise.all([
    readFile(new URL("registration-adapter.ts", sourceDirectory), "utf8"),
    readFile(new URL("components/registration-form.tsx", sourceDirectory), "utf8"),
    readFile(new URL("components/thank-you-tracking.tsx", sourceDirectory), "utf8"),
  ]);

  assert.equal(imssCampaign.registration.defaultDialCode, "+52");
  assert.match(adapterSource, /input\[name="firstname"\]/);
  assert.match(adapterSource, /input\[name="lastname"\]/);
  assert.match(adapterSource, /input\[name="phone"\]/);
  assert.doesNotMatch(adapterSource, /field\.value\s*=\s*["'`]\+52/);
  assert.match(formSource, /isVerifiedActiveCampaignSuccess/);
  assert.match(formSource, /document\.querySelector<HTMLFormElement>\(`form\._form_\$\{FORM_ID\}`\)/);
  assert.match(formSource, /observer\.observe\(document\.body/);
  assert.match(formSource, /const form = findInjectedForm\(\)/);
  assert.match(formSource, /trackConfirmedImssLead/);
  assert.match(formSource, /persistImssRegistrationConfirmation/);
  assert.match(formSource, /window\.location\.assign\(getImssThankYouUrl\(\)\)/);
  assert.match(thankYouTrackingSource, /consumeImssRegistrationConfirmation/);
  assert.match(thankYouTrackingSource, /if \(!confirmationId\) return/);
  assert.match(thankYouTrackingSource, /trackConfirmedImssLead/);
  assert.doesNotMatch(adapterSource, /localStorage/);
  assert.doesNotMatch(adapterSource, /fetch\(/);
});

test("provides a branded noindex thank-you route without trusting direct visits", async () => {
  const [routeSource, pageSource, ctaSource, cssSource] = await Promise.all([
    readFile(new URL("gracias/page.tsx", routeDirectory), "utf8"),
    readFile(new URL("gracias/page.tsx", sourceDirectory), "utf8"),
    readFile(new URL("components/whatsapp-reservation-cta.tsx", sourceDirectory), "utf8"),
    readFile(new URL("thanks.module.css", sourceDirectory), "utf8"),
  ]);

  assert.match(routeSource, /\.\.\/\.\.\/IMSS\/gracias\/page/);
  assert.match(pageSource, /robots:/);
  assert.match(pageSource, /index: false/);
  assert.match(pageSource, /ImssThankYouPage/);
  assert.match(ctaSource, /joinIntentEvent/);
  assert.doesNotMatch(ctaSource, /CompleteRegistration/);
  assert.match(cssSource, /prefers-reduced-motion: reduce/);
});

test("lets ActiveCampaign own all embedded form styles", async () => {
  const cssSource = await readFile(
    new URL("landing.module.css", sourceDirectory),
    "utf8",
  );

  assert.doesNotMatch(cssSource, /:global\(\._form_375\)/);
  assert.doesNotMatch(cssSource, /activeCampaignForm\s+:global/);
});
