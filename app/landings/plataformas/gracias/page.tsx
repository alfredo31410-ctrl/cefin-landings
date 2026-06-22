"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WHATSAPP_GROUP_URL = "/landings/plataformas";

export default function PlataformasGraciasPage() {
  useEffect(() => {
    document.title = "Registro recibido | Plataformas Tecnológicas";

    trackMetaEvent("CompleteRegistration", {
      content_name: "Plataformas Tecnológicas",
      content_category: "Clase gratuita",
      event_date: "2026-06-30",
      event_time: "11:00 AM CDMX",
      source: "thank_you_page",
    });
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-plataformas-gracias"
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

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-10 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(#1820d8_1px,transparent_1px)] bg-[length:100%_7px] opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_78%,rgba(168,85,247,.5),transparent_30%),linear-gradient(120deg,#02010d_0%,#050820_54%,#000_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <section className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-purple-300">
            Registro recibido
          </p>
          <h1 className="mt-5 text-5xl font-black uppercase leading-none sm:text-7xl">
            Falta un último paso
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl">
            Tu registro para la clase de Plataformas Tecnológicas quedó guardado.
            Entra al grupo para recibir recordatorios, enlace de acceso y avisos
            importantes de la clase.
          </p>

          <div className="mt-8 rounded-[2rem] border border-purple-400/25 bg-white/[0.06] p-6 backdrop-blur">
            <p className="text-2xl font-black uppercase">
              30 de junio · 11:00 AM (hora CDMX)
            </p>
            <p className="mt-3 font-bold text-white/60">
              Impartido por el Mtro. Alfredo Cobos
            </p>
          </div>

          <a
            href={WHATSAPP_GROUP_URL}
            className="mt-8 inline-flex min-h-16 items-center justify-center rounded-full bg-white px-10 text-base font-black uppercase tracking-wide text-black shadow-[0_0_70px_rgba(147,51,234,.45)] transition hover:-translate-y-1 hover:bg-purple-100"
          >
            Entrar al grupo
          </a>
        </section>
      </main>
    </>
  );
}
