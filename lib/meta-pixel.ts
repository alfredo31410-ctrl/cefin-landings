export const META_PIXEL_ID = "733425513099672";
export const META_CURRENCY = "MXN";
export const NIF_TRAFFIC_SOURCE_STORAGE_KEY = "nifTrafficSource";

export type MetaEventPayload = Record<string, unknown>;
type MetaEventCommand = "track" | "trackCustom";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
    __cefinMetaPixelInitialized?: boolean;
  }
}

// Espera brevemente al script externo para no perder eventos que ocurren al montar la página.
function runWhenMetaPixelReady(callback: () => void, attempts = 30) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    callback();
    return;
  }

  if (attempts > 0) {
    window.setTimeout(() => runWhenMetaPixelReady(callback, attempts - 1), 150);
  }
}

function sendMetaEvent(
  command: MetaEventCommand,
  event: string,
  data?: MetaEventPayload,
) {
  runWhenMetaPixelReady(() => {
    if (!window.fbq) return;
    window.fbq(command, event, data ?? {});
  });
}

// Añade contexto común sin obligar a cada página a duplicar metadatos de diagnóstico.
export function buildMetaEventData(
  landingSlug: string,
  eventSource: string,
  data: MetaEventPayload = {},
): MetaEventPayload {
  return {
    ...data,
    landing_slug: landingSlug,
    event_source: eventSource,
    event_timestamp: Math.floor(Date.now() / 1000),
  };
}

export function trackMetaEvent(event: string, data?: MetaEventPayload) {
  sendMetaEvent("track", event, data);
}

export function trackMetaCustomEvent(event: string, data?: MetaEventPayload) {
  sendMetaEvent("trackCustom", event, data);
}

// El guard global evita inicializar dos veces el mismo Pixel durante navegación cliente.
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
