"use client";

import Script from "next/script";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_PIXEL_ID,
} from "@/lib/meta-pixel";

type MetaPixelProps = {
  pageKey: string;
};

// Centraliza el cargador y el fallback para que todas las rutas usen la misma inicialización.
export function MetaPixel({ pageKey }: MetaPixelProps) {
  return (
    <>
      <Script
        id={`meta-pixel-${pageKey}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />
      <noscript>
        {/* El píxel sin JavaScript solo puede registrar PageView; no intenta simular conversiones. */}
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl(META_PIXEL_ID)}
        />
      </noscript>
    </>
  );
}
