"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_PIXEL_ID,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 213; // Reemplazar con el ID del formulario de ActiveCampaign.
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const HAS_ACTIVE_CAMPAIGN_FORM = ACTIVE_CAMPAIGN_FORM_ID > 0;
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const HERO_BG_URL = `${ASSET_BASE}/mas-clientes-30-dias/hero-bg.png`;

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

export default function MasClientesTreintaDiasPage() {
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
    document.title = "Más Clientes en 30 Días | Clase Gratuita | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Más Clientes en 30 Días | Landing",
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
        id="meta-pixel-mas-clientes-30-dias"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${HERO_BG_URL}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.22)_46%,rgba(0,0,0,0.72)_78%,rgba(0,0,0,0.94)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.20)_58%,#050505_100%)]" />
        </div>

        <header className="relative z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <p className="text-3xl font-black tracking-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)]">
              CEFIN
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden rounded-full border border-orange-500/40 bg-orange-500/16 px-5 py-2 text-sm font-black uppercase text-white backdrop-blur transition hover:bg-orange-500/26 md:inline-flex"
            >
              Registrarme
            </button>
          </div>
        </header>

        <section className="relative z-30">
          <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 pb-16 pt-8 lg:px-10">
            <div className="w-full max-w-3xl text-center lg:text-left">
              <p className="inline-flex rounded-full border border-orange-500/35 bg-orange-500/14 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-orange-200 backdrop-blur-md sm:text-sm">
                Clase estratégica para contadores
              </p>

              <h1 className="mt-6 text-5xl font-black uppercase italic leading-[0.86] tracking-tight text-white drop-shadow-[0_7px_0_rgba(0,0,0,0.48)] sm:text-7xl lg:text-8xl">
                Más clientes
                <span className="block">en 30 días</span>
              </h1>

              <div className="mt-4 inline-flex -rotate-1 bg-orange-600 px-5 py-3 text-lg font-black uppercase tracking-tight text-white shadow-[0_16px_40px_rgba(0,0,0,0.4)] sm:text-2xl">
                Clase gratuita en vivo
              </div>

              <p className="mt-6 max-w-2xl text-xl font-black uppercase leading-tight text-white">
                11 de junio · 11:00 AM (hora CDMX)
              </p>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/78 sm:text-xl">
                Aprende una estrategia clara para atraer mejores clientes,
                comunicar tu valor y dejar de depender solo de recomendaciones.
              </p>

              <div className="mt-7 grid max-w-3xl gap-4 sm:grid-cols-3">
                {[
                  "Oferta más clara",
                  "Prospección con enfoque",
                  "Mensaje que vende valor",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/12 bg-black/42 p-4 text-sm font-bold text-white/82 backdrop-blur-md"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-600 px-8 py-5 text-center text-xl font-black uppercase tracking-tight text-white shadow-[0_20px_60px_rgba(234,88,12,0.34)] transition hover:scale-[1.01] hover:bg-orange-500 active:scale-[0.98] sm:w-auto"
                >
                  Reservar mi lugar gratis
                </button>
                <p className="text-sm font-semibold text-white/62">
                  Acceso sin costo para la clase en vivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-30 border-t border-orange-500/14 bg-[#050505]/94">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-5">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-400">
                ¿Por qué tomarla?
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Porque más clientes empieza con una oferta que se entiende y se
                desea.
              </h2>
            </div>

            <div className="space-y-5 lg:col-span-7">
              <p className="text-lg leading-relaxed text-white/75">
                Muchos contadores sí saben hacer el trabajo, pero no saben
                comunicar por qué un cliente debería elegirlos.
              </p>
              <p className="text-lg leading-relaxed text-white/75">
                En esta clase vas a ordenar tu mensaje, tus canales y tu
                estrategia para conseguir oportunidades reales en 30 días.
              </p>
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/88 p-3 backdrop-blur-md sm:p-4">
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar modal"
              >
                x
              </button>

              <div className="shrink-0 px-5 pb-4 pt-7 text-center sm:px-8 sm:pb-5 sm:pt-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600">
                  Clase gratuita
                </p>
                <h4 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
                  Más clientes en 30 días
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
                  <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 text-center text-sm font-semibold text-slate-700">
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

          .${FORM_CLASS} ._form-title,
          .${FORM_CLASS} ._form-branding {
            display: none !important;
          }

          .${FORM_CLASS} ._form_element,
          .${FORM_CLASS} ._field-wrapper,
          .${FORM_CLASS} ._button-wrapper {
            margin: 0 0 14px 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .${FORM_CLASS} ._form-label {
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

          .${FORM_CLASS} input:focus,
          .${FORM_CLASS} select:focus,
          .${FORM_CLASS} textarea:focus {
            border-color: #ea580c !important;
            background: #ffffff !important;
          }

          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            border: 0 !important;
            border-radius: 18px !important;
            background: linear-gradient(90deg, #ea580c 0%, #f97316 100%) !important;
            color: white !important;
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
