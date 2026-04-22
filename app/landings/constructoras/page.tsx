"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = "733425513099672";
const ACTIVE_CAMPAIGN_FORM_ID = 185; // <-- cambialo
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/constructoras/alfredo-constructoras.png"; // <-- cambialo
const BACKGROUND_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/constructoras/alfredo-constructoras.png"; // <-- cambialo

export default function ConstructorasLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trackEvent = (
    event: string,
    data?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (data && options) {
      window.fbq("track", event, data, options);
      return;
    }

    if (data) {
      window.fbq("track", event, data);
      return;
    }

    window.fbq("track", event);
  };

  useEffect(() => {
    document.title = "Asesor Fiscal para Constructoras | CEFIN";
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    trackEvent("InitiateCheckout", {
      content_name: "Asesor Fiscal para Constructoras | Apertura de formulario",
      content_category: "Clase gratuita",
    });

    const oldScript = document.getElementById("ac-script-loader");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = "ac-script-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
  }, [isModalOpen]);

  const modules = [
    "Cómo se ordena la contabilidad en el giro constructor.",
    "Errores fiscales comunes que terminan costando dinero.",
    "Qué impuestos debes vigilar en una constructora.",
    "Cómo explicar con más claridad números y obligaciones.",
  ];

  return (
    <>
      <Script
        id="meta-pixel-constructoras"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
            fbq('trackCustom', 'ConstructorasLandingView', {
              content_name: 'ABC de Contabilidad e Impuestos para Constructoras | Landing'
            });
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <main className="relative min-h-screen overflow-x-hidden bg-[#0b0d0c] text-white">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#111211,#161816,#0b0d0c)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("${BACKGROUND_IMAGE_URL}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(1)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,12,0.92)_0%,rgba(11,13,12,0.78)_42%,rgba(11,13,12,0.55)_70%,rgba(11,13,12,0.88)_100%)]" />
          <div className="absolute left-0 top-0 h-[220px] w-[240px] bg-[radial-gradient(circle,rgba(191,255,92,0.25)_0%,transparent_72%)] blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-lime-400/10 blur-[120px]" />
          <div className="absolute right-[-8%] top-[18%] h-[280px] w-[280px] rounded-full bg-emerald-500/15 blur-[130px]" />
          <div className="absolute left-0 top-0 h-[180px] w-[260px] opacity-60 [background-image:radial-gradient(#bfff5c_1.2px,transparent_1.2px)] [background-size:10px_10px]" />

          <div className="absolute left-[8%] top-[6%] hidden h-[74%] w-[22%] rounded-[140px] bg-emerald-700/35 lg:block" />
          <div className="absolute left-[36%] top-[8%] hidden h-[66%] w-[18%] rounded-[120px] bg-emerald-700/30 lg:block" />
          <div className="absolute bottom-[14%] left-[10%] hidden h-[1px] w-[34%] bg-lime-300/55 lg:block" />
          <div className="absolute bottom-[17%] left-[11%] hidden h-[3px] w-[26%] bg-lime-300/30 blur-sm lg:block" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[44%] lg:block">
          <img
            src={HERO_IMAGE_URL}
            alt="Ponente de constructoras"
            className="absolute bottom-0 right-[2%] h-[92%] w-auto max-w-none object-contain opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0b0d0c]/10 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0b0d0c] via-[#0b0d0c]/85 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 lg:hidden">
          <img
            src={HERO_IMAGE_URL}
            alt="Ponente de constructoras"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,10,9,0.45)_0%,rgba(10,12,11,0.6)_40%,rgba(11,13,12,0.8)_100%)]" />
        </div>

        <header className="relative z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-1 rounded-full bg-gradient-to-b from-lime-300 to-emerald-500" />
              <div>
                <p className="text-2xl font-black tracking-tight">CEFIN</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                  Formación contable y fiscal
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden rounded-full border border-lime-300/20 bg-white/8 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/12 md:inline-flex"
            >
              Registrarme
            </button>
          </div>
        </header>

        <section className="relative z-30">
          <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:px-10 lg:pb-16">
            <div className="w-full max-w-4xl">
              <div className="inline-flex items-center rounded-full border border-lime-300/25 bg-black/45 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.34em] text-lime-300">
                Curso gratis en vivo
              </div>

              <div className="mt-6 max-w-3xl">
                <p className="text-base font-black uppercase tracking-[0.28em] text-white/80 sm:text-lg">
                  CEFIN
                </p>

                <h1 className="mt-2 text-5xl font-black uppercase leading-[0.82] tracking-[-0.06em] text-lime-300 sm:text-6xl lg:text-8xl xl:text-[7.4rem]">
                  Constructoras
                </h1>

                <div className="mt-1 hidden sm:block">
                  {["Constructoras", "Constructoras"].map((line, index) => (
                    <p
                      key={`${line}-${index}`}
                      className="text-5xl font-black uppercase leading-[0.78] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_#bfff5c] sm:text-6xl lg:text-7xl xl:text-[6rem]"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <h2 className="mt-4 max-w-3xl text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                  Asesor Fiscal
                </h2>
              </div>

              <div className="mt-8 inline-flex items-center rounded-full bg-black px-6 py-4 text-lg font-black uppercase tracking-tight text-lime-300 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                Curso gratis - en vivo
              </div>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
                Una clase diseñada para contadores que trabajan o quieren trabajar
                con constructoras y necesitan tener más claridad fiscal, mejor
                criterio contable y una forma más segura de explicar números,
                impuestos y obligaciones del giro.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300/15 text-xl text-lime-300">
                    05
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                      Fecha
                    </p>
                    <p className="text-lg font-black text-white">5 de mayo</p>
                  </div>
                </div>

                <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-xl text-lime-300">
                    02
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                      Hora
                    </p>
                    <p className="text-lg font-black text-white">11:00 AM (CDMX)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    trackEvent("Lead", {
                      content_name: "ABC de Contabilidad e Impuestos para Constructoras",
                    });
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 px-8 py-5 text-base font-black uppercase tracking-tight text-[#081008] shadow-[0_18px_50px_rgba(174,255,78,0.28)] transition hover:scale-[1.01] hover:shadow-[0_24px_70px_rgba(174,255,78,0.38)] active:scale-[0.98] sm:text-lg"
                >
                  Quiero mi lugar gratis
                </button>

                <p className="text-sm font-semibold text-white/65">
                  Sesión pensada para contadores del giro constructor.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {modules.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-lime-300/10 bg-black/28 p-4 text-sm font-medium text-white/82 backdrop-blur"
                  >
                    <span className="mr-2 text-lime-300">●</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-30 border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-300">
                  ¿Por qué entrar a esta clase?
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Porque una constructora no se opera igual que cualquier otro negocio.
                </h3>
              </div>

              <div className="space-y-5 lg:col-span-7">
                <p className="text-lg leading-relaxed text-white/75">
                  Cuando el giro tiene anticipos, obra, maquinaria, contratistas,
                  materiales y presión fiscal, una mala lectura contable termina
                  complicando decisiones, impuestos y flujo.
                </p>
                <p className="text-lg leading-relaxed text-white/75">
                  Esta clase busca darte una base más clara y más útil para
                  entender cómo se organiza la contabilidad e impuestos en
                  constructoras con mayor seguridad profesional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.03] p-8 shadow-2xl backdrop-blur md:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-300">
                    Reserva tu lugar
                  </p>
                  <h4 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Clase gratuita en vivo para el giro constructor
                  </h4>
                  <p className="mt-2 max-w-2xl text-white/70">
                    Regístrate ahora y deja lista esta landing para conectar tu
                    formulario, tus assets y tu grupo de WhatsApp.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-2xl bg-lime-300 px-7 py-4 text-base font-black uppercase tracking-tight text-[#0b120a] transition hover:scale-[1.01] active:scale-[0.98]"
                >
                  Registrarme gratis
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-30 border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center text-sm text-white/45 lg:px-10">
            <p className="font-black tracking-[0.25em]">CEFIN</p>
            <p>Formación práctica para contadores que quieren trabajar con más seguridad.</p>
          </div>
        </footer>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05050a]/85 p-3 backdrop-blur-md sm:p-4">
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar modal"
              >
                x
              </button>

              <div className="shrink-0 px-5 pb-4 pt-7 text-center sm:px-8 sm:pb-5 sm:pt-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-lime-500">
                  Clase gratuita
                </p>
                <h5 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
                  Asesor Fiscal Constructoras
                </h5>
                <p className="mt-2 text-sm text-slate-500">
                  Completa tus datos para asegurar tu lugar.
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-8 sm:pb-8">
                <div className="min-h-[420px]">
                  <div className={FORM_CLASS}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .${FORM_CLASS} {
            background: transparent !important;
            margin: 0 auto !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 430px !important;
          }

          .${FORM_CLASS} form {
            margin: 0 auto !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 430px !important;
            background: transparent !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .${FORM_CLASS},
          .${FORM_CLASS} ._form-content,
          .${FORM_CLASS} ._form-body,
          .${FORM_CLASS} ._inline-style,
          .${FORM_CLASS} ._form-thank-you {
            background: transparent !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .${FORM_CLASS} ._form-content {
            margin: 0 !important;
            padding: 0 !important;
          }

          .${FORM_CLASS} ._form_element,
          .${FORM_CLASS} ._field-wrapper,
          .${FORM_CLASS} ._button-wrapper {
            margin: 0 0 14px 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .${FORM_CLASS} ._form-title,
          .${FORM_CLASS} ._form-branding {
            display: none !important;
          }

          .${FORM_CLASS} p {
            margin: 0 0 14px 0 !important;
            color: #334155 !important;
            font-size: 14px !important;
            line-height: 1.65 !important;
          }

          .${FORM_CLASS} ._form-label {
            display: block !important;
            color: #334155 !important;
            font-size: 13px !important;
            font-weight: 700 !important;
            margin-bottom: 6px !important;
          }

          .${FORM_CLASS} input[type="text"],
          .${FORM_CLASS} input[type="email"],
          .${FORM_CLASS} input[type="tel"],
          .${FORM_CLASS} select,
          .${FORM_CLASS} textarea {
            width: 100% !important;
            border-radius: 16px !important;
            border: 1px solid #d8dee8 !important;
            background: #f8fafc !important;
            padding: 14px 16px !important;
            color: #0f172a !important;
            font-size: 15px !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .${FORM_CLASS} input[type="checkbox"] {
            margin-right: 10px !important;
            transform: translateY(2px);
          }

          .${FORM_CLASS} ._checkbox-radio,
          .${FORM_CLASS} ._checkbox-radio label {
            color: #475569 !important;
            font-size: 13px !important;
            line-height: 1.6 !important;
          }

          .${FORM_CLASS} input:focus,
          .${FORM_CLASS} select:focus,
          .${FORM_CLASS} textarea:focus {
            border-color: #65a30d !important;
            background: #ffffff !important;
          }

          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            border: 0 !important;
            border-radius: 18px !important;
            background: linear-gradient(90deg, #bfff5c 0%, #5ee25d 100%) !important;
            color: #081008 !important;
            padding: 16px 20px !important;
            font-size: 15px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.02em !important;
            cursor: pointer !important;
          }
        `}</style>
      </main>
    </>
  );
}
