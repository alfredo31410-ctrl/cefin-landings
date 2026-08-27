"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  HOTMART_ATTRIBUTION_PARAM_NAMES,
  getActiveUtmParams,
} from "@/lib/hotmart-utms";
import { landingConfig as config } from "./config";
import styles from "./estratega-fiscal.module.css";

const integrationReady = Boolean(
  config.activation.registrationEnabled &&
    config.activeCampaign.enabled &&
    config.activeCampaign.formId === 333 &&
    config.activeCampaign.embedUrl &&
    config.activeCampaign.endpoint &&
    config.privacy.url,
);

export default function RegistrationForm() {
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    integrationReady ? "loading" : "error",
  );
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const submittingRef = useRef(false);

  useEffect(() => {
    if (!integrationReady) return;

    const root = document.getElementById("activecampaign-form-333");
    if (!root) return;

    const prepareForm = () => {
      const form = root.querySelector("form");
      if (!form) return;

      form.noValidate = false;
      const email = form.elements.namedItem("email");
      const phone = form.elements.namedItem("phone");
      if (email instanceof HTMLInputElement) {
        email.type = "email";
        email.autocomplete = "email";
      }
      if (phone instanceof HTMLInputElement) {
        phone.type = "tel";
        phone.autocomplete = "tel";
      }

      const attribution = getActiveUtmParams();
      for (const name of HOTMART_ATTRIBUTION_PARAM_NAMES) {
        const fieldId = config.activeCampaign.attributionFieldIds[name];
        const field = fieldId
          ? form.querySelector<HTMLInputElement>(`[name="field[${fieldId}]"]`)
          : null;
        if (field) field.value = attribution[name] || "";
      }

      if (!form.elements.namedItem("website")) {
        const honeypot = document.createElement("input");
        honeypot.type = "text";
        honeypot.name = "website";
        honeypot.tabIndex = -1;
        honeypot.autocomplete = "off";
        honeypot.setAttribute("aria-hidden", "true");
        honeypot.style.position = "absolute";
        honeypot.style.left = "-10000px";
        honeypot.style.width = "1px";
        honeypot.style.height = "1px";
        form.appendChild(honeypot);
      }

      setLoadState("ready");
    };

    const submitOfficialForm = async (form: HTMLFormElement) => {
      if (submittingRef.current) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const firstname = String(formData.get("firstname") || "").trim();
      const lastname = String(formData.get("lastname") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const consent = formData.get("sms_consent") === "on";
      const website = String(formData.get("website") || "");
      const activeFormId = Number(formData.get("f"));
      const activeFormUser = String(formData.get("u") || "");
      const activeFormOrigin = String(formData.get("or") || "");
      const attribution = getActiveUtmParams();
      const normalizedAttribution = Object.fromEntries(
        HOTMART_ATTRIBUTION_PARAM_NAMES.map((name) => [
          name,
          attribution[name] || "",
        ]),
      );
      const submitButton = form.querySelector<HTMLButtonElement>(
        "button[type='submit'], ._submit",
      );
      const originalButtonText = submitButton?.textContent || "Registrarme";

      submittingRef.current = true;
      setSubmitState("submitting");
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Confirmando registro…";
      }

      try {
        const response = await fetch(config.routes.registrationApi, {
          method: "POST",
          credentials: "same-origin",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            phone,
            consent,
            website,
            activeFormId,
            activeFormUser,
            activeFormOrigin,
            ...normalizedAttribution,
          }),
        });
        const result = (await response.json()) as {
          ok?: boolean;
          redirect?: string;
        };
        if (
          !response.ok ||
          !result.ok ||
          result.redirect !== config.routes.thankYou
        ) {
          throw new Error("registration-failed");
        }
        window.location.assign(config.routes.thankYou);
      } catch {
        submittingRef.current = false;
        setSubmitState("error");
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.classList.remove("processing");
          submitButton.textContent = originalButtonText;
        }
      }
    };

    const handleSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || !root.contains(form)) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      void submitOfficialForm(form);
    };

    const observer = new MutationObserver(prepareForm);
    observer.observe(root, { childList: true, subtree: true });
    root.addEventListener("submit", handleSubmit, true);
    prepareForm();
    return () => {
      observer.disconnect();
      root.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

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

      {submitState === "submitting" && (
        <p className="mx-auto mt-4 max-w-[500px] text-center text-sm font-semibold text-[var(--ef-muted-dark)]" role="status">
          Estamos confirmando tu registro…
        </p>
      )}

      {submitState === "error" && (
        <p
          className="mx-auto mt-4 max-w-[500px] rounded-xl border border-amber-300/40 bg-amber-100/10 px-5 py-4 text-center text-sm text-[var(--ef-warm-white)]"
          role="alert"
        >
          No pudimos confirmar tu registro. Revisa tus datos e inténtalo
          nuevamente.
        </p>
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
