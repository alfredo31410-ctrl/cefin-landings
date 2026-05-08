"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WHATSAPP_URL = "https://chat.whatsapp.com/JeFF9VaNQoh1snLDN8ksx4";
const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/academia-contabilidad/alfredo-academia.png";

export default function GraciasAcademiaContabilidadPage() {
  useEffect(() => {
    document.title = "Registro completado | Academia Contabilidad | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "Academia Contabilidad | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Script
        id="meta-pixel-academia-contabilidad-thankyou"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl()}
          alt=""
        />
      </noscript>

      <main className="relative h-screen overflow-x-hidden overflow-y-auto bg-[#190320] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,99,132,0.24),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(168,85,247,0.24),transparent_24%),linear-gradient(to_bottom,#2a0931,#22072e,#190320)]" />
          <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.65)_1.2px,transparent_1.2px)] [background-size:36px_36px]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#190320] via-[#190320]/88 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[44%] lg:block">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-0 left-[4%] h-[88%] w-auto max-w-none object-contain opacity-90"
          />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#190320] via-[#190320]/88 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-0 left-[-8%] h-[48%] w-auto max-w-none object-contain opacity-55 sm:h-[56%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(33,8,40,0.22)_0%,rgba(25,3,32,0.72)_50%,rgba(25,3,32,0.96)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#190320] via-[#190320]/92 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
          <div className="ml-auto w-full max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-emerald-300">
              Registro completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl xl:text-[5.5rem]">
              Ya casi
              <br />
              estás dentro
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Tu registro para{" "}
              <span className="font-black text-[#ff8cae]">
                Academia de Contabilidad Básica
              </span>{" "}
              ya quedó.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Entra al grupo de WhatsApp para recibir acceso, recordatorios y
              avisos importantes de la clase.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Día
                  </p>
                  <p className="mt-1 text-xl font-black text-white">Jueves</p>
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
                  className="inline-flex w-full items-center justify-center rounded-[1.2rem] bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.35)] transition hover:scale-[1.01] active:scale-[0.98] sm:w-auto sm:min-w-[360px] sm:text-lg"
                >
                  Entrar al grupo de WhatsApp
                </button>

                <p className="mt-3 text-sm font-semibold text-white/55">
                  Este es el paso más importante para no perder tu acceso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
