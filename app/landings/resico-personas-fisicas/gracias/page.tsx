"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const WHATSAPP_URL = "https://chat.whatsapp.com/BvSFF4vN9EC95soZ06MbqF"; // <-- cámbialo

const META_PIXEL_ID = "1485908226564541";

export default function GraciasResicoPage() {
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

  useEffect(() => {
    document.title = "Registro completado | RESICO Personas Físicas | CEFIN";

    trackEvent(
      "Lead",
      {
        content_name: "RESICO Personas Físicas | Registro completado",
        content_category: "Clase gratuita",
        status: "completed",
      },
      { eventID: "resico-lead-thankyou" }
    );

    trackEvent(
      "CompleteRegistration",
      {
        content_name: "RESICO Personas Físicas | Registro completado",
        content_category: "Clase gratuita",
        status: "completed",
      },
      { eventID: "resico-complete-registration" }
    );
  }, []);

  const handleWhatsAppClick = () => {
    trackEvent("Contact", {
      content_name: "RESICO Personas Físicas | Click WhatsApp",
      destination: "WhatsApp Group",
    });

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "WhatsAppGroupClick", {
        content_name: "RESICO Personas Fisicas | Click WhatsApp",
        destination: "WhatsApp Group",
      });
    }

    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Script
        id="meta-pixel-resico-thankyou"
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

            fbq('init', '${META_PIXEL_ID}');
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

      <main className="relative h-screen overflow-x-hidden overflow-y-auto bg-[#08080d] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(217,70,239,0.24),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.18),transparent_20%),linear-gradient(to_bottom,#07070b,#11101a,#08080d)]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[320px] w-[320px] rounded-full bg-fuchsia-500/20 blur-[120px]" />
          <div className="absolute right-[-8%] top-[15%] h-[260px] w-[260px] rounded-full bg-violet-500/20 blur-[110px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          <img
            src="/resico/marisol-resico.png"
            alt="Marisol Galván"
            className="absolute bottom-0 right-[6%] h-[92%] w-auto max-w-none object-contain opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080d] via-[#08080d]/62 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08080d] via-[#08080d]/90 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
          <img
            src="/resico/marisol-resico.png"
            alt="Marisol Galván"
            className="absolute inset-0 h-full w-full object-cover object-[center_top] opacity-75"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,6,12,0.56)_0%,rgba(8,8,16,0.62)_22%,rgba(10,10,18,0.58)_48%,rgba(9,9,15,0.84)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#08080d] via-[#08080d]/95 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
          <div className="w-full max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-emerald-300">
              Registro completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl xl:text-[5.5rem]">
              Ya casi
              <br />
              estás dentro
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Tu registro para la clase gratuita de{" "}
              <span className="font-black text-white">
                RESICO Personas Físicas
              </span>{" "}
              ya quedó.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Ahora entra al grupo de WhatsApp porque por ahí se comparte el
              acceso, recordatorios y avisos importantes de la sesión.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Fecha
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    28 de abril
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

              <div className="mt-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="group inline-flex w-full items-center justify-center rounded-[1.2rem] bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.35)] transition hover:scale-[1.01] hover:shadow-[0_28px_70px_rgba(37,211,102,0.45)] active:scale-[0.98] sm:w-auto sm:min-w-[360px] sm:text-lg"
                >
                  Entrar al grupo de WhatsApp
                </button>

                <p className="mt-3 text-sm font-semibold text-white/55">
                  Este es el paso más importante para no perder tu acceso.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "Te llegarán recordatorios",
                "Recibirás el acceso a la sesión",
                "Evitas perder avisos importantes",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-white/75"
                >
                  <span className="mr-2 text-fuchsia-400">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
