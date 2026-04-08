'use client';

import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Script from "next/script";
import { useEffect } from "react";

// Cambiamos el título y descripción aquí para que aparezcan en la pestaña
export const metadata: Metadata = {
  title: "Gracias | Auxiliar Contable - Entrenamiento En Vivo | CEFIN",
  description: "Entrenamiento gratuito para auxiliares contables con el Mtro. Alfredo Cobos.",
};

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

export default function GraciasAuxiliar() {
  const whatsappUrl = "https://chat.whatsapp.com/DECQCjwB9sAEiH3bHCZXQT";

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
    document.title = "Último paso | Auxiliar Contable | CEFIN";

    trackEvent("CompleteRegistration", {
      content_name: "Auxiliar Contable - Entrenamiento En Vivo",
      status: "registered",
    });
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-auxiliar-thank-you"
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

            fbq('init', '1485908226564541');
            fbq('track', 'PageView');
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1485908226564541&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <main className="relative min-h-screen overflow-y-auto overflow-x-hidden bg-[#0f172a] text-white">
        {/* Fondo */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-[5%] left-[-10%] h-[300px] w-[300px] rounded-full blur-[100px] opacity-40 sm:h-[500px] sm:w-[500px]"
            style={{ background: 'radial-gradient(circle, #e6007e 0%, transparent 70%)' }}
          />
          <div className="absolute inset-0 z-10 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
            <img
              src="https://cefin-landings-z9uk.vercel.app/alfredo.png"
              alt="Mtro. Alfredo Cobos"
              className="absolute inset-0 h-full w-full object-contain object-left-bottom scale-110 -translate-x-[15%] opacity-20 sm:-translate-x-[5%] sm:opacity-30"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/20 to-[#0f172a]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="w-full rounded-[2rem] border border-fuchsia-500/15 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 sm:h-20 sm:w-20">
                <svg
                  className="h-8 w-8 text-fuchsia-400 sm:h-10 sm:w-10"
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

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 sm:px-4">
                <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-fuchsia-300 sm:text-[11px]">
                  Ya casi terminas
                </span>
              </div>

              <h1 className="text-3xl font-black uppercase italic leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
                Solo te falta
                <span className="mt-1 block text-yellow-400">
                  entrar al grupo de WhatsApp
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                <span className="font-bold text-white">
                  Ya completaste gran parte de tu registro.
                </span>{" "}
                Ahora mismo, el paso más importante para asegurar tu lugar es entrar al grupo privado de WhatsApp.
              </p>

                            <div className="mt-8 sm:mt-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("ViewContent", {
                      content_name: "WhatsApp Grupo Auxiliar Contable",
                    })
                  }
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase italic text-white shadow-[0_0_40px_rgba(37,211,102,0.40)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#1fbe5c] active:scale-[0.98] sm:px-8 sm:py-6 sm:text-lg lg:text-xl"
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

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300 sm:text-sm">
                Da clic en el botón y completa tu inscripción
              </p>

              <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 sm:p-5">
                <p className="text-sm font-bold leading-relaxed text-white sm:text-base lg:text-lg">
                  Ahí te compartiremos el acceso a la clase, recordatorios, avisos importantes y todo lo necesario para que no te pierdas nada.
                </p>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-slate-300 sm:text-base">
                <span className="font-bold text-yellow-300">Importante:</span>{" "}
                si no entras al grupo, podrías perderte información clave sobre tu inscripción y el acceso al entrenamiento.
              </p>



              <div className="mt-8 grid gap-3 text-left sm:mt-10 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-fuchsia-300">
                    Paso 1
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Tu registro ya quedó guardado
                  </p>
                </div>

                <div className="rounded-xl border-2 border-[#25D366] bg-[#25D366]/10 p-4 shadow-[0_0_25px_rgba(37,211,102,0.12)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#6CFF9A]">
                    Paso 2
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Entra ahora al grupo de WhatsApp
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-fuchsia-300">
                    Paso 3
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Recibe acceso, avisos y materiales
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-fuchsia-400/15 bg-fuchsia-500/5 p-4 text-left sm:mt-10 sm:p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-fuchsia-300 sm:text-[11px]">
                  Nota importante
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  El grupo de WhatsApp será el canal principal donde te compartiremos toda la información importante de este entrenamiento.{" "}
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