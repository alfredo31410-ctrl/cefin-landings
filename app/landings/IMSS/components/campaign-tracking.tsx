"use client";

import { useEffect, useRef } from "react";
import { initializeMetaPixel, trackMetaEvent } from "@/lib/meta-pixel";
import { imssCampaign } from "../config";
import { readImssAttribution } from "../registration-adapter";

export function CampaignTracking() {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    initializeMetaPixel(undefined, { trackPageView: false });

    const attribution = readImssAttribution();

    trackMetaEvent("PageView");
    trackMetaEvent(imssCampaign.tracking.viewEvent, {
      content_name: imssCampaign.tracking.contentName,
      content_category: imssCampaign.tracking.contentCategory,
      status: "available",
      value: 0,
      currency: "MXN",
      ...attribution,
    });
  }, []);

  return null;
}
