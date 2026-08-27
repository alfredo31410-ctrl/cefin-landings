"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const STORAGE_KEY = "cefin_estratega_fiscal_complete_registration";

function wasDelivered() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "sent";
  } catch {
    return false;
  }
}

function rememberDelivery() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "sent");
  } catch {
    // El seguimiento no debe interrumpir la página de confirmación.
  }
}

export function ConversionClient() {
  useEffect(() => {
    if (wasDelivered()) return;

    let attempts = 30;
    let timeoutId: number | undefined;
    let cancelled = false;

    const deliver = () => {
      if (cancelled || wasDelivered()) return;
      if (typeof window.fbq === "function") {
        window.fbq(
          "track",
          config.conversionEvent.name,
          {
            content_name: config.conversionEvent.contentName,
            content_category: config.conversionEvent.contentCategory,
            landing_slug: config.conversionEvent.landingSlug,
            status: "completed",
            value: 0,
            currency: "MXN",
          },
        );
        rememberDelivery();
        return;
      }
      if (attempts <= 0) return;
      attempts -= 1;
      timeoutId = window.setTimeout(deliver, 150);
    };

    deliver();
    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Script
      id="meta-pixel-estratega-fiscal-gracias"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
    />
  );
}
