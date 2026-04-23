"use client";

import Script from "next/script";
import { useEffect } from "react";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const WHATSAPP_URL = "https://chat.whatsapp.com/HJbdr2Xwnkn8YumgEMPUvU"; // <-- cambia esto
const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/alfredo.png";

export default function GraciasEstadosFinancierosPage() {
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (data) {
      window.fbq("track", event, data);
      return;
    }

    window.fbq("track", event);
  };

  useEffect(() => {
    document.title = "Registro completado | Estados Financieros con NIF | CEFIN";

    trackEvent("CompleteRegistration", {
      content_name: "2 dias de Estados Financieros con NIF | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
    });
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-estados-financieros-thankyou"
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

            if (!window.__cefinMetaPixelInitialized) {
              fbq('init', '${META_PIXEL_ID}');
              window.__cefinMetaPixelInitialized = true;
            }
            fbq('track', 'PageView');
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <main className="relative h-screen overflow-x-hidden overflow-y-auto bg-[#08080b] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_80%,rgba(55,86,235,0.34),transparent_24%),radial-gradient(circle_at_92%_12%,rgba(124,66,255,0.4),transparent_24%),linear-gradient(135deg,#07070a_0%,#16161b_48%,#08080b_100%)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:30px_30px]" />
          <div className="absolute right-[-8%] top-0 h-[45%] w-[34%] rotate-12 bg-violet-500/75 blur-[1px]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#08080b] via-[#08080b]/78 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[48%] lg:block">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-0 right-[6%] h-[86%] w-auto max-w-none object-contain opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080b] via-[#08080b]/58 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
          <div className="w-full max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-emerald-300">
              Registro completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl xl:text-[5.5rem]">
              Ya casi
              <br />
              estas dentro
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Tu registro para{" "}
              <span className="font-black text-violet-300">
                Estados Financieros con NIF
              </span>{" "}
              ya quedo.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Entra al grupo de WhatsApp para recibir acceso, recordatorios y
              avisos importantes de la sesion.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Dia 1
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    12 de mayo
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Dia 2
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    Sorpresa
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Hora
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    11:00 AM (CDMX)
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
                }
                className="mt-6 inline-flex w-full items-center justify-center rounded-[1.2rem] bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.35)] transition hover:scale-[1.01] active:scale-[0.98] sm:w-auto sm:min-w-[360px] sm:text-lg"
              >
                Entrar al grupo de WhatsApp
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
