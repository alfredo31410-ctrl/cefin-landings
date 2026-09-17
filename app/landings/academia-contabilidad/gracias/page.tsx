"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  initializeMetaPixel,
  META_CURRENCY,
} from "@/lib/meta-pixel";
import {
  getAcademiaEventId,
  getAcademiaRegistrationSession,
  persistAcademiaRegistrationSession,
  type AcademiaRegistrationSession,
} from "@/lib/academia-contabilidad-tracking-session";

const WHATSAPP_URL = "https://chat.whatsapp.com/BZV4Gm7YBMjI1UKpS0Ce65";
const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/academia-contabilidad/alfredo.png";

export default function GraciasAcademiaContabilidadPage() {
  const sessionRef = useRef<AcademiaRegistrationSession | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<
    "checking" | "valid" | "invalid"
  >("checking");

  useEffect(() => {
    document.title = "Registro completado | Academia Contabilidad | CEFIN";
    const session = getAcademiaRegistrationSession();
    sessionRef.current = session;
    let isActive = true;
    queueMicrotask(() => {
      if (isActive) setRegistrationStatus(session ? "valid" : "invalid");
    });

    if (!session) {
      return () => {
        isActive = false;
      };
    }

    if (!session.registrationTracked) {
      initializeMetaPixel();
      if (typeof window.fbq === "function") {
        session.registrationTracked = true;
        persistAcademiaRegistrationSession(session);
        window.fbq(
          "track",
          "CompleteRegistration",
          {
            content_name: "Academia Contabilidad | Registro completado",
            content_category: "Clase gratuita",
            landing_slug: "academia-contabilidad",
            event_date: "2026-09-22",
            event_time: "11:00 a. m. CDMX",
            status: "completed",
            value: 0,
            currency: META_CURRENCY,
          },
          { eventID: getAcademiaEventId("registration", session.id) },
        );
      }
    }

    return () => {
      isActive = false;
    };
  }, []);

  const handleWhatsAppClick = () => {
    const session = sessionRef.current;
    if (!session || session.contactTracked) return;

    initializeMetaPixel();
    if (typeof window.fbq !== "function") return;

    session.contactTracked = true;
    persistAcademiaRegistrationSession(session);
    window.fbq(
      "track",
      "Contact",
      {
        content_name: "Academia Contabilidad | Grupo de WhatsApp",
        content_category: "Grupo de WhatsApp",
        landing_slug: "academia-contabilidad",
        source: "thank_you_page",
        destination: "whatsapp_group",
        status: "clicked",
      },
      { eventID: getAcademiaEventId("contact", session.id) },
    );
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

      <main className="relative min-h-[100svh] overflow-x-hidden bg-[#190320] text-white">
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

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-start px-4 py-7 min-[380px]:px-5 sm:items-center sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="ml-auto w-full max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-emerald-300">
              Registro 80% completado
            </div>

            <h1 className="mt-4 text-[clamp(2.6rem,13vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:mt-5">
              Falta entrar
              <br />
              al grupo
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 min-[380px]:text-lg sm:mt-5 sm:text-xl">
              Tu registro para{" "}
              <span className="font-black text-[#ff8cae]">
                Academia de Contabilidad Básica
              </span>{" "}
              ya quedó casi listo.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 min-[380px]:text-base sm:text-lg">
              Para que tu registro quede totalmente completo, entra ahora al
              grupo de WhatsApp. Ahí recibirás acceso, recordatorios y avisos
              importantes de la clase.
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 backdrop-blur sm:mt-8 sm:rounded-[2rem] sm:p-6">
              <div className="mb-6 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 p-4">
                <div className="flex items-center justify-between gap-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#6CFF9A] min-[380px]:text-xs min-[380px]:tracking-[0.18em]">
                  <span>Registro casi listo</span>
                  <span>80%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-[#25D366]" />
                </div>
                <p className="mt-3 text-sm font-bold text-white">
                  El último 20% es entrar al grupo de WhatsApp.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Fecha
                  </p>
                  <p className="mt-1 text-lg font-black text-white min-[380px]:text-xl">
                    Martes 22 de septiembre
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Hora
                  </p>
                  <p className="mt-1 text-lg font-black text-white min-[380px]:text-xl">
                    11:00 a. m. (CDMX)
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {registrationStatus === "valid" ? (
                  <a
                    href={WHATSAPP_URL}
                    onClick={handleWhatsAppClick}
                    className="inline-flex min-h-16 w-full items-center justify-center rounded-[1.2rem] bg-[#25D366] px-4 py-4 text-center text-sm font-black uppercase leading-tight tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.35)] transition hover:scale-[1.01] active:scale-[0.98] min-[380px]:px-6 min-[380px]:text-base sm:w-auto sm:min-w-[360px] sm:py-5 sm:text-lg"
                  >
                    Entrar al grupo de WhatsApp
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex min-h-16 w-full cursor-not-allowed items-center justify-center rounded-[1.2rem] bg-slate-500 px-4 py-4 text-center text-sm font-black uppercase leading-tight tracking-tight text-white/75 opacity-70 min-[380px]:px-6 min-[380px]:text-base sm:w-auto sm:min-w-[360px] sm:py-5 sm:text-lg"
                  >
                    {registrationStatus === "checking"
                      ? "Comprobando registro…"
                      : "Registro no comprobado"}
                  </button>
                )}

                <p className="mt-3 text-sm font-semibold text-white/55">
                  {registrationStatus === "invalid"
                    ? "Vuelve a la landing y completa el formulario para acceder al grupo."
                    : "Sin este paso podrías perder el acceso y los recordatorios."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
