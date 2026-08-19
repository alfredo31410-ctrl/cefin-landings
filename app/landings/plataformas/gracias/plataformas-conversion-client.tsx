"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { webinarEvent } from "../config";

const PIXEL_WAIT_TIMEOUT_MS = 30_000;
const PIXEL_RETRY_INTERVAL_MS = 250;
const SENDING_LEASE_MS = 60_000;

type DeliveryState = {
  state: "sending" | "sent";
  updatedAt: number;
};

declare global {
  interface Window {
    __cefinPlataformasCompleteRegistration?: Record<string, boolean>;
  }
}

function getStorageKey(eventId: string) {
  return `cefin_plataformas_complete_registration_${eventId}`;
}

function readDeliveryState(eventId: string): DeliveryState | null {
  try {
    const serialized = window.localStorage.getItem(getStorageKey(eventId));
    if (!serialized) return null;
    const state = JSON.parse(serialized) as DeliveryState;
    if (
      (state.state !== "sending" && state.state !== "sent") ||
      !Number.isFinite(state.updatedAt)
    ) {
      return null;
    }
    return state;
  } catch {
    return null;
  }
}

function writeDeliveryState(eventId: string, state: DeliveryState["state"]) {
  try {
    window.localStorage.setItem(
      getStorageKey(eventId),
      JSON.stringify({ state, updatedAt: Date.now() }),
    );
  } catch {
    // The in-memory lock and signed cookie remain available if storage fails.
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
    // A later reload retries this idempotent transition without resending Meta.
  }
}

export function PlataformasConversionClient({ eventId }: { eventId: string }) {
  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;
    const deadline = Date.now() + PIXEL_WAIT_TIMEOUT_MS;

    const inMemoryDelivery =
      (window.__cefinPlataformasCompleteRegistration ??= {});

    const check = () => {
      if (cancelled) return;

      const delivery = readDeliveryState(eventId);
      if (delivery?.state === "sent") {
        void markDeliveryAsSent(eventId);
        return;
      }

      if (
        delivery?.state === "sending" &&
        Date.now() - delivery.updatedAt < SENDING_LEASE_MS
      ) {
        if (Date.now() >= deadline) return;
        timeoutId = window.setTimeout(check, PIXEL_RETRY_INTERVAL_MS);
        return;
      }

      if (inMemoryDelivery[eventId]) return;

      if (window.fbq) {
        inMemoryDelivery[eventId] = true;
        writeDeliveryState(eventId, "sending");
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
        writeDeliveryState(eventId, "sent");
        void markDeliveryAsSent(eventId);
        return;
      }

      if (Date.now() >= deadline) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "Meta Pixel no estuvo disponible; el registro permanece pendiente.",
          );
        }
        return;
      }

      timeoutId = window.setTimeout(check, PIXEL_RETRY_INTERVAL_MS);
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
