"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getMetaPixelScript, trackMetaEvent } from "@/lib/meta-pixel";
import { landingConfig as config } from "./config";

export function CampaignTracking() {
  useEffect(() => {
    if (!config.activation.trackingEnabled) return;

    trackMetaEvent("ViewContent", {
      content_name: config.conversionEvent.contentName,
      content_category: config.conversionEvent.contentCategory,
      landing_slug: config.conversionEvent.landingSlug,
      event_date: config.date.startsAt,
    });
  }, []);

  if (!config.activation.trackingEnabled) return null;

  return (
    <Script
      id="meta-pixel-estratega-fiscal"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
    />
  );
}
