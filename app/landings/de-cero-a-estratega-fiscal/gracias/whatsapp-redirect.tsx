"use client";

import { useEffect } from "react";
import { getValidWhatsAppGroupUrl } from "../whatsapp";

const WHATSAPP_REDIRECT_DELAY_MS = 900;

export function WhatsAppRedirect({ groupUrl }: { groupUrl: string }) {
  useEffect(() => {
    const safeGroupUrl = getValidWhatsAppGroupUrl(groupUrl);
    if (!safeGroupUrl) return;

    const timeoutId = window.setTimeout(() => {
      window.location.assign(safeGroupUrl);
    }, WHATSAPP_REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [groupUrl]);

  return null;
}
