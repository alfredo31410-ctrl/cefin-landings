"use client";

import { useEffect, useRef } from "react";
import { initializeMetaPixel, META_PIXEL_ID } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const REGISTRATION_PENDING_KEY =
  "cefin_estratega_fiscal_registration_pending";
const REGISTRATION_COMPLETED_KEY =
  "cefin_estratega_fiscal_registration_completed";
const REGISTRATION_MARKER_TTL_MS = 5 * 60 * 1000;
const REGISTRATION_SESSION_TTL_MS = 24 * 60 * 60 * 1000;

type RegistrationMarker = {
  id: string;
  createdAt: number;
  debugTracking?: boolean;
};

type RegistrationSession = RegistrationMarker & {
  registrationTracked: boolean;
  registrationTrackedAt?: string;
};

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
      registrationTracked: session.registrationTracked === true,
      registrationTrackedAt:
        typeof session.registrationTrackedAt === "string"
          ? session.registrationTrackedAt
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

function isDebugTrackingEnabled(session: RegistrationSession | null) {
  return (
    new URLSearchParams(window.location.search).get("debug_tracking") === "1" ||
    session?.debugTracking === true
  );
}

function logTrackingQa({
  valid,
  eventId,
  registrationTrackedAt,
  status,
}: {
  valid: boolean;
  eventId?: string;
  registrationTrackedAt?: string;
  status: "validation" | "dispatched" | "already-tracked";
}) {
  console.info("[CEFIN tracking QA]", {
    pixelId: META_PIXEL_ID,
    event: status === "validation" ? undefined : "CompleteRegistration",
    event_id: eventId,
    status,
    registrationProofValid: valid,
    completeRegistrationAt: registrationTrackedAt,
    checkedAt: new Date().toISOString(),
  });
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
      if (title) title.textContent = "No pudimos comprobar tu registro";
      if (description) {
        description.textContent =
          "No encontramos un registro reciente asociado con esta sesión.";
      }
      if (status) {
        status.textContent =
          "Vuelve al formulario y completa tu registro para habilitar el acceso al grupo de WhatsApp.";
      }
      if (actionPanel) actionPanel.hidden = true;
      if (debugTracking) {
        logTrackingQa({ valid: false, status: "validation" });
      }
      return;
    }

    const eventId = `registration-${session.id}`;
    if (debugTracking) {
      logTrackingQa({
        valid: true,
        eventId,
        registrationTrackedAt: session.registrationTrackedAt,
        status: "validation",
      });
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
    if (!config.activation.trackingEnabled) {
      persistRegistrationSession(session);
      return;
    }

    initializeMetaPixel(META_PIXEL_ID, { trackPageView: false });
    if (typeof window.fbq !== "function") return;

    if (!session.registrationTracked) {
      const trackedAt = new Date().toISOString();
      session.registrationTracked = true;
      session.registrationTrackedAt = trackedAt;
      window.fbq("track", "CompleteRegistration", {}, { eventID: eventId });
      persistRegistrationSession(session);

      if (debugTracking) {
        logTrackingQa({
          valid: true,
          eventId,
          registrationTrackedAt: trackedAt,
          status: "dispatched",
        });
      }
      return;
    }

    persistRegistrationSession(session);
    if (debugTracking) {
      logTrackingQa({
        valid: true,
        eventId,
        registrationTrackedAt: session.registrationTrackedAt,
        status: "already-tracked",
      });
    }
  }, [
    actionPanelId,
    descriptionId,
    groupUrl,
    statusId,
    titleId,
    whatsappLinkId,
  ]);

  return null;
}
