"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 267;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const TEXTURE_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal-pf/textura-papel.jpg`;
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal-pf/alfredo-pf.png`;

export default function AsesorFiscalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Tus primeros pasos como asesor fiscal | Clase Gratis | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Tus primeros pasos como asesor fiscal | Personas físicas",
      content_category: "Clase gratuita",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousScript = document.getElementById(
      "active-campaign-asesor-fiscal",
    );

    if (previousScript) {
      previousScript.remove();
    }

    const formContainer = document.querySelector(`.${FORM_CLASS}`);

    if (formContainer) {
      formContainer.innerHTML = "";
    }

    const script = document.createElement("script");

    script.id = "active-campaign-asesor-fiscal";
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
    trackMetaEvent("Lead", {
      content_name: "Tus primeros pasos como asesor fiscal | Abrir formulario",
      content_category: "Clase gratuita",
      status: "form_opened",
    });

    setIsModalOpen(true);
  };

  return (
    <>
      <Script
        id="meta-pixel-asesor-fiscal-pf"
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

      <main className="relative min-h-[100svh] overflow-x-hidden overflow-y-auto bg-[#3A241D] text-white">
        {/* Fondo editorial */}
        <div className="pointer-events-none absolute inset-0 z-0 landing-bg">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-55"
            style={{
              backgroundImage: `url("${TEXTURE_IMAGE_URL}")`,
            }}
          />
          <div className="absolute inset-0 bg-[#3A241D]/65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.18)_0%,transparent_34%),radial-gradient(circle_at_72%_34%,rgba(184,95,58,0.26)_0%,transparent_30%)]" />
          <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[radial-gradient(circle,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:4px_4px]" />
          <div className="brush brush-top-left" />
          <div className="brush brush-bottom-left" />
          <div className="brush brush-top-right" />
          <div className="absolute bottom-0 right-0 h-[46%] w-[70%] bg-[radial-gradient(circle,rgba(0,0,0,0.45)_1px,transparent_1px)] [background-size:10px_10px] opacity-45 lg:w-[42%]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.34)_56%,rgba(0,0,0,0.82)_100%)]" />{" "}
        </div>

        {/* Encabezado */}
        <header className="relative z-30">
          <div className="mx-auto flex w-full max-w-[1500px] items-center justify-end px-5 pt-6 sm:px-8 lg:px-12 xl:px-16">
            <p className="text-xl font-black tracking-tight text-white lg:text-3xl">
              CEFIN
            </p>
          </div>
        </header>

        {/* Hero */}
        <section className="relative z-20">
          <div className="mx-auto grid min-h-[calc(100svh-48px)] w-full max-w-[1500px] items-center gap-6 px-5 pb-8 pt-4 sm:px-8 md:gap-8 lg:min-h-[calc(100vh-84px)] lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-10 xl:px-16">
            {/* Alfredo */}
            <div className="hero-photo relative z-20 order-1 mx-auto flex h-[230px] w-full max-w-[340px] items-end justify-center sm:h-[280px] sm:max-w-[390px] md:h-[330px] lg:order-2 lg:col-span-5 lg:h-[min(72vh,720px)] lg:max-w-none lg:justify-end">
              <div className="brush brush-photo-white" />
              <div className="brush brush-photo-orange" />
              <div className="brush brush-photo-black" />
              <img
                src={ALFREDO_IMAGE_URL}
                alt="Mtro. Alfredo Cobos"
                className="hero-image relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_32px_70px_rgba(0,0,0,0.70)]"
              />
            </div>

            {/* Información */}
            <div className="hero-copy relative z-30 order-2 overflow-visible text-center lg:order-1 lg:col-span-7 lg:max-w-[760px] lg:text-left">
              <p className="hero-reveal hero-reveal-delay-0 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.28)] backdrop-blur-md">
                ● Curso gratuito en vivo
              </p>

              <h1
                className="hero-reveal hero-reveal-delay-1 premium-title mt-5 text-[2.8rem] font-black uppercase italic text-white sm:text-[4.1rem] md:text-[4.9rem] lg:text-[5.3rem] xl:text-[6.6rem]"
                style={{
                  fontFamily: "Impact, 'Arial Narrow', sans-serif",
                }}
              >
                <span className="block leading-[0.86]">Tus primeros</span>
                <span className="block leading-[0.86]">pasos</span>
                <span className="block leading-[0.86]">como asesor</span>

                <span className="premium-fiscal">Fiscal</span>
              </h1>

              <div className="hero-reveal hero-reveal-delay-2 mx-auto mt-4 flex max-w-[420px] items-center justify-center gap-3 lg:mx-0 lg:justify-start">
                <span className="h-px flex-1 bg-white/25" />
                <p className="text-sm font-black uppercase tracking-[0.32em] text-[#F1B08A] sm:text-base">
                  Personas físicas
                </p>
                <span className="h-px flex-1 bg-white/25" />
              </div>

              <p className="hero-reveal hero-reveal-delay-3 mx-auto mt-5 max-w-xl text-base font-bold leading-relaxed text-white/90 lg:ml-0 lg:mr-auto lg:text-lg">
                Aprende cómo comenzar a ofrecer asesoría fiscal para personas
                físicas con mayor claridad, estructura y seguridad profesional.
              </p>

              <button
                type="button"
                onClick={openRegistrationModal}
                className="hero-reveal hero-reveal-delay-4 cta-pulse group relative mx-auto mt-7 flex min-h-[62px] w-full max-w-[420px] items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/20 bg-gradient-to-r from-[#E18452] via-[#C66A42] to-[#9F4F31] px-7 py-5 text-center text-base font-black uppercase tracking-[0.1em] text-white shadow-[0_24px_65px_rgba(0,0,0,0.55)] ring-4 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.62)] active:translate-y-0 active:scale-[0.98] lg:mx-0 lg:w-auto lg:px-11 lg:text-base"
              >
                <span className="absolute inset-y-0 left-[-35%] w-[30%] rotate-12 bg-white/30 blur-md transition duration-700 group-hover:left-[120%]" />
                <span className="relative mr-4 text-3xl leading-none">»</span>
                <span className="relative">Quiero mi lugar gratis</span>
              </button>
              <p className="hero-reveal hero-reveal-delay-5 mx-auto mt-3 max-w-[360px] text-center text-xs font-bold uppercase tracking-[0.14em] text-white/70 lg:mx-0 lg:text-left">
                Registro sin costo · cupo sujeto a disponibilidad
              </p>

              <div className="hero-reveal hero-reveal-delay-6 mt-6 grid grid-cols-3 gap-2 sm:gap-3 lg:mt-7 lg:max-w-[640px]">
                {[
                  ["📅", "7 de julio", "2026"],
                  ["🕚", "11:00 AM", "Hora CDMX"],
                  ["📡", "En línea", "Clase gratuita"],
                ].map(([icon, title, detail]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-4 text-left shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md"
                  >
                    <p className="text-lg sm:text-xl">{icon}</p>
                    <p className="mt-2 text-[11px] font-black uppercase leading-tight tracking-wide text-white sm:text-sm">
                      {" "}
                      {title}
                    </p>
                    <p className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-white/55 sm:text-xs">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hero-reveal hero-reveal-delay-7 mt-5 lg:mt-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/80 lg:text-sm">
                  Impartido por
                </p>

                <p className="mt-1 text-base font-black uppercase tracking-[0.16em] text-white lg:text-lg">
                  Mtro. Alfredo Cobos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modal del formulario */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071019]/90 p-3 backdrop-blur-md sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
          >
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-lg border-t-8 border-[#A85A3A] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.60)]">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 z-10 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar formulario"
              >
                ×
              </button>

              <div className="shrink-0 px-6 pb-4 pt-8 text-center sm:px-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0897a3]">
                  Clase gratuita en vivo
                </p>

                <h2
                  id="registration-title"
                  className="mt-2 text-2xl font-black uppercase leading-tight text-[#071019]"
                >
                  Tus primeros pasos como asesor fiscal
                </h2>

                <p className="mt-1 text-lg font-black text-[#D6A900]">
                  Personas físicas
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Completa tus datos para asegurar tu lugar.
                </p>

                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Martes 7 de julio · 11:00 AM · Hora CDMX · Clase en línea
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 sm:px-8 sm:pb-8">
                <div className="ac-modal-wrapper min-h-[400px]">
                  <div className={FORM_CLASS}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          @keyframes heroReveal {
            from {
              opacity: 0;
              transform: translateY(22px) scale(0.98);
              filter: blur(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes photoReveal {
            from {
              opacity: 0;
              transform: translateY(34px) scale(0.96);
              filter: blur(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes heroFloat {
            0% {
              transform: translateY(0px) scale(1);
            }

            50% {
              transform: translateY(-6px) scale(1.008);
            }

            100% {
              transform: translateY(0px) scale(1);
            }
          }

          @keyframes heroGlow {
            0% {
              filter: drop-shadow(0 32px 70px rgba(0, 0, 0, 0.55));
            }

            50% {
              filter: drop-shadow(0 42px 90px rgba(0, 0, 0, 0.72));
            }

            100% {
              filter: drop-shadow(0 32px 70px rgba(0, 0, 0, 0.55));
            }
          }

          @keyframes backgroundDrift {
            from {
              transform: scale(1.02) translate3d(0, 0, 0);
            }
            to {
              transform: scale(1.05) translate3d(-10px, -8px, 0);
            }
          }

          @keyframes ctaPulse {
            0%,
            100% {
              box-shadow:
                0 24px 65px rgba(0, 0, 0, 0.55),
                0 0 0 0 rgba(225, 132, 82, 0.32);
            }
            50% {
              box-shadow:
                0 30px 80px rgba(0, 0, 0, 0.62),
                0 0 0 10px rgba(225, 132, 82, 0);
            }
          }

          .landing-bg {
            animation: backgroundDrift 18s ease-in-out infinite alternate;
            transform-origin: center;
          }

          .hero-photo {
            animation: photoReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-delay: 180ms;
          }

          .hero-image {
            animation:
              heroFloat 7s ease-in-out 1.2s infinite,
              heroGlow 7s ease-in-out 1.2s infinite;
            transform-origin: center bottom;
            will-change: transform, filter;
          }

          .hero-reveal {
            animation: heroReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .hero-reveal-delay-1 {
            animation-delay: 100ms;
          }

          .hero-reveal-delay-2 {
            animation-delay: 180ms;
          }

          .hero-reveal-delay-3 {
            animation-delay: 260ms;
          }

          .hero-reveal-delay-4 {
            animation-delay: 340ms;
          }

          .hero-reveal-delay-5 {
            animation-delay: 420ms;
          }

          .hero-reveal-delay-6 {
            animation-delay: 500ms;
          }

          .hero-reveal-delay-7 {
            animation-delay: 580ms;
          }

          .cta-pulse {
            animation:
              heroReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) 340ms both,
              ctaPulse 2.6s ease-in-out 1.3s infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .landing-bg,
            .hero-photo,
            .hero-reveal,
            .cta-pulse {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
            .hero-image {
              animation: none !important;
            }
          }

          .brush {
            position: absolute;
            pointer-events: none;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            filter: drop-shadow(0 22px 40px rgba(0, 0, 0, 0.32));
          }

          .brush::before,
          .brush::after {
            content: "";
            position: absolute;
            inset: 0;
            background: inherit;
            clip-path: inherit;
            opacity: 0.45;
            transform: translate(18px, 10px) scaleX(0.96);
          }

          .brush::after {
            opacity: 0.28;
            transform: translate(-14px, -8px) scaleX(1.03);
          }

          .brush-top-left {
            left: -7%;
            top: 8%;
            z-index: 1;
            width: 62%;
            height: 33%;
            background: #050505;
            clip-path: polygon(
              0 18%,
              8% 11%,
              19% 14%,
              29% 6%,
              43% 13%,
              55% 5%,
              72% 12%,
              90% 7%,
              100% 18%,
              94% 32%,
              100% 45%,
              88% 55%,
              97% 68%,
              77% 72%,
              83% 85%,
              60% 80%,
              51% 94%,
              37% 82%,
              24% 92%,
              16% 74%,
              3% 80%,
              9% 56%,
              0 48%
            );
          }

          .brush-bottom-left {
            left: -12%;
            bottom: -2%;
            z-index: 1;
            width: 45%;
            height: 18%;
            background: #020202;
            clip-path: polygon(
              0 38%,
              13% 24%,
              27% 32%,
              42% 18%,
              58% 28%,
              72% 14%,
              100% 34%,
              93% 55%,
              100% 76%,
              74% 66%,
              61% 88%,
              42% 72%,
              24% 86%,
              12% 66%,
              0 72%
            );
          }

          .brush-top-right {
            right: -9%;
            top: 20%;
            z-index: 1;
            width: 28%;
            height: 17%;
            background: #050505;
            opacity: 0.82;
            clip-path: polygon(
              0 36%,
              18% 16%,
              36% 24%,
              53% 10%,
              77% 21%,
              100% 13%,
              94% 38%,
              100% 58%,
              80% 72%,
              62% 62%,
              43% 86%,
              21% 68%,
              5% 76%
            );
          }

          .brush-photo-white {
            bottom: 9%;
            right: -2%;
            z-index: 1;
            width: 105%;
            height: 66%;
            background: #fff4e8;
            opacity: 0.96;
            clip-path: polygon(
              0 48%,
              9% 37%,
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

          .brush-photo-orange {
            bottom: 18%;
            right: -7%;
            z-index: 0;
            width: 92%;
            height: 45%;
            background: linear-gradient(
              90deg,
              rgba(225, 132, 82, 0.1),
              rgba(225, 132, 82, 0.82)
            );
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
            filter: blur(1px) drop-shadow(0 0 30px rgba(225, 132, 82, 0.48));
          }

          .brush-photo-black {
            bottom: 0;
            right: -4%;
            z-index: 0;
            width: 105%;
            height: 40%;
            background: #050505;
            opacity: 0.9;
            clip-path: polygon(
              0 40%,
              10% 30%,
              24% 36%,
              40% 19%,
              58% 31%,
              78% 16%,
              100% 28%,
              90% 50%,
              100% 72%,
              72% 64%,
              55% 88%,
              35% 69%,
              18% 82%,
              0 68%
            );
          }

          @media (max-width: 1023px) {
            .brush-top-left {
              left: -24%;
              top: 12%;
              width: 112%;
              height: 22%;
            }

            .brush-bottom-left {
              left: -20%;
              bottom: 1%;
              width: 72%;
              height: 13%;
            }

            .brush-top-right {
              right: -30%;
              top: 14%;
              width: 60%;
              height: 12%;
            }

            .brush-photo-white {
              left: 50%;
              right: auto;
              bottom: 6%;
              width: 105%;
              height: 70%;
              transform: translateX(-50%);
            }

            .brush-photo-orange {
              left: 50%;
              right: auto;
              bottom: 14%;
              width: 100%;
              height: 48%;
              transform: translateX(-50%);
            }

            .brush-photo-black {
              left: 50%;
              right: auto;
              bottom: 0;
              width: 110%;
              height: 40%;
              transform: translateX(-50%);
            }
          }

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
            color: #334155 !important;
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
            border: 1px solid #d8dee8 !important;
            border-radius: 8px !important;
            outline: none !important;
            background: #f8fafc !important;
            color: #0f172a !important;
            font-size: 15px !important;
            box-shadow: none !important;
          }

          .ac-modal-wrapper input:focus,
          .ac-modal-wrapper select:focus,
          .ac-modal-wrapper textarea:focus {
            border-color: #42dde8 !important;
            background: #ffffff !important;
          }

          .ac-modal-wrapper ._submit,
          .ac-modal-wrapper button[type="submit"] {
            width: 100% !important;
            padding: 16px 20px !important;
            border: 0 !important;
            border-radius: 8px !important;
            background: #a85a3a !important;
            color: #ffffff !important;
            font-size: 15px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            cursor: pointer !important;
          }

          .ac-modal-wrapper ._submit:hover,
          .ac-modal-wrapper button[type="submit"]:hover {
            background: #c56d45 !important;
          }

          .ac-modal-wrapper p,
          .ac-modal-wrapper label {
            color: #475569 !important;
          }

          .premium-title {
            overflow: visible;
            padding-right: 0.12em;
            text-shadow:
              0 5px 0 rgba(0, 0, 0, 0.42),
              0 22px 55px rgba(0, 0, 0, 0.34);
          }

          .premium-fiscal {
            display: block;
            width: max-content;
            margin-top: 0.06em;
            padding: 0.03em 0.18em 0.2em 0.03em;
            overflow: visible;
            line-height: 0.98;

            /* Naranja claro, cercano al CTA */
            background: none;
            color: #f5a06d;
            -webkit-text-fill-color: #f5a06d;

            text-shadow:
              0 3px 0 rgba(112, 48, 25, 0.82),
              0 7px 0 rgba(53, 20, 10, 0.42),
              0 16px 24px rgba(0, 0, 0, 0.28);
          }
        `}</style>
      </main>
    </>
  );
}
