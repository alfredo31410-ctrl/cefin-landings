"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WHATSAPP_URL = "https://chat.whatsapp.com/GFdo1IiPXydJ4HWO8lYdOk";
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const MARISOL_IMAGE_URL = `${ASSET_BASE}/contadora-estrategica/marisol_contadora_estrategica.png`;
const BANNER_IMAGE_URL = `${ASSET_BASE}/contadora-estrategica/banner-contadora-estrategica.png`;

export default function GraciasContadoraEstrategicaPage() {
  useEffect(() => {
    document.title = "Registro completado | Contadora Estrategica | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "Contadora Estrategica | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaEvent("Lead", {
      content_name: "Contadora Estrategica | Click grupo WhatsApp",
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
        id="meta-pixel-contadora-estrategica-thankyou"
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
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-38 blur-[1px]"
            style={{ backgroundImage: `url("${BANNER_IMAGE_URL}")` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_48%,rgba(255,255,255,0.58)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(247,241,255,0.70)_0%,rgba(247,241,255,0.56)_58%,#4f2990_100%)]" />
          <div className="absolute right-0 bottom-0 hidden h-[78vh] w-[46vw] items-end justify-center opacity-95 lg:flex">
            <img
              src={MARISOL_IMAGE_URL}
              alt=""
              className="h-full w-full object-contain object-bottom drop-shadow-[0_26px_48px_rgba(53,31,88,0.28)]"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
          <div className="w-full max-w-3xl">
            <div className="inline-flex rounded-full bg-[#08060c] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-white">
              Registro 80% completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl xl:text-[5.4rem]">
              Falta entrar
              <br />
              al grupo
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#20182c] sm:text-xl">
              Tu registro para la clase gratuita de{" "}
              <span className="font-black text-[#7d4cff]">
                Contadora Estrategica
              </span>{" "}
              ya quedo casi listo.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#31233f]/74 sm:text-lg">
              Para completar el registro, entra al grupo de WhatsApp. Ahi se
              comparte el acceso, recordatorios y avisos importantes de la
              clase.
            </p>

            <div className="mt-8 rounded-lg border border-[#7d4cff]/18 bg-white/72 p-5 shadow-[0_24px_80px_rgba(79,41,144,0.16)] backdrop-blur sm:p-6">
              <div className="mb-6 rounded-lg border border-[#25D366]/25 bg-[#25D366]/10 p-4">
                <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#6CFF9A]">
                  <span className="text-[#128a42]">Registro casi listo</span>
                  <span>80%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-[#25D366]" />
                </div>
                <p className="mt-3 text-sm font-bold text-[#20182c]">
                  El ultimo 20% es entrar al grupo de WhatsApp.
                </p>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.28)] transition hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto sm:min-w-[360px] sm:text-lg"
                disabled={!WHATSAPP_URL}
              >
                Entrar al grupo de WhatsApp
              </button>

              <p className="mt-3 text-sm font-semibold text-[#31233f]/62">
                Cuando el enlace del grupo este listo, este boton quedara
                activo.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "Recibiras recordatorios",
                "Tendras acceso a la sesion",
                "No perderas avisos importantes",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-[#7d4cff]/16 bg-white/66 p-4 text-sm font-semibold text-[#31233f]/78"
                >
                  <span className="mr-2 text-[#7d4cff]">*</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
