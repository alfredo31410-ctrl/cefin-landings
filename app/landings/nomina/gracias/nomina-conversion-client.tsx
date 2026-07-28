"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import {
  consumeNominaRegistrationAttempt,
  getNominaEventKey,
  waitForNominaMetaPixel,
} from "@/lib/nomina-tracking-session";

export function NominaConversionClient() {
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const attempt = consumeNominaRegistrationAttempt();
    if (!attempt) return;

    const eventKey = getNominaEventKey("complete_registration_sent", attempt.id);
    try {
      if (window.sessionStorage.getItem(eventKey)) return;
    } catch {
      // Continue; the consumed proof and ref still protect this mount.
    }

    return waitForNominaMetaPixel(
      () => {
        window.fbq?.("track", "CompleteRegistration", {}, { eventID: attempt.id });
        try {
          window.sessionStorage.setItem(eventKey, "true");
        } catch {
          // The event was sent; storage restrictions must not affect the page.
        }
      },
      () => {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Meta Pixel no estuvo disponible para CompleteRegistration.");
        }
      },
    );
  }, []);

  return (
    <Script
      id="meta-pixel-nomina-gracias"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: getMetaPixelScript(undefined, { trackPageView: false }),
      }}
    />
  );
}
