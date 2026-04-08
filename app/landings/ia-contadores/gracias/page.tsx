'use client';

import Script from "next/script";
import Link from "next/link";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

export default function GraciasIA() {
  const whatsappUrl = "https://chat.whatsapp.com/ByraKaYM3IEI6AjqmIv6E4";

  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window !== "undefined" && window.fbq) {
      if (data) {
        window.fbq("track", event, data);
      } else {
        window.fbq("track", event);
      }
    }
  };

  useEffect(() => {
    document.title = "Registro Exitoso | Master IA para Contadores | CEFIN";

    trackEvent("CompleteRegistration", {
      content_name: "Master IA para Contadores",
      status: "registered",
    });
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-ia-thank-you"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '733425513099672');
            fbq('track', 'PageView');
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=733425513099672&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <main className="relative min-h-screen overflow-y-auto overflow-x-hidden bg-[#02040a] text-white">
        {/* Fondo */}
        <div className="fixed inset-0 z-0">
          <img
            src="https://cefin-landings-z9uk.vercel.app/Inteligencia_Artificial.png"
            alt="IA Background"
            className="absolute inset-0 h-full w-full object-cover object-center lg:object-right opacity-20 lg:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#02040a]/95 to-[#02040a]" />
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 sm:h-20 sm:w-20">
                <svg
                  className="h-8 w-8 text-cyan-400 sm:h-10 sm:w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 sm:px-4">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  Registro exitoso
                </span>
              </div>

              <h1 className="text-3xl font-black uppercase italic leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
                Ya estás dentro de la
                <span className="mt-1 block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Master IA para Contadores
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                Tu lugar quedó apartado correctamente. Ahora entra al grupo privado
                de WhatsApp para recibir avisos, acceso, recordatorios y materiales
                importantes de la sesión.
              </p>

              <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-left sm:mt-8 sm:gap-4 sm:p-5 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Paso 1
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Registro confirmado
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Paso 2
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Únete al grupo de WhatsApp
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Paso 3
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Revisa avisos y materiales
                  </p>
                </div>
              </div>

              <div className="mt-8 sm:mt-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("ViewContent", {
                      content_name: "WhatsApp Grupo IA",
                    })
                  }
                  className="group inline-flex w-full max-w-full items-center justify-center gap-3 bg-lime-400 px-5 py-4 text-sm font-black uppercase italic text-black shadow-[0_0_30px_rgba(163,230,53,0.30)] transition-all duration-200 hover:bg-lime-300 active:scale-95 sm:w-auto sm:px-8 sm:text-base"
                  style={{ transform: "skewX(-12deg)" }}
                >
                  <span
                    className="text-center leading-tight"
                    style={{ transform: "skewX(12deg)" }}
                  >
                    Entrar al grupo de WhatsApp
                  </span>
                  <svg
                    className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
                    style={{ transform: "skewX(12deg)" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M13 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              <p className="mt-5 text-xs sm:text-sm text-slate-400">
                Si el botón no abre, entra aquí:
              </p>

              <p className="mt-2 break-all text-xs sm:text-sm text-cyan-300">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="underline underline-offset-4"
                >
                  {whatsappUrl}
                </Link>
              </p>

              <div className="mt-8 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4 text-left sm:mt-10 sm:p-5">
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  Importante
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  El grupo es el medio donde te compartiremos avisos relevantes,
                  acceso, recordatorios y todo lo necesario para que aproveches al
                  máximo esta masterclass.
                </p>
              </div>

              <div className="mt-8 flex justify-center sm:mt-10">
                <Link
                  href="/landings/ia-contadores"
                  className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Volver a la landing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}