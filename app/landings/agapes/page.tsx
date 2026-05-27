"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_PIXEL_ID,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 211; // Reemplazar con el ID del formulario de ActiveCampaign.
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const HAS_ACTIVE_CAMPAIGN_FORM = ACTIVE_CAMPAIGN_FORM_ID > 0;
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const BANNER_IMAGE_URL = `${ASSET_BASE}/agapes/banner.png`;

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

export default function AgapesLandingPage() {
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
    document.title = "AGAPES | Clase Gratuita | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "AGAPES | Landing",
      content_category: "Clase gratuita",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen || !HAS_ACTIVE_CAMPAIGN_FORM) return;

    const oldScript = document.getElementById("ac-script-loader");
    if (oldScript) oldScript.remove();

    const existingFormNode = document.querySelector(`.${FORM_CLASS}`);
    if (existingFormNode) existingFormNode.innerHTML = "";

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
        id="meta-pixel-agapes"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#06110d] text-white">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
    linear-gradient(
      90deg,
      rgba(4, 32, 24, 0.18) 0%,
      rgba(4, 32, 24, 0.28) 28%,
      rgba(4, 32, 24, 0.62) 58%,
      rgba(4, 32, 24, 0.88) 100%
    ),
    url("${BANNER_IMAGE_URL}")`,
              backgroundSize: "cover",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,14,12,0.16)_0%,rgba(5,14,12,0.28)_42%,rgba(5,14,12,0.76)_74%,rgba(5,14,12,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.12)_48%,#06110d_100%)]" />
        </div>

        <header className="relative z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <p className="text-3xl font-black tracking-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
              CEFIN
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden rounded-full border border-lime-300/35 bg-lime-300/14 px-5 py-2 text-sm font-black uppercase text-white backdrop-blur transition hover:bg-lime-300/22 md:inline-flex"
            >
              Registrarme
            </button>
          </div>
        </header>

        <section className="relative z-30">
          <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 pb-16 pt-6 lg:justify-end lg:px-10">
            <div className="ml-auto w-full max-w-3xl text-center lg:text-right">
              <p className="inline-flex rounded-full border border-lime-300/30 bg-lime-300/12 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-lime-200 backdrop-blur-md sm:text-sm">
                Clase gratuita para contadores
              </p>

              <h1 className="mt-6 text-6xl font-black uppercase leading-[0.82] tracking-tight text-white drop-shadow-[0_7px_0_rgba(0,0,0,0.42)] sm:text-8xl lg:text-[8rem]">
                AGAPES
              </h1>

              <p className="mt-4 text-lg font-black uppercase tracking-tight text-lime-300 sm:text-2xl">
                Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras
              </p>

              {/* 
  FECHA Y HORA DE LA CLASE
  --------------------------------------------------
  Este bloque muestra la fecha del evento de forma visible,
  pero sin cambiar la estructura general de la landing.

  Ajustes rápidos:
  - Si quieres que se vea más grande, sube text-sm a text-base.
  - Si quieres más brillo, sube shadow-[...] o bg-lime-300/18.
  - Si quieres cambiar la fecha, edita únicamente el texto:
    "2 de junio · 11:00 a.m. · Hora CDMX"
*/}
<div className="mt-5 flex justify-center lg:justify-end">
  <div className="inline-flex flex-col items-center gap-1 rounded-2xl border border-lime-300/40 bg-lime-300/14 px-6 py-4 text-center shadow-[0_0_35px_rgba(190,242,100,0.22)] backdrop-blur-md sm:flex-row sm:gap-3">
    <span className="text-xs font-black uppercase tracking-[0.22em] text-lime-200">
      Fecha de la clase
    </span>

    <span className="text-base font-black uppercase tracking-tight text-white sm:text-lg">
      2 de junio · 11:00 a.m. · Hora CDMX
    </span>
  </div>
</div>

              <div className="mt-7 ml-auto max-w-2xl rounded-2xl border-l-4 border-lime-300 bg-black/58 px-6 py-5 text-left shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/86 sm:text-xl">
                  Conviértete en contador especializado en sector primario y
                  aprende a entender mejor el tratamiento contable y fiscal de
                  actividades agrícolas, ganaderas, silvícolas y pesqueras.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  "Enfoque en sector primario",
                  "Clase 100% gratuita",
                  "Para contadores y asesores",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/12 bg-black/42 p-4 text-sm font-bold text-white/82 backdrop-blur-md"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 lg:items-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-lime-300 px-8 py-5 text-center text-xl font-black uppercase tracking-tight text-[#081109] shadow-[0_20px_60px_rgba(190,242,100,0.28)] transition hover:scale-[1.01] hover:bg-lime-200 active:scale-[0.98] sm:w-auto"
                >
                  Registrarme gratis
                </button>
                <p className="text-sm font-semibold text-lime-100/78">
                  Asegura tu acceso y recibe las indicaciones de la sesión.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-30 border-t border-lime-300/14 bg-[#06110d]/94">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-5">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-300">
                ¿Por qué AGAPES?
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Porque el sector primario no se atiende como cualquier giro.
              </h2>
            </div>

            <div className="space-y-5 lg:col-span-7">
              <p className="text-lg leading-relaxed text-white/75">
                Ganadería, agricultura, silvicultura y pesca tienen operaciones,
                obligaciones y criterios que requieren una lectura
                especializada.
              </p>
              <p className="text-lg leading-relaxed text-white/75">
                Esta clase te ayuda a ubicar los puntos clave para asesorar con
                mayor seguridad a contribuyentes del sector primario.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="rounded-2xl border border-lime-300/16 bg-lime-300/10 p-7 backdrop-blur md:p-9">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">
                    Reserva tu lugar
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Clase gratuita para especializarte en AGAPES
                  </h3>
                  <p className="mt-2 max-w-2xl text-white/70">
                    Completa tu registro y prepárate para entrar con mayor
                    claridad al mundo contable y fiscal del sector primario.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-2xl bg-lime-300 px-7 py-4 text-base font-black uppercase text-[#081109] transition hover:scale-[1.01] hover:bg-lime-200 active:scale-[0.98]"
                >
                  Quiero mi acceso gratis
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-30 border-t border-lime-300/12">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center text-sm text-white/45 lg:px-10">
            <p className="font-black tracking-[0.25em]">CEFIN</p>
            <p>
              Formación práctica para contadores que quieren asesorar mejor.
            </p>
          </div>
        </footer>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06110d]/88 p-3 backdrop-blur-md sm:p-4">
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar modal"
              >
                x
              </button>

              <div className="shrink-0 px-5 pb-4 pt-7 text-center sm:px-8 sm:pb-5 sm:pt-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-lime-600">
                  Clase gratuita
                </p>
                <h4 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
                  AGAPES
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
                  <div className="rounded-xl border border-lime-200 bg-lime-50 p-5 text-center text-sm font-semibold text-slate-700">
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

          .${FORM_CLASS}, .${FORM_CLASS} ._form-content,
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
            border-color: #84cc16 !important;
            background: #ffffff !important;
          }

          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            border: 0 !important;
            border-radius: 18px !important;
            background: linear-gradient(
              90deg,
              #bef264 0%,
              #84cc16 100%
            ) !important;
            color: #081109 !important;
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
