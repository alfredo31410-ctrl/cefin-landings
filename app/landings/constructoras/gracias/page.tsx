"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaCustomEventImmediate,
} from "@/lib/meta-pixel";
import {
  consumeConstructorasRegistrationAttempt,
  getConstructorasEventKey,
  waitForConstructorasMetaPixel,
} from "@/lib/constructoras-tracking-session";

const WHATSAPP_URL = "https://chat.whatsapp.com/CCu74HftqiuGPQMZYPfmc7";
const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/constructoras/alfredo-constructoras.png"; // <-- cámbialo
const BACKGROUND_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/constructoras/alfredo-constructoras.png"; // <-- cámbialo

export default function GraciasConstructorasPage() {
  useEffect(() => {
    document.title = "Registro completado | Constructoras | CEFIN";
    const attempt = consumeConstructorasRegistrationAttempt();
    if (!attempt) return;

    const eventKey = getConstructorasEventKey(
      "complete_registration_sent",
      attempt.id,
    );
    try {
      if (window.sessionStorage.getItem(eventKey)) return;
    } catch {
      // The event ID still gives Meta a stable deduplication key.
    }

    return waitForConstructorasMetaPixel(
      () => {
        window.fbq?.(
          "track",
          "CompleteRegistration",
          {
            content_name: "Asesor Fiscal para Constructoras",
            content_category: "Clase gratuita",
            landing_slug: "constructoras",
            event_date: "2026-09-15",
            event_time: "11:00 AM CDMX",
            status: "registered",
            value: 0,
            currency: META_CURRENCY,
          },
          { eventID: attempt.id },
        );
        try {
          window.sessionStorage.setItem(eventKey, "true");
        } catch {
          // The event was already queued with a stable event ID.
        }
      },
      () => undefined,
    );
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaCustomEventImmediate("WhatsAppClick", {
      content_name: "Asesor Fiscal para Constructoras",
      content_category: "Grupo de WhatsApp",
      landing_slug: "constructoras",
      source: "thank_you_page",
      destination: "whatsapp_group",
      status: "clicked",
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-constructoras-thankyou"
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

      <main className="relative h-screen overflow-x-hidden overflow-y-auto bg-[#0b0d0c] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#111211,#161816,#0b0d0c)]" />
          <div
            className="absolute inset-0 opacity-18"
            style={{
              backgroundImage: `url("${BACKGROUND_IMAGE_URL}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(1)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,12,0.92)_0%,rgba(11,13,12,0.78)_42%,rgba(11,13,12,0.55)_70%,rgba(11,13,12,0.88)_100%)]" />
          <div className="absolute left-0 top-0 h-[180px] w-[260px] opacity-55 [background-image:radial-gradient(#bfff5c_1.2px,transparent_1.2px)] [background-size:10px_10px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[320px] w-[320px] rounded-full bg-lime-400/10 blur-[120px]" />
          <div className="absolute right-[-8%] top-[15%] h-[260px] w-[260px] rounded-full bg-emerald-500/15 blur-[110px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          <img
            src={HERO_IMAGE_URL}
            alt="Ponente de constructoras"
            className="absolute bottom-0 right-[5%] h-[92%] w-auto max-w-none object-contain opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d0c] via-[#0b0d0c]/62 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0d0c] via-[#0b0d0c]/90 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
          <img
            src={HERO_IMAGE_URL}
            alt="Ponente de constructoras"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,10,9,0.45)_0%,rgba(10,12,11,0.6)_40%,rgba(11,13,12,0.8)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
          <div className="w-full max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-emerald-300">
              Registro 80% completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl xl:text-[5.5rem]">
              Falta entrar
              <br />
              al grupo
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Tu registro para la clase gratuita de{" "}
              <span className="font-black text-lime-300">
                Asesor Fiscal para Constructoras
              </span>{" "}
              ya quedó casi listo.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Para que tu registro quede totalmente completo, entra ahora al
              grupo de WhatsApp. Ahí se comparte el acceso, recordatorios y
              avisos importantes de la sesión.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur sm:p-6">
              <div className="mb-6 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 p-4">
                <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#6CFF9A]">
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
                  <p className="mt-1 text-xl font-black text-white">
                    15 de septiembre
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
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="group inline-flex w-full items-center justify-center rounded-[1.2rem] bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.35)] transition hover:scale-[1.01] hover:shadow-[0_28px_70px_rgba(37,211,102,0.45)] active:scale-[0.98] sm:w-auto sm:min-w-[360px] sm:text-lg"
                >
                  Entrar al grupo de WhatsApp
                </a>

                <p className="mt-3 text-sm font-semibold text-white/55">
                  Sin este paso podrías perder el acceso y los recordatorios.
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
                  <span className="mr-2 text-lime-300">•</span>
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
