"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const WHATSAPP_REDIRECT_DELAY_MS = 0;
const TRACKING_SEND_DELAY_MS = 100;

export function WhatsAppRedirect({
  groupUrl,
  linkId,
}: {
  groupUrl: string;
  linkId: string;
}) {
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    const link = document.getElementById(linkId);

    const goToWhatsApp = () => {
      if (hasRedirectedRef.current) return;
      hasRedirectedRef.current = true;
      window.clearTimeout(redirectTimeoutId);

      const pixelAvailable =
        config.activation.trackingEnabled && typeof window.fbq === "function";
      if (pixelAvailable) {
        window.fbq?.("track", "Contact");
        window.setTimeout(() => {
          window.location.assign(groupUrl);
        }, TRACKING_SEND_DELAY_MS);
        return;
      }

      window.location.assign(groupUrl);
    };

    const handleManualClick = (event: Event) => {
      event.preventDefault();
      goToWhatsApp();
    };

    link?.addEventListener("click", handleManualClick);
    const redirectTimeoutId = window.setTimeout(
      goToWhatsApp,
      WHATSAPP_REDIRECT_DELAY_MS,
    );

    return () => {
      link?.removeEventListener("click", handleManualClick);
      window.clearTimeout(redirectTimeoutId);
    };
  }, [groupUrl, linkId]);

  if (!config.activation.trackingEnabled) return null;

  return (
    <Script
      id="meta-pixel-estratega-fiscal-whatsapp"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
    />
  );
}
