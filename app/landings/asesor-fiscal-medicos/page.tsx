"use client";

import { Bebas_Neue } from "next/font/google";
import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

/* ==========================================================================
   CONFIGURACIÓN RÁPIDA
   ========================================================================== */

const ACTIVE_CAMPAIGN_FORM_ID = 275;

const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;

const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";

const MEDICAL_BACKGROUND_IMAGE_URL = `${ASSET_BASE}/medicos/Fondo-medicos.jpg`;
const MARISOL_IMAGE_URL = `${ASSET_BASE}/medicos/Marisol-medicos.png`;

const EVENT_DATE = "Martes 14 de julio";
const EVENT_TIME = "11:00 AM";
const EVENT_TIMEZONE = "Hora CDMX";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function AsesorFiscalMedicosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Contabilidad e Impuestos para Médicos | Clase Gratis | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Contabilidad e Impuestos para Médicos | Landing",
      content_category: "Clase gratuita",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousScript = document.getElementById(
      "active-campaign-asesor-fiscal-medicos",
    );

    if (previousScript) {
      previousScript.remove();
    }

    const formContainer = document.querySelector(`.${FORM_CLASS}`);

    if (formContainer) {
      formContainer.innerHTML = "";
    }

    const script = document.createElement("script");

    script.id = "active-campaign-asesor-fiscal-medicos";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [isModalOpen]);

  const openRegistrationModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Script
        id="meta-pixel-asesor-fiscal-medicos"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(),
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

      <main className="medical-landing relative min-h-[100svh] overflow-x-hidden bg-[#020817] text-white">
        {/* ================================================================
            FONDO MÉDICO PREMIUM
           ================================================================ */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src={MEDICAL_BACKGROUND_IMAGE_URL}
            alt=""
            className="medical-background-image absolute inset-0 h-full w-full object-cover object-center opacity-60 blur-[1px]"
          />

          <div className="absolute inset-0 bg-[#020817]/75" />

          <div className="medical-grid absolute inset-0" />

          <div className="medical-orb medical-orb--one" />
          <div className="medical-orb medical-orb--two" />
          <div className="medical-orb medical-orb--three" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_28%,rgba(34,211,238,0.20)_0%,transparent_28%),radial-gradient(circle_at_12%_82%,rgba(30,144,255,0.16)_0%,transparent_33%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,8,23,0.15)_0%,rgba(2,8,23,0.28)_42%,rgba(2,8,23,0.95)_100%)]" />

          <div className="medical-light-trail" />

          {/* Marisol para móvil y tablet */}
          <img
            src={MARISOL_IMAGE_URL}
            alt=""
            className="medical-mobile-portrait absolute bottom-[-3%] right-[-10%] h-[74%] w-auto max-w-none object-contain object-bottom opacity-30 drop-shadow-[0_32px_68px_rgba(0,0,0,0.78)] lg:hidden"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,8,23,0.10)_0%,rgba(2,8,23,0.30)_40%,rgba(2,8,23,0.74)_100%)] lg:hidden" />
        </div>

        {/* ================================================================
            HEADER
           ================================================================ */}
        <header className="relative z-30">
          <div className="medical-shell medical-header-shell mx-auto flex w-full items-center justify-between px-5 py-4 lg:px-12 lg:py-6 xl:px-16">
            <p className="landing-reveal landing-reveal--1 text-xl font-black tracking-tight text-white lg:text-3xl">
              CEFIN
            </p>

            <p className="landing-reveal landing-reveal--1 hidden text-xs font-bold uppercase tracking-[0.22em] text-cyan-100/80 lg:block">
              Capacitación fiscal especializada
            </p>
          </div>
        </header>

        {/* ================================================================
            HERO
           ================================================================ */}
        <section className="relative z-20">
          <div className="medical-shell medical-hero-shell mx-auto grid min-h-[calc(100svh-64px)] w-full grid-cols-1 items-center px-5 pb-8 lg:min-h-[calc(100vh-92px)] lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.82fr)] lg:gap-4 lg:px-12 lg:pb-10 xl:grid-cols-[minmax(0,1fr)_minmax(520px,0.92fr)] xl:px-16">
            {/* TEXTO / CTA */}
            <div className="medical-copy relative z-10 max-w-[760px] py-8 text-left lg:py-10">
              <div className="landing-reveal landing-reveal--2 premium-pill inline-flex items-center rounded-full border border-orange-300/40 bg-orange-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-950 sm:text-xs">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-slate-950" />
                Clase gratuita en vivo
              </div>

              <p className="medical-pretitle landing-reveal landing-reveal--3 mt-6 font-black leading-tight text-white">
                Contabilidad e Impuestos para
              </p>

              <h1
                className={`${bebasNeue.className} medical-title landing-reveal landing-reveal--4 hero-word mt-2 inline-block bg-[#02040a]/90 px-4 py-3 uppercase leading-[0.82] tracking-[-0.015em] text-white sm:px-5 sm:py-4 lg:mt-3`}
              >
                Médicos
              </h1>

              <div className="medical-description-wrap landing-reveal landing-reveal--5 mt-6 max-w-[640px] lg:mt-8">
                <p className="medical-description font-medium leading-relaxed text-slate-100">
                  Aprende cómo atender correctamente a médicos, identificar
                  oportunidades fiscales reales y dejar de improvisar al
                  asesorar este nicho.
                </p>
              </div>

              <div className="medical-date-row landing-reveal landing-reveal--6 mt-6 flex flex-wrap items-stretch gap-3 lg:mt-8">
                <div className="medical-info-card premium-info-card rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100/70">
                    Fecha
                  </p>

                  <p className="mt-1 text-sm font-black text-white sm:text-base">
                    {EVENT_DATE}
                  </p>
                </div>

                <div className="medical-info-card premium-info-card rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100/70">
                    Hora
                  </p>

                  <p className="mt-1 text-sm font-black text-white sm:text-base">
                    {EVENT_TIME} · {EVENT_TIMEZONE}
                  </p>
                </div>
              </div>

              <div className="medical-instructor landing-reveal landing-reveal--7 mt-6 border-l-2 border-cyan-300/75 pl-4 lg:mt-8">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                  Imparte
                </p>

                <p className="mt-1 text-lg font-black text-white sm:text-xl">
                  C.P. Marisol Galván
                </p>
              </div>

              <button
                type="button"
                onClick={openRegistrationModal}
                className="medical-cta landing-reveal landing-reveal--8 cta-premium group relative mt-7 inline-flex w-full max-w-[340px] items-center justify-center gap-3 overflow-hidden rounded-xl bg-orange-400 px-7 py-4 text-sm font-black uppercase tracking-[0.04em] text-slate-950 shadow-[0_20px_45px_rgba(245,158,11,0.30)] transition duration-200 hover:scale-[1.02] hover:bg-orange-300 active:scale-[0.98] sm:text-base lg:mt-9 lg:w-auto lg:px-9 lg:py-5"
              >
                <span className="relative z-10">Quiero registrarme gratis</span>

                <span
                  aria-hidden="true"
                  className="relative z-10 text-xl leading-none transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>

                <span
                  aria-hidden="true"
                  className="cta-premium-shine absolute inset-y-0 left-0 w-1/3"
                />
              </button>

              <p className="medical-note landing-reveal landing-reveal--9 mt-3 text-xs font-medium text-slate-300">
                Sesión en línea · Registro sin costo · Enfoque práctico
              </p>
            </div>

            {/* MARISOL DESKTOP */}
            <div className="landing-reveal landing-reveal--5 medical-portrait-wrap relative hidden h-full min-h-[620px] items-end justify-center lg:flex">
              <div className="medical-portrait-aura" />
              <div className="medical-portrait-ring medical-portrait-ring--one" />
              <div className="medical-portrait-ring medical-portrait-ring--two" />

              <span className="medical-orbit medical-orbit--one" />
              <span className="medical-orbit medical-orbit--two" />
              <span className="medical-orbit medical-orbit--three" />

              <img
                src={MARISOL_IMAGE_URL}
                alt="C.P. Marisol Galván"
                className="medical-portrait relative z-10 h-[min(78vh,790px)] w-full max-w-[650px] object-contain object-bottom drop-shadow-[0_35px_70px_rgba(0,0,0,0.72)]"
              />
            </div>
          </div>
        </section>

        {/* ================================================================
            MODAL DE ACTIVECAMPAIGN
           ================================================================ */}
        {isModalOpen && (
          <div
            className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/90 p-3 backdrop-blur-md sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
          >
            <div className="modal-card relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-cyan-300/30 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.70)]">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300" />

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 z-10 text-2xl font-bold text-slate-400 transition hover:rotate-90 hover:text-slate-950"
                aria-label="Cerrar formulario"
              >
                ×
              </button>

              <div className="relative shrink-0 overflow-hidden bg-[#04162F] px-6 pb-6 pt-9 text-center sm:px-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.22),transparent_58%)]" />

                <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200">
                    Clase gratuita en vivo
                  </p>

                  <h2
                    id="registration-title"
                    className="mt-3 text-2xl font-black uppercase leading-tight text-white sm:text-3xl"
                  >
                    Contabilidad e Impuestos
                  </h2>

                  <p
                    className={`${bebasNeue.className} mt-1 text-[3.4rem] uppercase leading-none tracking-wide text-cyan-300`}
                  >
                    Médicos
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-200">
                    Completa tus datos para asegurar tu lugar en la sesión.
                  </p>

                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-cyan-100/80">
                    {EVENT_DATE} · {EVENT_TIME} · {EVENT_TIMEZONE}
                  </p>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
                <div className="ac-modal-wrapper min-h-[400px]">
                  <div className={FORM_CLASS}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .medical-landing {
            isolation: isolate;
          }

          .medical-shell {
            width: min(100%, 1600px);
          }

          .medical-background-image {
            animation: medical-background-drift 24s ease-in-out infinite
              alternate;
            transform-origin: center;
          }

          .medical-grid {
            opacity: 0.13;
            background-image:
              linear-gradient(rgba(103, 232, 249, 0.14) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(103, 232, 249, 0.14) 1px,
                transparent 1px
              );
            background-size: 54px 54px;
            mask-image: linear-gradient(
              to bottom,
              transparent,
              black 18%,
              black 78%,
              transparent
            );
          }

          .medical-orb {
            position: absolute;
            border-radius: 999px;
            filter: blur(65px);
            opacity: 0.42;
            animation: medical-orb-float 14s ease-in-out infinite alternate;
          }

          .medical-orb--one {
            top: 8%;
            right: 13%;
            width: 18rem;
            height: 18rem;
            background: rgba(34, 211, 238, 0.32);
          }

          .medical-orb--two {
            bottom: -10%;
            left: 4%;
            width: 22rem;
            height: 22rem;
            background: rgba(37, 99, 235, 0.26);
            animation-delay: -6s;
          }

          .medical-orb--three {
            top: 44%;
            right: 38%;
            width: 11rem;
            height: 11rem;
            background: rgba(249, 115, 22, 0.14);
            animation-delay: -3s;
          }

          .medical-light-trail {
            position: absolute;
            bottom: 19%;
            left: -15%;
            width: 130%;
            height: 1px;
            opacity: 0.6;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(103, 232, 249, 0.1),
              rgba(103, 232, 249, 0.85),
              rgba(59, 130, 246, 0.42),
              transparent
            );
            box-shadow:
              0 0 14px rgba(34, 211, 238, 0.7),
              0 0 35px rgba(59, 130, 246, 0.34);
            transform: rotate(-6deg);
            animation: medical-light-sweep 8s ease-in-out infinite;
          }

          .medical-pretitle {
            font-size: clamp(1.2rem, 1.7vw, 2.2rem);
          }

          .medical-title {
            font-size: clamp(3.55rem, 7.4vw, 9rem);
          }

          .medical-description {
            font-size: clamp(0.96rem, 1.08vw, 1.35rem);
          }

          .landing-reveal {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
            animation: landing-reveal-up 0.72s cubic-bezier(0.22, 1, 0.36, 1)
              forwards;
          }

          .landing-reveal--1 {
            animation-delay: 0.05s;
          }

          .landing-reveal--2 {
            animation-delay: 0.12s;
          }

          .landing-reveal--3 {
            animation-delay: 0.2s;
          }

          .landing-reveal--4 {
            animation-delay: 0.28s;
          }

          .landing-reveal--5 {
            animation-delay: 0.36s;
          }

          .landing-reveal--6 {
            animation-delay: 0.44s;
          }

          .landing-reveal--7 {
            animation-delay: 0.52s;
          }

          .landing-reveal--8 {
            animation-delay: 0.6s;
          }

          .landing-reveal--9 {
            animation-delay: 0.68s;
          }

          .premium-pill {
            box-shadow:
              0 14px 34px rgba(245, 158, 11, 0.19),
              inset 0 1px 0 rgba(255, 255, 255, 0.36);
            animation:
              landing-reveal-up 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards,
              premium-pill-glow 3.4s ease-in-out infinite 1.2s;
          }

          .hero-word {
            box-shadow:
              0 18px 48px rgba(0, 0, 0, 0.52),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
          }

          .premium-info-card {
            position: relative;
            overflow: hidden;
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              background 0.25s ease,
              box-shadow 0.25s ease;
          }

          .premium-info-card::after {
            position: absolute;
            inset: 0;
            content: "";
            pointer-events: none;
            background: linear-gradient(
              120deg,
              transparent 22%,
              rgba(255, 255, 255, 0.12),
              transparent 72%
            );
            transform: translateX(-130%);
            transition: transform 0.7s ease;
          }

          .premium-info-card:hover {
            transform: translateY(-3px);
            border-color: rgba(103, 232, 249, 0.62);
            background: rgba(34, 211, 238, 0.15);
            box-shadow: 0 15px 32px rgba(8, 145, 178, 0.15);
          }

          .premium-info-card:hover::after {
            transform: translateX(130%);
          }

          .cta-premium {
            box-shadow:
              0 20px 45px rgba(245, 158, 11, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.4);
          }

          .cta-premium:hover .cta-premium-shine {
            animation: cta-premium-shine 0.82s ease forwards;
          }

          .cta-premium-shine {
            pointer-events: none;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.72),
              transparent
            );
            transform: translateX(-180%) skewX(-20deg);
          }

          .medical-portrait-wrap {
            isolation: isolate;
          }

          .medical-portrait-aura {
            position: absolute;
            right: 7%;
            bottom: 11%;
            z-index: 0;
            width: 55%;
            height: 54%;
            border-radius: 999px;
            background: rgba(34, 211, 238, 0.2);
            filter: blur(48px);
            animation: portrait-aura-pulse 4.6s ease-in-out infinite;
          }

          .medical-portrait-ring {
            position: absolute;
            right: 11%;
            bottom: 24%;
            z-index: 0;
            border: 1px solid rgba(103, 232, 249, 0.22);
            border-radius: 999px;
            box-shadow:
              inset 0 0 25px rgba(34, 211, 238, 0.05),
              0 0 25px rgba(34, 211, 238, 0.04);
          }

          .medical-portrait-ring--one {
            width: 20rem;
            height: 20rem;
            animation: ring-spin 22s linear infinite;
          }

          .medical-portrait-ring--two {
            right: 2%;
            bottom: 13%;
            width: 28rem;
            height: 28rem;
            border-style: dashed;
            border-color: rgba(59, 130, 246, 0.16);
            animation: ring-spin-reverse 32s linear infinite;
          }

          .medical-orbit {
            position: absolute;
            z-index: 1;
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: #67e8f9;
            box-shadow:
              0 0 14px #67e8f9,
              0 0 30px rgba(34, 211, 238, 0.64);
            animation: orbit-pulse 2.6s ease-in-out infinite;
          }

          .medical-orbit--one {
            right: 18%;
            top: 26%;
          }

          .medical-orbit--two {
            right: 68%;
            top: 49%;
            width: 6px;
            height: 6px;
            animation-delay: -0.8s;
          }

          .medical-orbit--three {
            right: 31%;
            bottom: 18%;
            width: 5px;
            height: 5px;
            animation-delay: -1.5s;
          }

          .medical-portrait {
            --portrait-scale: 1.02;
            animation: portrait-float 6s ease-in-out infinite;
            transform-origin: bottom center;
          }

          .modal-backdrop {
            animation: modal-backdrop-in 0.24s ease-out forwards;
          }

          .modal-card {
            animation: modal-card-in 0.42s cubic-bezier(0.22, 1, 0.36, 1)
              forwards;
          }

          /* MÓVIL COMPACTO */
          @media (max-width: 374px) {
            .medical-header-shell {
              padding-top: 0.9rem;
              padding-bottom: 0.9rem;
            }

            .medical-copy {
              padding-top: 1.35rem;
              padding-bottom: 1.5rem;
            }

            .medical-pretitle {
              margin-top: 1.2rem;
              font-size: 1.12rem;
            }

            .medical-title {
              margin-top: 0.45rem;
              padding: 0.65rem 0.85rem;
              font-size: 3.2rem;
            }

            .medical-description-wrap {
              margin-top: 1.35rem;
            }

            .medical-description {
              font-size: 0.94rem;
              line-height: 1.62;
            }

            .medical-date-row {
              display: grid;
              grid-template-columns: 1fr;
              gap: 0.65rem;
              margin-top: 1.3rem;
            }

            .medical-info-card {
              width: 100%;
              padding: 0.75rem 0.85rem;
            }

            .medical-instructor {
              margin-top: 1.35rem;
            }

            .medical-cta {
              max-width: none;
              margin-top: 1.45rem;
              padding: 0.95rem 1rem;
              font-size: 0.78rem;
            }

            .medical-note {
              font-size: 0.67rem;
              line-height: 1.45;
            }

            .medical-mobile-portrait {
              right: -16%;
              bottom: -1%;
              height: 62%;
              opacity: 0.3;
            }

            .medical-grid {
              background-size: 42px 42px;
            }
          }

          /* MÓVIL ESTÁNDAR */
          @media (min-width: 375px) and (max-width: 767px) {
            .medical-copy {
              padding-top: clamp(1.5rem, 4vh, 2.5rem);
              padding-bottom: 1.8rem;
            }

            .medical-pretitle {
              margin-top: 1.45rem;
            }

            .medical-title {
              font-size: clamp(3.7rem, 16vw, 5.1rem);
            }

            .medical-description-wrap {
              margin-top: 1.45rem;
            }

            .medical-date-row {
              display: grid;
              grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
              gap: 0.7rem;
              margin-top: 1.45rem;
            }

            .medical-info-card {
              min-width: 0;
              padding: 0.8rem 0.9rem;
            }

            .medical-instructor {
              margin-top: 1.45rem;
            }

            .medical-cta {
              max-width: none;
              margin-top: 1.5rem;
            }

            .medical-mobile-portrait {
              right: -12%;
              bottom: -3%;
              height: 72%;
              opacity: 0.34;
            }
          }

          /* TABLET */
          @media (min-width: 768px) and (max-width: 1023px) {
            .medical-shell {
              width: min(100%, 920px);
            }

            .medical-header-shell {
              padding-right: clamp(2rem, 7vw, 5rem);
              padding-left: clamp(2rem, 7vw, 5rem);
            }

            .medical-hero-shell {
              min-height: calc(100svh - 80px);
              padding-right: clamp(2rem, 7vw, 5rem);
              padding-left: clamp(2rem, 7vw, 5rem);
            }

            .medical-copy {
              max-width: 720px;
              padding-top: clamp(2.7rem, 7vh, 4.5rem);
              padding-bottom: clamp(2.4rem, 7vh, 4rem);
            }

            .medical-pretitle {
              font-size: clamp(1.8rem, 3vw, 2.5rem);
            }

            .medical-title {
              font-size: clamp(5.6rem, 11vw, 7.4rem);
            }

            .medical-description {
              max-width: 660px;
              font-size: 1.12rem;
            }

            .medical-date-row {
              display: grid;
              grid-template-columns: 190px 260px;
              gap: 0.85rem;
            }

            .medical-cta {
              width: auto;
              max-width: 390px;
              padding: 1.1rem 2rem;
            }

            .medical-mobile-portrait {
              right: -6%;
              bottom: -8%;
              height: 72%;
              opacity: 0.28;
            }

            .medical-grid {
              background-size: 62px 62px;
            }
          }

          /* LAPTOP / DESKTOP NORMAL */
          @media (min-width: 1024px) {
            .medical-copy {
              transform: translateY(-2vh);
            }

            .medical-date-row {
              flex-wrap: nowrap;
            }

            .medical-info-card {
              min-width: 0;
            }

            .medical-portrait {
              --portrait-scale: 1.05;
            }
          }

          /* MONITOR AMPLIO */
          @media (min-width: 1440px) {
            .medical-shell {
              width: min(100%, 1750px);
            }

            .medical-header-shell {
              padding-right: clamp(3rem, 5vw, 6rem);
              padding-left: clamp(3rem, 5vw, 6rem);
            }

            .medical-hero-shell {
              grid-template-columns: minmax(0, 1.04fr) minmax(560px, 0.96fr);
              gap: clamp(2rem, 3.3vw, 4rem);
              padding-right: clamp(3rem, 5vw, 6rem);
              padding-left: clamp(3rem, 5vw, 6rem);
            }

            .medical-copy {
              max-width: 820px;
              transform: translateY(-3vh);
            }

            .medical-pretitle {
              font-size: clamp(1.8rem, 1.85vw, 2.45rem);
            }

            .medical-title {
              font-size: clamp(7rem, 7.2vw, 9rem);
            }

            .medical-description {
              max-width: 720px;
              font-size: clamp(1.08rem, 1.05vw, 1.32rem);
            }

            .medical-date-row {
              gap: 0.9rem;
            }

            .medical-info-card {
              padding: 0.9rem 1rem;
            }

            .medical-instructor {
              margin-top: 2rem;
            }

            .medical-cta {
              max-width: 375px;
              margin-top: 2rem;
              padding: 1.25rem 2.25rem;
              font-size: 1rem;
            }

            .medical-portrait-wrap {
              min-height: clamp(650px, 74vh, 780px);
            }

            .medical-portrait {
              --portrait-scale: 1.12;
              height: min(82vh, 860px);
              max-width: 720px;
            }

            .medical-portrait-ring--one {
              width: 22rem;
              height: 22rem;
            }

            .medical-portrait-ring--two {
              width: 31rem;
              height: 31rem;
            }
          }

          /* MONITOR GRANDE / 27" */
          @media (min-width: 1700px) {
            .medical-shell {
              width: min(100%, 1880px);
            }

            .medical-header-shell {
              padding-right: clamp(4rem, 6vw, 8rem);
              padding-left: clamp(4rem, 6vw, 8rem);
            }

            .medical-hero-shell {
              grid-template-columns: minmax(610px, 1.03fr) minmax(680px, 0.97fr);
              gap: clamp(3rem, 4vw, 5.5rem);
              padding-right: clamp(4rem, 6vw, 8rem);
              padding-left: clamp(4rem, 6vw, 8rem);
            }

            .medical-copy {
              max-width: 900px;
              transform: translateY(-4vh);
            }

            .medical-pretitle {
              font-size: clamp(2rem, 1.7vw, 2.65rem);
            }

            .medical-title {
              font-size: clamp(8rem, 6.8vw, 10rem);
            }

            .medical-description {
              max-width: 760px;
              font-size: clamp(1.12rem, 1vw, 1.38rem);
            }

            .medical-info-card {
              padding: 1rem 1.1rem;
            }

            .medical-instructor {
              margin-top: 2.2rem;
            }

            .medical-cta {
              max-width: 400px;
              margin-top: 2.15rem;
              padding: 1.3rem 2.55rem;
              font-size: 1.05rem;
            }

            .medical-note {
              font-size: 0.82rem;
            }

            .medical-portrait-wrap {
              min-height: clamp(700px, 78vh, 880px);
            }

            .medical-portrait {
              --portrait-scale: 1.19;
              height: min(86vh, 950px);
              max-width: 790px;
            }

            .medical-portrait-aura {
              width: 61%;
              height: 60%;
            }

            .medical-portrait-ring--one {
              width: 25rem;
              height: 25rem;
            }

            .medical-portrait-ring--two {
              width: 35rem;
              height: 35rem;
            }

            .medical-grid {
              background-size: 64px 64px;
            }
          }

          /* ULTRAWIDE */
          @media (min-width: 1900px) {
            .medical-shell {
              width: min(100%, 2100px);
            }

            .medical-header-shell {
              padding-right: clamp(5rem, 7vw, 10rem);
              padding-left: clamp(5rem, 7vw, 10rem);
            }

            .medical-hero-shell {
              grid-template-columns: minmax(680px, 1.03fr) minmax(760px, 0.97fr);
              gap: clamp(4rem, 5vw, 7rem);
              padding-right: clamp(5rem, 7vw, 10rem);
              padding-left: clamp(5rem, 7vw, 10rem);
            }

            .medical-copy {
              max-width: 980px;
            }

            .medical-title {
              font-size: clamp(9rem, 6.4vw, 11rem);
            }

            .medical-description {
              max-width: 820px;
              font-size: 1.35rem;
            }

            .medical-portrait {
              --portrait-scale: 1.25;
              height: min(88vh, 1020px);
              max-width: 860px;
            }

            .medical-portrait-ring--one {
              width: 28rem;
              height: 28rem;
            }

            .medical-portrait-ring--two {
              width: 39rem;
              height: 39rem;
            }
          }

          /* LAPTOPS CON ALTURA BAJA */
          @media (min-width: 1024px) and (max-height: 820px) {
            .medical-header-shell {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }

            .medical-hero-shell {
              min-height: calc(100vh - 64px);
            }

            .medical-copy {
              padding-top: 1.4rem;
              padding-bottom: 1.4rem;
              transform: none;
            }

            .medical-pretitle {
              margin-top: 1rem;
              font-size: clamp(1.35rem, 1.65vw, 1.9rem);
            }

            .medical-title {
              margin-top: 0.45rem;
              font-size: clamp(5.4rem, 6.4vw, 7.4rem);
            }

            .medical-description-wrap {
              margin-top: 1.25rem;
            }

            .medical-description {
              font-size: 1rem;
            }

            .medical-date-row {
              margin-top: 1.25rem;
            }

            .medical-instructor {
              margin-top: 1.25rem;
            }

            .medical-cta {
              margin-top: 1.25rem;
              padding-top: 1rem;
              padding-bottom: 1rem;
            }

            .medical-portrait-wrap {
              min-height: 520px;
            }

            .medical-portrait {
              --portrait-scale: 1;
              height: min(72vh, 650px);
              max-width: 610px;
            }

            .medical-portrait-ring--one {
              width: 18rem;
              height: 18rem;
            }

            .medical-portrait-ring--two {
              width: 24rem;
              height: 24rem;
            }
          }

          @media (max-width: 767px) and (max-height: 740px) {
            .medical-copy {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }

            .medical-pretitle {
              margin-top: 1rem;
            }

            .medical-description-wrap {
              margin-top: 1rem;
            }

            .medical-date-row {
              margin-top: 1rem;
            }

            .medical-instructor {
              margin-top: 1rem;
            }

            .medical-cta {
              margin-top: 1.1rem;
            }

            .medical-mobile-portrait {
              opacity: 0.22;
            }
          }

          @keyframes landing-reveal-up {
            from {
              opacity: 0;
              transform: translate3d(0, 18px, 0);
            }

            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes medical-background-drift {
            from {
              transform: scale(1.05) translate3d(-0.5%, -0.35%, 0);
            }

            to {
              transform: scale(1.1) translate3d(0.7%, 0.45%, 0);
            }
          }

          @keyframes medical-orb-float {
            from {
              transform: translate3d(0, 0, 0) scale(1);
            }

            to {
              transform: translate3d(26px, -18px, 0) scale(1.1);
            }
          }

          @keyframes medical-light-sweep {
            0%,
            100% {
              opacity: 0.25;
              transform: translate3d(-3%, 0, 0) rotate(-6deg);
            }

            50% {
              opacity: 0.85;
              transform: translate3d(3%, -6px, 0) rotate(-6deg);
            }
          }

          @keyframes premium-pill-glow {
            0%,
            100% {
              box-shadow:
                0 14px 34px rgba(245, 158, 11, 0.18),
                inset 0 1px 0 rgba(255, 255, 255, 0.36);
            }

            50% {
              box-shadow:
                0 18px 42px rgba(245, 158, 11, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.48);
            }
          }

          @keyframes cta-premium-shine {
            from {
              transform: translateX(-180%) skewX(-20deg);
            }

            to {
              transform: translateX(460%) skewX(-20deg);
            }
          }

          @keyframes portrait-float {
            0%,
            100% {
              transform: translate3d(0, 0, 0) scale(var(--portrait-scale));
            }

            50% {
              transform: translate3d(0, -10px, 0)
                scale(var(--portrait-scale));
            }
          }

          @keyframes portrait-aura-pulse {
            0%,
            100% {
              opacity: 0.38;
              transform: scale(0.94);
            }

            50% {
              opacity: 0.72;
              transform: scale(1.05);
            }
          }

          @keyframes ring-spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes ring-spin-reverse {
            from {
              transform: rotate(360deg);
            }

            to {
              transform: rotate(0deg);
            }
          }

          @keyframes orbit-pulse {
            0%,
            100% {
              opacity: 0.35;
              transform: scale(0.82);
            }

            50% {
              opacity: 1;
              transform: scale(1.22);
            }
          }

          @keyframes modal-backdrop-in {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes modal-card-in {
            from {
              opacity: 0;
              transform: translate3d(0, 16px, 0) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .medical-landing *,
            .medical-landing *::before,
            .medical-landing *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
              transition-duration: 0.01ms !important;
            }

            .landing-reveal {
              opacity: 1 !important;
              transform: none !important;
            }
          }

          /* ACTIVECAMPAIGN */
          .ac-modal-wrapper .${FORM_CLASS} {
            width: 100% !important;
            max-width: 430px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            background: transparent !important;
          }

          .ac-modal-wrapper .${FORM_CLASS} form,
          .ac-modal-wrapper .${FORM_CLASS} ._form-content,
          .ac-modal-wrapper .${FORM_CLASS} ._form-body {
            width: 100% !important;
            max-width: 430px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }

          .ac-modal-wrapper ._form-title,
          .ac-modal-wrapper ._form-branding {
            display: none !important;
          }

          .ac-modal-wrapper ._form_element,
          .ac-modal-wrapper ._field-wrapper,
          .ac-modal-wrapper ._button-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 0 14px !important;
          }

          .ac-modal-wrapper ._form-label {
            display: block !important;
            margin-bottom: 6px !important;
            color: #1e293b !important;
            font-size: 13px !important;
            font-weight: 700 !important;
          }

          .ac-modal-wrapper input[type="text"],
          .ac-modal-wrapper input[type="email"],
          .ac-modal-wrapper input[type="tel"],
          .ac-modal-wrapper select,
          .ac-modal-wrapper textarea {
            width: 100% !important;
            padding: 14px 16px !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 10px !important;
            outline: none !important;
            background: #f8fafc !important;
            color: #0f172a !important;
            font-size: 15px !important;
            box-shadow: none !important;
          }

          .ac-modal-wrapper input:focus,
          .ac-modal-wrapper select:focus,
          .ac-modal-wrapper textarea:focus {
            border-color: #06b6d4 !important;
            background: #ffffff !important;
            box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.16) !important;
          }

          .ac-modal-wrapper ._submit,
          .ac-modal-wrapper button[type="submit"] {
            width: 100% !important;
            padding: 16px 20px !important;
            border: 0 !important;
            border-radius: 10px !important;
            background: #f59e0b !important;
            color: #0f172a !important;
            font-size: 15px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            cursor: pointer !important;
            transition:
              transform 0.2s ease,
              background 0.2s ease !important;
          }

          .ac-modal-wrapper ._submit:hover,
          .ac-modal-wrapper button[type="submit"]:hover {
            background: #fbbf24 !important;
            transform: translateY(-1px) !important;
          }

          .ac-modal-wrapper p,
          .ac-modal-wrapper label {
            color: #475569 !important;
          }
        `}</style>
      </main>
    </>
  );
}