"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

/* ==========================================================================
   CONFIGURACIÓN RÁPIDA
   ========================================================================== */

// PEGA AQUÍ TU LINK REAL DEL GRUPO.
const WHATSAPP_URL = "https://chat.whatsapp.com/IEX73zqxQIC1j0Yjyen1Ez";

const EVENT_DATE = "Martes 14 de julio";
const EVENT_TIME = "11:00 AM";
const EVENT_TIMEZONE = "Hora CDMX";

const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";

const MEDICAL_BACKGROUND_IMAGE_URL = `${ASSET_BASE}/medicos/Fondo-medicos.jpg`;
const MARISOL_IMAGE_URL = `${ASSET_BASE}/medicos/Marisol-medicos.png`;
const MARISOL_IMAGE_TABLET_URL = `${ASSET_BASE}/medicos/Marisol-medicos-1024.png`;
const MARISOL_IMAGE_MOBILE_URL = `${ASSET_BASE}/medicos/Marisol-medicos-720.png`;

export default function GraciasAsesorFiscalMedicosPage() {
  useEffect(() => {
    document.title =
      "Último paso | Contabilidad e Impuestos para Médicos | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name:
        "Contabilidad e Impuestos para Médicos | Formulario completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

const handleWhatsAppClick = () => {
  trackMetaEvent("WhatsAppGroupClick", {
    content_name:
      "Contabilidad e Impuestos para Médicos | Click grupo WhatsApp",
    content_category: "Grupo de WhatsApp",
    funnel_step: "whatsapp_group_click",
    lead_stage: "lead_neto_intent",
    source: "thank_you_page",
    destination: "whatsapp_group",
    status: "clicked",
    value: 0,
    currency: META_CURRENCY,
  });

  if (!WHATSAPP_URL) return;

  window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
};

  return (
    <>
      <Script
        id="meta-pixel-asesor-fiscal-medicos-thankyou"
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

      <main className="medical-thankyou relative min-h-[100svh] overflow-x-hidden bg-[#020817] text-white">
        {/* ================================================================
            FONDO MÉDICO PREMIUM
           ================================================================ */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div
            className="medical-background-image absolute inset-0 bg-cover bg-center opacity-55 blur-[1px]"
            style={{
              backgroundImage: `url("${MEDICAL_BACKGROUND_IMAGE_URL}")`,
            }}
          />

          <div className="absolute inset-0 bg-[#020817]/78" />

          <div className="medical-grid absolute inset-0" />

          <div className="medical-orb medical-orb--one" />
          <div className="medical-orb medical-orb--two" />
          <div className="medical-orb medical-orb--three" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_28%,rgba(34,211,238,0.18)_0%,transparent_27%),radial-gradient(circle_at_18%_85%,rgba(30,144,255,0.16)_0%,transparent_34%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.98)_0%,rgba(2,8,23,0.90)_54%,rgba(2,8,23,0.44)_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,8,23,0.06)_0%,rgba(2,8,23,0.32)_55%,#020817_100%)]" />

          <div className="medical-light-trail" />

          {/* Marisol desktop */}
          <img
            src={MARISOL_IMAGE_URL}
            srcSet={`${MARISOL_IMAGE_TABLET_URL} 1024w, ${MARISOL_IMAGE_URL} 1367w`}
            sizes="(min-width: 1900px) 60vw, (min-width: 1700px) 58vw, 54vw"
            alt=""
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
            className="medical-desktop-portrait absolute bottom-[-6%] right-[-4%] hidden h-[88%] w-[50%] object-contain object-bottom opacity-90 drop-shadow-[0_32px_75px_rgba(0,0,0,0.72)] lg:block"
          />

          {/* Marisol móvil y tablet */}
          <img
            src={MARISOL_IMAGE_MOBILE_URL}
            srcSet={`${MARISOL_IMAGE_MOBILE_URL} 720w, ${MARISOL_IMAGE_TABLET_URL} 1024w`}
            sizes="(max-width: 767px) 58vw, 48vw"
            alt=""
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
            className="medical-mobile-portrait absolute bottom-[-8%] right-[-22%] h-[60%] w-auto max-w-none object-contain object-bottom opacity-20 drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)] lg:hidden"
          />
        </div>

        {/* ================================================================
            HEADER
           ================================================================ */}
        <header className="relative z-20">
          <div className="medical-shell medical-header-shell mx-auto flex w-full justify-end px-5 py-5 lg:px-12 lg:py-6 xl:px-16">
            <p className="landing-reveal landing-reveal--1 text-2xl font-black tracking-tight text-white lg:text-3xl">
              CEFIN
            </p>
          </div>
        </header>

        {/* ================================================================
            CONTENIDO
           ================================================================ */}
        <section className="relative z-10">
          <div className="medical-shell medical-thankyou-shell mx-auto flex min-h-[calc(100svh-72px)] w-full items-center px-5 pb-10 lg:px-12 lg:pb-14 xl:px-16">
            <div className="medical-thankyou-content w-full max-w-[760px]">
              <div className="landing-reveal landing-reveal--2 premium-status-pill inline-flex items-center gap-3 rounded-full border border-orange-300/35 bg-orange-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.19em] text-orange-100 sm:text-[11px]">
                <span className="h-2 w-2 rounded-full bg-orange-300 shadow-[0_0_16px_rgba(253,186,116,0.95)]" />
                Registro incompleto · 80%
              </div>

              <h1 className="landing-reveal landing-reveal--3 mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-[5.2rem]">
                Tu registro aún
                <span className="block text-orange-400">no está completo</span>
              </h1>

              <p className="landing-reveal landing-reveal--4 mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/86 sm:text-xl">
                Ya recibimos tus datos para la clase gratuita de{" "}
                <span className="font-black text-cyan-300">
                  Contabilidad e Impuestos para Médicos
                </span>
                , pero todavía debes entrar al grupo de WhatsApp para completar
                tu registro y recibir el enlace de acceso.
              </p>
              {/* ============================================================
                  CARD DEL PASO FINAL
                 ============================================================ */}
              <div className="landing-reveal landing-reveal--6 thankyou-action-card mt-6 border border-cyan-300/20 bg-[#071a31]/82 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.48)] backdrop-blur-md sm:p-6">
                <div className="relative z-10 flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em]">
                  <span className="text-cyan-200">Registro incompleto</span>
                  <span className="text-orange-300">80%</span>
                </div>

                <p className="relative z-10 mt-3 text-sm font-black uppercase leading-relaxed text-white sm:text-base">
                  Te falta entrar al grupo de WhatsApp
                </p>

                <div className="relative z-10 mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-400 shadow-[0_0_18px_rgba(34,211,238,0.62)]" />
                </div>

                <div className="relative z-10 mt-5 grid grid-cols-2 gap-3">
                  <div className="border border-white/10 bg-black/[0.22] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/46">
                      Fecha
                    </p>

                    <p className="mt-1 text-base font-black text-orange-300 sm:text-lg">
                      {EVENT_DATE}
                    </p>
                  </div>

                  <div className="border border-white/10 bg-black/[0.22] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/46">
                      Hora
                    </p>

                    <p className="mt-1 text-base font-black text-cyan-200 sm:text-lg">
                      {EVENT_TIME}
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-white/50">
                      {EVENT_TIMEZONE}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="thankyou-whatsapp-button group relative z-10 mt-5 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#62F9A7_0%,#25D366_48%,#16B75A_100%)] px-6 py-5 text-center text-base font-black uppercase text-[#052b14] ring-2 ring-[#91FFD0]/50 shadow-[0_0_0_1px_rgba(255,255,255,0.24),0_22px_60px_rgba(37,211,102,0.52),0_0_40px_rgba(88,249,167,0.34)] transition duration-200 hover:scale-[1.01] hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 sm:text-lg"
                >
                  <span className="relative z-10">
                    Entrar ahora al grupo de WhatsApp
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative z-10 text-xl leading-none transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>

                  <span
                    aria-hidden="true"
                    className="thankyou-whatsapp-shine absolute inset-y-0 left-0 w-1/3"
                  />
                </button>

                <p className="relative z-10 mt-3 text-center text-xs font-black uppercase leading-relaxed tracking-[0.1em] text-orange-200">
                  Sin entrar al grupo, no recibirás el enlace de acceso
                </p>
              </div>
              <div className="landing-reveal landing-reveal--5 thankyou-warning mt-6 border-l-4 border-orange-400 bg-black/30 px-5 py-4 backdrop-blur-sm">
                <p className="text-base font-black uppercase leading-relaxed text-white sm:text-lg">
                  Importante: el enlace de la clase se enviará únicamente por el
                  grupo de WhatsApp.
                </p>

                <p className="mt-2 text-sm font-semibold leading-relaxed text-white/70">
                  Si sales de esta página sin entrar al grupo, tu registro
                  quedará incompleto y podrías no recibir el acceso para
                  conectarte.
                </p>
              </div>

              <div className="landing-reveal landing-reveal--7 mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  "Recibirás el enlace de acceso",
                  "Te recordaremos antes de iniciar",
                  "Conocerás cualquier cambio importante",
                ].map((item) => (
                  <div
                    key={item}
                    className="thankyou-benefit-card border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-3 text-sm font-semibold leading-relaxed text-white/78"
                  >
                    <span className="mr-2 font-black text-cyan-300">+</span>
                    {item}
                  </div>
                ))}
              </div>

              <p className="landing-reveal landing-reveal--8 mt-6 text-sm font-semibold text-white/60">
                Clase impartida por{" "}
                <span className="font-black text-white">
                  C.P. Marisol Galván
                </span>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .medical-thankyou {
          isolation: isolate;
        }

        .medical-shell {
          width: min(100%, 1600px);
        }

        .medical-background-image {
          animation: medical-background-drift 24s ease-in-out infinite alternate;
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

        .medical-desktop-portrait {
          animation: thankyou-portrait-float 6s ease-in-out infinite;
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

        .premium-status-pill {
          box-shadow:
            0 14px 34px rgba(251, 146, 60, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          animation:
            landing-reveal-up 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards,
            premium-status-glow 3.4s ease-in-out infinite 1.2s;
        }

        .thankyou-warning {
          box-shadow:
            0 16px 42px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .thankyou-action-card {
          position: relative;
          overflow: hidden;
        }

        .thankyou-action-card::before {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
          background: radial-gradient(
            circle at 75% 0%,
            rgba(34, 211, 238, 0.12),
            transparent 38%
          );
        }

        .thankyou-whatsapp-button {
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.22),
            0 22px 60px rgba(37, 211, 102, 0.52),
            0 0 42px rgba(88, 249, 167, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.42);
        }

        .thankyou-whatsapp-button:hover .thankyou-whatsapp-shine {
          animation: thankyou-whatsapp-shine 0.82s ease forwards;
        }

        .thankyou-whatsapp-shine {
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.72),
            transparent
          );
          transform: translateX(-180%) skewX(-20deg);
        }

        .thankyou-benefit-card {
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        .thankyou-benefit-card:hover {
          transform: translateY(-3px);
          border-color: rgba(103, 232, 249, 0.52);
          background: rgba(34, 211, 238, 0.11);
          box-shadow: 0 16px 34px rgba(8, 145, 178, 0.12);
        }

        /* Móvil compacto */
        @media (max-width: 374px) {
          .medical-header-shell {
            padding-top: 0.9rem;
            padding-bottom: 0.9rem;
          }

          .medical-thankyou-shell {
            align-items: flex-start;
            padding-top: 0.7rem;
          }

          .medical-thankyou-content h1 {
            font-size: 2.45rem;
          }

          .medical-thankyou-content .grid.grid-cols-2,
          .medical-thankyou-content .sm\\:grid-cols-3 {
            grid-template-columns: 1fr;
          }

          .medical-mobile-portrait {
            right: -32%;
            bottom: -8%;
            height: 46%;
            opacity: 0.13;
          }
        }

        /* Móvil y tablet vertical */
        @media (max-width: 1023px) {
          .medical-thankyou-shell {
            align-items: flex-start;
            padding-top: clamp(1rem, 4vh, 2.6rem);
          }

          .medical-thankyou-content {
            max-width: 100%;
          }

          .medical-thankyou-content h1 {
            font-size: clamp(2.7rem, 10vw, 4.4rem);
          }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
          .medical-shell {
            width: min(100%, 920px);
          }

          .medical-header-shell,
          .medical-thankyou-shell {
            padding-right: clamp(2rem, 7vw, 5rem);
            padding-left: clamp(2rem, 7vw, 5rem);
          }

          .medical-thankyou-content {
            max-width: 720px;
          }

          .medical-mobile-portrait {
            right: -10%;
            bottom: -10%;
            height: 66%;
            opacity: 0.2;
          }
        }

        /* Desktop amplio */
        @media (min-width: 1440px) {
          .medical-shell {
            width: min(100%, 1750px);
          }

          .medical-header-shell,
          .medical-thankyou-shell {
            padding-right: clamp(3rem, 5vw, 6rem);
            padding-left: clamp(3rem, 5vw, 6rem);
          }

          .medical-thankyou-content {
            max-width: 820px;
            transform: translateY(-2vh);
          }

          .medical-desktop-portrait {
            right: -2%;
            width: 54%;
            height: 91%;
          }
        }

        /* Monitor grande / 27" */
        @media (min-width: 1700px) {
          .medical-shell {
            width: min(100%, 1880px);
          }

          .medical-header-shell,
          .medical-thankyou-shell {
            padding-right: clamp(4rem, 6vw, 8rem);
            padding-left: clamp(4rem, 6vw, 8rem);
          }

          .medical-thankyou-content {
            max-width: 900px;
            transform: translateY(-3vh);
          }

          .medical-thankyou-content h1 {
            font-size: clamp(4.8rem, 4.8vw, 6.4rem);
          }

          .medical-desktop-portrait {
            right: 0;
            width: 58%;
            height: 96%;
          }
        }

        /* Ultrawide */
        @media (min-width: 1900px) {
          .medical-shell {
            width: min(100%, 2100px);
          }

          .medical-header-shell,
          .medical-thankyou-shell {
            padding-right: clamp(5rem, 7vw, 10rem);
            padding-left: clamp(5rem, 7vw, 10rem);
          }

          .medical-thankyou-content {
            max-width: 980px;
          }

          .medical-desktop-portrait {
            width: 60%;
            height: 99%;
          }
        }

        /* Pantallas bajas */
        @media (min-width: 1024px) and (max-height: 820px) {
          .medical-header-shell {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

          .medical-thankyou-shell {
            min-height: calc(100vh - 64px);
            padding-bottom: 1.5rem;
          }

          .medical-thankyou-content {
            transform: none;
          }

          .medical-thankyou-content h1 {
            font-size: clamp(3.3rem, 4.6vw, 4.75rem);
          }

          .medical-thankyou-content .mt-6 {
            margin-top: 1rem;
          }

          .medical-thankyou-content .mt-5 {
            margin-top: 0.9rem;
          }

          .medical-desktop-portrait {
            height: 80%;
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

        @keyframes thankyou-portrait-float {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -9px, 0);
          }
        }

        @keyframes premium-status-glow {
          0%,
          100% {
            box-shadow:
              0 14px 34px rgba(251, 146, 60, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.12);
          }

          50% {
            box-shadow:
              0 18px 42px rgba(251, 146, 60, 0.34),
              inset 0 1px 0 rgba(255, 255, 255, 0.18);
          }
        }

        @keyframes thankyou-whatsapp-shine {
          from {
            transform: translateX(-180%) skewX(-20deg);
          }

          to {
            transform: translateX(460%) skewX(-20deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .medical-thankyou *,
          .medical-thankyou *::before,
          .medical-thankyou *::after {
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
      `}</style>
    </>
  );
}
