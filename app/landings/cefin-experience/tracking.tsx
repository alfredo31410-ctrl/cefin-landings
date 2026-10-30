"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const PRODUCT_NAME = "CEFIN Experience 2027";
const PRODUCT_CATEGORY = "Evento presencial";
const PRESALE_PRICE = 4987;

const EVENT_DATA = {
  content_name: PRODUCT_NAME,
  content_category: PRODUCT_CATEGORY,
  content_type: "product",
  value: PRESALE_PRICE,
  currency: META_CURRENCY,
};

export function CefinExperienceTracking() {
  useEffect(() => {
    trackMetaEvent("ViewContent", EVENT_DATA);

    const trackCheckoutClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.hostname !== "pay.hotmart.com") return;

        trackMetaEvent("InitiateCheckout", {
          ...EVENT_DATA,
          num_items: 1,
        });
      } catch {
        // Tracking must never prevent the checkout from opening.
      }
    };

    document.addEventListener("click", trackCheckoutClick, true);
    return () => document.removeEventListener("click", trackCheckoutClick, true);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-cefin-experience"
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
