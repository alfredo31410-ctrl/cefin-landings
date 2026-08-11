"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaCustomEventImmediate,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const PRICE = 4787;
const CHECKOUT_URL = "https://pay.hotmart.com/X106026238J?checkoutMode=10";
const VIEW_CONTENT_KEY = "restaurantesInscripcionViewContentSent";
const PRODUCT_EVENT = {
  content_name: "Asesor Fiscal de Restaurantes",
  content_type: "product",
  value: PRICE,
  currency: META_CURRENCY,
};

export function RestaurantesInscripcionAnalytics() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(VIEW_CONTENT_KEY)) return;
      window.sessionStorage.setItem(VIEW_CONTENT_KEY, "true");
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }

    trackMetaEvent("ViewContent", PRODUCT_EVENT);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-restaurantes-inscripcion"
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

export function CheckoutLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        trackMetaCustomEventImmediate("CheckoutButtonClick", PRODUCT_EVENT)
      }
      className={className}
    >
      {children}
    </a>
  );
}
