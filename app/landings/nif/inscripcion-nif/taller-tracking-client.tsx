"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const VIEW_CONTENT_KEY = "nifTallerViewContentSent";
const TALLER_PRICE = 687;

export function TallerTrackingClient() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(VIEW_CONTENT_KEY)) return;
      window.sessionStorage.setItem(VIEW_CONTENT_KEY, "true");
    } catch {
      // El evento puede enviarse aunque el almacenamiento no esté disponible.
    }

    trackMetaEvent("ViewContent", {
      content_name: "Taller Práctico de NIF",
      content_category: "Taller en vivo",
      value: TALLER_PRICE,
      currency: "MXN",
    });
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-nif-taller"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl()}
          alt=""
        />
      </noscript>
    </>
  );
}

export function trackTallerOfferClick() {
  trackMetaCustomEvent("OfferSectionClick", {
    content_name: "Taller Práctico de NIF",
    value: TALLER_PRICE,
    currency: "MXN",
  });
}

export function trackTallerCheckoutClick() {
  trackMetaEvent("InitiateCheckout", {
    content_name: "Taller Práctico de NIF",
    content_category: "Taller en vivo",
    value: TALLER_PRICE,
    currency: "MXN",
  });
}
