"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  NIF_REGISTRATION_ATTEMPT_STORAGE_KEY,
  NIF_TRAFFIC_SOURCE_STORAGE_KEY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 293;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;

const benefits = [
  "Qué son las NIF y por qué son esenciales para interpretar información financiera.",
  "Cómo relacionar las bases de las NIF con la lectura de estados financieros.",
  "Cómo detectar errores comunes al analizar reportes contables.",
  "Cómo pasar de observar números aislados a interpretarlos con mayor criterio.",
];

const audience = [
  "Estudias o trabajas en contabilidad.",
  "Tienes contacto con estados financieros, pero todavía tienes dudas al interpretarlos.",
  "Quieres fortalecer tus bases en las NIF.",
  "Buscas entender mejor lo que realmente reflejan los números de una empresa.",
];

const ctaClass =
  "nif-button inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-tight text-[#090b0d] shadow-[0_18px_55px_rgba(255,255,255,0.18)] transition hover:bg-[#d8d4ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b8cff] active:scale-[0.98] sm:w-auto sm:text-base";

function scrollToForm(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  document.getElementById("registro-formulario")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}

export default function NifRegistroPage() {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "ABC de las NIF",
      content_category: "Clase gratuita en vivo",
      landing_slug: "nif-registro",
    });

    const params = new URLSearchParams(window.location.search);
    const source =
      params.get("src") || params.get("source") || params.get("channel");
    if (source) {
      window.sessionStorage.setItem(
        NIF_TRAFFIC_SOURCE_STORAGE_KEY,
        source.toLowerCase(),
      );
    }
  }, []);

  useEffect(() => {
    const formRoot = document.querySelector(`.${FORM_CLASS}`);
    if (!formRoot) return;

    const markAttemptAndCustomizeButton = () => {
      const form = formRoot.querySelector("form");
      if (form && !form.dataset.nifBound) {
        form.dataset.nifBound = "true";
        form.addEventListener("submit", () => {
          window.sessionStorage.setItem(
            NIF_REGISTRATION_ATTEMPT_STORAGE_KEY,
            JSON.stringify({ createdAt: Date.now() }),
          );
        });
      }

      const submit = formRoot.querySelector<HTMLButtonElement>(
        "button[type='submit'], ._submit",
      );
      if (submit) submit.textContent = "¡REGISTRARME GRATIS Y CONTINUAR!";
    };

    const observer = new MutationObserver(markAttemptAndCustomizeButton);
    observer.observe(formRoot, { childList: true, subtree: true });
    markAttemptAndCustomizeButton();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scriptId = "ac-nif-form-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-nif-registro"
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

      <main className="min-h-screen overflow-x-hidden bg-[#090b0d] text-white">
        <div className="flex flex-col items-center justify-center gap-3 border-b border-white/10 bg-[#12121a] px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.12em] text-white sm:flex-row sm:justify-between sm:px-8 sm:text-sm">
          <span>Clase gratuita en vivo · 31 de julio de 2026</span>
          <button type="button" onClick={scrollToForm} className="nif-button rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#090b0d] transition hover:bg-[#d8d4ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b8cff] sm:px-5 sm:text-xs">
            ¡Registrarme gratis ahora!
          </button>
        </div>

        <section className="relative border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="nif-aurora absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(55,86,235,0.3),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(124,66,255,0.36),transparent_34%),linear-gradient(135deg,#07070a,#16161b_55%,#08080b)]" />
            <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:30px_30px]" />
            <div className="nif-orb absolute -right-24 top-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="nif-orb nif-orb-delay absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12 lg:py-20">
            <div className="nif-reveal">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a79bff]">
                ABC de las NIF
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Aprende a interpretar estados financieros con las bases esenciales de las NIF
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
                Participa en una clase gratuita y en vivo para comprender cómo se aplican las Normas de Información Financiera, leer reportes con mayor criterio contable y evitar errores comunes al analizar una empresa.
              </p>

              <div className="mt-7 grid gap-3 text-sm font-black uppercase tracking-[0.08em] sm:grid-cols-3">
                <div className="rounded-xl border border-white/15 bg-white/[0.07] p-4">31 de julio de 2026</div>
                <div className="rounded-xl border border-white/15 bg-white/[0.07] p-4">11:00 a. m. · Hora de CDMX</div>
                <div className="rounded-xl border border-[#8d7dff]/50 bg-[#7c42ff]/15 p-4 text-[#c9c2ff]">Clase gratuita en vivo</div>
              </div>

              <p className="mt-6 text-sm font-bold text-white/75">
                Impartida por el Mtro. Alfredo Cobos · Instructor de CEFIN
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" onClick={scrollToForm} className={ctaClass}>
                  ¡Sí, quiero registrarme gratis!
                </button>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                  Paso 1 de 2 · Deja tus datos y después completa tu acceso entrando al grupo oficial de WhatsApp.
                </p>
              </div>
            </div>

            <div className="nif-reveal nif-reveal-delay relative mx-auto hidden w-full max-w-md lg:block">
              <div className="nif-glow absolute inset-8 rounded-full bg-violet-500/25 blur-3xl" />
              <div className="relative flex min-h-[420px] items-end justify-center">
                <Image src="/alfredo.png" alt="Mtro. Alfredo Cobos, instructor de CEFIN" width={800} height={800} priority sizes="(min-width: 1024px) 40vw, 0px" className="nif-float relative max-h-[560px] h-auto w-full object-contain" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#a79bff]">Una clase, bases que sí usarás</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Lo que aprenderás en esta clase</h2>
              <ul className="mt-7 grid gap-4">
                {benefits.map((item) => <li key={item} className="nif-card rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-base leading-relaxed text-white/80"><span className="mr-3 text-[#a79bff]">✓</span>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#111618] p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#a79bff]">Para quién es</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Esta clase es para ti si…</h2>
              <ul className="mt-7 grid gap-4">
                {audience.map((item) => <li key={item} className="nif-card flex gap-3 rounded-xl p-3 text-base leading-relaxed text-white/75"><span className="mt-1 text-[#a79bff]">→</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="registro-formulario" className="scroll-mt-6 border-y border-white/10 bg-[#f6f8f2] px-5 py-14 text-[#172015] sm:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#4d7c18]">Paso 1 de 2</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Registra tus datos para apartar tu lugar</h2>
            <p className="mt-4 leading-relaxed text-[#41503e]">Completa el formulario para guardar tus datos.</p>
            <p className="mt-2 leading-relaxed text-[#41503e]">Al terminar, te enviaremos al último paso: entrar al grupo oficial de WhatsApp, donde recibirás el acceso, los recordatorios y los avisos de la clase.</p>
            <p className="mt-8 text-center text-sm font-black uppercase tracking-[0.2em] text-[#4d7c18]">Completa el formulario ahora</p>
            <div className="mt-5 rounded-3xl bg-white p-5 shadow-xl sm:p-8"><div className={`${FORM_CLASS} min-h-[440px]`} /></div>
            <p className="mt-5 text-sm font-bold leading-relaxed text-[#8b3d15]">Importante: después de enviar tus datos, todavía deberás entrar al grupo oficial de WhatsApp para completar tu acceso.</p>
            <p className="mt-5 text-xs leading-relaxed text-[#596455]">Al registrarte aceptas recibir información relacionada con esta clase y reconoces nuestro aviso de privacidad.</p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#3156ff_0%,#7c42ff_100%)] px-5 py-14 text-white sm:px-8 lg:py-20">
          <div className="nif-cta-shine pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">No sigas interpretando reportes sin entender la lógica detrás de los números</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">Fortalece tus bases en las NIF y aprende a leer información financiera con mayor criterio contable.</p>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.12em]">31 de julio de 2026 · 11:00 a. m. · Hora de CDMX</p>
            <button type="button" onClick={scrollToForm} className="nif-button mt-8 inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-black uppercase text-[#11131a] transition hover:bg-[#e7e3ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:text-base">¡Quiero mi lugar gratis!</button>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-white/70">Solo toma un momento. Después completarás tu acceso en WhatsApp.</p>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .${FORM_CLASS}, .${FORM_CLASS} form { width: 100% !important; max-width: 100% !important; margin: 0 auto !important; padding: 0 !important; background: transparent !important; border: 0 !important; box-shadow: none !important; }
        .${FORM_CLASS} ._form-title, .${FORM_CLASS} ._form-branding { display: none !important; }
        .${FORM_CLASS} ._form_element, .${FORM_CLASS} ._field-wrapper, .${FORM_CLASS} ._button-wrapper { margin-bottom: 16px !important; }
        .${FORM_CLASS} p { margin-bottom: 14px !important; color: #334155 !important; font-size: 14px !important; line-height: 1.6 !important; }
        .${FORM_CLASS} ._form-label { color: #334155 !important; font-size: 13px !important; font-weight: 800 !important; margin-bottom: 6px !important; }
        .${FORM_CLASS} input, .${FORM_CLASS} select, .${FORM_CLASS} textarea { width: 100% !important; min-height: 48px !important; border-radius: 14px !important; border: 1px solid #dbe2d8 !important; background: #f8faf8 !important; padding: 13px 14px !important; color: #172015 !important; font-size: 16px !important; }
        .${FORM_CLASS} ._submit, .${FORM_CLASS} button[type="submit"] { width: 100% !important; min-height: 56px !important; border: 0 !important; border-radius: 16px !important; background: linear-gradient(90deg,#3156ff,#7c42ff) !important; color: white !important; padding: 15px 18px !important; font-size: 14px !important; font-weight: 900 !important; text-transform: uppercase !important; cursor: pointer !important; box-shadow: 0 12px 30px rgba(49,86,255,.25) !important; }
        .nif-button { transform: translateZ(0); }
        .nif-button:hover { transform: translateY(-2px); box-shadow: 0 20px 55px rgba(124,66,255,.3); }
        .nif-card { transition: transform .3s ease, border-color .3s ease, background-color .3s ease; }
        .nif-card:hover { transform: translateY(-3px); border-color: rgba(167,155,255,.38); background-color: rgba(255,255,255,.08); }
        .nif-reveal { animation: nif-reveal .7s cubic-bezier(.22,1,.36,1) both; }
        .nif-reveal-delay { animation-delay: .12s; }
        .nif-float { animation: nif-float 6s ease-in-out infinite; }
        .nif-orb { animation: nif-orb 9s ease-in-out infinite alternate; }
        .nif-orb-delay { animation-delay: -3s; }
        .nif-glow { animation: nif-glow 5s ease-in-out infinite alternate; }
        .nif-cta-shine { animation: nif-float 8s ease-in-out infinite; }
        @keyframes nif-reveal { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes nif-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes nif-orb { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(-18px,12px,0) scale(1.08); } }
        @keyframes nif-glow { from { opacity: .5; transform: scale(.96); } to { opacity: .9; transform: scale(1.04); } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation: none !important; } }
      `}</style>
    </>
  );
}
