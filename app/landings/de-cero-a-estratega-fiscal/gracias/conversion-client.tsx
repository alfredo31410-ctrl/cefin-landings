"use client";

import { useEffect, useRef } from "react";
import { initializeMetaPixel, META_PIXEL_ID } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const REGISTRATION_CAMPAIGN_KEY =
  "de_cero_a_estratega_fiscal_clase_2_sep26";
const REGISTRATION_PENDING_KEY =
  "cefin_estratega_fiscal_registration_pending";
const REGISTRATION_COMPLETED_KEY =
  "cefin_estratega_fiscal_registration_completed";
const CONTACT_REGISTRATION_KEY_PREFIX =
  "cefin_complete_registration_contact";
const REGISTRATION_MARKER_TTL_MS = 5 * 60 * 1000;
const REGISTRATION_SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const INVALID_REGISTRATION_REDIRECT_DELAY_MS = 1400;

type RegistrationMarker = {
  id: string;
  createdAt: number;
  debugTracking?: boolean;
  contactHash?: string;
};

type RegistrationSession = RegistrationMarker & {
  registrationTracked: boolean;
  registrationTrackedAt?: string;
  registrationEventId?: string;
  contactAlreadyRegistered?: boolean;
};

type ContactRegistration = {
  eventId: string;
  trackedAt: string;
};

type TrackingReason =
  | "invalid-proof"
  | "new-contact"
  | "same-contact"
  | "reload"
  | "missing-contact-hash"
  | "tracking-disabled"
  | "pixel-unavailable"
  | "pixel-call-failed";

declare global {
  interface Window {
    __cefinEstrategaFiscalInvalidRedirectScheduled?: boolean;
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
    Number(marker.createdAt) <= Date.now() &&
    Date.now() - Number(marker.createdAt) <= ttlMs
  );
}

function persistRegistrationSession(session: RegistrationSession) {
  try {
    window.sessionStorage.setItem(
      REGISTRATION_COMPLETED_KEY,
      JSON.stringify(session),
    );
  } catch {
    // El comprobante ya fue validado; un fallo de almacenamiento no bloquea el CTA.
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
          contactHash:
            typeof pending.contactHash === "string"
              ? pending.contactHash
              : undefined,
          registrationTracked: false,
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
      contactHash:
        typeof session.contactHash === "string"
          ? session.contactHash
          : undefined,
      registrationTracked: session.registrationTracked === true,
      registrationTrackedAt:
        typeof session.registrationTrackedAt === "string"
          ? session.registrationTrackedAt
          : undefined,
      registrationEventId:
        typeof session.registrationEventId === "string"
          ? session.registrationEventId
          : undefined,
      contactAlreadyRegistered:
        typeof session.contactAlreadyRegistered === "boolean"
          ? session.contactAlreadyRegistered
          : undefined,
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

function getContactRegistrationKey(contactHash: string) {
  return `${CONTACT_REGISTRATION_KEY_PREFIX}:${REGISTRATION_CAMPAIGN_KEY}:${contactHash}`;
}

function getStoredContactRegistration(contactHash: string) {
  try {
    const serialized = window.localStorage.getItem(
      getContactRegistrationKey(contactHash),
    );
    if (!serialized) return null;

    const registration = JSON.parse(serialized) as Partial<ContactRegistration>;
    if (
      typeof registration.eventId !== "string" ||
      typeof registration.trackedAt !== "string"
    ) {
      return null;
    }

    return registration as ContactRegistration;
  } catch {
    return null;
  }
}

function persistContactRegistration(
  contactHash: string,
  registration: ContactRegistration,
) {
  try {
    window.localStorage.setItem(
      getContactRegistrationKey(contactHash),
      JSON.stringify(registration),
    );
    return true;
  } catch {
    return false;
  }
}

function isDebugTrackingEnabled(session: RegistrationSession | null) {
  return (
    new URLSearchParams(window.location.search).get("debug_tracking") === "1" ||
    session?.debugTracking === true
  );
}

function logTrackingQa({
  session,
  valid,
  reason,
  eventId,
  contactAlreadyRegistered,
  dedupMarkStored,
}: {
  session: RegistrationSession | null;
  valid: boolean;
  reason: TrackingReason;
  eventId?: string;
  contactAlreadyRegistered?: boolean;
  dedupMarkStored?: boolean;
}) {
  console.info("[CEFIN tracking QA]", {
    campaignKey: REGISTRATION_CAMPAIGN_KEY,
    registrationId: session?.id,
    registrationProofValid: valid,
    contactAlreadyRegistered,
    completeRegistrationReason: reason,
    event_id: eventId,
    pixelId: META_PIXEL_ID,
    dedupMarkStored,
    timestamp: new Date().toISOString(),
  });
}

function showInvalidRegistration({
  title,
  description,
  status,
  actionPanel,
}: {
  title: HTMLElement | null;
  description: HTMLElement | null;
  status: HTMLElement | null;
  actionPanel: HTMLElement | null;
}) {
  if (title) title.textContent = "Necesitas completar tu registro primero";
  if (description) {
    description.textContent =
      "No encontramos un registro reciente asociado con esta sesión.";
  }
  if (status) {
    status.textContent = "Te enviaremos al formulario de registro…";
  }
  if (actionPanel) actionPanel.hidden = true;
}

function scheduleInvalidRegistrationRedirect() {
  if (window.__cefinEstrategaFiscalInvalidRedirectScheduled) return;
  window.__cefinEstrategaFiscalInvalidRedirectScheduled = true;
  window.setTimeout(() => {
    window.location.replace(config.routes.root);
  }, INVALID_REGISTRATION_REDIRECT_DELAY_MS);
}

function queueCompleteRegistration(
  session: RegistrationSession,
  debugTracking: boolean,
) {
  const currentEventId = `registration-${session.id}`;

  if (session.registrationTracked) {
    if (debugTracking) {
      logTrackingQa({
        session,
        valid: true,
        reason: "reload",
        eventId: session.registrationEventId ?? currentEventId,
        contactAlreadyRegistered: session.contactAlreadyRegistered,
      });
    }
    return;
  }

  const priorRegistration = session.contactHash
    ? getStoredContactRegistration(session.contactHash)
    : null;

  if (priorRegistration) {
    session.registrationTracked = true;
    session.registrationTrackedAt = priorRegistration.trackedAt;
    session.registrationEventId = priorRegistration.eventId;
    session.contactAlreadyRegistered = true;
    persistRegistrationSession(session);

    if (debugTracking) {
      logTrackingQa({
        session,
        valid: true,
        reason: "same-contact",
        eventId: priorRegistration.eventId,
        contactAlreadyRegistered: true,
      });
    }
    return;
  }

  if (!config.activation.trackingEnabled) {
    persistRegistrationSession(session);
    if (debugTracking) {
      logTrackingQa({
        session,
        valid: true,
        reason: "tracking-disabled",
        eventId: currentEventId,
        contactAlreadyRegistered: false,
      });
    }
    return;
  }

  initializeMetaPixel(META_PIXEL_ID, { trackPageView: false });
  if (typeof window.fbq !== "function") {
    if (debugTracking) {
      logTrackingQa({
        session,
        valid: true,
        reason: "pixel-unavailable",
        eventId: currentEventId,
        contactAlreadyRegistered: false,
      });
    }
    return;
  }

  try {
    window.fbq(
      "track",
      "CompleteRegistration",
      {},
      { eventID: currentEventId },
    );
  } catch {
    if (debugTracking) {
      logTrackingQa({
        session,
        valid: true,
        reason: "pixel-call-failed",
        eventId: currentEventId,
        contactAlreadyRegistered: false,
      });
    }
    return;
  }

  const trackedAt = new Date().toISOString();
  const dedupMarkStored = session.contactHash
    ? persistContactRegistration(session.contactHash, {
        eventId: currentEventId,
        trackedAt,
      })
    : false;

  session.registrationTracked = true;
  session.registrationTrackedAt = trackedAt;
  session.registrationEventId = currentEventId;
  session.contactAlreadyRegistered = false;
  persistRegistrationSession(session);

  if (debugTracking) {
    logTrackingQa({
      session,
      valid: true,
      reason: session.contactHash ? "new-contact" : "missing-contact-hash",
      eventId: currentEventId,
      contactAlreadyRegistered: false,
      dedupMarkStored,
    });
  }
}

function serializeForInlineScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function getEarlyRegistrationGateScript({
  groupUrl,
  whatsappLinkId,
  statusId,
  titleId,
  descriptionId,
  actionPanelId,
}: {
  groupUrl: string | null;
  whatsappLinkId: string;
  statusId: string;
  titleId: string;
  descriptionId: string;
  actionPanelId: string;
}) {
  const settings = serializeForInlineScript({
    groupUrl,
    whatsappLinkId,
    statusId,
    titleId,
    descriptionId,
    actionPanelId,
    campaignKey: REGISTRATION_CAMPAIGN_KEY,
    pendingKey: REGISTRATION_PENDING_KEY,
    completedKey: REGISTRATION_COMPLETED_KEY,
    markerTtlMs: REGISTRATION_MARKER_TTL_MS,
    sessionTtlMs: REGISTRATION_SESSION_TTL_MS,
    landingUrl: config.routes.root,
    redirectDelayMs: INVALID_REGISTRATION_REDIRECT_DELAY_MS,
    pixelId: META_PIXEL_ID,
  });

  return `
    (() => {
      const settings = ${settings};
      const title = document.getElementById(settings.titleId);
      const description = document.getElementById(settings.descriptionId);
      const status = document.getElementById(settings.statusId);
      const actionPanel = document.getElementById(settings.actionPanelId);
      const link = document.getElementById(settings.whatsappLinkId);

      const validMarker = (value, ttlMs) => {
        if (!value || typeof value !== "object") return false;
        const createdAt = Number(value.createdAt);
        const now = Date.now();
        return typeof value.id === "string" && value.id.length > 0 &&
          Number.isFinite(createdAt) && createdAt <= now &&
          now - createdAt <= ttlMs;
      };

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
              contactHash:
                typeof pending.contactHash === "string"
                  ? pending.contactHash
                  : undefined,
              registrationTracked: false,
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
              session = completed;
            } else {
              sessionStorage.removeItem(settings.completedKey);
            }
          }
        }
      } catch {
        session = null;
      }

      const debugTracking =
        new URLSearchParams(window.location.search).get("debug_tracking") ===
          "1" || session?.debugTracking === true;

      if (!session) {
        if (title) title.textContent = "Necesitas completar tu registro primero";
        if (description) {
          description.textContent =
            "No encontramos un registro reciente asociado con esta sesión.";
        }
        if (status) status.textContent = "Te enviaremos al formulario de registro…";
        if (actionPanel) actionPanel.hidden = true;

        if (debugTracking) {
          console.info("[CEFIN tracking QA]", {
            campaignKey: settings.campaignKey,
            registrationId: undefined,
            registrationProofValid: false,
            contactAlreadyRegistered: undefined,
            completeRegistrationReason: "invalid-proof",
            event_id: undefined,
            pixelId: settings.pixelId,
            timestamp: new Date().toISOString(),
          });
        }

        if (!window.__cefinEstrategaFiscalInvalidRedirectScheduled) {
          window.__cefinEstrategaFiscalInvalidRedirectScheduled = true;
          window.setTimeout(() => {
            window.location.replace(settings.landingUrl);
          }, settings.redirectDelayMs);
        }
        return;
      }

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

      if (validGroupUrl && link instanceof HTMLAnchorElement) {
        link.href = validGroupUrl;
        link.removeAttribute("aria-disabled");
        link.removeAttribute("tabindex");
        if (actionPanel) actionPanel.hidden = false;
        if (status) {
          status.textContent =
            "Registro comprobado. Toca el botón para abrir WhatsApp.";
        }
      } else {
        if (actionPanel) actionPanel.hidden = true;
        if (status) {
          status.textContent =
            "Tu registro es válido, pero el grupo no está disponible en este momento.";
        }
      }
    })();
  `;
}

export function ConversionClient({
  groupUrl,
  whatsappLinkId,
  statusId,
  titleId,
  descriptionId,
  actionPanelId,
}: {
  groupUrl: string | null;
  whatsappLinkId: string;
  statusId: string;
  titleId: string;
  descriptionId: string;
  actionPanelId: string;
}) {
  const sessionRef = useRef<RegistrationSession | null | undefined>(undefined);

  useEffect(() => {
    if (sessionRef.current === undefined) {
      sessionRef.current = getRegistrationSession();
    }

    const session = sessionRef.current;
    const title = document.getElementById(titleId);
    const description = document.getElementById(descriptionId);
    const status = document.getElementById(statusId);
    const actionPanel = document.getElementById(actionPanelId);
    const link = document.getElementById(whatsappLinkId);
    const debugTracking = isDebugTrackingEnabled(session ?? null);

    if (!session) {
      showInvalidRegistration({ title, description, status, actionPanel });
      if (debugTracking) {
        logTrackingQa({
          session: null,
          valid: false,
          reason: "invalid-proof",
        });
      }
      scheduleInvalidRegistrationRedirect();
      return;
    }

    const safeGroupUrl = getValidWhatsAppGroupUrl(groupUrl);
    if (safeGroupUrl && link instanceof HTMLAnchorElement) {
      link.href = safeGroupUrl;
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
      if (actionPanel) actionPanel.hidden = false;
      if (status) {
        status.textContent =
          "Registro comprobado. Toca el botón para abrir WhatsApp.";
      }
    } else {
      if (status) {
        status.textContent =
          "Tu registro es válido, pero el grupo no está disponible en este momento.";
      }
      if (actionPanel) actionPanel.hidden = true;
    }

    session.debugTracking = debugTracking;
    queueCompleteRegistration(session, debugTracking);
  }, [
    actionPanelId,
    descriptionId,
    groupUrl,
    statusId,
    titleId,
    whatsappLinkId,
  ]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getEarlyRegistrationGateScript({
          groupUrl,
          whatsappLinkId,
          statusId,
          titleId,
          descriptionId,
          actionPanelId,
        }),
      }}
    />
  );
}
