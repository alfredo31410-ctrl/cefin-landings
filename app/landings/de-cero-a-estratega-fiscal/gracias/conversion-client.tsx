"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  getMetaPixelScript,
  initializeMetaPixel,
  META_PIXEL_ID,
} from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const REGISTRATION_PENDING_KEY =
  "cefin_estratega_fiscal_registration_pending";
const REGISTRATION_COMPLETED_KEY =
  "cefin_estratega_fiscal_registration_completed";
const REGISTRATION_MARKER_TTL_MS = 5 * 60 * 1000;
const REGISTRATION_SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const AUTO_REDIRECT_DELAY_MS = 800;

type RegistrationMarker = {
  id: string;
  createdAt: number;
  debugTracking?: boolean;
};

type RegistrationSession = RegistrationMarker & {
  registrationTracked: boolean;
  contactTracked: boolean;
};

declare global {
  interface Window {
    __cefinEstrategaFiscalHandoffAttempted?: boolean;
  }
}

function isValidRegistrationMarker(
  value: unknown,
  ttlMs: number,
): value is RegistrationMarker {
  if (!value || typeof value !== "object") return false;

  const marker = value as Partial<RegistrationMarker>;
  return (
    typeof marker.id === "string" &&
    marker.id.length > 0 &&
    Number.isFinite(marker.createdAt) &&
    Date.now() - Number(marker.createdAt) <= ttlMs &&
    Number(marker.createdAt) <= Date.now()
  );
}

function persistRegistrationSession(session: RegistrationSession) {
  try {
    window.sessionStorage.setItem(
      REGISTRATION_COMPLETED_KEY,
      JSON.stringify(session),
    );
  } catch {
    // El acceso al grupo sigue funcionando aunque el almacenamiento falle.
  }
}

function getRegistrationSession() {
  try {
    const pendingSerialized = window.sessionStorage.getItem(
      REGISTRATION_PENDING_KEY,
    );
    window.sessionStorage.removeItem(REGISTRATION_PENDING_KEY);

    if (pendingSerialized) {
      const pending = JSON.parse(pendingSerialized) as unknown;
      if (isValidRegistrationMarker(pending, REGISTRATION_MARKER_TTL_MS)) {
        const session: RegistrationSession = {
          id: pending.id,
          createdAt: pending.createdAt,
          debugTracking: pending.debugTracking === true,
          registrationTracked: false,
          contactTracked: false,
        };
        persistRegistrationSession(session);
        return session;
      }
    }

    const completedSerialized = window.sessionStorage.getItem(
      REGISTRATION_COMPLETED_KEY,
    );
    if (!completedSerialized) return null;

    const completed = JSON.parse(completedSerialized) as unknown;
    if (!isValidRegistrationMarker(completed, REGISTRATION_SESSION_TTL_MS)) {
      window.sessionStorage.removeItem(REGISTRATION_COMPLETED_KEY);
      return null;
    }

    const session = completed as Partial<RegistrationSession>;
    return {
      id: completed.id,
      createdAt: completed.createdAt,
      debugTracking: session.debugTracking === true,
      registrationTracked: session.registrationTracked === true,
      contactTracked: session.contactTracked === true,
    } satisfies RegistrationSession;
  } catch {
    return null;
  }
}

function getValidWhatsAppGroupUrl(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "chat.whatsapp.com" ||
      url.pathname === "/"
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function enableWhatsAppLink(link: HTMLElement | null, groupUrl: string) {
  if (!(link instanceof HTMLAnchorElement)) return;

  link.href = groupUrl;
  link.removeAttribute("aria-disabled");
  link.removeAttribute("tabindex");
}

function showInvalidRegistration(status: HTMLElement | null) {
  if (!status) return;
  status.textContent =
    "No pudimos comprobar un registro reciente. Vuelve al formulario para registrarte.";
}

function isDebugTrackingEnabled(session: RegistrationSession) {
  return (
    new URLSearchParams(window.location.search).get("debug_tracking") === "1" ||
    session.debugTracking === true
  );
}

function logTrackingEvent(event: string, eventId?: string) {
  console.info("[CEFIN tracking QA]", {
    event,
    eventId,
    pixelId: META_PIXEL_ID,
    timestamp: new Date().toISOString(),
  });
}

function queueConversionEvents(
  session: RegistrationSession,
  debugTracking: boolean,
) {
  if (!config.activation.trackingEnabled) return;

  const pixelWasInitialized = window.__cefinMetaPixelInitialized === true;
  initializeMetaPixel();
  if (typeof window.fbq !== "function") return;

  if (
    debugTracking &&
    !pixelWasInitialized &&
    window.__cefinMetaPixelInitialized
  ) {
    logTrackingEvent("PageView");
  }

  if (!session.registrationTracked) {
    const eventId = `registration-${session.id}`;
    session.registrationTracked = true;
    window.fbq(
      "track",
      "CompleteRegistration",
      {},
      { eventID: eventId },
    );
    if (debugTracking) logTrackingEvent("CompleteRegistration", eventId);
  }

  if (!session.contactTracked) {
    const eventId = `contact-${session.id}`;
    session.contactTracked = true;
    window.fbq(
      "track",
      "Contact",
      {},
      { eventID: eventId },
    );
    if (debugTracking) logTrackingEvent("Contact", eventId);
  }

  persistRegistrationSession(session);
}

function navigateToWhatsApp(groupUrl: string) {
  if (window.__cefinEstrategaFiscalHandoffAttempted) return;
  window.__cefinEstrategaFiscalHandoffAttempted = true;

  try {
    window.location.replace(groupUrl);
  } catch {
    window.location.href = groupUrl;
  }
}

function serializeForInlineScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function getImmediateHandoffScript({
  groupUrl,
  whatsappLinkId,
  statusId,
}: {
  groupUrl: string | null;
  whatsappLinkId: string;
  statusId: string;
}) {
  const serializedConfig = serializeForInlineScript({
    groupUrl,
    whatsappLinkId,
    statusId,
    trackingEnabled: config.activation.trackingEnabled,
    pendingKey: REGISTRATION_PENDING_KEY,
    completedKey: REGISTRATION_COMPLETED_KEY,
    markerTtlMs: REGISTRATION_MARKER_TTL_MS,
    sessionTtlMs: REGISTRATION_SESSION_TTL_MS,
    autoRedirectDelayMs: AUTO_REDIRECT_DELAY_MS,
    pixelId: META_PIXEL_ID,
  });
  const pixelBootstrap = config.activation.trackingEnabled
    ? getMetaPixelScript()
    : "";

  return `
    (() => {
      const settings = ${serializedConfig};
      const status = document.getElementById(settings.statusId);
      const link = document.getElementById(settings.whatsappLinkId);

      const validMarker = (value, ttlMs) => {
        if (!value || typeof value !== "object") return false;
        const createdAt = Number(value.createdAt);
        const now = Date.now();
        return typeof value.id === "string" && value.id.length > 0 &&
          Number.isFinite(createdAt) && createdAt <= now &&
          now - createdAt <= ttlMs;
      };

      const validGroupUrl = (() => {
        try {
          const url = new URL(settings.groupUrl);
          return url.protocol === "https:" &&
            url.hostname === "chat.whatsapp.com" && url.pathname !== "/"
            ? url.toString()
            : null;
        } catch {
          return null;
        }
      })();

      let session = null;
      try {
        const pendingSerialized = sessionStorage.getItem(settings.pendingKey);
        sessionStorage.removeItem(settings.pendingKey);

        if (pendingSerialized) {
          const pending = JSON.parse(pendingSerialized);
          if (validMarker(pending, settings.markerTtlMs)) {
            session = {
              id: pending.id,
              createdAt: pending.createdAt,
              debugTracking: pending.debugTracking === true,
              registrationTracked: false,
              contactTracked: false,
            };
            sessionStorage.setItem(
              settings.completedKey,
              JSON.stringify(session),
            );
          }
        }

        if (!session) {
          const completedSerialized = sessionStorage.getItem(
            settings.completedKey,
          );
          if (completedSerialized) {
            const completed = JSON.parse(completedSerialized);
            if (validMarker(completed, settings.sessionTtlMs)) {
              session = {
                id: completed.id,
                createdAt: completed.createdAt,
                debugTracking: completed.debugTracking === true,
                registrationTracked: completed.registrationTracked === true,
                contactTracked: completed.contactTracked === true,
              };
            } else {
              sessionStorage.removeItem(settings.completedKey);
            }
          }
        }
      } catch {
        session = null;
      }

      if (!session || !validGroupUrl) {
        if (status) {
          status.textContent =
            "No pudimos comprobar un registro reciente. Vuelve al formulario para registrarte.";
        }
        return;
      }

      if (link instanceof HTMLAnchorElement) {
        link.href = validGroupUrl;
        link.removeAttribute("aria-disabled");
        link.removeAttribute("tabindex");
      }

      const debugTracking =
        new URLSearchParams(window.location.search).get("debug_tracking") ===
          "1" || session.debugTracking === true;
      session.debugTracking = debugTracking;

      const logTrackingEvent = (event, eventId) => {
        console.info("[CEFIN tracking QA]", {
          event,
          eventId,
          pixelId: settings.pixelId,
          timestamp: new Date().toISOString(),
        });
      };

      if (debugTracking && status) {
        status.textContent =
          "Modo QA activo. La redirección automática está desactivada.";
      }

      if (settings.trackingEnabled) {
        const pixelWasInitialized =
          window.__cefinMetaPixelInitialized === true;
        ${pixelBootstrap}

        if (
          debugTracking &&
          !pixelWasInitialized &&
          window.__cefinMetaPixelInitialized
        ) {
          logTrackingEvent("PageView");
        }

        if (typeof window.fbq === "function") {
          if (!session.registrationTracked) {
            const eventId = "registration-" + session.id;
            session.registrationTracked = true;
            window.fbq(
              "track",
              "CompleteRegistration",
              {},
              { eventID: eventId },
            );
            if (debugTracking) {
              logTrackingEvent("CompleteRegistration", eventId);
            }
          }
          if (!session.contactTracked) {
            const eventId = "contact-" + session.id;
            session.contactTracked = true;
            window.fbq(
              "track",
              "Contact",
              {},
              { eventID: eventId },
            );
            if (debugTracking) logTrackingEvent("Contact", eventId);
          }
          try {
            sessionStorage.setItem(
              settings.completedKey,
              JSON.stringify(session),
            );
          } catch {}
        }
      }

      if (
        !debugTracking &&
        !window.__cefinEstrategaFiscalHandoffAttempted
      ) {
        window.__cefinEstrategaFiscalHandoffAttempted = true;
        window.setTimeout(() => {
          try {
            window.location.replace(validGroupUrl);
          } catch {
            window.location.href = validGroupUrl;
          }
        }, settings.autoRedirectDelayMs);
      }
    })();
  `;
}

export function ConversionClient({
  groupUrl,
  whatsappLinkId,
  statusId,
}: {
  groupUrl: string | null;
  whatsappLinkId: string;
  statusId: string;
}) {
  const sessionRef = useRef<RegistrationSession | null | undefined>(undefined);

  useEffect(() => {
    if (sessionRef.current === undefined) {
      sessionRef.current = getRegistrationSession();
    }

    const session = sessionRef.current;
    const safeGroupUrl = getValidWhatsAppGroupUrl(groupUrl);
    const status = document.getElementById(statusId);
    if (!session || !safeGroupUrl) {
      showInvalidRegistration(status);
      return;
    }

    const whatsappLink = document.getElementById(whatsappLinkId);
    enableWhatsAppLink(whatsappLink, safeGroupUrl);
    const debugTracking = isDebugTrackingEnabled(session);
    session.debugTracking = debugTracking;
    if (debugTracking && status) {
      status.textContent =
        "Modo QA activo. La redirección automática está desactivada.";
    }
    queueConversionEvents(session, debugTracking);

    if (debugTracking) return;

    const redirectTimeoutId = window.setTimeout(
      () => navigateToWhatsApp(safeGroupUrl),
      AUTO_REDIRECT_DELAY_MS,
    );

    return () => {
      window.clearTimeout(redirectTimeoutId);
    };
  }, [groupUrl, statusId, whatsappLinkId]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: getImmediateHandoffScript({
            groupUrl,
            whatsappLinkId,
            statusId,
          }),
        }}
      />
      {config.activation.trackingEnabled && (
        <Script
          id="meta-pixel-estratega-fiscal-gracias"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
        />
      )}
    </>
  );
}
