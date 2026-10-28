export const NIF_WHATSAPP_GROUP_URLS = {
  openai: "https://chat.whatsapp.com/CFQawlPYLCN7Y9pCXUDFRD",
  principal: "https://chat.whatsapp.com/IuzCjOKeFDo0mwJ9SjDhaJ",
} as const;

export const NIF_WHATSAPP_SELECTION_STORAGE_KEY =
  "cefin:landings:nif:whatsapp-group:v1";
export const NIF_WHATSAPP_SELECTION_TTL_MS = 2 * 60 * 60 * 1000;

type NifWhatsappGroup = keyof typeof NIF_WHATSAPP_GROUP_URLS;
type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

type StoredSelection = {
  group: NifWhatsappGroup;
  expiresAt: number;
};

function getSessionStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function getStorage(storage: StorageLike | null | undefined) {
  return storage === undefined ? getSessionStorage() : storage;
}

function isNifWhatsappGroup(value: unknown): value is NifWhatsappGroup {
  return value === "openai" || value === "principal";
}

export function selectNifWhatsappGroup(search: string): NifWhatsappGroup {
  const source = new URLSearchParams(search).get("utm_source");
  const normalizedSource = source?.trim().toLowerCase();
  return normalizedSource === "openai" || normalizedSource === "chatgpt_ads"
    ? "openai"
    : "principal";
}

export function captureNifWhatsappSelection(
  search: string,
  options: { storage?: StorageLike | null; now?: number } = {},
) {
  const group = selectNifWhatsappGroup(search);
  const storage = getStorage(options.storage);
  const now = options.now ?? Date.now();

  if (!storage) return NIF_WHATSAPP_GROUP_URLS.principal;

  try {
    storage.setItem(
      NIF_WHATSAPP_SELECTION_STORAGE_KEY,
      JSON.stringify({
        group,
        expiresAt: now + NIF_WHATSAPP_SELECTION_TTL_MS,
      } satisfies StoredSelection),
    );
    return NIF_WHATSAPP_GROUP_URLS[group];
  } catch {
    try {
      storage.removeItem(NIF_WHATSAPP_SELECTION_STORAGE_KEY);
    } catch {
      // El almacenamiento puede estar bloqueado por completo.
    }
    return NIF_WHATSAPP_GROUP_URLS.principal;
  }
}

export function resolveNifWhatsappGroupUrl(
  options: { storage?: StorageLike | null; now?: number } = {},
) {
  const storage = getStorage(options.storage);
  const now = options.now ?? Date.now();

  try {
    const rawSelection = storage?.getItem(NIF_WHATSAPP_SELECTION_STORAGE_KEY);
    if (!rawSelection) return NIF_WHATSAPP_GROUP_URLS.principal;

    const selection = JSON.parse(rawSelection) as Partial<StoredSelection>;
    if (
      !isNifWhatsappGroup(selection.group) ||
      typeof selection.expiresAt !== "number" ||
      !Number.isFinite(selection.expiresAt) ||
      selection.expiresAt <= now
    ) {
      storage?.removeItem(NIF_WHATSAPP_SELECTION_STORAGE_KEY);
      return NIF_WHATSAPP_GROUP_URLS.principal;
    }

    return NIF_WHATSAPP_GROUP_URLS[selection.group];
  } catch {
    return NIF_WHATSAPP_GROUP_URLS.principal;
  }
}
