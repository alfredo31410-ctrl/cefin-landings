"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const STORAGE_KEY = "cefin_estratega_fiscal_complete_registration";

function wasTracked() {
  try {
    const tracked =
      window.localStorage.getItem(STORAGE_KEY) === "sent" ||
      window.sessionStorage.getItem(STORAGE_KEY) === "sent";
    if (tracked) window.localStorage.setItem(STORAGE_KEY, "sent");
    return tracked;
  } catch {
    return false;
  }
}

function rememberTracking() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "sent");
    window.sessionStorage.setItem(STORAGE_KEY, "sent");
  } catch {
    // El tracking nunca debe interrumpir la confirmación.
  }
}

export function ConversionClient() {
  useEffect(() => {
    if (wasTracked()) return;

    let attempts = 15;
    let timeoutId: number | undefined;

    const trackRegistration = () => {
      if (wasTracked()) return;
      if (typeof window.fbq !== "function") {
        if (attempts > 0) {
          attempts -= 1;
          timeoutId = window.setTimeout(trackRegistration, 100);
        }
        return;
      }

      window.fbq("track", config.conversionEvent.name, {
        content_name: config.conversionEvent.contentName,
        content_category: config.conversionEvent.contentCategory,
      });
      rememberTracking();
    };

    trackRegistration();
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Script
      id="meta-pixel-estratega-fiscal-gracias"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: getMetaPixelScript(undefined, { trackPageView: false }),
      }}
    />
  );
}
