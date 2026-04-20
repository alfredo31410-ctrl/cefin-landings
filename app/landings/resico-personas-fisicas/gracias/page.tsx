"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const PIXEL_ID = "1485908226564541";

export default function GraciasResicoPage() {
  const whatsappUrl = "https://chat.whatsapp.com/TU_LINK_AQUI";

  const trackEvent = (
    event: string,
    data?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (data && options) {
      window.fbq("track", event, data, options);
      return;
    }

    if (data) {
      window.fbq("track", event, data);
      return;
    }

    window.fbq("track", event);
  };

  const trackCustomEvent = (
    event: string,
    data?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (data && options) {
      window.fbq("trackCustom", event, data, options);
      return;
    }

    if (data) {
      window.fbq("trackCustom", event, data);
      return;
    }

    window.fbq("trackCustom", event);
  };

  const generateEventId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  useEffect(() => {
    document.title = "Último paso | RESICO Personas Físicas | CEFIN";

    // 🔥 Evento final de conversión
    trackEvent(
      "CompleteRegistration",
      {
        content_name: "RESICO Personas Físicas | Registro completo",
        content_category: "Clase gratuita",
        status: "confirmed",
      },
      {
        eventID: generateEventId("resico-complete-registration"),
      }
    );
  }, []);

  return (
    <>
      {/* Pixel */}
      <Script
        id="meta-pixel-thankyou"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Noscript */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* UI */}
      <main className="min-h-screen flex items-center justify-center bg-[#09090f] text-white px-6">
        <div className="max-w-xl text-center space-y-6">

          <h1 className="text-3xl font-black">
            Ya tienes tu lugar asegurado
          </h1>

          <p className="text-white/70">
            Estás dentro de la clase gratuita de RESICO Personas Físicas.
            El siguiente paso es entrar al grupo donde recibirás acceso y recordatorios.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("Contact", {
                content_name: "Grupo WhatsApp RESICO",
                content_category: "WhatsApp",
              });

              trackCustomEvent("WhatsAppGroupClick", {
                content_name: "Grupo WhatsApp RESICO",
              });
            }}
            className="inline-block bg-green-500 px-6 py-4 rounded-xl font-bold text-black"
          >
            Entrar al grupo de WhatsApp
          </a>

          <p className="text-sm text-white/50">
            Importante: si no entras al grupo, puedes perder acceso a la sesión en vivo.
          </p>

        </div>
      </main>
    </>
  );
}