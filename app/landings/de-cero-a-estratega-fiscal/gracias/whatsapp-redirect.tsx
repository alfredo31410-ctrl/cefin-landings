"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const WHATSAPP_REDIRECT_DELAY_MS = 1800;
const JOIN_GROUP_STORAGE_KEY = "cefin_estratega_fiscal_join_group";

function wasTracked() {
  try {
    const delivered =
      window.localStorage.getItem(JOIN_GROUP_STORAGE_KEY) === "sent" ||
      window.sessionStorage.getItem(JOIN_GROUP_STORAGE_KEY) === "sent";

    if (delivered) {
      window.localStorage.setItem(JOIN_GROUP_STORAGE_KEY, "sent");
    }
    return delivered;
  } catch {
    return false;
  }
}

function rememberTracking() {
  try {
    window.localStorage.setItem(JOIN_GROUP_STORAGE_KEY, "sent");
    window.sessionStorage.setItem(JOIN_GROUP_STORAGE_KEY, "sent");
  } catch {
    // El seguimiento nunca debe bloquear el acceso a WhatsApp.
  }
}

export function WhatsAppRedirect({ groupUrl }: { groupUrl: string }) {
  useEffect(() => {
    let attempts = 12;
    let trackingTimeoutId: number | undefined;

    const trackRegistration = () => {
      if (!config.activation.trackingEnabled || wasTracked()) return;

      if (typeof window.fbq !== "function") {
        if (attempts > 0) {
          attempts -= 1;
          trackingTimeoutId = window.setTimeout(trackRegistration, 100);
        }
        return;
      }

      window.fbq("trackCustom", "JoinGroup", {
        content_name: config.conversionEvent.contentName,
        content_category: "Grupo de WhatsApp",
        funnel_step: "join_group",
      });
      rememberTracking();
    };

    trackRegistration();
    const redirectTimeoutId = window.setTimeout(() => {
      window.location.assign(groupUrl);
    }, WHATSAPP_REDIRECT_DELAY_MS);

    return () => {
      window.clearTimeout(redirectTimeoutId);
      if (trackingTimeoutId !== undefined) {
        window.clearTimeout(trackingTimeoutId);
      }
    };
  }, [groupUrl]);

  if (!config.activation.trackingEnabled) return null;

  return (
    <Script
      id="meta-pixel-estratega-fiscal-whatsapp"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: getMetaPixelScript(undefined, { trackPageView: false }),
      }}
    />
  );
}
