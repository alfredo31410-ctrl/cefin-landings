export const META_PIXEL_ID = "733425513099672";
export const META_CURRENCY = "MXN";
export const NIF_TRAFFIC_SOURCE_STORAGE_KEY = "nifTrafficSource";

export type MetaEventPayload = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
    __cefinMetaPixelInitialized?: boolean;
  }
}

export function trackMetaEvent(
  event: string,
  data?: MetaEventPayload,
) {
  if (typeof window === "undefined" || !window.fbq) return;

  if (data) {
    window.fbq("track", event, data);
    return;
  }

  window.fbq("track", event);
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
      window.__cefinMetaPixelInitialized = true;
    }
    fbq('track', 'PageView');
  `;
}

export function getMetaPixelNoscriptUrl(pixelId = META_PIXEL_ID) {
  return `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
}
