"use client";

import { useEffect } from "react";

const WHATSAPP_REDIRECT_DELAY_MS = 900;

export function WhatsAppRedirect({ groupUrl }: { groupUrl: string }) {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      window.location.assign(groupUrl);
    }, WHATSAPP_REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [groupUrl]);

  return null;
}
