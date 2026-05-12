"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WHATSAPP_URL = "https://chat.whatsapp.com/IPMGmsbKY4k1kG8Nt8wDkI"; // Reemplazar con el link del grupo de WhatsApp.
const BANNER_IMAGE_URL = "/contabilidad-electronica/banner.png";

export default function GraciasContabilidadElectronicaPage() {
  useEffect(() => {
    document.title = "Registro completado | Contabilidad Electrónica | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "Contabilidad Electrónica | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  const handleWhatsAppClick = () => {
    trackMetaEvent("Lead", {
      content_name: "Contabilidad Electrónica | Click grupo WhatsApp",
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
        id="meta-pixel-contabilidad-electronica-thankyou"
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

      <main className="relative h-screen overflow-x-hidden overflow-y-auto bg-[#02070a] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-36 blur-[2px] scale-105"
            style={{
              backgroundImage: `url("${BANNER_IMAGE_URL}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#02070a_0%,rgba(2,7,10,0.78)_48%,rgba(2,7,10,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08)_0%,rgba(2,7,10,0.20)_54%,#02070a_100%)]" />
          <div className="absolute left-0 top-0 h-[250px] w-[300px] opacity-50 [background-image:linear-gradient(135deg,rgba(89,221,230,0.38)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute right-[-8%] top-[15%] h-[300px] w-[300px] rounded-full bg-cyan-400/14 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
          <div className="w-full max-w-3xl">
            <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-cyan-300">
              Registro completado
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.35)] sm:text-6xl xl:text-[5.5rem]">
              Ya casi
              <br />
              estás dentro
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/82 sm:text-xl">
              Tu registro para la clase gratuita de{" "}
              <span className="font-black text-cyan-300">
                Contabilidad Electrónica
              </span>{" "}
              ya quedó.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Ahora entra al grupo de WhatsApp porque por ahí se comparte el
              acceso, recordatorios y avisos importantes de la sesión.
            </p>

            <div className="mt-8 rounded-lg border border-cyan-200/12 bg-white/[0.055] p-5 backdrop-blur sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="rounded-lg border border-white/10 bg-black/24 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Fecha
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    26 de mayo
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-black/24 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Hora
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    11:00 AM (CDMX)
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="group inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.35)] transition hover:scale-[1.01] hover:shadow-[0_28px_70px_rgba(37,211,102,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[360px] sm:text-lg"
                  disabled={!WHATSAPP_URL}
                >
                  Entrar al grupo de WhatsApp
                </button>

                <p className="mt-3 text-sm font-semibold text-white/55">
                  Este clic queda medido como evento Lead para identificar a
                  quienes avanzan al grupo.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "Te llegarán recordatorios",
                "Recibirás el acceso a la sesión",
                "Evitas perder avisos importantes",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-cyan-200/12 bg-white/[0.04] p-4 text-sm font-medium text-white/75"
                >
                  <span className="mr-2 text-cyan-300">●</span>
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
