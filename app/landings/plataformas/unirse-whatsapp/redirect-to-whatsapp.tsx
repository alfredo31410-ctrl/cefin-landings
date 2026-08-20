"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import {
  consumePlataformasWhatsAppIntent,
  waitForPlataformasMetaPixel,
} from "@/lib/plataformas-tracking-session";
import { webinarEvent } from "../config";

function isValidWhatsAppGroupUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "chat.whatsapp.com" &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function RedirectToWhatsApp({
  whatsappGroupUrl,
}: {
  whatsappGroupUrl: string;
}) {
  const redirectedRef = useRef(false);
  const intentRef = useRef<
    ReturnType<typeof consumePlataformasWhatsAppIntent> | undefined
  >(undefined);
  const joinGroupSentRef = useRef(false);
  const isValidUrl = isValidWhatsAppGroupUrl(whatsappGroupUrl);

  useEffect(() => {
    if (!isValidUrl) return;

    if (intentRef.current === undefined) {
      intentRef.current = consumePlataformasWhatsAppIntent();
    }
    const intent = intentRef.current;
    let trackingAllowed = true;
    let stopWaitingForPixel: () => void = () => undefined;

    if (intent && !joinGroupSentRef.current) {
      stopWaitingForPixel = waitForPlataformasMetaPixel(
        () => {
          if (!trackingAllowed || joinGroupSentRef.current) return;
          joinGroupSentRef.current = true;
          const payload = {
            ...webinarEvent,
            content_category: "Grupo de WhatsApp",
            funnel_step: "join_group",
            source: "thank_you_page",
            destination: "whatsapp_group",
            status: "clicked",
          };
          window.fbq?.(
            "trackCustom",
            "JoinGroup",
            payload,
            { eventID: intent.id },
          );
        },
        () => undefined,
      );
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
        id="meta-pixel-plataformas-whatsapp"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(undefined, { trackPageView: false }),
        }}
      />
      {isValidUrl ? (
        <a
          className="whatsapp-redirect-button"
          href={whatsappGroupUrl}
          rel="noopener noreferrer"
        >
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
