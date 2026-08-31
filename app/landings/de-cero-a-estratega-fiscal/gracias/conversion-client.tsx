"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const REGISTRATION_PENDING_KEY =
  "cefin_estratega_fiscal_registration_pending";
const REGISTRATION_MARKER_TTL_MS = 5 * 60 * 1000;
const PIXEL_RETRY_INTERVAL_MS = 50;
const PIXEL_MAX_ATTEMPTS = 6;
const TRACKING_SEND_DELAY_MS = 100;

type RegistrationMarker = {
  id: string;
  createdAt: number;
};

function consumeRegistrationMarker() {
  try {
    const serialized = window.sessionStorage.getItem(REGISTRATION_PENDING_KEY);
    window.sessionStorage.removeItem(REGISTRATION_PENDING_KEY);
    if (!serialized) return null;

    const marker = JSON.parse(serialized) as RegistrationMarker;
    if (
      !marker.id ||
      !Number.isFinite(marker.createdAt) ||
      Date.now() - marker.createdAt > REGISTRATION_MARKER_TTL_MS ||
      marker.createdAt > Date.now()
    ) {
      return null;
    }
    return marker;
  } catch {
    return null;
  }
}

function getValidWhatsAppGroupUrl(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "chat.whatsapp.com" ||
      url.pathname === "/"
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function ConversionClient({
  groupUrl,
  fallbackLinkId,
}: {
  groupUrl: string | null;
  fallbackLinkId: string;
}) {
  const markerRef = useRef<RegistrationMarker | null | undefined>(undefined);
  const registrationTrackedRef = useRef(false);
  const contactTrackedRef = useRef(false);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (markerRef.current === undefined) {
      markerRef.current = consumeRegistrationMarker();
    }
    const safeGroupUrl = getValidWhatsAppGroupUrl(groupUrl);
    if (!markerRef.current || !safeGroupUrl) return;

    const fallbackLink = document.getElementById(fallbackLinkId);
    if (fallbackLink instanceof HTMLAnchorElement) {
      fallbackLink.href = safeGroupUrl;
      fallbackLink.hidden = false;
    }

    let attempts = PIXEL_MAX_ATTEMPTS;
    let retryTimeoutId: number | undefined;
    let redirectTimeoutId: number | undefined;

    const redirectToWhatsApp = () => {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      window.location.assign(safeGroupUrl);
    };

    const scheduleRedirect = (delayMs: number) => {
      if (redirectTimeoutId !== undefined) {
        window.clearTimeout(redirectTimeoutId);
      }
      redirectTimeoutId = window.setTimeout(redirectToWhatsApp, delayMs);
    };

    const trackAndRedirect = () => {
      if (
        config.activation.trackingEnabled &&
        typeof window.fbq !== "function" &&
        attempts > 0
      ) {
        attempts -= 1;
        retryTimeoutId = window.setTimeout(
          trackAndRedirect,
          PIXEL_RETRY_INTERVAL_MS,
        );
        return;
      }

      if (
        config.activation.trackingEnabled &&
        typeof window.fbq === "function"
      ) {
        if (!registrationTrackedRef.current) {
          registrationTrackedRef.current = true;
          window.fbq("track", "CompleteRegistration");
        }
        if (!contactTrackedRef.current) {
          contactTrackedRef.current = true;
          window.fbq("track", "Contact");
        }
        scheduleRedirect(TRACKING_SEND_DELAY_MS);
        return;
      }

      scheduleRedirect(0);
    };

    const handleFallbackClick = (event: Event) => {
      event.preventDefault();
      if (retryTimeoutId !== undefined) {
        window.clearTimeout(retryTimeoutId);
      }
      attempts = 0;
      trackAndRedirect();
    };

    fallbackLink?.addEventListener("click", handleFallbackClick);
    trackAndRedirect();

    return () => {
      fallbackLink?.removeEventListener("click", handleFallbackClick);
      if (retryTimeoutId !== undefined) {
        window.clearTimeout(retryTimeoutId);
      }
      if (redirectTimeoutId !== undefined) {
        window.clearTimeout(redirectTimeoutId);
      }
    };
  }, [fallbackLinkId, groupUrl]);

  if (!config.activation.trackingEnabled) return null;

  return (
    <Script
      id="meta-pixel-estratega-fiscal-gracias"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
    />
  );
}
