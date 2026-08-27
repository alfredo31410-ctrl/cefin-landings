"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";

const REGISTRATION_PENDING_KEY =
  "cefin_estratega_fiscal_registration_pending";
const REGISTRATION_MARKER_TTL_MS = 5 * 60 * 1000;

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

export function ConversionClient() {
  const markerRef = useRef<RegistrationMarker | null | undefined>(undefined);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (markerRef.current === undefined) {
      markerRef.current = consumeRegistrationMarker();
    }
    if (!markerRef.current || trackedRef.current) return;

    let attempts = 15;
    let timeoutId: number | undefined;

    const trackRegistration = () => {
      if (trackedRef.current) return;
      if (typeof window.fbq !== "function") {
        if (attempts > 0) {
          attempts -= 1;
          timeoutId = window.setTimeout(trackRegistration, 100);
        }
        return;
      }

      trackedRef.current = true;
      window.fbq("track", "CompleteRegistration");
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
      dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
    />
  );
}
