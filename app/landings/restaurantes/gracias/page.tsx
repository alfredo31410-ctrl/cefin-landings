"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import {
  consumeRestaurantesRegistrationAttempt,
  getRestaurantesEventKey,
} from "@/lib/restaurantes-tracking-session";
import { waitForNominaMetaPixel } from "@/lib/nomina-tracking-session";

const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/CseKogypJzn8cO8D2aJulL";

export default function RestaurantesGraciasPage() {
  useEffect(() => {
    const attempt = consumeRestaurantesRegistrationAttempt();
    if (!attempt) return;

    const eventKey = getRestaurantesEventKey(
      "complete_registration_sent",
      attempt.id,
    );
    if (window.sessionStorage.getItem(eventKey)) return;

    return waitForNominaMetaPixel(
      () => {
        window.fbq?.(
          "track",
          "CompleteRegistration",
          {
            content_name: "Asesor Fiscal de Restaurantes",
            content_category: "Clase gratuita",
            landing_slug: "restaurantes",
            value: 0,
            currency: "MXN",
          },
          { eventID: attempt.id },
        );
        window.sessionStorage.setItem(eventKey, "true");
      },
      () => undefined,
    );
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaEvent("WhatsAppGroupClick", {
      content_name: "Asesor Fiscal de Restaurantes",
      content_category: "Grupo de WhatsApp",
      landing_slug: "restaurantes",
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-restaurantes-gracias"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(undefined, { trackPageView: false }),
        }}
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

      <main className="relative overflow-x-hidden bg-[#0b0806] px-5 py-8 text-white sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(173,77,12,0.3),transparent_30%),linear-gradient(115deg,#030303,#160c05)]" />
          <div className="absolute -right-24 top-[-10%] h-[70%] w-[45%] rounded-full bg-orange-700/20 blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[15%] h-[55%] w-[55%] rounded-full bg-amber-500/10 blur-[100px]" />
        </div>

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between py-3">
          <span className="text-3xl font-black tracking-[-0.06em]">CEFIN</span>
          <span className="hidden text-[11px] font-black uppercase tracking-[0.2em] text-orange-200 sm:block">
            Asesoría fiscal especializada
          </span>
        </header>

        <section className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.58fr]">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-orange-200">
              Registro recibido
            </p>
            <h1 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-6xl">
              Tu lugar está casi listo
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl">
              Ya recibimos tus datos para la clase gratuita de Asesor Fiscal de
              Restaurantes y negocios de comida.
            </p>
            <div className="mt-6 rounded-2xl border border-orange-500/30 bg-black/45 p-5 backdrop-blur sm:p-6">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-300">
                Evento en vivo
              </p>
              <p className="mt-3 text-2xl font-black text-white">
                11 de agosto · 11:00 AM CDMX
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-white/60">
                En línea · Mtro. Alfredo Cobos
              </p>
            </div>
            <div className="mt-7 rounded-2xl border-l-4 border-orange-500 bg-orange-500/10 px-5 py-4">
              <p className="font-bold leading-relaxed text-orange-100">
                Para recibir el enlace, recordatorios y avisos de la clase,
                entra ahora al grupo oficial de WhatsApp.
              </p>
            </div>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleWhatsAppClick}
              className="mt-7 inline-flex min-h-[58px] w-full items-center justify-center rounded-2xl bg-[#25d366] px-7 py-4 text-center text-sm font-black uppercase text-[#062c15] shadow-[0_18px_50px_rgba(37,211,102,0.2)] transition hover:-translate-y-1 hover:bg-[#6dff9d] sm:w-auto"
            >
              Entrar al grupo de WhatsApp
              <span className="ml-3 text-xl" aria-hidden="true">→</span>
            </a>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
              Cuando se abra WhatsApp, toca “Unirme al grupo”.
            </p>
          </div>

          <div className="relative order-2 flex min-h-[320px] items-end justify-center lg:order-none lg:min-h-[500px] lg:pl-8">
            <div className="absolute inset-[8%] bg-[radial-gradient(circle,rgba(185,83,18,0.34),transparent_68%)]" />
            <Image
              src="/restaurantes/alfredo-restaurantes.png"
              alt="Mtro. Alfredo Cobos"
              width={800}
              height={800}
              unoptimized
              sizes="35vw"
              className="relative z-10 h-full max-h-[560px] w-auto max-w-[90%] object-contain object-bottom mix-blend-screen drop-shadow-[0_26px_50px_rgba(0,0,0,0.75)]"
            />
          </div>
        </section>
      </main>
    </>
  );
}
