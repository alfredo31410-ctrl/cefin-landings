"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 235;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const BUILDINGS_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal/edificios-hd.png`;
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal/alfredo-academia.png`;

export default function AsesorFiscalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "ABC Asesor Fiscal de Empresas | Clase Gratis | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "ABC Asesor Fiscal de Empresas | Landing",
      content_category: "Clase gratuita",
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousScript = document.getElementById(
      "active-campaign-asesor-fiscal",
    );

    if (previousScript) {
      previousScript.remove();
    }

    const formContainer = document.querySelector(`.${FORM_CLASS}`);

    if (formContainer) {
      formContainer.innerHTML = "";
    }

    const script = document.createElement("script");

    script.id = "active-campaign-asesor-fiscal";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [isModalOpen]);

  const openRegistrationModal = () => {
    trackMetaEvent("Lead", {
      content_name: "ABC Asesor Fiscal de Empresas | Abrir formulario",
      content_category: "Clase gratuita",
      status: "form_opened",
    });

    setIsModalOpen(true);
  };

  return (
    <>
      <Script
        id="meta-pixel-asesor-fiscal"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(),
        }}
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

      <main className="relative h-[100svh] overflow-hidden bg-[#071019] text-white lg:min-h-screen lg:h-auto">
        {/* Fondo de edificios */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${BUILDINGS_IMAGE_URL}")`,
            }}
          />

          <div className="absolute inset-0 bg-[#071019]/38" />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,13,0.20)_0%,rgba(7,16,25,0.48)_43%,rgba(7,16,25,0.84)_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.10)_55%,#03070b_100%)]" />

          {/* Alfredo forma parte del fondo en pantallas pequeñas. */}
          <img
            src={ALFREDO_IMAGE_URL}
            alt=""
            className="absolute inset-x-0 bottom-[-5%] mx-auto h-[72%] w-full object-contain object-bottom opacity-55 drop-shadow-[0_24px_48px_rgba(0,0,0,0.58)] lg:hidden"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,9,14,0.18)_0%,rgba(3,9,14,0.42)_48%,rgba(3,9,14,0.76)_100%)] lg:hidden" />
        </div>

        {/* Encabezado */}
        <header className="relative z-30">
          <div className="mx-auto flex w-full max-w-[1600px] items-center justify-end px-5 py-3 lg:px-12 lg:py-6 xl:px-16">
            <p className="text-xl font-black tracking-tight text-white lg:text-3xl">
              CEFIN
            </p>
          </div>
        </header>

        {/* Hero */}
        <section className="relative z-20">
          <div className="mx-auto grid h-[calc(100svh-48px)] w-full max-w-[1600px] items-center px-5 pb-5 lg:min-h-[calc(100vh-84px)] lg:h-auto lg:grid-cols-12 lg:gap-0 lg:px-12 lg:pb-6 xl:grid-cols-[minmax(420px,0.9fr)_minmax(620px,1.1fr)] xl:px-16">
            {/* Alfredo */}
            <div className="relative order-2 hidden items-end justify-center lg:order-1 lg:col-span-5 lg:flex lg:h-[min(72vh,720px)] lg:justify-end lg:pr-2 xl:col-span-1 xl:translate-x-8">
              <img
                src={ALFREDO_IMAGE_URL}
                alt="Mtro. Alfredo Cobos"
                className="h-full w-full max-w-[610px] object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
              />
            </div>

            {/* Información */}
            <div className="relative z-10 order-1 -translate-y-3 text-center lg:order-2 lg:col-span-7 lg:-ml-4 lg:max-w-[760px] lg:translate-y-0 lg:py-6 lg:text-right xl:col-span-1 xl:-ml-10">
              <p className="text-[3.6rem] font-black uppercase leading-none text-[#FFD84F] sm:text-7xl lg:text-8xl xl:text-9xl">
                ABC
              </p>

              <h1
                className="mt-1 text-[3.15rem] font-black uppercase leading-[0.86] text-white drop-shadow-[0_5px_0_rgba(0,0,0,0.40)] sm:text-6xl lg:text-[5.8rem] lg:drop-shadow-[0_7px_0_rgba(0,0,0,0.40)] xl:text-[7rem]"
                style={{
                  fontFamily: "Impact, 'Arial Narrow', sans-serif",
                }}
              >
                Asesor Fiscal
              </h1>

              <p className="mt-1 text-3xl font-black text-[#FFD84F] sm:text-4xl lg:mt-2 lg:text-5xl">
                De empresas
              </p>

              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.38em] text-white/90 sm:text-xs lg:mt-8 lg:text-sm lg:tracking-[0.55em]">
                Clase gratis - En vivo
              </p>

              <div className="mt-3 lg:mt-6">
                <p className="text-xl font-black text-[#FFD84F] sm:text-2xl lg:text-3xl">
                  Martes 16 de junio
                </p>

                <p className="mt-1 text-xl font-black text-[#42DDE8] sm:text-2xl lg:text-3xl">
                  11:00 AM (Hora CDMX)
                </p>
              </div>

              <div className="mt-4 lg:mt-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white lg:text-sm lg:tracking-[0.2em]">
                  Impartido por el Mtro.
                </p>

                <p className="mt-1 text-base font-black uppercase tracking-[0.18em] text-[#42DDE8] lg:text-lg lg:tracking-[0.2em]">
                  Alfredo Cobos
                </p>
              </div>

              <button
                type="button"
                onClick={openRegistrationModal}
                className="mt-5 inline-flex w-full max-w-[320px] items-center justify-center rounded-lg bg-[#FFD84F] px-7 py-4 text-base font-black uppercase text-[#071019] shadow-[0_18px_45px_rgba(255,216,79,0.25)] transition hover:scale-[1.02] hover:bg-[#42DDE8] active:scale-[0.98] lg:mt-8 lg:w-auto lg:max-w-none lg:px-9 lg:text-lg"
              >
                Registrarme gratis
              </button>
            </div>
          </div>
        </section>

        {/* Modal del formulario */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071019]/90 p-3 backdrop-blur-md sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
          >
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-lg border-t-8 border-[#FFD84F] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.60)]">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 z-10 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar formulario"
              >
                ×
              </button>

              <div className="shrink-0 px-6 pb-4 pt-8 text-center sm:px-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0897a3]">
                  Clase gratuita en vivo
                </p>

                <h2
                  id="registration-title"
                  className="mt-2 text-2xl font-black uppercase leading-tight text-[#071019]"
                >
                  ABC Asesor Fiscal
                </h2>

                <p className="mt-1 text-lg font-black text-[#D6A900]">
                  De empresas
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Completa tus datos para asegurar tu lugar.
                </p>

                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Martes 16 de junio · 11:00 AM
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 sm:px-8 sm:pb-8">
                <div className="ac-modal-wrapper min-h-[400px]">
                  <div className={FORM_CLASS}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .ac-modal-wrapper .${FORM_CLASS} {
            width: 100% !important;
            max-width: 430px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            background: transparent !important;
          }

          .ac-modal-wrapper .${FORM_CLASS} form,
          .ac-modal-wrapper .${FORM_CLASS} ._form-content,
          .ac-modal-wrapper .${FORM_CLASS} ._form-body {
            width: 100% !important;
            max-width: 430px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }

          .ac-modal-wrapper ._form-title,
          .ac-modal-wrapper ._form-branding {
            display: none !important;
          }

          .ac-modal-wrapper ._form_element,
          .ac-modal-wrapper ._field-wrapper,
          .ac-modal-wrapper ._button-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 0 14px !important;
          }

          .ac-modal-wrapper ._form-label {
            display: block !important;
            margin-bottom: 6px !important;
            color: #334155 !important;
            font-size: 13px !important;
            font-weight: 700 !important;
          }

          .ac-modal-wrapper input[type="text"],
          .ac-modal-wrapper input[type="email"],
          .ac-modal-wrapper input[type="tel"],
          .ac-modal-wrapper select,
          .ac-modal-wrapper textarea {
            width: 100% !important;
            padding: 14px 16px !important;
            border: 1px solid #d8dee8 !important;
            border-radius: 8px !important;
            outline: none !important;
            background: #f8fafc !important;
            color: #0f172a !important;
            font-size: 15px !important;
            box-shadow: none !important;
          }

          .ac-modal-wrapper input:focus,
          .ac-modal-wrapper select:focus,
          .ac-modal-wrapper textarea:focus {
            border-color: #42dde8 !important;
            background: #ffffff !important;
          }

          .ac-modal-wrapper ._submit,
          .ac-modal-wrapper button[type="submit"] {
            width: 100% !important;
            padding: 16px 20px !important;
            border: 0 !important;
            border-radius: 8px !important;
            background: #ffd84f !important;
            color: #071019 !important;
            font-size: 15px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            cursor: pointer !important;
          }

          .ac-modal-wrapper ._submit:hover,
          .ac-modal-wrapper button[type="submit"]:hover {
            background: #42dde8 !important;
          }

          .ac-modal-wrapper p,
          .ac-modal-wrapper label {
            color: #475569 !important;
          }
        `}</style>
      </main>
    </>
  );
}
