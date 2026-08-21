"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import {
  HOTMART_ATTRIBUTION_PARAM_NAMES,
  getActiveUtmParams,
  type UtmParamName,
  type UtmParams,
} from "@/lib/hotmart-utms";
import { landingConfig as config } from "./config";

const PROXY_ENDPOINT =
  "/landings/despierta-tu-potencial-contable/api/registro";
const THANK_YOU_PATH = config.thankYou.path;
const INTEGRATION_TIMEOUT_MS = 15_000;
const INTEGRATION_STATUS_CLASS = "cefin-secure-form-status";

const VERIFIED_ACTIVE_CAMPAIGN_FIELDS = Object.entries(
  config.activeCampaign.attributionFieldIds,
).filter((entry): entry is [UtmParamName, number] =>
  typeof entry[1] === "number",
);

declare global {
  interface Window {
    _show_error?: (id: string, message: string, html?: string) => void;
  }
}

function normalizeAttribution(params: UtmParams) {
  return Object.fromEntries(
    HOTMART_ATTRIBUTION_PARAM_NAMES.map((name) => [
      name,
      params[name]?.trim() || "",
    ]),
  ) as Record<UtmParamName, string>;
}

function syncVerifiedAttributionFields(
  form: HTMLFormElement,
  attribution: Record<UtmParamName, string>,
) {
  let allInputsFound = true;

  VERIFIED_ACTIVE_CAMPAIGN_FIELDS.forEach(([name, fieldId]) => {
    const input = form.querySelector<HTMLInputElement>(
      `input[name="field[${fieldId}]"]`,
    );
    if (!input) {
      allInputsFound = false;
      return;
    }
    input.value = attribution[name];
  });

  return allInputsFound;
}

function appendAttribution(
  params: URLSearchParams,
  attribution: Record<UtmParamName, string>,
) {
  HOTMART_ATTRIBUTION_PARAM_NAMES.forEach((name) => {
    params.set(name, attribution[name]);
  });
}

function getFormSubmission(
  form: HTMLFormElement,
  attribution: Record<UtmParamName, string>,
) {
  const params = new URLSearchParams();

  for (const [name, value] of new FormData(form).entries()) {
    if (typeof value === "string") params.append(name, value);
  }

  appendAttribution(params, attribution);
  return params;
}

function showActiveCampaignError(params: URLSearchParams) {
  const formInstanceId = params.get("u") || "";
  const message =
    "No pudimos confirmar tu registro. Revisa tus datos e inténtalo nuevamente.";

  if (formInstanceId && window._show_error) {
    window._show_error(formInstanceId, message);
  }
}

function enhanceKnownFormFields(form: HTMLFormElement) {
  const firstName = form.querySelector<HTMLInputElement>(
    'input[name="firstname"]',
  );
  const lastName = form.querySelector<HTMLInputElement>(
    'input[name="lastname"]',
  );
  const email = form.querySelector<HTMLInputElement>('input[name="email"]');
  const phone = form.querySelector<HTMLInputElement>('input[name="phone"]');

  firstName?.setAttribute("autocomplete", "given-name");
  lastName?.setAttribute("autocomplete", "family-name");

  if (email) {
    email.type = "email";
    email.autocomplete = "email";
    email.inputMode = "email";
  }

  if (phone) {
    phone.type = "tel";
    phone.autocomplete = "tel";
    phone.inputMode = "tel";
  }
}

function getSubmitButton(form: HTMLFormElement) {
  return form.querySelector<HTMLButtonElement>('button[type="submit"]');
}

function removeIntegrationStatus(form: HTMLFormElement) {
  form.querySelector(`.${INTEGRATION_STATUS_CLASS}`)?.remove();
}

function lockForm(
  form: HTMLFormElement,
  message: string,
  options: { isError?: boolean; onRetry?: () => void } = {},
) {
  const submitButton = getSubmitButton(form);
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.setAttribute("aria-disabled", "true");
  }

  let status = form.querySelector<HTMLDivElement>(
    `.${INTEGRATION_STATUS_CLASS}`,
  );
  if (!status) {
    status = document.createElement("div");
    status.className = INTEGRATION_STATUS_CLASS;
    submitButton?.parentNode?.insertBefore(status, submitButton);
  }

  status.replaceChildren();
  status.setAttribute("role", options.isError ? "alert" : "status");
  status.dataset.state = options.isError ? "error" : "loading";

  const text = document.createElement("p");
  text.textContent = message;
  status.appendChild(text);

  if (options.onRetry) {
    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.textContent = "Reintentar";
    retryButton.addEventListener("click", options.onRetry, { once: true });
    status.appendChild(retryButton);
  }
}

function unlockForm(form: HTMLFormElement) {
  const submitButton = getSubmitButton(form);
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-disabled");
  }
  removeIntegrationStatus(form);
}

function setSubmitting(form: HTMLFormElement, isSubmitting: boolean) {
  const submitButton = getSubmitButton(form);
  if (!submitButton) return;

  submitButton.disabled = isSubmitting;
  submitButton.setAttribute("aria-disabled", String(isSubmitting));
  submitButton.classList.toggle("processing", isSubmitting);

  if (!isSubmitting) submitButton.removeAttribute("aria-disabled");
}

async function submitThroughServer(
  params: URLSearchParams,
  signal: AbortSignal,
  isActive: () => boolean,
) {
  try {
    const response = await fetch(PROXY_ENDPOINT, {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal,
    });
    const result = (await response.json()) as {
      ok?: boolean;
      redirect?: string;
    };

    if (!response.ok || !result.ok || result.redirect !== THANK_YOU_PATH) {
      if (isActive()) showActiveCampaignError(params);
      return;
    }

    if (isActive() && !signal.aborted) {
      window.location.assign(THANK_YOU_PATH);
    }
  } catch {
    if (isActive() && !signal.aborted) showActiveCampaignError(params);
  }
}

export function DespiertaActiveCampaignSubmissionProxy({
  formRef,
}: {
  formRef: RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const formRoot = formRef.current;
    if (!formRoot) return;

    const attribution = normalizeAttribution(getActiveUtmParams());
    let observer: MutationObserver | null = null;
    let timeoutId: number | undefined;
    let activeController: AbortController | null = null;
    let requestInFlight = false;
    let integrationReady = false;
    let active = true;

    const stopObserving = () => {
      observer?.disconnect();
      observer = null;
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const installIntegration = () => {
      const form = formRoot.querySelector<HTMLFormElement>(
        config.activeCampaign.formSelector,
      );
      if (!form) return false;

      lockForm(form, "Preparando el formulario seguro...");
      enhanceKnownFormFields(form);

      if (!syncVerifiedAttributionFields(form, attribution)) {
        return false;
      }

      integrationReady = true;
      unlockForm(form);
      return true;
    };

    const showIntegrationError = () => {
      const form = formRoot.querySelector<HTMLFormElement>(
        config.activeCampaign.formSelector,
      );
      if (!form) return;

      integrationReady = false;
      lockForm(
        form,
        "No pudimos preparar el registro seguro. Comprueba tu conexión e inténtalo nuevamente.",
        {
          isError: true,
          onRetry: () => {
            lockForm(form, "Preparando el formulario seguro...");
            if (!installIntegration()) showIntegrationError();
          },
        },
      );
    };

    const protectSubmission = (event: Event) => {
      const form = event.target;
      if (
        !(form instanceof HTMLFormElement) ||
        !form.matches(config.activeCampaign.formSelector)
      ) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      if (!integrationReady) {
        showIntegrationError();
        return;
      }

      if (!form.reportValidity() || requestInFlight) return;

      if (!syncVerifiedAttributionFields(form, attribution)) {
        showIntegrationError();
        return;
      }

      const params = getFormSubmission(form, attribution);
      requestInFlight = true;
      setSubmitting(form, true);

      const controller = new AbortController();
      activeController = controller;
      void submitThroughServer(params, controller.signal, () => active).finally(
        () => {
          if (activeController === controller) activeController = null;
          requestInFlight = false;
          if (active && !controller.signal.aborted) setSubmitting(form, false);
        },
      );
    };

    formRoot.addEventListener("submit", protectSubmission, true);

    if (!installIntegration()) {
      observer = new MutationObserver(() => {
        if (installIntegration()) stopObserving();
      });
      observer.observe(formRoot, { childList: true, subtree: true });
      timeoutId = window.setTimeout(() => {
        stopObserving();
        if (!integrationReady) showIntegrationError();
      }, INTEGRATION_TIMEOUT_MS);
    }

    return () => {
      active = false;
      integrationReady = false;
      activeController?.abort();
      activeController = null;
      formRoot.removeEventListener("submit", protectSubmission, true);
      stopObserving();
    };
  }, [formRef]);

  return null;
}
