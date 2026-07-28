"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import {
  consumeNominaWhatsAppIntent,
  getNominaEventKey,
  waitForNominaMetaPixel,
  createNominaWhatsAppIntent,
} from "@/lib/nomina-tracking-session";

type RedirectToWhatsAppProps = {
  whatsappGroupUrl: string;
};

function isValidWhatsAppGroupUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "chat.whatsapp.com" && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function RedirectToWhatsApp({ whatsappGroupUrl }: RedirectToWhatsAppProps) {
  const redirectedRef = useRef(false);
  const isValidUrl = isValidWhatsAppGroupUrl(whatsappGroupUrl);

  useEffect(() => {
    if (!isValidUrl) return;

    const intent = consumeNominaWhatsAppIntent();
    let trackingAllowed = true;
    let stopWaitingForPixel: () => void = () => undefined;

    if (intent) {
      const eventKey = getNominaEventKey("join_group_sent", intent.id);
      let alreadySent = false;
      try {
        alreadySent = Boolean(window.sessionStorage.getItem(eventKey));
      } catch {
        alreadySent = false;
      }

      if (!alreadySent) {
        stopWaitingForPixel = waitForNominaMetaPixel(
          () => {
            if (!trackingAllowed) return;
            window.fbq?.("trackCustom", "JoinGroup");
            try {
              window.sessionStorage.setItem(eventKey, "true");
            } catch {
              // The event was sent; storage restrictions must not affect navigation.
            }
          },
          () => undefined,
        );
      }
    }

    const timeout = window.setTimeout(() => {
      trackingAllowed = false;
      stopWaitingForPixel();
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      window.location.assign(whatsappGroupUrl);
    }, 1500);

    return () => {
      trackingAllowed = false;
      stopWaitingForPixel();
      window.clearTimeout(timeout);
    };
  }, [isValidUrl, whatsappGroupUrl]);

  return (
    <>
      <Script
        id="meta-pixel-nomina-whatsapp"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(undefined, { trackPageView: false }),
        }}
      />
      {isValidUrl ? (
        <a className="whatsapp-redirect-button" href={whatsappGroupUrl} rel="noopener noreferrer">
          ABRIR EL GRUPO MANUALMENTE
        </a>
      ) : (
        <p className="whatsapp-redirect-error" role="alert">
          El enlace del grupo no está disponible. Vuelve a intentarlo más tarde.
        </p>
      )}
    </>
  );
}

export function NominaWhatsAppIntentLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a className={className} href={href} onClick={() => createNominaWhatsAppIntent()}>
      {children}
    </a>
  );
}
