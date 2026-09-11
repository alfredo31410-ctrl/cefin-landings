"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "../config";

const REGISTRATION_PENDING_KEY =
  "cefin_estratega_fiscal_registration_pending";
const REGISTRATION_COMPLETED_KEY =
  "cefin_estratega_fiscal_registration_completed";
const REGISTRATION_MARKER_TTL_MS = 5 * 60 * 1000;
const REGISTRATION_SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const PIXEL_RETRY_INTERVAL_MS = 50;
const PIXEL_MAX_ATTEMPTS = 6;
const TRACKING_SEND_DELAY_MS = 100;

type RegistrationMarker = {
  id: string;
  createdAt: number;
};

type RegistrationSession = RegistrationMarker & {
  registrationTracked: boolean;
  contactTracked: boolean;
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

export function ConversionClient({
  groupUrl,
  whatsappLinkId,
}: {
  groupUrl: string | null;
  whatsappLinkId: string;
}) {
  const sessionRef = useRef<RegistrationSession | null | undefined>(undefined);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (sessionRef.current === undefined) {
      sessionRef.current = getRegistrationSession();
    }
    const session = sessionRef.current;
    const safeGroupUrl = getValidWhatsAppGroupUrl(groupUrl);
    if (!session || !safeGroupUrl) return;

    const whatsappLink = document.getElementById(whatsappLinkId);
    if (whatsappLink instanceof HTMLAnchorElement) {
      whatsappLink.href = safeGroupUrl;
      whatsappLink.hidden = false;
    }

    let attempts = PIXEL_MAX_ATTEMPTS;
    let retryTimeoutId: number | undefined;
    let navigationTimeoutId: number | undefined;

    const navigateToWhatsApp = () => {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      window.location.assign(safeGroupUrl);
    };

    const trackRegistration = () => {
      if (
        config.activation.trackingEnabled &&
        typeof window.fbq !== "function" &&
        attempts > 0
      ) {
        attempts -= 1;
        retryTimeoutId = window.setTimeout(
          trackRegistration,
          PIXEL_RETRY_INTERVAL_MS,
        );
        return;
      }

      if (
        config.activation.trackingEnabled &&
        typeof window.fbq === "function"
      ) {
        if (session.registrationTracked) return;

        session.registrationTracked = true;
        persistRegistrationSession(session);
        window.fbq(
          "track",
          "CompleteRegistration",
          {},
          { eventID: `registration-${session.id}` },
        );
      }
    };

    const handleWhatsAppClick = (event: Event) => {
      event.preventDefault();
      if (
        config.activation.trackingEnabled &&
        typeof window.fbq === "function"
      ) {
        if (!session.registrationTracked) {
          session.registrationTracked = true;
          persistRegistrationSession(session);
          window.fbq(
            "track",
            "CompleteRegistration",
            {},
            { eventID: `registration-${session.id}` },
          );
        }
        if (!session.contactTracked) {
          session.contactTracked = true;
          persistRegistrationSession(session);
          window.fbq(
            "track",
            "Contact",
            {},
            { eventID: `contact-${session.id}` },
          );
        }
        navigationTimeoutId = window.setTimeout(
          navigateToWhatsApp,
          TRACKING_SEND_DELAY_MS,
        );
        return;
      }

      navigateToWhatsApp();
    };

    whatsappLink?.addEventListener("click", handleWhatsAppClick);
    trackRegistration();

    return () => {
      whatsappLink?.removeEventListener("click", handleWhatsAppClick);
      if (retryTimeoutId !== undefined) {
        window.clearTimeout(retryTimeoutId);
      }
      if (navigationTimeoutId !== undefined) {
        window.clearTimeout(navigationTimeoutId);
      }
    };
  }, [groupUrl, whatsappLinkId]);

  if (!config.activation.trackingEnabled) return null;

  return (
    <Script
      id="meta-pixel-estratega-fiscal-gracias"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
    />
  );
}
