export const DESPIERTA_WHATSAPP_INTENT_KEY =
  "cefin_despierta_potencial_whatsapp_intent";

const WHATSAPP_INTENT_TTL_MS = 5 * 60 * 1000;

type WhatsAppIntent = {
  id: string;
  expiresAt: number;
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createDespiertaWhatsAppIntent() {
  try {
    const intent: WhatsAppIntent = {
      id: createId(),
      expiresAt: Date.now() + WHATSAPP_INTENT_TTL_MS,
    };
    window.sessionStorage.setItem(
      DESPIERTA_WHATSAPP_INTENT_KEY,
      JSON.stringify(intent),
    );
  } catch {
    // El tracking nunca debe bloquear la navegación hacia WhatsApp.
  }
}

export function consumeDespiertaWhatsAppIntent() {
  let serialized: string | null = null;
  try {
    serialized = window.sessionStorage.getItem(
      DESPIERTA_WHATSAPP_INTENT_KEY,
    );
    window.sessionStorage.removeItem(DESPIERTA_WHATSAPP_INTENT_KEY);
  } catch {
    return null;
  }

  if (!serialized) return null;

  try {
    const intent = JSON.parse(serialized) as WhatsAppIntent;
    if (!intent.id || !Number.isFinite(intent.expiresAt)) return null;
    return intent.expiresAt > Date.now() ? intent : null;
  } catch {
    return null;
  }
}

export function waitForDespiertaMetaPixel(
  onReady: () => void,
  onTimeout: () => void,
) {
  let attempts = 15;
  let timeoutId: number | undefined;
  let cancelled = false;

  const check = () => {
    if (cancelled) return;
    if (window.fbq) {
      onReady();
      return;
    }
    if (attempts <= 0) {
      onTimeout();
      return;
    }
    attempts -= 1;
    timeoutId = window.setTimeout(check, 100);
  };

  check();
  return () => {
    cancelled = true;
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
}
