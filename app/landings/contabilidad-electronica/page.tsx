"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_PIXEL_ID,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 189; // Reemplazar con el ID del formulario de ActiveCampaign.
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const HAS_ACTIVE_CAMPAIGN_FORM = ACTIVE_CAMPAIGN_FORM_ID > 0;
const HERO_BACKGROUND_URL =
  "https://cefin-landings-z9uk.vercel.app/contabilidad-electronica/background-banner.png";
const MARISOL_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/contabilidad-electronica/marisol-contabilidad-electronica.png";

const getNormalizedText = (value: string | null | undefined) =>
  (value ?? "").trim();

const getPhoneDigits = (value: string | null | undefined) =>
  (value ?? "").replace(/\D/g, "");

const buildAdvancedMatchData = (formRoot: ParentNode) => {
  const fields = Array.from(
    formRoot.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea",
    ),
  );

  const findField = (patterns: string[]) =>
    fields.find((field) => {
      const fieldText = [
        field.name,
        field.id,
        field.placeholder,
        field.getAttribute("aria-label"),
        field.closest("div")?.querySelector("label")?.textContent,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return patterns.some((pattern) => fieldText.includes(pattern));
    });

  const firstNameField = findField(["nombre"]);
  const lastNameField = findField(["apellido"]);
  const emailField = findField(["email", "correo"]);
  const phoneField = findField(["whatsapp", "telefono", "tel"]);

  const advancedMatchData: Record<string, string> = {};
  const firstName = getNormalizedText(firstNameField?.value);
  const lastName = getNormalizedText(lastNameField?.value);
  const email = getNormalizedText(emailField?.value).toLowerCase();
  const phone = getPhoneDigits(phoneField?.value);

  if (firstName) advancedMatchData.fn = firstName;
  if (lastName) advancedMatchData.ln = lastName;
  if (email) advancedMatchData.em = email;
  if (phone) advancedMatchData.ph = phone;

  return advancedMatchData;
};

export default function ContabilidadElectronicaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastAdvancedMatchRef = useRef("");

  const syncAdvancedMatching = useCallback((formRoot: ParentNode) => {
    if (typeof window === "undefined" || !window.fbq) return;

    const advancedMatchData = buildAdvancedMatchData(formRoot);
    if (!Object.keys(advancedMatchData).length) return;

    const serialized = JSON.stringify(advancedMatchData);
    if (serialized === lastAdvancedMatchRef.current) return;

    window.fbq("init", META_PIXEL_ID, advancedMatchData);
    lastAdvancedMatchRef.current = serialized;
  }, []);

  useEffect(() => {
    document.title = "Contabilidad Electrónica | Clase Gratuita | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Contabilidad Electrónica | Landing",
      content_category: "Clase gratuita",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen || !HAS_ACTIVE_CAMPAIGN_FORM) return;

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
  }, [isModalOpen, syncAdvancedMatching]);

  useEffect(() => {
    if (!isModalOpen || !HAS_ACTIVE_CAMPAIGN_FORM) return;

    const formRoot = document.querySelector(`.${FORM_CLASS}`);
    if (!formRoot) return;

    const handleFieldInteraction = () => syncAdvancedMatching(formRoot);

    const bindListeners = () => {
      const formFields = formRoot.querySelectorAll("input, textarea, select");
      formFields.forEach((field) => {
        field.addEventListener("input", handleFieldInteraction);
        field.addEventListener("change", handleFieldInteraction);
        field.addEventListener("blur", handleFieldInteraction);
      });
    };

    const unbindListeners = () => {
      const formFields = formRoot.querySelectorAll("input, textarea, select");
      formFields.forEach((field) => {
        field.removeEventListener("input", handleFieldInteraction);
        field.removeEventListener("change", handleFieldInteraction);
        field.removeEventListener("blur", handleFieldInteraction);
      });
    };

    const observer = new MutationObserver(() => {
      unbindListeners();
      bindListeners();
      syncAdvancedMatching(formRoot);
    });

    observer.observe(formRoot, { childList: true, subtree: true });
    bindListeners();
    syncAdvancedMatching(formRoot);

    return () => {
      observer.disconnect();
      unbindListeners();
    };
  }, [isModalOpen, syncAdvancedMatching]);

  return (
    <>
      <Script
        id="meta-pixel-contabilidad-electronica"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#02070a] text-white">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${HERO_BACKGROUND_URL}")`,
              backgroundSize: "cover",
              backgroundPosition: "left center",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,10,0.30)_0%,rgba(2,7,10,0.46)_38%,rgba(2,7,10,0.90)_72%,rgba(2,7,10,0.96)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04)_0%,rgba(2,7,10,0.16)_58%,#02070a_100%)]" />
          <div className="absolute left-0 top-0 h-[260px] w-[320px] opacity-60 [background-image:radial-gradient(rgba(89,221,230,0.42)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute right-[8%] top-[6%] h-[190px] w-[380px] rotate-[-18deg] bg-cyan-300/18 blur-[80px]" />
          <div className="absolute bottom-[-12%] right-[-8%] h-[360px] w-[360px] rounded-full bg-cyan-400/14 blur-[130px]" />
        </div>

        <header className="relative z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <div className="inline-flex items-center gap-4 rounded-full border border-white/12 bg-white/[0.07] px-5 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/12 text-sm font-black text-cyan-200">
                C
              </div>
              <div>
                <p className="text-base font-black leading-none text-white">
                  CEFIN
                </p>
                <p className="mt-1 hidden text-[11px] uppercase tracking-[0.24em] text-white/58 sm:block">
                  Centro de estudios fiscales, innovación y negocios
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden rounded-full border border-cyan-200/25 bg-cyan-300/10 px-5 py-2 text-sm font-black uppercase text-white backdrop-blur transition hover:bg-cyan-300/18 md:inline-flex"
            >
              Registrarme
            </button>
          </div>
        </header>

        <section className="relative z-30">
          <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 pb-14 pt-8 lg:justify-end lg:px-10">
            <div className="ml-auto w-full max-w-3xl text-center lg:text-right">
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/24 bg-cyan-300/10 px-5 py-2 text-xs font-black uppercase tracking-[0.30em] text-cyan-200 backdrop-blur-md sm:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                Clase gratuita en vivo
              </p>

              <div className="relative mx-auto mt-6 flex h-[300px] w-full max-w-[350px] items-end justify-center overflow-hidden lg:hidden">
                <div className="absolute inset-x-6 bottom-0 h-48 rounded-full bg-cyan-300/18 blur-[70px]" />
                <img
                  src={MARISOL_IMAGE_URL}
                  alt="Marisol Galván"
                  className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_26px_50px_rgba(0,0,0,0.55)]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#02070a] via-[#02070a]/65 to-transparent" />
              </div>

              <h1 className="mt-6 text-5xl font-black uppercase italic leading-[0.84] tracking-tight text-white drop-shadow-[0_7px_0_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl xl:text-[7.2rem]">
                Contabilidad
                <span className="mt-2 block text-cyan-300 drop-shadow-[0_7px_0_rgba(0,0,0,0.35)]">
                  Electrónica
                </span>
              </h1>

              <div className="mt-7 ml-auto max-w-2xl rounded-2xl border-l-4 border-cyan-300 bg-[#0b1119]/76 px-6 py-5 text-left shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/82 sm:text-xl">
                  Aprende qué está revisando el SAT cuando envías contabilidad
                  electrónica y cómo detectar errores antes de presentar.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-300/18 bg-black/42 px-5 py-4 text-left backdrop-blur-md">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
                    Próxima sesión
                  </p>
                  <p className="mt-2 text-2xl font-black italic text-white">
                    26 de mayo
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-300/18 bg-black/42 px-5 py-4 text-left backdrop-blur-md">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
                    Horario online
                  </p>
                  <p className="mt-2 text-2xl font-black italic text-white">
                    11:00 AM
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center lg:text-right">
                <p className="text-lg font-black uppercase leading-tight text-white">
                  Impartido por: Marisol Galván
                </p>
                <p className="mx-auto mt-4 max-w-xl text-balance text-base font-bold uppercase leading-tight text-white/80 drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)] lg:ml-auto lg:mr-0">
                  “Muchos contadores siguen enviando contabilidad electrónica...
                  sin entender realmente qué está revisando el SAT.”
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 lg:items-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-300 px-8 py-5 text-center text-xl font-black uppercase tracking-tight text-[#02070a] shadow-[0_20px_60px_rgba(34,211,238,0.30)] transition hover:scale-[1.01] hover:bg-cyan-200 active:scale-[0.98] sm:w-auto"
                >
                  Regístrate gratis aquí
                </button>
                <p className="text-sm font-semibold text-cyan-100/78">
                  Cupo limitado para la sesión en vivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-30 border-t border-cyan-200/10 bg-[#02070a]/92">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-5">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                ¿Por qué entrar?
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Para dejar de enviar archivos a ciegas y revisar con criterio.
              </h2>
            </div>

            <div className="space-y-5 lg:col-span-7">
              <p className="text-lg leading-relaxed text-white/75">
                La contabilidad electrónica no es solo cumplir con el envío. Es
                entender qué información llega al SAT, qué inconsistencias pueden
                levantar alertas y cómo revisar antes de presentar.
              </p>
              <p className="text-lg leading-relaxed text-white/75">
                Esta clase está pensada para contadores que quieren trabajar con
                más seguridad, más orden y una lectura práctica de lo que están
                reportando.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Qué revisa el SAT en la contabilidad electrónica.",
                "Errores comunes antes de enviar balanza y catálogo.",
                "Cómo detectar inconsistencias con más claridad.",
                "Qué validar para trabajar con mayor seguridad.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-cyan-200/12 bg-white/[0.045] p-5 text-sm font-semibold leading-relaxed text-white/82 backdrop-blur"
                >
                  <span className="mr-2 text-cyan-300">●</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-cyan-200/12 bg-cyan-300/10 p-7 backdrop-blur md:p-9">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                    Reserva tu lugar
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Clase gratuita para contadores
                  </h3>
                  <p className="mt-2 max-w-2xl text-white/70">
                    Regístrate ahora y asegura tu acceso a la sesión de
                    Contabilidad Electrónica.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-7 py-4 text-base font-black uppercase text-[#021014] transition hover:scale-[1.01] active:scale-[0.98]"
                >
                  Registrarme gratis
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-30 border-t border-cyan-200/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center text-sm text-white/45 lg:px-10">
            <p className="font-black tracking-[0.25em]">CEFIN</p>
            <p>
              Formación práctica para contadores que quieren trabajar con más
              seguridad.
            </p>
          </div>
        </footer>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02070a]/88 p-3 backdrop-blur-md sm:p-4">
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar modal"
              >
                x
              </button>

              <div className="shrink-0 px-5 pb-4 pt-7 text-center sm:px-8 sm:pb-5 sm:pt-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-600">
                  Clase gratuita
                </p>
                <h4 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
                  Contabilidad Electrónica
                </h4>
                <p className="mt-2 text-sm text-slate-500">
                  Completa tus datos para asegurar tu lugar.
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-8 sm:pb-8">
                {HAS_ACTIVE_CAMPAIGN_FORM ? (
                  <div className="min-h-[420px]">
                    <div className={FORM_CLASS}></div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5 text-center text-sm font-semibold text-slate-700">
                    Falta conectar el ID del formulario de ActiveCampaign para
                    mostrar el registro aquí.
                  </div>
                )}
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
            border-color: #22d3ee !important;
            background: #ffffff !important;
          }

          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            border: 0 !important;
            border-radius: 18px !important;
            background: linear-gradient(90deg, #67e8f9 0%, #22d3ee 100%) !important;
            color: #021014 !important;
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
