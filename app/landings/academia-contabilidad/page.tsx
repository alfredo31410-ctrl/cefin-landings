"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 191;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const HERO_IMAGE_URL = "/academia-contabilidad/alfredo-academia.png";

const bullets = [
  "Aprende contabilidad desde cero con enfoque claro y práctico.",
  "Entiende cómo se mueve un negocio sin perderte entre términos técnicos.",
  "Construye una base sólida para crecer con más seguridad.",
];

const classTopics = [
  "Qué es la contabilidad y para qué sirve de verdad.",
  "Cómo entender ingresos, gastos y utilidad sin enredos.",
  "La lógica básica para leer un negocio con criterio.",
  "Los primeros pasos para dejar de ver la contabilidad como algo complicado.",
];

export default function AcademiaContabilidadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Academia de Contabilidad Básica | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Academia de Contabilidad Básica",
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

  return (
    <>
      <Script
        id="meta-pixel-academia-contabilidad"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#210828] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,85,120,0.32),transparent_24%),radial-gradient(circle_at_86%_12%,rgba(168,85,247,0.42),transparent_26%),linear-gradient(135deg,#3a123e_0%,#2b0d4a_42%,#1a0321_100%)]" />
          <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0,rgba(255,255,255,0)_58%)]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.55)_1.2px,transparent_1.2px)] [background-size:36px_36px]" />
          <div className="absolute left-[34%] top-[10%] hidden h-[78%] w-[48%] rounded-full border border-white/15 lg:block" />
          <div className="absolute left-[41%] top-[16%] hidden h-[62%] w-[34%] rounded-full border border-white/10 lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1a0321] via-[#1a0321]/90 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[44%] lg:block">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-0 left-[2%] h-[92%] w-auto max-w-none object-contain opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#210828]/26" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#1a0321] via-[#1a0321]/88 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 lg:hidden">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-0 left-[-10%] h-[56%] w-auto max-w-none object-contain opacity-70 sm:left-[-4%] sm:h-[62%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,4,36,0.34)_0%,rgba(28,4,36,0.62)_45%,rgba(25,3,32,0.94)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1a0321] via-[#1a0321]/92 to-transparent" />
        </div>

        <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <div className="text-3xl font-black tracking-tight">CEFIN</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-tight text-[#25072d] transition hover:scale-[1.02] md:inline-flex"
          >
            Registrarme
          </button>
        </header>

        <section className="relative z-30 mx-auto flex min-h-[calc(100vh-92px)] max-w-7xl items-center px-6 pb-14 pt-4 lg:px-10">
          <div className="ml-auto w-full max-w-4xl">
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <div className="max-w-[520px] rounded-[2rem] border border-white/10 bg-white/12 px-5 py-4 text-left shadow-[0_18px_60px_rgba(255,94,122,0.18)] backdrop-blur sm:px-6 sm:py-5 lg:-mt-4 lg:text-right">
                <p className="text-xl leading-tight text-white sm:text-3xl">
                  Aprende Contabilidad desde Cero y transforma tu forma de entender los negocios.
                </p>
                <p className="mt-3 text-2xl font-black text-white sm:text-4xl">
                  Este Jueves, 11:00 AM (CDMX)
                </p>
              </div>

              <div className="w-full text-center lg:text-right">
                <p className="text-[2.1rem] font-black uppercase leading-none tracking-[0.28em] text-white/72 sm:text-[2.8rem] lg:text-[3.2rem]">
                  Academia
                </p>
                <p
                  className="mt-1 text-[4.4rem] font-black uppercase leading-[0.82] tracking-[-0.08em] text-transparent opacity-95 sm:text-[6.8rem] lg:text-[8.7rem]"
                  style={{ WebkitTextStroke: "2px #ff6a57" }}
                >
                  BÁSICA
                </p>
                <h1 className="mt-[-8px] text-[3.1rem] font-black uppercase leading-[0.9] tracking-[0.02em] text-white sm:text-[5.1rem] lg:text-[6.7rem]">
                  Contabilidad
                </h1>
              </div>

              <div className="w-full max-w-[760px] text-center lg:text-right">
                <p className="text-base font-medium text-white/82 sm:text-xl">
                  Impartida por: Mtro. Alfredo Cobos
                </p>
                <p className="mt-5 text-2xl font-black text-white sm:text-4xl">
                  100% en línea
                </p>
                <div className="mx-auto mt-3 h-1 w-full max-w-[420px] bg-gradient-to-r from-[#ff5e7a] via-[#d85cff] to-[#8b5cf6] lg:mx-0 lg:ml-auto" />
              </div>
            </div>

            <div className="mt-10 grid max-w-5xl gap-4 sm:grid-cols-3 lg:ml-auto">
              {bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-white/82 backdrop-blur"
                >
                  <span className="mr-2 text-[#ff6a57]">•</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-9 py-5 text-base font-black uppercase tracking-tight text-[#25072d] shadow-[0_18px_50px_rgba(255,255,255,0.18)] transition hover:scale-[1.01] active:scale-[0.98] sm:text-lg"
              >
                Quiero registrarme gratis
              </button>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/65">
                Cupo limitado
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-30 border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ff7fa2]">
                  Lo que vas a trabajar
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Una clase clara para entender contabilidad sin sentir que todo es demasiado técnico.
                </h2>
              </div>

              <div className="space-y-4 lg:col-span-7">
                {classTopics.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-base font-medium text-white/78"
                  >
                    <span className="mr-2 text-[#ff6a57]">•</span>
                    {item}
                  </div>
                ))}
              </div>
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
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-fuchsia-600">
                  Registro gratuito
                </p>
                <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-900">
                  Academia Contabilidad
                </h3>
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
            background: linear-gradient(90deg, #ff5e7a 0%, #d85cff 55%, #8b5cf6 100%) !important;
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
