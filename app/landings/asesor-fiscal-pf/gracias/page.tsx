"use client";

import { useEffect } from "react";
import {
  getMetaPixelScript,
  trackMetaEvent,
  trackMetaCustomEvent,
  META_CURRENCY,
  getMetaPixelNoscriptUrl,
} from "@/lib/meta-pixel";
import Script from "next/script";

const WHATSAPP_URL = "https://chat.whatsapp.com/EWk81vocQan6cCu0UdrVeJ";

const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";

const ALFREDO_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal-pf/alfredo-pf.png`;

export default function GraciasAsesorFiscalPagePF() {
  useEffect(() => {
    document.title =
      "Ultimo Paso | Tus primeros pasos como asesor fiscal | CEFIN";

       trackMetaEvent("CompleteRegistration", {
      content_name: "Tus primeros pasos como asesor fiscal - PF | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaCustomEvent("WhatsAppGroupClick", {
      content_name: "Tus primeros pasos como asesor fiscal - PF | Click grupo WhatsApp",
      content_category: "Grupo de WhatsApp",
      funnel_step: "whatsapp_group_click",
      lead_stage: "lead_neto_intent",
      source: "thank_you_page",
      destination: "whatsapp_group",
      status: "clicked",
      value: 0,
      currency: META_CURRENCY,
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-asesor-fiscal-pf-thankyou"
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
  
    <main className="relative min-h-screen overflow-x-hidden bg-[#17100d] text-white">
      {/* Fondo y texturas */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(225,132,82,0.18),transparent_28%),radial-gradient(circle_at_84%_28%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(to_bottom,rgba(38,22,16,0.96),rgba(10,8,7,1))]" />

        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[radial-gradient(circle,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:4px_4px]" />

        <div className="thanks-brush thanks-brush-top" />
        <div className="thanks-brush thanks-brush-bottom" />
        <div className="thanks-brush thanks-brush-side" />
      </div>

      {/* Alfredo: protagonista en desktop y decoración de fondo en tablet/móvil */}
      <div className="thanks-alfredo-scene" aria-hidden="true">
        <div className="thanks-alfredo-scene-inner">
          <div className="thanks-alfredo-brush thanks-alfredo-brush-black" />
          <div className="thanks-alfredo-brush thanks-alfredo-brush-orange" />
          <div className="thanks-alfredo-brush thanks-alfredo-brush-white" />

          <img
            src={ALFREDO_IMAGE_URL}
            alt=""
            className="thanks-alfredo-image"
          />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20">
        <div className="mx-auto flex w-full max-w-[1440px] justify-end px-5 pt-4 sm:px-10 sm:pt-6 lg:px-14">
          <p className="text-2xl font-black tracking-tight text-white lg:text-3xl">
            CEFIN
          </p>
        </div>
      </header>

      {/* Contenido principal */}
      <section className="relative z-10 mx-auto flex w-full max-w-[1180px] px-4 pb-10 pt-5 sm:min-h-[calc(100vh-88px)] sm:items-center sm:px-10 sm:py-10 lg:px-14 lg:py-16">
        <div className="w-full lg:max-w-[53%] xl:max-w-[50%]">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F5A06D]">
            Registro confirmado
          </p>

          <h1
            className="mt-2 max-w-4xl text-[2.45rem] font-black uppercase leading-[0.88] text-white sm:mt-4 sm:text-6xl lg:text-[5.8rem] xl:text-[6.8rem]"
            style={{
              fontFamily: "Impact, 'Arial Narrow', sans-serif",
            }}
          >
            Ya tienes tu lugar
            <br />
            reservado
          </h1>

          <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
            Tu registro para la clase{" "}
            <span className="text-[#F5A06D]">
              Tus primeros pasos como asesor fiscal
            </span>{" "}
            fue realizado correctamente.
          </p>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/65 sm:mt-3 sm:text-base">
            Solo te falta un paso para activar tu acceso completo.
          </p>

          {/* Card única: activación de acceso */}
          <div className="thanks-reveal thanks-reveal-delay-1 mt-5 max-w-2xl sm:mt-7">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#F5A06D]/35 bg-black/35 p-1 shadow-[0_28px_80px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:rounded-[2rem]">
              <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-4 py-5 sm:rounded-[1.8rem] sm:px-8 sm:py-8">
                <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#E18452]/20 blur-3xl" />
                <div className="absolute -bottom-16 left-16 h-44 w-44 rounded-full bg-[#F5A06D]/10 blur-3xl" />

                <div className="relative">
                  {/* Encabezado */}
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#F5A06D]/35 bg-[#E18452]/15 text-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                      💬
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F5A06D]">
                        Último paso pendiente
                      </p>

                      <h2 className="mt-1 text-[1.5rem] font-black uppercase leading-[0.92] text-white sm:text-3xl">
                        Activa tu acceso por WhatsApp
                      </h2>
                    </div>
                  </div>

                  <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/75 sm:mt-5 sm:text-base">
                    Entra al grupo para recibir tu enlace, recordatorios y
                    materiales antes de la clase.
                  </p>

                  {/* CTA principal */}
                  <a
                    href={WHATSAPP_URL}
                    onClick={handleWhatsAppClick}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-cta group relative mt-5 flex min-h-[76px] w-full items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/25 bg-gradient-to-r from-[#9F4F31] via-[#C66A42] to-[#E18452] px-4 py-4 text-center text-[15px] font-black uppercase tracking-[0.07em] text-white shadow-[0_24px_65px_rgba(0,0,0,0.58)] ring-4 ring-[#F5A06D]/20 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.66)] active:translate-y-0 active:scale-[0.98] sm:mt-6 sm:min-h-[74px] sm:max-w-[500px] sm:px-5 sm:py-5 sm:text-base"
                  >
                    <span className="absolute inset-y-0 left-[-35%] w-[30%] rotate-12 bg-white/30 blur-md transition duration-700 group-hover:left-[120%]" />

                    <span className="relative mr-3 text-3xl leading-none">»</span>

                    <span className="relative sm:hidden">Entrar a WhatsApp</span>

                    <span className="relative hidden sm:inline">
                      Entrar al grupo de WhatsApp
                    </span>
                  </a>

                  <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-[0.11em] text-[#F6B18A] sm:mt-4 sm:text-xs sm:tracking-[0.12em] sm:text-left">
                    Al entrar al grupo, tu inscripción queda completada.
                  </p>

                  {/* Separador */}
                  <div className="my-4 h-px w-full bg-white/10 sm:my-6" />

                  {/* Progreso compacto */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F5A06D]">
                        Progreso de inscripción
                      </p>

                      <h3 className="mt-1 text-base font-black uppercase text-white sm:text-xl">
                        Tu acceso va al 80%
                      </h3>
                    </div>

                    <span className="shrink-0 rounded-full border border-[#F5A06D]/25 bg-[#F5A06D]/10 px-3 py-1 text-xs font-black text-[#F5A06D]">
                      Falta 1 paso
                    </span>
                  </div>

                  <div className="mt-3 h-3 overflow-hidden rounded-full border border-white/10 bg-black/35 p-[3px] sm:mt-4">
                    <div className="thanks-progress-fill h-full rounded-full bg-gradient-to-r from-[#9F4F31] via-[#E18452] to-[#F6B18A]" />
                  </div>

                  {/* Pasos */}
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
                    <div className="flex items-center gap-2 rounded-2xl border border-[#F5A06D]/20 bg-[#F5A06D]/[0.08] px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5A06D] text-xs font-black text-[#24110a] sm:h-7 sm:w-7 sm:text-sm">
                        ✓
                      </span>

                      <div>
                        <p className="text-[10px] font-black uppercase leading-tight tracking-wide text-white sm:text-xs">
                          Registro enviado
                        </p>

                        <p className="mt-1 text-[10px] font-medium leading-tight text-white/55 sm:text-xs">
                          Tu lugar ya quedó apartado.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border border-[#F5A06D]/25 bg-black/20 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#F5A06D]/55 text-xs font-black text-[#F5A06D] sm:h-7 sm:w-7 sm:text-sm">
                        2
                      </span>

                      <div>
                        <p className="text-[10px] font-black uppercase leading-tight tracking-wide text-white sm:text-xs">
                          Entrar a WhatsApp
                        </p>

                        <p className="mt-1 text-[10px] font-medium leading-tight text-white/55 sm:text-xs">
                          Pendiente para activar tu acceso.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .thanks-brush {
          position: absolute;
          pointer-events: none;
          background: #050505;
          filter: drop-shadow(0 22px 40px rgba(0, 0, 0, 0.34));
        }

        .thanks-brush-top {
          top: 7%;
          left: -8%;
          width: 56%;
          height: 26%;
          opacity: 0.88;
          clip-path: polygon(
            0 18%,
            12% 8%,
            28% 15%,
            42% 5%,
            58% 13%,
            73% 6%,
            100% 20%,
            92% 40%,
            100% 57%,
            81% 66%,
            87% 84%,
            61% 77%,
            45% 93%,
            28% 79%,
            12% 88%,
            0 68%
          );
        }

        .thanks-brush-bottom {
          bottom: -4%;
          right: -9%;
          width: 56%;
          height: 22%;
          opacity: 0.78;
          clip-path: polygon(
            0 28%,
            16% 12%,
            31% 23%,
            48% 10%,
            64% 26%,
            82% 14%,
            100% 28%,
            92% 50%,
            100% 76%,
            79% 66%,
            61% 88%,
            42% 70%,
            18% 84%,
            0 67%
          );
        }

        .thanks-brush-side {
          top: 31%;
          right: -11%;
          width: 25%;
          height: 20%;
          opacity: 0.65;
          clip-path: polygon(
            0 30%,
            19% 12%,
            37% 24%,
            56% 8%,
            79% 20%,
            100% 12%,
            92% 39%,
            100% 61%,
            78% 73%,
            57% 64%,
            35% 84%,
            13% 68%
          );
        }

        .thanks-alfredo-scene {
          position: absolute;
          z-index: 1;
          top: clamp(7.5rem, 10vh, 9.5rem);
          right: clamp(1rem, 4vw, 5.5rem);
          width: min(44vw, 620px);
          height: min(72vh, 700px);
          pointer-events: none;
        }

        .thanks-alfredo-scene-inner {
          position: relative;
          width: 100%;
          height: 100%;
          animation: thanksAlfredoEnter 900ms cubic-bezier(0.22, 1, 0.36, 1)
            180ms both;
        }

        .thanks-alfredo-brush {
          position: absolute;
          pointer-events: none;
          filter: drop-shadow(0 22px 42px rgba(0, 0, 0, 0.34));
        }

        .thanks-alfredo-brush-black {
          right: -3%;
          bottom: 2%;
          width: 106%;
          height: 43%;
          background: #050505;
          opacity: 0.92;
          clip-path: polygon(
            0 39%,
            11% 27%,
            24% 35%,
            39% 17%,
            56% 30%,
            76% 15%,
            100% 28%,
            90% 49%,
            100% 72%,
            74% 65%,
            56% 88%,
            36% 69%,
            17% 82%,
            0 67%
          );
        }

        .thanks-alfredo-brush-orange {
          right: -8%;
          bottom: 19%;
          width: 96%;
          height: 48%;
          background: linear-gradient(
            90deg,
            rgba(225, 132, 82, 0.08),
            rgba(225, 132, 82, 0.8)
          );
          opacity: 0.9;
          filter: blur(1px) drop-shadow(0 0 34px rgba(225, 132, 82, 0.38));
          clip-path: polygon(
            0 44%,
            18% 31%,
            32% 38%,
            48% 22%,
            66% 33%,
            100% 17%,
            91% 41%,
            100% 61%,
            72% 54%,
            58% 80%,
            40% 62%,
            22% 74%
          );
        }

        .thanks-alfredo-brush-white {
          right: -2%;
          bottom: 10%;
          width: 107%;
          height: 64%;
          background: #fff4e8;
          opacity: 0.96;
          clip-path: polygon(
            0 47%,
            9% 36%,
            18% 42%,
            27% 28%,
            41% 33%,
            53% 18%,
            68% 28%,
            82% 13%,
            100% 23%,
            91% 42%,
            100% 56%,
            84% 62%,
            94% 78%,
            69% 72%,
            58% 91%,
            45% 76%,
            24% 86%,
            14% 68%,
            0 75%
          );
        }

        .thanks-alfredo-image {
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 2;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: bottom right;
          filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.62));
          transform-origin: center bottom;
          animation: thanksAlfredoFloat 7s ease-in-out 1.2s infinite;
          will-change: transform;
        }

        @keyframes thanksReveal {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.985);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes thanksAlfredoEnter {
          from {
            opacity: 0;
            transform: translate3d(40px, 36px, 0) scale(0.96);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes thanksAlfredoFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-6px) scale(1.008);
          }
        }

        @keyframes whatsappPulse {
          0%,
          100% {
            box-shadow:
              0 20px 55px rgba(0, 0, 0, 0.5),
              0 0 0 0 rgba(225, 132, 82, 0.28);
          }

          50% {
            box-shadow:
              0 28px 70px rgba(0, 0, 0, 0.62),
              0 0 0 10px rgba(225, 132, 82, 0);
          }
        }

        @keyframes thanksProgressFill {
          from {
            width: 0%;
          }

          to {
            width: 80%;
          }
        }

        .thanks-reveal {
          animation: thanksReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .thanks-reveal-delay-1 {
          animation-delay: 220ms;
        }

        .whatsapp-cta {
          animation: whatsappPulse 2.8s ease-in-out 1.4s infinite;
        }

        .thanks-progress-fill {
          width: 80%;
          animation: thanksProgressFill 1.1s cubic-bezier(0.22, 1, 0.36, 1)
            450ms both;
        }

        @media (max-width: 1023px) {
          .thanks-alfredo-scene {
            top: 11.25rem;
            right: -8%;
            width: 104vw;
            height: 35rem;
            opacity: 0.12;
            filter: saturate(0.88) contrast(0.95);
          }

          .thanks-alfredo-scene-inner {
            transform: translateX(0);
          }

          .thanks-alfredo-brush-white {
            opacity: 0.58;
          }

          .thanks-alfredo-brush-orange {
            opacity: 0.44;
          }

          .thanks-alfredo-image {
            object-position: center bottom;
            filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.38));
          }
        }

        @media (max-width: 768px) {
          .thanks-brush-top {
            left: -30%;
            top: 8%;
            width: 112%;
            height: 17%;
          }

          .thanks-brush-bottom {
            right: -32%;
            width: 96%;
            height: 16%;
          }

          .thanks-brush-side {
            right: -34%;
            top: 23%;
            width: 64%;
            height: 13%;
          }
        }

        @media (max-width: 430px) {
          .thanks-alfredo-scene {
            top: 10.75rem;
            right: -4%;
            width: 108vw;
            height: 33rem;
            opacity: 0.11;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .thanks-reveal,
          .whatsapp-cta,
          .thanks-alfredo-scene-inner,
          .thanks-alfredo-image {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }

          .thanks-progress-fill {
            animation: none !important;
            width: 80% !important;
          }
        }
      `}</style>
    </main>
    </>
  );
}
