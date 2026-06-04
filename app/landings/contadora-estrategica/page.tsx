"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_PIXEL_ID,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 231;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const MARISOL_IMAGE_URL = `${ASSET_BASE}/contadora-estrategica/marisol_contadora_estrategica.png`;
const BANNER_IMAGE_URL = `${ASSET_BASE}/contadora-estrategica/banner-contadora-estrategica.png`;

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

export default function ContadoraEstrategicaPage() {
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
    document.title = "Contadora Estrategica | Clase Gratuita | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Contadora Estrategica | Landing",
      content_category: "Clase gratuita",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

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
    if (!isModalOpen) return;

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
        id="meta-pixel-contadora-estrategica"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#f7f1ff] text-[#08060c]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-45 blur-[1px]"
            style={{ backgroundImage: `url("${BANNER_IMAGE_URL}")` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.80)_45%,rgba(255,255,255,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(247,241,255,0.66)_0%,rgba(247,241,255,0.56)_62%,#4f2990_100%)]" />
          <div className="absolute left-[-14%] top-[-8%] h-[520px] w-[520px] rounded-full bg-[#7d4cff]/18 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-0 h-[42vh] w-full bg-[linear-gradient(0deg,rgba(82,40,149,0.95)_0%,rgba(113,66,194,0.72)_55%,transparent_100%)]" />
        </div>

        <header className="relative z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <div className="inline-flex items-center gap-3">
              <div>
                <p className="text-2xl font-black leading-none text-[#08060c]">
                  CEFIN
                </p>
                <p className="mt-1 hidden text-[11px] uppercase tracking-[0.22em] text-[#08060c]/48 sm:block">
                  Capacitacion fiscal y contable
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden rounded-full bg-[#08060c] px-6 py-3 text-sm font-black uppercase text-white shadow-[0_14px_36px_rgba(84,48,150,0.24)] transition hover:bg-[#7d4cff] md:inline-flex"
            >
              Registrarme
            </button>
          </div>
        </header>

        <section className="relative z-20">
          <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-8 px-6 pb-16 pt-4 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-7">
              <p className="inline-flex rounded-full bg-[#08060c] px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-white shadow-[0_12px_28px_rgba(84,48,150,0.20)] sm:text-sm">
                Clase gratuita para contadoras
              </p>

              <h1 className="mt-6 max-w-4xl text-5xl font-black uppercase leading-[0.86] tracking-tight text-[#08060c] sm:text-7xl lg:text-8xl xl:text-[7rem]">
                Contadora
                <span className="block text-[#7d4cff]">Estrategica</span>
              </h1>

              <p className="mt-5 text-sm font-black uppercase tracking-[0.22em] text-[#08060c]">
                - Marisol Galvan -
              </p>

              <p className="mt-5 max-w-2xl text-xl font-medium leading-relaxed text-[#20182c] sm:text-2xl">
                Aprende a dejar de operar solo como capturista y empieza a
                posicionarte como una asesora que toma decisiones, comunica
                valor y cobra mejor.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="rounded-full bg-[#08060c] px-7 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-white">
                  23 de junio
                </div>
                <div className="rounded-full bg-[#7d4cff] px-7 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_rgba(125,76,255,0.28)]">
                  11:00 AM (Hora CDMX)
                </div>
              </div>

              <div className="mt-5 text-2xl font-black uppercase tracking-[0.18em] text-[#08060c] sm:text-3xl">
                100% en linea - gratuito
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#7d4cff] px-8 py-5 text-center text-lg font-black uppercase tracking-tight text-white shadow-[0_24px_70px_rgba(125,76,255,0.30)] transition hover:scale-[1.01] hover:bg-[#6f37ff] active:scale-[0.98] sm:w-auto"
                >
                  Registrarme gratis
                </button>
                <p className="text-sm font-semibold text-[#261d33]/70">
                  Recibe acceso e indicaciones de la clase.
                </p>
              </div>
            </div>

            <div className="relative mx-auto flex h-[420px] w-full max-w-[430px] items-end justify-center lg:col-span-5 lg:h-[610px] lg:max-w-none">
              <img
                src={MARISOL_IMAGE_URL}
                alt="Marisol Galvan"
                className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_26px_48px_rgba(53,31,88,0.32)]"
              />
            </div>
          </div>
        </section>

        <section className="relative z-30 bg-[#4f2990] text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-5">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#d9c5ff]">
                Para quien es
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Para contadoras que quieren crecer con direccion.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-white/78 lg:col-span-7">
              <p>
                Esta clase esta pensada para profesionales contables que ya
                atienden clientes o quieren hacerlo con una propuesta mas
                clara, rentable y estrategica.
              </p>
              <p>
                Vas a identificar puntos clave para vender mejor tus servicios,
                ordenar tu enfoque y dejar de competir solo por precio.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-30 bg-[#4f2990] text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="rounded-lg border border-white/16 bg-white/10 p-7 backdrop-blur md:p-9">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d9c5ff]">
                    Reserva tu lugar
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                    Da el siguiente paso como Contadora Estrategica.
                  </h3>
                  <p className="mt-2 max-w-2xl text-white/68">
                    Completa el formulario y recibe la informacion para entrar a
                    la clase gratuita.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-[#08060c] px-7 py-4 text-base font-black uppercase text-white transition hover:scale-[1.01] hover:bg-[#7d4cff] active:scale-[0.98]"
                >
                  Quiero mi acceso
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-30 border-t border-white/12 bg-[#4f2990] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center text-sm text-white/45 lg:px-10">
            <p className="font-black tracking-[0.25em]">CEFIN</p>
            <p>Formacion practica para contadoras que quieren crecer.</p>
          </div>
        </footer>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1d1031]/82 p-3 backdrop-blur-md sm:p-4">
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-x-hidden rounded-lg border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar modal"
              >
                x
              </button>

              <div className="shrink-0 px-5 pb-4 pt-7 text-center sm:px-8 sm:pb-5 sm:pt-8">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#7d4cff]">
                  Clase gratuita
                </p>
                <h4 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
                  Contadora Estrategica
                </h4>
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
            border-radius: 12px !important;
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
            border-color: #7d4cff !important;
            background: #ffffff !important;
          }

          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            border: 0 !important;
            border-radius: 12px !important;
            background: linear-gradient(
              90deg,
              #7d4cff 0%,
              #5e2ec8 100%
            ) !important;
            color: #ffffff !important;
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
