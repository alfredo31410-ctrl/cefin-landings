"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/BUfCVRKblO31syRjxC5Uoz";
const ALFREDO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/honorarios-contables/alfredo-honorarios-contables.png";
const PLATFORM_ASSET_BASE =
  "https://cefin-landings-z9uk.vercel.app/plataformas";

const platformLogos = [
  {
    name: "DiDi",
    src: `${PLATFORM_ASSET_BASE}/didi.png`,
    className: "left-[8px] top-[8px] w-20",
    mobileClassName: "left-2 top-4 w-16",
    desktopClassName: "lg:left-[8px] lg:top-[8px] lg:w-20",
    imageClassName: "w-11",
  },
  {
    name: "Mercado Libre",
    src: `${PLATFORM_ASSET_BASE}/mercado-libre.png`,
    className: "left-[122px] top-[22px] w-32",
    mobileClassName: "right-1 top-8 w-28",
    desktopClassName: "lg:left-[122px] lg:right-auto lg:top-[22px] lg:w-32",
    imageClassName: "w-24",
  },
  {
    name: "Amazon",
    src: `${PLATFORM_ASSET_BASE}/amazon.png`,
    className: "left-[-8px] top-[92px] w-32",
    mobileClassName: "left-0 top-[100px] w-28",
    desktopClassName: "lg:left-[-8px] lg:top-[92px] lg:w-32",
    imageClassName: "w-24",
  },
  {
    name: "Uber Eats",
    src: `${PLATFORM_ASSET_BASE}/uber-eats.png`,
    className: "left-[22px] top-[174px] w-28",
    mobileClassName: "left-6 bottom-8 w-24",
    desktopClassName: "lg:left-[22px] lg:bottom-auto lg:top-[174px] lg:w-28",
    imageClassName: "w-20",
  },
  {
    name: "Uber",
    src: `${PLATFORM_ASSET_BASE}/uber.png`,
    className: "left-[168px] top-[132px] w-24",
    mobileClassName: "right-8 top-[130px] w-20",
    desktopClassName: "lg:left-[168px] lg:right-auto lg:top-[132px] lg:w-24",
    imageClassName: "w-14",
  },
  {
    name: "Airbnb",
    src: `${PLATFORM_ASSET_BASE}/airbnb.png`,
    className: "left-[150px] top-[220px] w-24",
    mobileClassName: "right-3 bottom-5 w-20",
    desktopClassName: "lg:left-[150px] lg:right-auto lg:bottom-auto lg:top-[220px] lg:w-24",
    imageClassName: "w-16",
  },
];

export default function PlataformasGraciasPage() {
  useEffect(() => {
    document.title = "Último paso | Plataformas Tecnológicas | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "Plataformas Tecnológicas",
      content_category: "Clase gratuita",
      event_date: "2026-06-30",
      event_time: "11:00 AM CDMX",
      status: "registered_80_percent",
      source: "thank_you_page",
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaEvent("Lead", {
      content_name: "Plataformas Tecnológicas",
      content_category: "Grupo de WhatsApp",
      status: "whatsapp_group_click",
      source: "thank_you_page",
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-plataformas-gracias"
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
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#02010d_0%,rgba(4,8,40,.94)_48%,rgba(0,0,0,.68)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-[radial-gradient(circle_at_22%_82%,rgba(168,85,247,.58),transparent_30%),linear-gradient(to_top,#000_4%,rgba(0,0,0,.82)_44%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[34%] opacity-55 [background-image:linear-gradient(115deg,transparent_0%,transparent_42%,rgba(168,85,247,.45)_43%,transparent_44%),linear-gradient(65deg,transparent_0%,transparent_54%,rgba(59,130,246,.42)_55%,transparent_56%)] [background-size:120px_80px]" />
          <div className="absolute bottom-0 left-0 h-60 w-full bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="pointer-events-none fixed inset-y-0 right-0 z-10 hidden w-[44%] lg:block">
          <img
            src={ALFREDO_IMAGE_URL}
            alt="Mtro. Alfredo Cobos"
            className="absolute bottom-0 right-[-8%] h-[88%] w-auto max-w-none object-contain opacity-95"
          />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="pointer-events-none fixed inset-0 z-10 lg:hidden">
          <img
            src={ALFREDO_IMAGE_URL}
            alt="Mtro. Alfredo Cobos"
            className="absolute right-[-92px] top-[118px] h-[330px] w-auto max-w-none object-contain opacity-30 sm:right-[-64px] sm:top-[112px] sm:h-[440px] sm:opacity-38 md:right-[-32px] md:top-[96px] md:h-[560px] md:opacity-44"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.16)_0%,rgba(0,0,0,.56)_42%,rgba(0,0,0,.96)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-black via-black/92 to-transparent" />
        </div>

        <section className="relative z-20 mx-auto grid min-h-screen max-w-[1320px] items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-400/25 bg-white/[0.06] px-4 py-2 backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 text-sm font-black text-blue-200">
                C
              </span>
              <div>
                <p className="text-sm font-black">CEFIN</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Capacitación fiscal y contable
                </p>
              </div>
            </div>

            <div className="inline-flex rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-lime-200 shadow-[0_0_34px_rgba(163,230,53,.14)]">
              Registro 80% completado
            </div>

            <h1 className="mt-5 text-[clamp(2.9rem,10vw,6.4rem)] font-black uppercase leading-[0.9] tracking-tight">
              Falta entrar al
              <span className="mt-2 block rounded-[1.3rem] bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-500 px-4 py-3 text-white shadow-[0_24px_80px_rgba(89,52,255,.32)] sm:inline-block sm:rounded-[2rem] sm:px-5">
                grupo
              </span>
            </h1>

                        <a
              href={WHATSAPP_GROUP_URL}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-20 w-full items-center justify-center gap-3 rounded-[1.6rem] bg-lime-400 px-7 text-center text-lg font-black uppercase italic text-black shadow-[0_0_70px_rgba(163,230,53,.45)] transition hover:-translate-y-1 hover:scale-[1.01] hover:bg-lime-300 active:scale-[0.98] sm:w-auto sm:px-10 sm:text-xl"
            >
              <svg
                className="h-7 w-7 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.82 11.82 0 0012.07 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.16 1.59 5.97L0 24l6.3-1.65a11.87 11.87 0 005.77 1.47h.01c6.57 0 11.91-5.35 11.92-11.92 0-3.18-1.24-6.17-3.48-8.42zM12.08 21.8h-.01a9.88 9.88 0 01-5.03-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 01-1.51-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.89-9.89 9.89zm5.42-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35z" />
              </svg>
              <span>Entrar al grupo de WhatsApp</span>
            </a>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-white/74 sm:text-xl">
              Tu registro para la clase de Plataformas Tecnológicas quedó
              guardado, pero todavía no está completo al 100%.
            </p>

            <p className="mt-4 max-w-2xl text-sm font-black uppercase tracking-[0.16em] text-lime-200">
              Si no entras al grupo, no recibirás el enlace de acceso,
              recordatorios ni avisos importantes.
            </p>

            <div className="mt-7 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                  Paso 1
                </p>
                <p className="mt-2 text-sm font-bold text-white/75">
                  Datos enviados
                </p>
              </div>
              <div className="border-2 border-lime-300 bg-lime-300/12 p-4 shadow-[0_0_35px_rgba(163,230,53,.16)] backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-200">
                  Paso 2
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  Entrar al grupo
                </p>
              </div>
              <div className="border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                  100%
                </p>
                <p className="mt-2 text-sm font-bold text-white/75">
                  Acceso asegurado
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-purple-400/25 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-2xl font-black uppercase sm:text-3xl">
                30 de junio · 11:00 AM (hora CDMX)
              </p>
              <p className="mt-3 font-bold text-white/60">
                Impartido por el Mtro. Alfredo Cobos
              </p>
            </div>

          </div>

          <div className="relative mx-auto h-[310px] w-full max-w-[390px] lg:h-[370px] lg:max-w-[390px]">
            <div className="platform-shadow absolute bottom-4 left-1/2 h-12 w-48 -translate-x-1/2 rounded-full bg-black/70 blur-sm" />
            <div className="platform-phone absolute bottom-14 left-[calc(50%-48px)] h-40 w-24 rotate-[-15deg] rounded-[1.7rem] border border-white/15 bg-gradient-to-br from-slate-900 via-indigo-900 to-black shadow-[0_25px_60px_rgba(0,0,0,.55)]">
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
                className={`platform-logo absolute flex min-h-11 items-center justify-center rounded-2xl border border-white/15 bg-white/85 px-3 py-2 shadow-[0_16px_32px_rgba(0,0,0,.4)] backdrop-blur lg:min-h-12 lg:px-4 ${logo.mobileClassName} ${logo.desktopClassName}`}
                style={{
                  animationDelay: `${index * 0.45}s`,
                  animationDuration: `${5.8 + index * 0.35}s`,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`platform-logo-image h-auto max-h-8 object-contain lg:max-h-9 ${logo.imageClassName}`}
                />
              </div>
            ))}
          </div>
        </section>

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
