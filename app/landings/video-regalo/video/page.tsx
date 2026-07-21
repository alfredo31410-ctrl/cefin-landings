"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACCESS_STORAGE_KEY = "cefin:video-regalo:access";
const CONVERSION_STORAGE_KEY = "cefin:video-regalo:conversion-tracked";
const LANDING_PATH = "/landings/video-regalo";
const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/5NY03ZN77eE?rel=0";

export default function VideoDesbloqueadoPage() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    document.title = "Tu video especial | CEFIN";
    let hasAccess = false;

    try {
      hasAccess = window.sessionStorage.getItem(ACCESS_STORAGE_KEY) === "granted";
    } catch {
      // Se falla de forma cerrada si el navegador impide validar la sesión.
    }

    window.queueMicrotask(() => setIsAllowed(hasAccess));
    if (!hasAccess) {
      const timeout = window.setTimeout(() => router.replace(LANDING_PATH), 4000);
      return () => window.clearTimeout(timeout);
    }

    // La conversión se cuenta al llegar al contenido, una sola vez por sesión.
    let shouldTrack = true;
    try {
      shouldTrack =
        window.sessionStorage.getItem(CONVERSION_STORAGE_KEY) !== "yes";
      window.sessionStorage.setItem(CONVERSION_STORAGE_KEY, "yes");
    } catch {
      // El bloqueo de storage no impide reproducir el video ya validado.
    }

    if (shouldTrack) {
      trackMetaEvent("CompleteRegistration", {
        content_name: "Video regalo CEFIN",
        content_category: "Contenido educativo",
        landing_slug: "video-regalo",
        event_source: "video_unlocked",
        event_timestamp: Math.floor(Date.now() / 1000),
        status: "registered",
      });
    }
  }, [router]);

  if (isAllowed !== true) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#06080f] px-5 text-center text-white">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Validando acceso</p>
          <h1 className="mt-3 text-2xl font-black">Primero completa el formulario.</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60">Esta página está reservada para personas registradas. Te llevaremos al formulario.</p>
          <a href={LANDING_PATH} className="mt-6 inline-flex rounded-xl bg-cyan-300 px-6 py-3 font-black text-[#041016]">Ir al registro</a>
        </div>
      </main>
    );
  }

  return (
    <>
      <Script id="meta-pixel-video-desbloqueado" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }} />
      <noscript><img height="1" width="1" style={{ display: "none" }} src={getMetaPixelNoscriptUrl()} alt="" /></noscript>
      <main className="relative min-h-dvh overflow-hidden bg-[#06080f] px-5 py-10 text-white sm:px-8">
        {/* El fondo fijo evita cortes en pantallas altas o al rotar un dispositivo móvil. */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(6,182,212,.2),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(147,51,234,.18),transparent_32%),linear-gradient(145deg,#07131b,#080611)]" />
        <section className="relative mx-auto max-w-5xl text-center">
          <div className="flex justify-center"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300 font-black text-[#041016]">C</div></div>
          <p className="mt-7 inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">✓ Acceso desbloqueado</p>
          <h1 className="mt-5 text-3xl font-black sm:text-5xl">Tu video especial ya está listo</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/60">Gracias por registrarte. Presiona reproducir para comenzar.</p>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,.5)]">
            <div className="relative aspect-video">
              <iframe src={YOUTUBE_EMBED_URL} title="Video especial CEFIN" className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
