"use client";

import Script from "next/script";
import { useEffect } from "react";
import { landingConfig as config } from "./config";

const REGISTRATION_PENDING_KEY =
  "cefin_estratega_fiscal_registration_pending";
const REGISTRATION_CAMPAIGN_KEY =
  "de_cero_a_estratega_fiscal_clase_2_sep26";

async function getContactHash(normalizedEmail: string) {
  if (!window.crypto?.subtle || typeof TextEncoder === "undefined") {
    return null;
  }

  const source = `${REGISTRATION_CAMPAIGN_KEY}:${normalizedEmail}`;
  const digest = await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(source),
  );

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export default function RegistrationForm() {
  useEffect(() => {
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
        const debugTracking =
          new URLSearchParams(window.location.search).get("debug_tracking") ===
          "1";
        const marker = { id, createdAt: Date.now(), debugTracking };
        window.sessionStorage.setItem(
          REGISTRATION_PENDING_KEY,
          JSON.stringify(marker),
        );

        const emailInput = form.elements.namedItem("email");
        if (!(emailInput instanceof HTMLInputElement)) return;

        const normalizedEmail = emailInput.value.trim().toLowerCase();
        if (!normalizedEmail) return;

        void getContactHash(normalizedEmail)
          .then((contactHash) => {
            if (!contactHash) return;

            const currentSerialized = window.sessionStorage.getItem(
              REGISTRATION_PENDING_KEY,
            );
            if (!currentSerialized) return;

            const current = JSON.parse(currentSerialized) as {
              id?: unknown;
              createdAt?: unknown;
              debugTracking?: unknown;
            };
            if (current.id !== id) return;

            window.sessionStorage.setItem(
              REGISTRATION_PENDING_KEY,
              JSON.stringify({ ...marker, contactHash }),
            );
          })
          .catch(() => {
            // Sin un hash fiable se conserva únicamente la deduplicación por recarga.
          });
      } catch {
        // El comprobante local nunca debe interferir con el formulario oficial.
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
