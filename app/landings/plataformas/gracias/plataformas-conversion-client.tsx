"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { webinarEvent } from "../config";

const PIXEL_WAIT_TIMEOUT_MS = 30_000;
const PIXEL_RETRY_INTERVAL_MS = 250;
const deliveredEventIds = new Set<string>();

function getStorageKey(eventId: string) {
  return `cefin_plataformas_complete_registration_${eventId}`;
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
    // The in-memory marker and signed cookie remain available.
  }
}

async function markDeliveryAsSent(eventId: string) {
  try {
    await fetch("/landings/plataformas/api/registro/completar", {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ eventId }),
    });
  } catch {
    // Reload retries this idempotent transition without resending Meta.
  }
}

export function PlataformasConversionClient({ eventId }: { eventId: string }) {
  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;
    const deadline = Date.now() + PIXEL_WAIT_TIMEOUT_MS;

    const check = () => {
      if (cancelled) return;

      if (wasDelivered(eventId)) {
        void markDeliveryAsSent(eventId);
        return;
      }

      if (window.fbq) {
        deliveredEventIds.add(eventId);
        try {
          window.fbq(
            "track",
            "CompleteRegistration",
            {
              ...webinarEvent,
              status: "registered",
              source: "thank_you_page",
            },
            { eventID: eventId },
          );
          rememberDelivery(eventId);
          void markDeliveryAsSent(eventId);
        } catch {
          deliveredEventIds.delete(eventId);
          if (Date.now() < deadline) {
            timeoutId = window.setTimeout(check, PIXEL_RETRY_INTERVAL_MS);
          }
        }
        return;
      }

      if (Date.now() < deadline) {
        timeoutId = window.setTimeout(check, PIXEL_RETRY_INTERVAL_MS);
      }
    };

    check();

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [eventId]);

  return (
    <Script
      id="meta-pixel-plataformas-gracias"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: getMetaPixelScript(undefined, { trackPageView: false }),
      }}
    />
  );
}
