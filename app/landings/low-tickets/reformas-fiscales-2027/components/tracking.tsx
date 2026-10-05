"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { productConfig, productTracking } from "../config";

export function MetaTracking() {
  const viewContentSent = useRef(false);

  useEffect(() => {
    if (viewContentSent.current) return;
    viewContentSent.current = true;

    const payload: Record<string, string | number> = {
      content_name: productTracking.contentName,
      content_category: productTracking.contentCategory,
    };

    if (productConfig.trackingValue !== null) {
      payload.value = productConfig.trackingValue;
      payload.currency = "MXN";
    }

    trackMetaEvent("ViewContent", payload);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-reformas-fiscales-2027"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />
      <noscript>
        {/* Meta exige una etiqueta img directa para el fallback sin JavaScript. */}
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
