"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

const ACTIVE_CAMPAIGN_ORIGIN = "https://cefincapacitacion.activehosted.com";
const REGISTRATION_START_ENDPOINT =
  "/landings/plataformas/api/registro/iniciar";
const PROXY_ENDPOINT = "/landings/plataformas/api/registro";
const THANK_YOU_PATH = "/landings/plataformas/gracias";
const PROXY_INSTALL_TIMEOUT_MS = 15_000;
const REGISTRATION_LOCK_NAME = "cefin-plataformas-registration";

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
    const startResponse = await fetch(REGISTRATION_START_ENDPOINT, {
      method: "POST",
      credentials: "same-origin",
      signal,
    });
    if (!startResponse.ok) {
      if (isActive()) showActiveCampaignError(params);
      return;
    }

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

    if (
      !response.ok ||
      !result.ok ||
      result.redirect !== THANK_YOU_PATH
    ) {
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

async function submitWithBrowserLock(task: () => Promise<void>) {
  if (!("locks" in navigator)) {
    await task();
    return true;
  }

  let acquired = false;
  await navigator.locks.request(
    REGISTRATION_LOCK_NAME,
    { ifAvailable: true },
    async (lock) => {
      if (!lock) return;
      acquired = true;
      await task();
    },
  );
  return acquired;
}

export function PlataformasActiveCampaignSubmissionProxy({
  formRef,
}: {
  formRef: RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const formRoot = formRef.current;
    if (!formRoot) return;

    let observer: MutationObserver | null = null;
    let originalLoader: ActiveCampaignScriptLoader | undefined;
    let proxyLoader: ActiveCampaignScriptLoader | undefined;
    let proxyInstallTimeoutId: number | undefined;
    let activeController: AbortController | null = null;
    let requestInFlight = false;
    let active = true;

    const stopObserving = () => {
      observer?.disconnect();
      observer = null;
      if (proxyInstallTimeoutId !== undefined) {
        window.clearTimeout(proxyInstallTimeoutId);
        proxyInstallTimeoutId = undefined;
      }
    };

    const installProxy = () => {
      if (!formRoot.querySelector("form._form_323") || !window._load_script) {
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

        void submitWithBrowserLock(() =>
          submitThroughServer(params, controller.signal, () => active),
        )
          .then((acquired) => {
            if (!acquired && active && !controller.signal.aborted) {
              showActiveCampaignError(params);
            }
          })
          .catch(() => {
            if (active && !controller.signal.aborted) {
              showActiveCampaignError(params);
            }
          })
          .finally(() => {
            if (activeController === controller) activeController = null;
            requestInFlight = false;
          });
      };
      window._load_script = proxyLoader;
      return true;
    };

    if (!installProxy()) {
      observer = new MutationObserver(() => {
        if (installProxy()) {
          stopObserving();
        }
      });
      observer.observe(formRoot, { childList: true, subtree: true });
      proxyInstallTimeoutId = window.setTimeout(
        stopObserving,
        PROXY_INSTALL_TIMEOUT_MS,
      );
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
