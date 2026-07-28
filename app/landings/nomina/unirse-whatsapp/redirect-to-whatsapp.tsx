"use client";

import { useEffect, useRef } from "react";

type RedirectToWhatsAppProps = {
  whatsappGroupUrl: string;
};

function isValidWhatsAppGroupUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "chat.whatsapp.com" && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function RedirectToWhatsApp({ whatsappGroupUrl }: RedirectToWhatsAppProps) {
  const redirectedRef = useRef(false);
  const isValidUrl = isValidWhatsAppGroupUrl(whatsappGroupUrl);

  useEffect(() => {
    if (!isValidUrl) return;

    const timeout = window.setTimeout(() => {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      window.location.assign(whatsappGroupUrl);
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [isValidUrl, whatsappGroupUrl]);

  return (
    <>
      {isValidUrl ? (
        <a className="whatsapp-redirect-button" href={whatsappGroupUrl} rel="noopener noreferrer">
          ABRIR EL GRUPO MANUALMENTE
        </a>
      ) : (
        <p className="whatsapp-redirect-error" role="alert">
          El enlace del grupo no está disponible. Vuelve a intentarlo más tarde.
        </p>
      )}
    </>
  );
}
