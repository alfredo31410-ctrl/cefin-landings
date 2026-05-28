"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WHATSAPP_URL = "https://chat.whatsapp.com/HZrZcJtj3Ki5T2TSVFC329"; // Reemplazar con el link del grupo de WhatsApp.
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const BANNER_IMAGE_URL = `${ASSET_BASE}/mas-clientes-30-dias/hero-bg.png`;

export default function GraciasMasClientesTreintaDiasPage() {
  useEffect(() => {
    document.title = "Registro completado | Más Clientes en 30 Días | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "Más Clientes en 30 Días | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaEvent("Lead", {
      content_name: "Más Clientes en 30 Días | Click grupo WhatsApp",
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
        id="meta-pixel-mas-clientes-30-dias-thankyou"
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

      <main className="relative h-screen overflow-x-hidden overflow-y-auto bg-[#050505] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat opacity-100 md:hidden"
            style={{
              backgroundImage: `url("${BANNER_IMAGE_URL}")`,
              backgroundPosition: "center top",
            }}
          />
                 <div
            className="absolute inset-0 hidden bg-cover bg-no-repeat opacity-100 md:block"
            style={{
              backgroundImage: `url("${BANNER_IMAGE_URL}")`,
              backgroundPosition: "left center",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,
            rgba(5,5,5,0.80)_48%,
            rgba(5,5,5,0.92)_100%)]" 
            />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,
            rgba(0,0,0,0.08)_0%,
            rgba(5,5,5,0.20)_54%,#050505_100%)]" 
            />
          <div className="absolute right-[-8%] top-[15%] h-[300px] w-[300px] rounded-full bg-orange-600/18 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
          <div className="w-full max-w-3xl">
            <div className="inline-flex rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-orange-300">
              Registro 80% completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.35)] sm:text-6xl xl:text-[5.5rem]">
              Falta entrar
              <br />
              al grupo
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/82 sm:text-xl">
              Tu registro para la clase gratuita de{" "}
              <span className="font-black text-orange-300">
                Más Clientes en 30 Días
              </span>{" "}
              ya quedó casi listo.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Para que tu registro quede totalmente completo, entra ahora al
              grupo de WhatsApp. Ahí se comparte el acceso, recordatorios y
              avisos importantes de la sesión.
            </p>

            <div className="mt-8 rounded-2xl border border-orange-200/12 bg-white/[0.055] p-5 backdrop-blur sm:p-6">
              <div className="mb-6 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 p-4">
                <div className="flex items-center   stify-between gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#6CFF9A]">
                  <span>Registro casi listo</span>
                  <span>80%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-[#25D366]" />
                </div>
                <p className="mt-3 text-sm font-bold text-white">
                  El último 20% es entrar al grupo de WhatsApp.
                </p>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="group inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.35)] transition hover:scale-[1.01] hover:shadow-[0_28px_70px_rgba(37,211,102,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[360px] sm:text-lg"
                disabled={!WHATSAPP_URL}
              >
                Entrar al grupo de WhatsApp
              </button>

              <p className="mt-3 text-sm font-semibold text-white/55">
                Sin este paso podrías perder el acceso y los recordatorios.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
