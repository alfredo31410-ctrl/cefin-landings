'use client';

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

export default function GraciasIA() {
  const whatsappUrl = "https://chat.whatsapp.com/EPpKU8WYH0iKjcnXQsiPyB";

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
    document.title = "Último paso | ABC de Inteligencia Artificial para Contadores | CEFIN";

    trackEvent("CompleteRegistration", {
      content_name: "ABC de Inteligencia Artificial para Contadores",
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
            alt="ABC de Inteligencia Artificial para Contadores"
            className="absolute inset-0 h-full w-full object-cover object-center md:object-[70%_center] lg:object-right opacity-18 sm:opacity-22 lg:opacity-32"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/90 via-[#02040a]/93 to-[#02040a]" />
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="w-full rounded-[2rem] border border-cyan-400/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mx-auto max-w-2xl text-center">
              {/* Marca */}
              <div className="mb-5 flex justify-center">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/15">
                    <span className="text-sm font-black text-cyan-300">C</span>
                  </div>
                  <div className="text-left leading-none">
                    <p className="text-sm font-black tracking-tight text-white">CEFIN</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      Capacitación contable y fiscal
                    </p>
                  </div>
                </div>
              </div>

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 sm:h-20 sm:w-20">
                <svg
                  className="h-8 w-8 text-cyan-400 sm:h-10 sm:w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 sm:px-4">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300">
                  Ya casi terminas
                </span>
              </div>

              <h1 className="text-3xl font-black uppercase italic leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
                Solo te falta
                <span className="mt-1 block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  entrar al grupo de WhatsApp
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                <span className="font-bold text-white">
                  Ya completaste gran parte de tu registro.
                </span>{" "}
                Ahora mismo, el paso más importante para asegurar tu lugar en{" "}
                <span className="font-bold text-cyan-300">
                  ABC de Inteligencia Artificial para Contadores
                </span>{" "}
                es entrar al grupo privado de WhatsApp.
              </p>

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
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 px-6 py-5 text-center text-base font-black uppercase italic text-black shadow-[0_0_40px_rgba(163,230,53,0.45)] transition-all duration-200 hover:scale-[1.02] hover:bg-lime-300 active:scale-[0.98] sm:px-8 sm:py-6 sm:text-lg lg:text-xl"
                >
                  <svg
                    className="h-6 w-6 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.82 11.82 0 0012.07 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.16 1.59 5.97L0 24l6.3-1.65a11.87 11.87 0 005.77 1.47h.01c6.57 0 11.91-5.35 11.92-11.92 0-3.18-1.24-6.17-3.48-8.42zM12.08 21.8h-.01a9.88 9.88 0 01-5.03-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 01-1.51-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.89-9.89 9.89zm5.42-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35z" />
                  </svg>
                  <span>QUIERO ENTRAR AL GRUPO DE WHATSAPP</span>
                </a>
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-lime-300 sm:text-sm">
                Da clic en el botón y completa tu inscripción
              </p>

              <div className="mt-6 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4 sm:p-5">
                <p className="text-sm font-bold leading-relaxed text-white sm:text-base lg:text-lg">
                  Ahí te vamos a compartir el acceso a la clase, recordatorios, avisos importantes y todo lo que necesitas para no perderte nada.
                </p>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-slate-300 sm:text-base">
                <span className="font-bold text-lime-300">Importante:</span>{" "}
                si no entras al grupo, podrías perderte información clave sobre tu inscripción y el acceso a la sesión.
              </p>

              <div className="mt-8 grid gap-3 text-left sm:mt-10 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Paso 1
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Tu registro ya quedó guardado
                  </p>
                </div>

                <div className="rounded-xl border-2 border-lime-400 bg-lime-400/10 p-4 shadow-[0_0_25px_rgba(163,230,53,0.12)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-lime-300">
                    Paso 2
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Entra ahora al grupo de WhatsApp
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Paso 3
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Recibe acceso, avisos y materiales
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4 text-left sm:mt-10 sm:p-5">
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  Nota importante
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  El grupo de WhatsApp es el canal principal donde te compartiremos la información importante de esta clase.{" "}
                  <span className="font-bold text-white">
                    Entra ahora para asegurar que recibas todo correctamente.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}