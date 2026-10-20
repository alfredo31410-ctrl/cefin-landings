export const OPENAI_ADS_PIXEL_ID = "2VU6QLpcp3ftZz62182w2P";
export const OPENAI_ADS_SDK_URL = "https://bzrcdn.openai.com/sdk/oaiq.min.js";

type OpenAIAdsRuntime = ((...args: unknown[]) => void) & {
  __oaiqInitialized?: boolean;
  q?: unknown[][];
};

declare global {
  interface Window {
    oaiq?: OpenAIAdsRuntime;
    __cefinOpenAIAdsPixelInitialized?: boolean;
    __cefinOpenAIAdsPixelReady?: Promise<boolean>;
  }
}

const PENDING_REGISTRATION_KEY =
  "cefin_master_ia_openai_registration_pending";
const SENT_REGISTRATION_PREFIX =
  "cefin_master_ia_openai_registration_sent:";
const EVENT_ID_PREFIX = "master_ia_registration_";

type PendingRegistration = {
  eventId: string;
  version: 1;
};

function debugOpenAIAds(event: string, details?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "production") return;

  console.debug(`[OpenAI Ads][Master IA] ${event}`, details ?? {});
}

export function initializeOpenAIAdsPixel() {
  if (typeof window === "undefined") return false;
  if (window.__cefinOpenAIAdsPixelInitialized) return true;

  if (!window.oaiq) {
    const queue: OpenAIAdsRuntime = (...args: unknown[]) => {
      queue.q?.push(args);
    };
    queue.q = [];
    window.oaiq = queue;

    const sdk = document.createElement("script");
    sdk.async = true;
    sdk.src = OPENAI_ADS_SDK_URL;
    sdk.dataset.cefinOpenaiAdsPixel = "true";
    window.__cefinOpenAIAdsPixelReady = new Promise<boolean>((resolve) => {
      sdk.addEventListener(
        "load",
        () => {
          const ready = window.oaiq?.__oaiqInitialized === true;
          debugOpenAIAds(ready ? "sdk_ready" : "sdk_loaded_without_runtime");
          resolve(ready);
        },
        { once: true },
      );
      sdk.addEventListener(
        "error",
        () => {
          debugOpenAIAds("sdk_load_failed");
          resolve(false);
        },
        { once: true },
      );
    });

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(sdk, firstScript);
    } else {
      document.head.appendChild(sdk);
    }
  } else if (window.oaiq.__oaiqInitialized) {
    window.__cefinOpenAIAdsPixelReady = Promise.resolve(true);
  }

  window.oaiq("init", {
    pixelId: OPENAI_ADS_PIXEL_ID,
    debug: process.env.NODE_ENV !== "production",
  });
  window.__cefinOpenAIAdsPixelInitialized = true;
  debugOpenAIAds("pixel_initialized", {
    debug: process.env.NODE_ENV !== "production",
  });

  return true;
}

async function waitForOpenAIAdsPixel() {
  if (!initializeOpenAIAdsPixel()) return false;
  if (window.oaiq?.__oaiqInitialized) return true;

  return (await window.__cefinOpenAIAdsPixelReady) === true;
}

function createEventId() {
  if (typeof crypto.randomUUID === "function") {
    return `${EVENT_ID_PREFIX}${crypto.randomUUID()}`;
  }

  return `${EVENT_ID_PREFIX}${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2)}`;
}

function isPendingRegistration(value: unknown): value is PendingRegistration {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<PendingRegistration>;
  return (
    candidate.version === 1 &&
    typeof candidate.eventId === "string" &&
    candidate.eventId.startsWith(EVENT_ID_PREFIX)
  );
}

function measureRegistrationCompleted(eventId: string) {
  if (!initializeOpenAIAdsPixel() || typeof window.oaiq !== "function") {
    return false;
  }

  window.oaiq(
    "measure",
    "registration_completed",
    { type: "customer_action" },
    { event_id: eventId },
  );
  debugOpenAIAds("registration_completed_queued", { eventId });

  return true;
}

export function confirmMasterIARegistrationForOpenAIAds() {
  if (typeof window === "undefined") return false;

  try {
    const serialized = window.sessionStorage.getItem(PENDING_REGISTRATION_KEY);
    if (serialized) {
      let existing: unknown;
      try {
        existing = JSON.parse(serialized);
      } catch {
        existing = null;
      }

      if (isPendingRegistration(existing)) {
        debugOpenAIAds("registration_confirmation_already_stored", {
          eventId: existing.eventId,
        });
        return true;
      }

      window.sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
    }
  } catch {
    // Fall through to the best-effort in-page queue when storage is unavailable.
  }

  const pending: PendingRegistration = {
    eventId: createEventId(),
    version: 1,
  };

  try {
    window.sessionStorage.setItem(
      PENDING_REGISTRATION_KEY,
      JSON.stringify(pending),
    );
    debugOpenAIAds("registration_confirmation_stored", {
      eventId: pending.eventId,
    });
    return true;
  } catch {
    // If storage is unavailable, queue the confirmed event before the redirect.
    debugOpenAIAds("session_storage_unavailable", {
      eventId: pending.eventId,
    });
    return measureRegistrationCompleted(pending.eventId);
  }
}

export async function sendPendingMasterIARegistrationToOpenAIAds() {
  if (typeof window === "undefined") return false;

  let pending: PendingRegistration;
  try {
    const serialized = window.sessionStorage.getItem(PENDING_REGISTRATION_KEY);
    if (!serialized) {
      debugOpenAIAds("no_pending_registration");
      return false;
    }

    const parsed: unknown = JSON.parse(serialized);
    if (!isPendingRegistration(parsed)) {
      window.sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
      return false;
    }
    pending = parsed;

    if (
      window.sessionStorage.getItem(
        `${SENT_REGISTRATION_PREFIX}${pending.eventId}`,
      )
    ) {
      window.sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
      return false;
    }
  } catch {
    return false;
  }

  try {
    if (!(await waitForOpenAIAdsPixel())) {
      debugOpenAIAds("pending_registration_retained", {
        eventId: pending.eventId,
        reason: "sdk_not_ready",
      });
      return false;
    }

    const currentSerialized = window.sessionStorage.getItem(
      PENDING_REGISTRATION_KEY,
    );
    if (!currentSerialized) return false;

    const currentPending: unknown = JSON.parse(currentSerialized);
    if (
      !isPendingRegistration(currentPending) ||
      currentPending.eventId !== pending.eventId
    ) {
      debugOpenAIAds("pending_registration_retained", {
        eventId: pending.eventId,
        reason: "newer_registration_pending",
      });
      return false;
    }

    if (
      window.sessionStorage.getItem(
        `${SENT_REGISTRATION_PREFIX}${pending.eventId}`,
      )
    ) {
      window.sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
      return false;
    }

    if (!measureRegistrationCompleted(pending.eventId)) return false;

    window.sessionStorage.setItem(
      `${SENT_REGISTRATION_PREFIX}${pending.eventId}`,
      "true",
    );
    window.sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
    debugOpenAIAds("pending_registration_consumed", {
      eventId: pending.eventId,
    });
    return true;
  } catch {
    // Reuse the same event_id on a later retry so OpenAI can deduplicate it.
    return false;
  }
}
