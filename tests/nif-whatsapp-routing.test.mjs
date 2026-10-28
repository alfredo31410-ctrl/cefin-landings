import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  captureNifWhatsappSelection,
  NIF_WHATSAPP_GROUP_URLS,
  NIF_WHATSAPP_SELECTION_STORAGE_KEY,
  NIF_WHATSAPP_SELECTION_TTL_MS,
  resolveNifWhatsappGroupUrl,
  selectNifWhatsappGroup,
} from "../app/landings/nif/nif-whatsapp-routing.ts";

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
    values,
  };
}

test("routes utm_source=chatgpt_ads to the exclusive group and preserves it", () => {
  const storage = createStorage();
  const now = 1_000;

  assert.equal(
    captureNifWhatsappSelection(
      "?utm_source=chatgpt_ads&utm_campaign=campaign-123",
      { storage, now },
    ),
    NIF_WHATSAPP_GROUP_URLS.openai,
  );
  assert.equal(
    resolveNifWhatsappGroupUrl({ storage, now: now + 60_000 }),
    NIF_WHATSAPP_GROUP_URLS.openai,
  );
});

test("keeps utm_source=openai as a compatible OpenAI source", () => {
  assert.equal(
    selectNifWhatsappGroup("?utm_source=OpenAI"),
    "openai",
  );
});

test("routes every other explicit source to the principal group", () => {
  const storage = createStorage();

  assert.equal(
    captureNifWhatsappSelection("?utm_source=facebook", { storage, now: 1 }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
  assert.equal(
    resolveNifWhatsappGroupUrl({ storage, now: 2 }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
});

test("utm_campaign never changes the selected group", () => {
  assert.equal(
    selectNifWhatsappGroup(
      "?utm_source=chatgpt_ads&utm_campaign=first-campaign",
    ),
    "openai",
  );
  assert.equal(
    selectNifWhatsappGroup(
      "?utm_source=chatgpt_ads&utm_campaign=another-campaign",
    ),
    "openai",
  );
  assert.equal(
    selectNifWhatsappGroup("?utm_source=facebook&utm_campaign=openai"),
    "principal",
  );
  assert.equal(
    selectNifWhatsappGroup("?utm_campaign=campaign-without-source"),
    "principal",
  );
});

test("missing or invalid selections use the principal group", () => {
  const emptyStorage = createStorage();
  assert.equal(
    resolveNifWhatsappGroupUrl({ storage: emptyStorage, now: 1 }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );

  emptyStorage.setItem(
    NIF_WHATSAPP_SELECTION_STORAGE_KEY,
    JSON.stringify({
      group: "https://evil.example/group",
      expiresAt: 10_000,
    }),
  );
  assert.equal(
    resolveNifWhatsappGroupUrl({ storage: emptyStorage, now: 2 }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
});

test("a new landing visit without UTMs replaces an old OpenAI origin", () => {
  const storage = createStorage();
  captureNifWhatsappSelection("?utm_source=openai", { storage, now: 1_000 });

  assert.equal(
    captureNifWhatsappSelection("", { storage, now: 2_000 }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
  assert.equal(
    resolveNifWhatsappGroupUrl({ storage, now: 3_000 }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
});

test("reloading thanks keeps a valid selection", () => {
  const storage = createStorage();
  captureNifWhatsappSelection("?utm_source=openai", { storage, now: 1_000 });

  assert.equal(
    resolveNifWhatsappGroupUrl({ storage, now: 2_000 }),
    NIF_WHATSAPP_GROUP_URLS.openai,
  );
  assert.equal(
    resolveNifWhatsappGroupUrl({ storage, now: 3_000 }),
    NIF_WHATSAPP_GROUP_URLS.openai,
  );
});

test("an expired origin falls back to principal and is removed", () => {
  const storage = createStorage();
  captureNifWhatsappSelection("?utm_source=openai", { storage, now: 1_000 });

  assert.equal(
    resolveNifWhatsappGroupUrl({
      storage,
      now: 1_000 + NIF_WHATSAPP_SELECTION_TTL_MS + 1,
    }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
  assert.equal(storage.values.has(NIF_WHATSAPP_SELECTION_STORAGE_KEY), false);
});

test("storage failure and untrusted destination parameters use principal", () => {
  const failingStorage = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
    removeItem: () => {
      throw new Error("blocked");
    },
  };

  assert.equal(
    captureNifWhatsappSelection(
      "?utm_source=openai&group_url=https://evil.example/group",
      { storage: failingStorage, now: 1 },
    ),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
  assert.equal(
    resolveNifWhatsappGroupUrl({ storage: failingStorage, now: 2 }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );

  const staleValues = new Map([
    [
      NIF_WHATSAPP_SELECTION_STORAGE_KEY,
      JSON.stringify({ group: "openai", expiresAt: 10_000 }),
    ],
  ]);
  const writeBlockedStorage = {
    getItem: (key) => staleValues.get(key) ?? null,
    setItem: () => {
      throw new Error("quota");
    },
    removeItem: (key) => staleValues.delete(key),
  };
  assert.equal(
    captureNifWhatsappSelection("", {
      storage: writeBlockedStorage,
      now: 1,
    }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
  assert.equal(staleValues.has(NIF_WHATSAPP_SELECTION_STORAGE_KEY), false);

  const storage = createStorage();
  captureNifWhatsappSelection(
    "?utm_source=other&destination=https://evil.example/group",
    { storage, now: 1 },
  );
  assert.equal(
    resolveNifWhatsappGroupUrl({ storage, now: 2 }),
    NIF_WHATSAPP_GROUP_URLS.principal,
  );
});

test("only the NIF landing and its real thanks page consume the routing", async () => {
  const [landingSource, thanksSource, confirmationSource, routingSource] =
    await Promise.all(
    [
      "../app/landings/nif/nif-landing-client.tsx",
      "../app/landings/nif/registro/gracias/gracias-nif-client.tsx",
      "../app/landings/nif/registro/confirmar/route.ts",
      "../app/landings/nif/nif-whatsapp-routing.ts",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  );

  assert.match(landingSource, /captureNifWhatsappSelection/);
  assert.match(thanksSource, /resolveNifWhatsappGroupUrl/);
  assert.equal((thanksSource.match(/href=\{groupUrl\}/g) ?? []).length, 2);
  assert.match(
    confirmationSource,
    /const thanksPath = "\/landings\/nif\/registro\/gracias"/,
  );
  assert.doesNotMatch(routingSource, /trackMeta|fbq|vk|openaiq/i);
  assert.match(landingSource, /trackMetaEvent\("ViewContent"/);
  assert.match(thanksSource, /trackMetaEvent\(\s*"CompleteRegistration"/);
  assert.match(thanksSource, /trackMetaCustomEventImmediate\("JoinGroup"/);
});
