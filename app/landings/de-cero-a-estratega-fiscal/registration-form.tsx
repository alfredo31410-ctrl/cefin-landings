"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  HOTMART_ATTRIBUTION_PARAM_NAMES,
  getActiveUtmParams,
} from "@/lib/hotmart-utms";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { landingConfig as config } from "./config";
import styles from "./estratega-fiscal.module.css";
import { getValidWhatsAppGroupUrl } from "./whatsapp";

declare global {
  interface Window {
    _form_callback?: (id: string) => void;
  }
}

const WHATSAPP_REDIRECT_DELAY_MS = 900;

const integrationReady = Boolean(
  config.activation.registrationEnabled &&
    config.activeCampaign.enabled &&
    config.activeCampaign.formId === 333 &&
    config.activeCampaign.embedUrl &&
    config.privacy.url,
);

export default function RegistrationForm() {
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    integrationReady ? "loading" : "error",
  );
  const [registrationConfirmed, setRegistrationConfirmed] = useState(false);
  const submittedRef = useRef(false);
  const callbackHandledRef = useRef(false);

  useEffect(() => {
    if (!integrationReady) return;

    const root = document.getElementById("activecampaign-form-333");
    if (!root) return;

    const bindForm = () => {
      const form = root.querySelector("form");
      if (!form) return;

      const attribution = getActiveUtmParams();
      for (const name of HOTMART_ATTRIBUTION_PARAM_NAMES) {
        const fieldId = config.activeCampaign.attributionFieldIds[name];
        const field = fieldId
          ? form.querySelector<HTMLInputElement>(`[name="field[${fieldId}]"]`)
          : null;
        if (field) field.value = attribution[name] || "";
      }

      if (!form.dataset.estrategaFiscalBound) {
        form.dataset.estrategaFiscalBound = "true";
        form.addEventListener("submit", () => {
          submittedRef.current = true;
        });
      }
      setLoadState("ready");
    };

    const observer = new MutationObserver(bindForm);
    observer.observe(root, { childList: true, subtree: true });
    bindForm();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!integrationReady) return;

    const previousCallback = window._form_callback;
    let redirectTimeout: number | undefined;

    window._form_callback = (id) => {
      previousCallback?.(id);
      if (!submittedRef.current || callbackHandledRef.current) return;

      callbackHandledRef.current = true;
      setRegistrationConfirmed(true);

      if (config.activation.trackingEnabled) {
        trackMetaEvent(
          config.conversionEvent.name,
          {
            content_name: config.conversionEvent.contentName,
            content_category: config.conversionEvent.contentCategory,
            landing_slug: config.conversionEvent.landingSlug,
            status: "completed",
            value: 0,
            currency: "MXN",
          },
          { eventID: window.crypto.randomUUID() },
        );
      }

      const whatsappGroupUrl = getValidWhatsAppGroupUrl(
        config.access.whatsappGroupUrl,
      );
      if (whatsappGroupUrl) {
        redirectTimeout = window.setTimeout(() => {
          window.location.assign(whatsappGroupUrl);
        }, WHATSAPP_REDIRECT_DELAY_MS);
      }
    };

    return () => {
      window._form_callback = previousCallback;
      if (redirectTimeout !== undefined) {
        window.clearTimeout(redirectTimeout);
      }
    };
  }, []);

  const whatsappGroupUrl = registrationConfirmed
    ? getValidWhatsAppGroupUrl(config.access.whatsappGroupUrl)
    : null;

  return (
    <div
      id="registro"
      tabIndex={-1}
      className={`${styles.activeCampaignShell} relative min-h-[620px] scroll-mt-4 outline-none`}
    >
      {integrationReady ? (
        <>
          <div
            id="activecampaign-form-333"
            className={`_form_${config.activeCampaign.formId}`}
            aria-label="Formulario oficial de registro de ActiveCampaign"
          />
          <Script
            id="activecampaign-estratega-fiscal-333"
            src={config.activeCampaign.embedUrl!}
            strategy="afterInteractive"
            charSet="utf-8"
            onError={() => setLoadState("error")}
          />

          {loadState === "loading" && (
            <div
              className="absolute inset-x-0 top-6 mx-auto max-w-[500px] rounded-xl border border-white/15 bg-white/[0.06] px-5 py-6 text-center text-sm text-[var(--ef-muted-dark)]"
              role="status"
            >
              Cargando formulario de registro…
            </div>
          )}
        </>
      ) : null}

      {loadState === "error" && (
        <div className="mx-auto mt-6 max-w-[500px] rounded-2xl border border-white/15 bg-white/[0.07] p-6 text-center text-[var(--ef-warm-white)]">
          <p className="font-bold">No pudimos cargar el formulario.</p>
          <p className="mt-2 text-sm text-[var(--ef-muted-dark)]">
            Revisa tu conexión e inténtalo nuevamente.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 min-h-12 rounded-xl bg-[var(--ef-emerald)] px-6 py-3 text-sm font-black uppercase text-[var(--ef-petroleum)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)]"
          >
            Reintentar
          </button>
        </div>
      )}

      {whatsappGroupUrl && (
        <a
          href={whatsappGroupUrl}
          className="mx-auto mt-4 flex min-h-12 max-w-[500px] items-center justify-center rounded-xl bg-[var(--ef-emerald)] px-6 py-3 text-center text-sm font-black uppercase text-[var(--ef-petroleum)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)]"
        >
          Continuar al grupo de WhatsApp
        </a>
      )}

      {config.privacy.url && (
        <p className="mx-auto mt-3 max-w-[500px] text-center text-xs text-[var(--ef-muted-dark)]">
          Consulta nuestro{" "}
          <a
            href={config.privacy.url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ef-gold)]"
          >
            Aviso de Privacidad
          </a>
          .
        </p>
      )}
    </div>
  );
}
