"use client";

import Image, { type StaticImageData } from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import airbnbLogo from "@/public/plataformas/airbnb.png";
import alfredoImage from "@/public/honorarios-contables/alfredo-honorarios-contables.png";
import amazonLogo from "@/public/plataformas/amazon.png";
import didiLogo from "@/public/plataformas/didi.png";
import mercadoLibreLogo from "@/public/plataformas/mercado-libre.png";
import uberEatsLogo from "@/public/plataformas/uber-eats.png";
import uberLogo from "@/public/plataformas/uber.png";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { landingConfig as config, webinarEvent } from "./config";
import { PlataformasActiveCampaignSubmissionProxy } from "./plataformas-tracking-client";

const { activeCampaign } = config;

const platformLogos: Array<{ name: string; src: StaticImageData }> = [
  { name: "DiDi", src: didiLogo },
  { name: "Mercado Libre", src: mercadoLibreLogo },
  { name: "Amazon", src: amazonLogo },
  { name: "Uber Eats", src: uberEatsLogo },
  { name: "Uber", src: uberLogo },
  { name: "Airbnb", src: airbnbLogo },
];

const classPoints = [
  "Identifica tus obligaciones fiscales por ingresos de plataformas.",
  "Evita errores comunes al declarar operaciones digitales.",
  "Conoce qué revisar antes de presentar información al SAT.",
];

export default function PlataformasLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasOpenedRegistrationModal, setHasOpenedRegistrationModal] =
    useState(false);

  useEffect(() => {
    trackMetaEvent("ViewContent", {
      ...webinarEvent,
      source: "landing_page",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const openRegistrationModal = () => {
    setHasOpenedRegistrationModal(true);
    setIsModalOpen(true);

    trackMetaCustomEvent("OpenRegistrationModal", {
      ...webinarEvent,
      source: "landing_cta",
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-plataformas"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#03030a] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(77,89,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(77,89,255,.07)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
          <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-blue-700/20 blur-[110px]" />
          <div className="absolute -right-24 top-56 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
        </div>

        <section className="relative mx-auto w-full max-w-[1240px] px-4 pb-12 pt-5 min-[390px]:px-5 sm:px-8 sm:pb-16 sm:pt-8 lg:px-10 lg:pb-20 xl:px-6 2xl:py-12">
          <header className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/35 bg-blue-500/10 text-sm font-black text-blue-200">
                C
              </span>
              <div>
                <p className="text-base font-black leading-none">CEFIN</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                  Capacitación fiscal y contable
                </p>
              </div>
            </div>
            <span className="hidden rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-lime-200 sm:inline-flex">
              Clase online gratuita
            </span>
          </header>

          <div className="mt-9 grid items-center gap-8 lg:mt-11 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.9fr)] lg:gap-10 xl:gap-14">
            <div className="min-w-0">
              <div className="inline-flex rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-purple-200 min-[390px]:text-xs">
                Inscripciones abiertas
              </div>

              <h1 className="mt-5 max-w-[760px] text-[2.625rem] font-black uppercase leading-[0.94] tracking-[-0.052em] min-[390px]:text-[3rem] min-[412px]:text-[3.25rem] sm:text-[3.75rem] md:text-[4.4rem] lg:text-[4.9rem] xl:text-[5.5rem] 2xl:text-[5.8rem]">
                <span className="block text-white">Plataformas</span>
                <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Tecnológicas
                </span>
              </h1>

              <p className="mt-6 max-w-[680px] text-[17px] font-semibold leading-relaxed text-white/80 min-[412px]:text-lg sm:text-xl lg:text-[22px]">
                Aprende qué obligaciones fiscales debes revisar al recibir
                ingresos por plataformas digitales y evita errores al declarar
                ante el SAT.
              </p>

              <div className="mt-7 flex max-w-[680px] flex-wrap gap-x-5 gap-y-3 border-y border-white/10 py-4">
                <div className="min-w-[138px] flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">Fecha</p>
                  <p className="mt-1 text-sm font-black min-[412px]:text-base">1 de septiembre</p>
                </div>
                <div className="min-w-[138px] flex-1 min-[390px]:border-l min-[390px]:border-white/10 min-[390px]:pl-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">Hora</p>
                  <p className="mt-1 text-sm font-black min-[412px]:text-base">11:00 AM · CDMX</p>
                </div>
                <div className="min-w-[138px] flex-1 min-[600px]:border-l min-[600px]:border-white/10 min-[600px]:pl-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">Modalidad</p>
                  <p className="mt-1 text-sm font-black min-[412px]:text-base">Online en vivo</p>
                </div>
              </div>

              <div className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={openRegistrationModal}
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-white px-6 text-sm font-black uppercase tracking-[0.04em] text-slate-950 shadow-[0_18px_55px_rgba(99,102,241,.3)] transition hover:-translate-y-0.5 hover:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 sm:min-h-16 sm:w-auto sm:px-9 sm:text-base"
                >
                  Reservar mi lugar gratis
                </button>
                <p className="text-center text-xs font-bold leading-relaxed text-white/55 sm:max-w-48 sm:text-left">
                  Cupo gratuito. Regístrate para recibir tu acceso.
                </p>
              </div>
            </div>

            <aside className="relative mx-auto w-full max-w-[430px] lg:max-w-none" aria-label="Instructor de la clase">
              <div className="pointer-events-none absolute inset-x-[8%] bottom-[8%] top-[18%] rounded-full bg-[radial-gradient(circle,rgba(76,94,255,.34),rgba(120,55,220,.14)_48%,transparent_72%)] blur-2xl" aria-hidden="true" />
              <figure className="relative flex min-h-[330px] flex-col justify-end overflow-hidden min-[390px]:min-h-[370px] sm:min-h-[440px] lg:min-h-[500px]">
                <Image
                  src={alfredoImage}
                  alt="Mtro. Alfredo Cobos"
                  sizes="(max-width: 1023px) 430px, 40vw"
                  loading="eager"
                  fetchPriority="high"
                  unoptimized
                  className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom lg:h-[96%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#03030a] via-[#03030a]/74 to-transparent" />
                <figcaption className="relative z-10 mx-auto mb-2 w-fit px-4 text-center lg:mb-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-300">Impartido por</p>
                  <p className="mt-1 text-lg font-black sm:text-xl">Mtro. Alfredo Cobos</p>
                </figcaption>
              </figure>
            </aside>
          </div>

          <div className="mt-10 grid gap-7 border-t border-white/10 pt-8 md:mt-14 md:grid-cols-3 md:gap-8 md:pt-10">
            {classPoints.map((point, index) => (
              <article
                key={point}
                className="relative pl-11"
              >
                <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-[11px] font-black shadow-[0_8px_24px_rgba(99,102,241,.28)]">
                  {index + 1}
                </span>
                <p className="text-base font-bold leading-relaxed text-white/82 sm:text-lg">
                  {point}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 sm:mt-12">
            <p className="text-center text-xs font-black uppercase tracking-[0.16em] text-white/55 sm:text-sm">
              Ejemplos de plataformas que abordaremos
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 rounded-3xl bg-white/[0.94] px-5 py-6 min-[430px]:grid-cols-3 sm:grid-cols-6 sm:px-7">
              {platformLogos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex min-h-16 items-center justify-center px-2"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    sizes="(max-width: 429px) 40vw, (max-width: 639px) 28vw, 140px"
                    unoptimized
                    className="h-11 w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {hasOpenedRegistrationModal && (
        <div
          className={`${isModalOpen ? "flex" : "hidden"} fixed inset-0 items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6`}
          style={{ zIndex: 2147483647, isolation: "isolate" }}
          role="dialog"
          aria-modal="true"
          aria-hidden={!isModalOpen}
          aria-labelledby="plataformas-registration-title"
        >
          <div className="relative max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-w-[580px] overflow-x-hidden overflow-y-auto rounded-3xl bg-white p-4 text-black shadow-[0_30px_100px_rgba(0,0,0,.6)] sm:max-h-[calc(100dvh-48px)] sm:p-7">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-2xl font-black text-slate-500 transition hover:bg-slate-200 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 sm:right-5 sm:top-5"
              aria-label="Cerrar formulario"
            >
              ×
            </button>

            <div className="pr-10 sm:pr-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-600">
                Registro gratuito
              </p>
              <h2
                id="plataformas-registration-title"
                className="mt-2 text-2xl font-black uppercase leading-tight text-slate-950 sm:text-3xl"
              >
                Reserva tu lugar
              </h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">
                {config.compactDateTimeLabel}
              </p>
            </div>

            <div className="plataformas-form-shell relative z-0 mt-5 isolate bg-white sm:mt-6">
              <ActiveCampaignForm />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .plataformas-form-shell,
        .plataformas-form-shell ._form_323,
        .plataformas-form-shell ._form_323 form,
        .plataformas-form-shell ._form-content {
          width: 100% !important;
          max-width: 100% !important;
          margin-inline: 0 !important;
          box-sizing: border-box !important;
        }

        .plataformas-form-shell ._form_323 {
          padding: 0 !important;
        }

        .plataformas-form-shell ._form_element,
        .plataformas-form-shell ._form-label,
        .plataformas-form-shell ._form-fieldset,
        .plataformas-form-shell ._checkbox-radio {
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .plataformas-form-shell input:not([type="checkbox"]):not([type="radio"]),
        .plataformas-form-shell select,
        .plataformas-form-shell textarea,
        .plataformas-form-shell button[type="submit"] {
          width: 100% !important;
          max-width: 100% !important;
          min-height: 48px;
          box-sizing: border-box !important;
        }

        .plataformas-form-shell label,
        .plataformas-form-shell ._form-label,
        .plataformas-form-shell ._checkbox-radio label {
          overflow-wrap: anywhere;
          line-height: 1.45 !important;
        }

        @media (max-width: 430px) {
          .plataformas-form-shell ._form_323,
          .plataformas-form-shell ._form-content {
            font-size: 14px !important;
          }
        }
      `}</style>
    </>
  );
}

function ActiveCampaignForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.getElementById("ac-script-loader-plataformas")?.remove();

    const script = document.createElement("script");
    script.id = "ac-script-loader-plataformas";
    const embedUrl = new URL(activeCampaign.embedUrl);
    embedUrl.searchParams.set("cefin_v", Date.now().toString());
    script.src = embedUrl.toString();
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <>
      <PlataformasActiveCampaignSubmissionProxy formRef={formRef} />
      <div
        ref={formRef}
        className={activeCampaign.formClass}
        aria-label="Formulario de registro"
      />
    </>
  );
}
