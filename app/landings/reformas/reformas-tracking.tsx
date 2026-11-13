"use client";

import { useEffect } from "react";
import {
  initializeMetaPixel,
  trackMetaCustomEventImmediate,
} from "@/lib/meta-pixel";

const REGISTRATION_MODAL_SENT_KEY = "cefin:reformas:registration-modal-opened";

export function ReformasPageViewTracking() {
  useEffect(() => {
    initializeMetaPixel();

    const handleRegistrationIntent = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href="#registro-modal"]',
      );

      if (!trigger) return;

      try {
        if (window.sessionStorage.getItem(REGISTRATION_MODAL_SENT_KEY) === "true") {
          return;
        }

        window.sessionStorage.setItem(REGISTRATION_MODAL_SENT_KEY, "true");
        trackMetaCustomEventImmediate("OpenRegistrationModal", {
          content_name: "Cambios Fiscales",
          content_category: "Registro a clase gratuita",
        });
      } catch {
        // Tracking must never prevent the registration modal from opening.
      }
    };

    document.addEventListener("click", handleRegistrationIntent);
    return () => document.removeEventListener("click", handleRegistrationIntent);
  }, []);

  return null;
}
