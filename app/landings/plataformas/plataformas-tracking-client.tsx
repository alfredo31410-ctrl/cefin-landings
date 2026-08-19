"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

const ACTIVE_CAMPAIGN_ORIGIN = "https://cefincapacitacion.activehosted.com";
const PROXY_ENDPOINT = "/landings/plataformas/api/registro";
const THANK_YOU_PATH = "/landings/plataformas/gracias";
const PLATFORM_UTM_STORAGE_KEY = "cefinPlataformasUtmParams";
const FORM_SELECTOR = "form._form_323";
const INTEGRATION_TIMEOUT_MS = 15_000;

const UTM_FIELDS = [
  { name: "utm_source", fieldId: 7 },
  { name: "utm_medium", fieldId: 8 },
  { name: "utm_campaign", fieldId: 9 },
  { name: "utm_content", fieldId: 10 },
] as const;

type UtmName = (typeof UTM_FIELDS)[number]["name"];
type UtmValues = Record<UtmName, string>;

type ActiveCampaignScriptLoader = (
  url: string,
  callback?: (() => void) | null,
  isSubmit?: boolean,
) => void;

declare global {
  interface Window {
    _load_script?: ActiveCampaignScriptLoader;
    _show_error?: (id: string, message: string, html?: string) => void;
  }
}

function readUrlUtms(): Partial<UtmValues> {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    UTM_FIELDS.map(({ name }) => [name, params.get(name)?.trim() || ""]).filter(
      ([, value]) => Boolean(value),
    ),
  );
}

function readSessionUtms(): Partial<UtmValues> {
  try {
    const serialized = window.sessionStorage.getItem(PLATFORM_UTM_STORAGE_KEY);
    if (!serialized) return {};

    const parsed = JSON.parse(serialized) as Record<string, unknown>;
    return Object.fromEntries(
      UTM_FIELDS.map(({ name }) => [
        name,
        typeof parsed[name] === "string" ? parsed[name].trim() : "",
      ]).filter(([, value]) => Boolean(value)),
    );
  } catch {
    return {};
  }
}

function getUtms(): UtmValues {
  const urlUtms = readUrlUtms();
  const sessionUtms = readSessionUtms();
  const utms = Object.fromEntries(
    UTM_FIELDS.map(({ name }) => [
      name,
      urlUtms[name] || sessionUtms[name] || "",
    ]),
  ) as UtmValues;

  if (Object.values(utms).some(Boolean)) {
    try {
      window.sessionStorage.setItem(
        PLATFORM_UTM_STORAGE_KEY,
        JSON.stringify(utms),
      );
    } catch {
      // Attribution must never interrupt registration.
    }
  }

  return utms;
}

function syncUtmFields(form: HTMLFormElement, utms: UtmValues) {
  let allInputsFound = true;

  UTM_FIELDS.forEach(({ name, fieldId }) => {
    const input = form.querySelector<HTMLInputElement>(
      `input[name="field[${fieldId}]"]`,
    );
    if (!input) {
      allInputsFound = false;
      return;
    }
    input.value = utms[name];
  });

  return allInputsFound;
}

function getFormSubmission(url: string) {
  try {
    const requestUrl = new URL(url, window.location.href);
    if (
      requestUrl.origin !== ACTIVE_CAMPAIGN_ORIGIN ||
      requestUrl.pathname !== "/proc.php" ||
      requestUrl.searchParams.get("f") !== "323"
    ) {
      return null;
    }

    requestUrl.searchParams.delete("jsonp");
    return requestUrl.searchParams;
  } catch {
    return null;
  }
}

function showActiveCampaignError(params: URLSearchParams) {
  const formInstanceId = params.get("u") || "";
  const message =
    "No pudimos confirmar tu registro. Revisa tus datos e inténtalo nuevamente.";

  if (formInstanceId && window._show_error) {
    window._show_error(formInstanceId, message);
  }
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

export function PlataformasActiveCampaignSubmissionProxy({
  formRef,
}: {
  formRef: RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const formRoot = formRef.current;
    if (!formRoot) return;

    const utms = getUtms();
    let observer: MutationObserver | null = null;
    let originalLoader: ActiveCampaignScriptLoader | undefined;
    let proxyLoader: ActiveCampaignScriptLoader | undefined;
    let timeoutId: number | undefined;
    let activeController: AbortController | null = null;
    let requestInFlight = false;
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
      const form = formRoot.querySelector<HTMLFormElement>(FORM_SELECTOR);
      if (!form || !window._load_script || !syncUtmFields(form, utms)) {
        return false;
      }

      originalLoader = window._load_script;
      proxyLoader = function plataformasActiveCampaignLoader(
        url,
        callback,
        isSubmit,
      ) {
        const params = isSubmit ? getFormSubmission(url) : null;
        if (!params) {
          originalLoader?.call(window, url, callback, isSubmit);
          return;
        }

        if (requestInFlight) return;
        requestInFlight = true;
        const controller = new AbortController();
        activeController = controller;

        void submitThroughServer(params, controller.signal, () => active).finally(
          () => {
            if (activeController === controller) activeController = null;
            requestInFlight = false;
          },
        );
      };
      window._load_script = proxyLoader;
      return true;
    };

    if (!installIntegration()) {
      observer = new MutationObserver(() => {
        if (installIntegration()) stopObserving();
      });
      observer.observe(formRoot, { childList: true, subtree: true });
      timeoutId = window.setTimeout(stopObserving, INTEGRATION_TIMEOUT_MS);
    }

    return () => {
      active = false;
      activeController?.abort();
      activeController = null;
      stopObserving();
      if (proxyLoader && window._load_script === proxyLoader && originalLoader) {
        window._load_script = originalLoader;
      }
    };
  }, [formRef]);

  return null;
}
