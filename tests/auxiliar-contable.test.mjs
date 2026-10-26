import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  AUXILIAR_EVENT,
  AUXILIAR_WHATSAPP_URL,
} from "../app/landings/auxiliar-contable/config.ts";
import {
  createAuxiliarContableRegistrationProof,
  getAuxiliarContableRegistrationSession,
} from "../lib/auxiliar-contable-tracking.ts";

test("keeps the confirmed campaign details in one config", () => {
  assert.equal(
    AUXILIAR_EVENT.name,
    "Auxiliares Contables con Inteligencia Artificial",
  );
  assert.equal(AUXILIAR_EVENT.activeCampaignFormId, 367);
  assert.equal(AUXILIAR_EVENT.dateIso, "2026-11-03");
  assert.equal(AUXILIAR_EVENT.time, "11:00 AM");
  assert.match(AUXILIAR_WHATSAPP_URL, /^https:\/\/chat\.whatsapp\.com\//);
});

test("does not count a manual thank-you visit as a registration", () => {
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
    assert.equal(getAuxiliarContableRegistrationSession(), null);

    const proof = createAuxiliarContableRegistrationProof();
    assert.ok(proof?.id);
    assert.equal(createAuxiliarContableRegistrationProof()?.id, proof.id);

    const session = getAuxiliarContableRegistrationSession();
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

test("tracks the form funnel without overriding ActiveCampaign fields", async () => {
  const [landingSource, thankYouSource] = await Promise.all(
    [
      "../app/landings/auxiliar-contable/page.tsx",
      "../app/landings/auxiliar-contable/gracias/page.tsx",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  );

  assert.match(landingSource, /OpenRegistrationForm/);
  assert.match(landingSource, /createAuxiliarContableRegistrationProof/);
  assert.match(landingSource, /addEventListener\("submit"/);
  assert.match(thankYouSource, /"CompleteRegistration"/);
  assert.match(thankYouSource, /"JoinGroup"/);
  assert.doesNotMatch(landingSource, /\.ac-modal-wrapper input\s*\{/);
  assert.doesNotMatch(landingSource, /\.ac-modal-wrapper \._submit\s*\{/);
});
