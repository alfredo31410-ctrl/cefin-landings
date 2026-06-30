"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WEBINAR_EVENT = {
  content_name: "ABC de Inteligencia Artificial para Contadores",
  content_category: "Webinar",
  event_date: "2026-07-16",
  event_time: "11:00 AM CDMX",
};

const ACTIVE_CAMPAIGN_FORM_ID = 263;
const ACTIVE_CAMPAIGN_FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;

export default function LandingIA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "ABC de Inteligencia Artificial para Contadores | CEFIN";

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


  useEffect(() => {
    if (!isModalOpen) return;

    const oldScript = document.getElementById("ac-script-loader");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = "ac-script-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.async = true;

    document.body.appendChild(script);
  }, [isModalOpen]);

  return (
    <>
      <Script
        id="meta-pixel-ia"
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

      <main className="relative min-h-screen overflow-y-auto overflow-x-hidden bg-[#02040a] font-sans text-white">
        {/* BACKGROUND */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <img
            src="https://cefin-landings-z9uk.vercel.app/Inteligencia_Artificial.png"
            alt="ABC de Inteligencia Artificial para Contadores"
            className="absolute inset-0 hidden h-full w-full object-cover object-right opacity-70 lg:block"
          />

          <img
            src="https://cefin-landings-z9uk.vercel.app/Inteligencia_Artificial_Vertical.png"
            alt="ABC de Inteligencia Artificial para Contadores"
            className="absolute inset-0 block h-full w-full object-cover object-[50%_50%] opacity-50 lg:hidden"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/55 via-[#02040a]/78 to-[#02040a] lg:bg-gradient-to-r lg:from-[#02040a] lg:via-[#02040a]/88 lg:to-[#02040a]/35" />

          <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(34,211,238,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.22)_1px,transparent_1px)] [background-size:44px_44px]" />

          <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-lime-400/15 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        {/* MARCA CEFIN */}
        <header className="relative z-20 flex justify-center px-4 pt-5 sm:justify-start sm:px-8 lg:px-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-[0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/15 shadow-[0_0_20px_rgba(34,211,238,0.16)]">
              <span className="text-sm font-black text-cyan-300">C</span>
            </div>

            <div className="text-left leading-none">
              <p className="text-sm font-black tracking-tight text-white">
                CEFIN
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Centro de Estudios Fiscales, Innovación y Negocios
              </p>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-7xl items-start px-4 pb-8 pt-5 sm:px-8 sm:pb-10 lg:min-h-[calc(100vh-80px)] lg:items-center lg:px-12 lg:pt-0">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,650px)_1fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 shadow-[0_0_28px_rgba(34,211,238,0.12)] backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
                </span>

                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300 sm:text-[11px]">
                  Clase gratuita en vivo
                </p>
              </div>

              <h1 className="mt-4 text-4xl font-black uppercase italic leading-[0.9] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                <span className="block text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.16)]">
                  ABC DE
                </span>
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-lime-300 bg-clip-text text-transparent">
                  INTELIGENCIA
                </span>
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-lime-300 bg-clip-text text-transparent">
                  ARTIFICIAL
                </span>
                <span className="mt-1 block text-white">PARA CONTADORES</span>
              </h1>

              <div className="mt-5 max-w-xl rounded-3xl border border-white/10 border-l-cyan-400 bg-white/[0.07] p-5 shadow-[0_0_55px_rgba(15,23,42,0.35)] backdrop-blur-md">
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                  Aprende a usar herramientas de inteligencia artificial para{" "}
                  <span className="font-bold text-white">
                    trabajar más rápido, crear reportes, analizar información
                  </span>{" "}
                  y aumentar tu valor profesional como contador.
                </p>
              </div>

              {/* CTA PRINCIPAL - VISIBLE SIN HACER SCROLL */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={openRegistrationModal}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 px-6 py-4 text-center text-sm font-black uppercase italic text-black shadow-[0_0_60px_rgba(163,230,53,0.48)] ring-2 ring-lime-300/40 transition-all duration-200 hover:scale-[1.01] hover:bg-lime-300 active:scale-[0.98] sm:w-auto sm:px-8 sm:text-base lg:text-lg"
                >
                  <span>QUIERO MI ACCESO GRATUITO</span>
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M13 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <a
                  href="#aprendizajes"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black uppercase italic tracking-wide text-white backdrop-blur-md transition hover:bg-white/10 sm:text-base"
                >
                  Ver qué aprenderé
                </a>
              </div>

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300 sm:text-sm">
                Regístrate gratis y asegura tu lugar
              </p>

              <div className="mt-5 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                <InfoCard label="Próxima sesión" value="16 DE JULIO" />
                <InfoCard label="Horario online" value="11:00 AM" />
                <InfoCard label="Hora local" value="CDMX" />
              </div>

              <div className="mt-5 grid max-w-xl gap-3 sm:grid-cols-3">
                <MiniBenefit text="Prompts contables" />
                <MiniBenefit text="Reportes con IA" />
                <MiniBenefit text="Automatización práctica" />
              </div>
            </div>

            {/* PANEL IA DESKTOP */}
            <div className="hidden lg:block">
              <div className="relative ml-auto max-w-md">
                <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-lime-300/20 blur-2xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                        AI Accounting Console
                      </p>
                      <h2 className="mt-1 text-2xl font-black text-white">
                        Flujo inteligente
                      </h2>
                    </div>

                    <div className="rounded-full bg-lime-300/15 px-3 py-1 text-xs font-black text-lime-200">
                      LIVE
                    </div>
                  </div>

                  <DashboardCard
                    metric="01"
                    title="Analiza"
                    description="Resume documentos, reportes y datos contables."
                  />
                  <DashboardCard
                    metric="02"
                    title="Detecta"
                    description="Encuentra errores, inconsistencias y oportunidades."
                  />
                  <DashboardCard
                    metric="03"
                    title="Entrega"
                    description="Genera reportes claros para clientes y dirección."
                  />

                  <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-slate-950/70 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-300" />
                      <span className="h-3 w-3 rounded-full bg-green-400" />
                    </div>

                    <pre className="overflow-hidden text-xs leading-6 text-cyan-100">
                      {`> Revisa este reporte
> Extrae hallazgos clave
> Genera resumen ejecutivo
> Sugiere próximos pasos`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APRENDIZAJES */}
        <section
          id="aprendizajes"
          className="relative z-10 border-t border-white/10 bg-[#02040a]/92 px-4 py-16 backdrop-blur-md sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-lime-300">
                Qué aprenderás
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase italic leading-tight text-white sm:text-4xl lg:text-5xl">
                IA práctica para el trabajo real de un contador
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <BenefitCard
                number="01"
                title="Prompts contables"
                description="Cómo pedirle a la IA respuestas útiles para tareas contables y fiscales."
              />
              <BenefitCard
                number="02"
                title="Análisis documental"
                description="Cómo resumir información, extraer datos y revisar documentos complejos."
              />
              <BenefitCard
                number="03"
                title="Reportes ejecutivos"
                description="Cómo transformar datos en explicaciones claras para clientes o dirección."
              />
              <BenefitCard
                number="04"
                title="Uso responsable"
                description="Qué no delegar a la IA y cómo usarla con criterio profesional."
              />
            </div>

            <div className="mt-10 rounded-[2rem] border border-lime-300/20 bg-gradient-to-r from-lime-300/10 via-cyan-300/10 to-blue-500/10 p-6 shadow-[0_0_65px_rgba(34,211,238,0.08)] md:flex md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-black uppercase italic text-white">
                  Aparta tu lugar gratis
                </h3>
                <p className="mt-2 text-slate-300">
                  18 de junio de 2026 · 11:00 AM hora CDMX
                </p>
              </div>

              <button
                onClick={openRegistrationModal}
                className="mt-6 rounded-2xl bg-white px-7 py-4 text-sm font-black uppercase italic tracking-wide text-black transition hover:scale-[1.01] hover:bg-lime-300 md:mt-0"
              >
                Registrarme gratis
              </button>
            </div>
          </div>
        </section>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            <div className="relative flex h-full max-h-[95vh] w-full max-w-lg flex-col overflow-hidden rounded-[1.7rem] border border-cyan-300/20 bg-white text-black shadow-[0_0_90px_rgba(34,211,238,0.22)] sm:h-auto">
              <div className="flex shrink-0 items-center justify-between bg-[#0a0c14] px-6 py-4 text-white">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-lime-300">
                    Registro gratuito
                  </p>
                  <h2 className="mt-1 text-base font-black uppercase italic tracking-wider text-cyan-300">
                    Inscripción ABC IA
                  </h2>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full bg-white/10 px-3 py-1 text-xl text-white transition hover:bg-white/20"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Completa tus datos para recibir el acceso a la clase del{" "}
                  <span className="font-black text-slate-950">
                    16 de julio a las 11:00 AM CDMX.
                  </span>
                </p>
              </div>

              <div className="custom-scrollbar flex-1 overflow-y-auto p-4 sm:p-8">
                <div
                  className={`${ACTIVE_CAMPAIGN_FORM_CLASS} min-h-[500px] w-full`}
                />
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #0a0c14;
            border-radius: 10px;
          }

          [class^="_form_"] {
            width: 100% !important;
          }

          [class^="_form_"] form {
            margin: 0 !important;
            width: 100% !important;
          }
        `}</style>
      </main>
    </>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_0_35px_rgba(15,23,42,0.25)] backdrop-blur-sm">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-base font-black italic text-white sm:text-lg">
        {value}
      </p>
    </div>
  );
}

function MiniBenefit({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-cyan-100 backdrop-blur-md">
      {text}
    </div>
  );
}

function DashboardCard({
  metric,
  title,
  description,
}: {
  metric: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-sm font-black text-cyan-200">
          {metric}
        </div>

        <div>
          <h3 className="font-black uppercase italic text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_40px_rgba(15,23,42,0.25)] backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.08]">
      <p className="text-sm font-black text-lime-300">{number}</p>
      <h3 className="mt-5 text-xl font-black uppercase italic text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </article>
  );
}
