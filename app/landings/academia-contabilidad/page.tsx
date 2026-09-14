"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import {
  captureAcademiaAttribution,
  clearAcademiaRegistrationProof,
  createAcademiaRegistrationProof,
  syncAcademiaAttributionFields,
} from "@/lib/academia-contabilidad-tracking-session";

const ACTIVE_CAMPAIGN_FORM_ID = 347;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/academia-contabilidad/alfredo.png";
const WEBINAR_EVENT = {
  content_name: "Academia de Contabilidad Básica",
  content_category: "Clase gratuita",
  landing_slug: "academia-contabilidad",
  event_date: "2026-09-22",
  event_time: "11:00 a. m. CDMX",
} as const;

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
    captureAcademiaAttribution();

    trackMetaEvent("ViewContent", {
      ...WEBINAR_EVENT,
      source: "landing_page",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const oldScript = document.getElementById(
      "activecampaign-academia-contabilidad-form-347",
    );
    if (oldScript) oldScript.remove();

    const existingFormNode = document.querySelector(`.${FORM_CLASS}`);
    if (existingFormNode) {
      existingFormNode.innerHTML = "";
    }

    let boundForm: HTMLFormElement | null = null;
    let proofTimeoutId: number | undefined;
    const phoneSpacingTimeoutIds: number[] = [];

    const fixPhoneInputSpacing = (form: HTMLFormElement) => {
      const phoneInput =
        form.querySelector<HTMLInputElement>(".iti input.iti__tel-input") ??
        form.querySelector<HTMLInputElement>(
          '.iti input:not([type="hidden"])',
        ) ??
        form.querySelector<HTMLInputElement>(
          'input[name="phone"]:not([type="hidden"])',
        );
      if (!phoneInput) return;

      phoneInput.placeholder = "Número a 10 dígitos";
      phoneInput.inputMode = "tel";
      phoneInput.style.setProperty("padding-left", "96px", "important");
      phoneInput.style.setProperty("padding-right", "15px", "important");
    };

    const schedulePhoneInputSpacing = (form: HTMLFormElement) => {
      fixPhoneInputSpacing(form);
      [250, 1000].forEach((delay) => {
        phoneSpacingTimeoutIds.push(
          window.setTimeout(() => fixPhoneInputSpacing(form), delay),
        );
      });
    };

    const handleSubmit = () => {
      if (!boundForm) return;
      syncAcademiaAttributionFields(boundForm);
      clearAcademiaRegistrationProof();

      if (!boundForm.checkValidity()) return;

      createAcademiaRegistrationProof();

      if (proofTimeoutId !== undefined) {
        window.clearTimeout(proofTimeoutId);
      }
      proofTimeoutId = window.setTimeout(() => {
        if (!boundForm || boundForm.querySelector("._error, ._form_error")) {
          clearAcademiaRegistrationProof();
        }
      }, 0);
    };

    const bindForm = () => {
      const form = document.querySelector<HTMLFormElement>(
        `.${FORM_CLASS} form`,
      );
      if (!form || form === boundForm) {
        if (form) fixPhoneInputSpacing(form);
        if (boundForm?.querySelector("._error, ._form_error")) {
          clearAcademiaRegistrationProof();
        }
        return;
      }

      boundForm?.removeEventListener("submit", handleSubmit, true);
      boundForm = form;
      syncAcademiaAttributionFields(form);
      schedulePhoneInputSpacing(form);
      form.addEventListener("submit", handleSubmit, true);
    };

    const observer = new MutationObserver(bindForm);
    observer.observe(document.body, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.id = "activecampaign-academia-contabilidad-form-347";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      boundForm?.removeEventListener("submit", handleSubmit, true);
      if (proofTimeoutId !== undefined) window.clearTimeout(proofTimeoutId);
      phoneSpacingTimeoutIds.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      script.remove();
    };
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0,rgba(255,255,255,0)_58%)] opacity-[0.18]" />
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

        <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
          <div className="text-2xl font-black tracking-tight sm:text-3xl">CEFIN</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-tight text-[#25072d] transition hover:scale-[1.02] md:inline-flex"
          >
            Registrarme
          </button>
        </header>

        <section className="relative z-30 mx-auto flex min-h-[calc(100svh-76px)] max-w-7xl items-center overflow-hidden px-4 pb-12 pt-3 min-[380px]:px-5 sm:min-h-[calc(100svh-88px)] sm:px-8 sm:pb-14 sm:pt-4 lg:overflow-visible lg:px-10">
          <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
            <img
              src={HERO_IMAGE_URL}
              alt=""
              className="absolute bottom-[22%] left-1/2 h-[55%] w-auto max-w-none -translate-x-1/2 object-contain opacity-70 drop-shadow-[0_20px_45px_rgba(0,0,0,0.24)] min-[480px]:bottom-[20%] sm:bottom-[16%] sm:h-[62%] md:bottom-[14%] md:h-[66%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,4,36,0.08)_0%,rgba(28,4,36,0.3)_48%,rgba(25,3,32,0.86)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1a0321] via-[#1a0321]/92 to-transparent" />
          </div>

          <div className="relative z-10 ml-auto w-full max-w-4xl">
            <div className="flex flex-col items-stretch gap-4 sm:gap-5 lg:items-end">
              <div className="w-full max-w-[520px] rounded-[1.5rem] border border-white/10 bg-white/12 px-5 py-5 text-left shadow-[0_18px_60px_rgba(255,94,122,0.18)] backdrop-blur sm:rounded-[2rem] sm:px-6 sm:py-5 lg:-mt-4 lg:text-right">
                <p className="text-[clamp(1.2rem,5.2vw,1.875rem)] leading-[1.18] text-white">
                  Aprende Contabilidad desde Cero y transforma tu forma de
                  entender los negocios.
                </p>
                <p className="mt-4 text-[clamp(1.65rem,7vw,2.25rem)] font-black leading-[1.12] text-white sm:mt-3">
                  Martes 22 de septiembre, 11:00 a. m. (CDMX)
                </p>
              </div>

              <div className="w-full max-w-full overflow-hidden py-1 text-center lg:overflow-visible lg:text-right">
                <p className="text-[clamp(1.8rem,8.8vw,3.2rem)] font-black uppercase leading-none tracking-[0.2em] text-white/72 sm:tracking-[0.28em]">
                  Academia
                </p>
                <p
                  className="mt-1 text-[clamp(3.4rem,18vw,8.7rem)] font-black uppercase leading-[0.82] tracking-[-0.08em] text-transparent opacity-95"
                  style={{ WebkitTextStroke: "2px #ff6a57" }}
                >
                  BÁSICA
                </p>
                <h1 className="mt-0 whitespace-nowrap text-[clamp(2.1rem,10.2vw,6.7rem)] font-black uppercase leading-[0.94] tracking-[-0.035em] text-white sm:-mt-2 sm:tracking-[0.01em]">
                  Contabilidad
                </h1>
              </div>

              <div className="w-full max-w-[760px] text-center lg:text-right">
                <p className="text-sm font-medium text-white/82 min-[380px]:text-base sm:text-xl">
                  Impartida por: Mtro. Alfredo Cobos
                </p>
                <p className="mt-4 text-[clamp(1.65rem,7vw,2.25rem)] font-black leading-tight text-white sm:mt-5">
                  Acceso 100% en línea
                </p>
                <div className="mx-auto mt-3 h-1 w-full max-w-[420px] bg-gradient-to-r from-[#ff5e7a] via-[#d85cff] to-[#8b5cf6] lg:mx-0 lg:ml-auto" />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] border border-fuchsia-300/25 bg-gradient-to-r from-[#ff5e7a]/12 via-fuchsia-500/12 to-violet-500/12 p-3 shadow-[0_18px_60px_rgba(216,92,255,0.16)] backdrop-blur sm:ml-auto sm:w-fit sm:flex-row sm:items-center sm:gap-4 sm:p-3 lg:justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex min-h-16 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff5e7a] via-[#d85cff] to-[#8b5cf6] px-4 py-4 text-center text-sm font-black uppercase leading-tight tracking-tight text-white shadow-[0_18px_55px_rgba(216,92,255,0.38)] ring-2 ring-white/25 transition hover:scale-[1.01] hover:brightness-110 active:scale-[0.98] min-[380px]:px-6 min-[380px]:text-base sm:w-auto sm:px-9 sm:py-5 sm:text-lg"
              >
                Quiero registrarme gratis
              </button>
              <p className="px-2 text-center text-xs font-bold uppercase leading-relaxed tracking-[0.16em] text-white/80 sm:max-w-32 sm:px-0 sm:text-left sm:text-sm">
                Formulario rápido · Cupo limitado
              </p>
            </div>

            <div className="mt-8 grid max-w-5xl gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:ml-auto">
              {bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-sm font-semibold leading-relaxed text-white/82 backdrop-blur sm:p-4"
                >
                  <span className="mr-2 text-[#ff6a57]">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-30 border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-7xl px-4 py-12 min-[380px]:px-5 sm:px-8 sm:py-16 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ff7fa2]">
                  Lo que vas a trabajar
                </p>
                <h2 className="mt-3 text-[clamp(2rem,9vw,2.25rem)] font-black leading-[1.08] tracking-tight text-white sm:text-4xl">
                  Una clase clara para entender contabilidad sin sentir que todo
                  es demasiado técnico.
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
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/85 p-0 backdrop-blur-md sm:items-center sm:p-4">
            <div className="relative flex max-h-[96dvh] w-full max-w-[540px] flex-col overflow-hidden rounded-t-[1.5rem] border border-fuchsia-300/60 bg-white shadow-[0_30px_110px_rgba(216,92,255,0.38)] sm:max-h-[92dvh] sm:rounded-[2rem] sm:border-2">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff5e7a] via-[#d85cff] to-[#8b5cf6]" />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-500 transition hover:text-slate-900 sm:right-5 sm:top-4"
                aria-label="Cerrar modal"
              >
                ×
              </button>

              <div className="shrink-0 bg-gradient-to-b from-fuchsia-50 via-white to-white px-5 pb-4 pt-6 text-center sm:px-8 sm:pb-5 sm:pt-8">
                <p className="inline-flex rounded-full border border-fuchsia-200 bg-fuchsia-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-fuchsia-700">
                  Registro gratuito · 1 minuto
                </p>
                <h3 className="mt-2 pr-8 text-2xl font-black uppercase tracking-tight text-slate-900 sm:pr-0 sm:text-3xl">
                  Academia Contabilidad
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm font-medium text-slate-600">
                  Completa tus datos y asegura tu acceso a la clase gratuita.
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-slate-50 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-7 sm:pb-7 sm:pt-4">
                <div className="min-h-[360px] rounded-[1.25rem] border border-fuchsia-100 bg-white p-3 shadow-[0_12px_40px_rgba(88,28,135,0.10)] sm:min-h-[420px] sm:p-5">
                  <div className={FORM_CLASS}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .${FORM_CLASS}, .${FORM_CLASS} form {
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

          .${FORM_CLASS} ._form-content,
          .${FORM_CLASS} ._inline-style {
            width: 100% !important;
            max-width: 100% !important;
          }

          .${FORM_CLASS} p {
            margin: 0 0 14px 0 !important;
            color: #334155 !important;
            font-size: 14px !important;
            line-height: 1.65 !important;
          }

          .${FORM_CLASS} ._form-label {
            color: #1e293b !important;
            font-size: 13px !important;
            font-weight: 800 !important;
            margin-bottom: 6px !important;
          }

          .${FORM_CLASS} input,
          .${FORM_CLASS} select,
          .${FORM_CLASS} textarea {
            width: 100% !important;
            border-radius: 15px !important;
            border: 1.5px solid #cbd5e1 !important;
            background: #ffffff !important;
            padding: 14px 16px !important;
            color: #0f172a !important;
            font-size: 15px !important;
            outline: none !important;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05) !important;
            transition:
              border-color 160ms ease,
              box-shadow 160ms ease !important;
          }

          .${FORM_CLASS} input:focus,
          .${FORM_CLASS} select:focus,
          .${FORM_CLASS} textarea:focus {
            border-color: #d85cff !important;
            box-shadow:
              0 0 0 4px rgba(216, 92, 255, 0.14),
              0 4px 14px rgba(88, 28, 135, 0.09) !important;
          }

          .${FORM_CLASS} input::placeholder,
          .${FORM_CLASS} textarea::placeholder {
            color: #94a3b8 !important;
          }

          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            border: 0 !important;
            border-radius: 18px !important;
            background: linear-gradient(
              90deg,
              #ff5e7a 0%,
              #d85cff 55%,
              #8b5cf6 100%
            ) !important;
            color: white !important;
            padding: 16px 20px !important;
            font-size: 15px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            cursor: pointer !important;
            box-shadow: 0 14px 34px rgba(168, 85, 247, 0.34) !important;
            transition:
              transform 160ms ease,
              filter 160ms ease !important;
          }

          .${FORM_CLASS} ._submit:hover,
          .${FORM_CLASS} button[type="submit"]:hover {
            filter: brightness(1.08) !important;
            transform: translateY(-1px) !important;
          }

          .${FORM_CLASS} ._submit:active,
          .${FORM_CLASS} button[type="submit"]:active {
            transform: translateY(1px) !important;
          }

          @media (max-width: 639px) {
            .${FORM_CLASS} ._form_element,
            .${FORM_CLASS} ._field-wrapper,
            .${FORM_CLASS} ._button-wrapper {
              margin-bottom: 10px !important;
            }

            .${FORM_CLASS} input,
            .${FORM_CLASS} select,
            .${FORM_CLASS} textarea {
              min-height: 48px !important;
              padding: 12px 14px !important;
              font-size: 16px !important;
            }

            .${FORM_CLASS} ._submit,
            .${FORM_CLASS} button[type="submit"] {
              min-height: 52px !important;
              padding: 13px 16px !important;
              font-size: 14px !important;
            }
          }

          /*
           * ActiveCampaign injects ID-based rules after this page renders.
           * The repeated wrapper plus :is() keeps these overrides scoped to
           * form 347 while giving them enough specificity to win safely.
           */
          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"]) {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            border-radius: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
            color: #1e293b !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            ._form-content {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #1e293b !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            ._form_element {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 0 16px !important;
            padding: 0 !important;
            background: transparent !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            ._form-label {
            display: block !important;
            width: 100% !important;
            margin: 0 0 7px !important;
            color: #1e293b !important;
            font-size: 13px !important;
            font-weight: 800 !important;
            line-height: 1.35 !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            input:not([type="checkbox"]):not([type="radio"]),
          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            select,
          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            textarea:not(.g-recaptcha-response) {
            display: block !important;
            width: 100% !important;
            min-height: 52px !important;
            box-sizing: border-box !important;
            border: 1.5px solid #cbd5e1 !important;
            border-radius: 14px !important;
            background: #ffffff !important;
            padding: 13px 15px !important;
            color: #0f172a !important;
            font-size: 16px !important;
            line-height: 1.35 !important;
            box-shadow: 0 3px 10px rgba(15, 23, 42, 0.06) !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            input:not([type="checkbox"]):not([type="radio"]):focus,
          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            select:focus,
          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            textarea:not(.g-recaptcha-response):focus {
            border-color: #c026d3 !important;
            outline: none !important;
            box-shadow:
              0 0 0 4px rgba(192, 38, 211, 0.13),
              0 5px 16px rgba(88, 28, 135, 0.1) !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .iti {
            width: 100% !important;
            color: #0f172a !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .iti
            input {
            padding-left: 96px !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .iti__country-container {
            width: 78px !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .iti__selected-country {
            width: 78px !important;
            justify-content: center !important;
            padding: 0 10px !important;
            border-right: 1px solid #e2e8f0 !important;
            border-radius: 14px 0 0 14px !important;
            background: #f8fafc !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .iti__selected-country-primary
            .iti__flag {
            display: none !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .iti__selected-country-primary {
            width: 100% !important;
            justify-content: center !important;
            gap: 5px !important;
            padding: 0 !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .iti__selected-dial-code {
            margin-left: 0 !important;
            color: #334155 !important;
            font-weight: 700 !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .iti__country-list {
            min-width: 0 !important;
            max-width: calc(100vw - 64px) !important;
            color: #0f172a !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .sms_consent_checkbox {
            display: flex !important;
            align-items: flex-start !important;
            width: 100% !important;
            margin: 2px 0 4px !important;
            padding: 8px 2px 4px !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .sms_consent_checkbox
            input[type="checkbox"] {
            display: block !important;
            flex: 0 0 20px !important;
            width: 20px !important;
            height: 20px !important;
            margin: 2px 11px 0 0 !important;
            padding: 0 !important;
            accent-color: #c026d3 !important;
            box-shadow: none !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            .sms_consent_message {
            display: block !important;
            float: none !important;
            width: auto !important;
            margin: 0 !important;
            color: #475569 !important;
            font-size: 12px !important;
            font-weight: 500 !important;
            line-height: 1.5 !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            ._button-wrapper {
            width: 100% !important;
            margin: 14px 0 0 !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            ._submit {
            width: 100% !important;
            min-height: 56px !important;
            margin: 0 !important;
            border: 0 !important;
            border-radius: 15px !important;
            background: linear-gradient(
              90deg,
              #ff5e7a 0%,
              #d85cff 55%,
              #8b5cf6 100%
            ) !important;
            padding: 15px 18px !important;
            color: #ffffff !important;
            font-size: 15px !important;
            font-weight: 900 !important;
            line-height: 1.2 !important;
            text-transform: uppercase !important;
            box-shadow: 0 14px 34px rgba(168, 85, 247, 0.34) !important;
          }

          .${FORM_CLASS}.${FORM_CLASS}
            :is(#cefin-academia-form, form[id^="_form_"])
            ._form-thank-you {
            color: #1e293b !important;
          }

          @media (max-width: 639px) {
            .${FORM_CLASS}.${FORM_CLASS}
              :is(#cefin-academia-form, form[id^="_form_"])
              ._form_element {
              margin-bottom: 13px !important;
            }

            .${FORM_CLASS}.${FORM_CLASS}
              :is(#cefin-academia-form, form[id^="_form_"])
              .iti
              input {
              padding-left: 96px !important;
            }

            .${FORM_CLASS}.${FORM_CLASS}
              :is(#cefin-academia-form, form[id^="_form_"])
              .sms_consent_message {
              font-size: 11px !important;
              line-height: 1.45 !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}
