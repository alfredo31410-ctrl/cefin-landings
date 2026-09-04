"use client";
/* eslint-disable @next/next/no-img-element */

import Script from "next/script";
import { useEffect, useRef, type ReactNode } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { directSaleConfig as config } from "./config";

const PRODUCT_ID = "L107321129X";
const PRODUCT_EVENT = {
  content_name: config.product.name,
  content_category: "Programa de estrategia fiscal",
  content_ids: [PRODUCT_ID],
  contents: [
    {
      id: PRODUCT_ID,
      quantity: 1,
      item_price: config.pricing.salePrice,
    },
  ],
  content_type: "product",
  value: config.pricing.salePrice,
  currency: META_CURRENCY,
};

export function EstrategaFiscalTracking() {
  const viewContentTrackedRef = useRef(false);

  useEffect(() => {
    if (viewContentTrackedRef.current) return;
    viewContentTrackedRef.current = true;

    trackMetaEvent("PageView");
    trackMetaEvent("ViewContent", PRODUCT_EVENT);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-estratega-fiscal-inscripcion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(undefined, { trackPageView: false }),
        }}
      />
      <noscript>
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl()}
        />
      </noscript>
    </>
  );
}

export function TrackedCheckoutLink({
  children,
  className = "",
  location,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  location: string;
  ariaLabel?: string;
}) {
  return (
    <a
      className={className}
      href={config.checkout.url}
      aria-label={ariaLabel}
      onClick={() =>
        trackMetaEvent("InitiateCheckout", {
          ...PRODUCT_EVENT,
          num_items: 1,
          cta_location: location,
        })
      }
    >
      {children}
    </a>
  );
}
