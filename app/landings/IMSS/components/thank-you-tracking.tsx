"use client";

import { useEffect, useRef } from "react";
import { initializeMetaPixel, trackMetaEvent } from "@/lib/meta-pixel";
import {
  consumeImssRegistrationConfirmation,
  trackConfirmedImssLead,
} from "../registration-adapter";

export function ThankYouTracking() {
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    initializeMetaPixel(undefined, { trackPageView: false });
    trackMetaEvent("PageView");

    const confirmationId = consumeImssRegistrationConfirmation();
    if (!confirmationId) return;

    trackConfirmedImssLead(confirmationId);
  }, []);

  return null;
}
