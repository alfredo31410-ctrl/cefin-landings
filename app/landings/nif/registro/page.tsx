"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const ACTIVE_CAMPAIGN_FORM_ID = 187;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/alfredo.png";

export default function EstadosFinancierosLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (data) {
      window.fbq("track", event, data);
      return;
    }

    window.fbq("track", event);
  };

  useEffect(() => {
    document.title = "Estados Financieros con NIF | CEFIN";

    trackEvent("ViewContent", {
      content_name: "Estados Financieros con NIF",
      content_category: "Clase gratuita",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const oldScript = document.getElementById("ac-script-loader");
    if (oldScript) oldScript.remove();

    const existingFormNode = document.querySelector(`.${FORM_CLASS}`);
    if (existingFormNode) {
      existingFormNode.innerHTML = "";
    }

    const script = document.createElement("script");
    script.id = "ac-script-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
  }, [isModalOpen]);

  const bullets = [
    "Aprende a leer estados financieros con criterio contable.",
    "Conecta la información financiera con decisiones reales.",
    "Evita errores comunes al interpretar reportes.",
  ];

  const liveDay = [
    {
      day: "Día",
      date: "12 de mayo",
      title: "Estados financieros con NIF",
      detail: "La base para entender si una empresa gana, pierde o solo aparenta estar bien.",
    }
  ];

  const previewClasses = [
    "Base y mentalidad NIF",
    "Postulados básicos aplicados",
    "Registro contable con lógica real",
    "Estados financieros que sí sirven",
    "De contador operativo a asesor estratégico",
  ];

  return (
    <>
      <Script
        id="meta-pixel-estados-financieros"
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

            if (!window.__cefinMetaPixelInitialized) {
              fbq('init', '${META_PIXEL_ID}');
              window.__cefinMetaPixelInitialized = true;
            }
            fbq('track', 'PageView');
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#08080b] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_80%,rgba(55,86,235,0.38),transparent_24%),radial-gradient(circle_at_92%_12%,rgba(124,66,255,0.45),transparent_24%),linear-gradient(135deg,#07070a_0%,#16161b_48%,#08080b_100%)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:30px_30px]" />
          <div className="absolute right-[-8%] top-0 h-[45%] w-[34%] rotate-12 bg-violet-500/80 blur-[1px]" />
          <div className="absolute left-[-8%] bottom-[-12%] h-[46%] w-[42%] -rotate-12 bg-blue-600/55 blur-[1px]" />
          <div className="absolute left-[7%] top-[11%] h-[72%] w-[74%] -rotate-6 bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#08080b] via-[#08080b]/78 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[48%] lg:block">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-0 right-[4%] h-[88%] w-auto max-w-none object-contain opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#08080b]/10 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#08080b] via-[#08080b]/80 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 lg:hidden">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-0 right-[-18%] h-[62%] w-auto max-w-none object-contain opacity-55"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,8,11,0.42)_0%,rgba(8,8,11,0.68)_52%,rgba(8,8,11,0.94)_100%)]" />
        </div>

        <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <div className="text-3xl font-black tracking-tight">CEFIN</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-tight text-black transition hover:scale-[1.02] md:inline-flex"
          >
            Registrarme
          </button>
        </header>

        <section className="relative z-30 mx-auto flex min-h-[calc(100vh-92px)] max-w-7xl items-center px-6 pb-14 pt-4 lg:px-10">
          <div className="max-w-5xl">
            <h1 className="mt-2 text-[5rem] font-black uppercase leading-[0.78] tracking-[-0.08em] text-white sm:text-[8rem] lg:text-[11rem] xl:text-[13rem]">
              NIF
            </h1>

            <div className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-base font-black uppercase tracking-[0.12em] text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)] sm:text-xl">
              El entrenamiento gratuito para dejar de hacer números a ciegas
            </div>

            <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-white/70">
              Impartido por el Mtro. Alfredo Cobos
            </p>

            <div className="mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
              {liveDay.map((item) => (
                <div
                  key={item.day}
                  className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur"
                >
                  <div className="absolute right-[-18px] top-[-18px] h-24 w-24 rounded-full bg-violet-500/25 blur-2xl" />
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-violet-300">
                    {item.day}
                  </p>
                  <p className="mt-2 text-3xl font-black uppercase tracking-tight text-white">
                    {item.date}
                  </p>
                  <h2 className="mt-3 text-xl font-black uppercase leading-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/68">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 text-xl font-black uppercase sm:text-3xl">
              <p>11:00 AM (CDMX)</p>
              <p>
                Gratuito - en vivo{" "}
                <span className="text-violet-500">O</span>
              </p>
            </div>

            <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
              {bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-white/80 backdrop-blur"
                >
                  <span className="mr-2 text-violet-400">#</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-300">
                Lo que sigue en el taller completo
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {previewClasses.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white/78"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-9 py-5 text-base font-black uppercase tracking-tight text-black shadow-[0_18px_50px_rgba(255,255,255,0.18)] transition hover:scale-[1.01] active:scale-[0.98] sm:text-lg"
              >
                Quiero registrarme gratis
              </button>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/60">
                Cupo limitado para la sesión en vivo
              </p>
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-4">
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar modal"
              >
                ×
              </button>

              <div className="shrink-0 px-5 pb-4 pt-7 text-center sm:px-8 sm:pb-5 sm:pt-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-violet-600">
                  Registro gratuito
                </p>
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
          .${FORM_CLASS},
          .${FORM_CLASS} form {
            width: 100% !important;
            max-width: 430px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            background: transparent !important;
            border: 0 !important;
            box-shadow: none !important;
          }

          .${FORM_CLASS} ._form-title,
          .${FORM_CLASS} ._form-branding {
            display: none !important;
          }

          .${FORM_CLASS} ._form_element,
          .${FORM_CLASS} ._field-wrapper,
          .${FORM_CLASS} ._button-wrapper {
            margin: 0 0 14px 0 !important;
          }

          .${FORM_CLASS} p {
            margin: 0 0 14px 0 !important;
            color: #334155 !important;
            font-size: 14px !important;
            line-height: 1.65 !important;
          }

          .${FORM_CLASS} ._form-label {
            color: #334155 !important;
            font-size: 13px !important;
            font-weight: 800 !important;
            margin-bottom: 6px !important;
          }

          .${FORM_CLASS} input,
          .${FORM_CLASS} select,
          .${FORM_CLASS} textarea {
            width: 100% !important;
            border-radius: 15px !important;
            border: 1px solid #e5e7eb !important;
            background: #f8fafc !important;
            padding: 14px 16px !important;
            color: #0f172a !important;
            font-size: 15px !important;
            outline: none !important;
          }

          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            border: 0 !important;
            border-radius: 18px !important;
            background: linear-gradient(90deg, #3156ff 0%, #7c42ff 100%) !important;
            color: white !important;
            padding: 16px 20px !important;
            font-size: 15px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            cursor: pointer !important;
          }
        `}</style>
      </main>
    </>
  );
}
