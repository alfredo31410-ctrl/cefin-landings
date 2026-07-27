export const META_PIXEL_ID = "733425513099672";
export const META_CURRENCY = "MXN";
export const NIF_TRAFFIC_SOURCE_STORAGE_KEY = "nifTrafficSource";
export const NIF_REGISTRATION_ATTEMPT_STORAGE_KEY = "nifRegistrationAttempt";
export const NIF_REGISTRATION_COMPLETION_STORAGE_KEY = "nifRegistrationComplete";

export type MetaEventPayload = Record<string, unknown>;
type MetaEventCommand = "track" | "trackCustom";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
    __cefinMetaPixelInitialized?: boolean;
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

export function getMetaPixelScript(pixelId = META_PIXEL_ID) {
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
      fbq('track', 'PageView');
      window.__cefinMetaPixelInitialized = true;
    }
  `;
}

export function getMetaPixelNoscriptUrl(pixelId = META_PIXEL_ID) {
  return `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
}



