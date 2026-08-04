"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { createRestaurantesRegistrationAttempt } from "@/lib/restaurantes-tracking-session";

const ACTIVE_CAMPAIGN_FORM_ID = 309;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const VIEW_CONTENT_KEY = "restaurantesViewContentSent";
const LEAD_KEY = "restaurantesLeadSent";

export default function RestaurantesLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(VIEW_CONTENT_KEY)) return;

    window.sessionStorage.setItem(VIEW_CONTENT_KEY, "true");
    trackMetaEvent("ViewContent", {
      content_name: "Asesor Fiscal de Restaurantes",
      content_category: "Clase gratuita",
      landing_slug: "restaurantes",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const triggerElement = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        "button, input, select, textarea, a[href], [tabindex]:not([tabindex='-1'])",
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.querySelector<HTMLElement>("button, input")?.focus();

    const previousScript = document.getElementById(
      "activecampaign-restaurantes-form-309",
    );
    previousScript?.remove();

    const formContainer = document.querySelector(`.${FORM_CLASS}`);
    if (formContainer) formContainer.innerHTML = "";

    const script = document.createElement("script");
    script.id = "activecampaign-restaurantes-form-309";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      const form = document.querySelector<HTMLFormElement>(
        `.${FORM_CLASS} form`,
      );
      if (!form || form.dataset.restaurantesBound) return;

      form.dataset.restaurantesBound = "true";
      form.addEventListener("submit", () => {
        const attempt = createRestaurantesRegistrationAttempt();
        if (window.sessionStorage.getItem(LEAD_KEY)) return;

        window.sessionStorage.setItem(LEAD_KEY, "true");
        trackMetaEvent("Lead", {
          content_name: "Asesor Fiscal de Restaurantes",
          content_category: "Clase gratuita",
          landing_slug: "restaurantes",
          value: 0,
          currency: "MXN",
        }, { eventID: attempt.id });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      script.remove();
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      (previousActiveElement || triggerElement)?.focus();
    };
  }, [isModalOpen]);

  return (
    <>
      <Script
        id="meta-pixel-restaurantes"
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

      <main className="relative overflow-x-hidden bg-[#0b0806] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_44%,rgba(173,77,12,0.32),transparent_30%),radial-gradient(circle_at_14%_80%,rgba(91,35,9,0.34),transparent_32%),linear-gradient(115deg,#030303_0%,#0b0806_52%,#160c05_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,153,51,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,153,51,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="absolute -right-24 top-[-12%] h-[70%] w-[42%] rotate-12 rounded-full bg-orange-700/20 blur-[90px]" />
          <div className="absolute bottom-[-20%] left-[22%] h-[46%] w-[50%] rounded-full bg-amber-500/10 blur-[100px]" />
        </div>

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
          <span className="text-3xl font-black tracking-[-0.06em] sm:text-4xl">CEFIN</span>
          <span className="hidden rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-200 sm:inline-flex">
            Clase gratuita en vivo
          </span>
        </header>

        <section className="relative z-10 mx-auto flex max-w-7xl flex-col gap-3 px-6 pb-6 pt-2 sm:px-10 lg:grid lg:min-h-[calc(100svh-88px)] lg:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.62fr)] lg:items-center lg:gap-0 lg:px-14 lg:pb-16">
          <div className="relative z-20 order-1 max-w-3xl py-8 lg:order-none lg:py-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-400/35 bg-black/40 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-orange-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.9)]" />
              Para contadores y asesores fiscales
            </p>
            <p className="mt-7 text-xl font-black uppercase leading-tight tracking-[0.04em] text-[#f5e6d0] sm:text-3xl">
              Aprende a asesorar fiscalmente a
            </p>
            <h1 aria-label="Aprende a asesorar fiscalmente a restaurantes y negocios de comida" className="mt-1 max-w-full bg-gradient-to-r from-orange-300 via-orange-500 to-red-500 bg-clip-text text-6xl font-black uppercase leading-[0.84] tracking-[-0.075em] text-transparent sm:text-8xl lg:text-[clamp(4rem,5.4vw,5.8rem)]">
              Restaurantes
            </h1>
            <p className="mt-4 max-w-xl text-xl font-black uppercase leading-tight text-[#f5e6d0] sm:text-3xl">
              y negocios de comida
            </p>
            <div className="hidden mt-7 max-w-2xl border-l-4 border-orange-500 bg-black/45 px-5 py-4 backdrop-blur-sm sm:px-7 sm:py-5">
              <p className="text-xl font-black uppercase leading-tight text-white sm:text-3xl">
                ¿Qué responderías si mañana llega un restaurante a tu despacho?
              </p>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
              Descubre qué debes revisar, preguntar y considerar para atender
              con mayor seguridad a restaurantes, cafeterías y negocios de alimentos.
            </p>
            <ul className="mt-4 grid max-w-2xl grid-cols-3 gap-2 text-[11px] font-bold leading-tight text-white/85 sm:gap-3 sm:text-sm">
              <li className="flex items-start gap-2"><span className="text-orange-400">✓</span>Identifica los puntos fiscales que debes revisar.</li>
              <li className="flex items-start gap-2"><span className="text-orange-400">✓</span>Evita errores al recibir este tipo de clientes.</li>
              <li className="flex items-start gap-2"><span className="text-orange-400">✓</span>Brinda una asesoría con mayor criterio y seguridad.</li>
            </ul>

            <div className="mt-5 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-orange-500/45 bg-black/65 text-[10px] font-black uppercase leading-tight tracking-[0.06em] backdrop-blur sm:text-xs">
              <div className="hidden">
                <span className="block text-orange-400">Clase</span>
                <span className="mt-1 block text-white">Gratuita</span>
              </div>
              <div className="border-r border-orange-500/25 px-2 py-3 sm:px-4">
                <span className="block text-orange-400">Fecha</span>
                <span className="mt-1 block text-white">11 de agosto</span>
              </div>
              <div className="border-r border-orange-500/25 px-2 py-3 sm:px-4">
                <span className="block text-orange-400">Hora</span>
                <span className="mt-1 block text-white">11:00 AM CDMX</span>
              </div>
              <div className="px-2 py-3 sm:px-4">
                <span className="block text-orange-400">Modalidad</span>
                <span className="mt-1 block text-white">En línea</span>
              </div>
            </div>

            <p className="hidden mt-5 text-sm font-bold uppercase tracking-[0.16em] text-white/65">
              Impartida por el Mtro. Alfredo Cobos · CEFIN
            </p>
            <button
              type="button"
              ref={triggerRef}
              onClick={() => setIsModalOpen(true)}
              className="mt-5 inline-flex min-h-[56px] items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-7 py-4 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[0_18px_50px_rgba(234,88,12,0.3)] transition hover:-translate-y-1 hover:from-orange-400 hover:to-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300 active:translate-y-0 sm:text-base"
            >
              Reservar mi lugar gratis
              <span className="ml-3 text-xl" aria-hidden="true">→</span>
            </button>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-orange-100/65">
              Registro gratuito · Recibe el acceso y los recordatorios de la clase.
            </p>
          </div>

          <div className="pointer-events-none relative z-10 order-2 mt-[-1rem] h-[340px] w-full sm:h-[430px] lg:order-none lg:mt-0 lg:h-[calc(100svh-120px)] lg:min-h-[560px] lg:w-full lg:pl-12 lg:pr-2">
            <div className="absolute inset-[8%] bg-[radial-gradient(circle,rgba(185,83,18,0.34),transparent_68%)]" />
            <Image
              src="/restaurantes/alfredo-restaurantes.png"
              alt="Mtro. Alfredo Cobos"
              width={800}
              height={800}
              priority
              sizes="(min-width: 1024px) 44vw, 72vw"
              className="absolute bottom-0 left-1/2 h-full w-auto max-w-[96%] -translate-x-1/2 object-contain object-bottom opacity-95 mix-blend-screen drop-shadow-[0_26px_50px_rgba(0,0,0,0.75)] lg:left-auto lg:right-0 lg:max-w-[88%] lg:translate-x-0"
            />
            <div className="absolute bottom-5 right-3 z-20 text-right sm:right-8">
              <p className="text-sm font-black text-white">Mtro. Alfredo Cobos</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-200">Especialista fiscal · CEFIN</p>
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md" role="presentation">
            <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="restaurantes-form-title" className="relative max-h-[92svh] w-full max-w-[520px] overflow-y-auto rounded-[2rem] border border-orange-500/35 bg-[#fffaf5] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:p-8">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar formulario"
                className="absolute right-5 top-4 text-2xl font-bold text-slate-500 transition hover:text-slate-900"
              >
                ×
              </button>
              <p className="pr-8 text-[11px] font-black uppercase tracking-[0.24em] text-orange-600">
                Asesor Fiscal de Restaurantes
              </p>
              <h2 id="restaurantes-form-title" className="mt-2 pr-8 text-3xl font-black uppercase leading-tight text-slate-900">
                Regístrate gratis
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Completa tus datos para reservar tu lugar en la clase del 11 de agosto.
              </p>
              <div className="mt-6 min-h-[430px]">
                <div className={FORM_CLASS} />
              </div>
              <p className="mt-4 text-center text-xs font-bold text-slate-500">
                Evento en línea · 11:00 AM, hora CDMX
              </p>
            </div>
          </div>
        )}

        <style jsx global>{`
          .${FORM_CLASS},
          .${FORM_CLASS} form {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }
          .${FORM_CLASS} ._form-title,
          .${FORM_CLASS} ._form-branding {
            display: none !important;
          }
          .${FORM_CLASS} ._form_element,
          .${FORM_CLASS} ._field-wrapper,
          .${FORM_CLASS} ._button-wrapper {
            margin-bottom: 14px !important;
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
            min-height: 48px !important;
            border: 1px solid #fed7aa !important;
            border-radius: 14px !important;
            background: #fffaf5 !important;
            color: #1e293b !important;
            padding: 13px 14px !important;
            font-size: 16px !important;
          }
          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            min-height: 56px !important;
            border: 0 !important;
            border-radius: 16px !important;
            background: linear-gradient(90deg, #ea580c, #dc2626) !important;
            color: #fff !important;
            padding: 15px 18px !important;
            font-size: 14px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            cursor: pointer !important;
          }
          .${FORM_CLASS} p {
            color: #475569 !important;
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
        `}</style>
      </main>
    </>
  );
}
