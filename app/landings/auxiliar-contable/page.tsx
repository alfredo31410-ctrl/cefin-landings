"use client";

import { MetaPixel } from "@/components/meta-pixel";
import { createRegistrationProof } from "@/lib/registration-session";
import {
  captureTrafficAttribution,
  withTrafficAttribution,
} from "@/lib/traffic-attribution";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ACTIVE_CAMPAIGN_FORM_ID = 283;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const LANDING_SLUG = "auxiliar-contable";
const LANDING_PATH = "/landings/auxiliar-contable";

export default function LandingCEFIN() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const successHandledRef = useRef(false);

  useEffect(() => {
    document.title = "Auxiliar Contable - Entrenamiento en vivo | CEFIN";
    captureTrafficAttribution(window.location.search, LANDING_SLUG);
  }, []);

  // Carga el embed al abrir y limpia su contenido para evitar formularios duplicados.
  useEffect(() => {
    if (!isModalOpen) return;

    const formRoot = document.querySelector(`.${FORM_CLASS}`);
    if (formRoot) formRoot.innerHTML = "";
    document.getElementById("ac-script-loader")?.remove();

    const script = document.createElement("script");
    script.id = "ac-script-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, [isModalOpen]);

  // ActiveCampaign confirma éxito reemplazando el formulario por ._form-thank-you.
  // No se crea evidencia al enviar: eso contaría formularios rechazados por el proveedor.
  useEffect(() => {
    if (!isModalOpen) return;
    const formRoot = document.querySelector(`.${FORM_CLASS}`);
    if (!formRoot) return;

    const detectSuccess = () => {
      const confirmation = formRoot.querySelector<HTMLElement>("._form-thank-you");
      if (!confirmation || successHandledRef.current) return;

      const isVisible =
        confirmation.getClientRects().length > 0 &&
        window.getComputedStyle(confirmation).display !== "none";
      if (!isVisible) return;

      successHandledRef.current = true;
      createRegistrationProof();
      router.replace(
        withTrafficAttribution(`${LANDING_PATH}/gracias`),
      );
    };

    const observer = new MutationObserver(detectSuccess);
    observer.observe(formRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    detectSuccess();
    return () => observer.disconnect();
  }, [isModalOpen, router]);

  // Gestiona foco, tecla Escape y scroll para que el modal sea operable con teclado.
  useEffect(() => {
    if (!isModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
    };
  }, [isModalOpen]);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget;
    successHandledRef.current = false;
    setIsModalOpen(true);
  };

  return (
    <>
      <MetaPixel pageKey="auxiliar-landing" />
      <main className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0f172a] font-sans text-white">
        {/* El fondo conserva identidad visual sin competir con el mensaje principal. */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[-10%] top-[5%] h-[300px] w-[300px] rounded-full bg-fuchsia-600/35 blur-[100px] sm:h-[500px] sm:w-[500px]" />
          <div className="absolute inset-0 hidden lg:block [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
            <img
              src="/alfredo.png"
              alt="Mtro. Alfredo Cobos, instructor del entrenamiento"
              className="absolute inset-0 h-full w-full -translate-x-[18%] scale-110 object-contain object-left-bottom opacity-80"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/20 to-[#0f172a]" />
        </div>

        <header className="relative z-20 flex justify-end px-5 py-5 sm:px-8 lg:px-12">
          <div className="border-r-4 border-fuchsia-600 pr-4 text-right">
            <p className="text-2xl font-black leading-none tracking-tighter">CEFIN</p>
            <p className="text-[10px] font-bold uppercase text-slate-400">Mtro. Alfredo Cobos</p>
          </div>
        </header>

        <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-8 sm:px-8 lg:py-12">
          <div className="grid w-full lg:grid-cols-12">
            <div className="mx-auto max-w-3xl text-center lg:col-start-5 lg:col-span-8 lg:mx-0 lg:text-left">
              <p className="inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-200 sm:text-xs">
                Entrenamiento gratuito en vivo
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                Aprende las bases para comenzar como auxiliar contable y entender la operación diaria
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0 lg:text-xl">
                En esta sesión en vivo verás cómo organizar información contable básica, controlar facturas y entender la reportería esencial, aunque hoy estés empezando.
              </p>

              <div className="mt-7 grid gap-3 text-left sm:grid-cols-3">
                {[['Fecha', 'Martes 28 de julio'], ['Hora', '11:00 a. m. · CDMX'], ['Modalidad', 'En vivo y 100% gratis']].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-300">{label}</p>
                    <p className="mt-1 text-sm font-bold text-white sm:text-base">{value}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={openModal}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-fuchsia-600 px-8 py-5 text-lg font-black text-white shadow-[0_15px_40px_rgba(230,0,126,0.35)] transition hover:bg-fuchsia-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-300 active:scale-[0.98] sm:w-auto sm:text-xl"
              >
                Reservar mi lugar gratis
              </button>
              <p className="mt-3 text-sm text-slate-400">Registro gratuito · Al finalizar pasarás al grupo oficial de WhatsApp.</p>
            </div>
          </div>
        </section>

        {/* Se eliminó el enlace a cefin.mx: esta página conserva un único objetivo de conversión. */}
        <footer className="relative z-10 px-5 pb-8 pt-5 text-center text-xs text-slate-500">
          CEFIN · Capacitación contable práctica
        </footer>

        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/95 p-3 backdrop-blur-md sm:p-5"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsModalOpen(false);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="registration-modal-title"
              aria-describedby="registration-modal-description"
              className="relative max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-3xl border-t-8 border-fuchsia-600 bg-white p-5 text-slate-900 shadow-[0_0_60px_rgba(230,0,126,0.35)] sm:p-8"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar formulario de registro"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-fuchsia-600"
              >
                ×
              </button>
              <div className="pr-10">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-fuchsia-600">Paso 1 de 2</p>
                <h2 id="registration-modal-title" className="mt-2 text-2xl font-black leading-tight sm:text-3xl">Aparta tu lugar gratis</h2>
                <p id="registration-modal-description" className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Guarda tus datos para apartar tu lugar gratis. Después pasarás al último paso para entrar al grupo oficial de WhatsApp y completar tu acceso.
                </p>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-3 sm:p-4">
                <div className={`${FORM_CLASS} min-h-[360px]`} aria-live="polite" />
              </div>
              <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">Usaremos tus datos para gestionar tu registro y enviarte información de este entrenamiento.</p>
            </section>
          </div>
        )}

        <style jsx global>{`
          .${FORM_CLASS}, .${FORM_CLASS} ._form-content, .${FORM_CLASS} ._form-body { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background: transparent !important; }
          .${FORM_CLASS} ._form-title, .${FORM_CLASS} ._form-branding { display: none !important; }
          .${FORM_CLASS} input, .${FORM_CLASS} select, .${FORM_CLASS} textarea { width: 100% !important; border: 1px solid #cbd5e1 !important; border-radius: 12px !important; background: white !important; padding: 0.9rem !important; color: #0f172a !important; }
          .${FORM_CLASS} input:focus, .${FORM_CLASS} select:focus, .${FORM_CLASS} textarea:focus { border-color: #c026d3 !important; outline: 3px solid rgba(192,38,211,.18) !important; }
          .${FORM_CLASS} ._submit, .${FORM_CLASS} button[type='submit'] { width: 100% !important; border: 0 !important; border-radius: 14px !important; background: #c026d3 !important; padding: 1rem !important; color: white !important; font-size: 1rem !important; font-weight: 900 !important; cursor: pointer !important; }
        `}</style>
      </main>
    </>
  );
}
