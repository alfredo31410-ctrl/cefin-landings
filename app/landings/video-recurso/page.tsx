"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

/**
 * ============================================================================
 * PLANTILLA: VIDEO + RECURSO DESCARGABLE
 * ============================================================================
 * Para reutilizar esta landing, duplica esta carpeta o cambia estos datos:
 * - title / subtitle / eyebrow
 * - youtubeEmbedUrl
 * - resourceUrl / resourceLabel
 */
const PAGE_DATA = {
  title: "Clase Especial CEFIN",
  subtitle:
    "Mira el video completo y descarga el material de apoyo para seguir la clase con más claridad.",
  eyebrow: "Acceso al recurso",
  videoTitle: "Video de la clase",
  youtubeEmbedUrl: "https://www.youtube.com/embed/Jhj0J0rKkdc?rel=0",
  resourceTitle: "Material de apoyo",
  resourceDescription:
    "Abre o descarga el documento complementario para tomar notas, revisar conceptos clave y conservar el material.",
  resourceLabel: "Descargar documento",
  resourceUrl:
    "https://drive.google.com/uc?export=download&id=1-zmfzdvzkaIdsolSC2clSbZyQqznQ9QC",
  footerNote:
    "Este enlace es privado para alumnos y personas registradas a esta sesión.",
};

export default function VideoRecursoPage() {
  useEffect(() => {
    document.title = `${PAGE_DATA.title} | CEFIN`;

    trackMetaEvent("ViewContent", {
      content_name: `${PAGE_DATA.title} | Video recurso`,
      content_category: "Contenido educativo",
    });
  }, []);

  const handleResourceClick = () => {
    trackMetaEvent("Lead", {
      content_name: `${PAGE_DATA.title} | Documento`,
      content_category: "Descarga de recurso",
      status: "resource_click",
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-video-recurso"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#05070b] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(168,85,247,0.18),transparent_26%),linear-gradient(135deg,#05070b_0%,#0b1320_48%,#05070b_100%)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05070b] via-[#05070b]/82 to-transparent" />
        </div>

        <header className="relative z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/12 text-sm font-black text-cyan-200">
                C
              </div>
              <div>
                <p className="text-sm font-black leading-none">CEFIN</p>
                <p className="mt-1 hidden text-[10px] uppercase tracking-[0.2em] text-white/50 sm:block">
                  Recurso educativo
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="relative z-10">
          <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl gap-8 px-6 pb-16 pt-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:px-10">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.26em] text-cyan-200">
                {PAGE_DATA.eyebrow}
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {PAGE_DATA.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/72 sm:text-xl">
                {PAGE_DATA.subtitle}
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-video">
                  <iframe
                    src={PAGE_DATA.youtubeEmbedUrl}
                    title={PAGE_DATA.videoTitle}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-md lg:p-7">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
                Documento
              </p>

              <h2 className="mt-3 text-2xl font-black leading-tight text-white">
                {PAGE_DATA.resourceTitle}
              </h2>

              <p className="mt-3 text-base leading-relaxed text-white/68">
                {PAGE_DATA.resourceDescription}
              </p>

              <a
                href={PAGE_DATA.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResourceClick}
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-300 px-6 py-4 text-center text-base font-black uppercase text-[#041016] shadow-[0_18px_50px_rgba(34,211,238,0.26)] transition hover:scale-[1.01] hover:bg-cyan-200 active:scale-[0.98]"
              >
                {PAGE_DATA.resourceLabel}
              </a>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/24 p-4">
                <p className="text-sm font-semibold leading-relaxed text-white/60">
                  {PAGE_DATA.footerNote}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
