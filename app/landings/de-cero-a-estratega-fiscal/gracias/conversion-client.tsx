"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const deliveredEventIds = new Set<string>();

function getStorageKey(eventId: string) {
  return `cefin_estratega_fiscal_complete_registration_${eventId}`;
}

function wasDelivered(eventId: string) {
  if (deliveredEventIds.has(eventId)) return true;
  try {
    return window.localStorage.getItem(getStorageKey(eventId)) === "sent";
  } catch {
    return false;
  }
}

function rememberDelivery(eventId: string) {
  deliveredEventIds.add(eventId);
  try {
    window.localStorage.setItem(getStorageKey(eventId), "sent");
  } catch {
    // The signed cookie still provides a server-verified fallback.
  }
}

async function markDeliveryAsSent(eventId: string) {
  try {
    await fetch(config.routes.completionApi, {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ eventId }),
    });
  } catch {
    // Analytics must not interrupt the confirmation page.
  }
}

export function ConversionClient({ eventId }: { eventId: string }) {
  useEffect(() => {
    if (wasDelivered(eventId)) {
      void markDeliveryAsSent(eventId);
      return;
    }

    let attempts = 30;
    let timeoutId: number | undefined;
    let cancelled = false;

    const deliver = () => {
      if (cancelled || wasDelivered(eventId)) return;
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
          { eventID: eventId },
        );
        rememberDelivery(eventId);
        void markDeliveryAsSent(eventId);
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
  }, [eventId]);

  return (
    <Script
      id="meta-pixel-estratega-fiscal-gracias"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
    />
  );
}
