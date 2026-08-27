"use client";

import Script from "next/script";
import { useEffect } from "react";
import { landingConfig as config } from "./config";

const REGISTRATION_PENDING_KEY =
  "cefin_estratega_fiscal_registration_pending";

export default function RegistrationForm() {
  useEffect(() => {
    if (!config.activation.trackingEnabled) return;

    const root = document.getElementById("registro");
    if (!root) return;

    const markRegistrationAttempt = (event: Event) => {
      const form = event.target;
      if (
        !(form instanceof HTMLFormElement) ||
        !form.classList.contains(`_form_${config.activeCampaign.formId}`)
      ) {
        return;
      }

      try {
        const id =
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        window.sessionStorage.setItem(
          REGISTRATION_PENDING_KEY,
          JSON.stringify({ id, createdAt: Date.now() }),
        );
      } catch {
        // El tracking nunca debe interferir con el formulario oficial.
      }
    };

    root.addEventListener("submit", markRegistrationAttempt, true);
    return () => {
      root.removeEventListener("submit", markRegistrationAttempt, true);
    };
  }, []);

  if (!config.activation.registrationEnabled || !config.activeCampaign.enabled) {
    return null;
  }

  return (
    <div id="registro" tabIndex={-1} className="scroll-mt-4 outline-none">
      <div
        className={`_form_${config.activeCampaign.formId}`}
        aria-label="Formulario oficial de registro de ActiveCampaign"
      />
      <Script
        src={config.activeCampaign.embedUrl}
        strategy="afterInteractive"
        charSet="utf-8"
      />
    </div>
  );
}
