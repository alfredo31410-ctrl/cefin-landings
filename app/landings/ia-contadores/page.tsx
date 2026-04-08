"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

export default function LandingIA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    document.title = "ABC de Inteligencia Artificial para Contadores | CEFIN";
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      trackEvent("InitiateCheckout", {
        content_name: "ABC de Inteligencia Artificial para Contadores",
      });

      const oldScript = document.getElementById("ac-script-loader");
      if (oldScript) oldScript.remove();

      const script = document.createElement("script");
      script.id = "ac-script-loader";
      script.src =
        "https://cefincapacitacion.activehosted.com/f/embed.php?id=177";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isModalOpen]);

  return (
    <>
      <Script
        id="meta-pixel-ia"
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

      <main className="relative min-h-screen overflow-y-auto overflow-x-hidden bg-[#02040a] text-white font-sans">
        {/* BACKGROUND OPTIMIZADO */}
<div className="fixed inset-0 z-0 overflow-hidden">

  {/* DESKTOP (horizontal) */}
  <img
    src="https://cefin-landings-z9uk.vercel.app/Inteligencia_Artificial.png"
    alt="ABC de Inteligencia Artificial para Contadores"
    className="hidden lg:block absolute inset-0 h-full w-full object-cover object-right opacity-80"
  />

  {/* MOBILE (vertical) */}
  <img
    src="/inteligencia_Artificial_Vertical.png" // 👈 tu nueva imagen vertical
    alt="ABC de Inteligencia Artificial para Contadores"
    className="block lg:hidden absolute inset-0 h-full w-full object-cover object-[50%_50%] opacity-60"
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/40 via-[#02040a]/70 to-[#02040a] lg:bg-gradient-to-r lg:from-[#02040a] lg:via-[#02040a]/85 lg:to-[#02040a]/25" />

  {/* GLOWS */}
  <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
  <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />

</div>

        {/* MARCA CEFIN */}
        <header className="relative z-20 flex justify-center px-4 pt-5 sm:justify-start sm:px-8 lg:px-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/15">
              <span className="text-sm font-black text-cyan-300">C</span>
            </div>
            <div className="text-left leading-none">
              <p className="text-sm font-black tracking-tight text-white">
                CEFIN
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Centro de Estudios Fiscales, Innovación y Negocios
              </p>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <section className="relative z-10 mx-auto flex min-h-[90vh] lg:min-h-screen w-full max-w-7xl items-start lg:items-center px-4 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-6 lg:px-12">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,620px)_1fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300 sm:text-[11px]">
                  Clase gratuita en vivo
                </p>
              </div>

              <h1 className="mt-4 text-3xl font-black uppercase italic leading-[0.92] tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.12)]">
                  ABC DE
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  INTELIGENCIA
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ARTIFICIAL
                </span>
                <span className="mt-1 block text-white">PARA CONTADORES</span>
              </h1>

              <div className="mt-4 max-w-xl rounded-2xl border-l-4 border-cyan-500 bg-white/5 p-4 backdrop-blur-md sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                  Aprende a usar herramientas de inteligencia artificial para{" "}
                  <span className="font-bold text-white">
                    trabajar más rápido, con más precisión
                  </span>{" "}
                  y aumentar tu valor profesional como contador.
                </p>
              </div>

              <div className="mt-5 grid max-w-xl grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Próxima sesión
                  </p>
                  <p className="mt-2 text-base font-black italic text-white sm:text-lg">
                    21 DE ABRIL
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-black/25 p-4 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Horario online
                  </p>
                  <p className="mt-2 text-base font-black italic text-white sm:text-lg">
                    11:00 AM
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    trackEvent("Lead", {
                      content_name:
                        "ABC de Inteligencia Artificial para Contadores",
                    });
                  }}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 px-6 py-4 text-center text-sm font-black uppercase italic text-black shadow-[0_0_35px_rgba(163,230,53,0.30)] transition-all duration-200 hover:scale-[1.01] hover:bg-lime-300 active:scale-[0.98] sm:w-auto sm:px-8 sm:text-base lg:text-lg"
                >
                  <span>QUIERO MI ACCESO GRATUITO</span>
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
                </button>
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300 sm:text-sm">
                Regístrate gratis y asegura tu lugar
              </p>
            </div>

            {/* Panel visual vacío para dejar respirar la imagen en desktop */}
            <div className="hidden lg:block" />
          </div>
        </section>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            <div className="relative flex h-full max-h-[95vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white text-black shadow-2xl sm:h-auto">
              <div className="flex shrink-0 items-center justify-between bg-[#0a0c14] px-6 py-3 text-white">
                <h2 className="text-base font-black uppercase italic tracking-wider text-cyan-400">
                  Inscripción ABC IA
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-xl text-white transition-transform hover:rotate-90"
                >
                  ✕
                </button>
              </div>

              <div className="custom-scrollbar flex-1 overflow-y-auto p-4 sm:p-8">
                <div className="_form_177 min-h-[500px] w-full"></div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #0a0c14;
            border-radius: 10px;
          }
          ._form_177 {
            width: 100% !important;
          }
          ._form_177 form {
            margin: 0 !important;
            width: 100% !important;
          }
        `}</style>
      </main>
    </>
  );
}
