"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  consumeDespiertaWhatsAppIntent,
  waitForDespiertaMetaPixel,
} from "@/lib/despierta-potencial-tracking-session";
import { getActiveUtmParams } from "@/lib/hotmart-utms";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { campaignEvent } from "../config";
import {
  resolveAudienceWhatsAppGroup,
  type WhatsAppGroupUrls,
} from "../whatsapp-routing";

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

function resolveWhatsAppGroup(
  whatsappGroupUrls: WhatsAppGroupUrls,
) {
  const attribution = getActiveUtmParams();
  const utmTerm = attribution.utm_term?.trim() || "";
  const { audienceVariant, routedGroupUrl } =
    resolveAudienceWhatsAppGroup(utmTerm, whatsappGroupUrls);

  return {
    adsetId: attribution.adset_id?.trim() || "",
    audienceVariant,
    routedGroupUrl,
    utmTerm,
  };
}

export function RedirectToWhatsApp({
  whatsappGroupUrls,
}: {
  whatsappGroupUrls: WhatsAppGroupUrls;
}) {
  const redirectedRef = useRef(false);
  const intentRef = useRef<
    ReturnType<typeof consumeDespiertaWhatsAppIntent> | undefined
  >(undefined);
  const joinGroupSentRef = useRef(false);
  const isValidFallbackUrl = isValidWhatsAppGroupUrl(
    whatsappGroupUrls.fallback,
  );

  useEffect(() => {
    const { adsetId, audienceVariant, routedGroupUrl, utmTerm } =
      resolveWhatsAppGroup(whatsappGroupUrls);
    if (!isValidWhatsAppGroupUrl(routedGroupUrl)) return;

    if (intentRef.current === undefined) {
      intentRef.current = consumeDespiertaWhatsAppIntent();
    }

    const intent = intentRef.current;
    let trackingAllowed = true;
    let stopWaitingForPixel: () => void = () => undefined;

    if (intent && !joinGroupSentRef.current) {
      stopWaitingForPixel = waitForDespiertaMetaPixel(
        () => {
          if (!trackingAllowed || joinGroupSentRef.current) return;
          const fbq = window.fbq;
          if (!fbq) return;

          try {
            fbq(
              "trackCustom",
              "JoinGroup",
              {
                ...campaignEvent,
                content_category: "Grupo de WhatsApp",
                funnel_step: "join_group",
                source: "thank_you_page",
                destination: "whatsapp_group",
                status: "clicked",
                adset_id: adsetId || undefined,
                audience_variant: audienceVariant,
                utm_term: utmTerm || undefined,
              },
              { eventID: intent.id },
            );
            joinGroupSentRef.current = true;
          } catch {
            // WhatsApp sigue siendo accesible aunque Meta no responda.
          }
        },
        () => undefined,
      );
    }

    const timeoutId = window.setTimeout(() => {
      trackingAllowed = false;
      stopWaitingForPixel();
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      window.location.assign(routedGroupUrl);
    }, 1500);

    return () => {
      trackingAllowed = false;
      stopWaitingForPixel();
      window.clearTimeout(timeoutId);
    };
  }, [whatsappGroupUrls]);

  return (
    <>
      <Script
        id="meta-pixel-despierta-whatsapp"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(undefined, { trackPageView: false }),
        }}
      />
      {isValidFallbackUrl ? (
        <a
          className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#25D366] px-6 text-sm font-black uppercase tracking-[0.03em] text-[#062c15] shadow-[0_20px_60px_rgba(37,211,102,.24)] transition hover:scale-[1.01] sm:w-auto sm:min-w-80 sm:text-base"
          href={whatsappGroupUrls.fallback}
          onClick={(event) => {
            const { routedGroupUrl } =
              resolveWhatsAppGroup(whatsappGroupUrls);
            if (!isValidWhatsAppGroupUrl(routedGroupUrl)) return;
            if (redirectedRef.current) return;

            event.preventDefault();
            redirectedRef.current = true;
            window.location.assign(routedGroupUrl);
          }}
          rel="noopener noreferrer"
        >
          Abrir el grupo manualmente
        </a>
      ) : (
        <p
          className="mt-7 rounded-xl border border-red-300/25 bg-red-300/10 p-4 text-sm font-bold text-red-100"
          role="alert"
        >
          El enlace del grupo no está disponible. Inténtalo más tarde.
        </p>
      )}
    </>
  );
}
