"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";




const WHATSAPP_URL = "https://chat.whatsapp.com/IsvrgXFQkDGCtcYfb50Wwd";
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const BUILDINGS_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal/edificios-hd.png`;
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal/alfredo-academia.png`;

export default function GraciasAsesorFiscalPage() {
  useEffect(() => {
    document.title = "Ultimo paso | ABC Asesor Fiscal | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "ABC Asesor Fiscal de Empresas | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaEvent("Lead", {
      content_name: "ABC Asesor Fiscal | Click grupo WhatsApp",
      content_category: "Grupo de WhatsApp",
      status: "whatsapp_group_click",
      value: 0,
      currency: META_CURRENCY,
    });

    if (!WHATSAPP_URL) return;

    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Script
        id="meta-pixel-asesor-fiscal-thankyou"
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

      <main className="relative min-h-[100svh] overflow-x-hidden bg-[#071019] text-white">
        <div className="pointer-events-none fixed inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${BUILDINGS_IMAGE_URL}")` }}
          />
          <div className="absolute inset-0 bg-[#071019]/58" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,9,14,0.96)_0%,rgba(3,9,14,0.84)_52%,rgba(3,9,14,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,9,14,0.08)_0%,rgba(3,9,14,0.38)_58%,#03070b_100%)]" />

          <img
            src={ALFREDO_IMAGE_URL}
            alt=""
            className="absolute bottom-[-5%] right-[-8%] hidden h-[88%] w-[48%] object-contain object-bottom opacity-80 drop-shadow-[0_28px_60px_rgba(0,0,0,0.62)] lg:block"
          />

          <img
            src={ALFREDO_IMAGE_URL}
            alt=""
            className="absolute inset-x-0 bottom-[-8%] mx-auto h-[62%] w-full object-contain object-bottom opacity-24 md:hidden"
          />
        </div>

        <header className="relative z-20 mx-auto flex w-full max-w-[1500px] justify-end px-6 py-5 lg:px-12">
          <p className="text-2xl font-black tracking-tight">CEFIN</p>
        </header>

        <section className="relative z-10 mx-auto flex min-h-[calc(100svh-68px)] w-full max-w-[1500px] items-center px-5 pb-8 lg:px-12">
          <div className="w-full max-w-[760px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#FFD84F]/30 bg-[#FFD84F]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#FFD84F]">
              <span className="h-2 w-2 rounded-full bg-[#FFD84F]" />
              Registro 80% completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-[5.3rem]">
              Tu acceso aun
              <span className="block text-[#FFD84F]">no esta asegurado</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/86 sm:text-xl">
              Ya registramos tus datos para{" "}
              <span className="font-black text-[#42DDE8]">
                ABC Asesor Fiscal de Empresas
              </span>
              , pero falta el paso donde recibiras el enlace de la clase.
            </p>

            <div className="mt-6 border-l-4 border-[#FFD84F] bg-black/34 px-5 py-4 backdrop-blur-sm">
              <p className="text-base font-black uppercase leading-relaxed text-white sm:text-lg">
                El acceso, los recordatorios y cualquier cambio se publicaran
                exclusivamente en el grupo de WhatsApp.
              </p>
              <p className="mt-2 text-sm font-semibold text-white/64">
                Si cierras esta pagina sin entrar, podrias no recibir el enlace
                para conectarte.
              </p>
            </div>

            <div className="mt-6 border border-white/12 bg-[#09131d]/82 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-md sm:p-6">
              <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em]">
                <span className="text-[#FFD84F]">Registro casi listo</span>
                <span className="text-white">80%</span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-[#FFD84F]" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="border border-white/10 bg-black/24 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/46">
                    Fecha
                  </p>
                  <p className="mt-1 text-base font-black text-[#FFD84F] sm:text-lg">
                    16 de junio
                  </p>
                </div>

                <div className="border border-white/10 bg-black/24 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/46">
                    Hora
                  </p>
                  <p className="mt-1 text-base font-black text-[#42DDE8] sm:text-lg">
                    11:00 AM CDMX
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppClick}
                disabled={!WHATSAPP_URL}
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase text-[#052b14] shadow-[0_22px_60px_rgba(37,211,102,0.34)] transition hover:scale-[1.01] hover:bg-[#35e878] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 sm:text-lg"
              >
                Entrar al grupo y recibir mi acceso
              </button>

              <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white/52">
                Este es el ultimo paso de tu registro
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "Recibiras el enlace de acceso",
                "Te avisaremos antes de iniciar",
                "Conoceras cualquier cambio",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-[#42DDE8]/16 bg-[#42DDE8]/[0.06] px-4 py-3 text-sm font-semibold text-white/76"
                >
                  <span className="mr-2 text-[#42DDE8]">+</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
