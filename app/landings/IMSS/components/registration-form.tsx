"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { imssCampaign } from "../config";
import {
  createImssConfirmationId,
  getImssThankYouUrl,
  persistImssRegistrationConfirmation,
  prepareImssActiveCampaignForm,
  trackConfirmedImssLead,
} from "../registration-adapter";
import styles from "../landing.module.css";

const FORM_ID = imssCampaign.registration.activeCampaignFormId;
const SCRIPT_SELECTOR = `script[data-cefin-activecampaign-form="${FORM_ID}"]`;

declare global {
  interface Window {
    _form_callback?: (id: string) => void;
  }
}
type FormStatus = "loading" | "ready" | "error";

function isVerifiedActiveCampaignSuccess(form: HTMLFormElement) {
  const thankYou = form.querySelector<HTMLElement>("._form-thank-you");
  const content = form.querySelector<HTMLElement>("._form-content");

  if (!thankYou?.textContent?.trim() || !content) return false;

  return (
    window.getComputedStyle(thankYou).display !== "none" &&
    window.getComputedStyle(content).display === "none"
  );
}
export function RegistrationForm() {
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
    placeholder.setAttribute(
      "aria-label",
      "Formulario oficial de registro de ActiveCampaign",
    );
    host.appendChild(placeholder);

    let isActive = true;
    let loadTimeout = 0;
    let injectionTimer = 0;
    const previousCallback = window._form_callback;

    const findInjectedForm = () =>
      host.querySelector<HTMLFormElement>("form") ??
      document.querySelector<HTMLFormElement>(`form._form_${FORM_ID}`);

    const markReady = () => {
      const form = findInjectedForm();
      if (!form || !isActive) return false;

      if (!host.contains(form)) host.appendChild(form);
      prepareImssActiveCampaignForm(form);
      setStatus("ready");
      window.clearTimeout(loadTimeout);
      return true;
    };

    const observer = new MutationObserver(() => {
      if (markReady()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const verifiedSuccessCallback = (id: string) => {
      try {
        previousCallback?.(id);
      } catch {
        // Un callback ajeno no debe bloquear la confirmación oficial.
      }

      const form = findInjectedForm();
      const belongsToThisCampaign = form !== null && host.contains(form);

      if (
        !belongsToThisCampaign ||
        !isVerifiedActiveCampaignSuccess(form) ||
        confirmedRef.current
      ) {
        return;
      }

      confirmedRef.current = true;
      const confirmationId = createImssConfirmationId();
      const persisted = persistImssRegistrationConfirmation(confirmationId);

      if (!persisted) trackConfirmedImssLead(confirmationId);

      window.setTimeout(() => {
        window.location.assign(getImssThankYouUrl());
      }, 0);
    };

    window._form_callback = verifiedSuccessCallback;

    const script = document.createElement("script");
    script.src = imssCampaign.registration.activeCampaignEmbedUrl;
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
    };
  }, [attempt]);

  return (
    <div className={styles.activeCampaignShell} aria-busy={status === "loading"}>
      {status === "loading" && (
        <div className={styles.formLoading} role="status" aria-live="polite">
          <span aria-hidden="true" />
          Cargando formulario seguro…
        </div>
      )}

      {status === "error" && (
        <div className={styles.formError} role="alert">
          <p>No pudimos cargar el formulario.</p>
          <span>Revisa tu conexión e inténtalo nuevamente.</span>
          <button type="button" onClick={retry} className={styles.retryButton}>
            Reintentar
          </button>
        </div>
      )}

      <div
        ref={hostRef}
        className={status === "ready" ? styles.formReady : styles.formHidden}
      />
    </div>
  );
}
