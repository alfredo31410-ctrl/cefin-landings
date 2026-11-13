"use client";

import { useEffect } from "react";
import {
  initializeMetaPixel,
  trackMetaCustomEventImmediate,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { REFORMAS_FORM_SUBMITTED_KEY } from "../activecampaign-form";

const LEAD_SENT_KEY = "cefin:reformas:lead-sent";
const WHATSAPP_INTENT_SENT_KEY = "cefin:reformas:whatsapp-intent-sent";

export function ReformasGraciasTracking() {
  useEffect(() => {
    initializeMetaPixel();

    try {
      if (
        window.sessionStorage.getItem(REFORMAS_FORM_SUBMITTED_KEY) === "true" &&
        window.sessionStorage.getItem(LEAD_SENT_KEY) !== "true"
      ) {
        window.sessionStorage.setItem(LEAD_SENT_KEY, "true");
        trackMetaEvent("Lead", {
          content_name: "Cambios Fiscales",
          content_category: "Clase gratuita en vivo",
        });
      }
    } catch {
      // Never duplicate or infer a lead if browser storage is unavailable.
    }

    const handleWhatsAppIntent = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "[data-reformas-whatsapp-group]",
      );

      if (!trigger) return;

      try {
        if (window.sessionStorage.getItem(WHATSAPP_INTENT_SENT_KEY) === "true") {
          return;
        }

        window.sessionStorage.setItem(WHATSAPP_INTENT_SENT_KEY, "true");
        trackMetaCustomEventImmediate("JoinWhatsAppGroup", {
          content_name: "Cambios Fiscales",
          content_category: "Grupo de WhatsApp",
          funnel_step: "whatsapp_group_click",
        });
      } catch {
        // Never block the outgoing WhatsApp link for analytics.
      }
    };

    document.addEventListener("click", handleWhatsAppIntent);
    return () => document.removeEventListener("click", handleWhatsAppIntent);
  }, []);

  return null;
}
