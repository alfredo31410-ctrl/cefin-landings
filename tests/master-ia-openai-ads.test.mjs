import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  confirmMasterIARegistrationForOpenAIAds,
  OPENAI_ADS_PIXEL_ID,
  OPENAI_ADS_SDK_URL,
  sendPendingMasterIARegistrationToOpenAIAds,
} from "../lib/master-ia-openai-ads.ts";

function createBrowserMock() {
  const values = new Map();
  const calls = [];

  return {
    calls,
    values,
    window: {
      __cefinOpenAIAdsPixelInitialized: true,
      oaiq: Object.assign((...args) => calls.push(args), {
        __oaiqInitialized: true,
      }),
      sessionStorage: {
        getItem: (key) => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, String(value)),
        removeItem: (key) => values.delete(key),
      },
    },
  };
}

function restoreWindow(originalWindow) {
  if (originalWindow === undefined) {
    delete globalThis.window;
  } else {
    globalThis.window = originalWindow;
  }
}

test("uses the official OpenAI Ads SDK and assigned pixel", () => {
  assert.equal(OPENAI_ADS_PIXEL_ID, "2VU6QLpcp3ftZz62182w2P");
  assert.equal(OPENAI_ADS_SDK_URL, "https://bzrcdn.openai.com/sdk/oaiq.min.js");
});

test("sends one standard event per confirmed registration", async () => {
  const originalWindow = globalThis.window;
  const browser = createBrowserMock();
  globalThis.window = browser.window;

  try {
    assert.equal(confirmMasterIARegistrationForOpenAIAds(), true);
    const pending = JSON.parse(
      browser.values.get("cefin_master_ia_openai_registration_pending"),
    );
    assert.equal(pending.version, 1);
    assert.match(pending.eventId, /^master_ia_registration_/);

    assert.equal(await sendPendingMasterIARegistrationToOpenAIAds(), true);
    assert.equal(await sendPendingMasterIARegistrationToOpenAIAds(), false);
    assert.equal(browser.calls.length, 1);
    assert.deepEqual(browser.calls[0], [
      "measure",
      "registration_completed",
      { type: "customer_action" },
      { event_id: pending.eventId },
    ]);
    assert.equal(
      browser.values.get(
        `cefin_master_ia_openai_registration_sent:${pending.eventId}`,
      ),
      "true",
    );
    assert.equal(
      browser.values.has("cefin_master_ia_openai_registration_pending"),
      false,
    );

    assert.equal(confirmMasterIARegistrationForOpenAIAds(), true);
    assert.equal(await sendPendingMasterIARegistrationToOpenAIAds(), true);
    assert.equal(browser.calls.length, 2);
    assert.notEqual(browser.calls[1][3].event_id, pending.eventId);
  } finally {
    restoreWindow(originalWindow);
  }
});

test("does not convert a direct or reloaded thank-you visit", async () => {
  const originalWindow = globalThis.window;
  const browser = createBrowserMock();
  globalThis.window = browser.window;

  try {
    assert.equal(await sendPendingMasterIARegistrationToOpenAIAds(), false);
    assert.equal(await sendPendingMasterIARegistrationToOpenAIAds(), false);
    assert.equal(browser.calls.length, 0);
  } finally {
    restoreWindow(originalWindow);
  }
});

test("reuses a pending confirmation after a repeated callback or remount", async () => {
  const originalWindow = globalThis.window;
  const browser = createBrowserMock();
  globalThis.window = browser.window;

  try {
    assert.equal(confirmMasterIARegistrationForOpenAIAds(), true);
    const firstPending = JSON.parse(
      browser.values.get("cefin_master_ia_openai_registration_pending"),
    );
    assert.equal(confirmMasterIARegistrationForOpenAIAds(), true);
    const repeatedPending = JSON.parse(
      browser.values.get("cefin_master_ia_openai_registration_pending"),
    );

    assert.deepEqual(repeatedPending, firstPending);
    assert.equal(await sendPendingMasterIARegistrationToOpenAIAds(), true);
    assert.equal(browser.calls.length, 1);
    assert.equal(browser.calls[0][3].event_id, firstPending.eventId);
  } finally {
    restoreWindow(originalWindow);
  }
});

test("retains a confirmed registration until the SDK is ready", async () => {
  const originalWindow = globalThis.window;
  const browser = createBrowserMock();
  browser.window.oaiq.__oaiqInitialized = false;
  browser.window.__cefinOpenAIAdsPixelReady = Promise.resolve(false);
  globalThis.window = browser.window;

  try {
    assert.equal(confirmMasterIARegistrationForOpenAIAds(), true);
    assert.equal(await sendPendingMasterIARegistrationToOpenAIAds(), false);
    assert.equal(browser.calls.length, 0);
    assert.equal(
      browser.values.has("cefin_master_ia_openai_registration_pending"),
      true,
    );

    browser.window.oaiq.__oaiqInitialized = true;
    browser.window.__cefinOpenAIAdsPixelReady = Promise.resolve(true);
    assert.equal(await sendPendingMasterIARegistrationToOpenAIAds(), true);
    assert.equal(browser.calls.length, 1);
  } finally {
    restoreWindow(originalWindow);
  }
});

test("deduplicates concurrent consumers while the SDK loads", async () => {
  const originalWindow = globalThis.window;
  const browser = createBrowserMock();
  let resolveReady;
  browser.window.oaiq.__oaiqInitialized = false;
  browser.window.__cefinOpenAIAdsPixelReady = new Promise((resolve) => {
    resolveReady = resolve;
  });
  globalThis.window = browser.window;

  try {
    confirmMasterIARegistrationForOpenAIAds();
    const firstConsumer = sendPendingMasterIARegistrationToOpenAIAds();
    const remountedConsumer = sendPendingMasterIARegistrationToOpenAIAds();

    browser.window.oaiq.__oaiqInitialized = true;
    resolveReady(true);
    assert.deepEqual(
      await Promise.all([firstConsumer, remountedConsumer]),
      [true, false],
    );
    assert.equal(browser.calls.length, 1);
  } finally {
    restoreWindow(originalWindow);
  }
});

test("limits the integration to verified Master IA success", async () => {
  const [landingSource, thankYouSource, pixelSource] = await Promise.all(
    [
      "../app/landings/master-ia/page.tsx",
      "../app/landings/master-ia/gracias/page.tsx",
      "../lib/master-ia-openai-ads.ts",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  );

  assert.match(landingSource, /MASTER_IA_CAPTURE_CAMPAIGN\.activeCampaignFormId/);
  assert.match(landingSource, /window\._show_thank_you = wrappedShowThankYou/);
  assert.match(landingSource, /window\._load_script = wrappedLoadScript/);
  assert.match(landingSource, /window\._show_error = wrappedShowError/);
  assert.match(landingSource, /requestUrl\.pathname !== "\/proc\.php"/);
  assert.match(
    landingSource,
    /requestUrl\.searchParams\.get\("f"\)[\s\S]*String\(ACTIVE_CAMPAIGN_FORM_ID\)/,
  );
  assert.match(landingSource, /hiddenInstanceId\?\.value !== formInstanceId/);
  assert.match(landingSource, /activeSubmission\.responseAccepted/);
  assert.match(landingSource, /storeVerifiedConfirmation\("redirect"\)/);
  assert.match(landingSource, /originalShowThankYou\?\.\(\.\.\.args\)/);
  assert.doesNotMatch(landingSource, /window\._form_callback\s*=/);
  assert.match(landingSource, /thankYou\?\.style\.display === "block"/);
  assert.match(landingSource, /content\?\.style\.display === "none"/);
  assert.doesNotMatch(landingSource, /utm_source\s*===?\s*["']openai["']/i);
  assert.match(thankYouSource, /sendPendingMasterIARegistrationToOpenAIAds\(\)/);
  assert.match(pixelSource, /debug: process\.env\.NODE_ENV !== "production"/);
  assert.match(landingSource, /process\.env\.NODE_ENV !== "production"/);
  assert.match(landingSource, /cefin_master_ia_openai_debug_trace/);
  assert.match(landingSource, /"hook_installed"/);
  assert.match(landingSource, /"hook_invoked"/);
  assert.match(landingSource, /"validation_accepted"/);
  assert.match(landingSource, /"validation_rejected"/);
  assert.match(landingSource, /"confirmation_stored"/);
  assert.match(landingSource, /"confirmation_storage_failed"/);
  assert.match(landingSource, /"hook_replaced_after_install"/);
  assert.match(landingSource, /"submission_request_verified"/);
  assert.match(landingSource, /"submission_response_rejected"/);
  assert.match(landingSource, /"submission_redirect_response_accepted"/);
  assert.match(landingSource, /"submission_redirect_observed"/);
  assert.doesNotMatch(landingSource, /_form_263/);

  assert.match(landingSource, /trackMetaEvent\("ViewContent"/);
  assert.match(thankYouSource, /trackMetaEvent\("CompleteRegistration"/);
  assert.match(thankYouSource, /trackMetaCustomEvent\("WhatsAppGroupClick"/);
});
