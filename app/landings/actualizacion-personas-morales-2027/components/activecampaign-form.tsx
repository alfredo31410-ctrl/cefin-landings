"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { campaign } from "../config";
import styles from "../landing.module.css";
import { getPreservedAttribution, trackConfirmedRegistration } from "./tracking";

const FORM_ID = campaign.activeCampaign.formId;
const SCRIPT_SELECTOR = `script[data-cefin-activecampaign-form="${FORM_ID}"]`;
const THANKS_PATH = "/landings/actualizacion-personas-morales-2027/gracias";
const UTM_FIELD_IDS = {
  utm_source: "7",
  utm_medium: "8",
  utm_campaign: "9",
  utm_content: "10",
  utm_term: "11",
} as const;

declare global {
  interface Window {
    _form_callback?: (id: string) => void;
    _show_thank_you?: ActiveCampaignThankYou;
  }
}

type FormStatus = "loading" | "ready" | "error";
type ActiveCampaignThankYou = (...args: unknown[]) => void;

function fillOfficialUtmFields(form: HTMLFormElement) {
  const attribution = getPreservedAttribution();

  for (const [utmKey, fieldId] of Object.entries(UTM_FIELD_IDS)) {
    const value = attribution[utmKey];
    const field = form.elements.namedItem(`field[${fieldId}]`);

    if (value && field instanceof HTMLInputElement && !field.value) {
      field.value = value;
    }
  }
}

function createConfirmationId() {
  if (typeof crypto.randomUUID === "function") {
    return `ac-${FORM_ID}-${crypto.randomUUID()}`;
  }

  return `ac-${FORM_ID}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ActiveCampaignForm() {
  const router = useRouter();
  const hostRef = useRef<HTMLDivElement>(null);
  const confirmedRef = useRef(false);
  const [status, setStatus] = useState<FormStatus>("loading");
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    confirmedRef.current = false;
    setStatus("loading");
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.replaceChildren();

    document.querySelectorAll(SCRIPT_SELECTOR).forEach((script) => script.remove());
    document.querySelectorAll<HTMLElement>(`._form_${FORM_ID}`).forEach((element) => {
      if (!host.contains(element)) element.remove();
    });

    const placeholder = document.createElement("div");
    placeholder.className = `_form_${FORM_ID}`;
    placeholder.setAttribute("aria-label", "Formulario oficial de registro de ActiveCampaign");
    host.appendChild(placeholder);

    let isActive = true;
    let loadTimeout = 0;
    let injectionTimer = 0;
    const previousCallback = window._form_callback;
    let originalShowThankYou: ActiveCampaignThankYou | undefined;
    let wrappedShowThankYou: ActiveCampaignThankYou | undefined;

    const findInjectedForm = () => host.querySelector<HTMLFormElement>(`form._form_${FORM_ID}`);

    const confirmOfficialSuccess = (id: string) => {
      const form = document.getElementById(`_form_${id}_`);
      const thankYou = form?.querySelector<HTMLElement>("._form-thank-you");
      const content = form?.querySelector<HTMLElement>("._form-content");
      const isVerifiedSuccess =
        form instanceof HTMLFormElement &&
        host.contains(form) &&
        form.classList.contains(`_form_${FORM_ID}`) &&
        Boolean(thankYou?.textContent?.trim()) &&
        thankYou?.style.display === "block" &&
        content?.style.display === "none";

      if (!isVerifiedSuccess || confirmedRef.current) return;

      confirmedRef.current = true;
      trackConfirmedRegistration({ registrationId: createConfirmationId() });
      router.replace(THANKS_PATH);
    };

    const installSuccessBridge = () => {
      if (typeof window._show_thank_you !== "function") return;
      if (wrappedShowThankYou && window._show_thank_you === wrappedShowThankYou) return;

      originalShowThankYou = window._show_thank_you;
      wrappedShowThankYou = (...args) => {
        originalShowThankYou?.(...args);
        if (typeof args[0] === "string") confirmOfficialSuccess(args[0]);
      };
      window._show_thank_you = wrappedShowThankYou;
    };

    const markReady = () => {
      const form = findInjectedForm();
      if (!form || !isActive) return false;

      fillOfficialUtmFields(form);
      installSuccessBridge();
      setStatus("ready");
      window.clearTimeout(loadTimeout);
      return true;
    };

    const observer = new MutationObserver(() => {
      if (markReady()) observer.disconnect();
    });
    observer.observe(host, { childList: true, subtree: true });

    const verifiedSuccessCallback = (id: string) => {
      try {
        previousCallback?.(id);
      } catch {
        // Un callback previo no debe impedir la confirmación oficial de este formulario.
      }
      confirmOfficialSuccess(id);
    };

    window._form_callback = verifiedSuccessCallback;

    const script = document.createElement("script");
    script.src = campaign.activeCampaign.embedUrl;
    script.async = true;
    script.charset = "utf-8";
    script.dataset.cefinActivecampaignForm = String(FORM_ID);
    script.addEventListener("load", markReady, { once: true });
    script.addEventListener(
      "error",
      () => {
        if (isActive) setStatus("error");
      },
      { once: true },
    );
    injectionTimer = window.setTimeout(() => {
      if (isActive) document.body.appendChild(script);
    }, 0);

    loadTimeout = window.setTimeout(() => {
      if (isActive && !findInjectedForm()) setStatus("error");
    }, 12000);

    return () => {
      isActive = false;
      observer.disconnect();
      window.clearTimeout(loadTimeout);
      window.clearTimeout(injectionTimer);
      script.remove();
      host.replaceChildren();
      document.querySelectorAll<HTMLElement>(`._form_${FORM_ID}`).forEach((element) => {
        if (!host.contains(element)) element.remove();
      });

      if (window._form_callback === verifiedSuccessCallback) {
        window._form_callback = previousCallback;
      }
      if (wrappedShowThankYou && window._show_thank_you === wrappedShowThankYou) {
        window._show_thank_you = originalShowThankYou;
      }
    };
  }, [attempt, router]);

  return (
    <div className={styles.activeCampaignShell} aria-busy={status === "loading"}>
      {status === "loading" && (
        <div className={styles.formLoading} role="status" aria-live="polite">
          <span className={styles.loadingDot} aria-hidden="true" />
          Cargando formulario seguro…
        </div>
      )}

      {status === "error" && (
        <div className={styles.formError} role="alert">
          <p className="font-black">No pudimos cargar el formulario.</p>
          <p className="mt-1 text-sm">Revisa tu conexión e inténtalo nuevamente.</p>
          <button type="button" onClick={retry} className={styles.retryButton}>
            Reintentar
          </button>
        </div>
      )}

      <div
        ref={hostRef}
        className={`${styles.activeCampaignForm} ${status === "ready" ? styles.formReady : styles.formHidden}`}
      />
    </div>
  );
}
