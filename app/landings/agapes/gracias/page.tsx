"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WHATSAPP_URL = ""; // Reemplazar con el link del grupo de WhatsApp.
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const BANNER_IMAGE_URL = `${ASSET_BASE}/agapes/banner_gracias.png`;

export default function GraciasAgapesPage() {
  useEffect(() => {
    document.title = "Registro completado | AGAPES | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "AGAPES | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaEvent("Lead", {
      content_name: "AGAPES | Click grupo WhatsApp",
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
        id="meta-pixel-agapes-thankyou"
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

      <main className="relative h-screen overflow-x-hidden overflow-y-auto bg-[#06110d] text-white">
        <div className="pointer-events-none absolute inset-0">
  <div
    className="absolute inset-0 scale-100 opacity-85"
    style={{
      backgroundImage: `
        linear-gradient(
          90deg,
          rgba(4, 32, 24, 0.90) 0%,
          rgba(4, 32, 24, 0.72) 34%,
          rgba(4, 32, 24, 0.38) 62%,
          rgba(4, 32, 24, 0.16) 100%
        ),
        url("${BANNER_IMAGE_URL}")`,
      backgroundSize: "cover",
      backgroundPosition: "left center",
      backgroundRepeat: "no-repeat",
    }}
  />

  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,32,24,0.08)_0%,rgba(4,32,24,0.24)_62%,#06110d_100%)]" />

  <div className="absolute left-[-8%] top-[15%] h-[300px] w-[300px] rounded-full bg-lime-400/14 blur-[110px]" />
</div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
          <div className="w-full max-w-3xl">
            <div className="inline-flex rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-lime-300">
              Registro 80% completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.35)] sm:text-6xl xl:text-[5.5rem]">
              Falta entrar
              <br />
              al grupo
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/82 sm:text-xl">
              Tu registro para la clase gratuita de{" "}
              <span className="font-black text-lime-300">AGAPES</span> ya
              quedó casi listo.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Para que tu registro quede totalmente completo, entra ahora al
              grupo de WhatsApp. Ahí se comparte el acceso, recordatorios y
              avisos importantes de la sesión.
            </p>

            <div className="mt-8 rounded-2xl border border-lime-200/12 bg-white/[0.055] p-5 backdrop-blur sm:p-6">
              <div className="mb-6 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 p-4">
                <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#6CFF9A]">
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

              <a
  href={WHATSAPP_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-lime-200/70 bg-lime-400 px-8 py-5 text-lg font-black uppercase tracking-tight text-[#06110d] shadow-[0_0_35px_rgba(163,255,18,0.45)] transition-all duration-300 hover:scale-[1.03] hover:bg-lime-300 hover:shadow-[0_0_60px_rgba(163,255,18,0.80)] active:scale-[0.98]"
>
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  <span className="relative z-10">ENTRAR AL GRUPO DE WHATSAPP</span>
</a>

              <p className="mt-3 text-sm font-semibold text-white/55">
                Sin este paso podrías perder el acceso y los recordatorios.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "Te llegarán recordatorios",
                "Recibirás el acceso a la sesión",
                "Evitas perder avisos importantes",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-lime-200/12 bg-white/[0.04] p-4 text-sm font-medium text-white/75"
                >
                  <span className="mr-2 text-lime-300">●</span>
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
