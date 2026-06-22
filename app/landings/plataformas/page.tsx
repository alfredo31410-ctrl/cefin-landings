"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 253;
const ACTIVE_CAMPAIGN_FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;

const ALFREDO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/honorarios-contables/alfredo-honorarios-contables.png";
const PLATFORM_ASSET_BASE =
  "https://cefin-landings-z9uk.vercel.app/plataformas";

const WEBINAR_EVENT = {
  content_name: "Plataformas Tecnológicas",
  content_category: "Clase gratuita",
  event_date: "2026-06-30",
  event_time: "11:00 AM CDMX",
};

const platformLogos = [
  {
    name: "DiDi",
    src: `${PLATFORM_ASSET_BASE}/didi.png`,
    className: "left-[8px] top-[8px] w-20",
    mobileClassName: "left-2 top-4 w-16",
    imageClassName: "w-11",
  },
  {
    name: "Mercado Libre",
    src: `${PLATFORM_ASSET_BASE}/mercado-libre.png`,
    className: "left-[122px] top-[22px] w-32",
    mobileClassName: "right-1 top-8 w-28",
    imageClassName: "w-24",
  },
  {
    name: "Amazon",
    src: `${PLATFORM_ASSET_BASE}/amazon.png`,
    className: "left-[-8px] top-[92px] w-32",
    mobileClassName: "left-0 top-[100px] w-28",
    imageClassName: "w-24",
  },
  {
    name: "Uber Eats",
    src: `${PLATFORM_ASSET_BASE}/uber-eats.png`,
    className: "left-[22px] top-[174px] w-28",
    mobileClassName: "left-6 bottom-8 w-24",
    imageClassName: "w-20",
  },
  {
    name: "Uber",
    src: `${PLATFORM_ASSET_BASE}/uber.png`,
    className: "left-[168px] top-[132px] w-24",
    mobileClassName: "right-8 top-[130px] w-20",
    imageClassName: "w-14",
  },
  {
    name: "Airbnb",
    src: `${PLATFORM_ASSET_BASE}/airbnb.png`,
    className: "left-[150px] top-[220px] w-24",
    mobileClassName: "right-3 bottom-5 w-20",
    imageClassName: "w-16",
  },
];

const classPoints = [
  "Identifica obligaciones fiscales de ingresos por plataformas.",
  "Evita errores comunes al declarar operaciones digitales.",
  "Aprende qué revisar antes de presentar información al SAT.",
];

export default function PlataformasLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationTracked, setRegistrationTracked] = useState(false);

  useEffect(() => {
    document.title = "Plataformas Tecnológicas | CEFIN";

    trackMetaEvent("ViewContent", {
      ...WEBINAR_EVENT,
      source: "landing_page",
    });
  }, []);

  const openRegistrationModal = () => {
    setIsModalOpen(true);

    trackMetaCustomEvent("OpenRegistrationModal", {
      ...WEBINAR_EVENT,
      source: "landing_cta",
    });
  };

  const trackCompleteRegistration = useCallback(() => {
    if (registrationTracked) return;

    setRegistrationTracked(true);

    trackMetaEvent("CompleteRegistration", {
      ...WEBINAR_EVENT,
      status: "submitted",
    });
  }, [registrationTracked]);

  useEffect(() => {
    if (!isModalOpen) return;

    const oldScript = document.getElementById("ac-script-loader");
    if (oldScript) oldScript.remove();

    const existingFormNode = document.querySelector(
      `.${ACTIVE_CAMPAIGN_FORM_CLASS}`,
    );
    if (existingFormNode) existingFormNode.innerHTML = "";

    const script = document.createElement("script");
    script.id = "ac-script-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    const interval = window.setInterval(() => {
      const form = document.querySelector(
        `.${ACTIVE_CAMPAIGN_FORM_CLASS} form`,
      );

      if (!form) return;

      form.addEventListener("submit", trackCompleteRegistration, {
        once: true,
      });
      window.clearInterval(interval);
    }, 400);

    return () => window.clearInterval(interval);
  }, [isModalOpen, trackCompleteRegistration]);

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

      <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(#1820d8_1px,transparent_1px)] bg-[length:100%_7px] opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#02010d_0%,rgba(4,8,40,.92)_46%,rgba(0,0,0,.58)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[radial-gradient(circle_at_20%_84%,rgba(168,85,247,.55),transparent_28%),linear-gradient(to_top,#000_4%,rgba(0,0,0,.82)_42%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[34%] opacity-60 [background-image:linear-gradient(115deg,transparent_0%,transparent_42%,rgba(168,85,247,.45)_43%,transparent_44%),linear-gradient(65deg,transparent_0%,transparent_54%,rgba(59,130,246,.42)_55%,transparent_56%)] [background-size:120px_80px]" />
          <div className="absolute bottom-[8%] left-0 h-px w-full bg-purple-400/35" />
          <div className="absolute bottom-[16%] left-0 h-px w-full bg-blue-400/20" />
          <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="pointer-events-none fixed inset-y-0 right-0 z-10 hidden w-[46%] lg:block">
          <img
            src={ALFREDO_IMAGE_URL}
            alt="Mtro. Alfredo Cobos"
            className="absolute bottom-0 right-[-2%] h-[92%] w-auto max-w-none object-contain"
          />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="pointer-events-none fixed inset-0 z-10 lg:hidden">
          <img
            src={ALFREDO_IMAGE_URL}
            alt="Mtro. Alfredo Cobos"
            className="absolute right-[-92px] top-[118px] h-[330px] w-auto max-w-none object-contain opacity-38 sm:right-[-64px] sm:top-[112px] sm:h-[440px] sm:opacity-44 md:right-[-32px] md:top-[96px] md:h-[560px] md:opacity-48"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.16)_0%,rgba(0,0,0,.5)_42%,rgba(0,0,0,.96)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-black via-black/92 to-transparent" />
        </div>

        <section className="relative z-20 mx-auto flex min-h-screen max-w-[1400px] items-start px-5 py-8 sm:px-8 sm:py-10 lg:items-center lg:px-12">
          <div className="w-full max-w-[880px] pt-4 sm:pt-8 lg:pt-0">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 text-sm font-black text-blue-200">
                C
              </span>
              <div>
                <p className="text-lg font-black">CEFIN</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Capacitación fiscal y contable
                </p>
              </div>
            </div>

            <p className="text-[clamp(2.8rem,13vw,7rem)] font-black leading-none tracking-tight text-white drop-shadow-[0_8px_0_rgba(0,0,0,.45)]">
              Plataformas
            </p>

            <h1 className="mt-3 inline-flex max-w-full rounded-[1.4rem] bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-500 px-4 py-3 text-[clamp(2.15rem,10.5vw,6.5rem)] font-black uppercase leading-none tracking-wide text-white shadow-[0_24px_80px_rgba(89,52,255,.32)] sm:rounded-[2rem] sm:px-5 sm:py-4">
              Tecnológicas
            </h1>

            <div className="mt-7 max-w-2xl rounded-full bg-gradient-to-r from-blue-700 to-purple-500 px-5 py-2 text-center text-sm font-black uppercase tracking-[0.22em] text-white shadow-[0_16px_55px_rgba(91,73,255,.2)] sm:mt-10 sm:px-7 sm:text-2xl sm:tracking-[0.28em]">
              Inscripciones abiertas
            </div>

            <div className="mt-8 max-w-3xl text-center lg:mt-10 lg:text-left">
              <p className="text-base font-black uppercase tracking-[0.2em] text-white sm:text-2xl sm:tracking-[0.22em]">
                Impartido por el Mtro.
              </p>
              <p className="mt-3 text-xl font-black uppercase tracking-[0.22em] text-white sm:text-3xl">
                Alfredo Cobos
              </p>
              <p className="mt-6 text-xl font-black uppercase tracking-[0.1em] text-white sm:mt-7 sm:text-4xl sm:tracking-[0.12em]">
                30 de junio a las 11:00 AM (hora CDMX)
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center">
              <button
                onClick={openRegistrationModal}
                className="inline-flex min-h-16 items-center justify-center rounded-full bg-white px-9 text-base font-black uppercase tracking-wide text-black shadow-[0_0_70px_rgba(147,51,234,.45)] transition hover:-translate-y-1 hover:bg-purple-100 sm:text-lg"
              >
                Registrarme gratis
              </button>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-purple-200">
                Clase gratuita en vivo
              </p>
            </div>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {classPoints.map((point) => (
                <div
                  key={point}
                  className="border border-purple-400/20 bg-white/[0.06] p-4 text-sm font-bold leading-relaxed text-white/78 backdrop-blur"
                >
                  {point}
                </div>
              ))}
            </div>

            <div className="relative mx-auto mt-10 h-[290px] w-full max-w-[380px] lg:hidden">
              <div className="platform-shadow absolute bottom-4 left-1/2 h-10 w-44 -translate-x-1/2 rounded-full bg-black/70 blur-sm" />
              <div className="platform-phone absolute bottom-12 left-[calc(50%-40px)] h-36 w-20 rotate-[-15deg] rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-slate-900 via-indigo-900 to-black shadow-[0_25px_60px_rgba(0,0,0,.55)]">
                <img
                  src={`${PLATFORM_ASSET_BASE}/uber.png`}
                  alt="Uber"
                  className="absolute bottom-5 left-4 w-10 opacity-80"
                />
                <img
                  src={`${PLATFORM_ASSET_BASE}/airbnb.png`}
                  alt="Airbnb"
                  className="absolute left-5 top-5 w-8 opacity-90"
                />
                <img
                  src={`${PLATFORM_ASSET_BASE}/uber-eats.png`}
                  alt="Uber Eats"
                  className="absolute right-2 top-16 w-10 opacity-95"
                />
              </div>

              {platformLogos.map((logo, index) => (
                <div
                  key={logo.name}
                  className={`platform-logo absolute flex min-h-11 items-center justify-center rounded-2xl border border-white/15 bg-white/85 px-3 py-2 shadow-[0_16px_32px_rgba(0,0,0,.4)] backdrop-blur ${logo.mobileClassName}`}
                  style={{
                    animationDelay: `${index * 0.45}s`,
                    animationDuration: `${5.8 + index * 0.35}s`,
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`platform-logo-image h-auto max-h-8 object-contain ${logo.imageClassName}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-[15%] right-[20%] z-20 hidden lg:block">
            <div className="relative h-80 w-80">
              <div className="platform-shadow absolute bottom-3 left-1/2 h-12 w-48 -translate-x-1/2 rounded-full bg-black/70 blur-sm" />
              <div className="platform-phone absolute bottom-14 left-[108px] h-40 w-24 rotate-[-16deg] rounded-[1.7rem] border border-white/15 bg-gradient-to-br from-slate-900 via-indigo-900 to-black shadow-[0_25px_60px_rgba(0,0,0,.55)]">
                <img
                  src={`${PLATFORM_ASSET_BASE}/uber.png`}
                  alt="Uber"
                  className="absolute bottom-5 left-4 w-12 opacity-80"
                />
                <img
                  src={`${PLATFORM_ASSET_BASE}/airbnb.png`}
                  alt="Airbnb"
                  className="absolute left-6 top-6 w-10 opacity-90"
                />
                <img
                  src={`${PLATFORM_ASSET_BASE}/uber-eats.png`}
                  alt="Uber Eats"
                  className="absolute right-2 top-[72px] w-12 opacity-95"
                />
              </div>
              {platformLogos.map((logo, index) => (
                <div
                  key={logo.name}
                  className={`platform-logo absolute flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/85 px-4 py-2 shadow-[0_16px_32px_rgba(0,0,0,.4)] backdrop-blur ${logo.className}`}
                  style={{
                    animationDelay: `${index * 0.45}s`,
                    animationDuration: `${5.8 + index * 0.35}s`,
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`platform-logo-image h-auto max-h-9 object-contain ${logo.imageClassName}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
            <div className="relative max-h-[92vh] w-full max-w-[540px] overflow-y-auto rounded-[2rem] bg-white p-6 text-black shadow-[0_30px_100px_rgba(0,0,0,.6)]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 text-2xl font-black text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar formulario"
              >
                ×
              </button>

              <p className="text-center text-xs font-black uppercase tracking-[0.28em] text-purple-600">
                Registro gratuito
              </p>
              <h2 className="mt-2 text-center text-3xl font-black uppercase text-slate-950">
                Plataformas Tecnológicas
              </h2>
              <p className="mt-2 text-center text-sm font-semibold text-slate-500">
                30 de junio · 11:00 AM (hora CDMX)
              </p>

              <div className="mt-6">
                <div className={ACTIVE_CAMPAIGN_FORM_CLASS} />
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .platform-logo {
            animation: platform-float 4.8s ease-in-out infinite alternate;
            transform-origin: center;
            will-change: transform, filter;
          }

          .platform-logo::after {
            position: absolute;
            inset: -1px;
            border-radius: 1rem;
            content: "";
            background: linear-gradient(
              110deg,
              transparent 18%,
              rgba(255, 255, 255, 0.65) 48%,
              transparent 72%
            );
            opacity: 0;
            transform: translateX(-60%);
            animation: platform-shine 5.8s ease-in-out infinite;
            pointer-events: none;
          }

          .platform-phone {
            animation: phone-float 5.4s ease-in-out infinite alternate;
            transform-origin: center;
            will-change: transform;
          }

          .platform-logo-image {
            animation: logo-pulse 3.8s ease-in-out infinite alternate;
          }

          .platform-shadow {
            animation: shadow-pulse 7s ease-in-out infinite;
          }

          @keyframes platform-float {
            0%,
            100% {
              filter: drop-shadow(0 12px 20px rgba(147, 51, 234, 0.08));
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
            35% {
              filter: drop-shadow(0 18px 26px rgba(147, 51, 234, 0.24));
              transform: translate3d(18px, -18px, 0) rotate(3deg) scale(1.04);
            }
            70% {
              filter: drop-shadow(0 14px 24px rgba(59, 130, 246, 0.2));
              transform: translate3d(-14px, 10px, 0) rotate(-2.4deg) scale(0.98);
            }
          }

          @keyframes platform-shine {
            0%,
            62% {
              opacity: 0;
              transform: translateX(-70%);
            }
            74% {
              opacity: 0.55;
            }
            92%,
            100% {
              opacity: 0;
              transform: translateX(70%);
            }
          }

          @keyframes phone-float {
            0%,
            100% {
              transform: translate3d(0, 0, 0) rotate(-16deg);
            }
            50% {
              transform: translate3d(8px, -18px, 0) rotate(-11deg);
            }
          }

          @keyframes logo-pulse {
            0% {
              opacity: 0.82;
              transform: scale(1);
            }
            100% {
              opacity: 1;
              transform: scale(1.08);
            }
          }

          @keyframes shadow-pulse {
            0%,
            100% {
              opacity: 0.72;
              transform: translateX(-50%) scaleX(1);
            }
            50% {
              opacity: 0.45;
              transform: translateX(-50%) scaleX(0.78);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .platform-logo,
            .platform-logo::after,
            .platform-phone,
            .platform-shadow,
            .platform-logo-image {
              animation-duration: 10s;
            }
          }

          @media (max-width: 1023px) {
            .platform-logo,
            .platform-logo::after,
            .platform-phone,
            .platform-shadow,
            .platform-logo-image {
              animation: none;
            }
          }
        `}</style>
      </main>
    </>
  );
}
