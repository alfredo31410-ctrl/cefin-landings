"use client";

/* eslint-disable @next/next/no-img-element */

import Script from "next/script";
import { useEffect, useRef, type ReactNode } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { salesPage } from "./config";

const PRODUCT_EVENT = {
  content_ids: [salesPage.productId],
  contents: [{ id: salesPage.productId, quantity: 1 }],
  content_name: salesPage.productName,
  content_category: "Programa de actualización fiscal",
  content_type: "product",
  value: salesPage.price,
  currency: "MXN",
};

export function SalesPageTracking() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackMetaEvent("PageView");
    trackMetaEvent("ViewContent", PRODUCT_EVENT);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-personas-morales-2027-inscripcion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(undefined, { trackPageView: false }),
        }}
      />
      <noscript>
        <img
          src={getMetaPixelNoscriptUrl()}
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
        />
      </noscript>
    </>
  );
}

export function CheckoutLink({
  children,
  className,
  location,
}: {
  children: ReactNode;
  className?: string;
  location: string;
}) {
  return (
    <a
      href={salesPage.checkoutUrl}
      className={className}
      suppressHydrationWarning
      onClick={() =>
        trackMetaCustomEvent("CheckoutClick", {
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
