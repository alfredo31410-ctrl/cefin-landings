"use client";

import { useEffect } from "react";
import { initializeMetaPixel, trackMetaEvent } from "@/lib/meta-pixel";
import { REFORMAS_FORM_SUBMITTED_KEY } from "../activecampaign-form";

const LEAD_SENT_KEY = "cefin:reformas:lead-sent";

export function ReformasGraciasTracking() {
  useEffect(() => {
    initializeMetaPixel();

    try {
      if (
        window.sessionStorage.getItem(REFORMAS_FORM_SUBMITTED_KEY) !== "true" ||
        window.sessionStorage.getItem(LEAD_SENT_KEY) === "true"
      ) {
        return;
      }

      window.sessionStorage.setItem(LEAD_SENT_KEY, "true");
      trackMetaEvent("Lead", {
        content_name: "Cambios Fiscales",
        content_category: "Clase gratuita en vivo",
      });
    } catch {
      // Never duplicate or infer a lead if browser storage is unavailable.
    }
  }, []);

  return null;
}
