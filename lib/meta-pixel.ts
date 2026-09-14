export const META_PIXEL_ID = "733425513099672";
export const META_CURRENCY = "MXN";
export const NIF_TRAFFIC_SOURCE_STORAGE_KEY = "nifTrafficSource";
export const NIF_REGISTRATION_ATTEMPT_STORAGE_KEY = "nifRegistrationAttempt";
export const NIF_REGISTRATION_COMPLETION_STORAGE_KEY = "nifRegistrationComplete";

export type MetaEventPayload = Record<string, unknown>;
type MetaEventCommand = "track" | "trackCustom";
type MetaPixelScriptOptions = { trackPageView?: boolean };

type MetaPixelRuntime = ((command: string, ...args: unknown[]) => void) & {
  callMethod?: (command: string, ...args: unknown[]) => void;
  queue: unknown[][];
  push: (command: string, ...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
    _fbq?: (command: string, ...args: unknown[]) => void;
    __cefinMetaPixelInitialized?: boolean;
  }
}

/**
 * Installs Meta's queue synchronously and starts loading fbevents.js without
 * waiting for the network. Calls to fbq can then be queued before navigation.
 */
export function initializeMetaPixel(
  pixelId = META_PIXEL_ID,
  { trackPageView = true }: MetaPixelScriptOptions = {},
) {
  if (typeof window === "undefined") return;

  if (typeof window.fbq !== "function") {
    const fbq = function metaPixelQueue(
      command: string,
      ...args: unknown[]
    ) {
      if (fbq.callMethod) {
        fbq.callMethod(command, ...args);
        return;
      }

      fbq.queue.push([command, ...args]);
    } as MetaPixelRuntime;

    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.cefinMetaPixel = "true";

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  if (!window.__cefinMetaPixelInitialized && window.fbq) {
    window.fbq("init", pixelId);
    if (trackPageView) window.fbq("track", "PageView");
    window.__cefinMetaPixelInitialized = true;
  }
}

function runWhenMetaPixelReady(callback: () => void, attempts = 20) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    callback();
    return;
  }

  if (attempts <= 0) return;

  window.setTimeout(() => runWhenMetaPixelReady(callback, attempts - 1), 150);
}

function sendMetaEvent(
  command: MetaEventCommand,
  event: string,
  data?: MetaEventPayload,
  options?: MetaEventPayload,
) {
  runWhenMetaPixelReady(() => {
    if (!window.fbq) return;

    if (data && options) {
      window.fbq(command, event, data, options);
      return;
    }

    if (data) {
      window.fbq(command, event, data);
      return;
    }

    window.fbq(command, event);
  });
}

export function trackMetaEvent(
  event: string,
  data?: MetaEventPayload,
  options?: MetaEventPayload,
) {
  sendMetaEvent("track", event, data, options);
}

export function trackMetaCustomEvent(event: string, data?: MetaEventPayload) {
  sendMetaEvent("trackCustom", event, data);
}

/**
 * Sends a voluntary interaction event without waiting for Meta Pixel.
 * Navigation must never be held up by analytics availability.
 */
export function trackMetaCustomEventImmediate(
  event: string,
  data?: MetaEventPayload,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  if (data) {
    window.fbq("trackCustom", event, data);
    return;
  }

  window.fbq("trackCustom", event);
}

export function getMetaPixelScript(
  pixelId = META_PIXEL_ID,
  { trackPageView = true }: MetaPixelScriptOptions = {},
) {
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    if (!window.__cefinMetaPixelInitialized) {
      fbq('init', '${pixelId}');
      ${trackPageView ? "fbq('track', 'PageView');" : ""}
      window.__cefinMetaPixelInitialized = true;
    }
  `;
}

export function getMetaPixelNoscriptUrl(pixelId = META_PIXEL_ID) {
  return `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
}



