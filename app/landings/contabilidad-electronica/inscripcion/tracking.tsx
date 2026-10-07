"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { CONTABILIDAD_ELECTRONICA_PRODUCT } from "./config";

const VIEW_CONTENT_KEY =
  "contabilidadElectronicaInscripcionViewContentSent";

const PRODUCT_EVENT = {
  content_ids: [CONTABILIDAD_ELECTRONICA_PRODUCT.hotmartProductUcode],
  content_name: CONTABILIDAD_ELECTRONICA_PRODUCT.publicName,
  content_type: "product",
  content_category: "Curso",
  value: CONTABILIDAD_ELECTRONICA_PRODUCT.fallbackPrice,
  currency: META_CURRENCY,
  landing_slug: "contabilidad-electronica-inscripcion",
};

export function ContabilidadElectronicaInscripcionAnalytics() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(VIEW_CONTENT_KEY)) return;
      window.sessionStorage.setItem(VIEW_CONTENT_KEY, "true");
    } catch {
      // El tracking no debe bloquear la experiencia si el navegador restringe storage.
    }

    trackMetaEvent("ViewContent", PRODUCT_EVENT);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-contabilidad-electronica-inscripcion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

export function CheckoutLink({
  children,
  className = "",
  location,
}: {
  children: React.ReactNode;
  className?: string;
  location: string;
}) {
  const handleClick = () => {
    trackMetaEvent("InitiateCheckout", {
      ...PRODUCT_EVENT,
      funnel_step: "checkout_click",
      cta_location: location,
      status: "checkout_opened",
    });

    // Purchase se confirma exclusivamente en Hotmart después del pago.
  };

  return (
    <a
      href={CONTABILIDAD_ELECTRONICA_PRODUCT.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
