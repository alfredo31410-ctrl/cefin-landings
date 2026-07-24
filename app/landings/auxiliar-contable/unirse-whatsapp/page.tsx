"use client";

import { MetaPixel } from "@/components/meta-pixel";
import { buildMetaEventData, trackMetaCustomEvent } from "@/lib/meta-pixel";
import {
  consumeJoinGroupProof,
  hasCompletedRegistration,
} from "@/lib/registration-session";
import {
  captureTrafficAttribution,
  getTrafficAttribution,
  withTrafficAttribution,
} from "@/lib/traffic-attribution";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL = "https://chat.whatsapp.com/BoLvdJQRxLFEhVH6X84GB8";
const LANDING_PATH = "/landings/auxiliar-contable";
const LANDING_SLUG = "auxiliar-contable";

export default function UnirseWhatsappPage() {
  const router = useRouter();
  const startedRef = useRef(false);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    captureTrafficAttribution(window.location.search, LANDING_SLUG);

    if (!hasCompletedRegistration()) {
      // Se difiere el estado visual para evitar una actualización encadenada dentro del efecto.
      window.queueMicrotask(() => setIsAllowed(false));
      const timeout = window.setTimeout(
        () => router.replace(withTrafficAttribution(LANDING_PATH)),
        5000,
      );
      return () => window.clearTimeout(timeout);
    }

    window.queueMicrotask(() => setIsAllowed(true));
    // El consumo único evita inflar JoinGroup por recarga o por volver con historial.
    if (consumeJoinGroupProof()) {
      trackMetaCustomEvent(
        "JoinGroup",
        buildMetaEventData(LANDING_SLUG, "whatsapp_transition", {
          ...getTrafficAttribution(),
        }),
      );
    }

    // location.replace evita que "Atrás" cree un bucle entre WhatsApp y esta transición.
    const timeout = window.setTimeout(() => {
      window.location.replace(WHATSAPP_URL);
    }, 1500);
    return () => window.clearTimeout(timeout);
  }, [router]);

  if (isAllowed !== true) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f172a] px-5 text-center text-white">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-300">Acceso no validado</p>
          <h1 className="mt-3 text-2xl font-black">Primero completa tu registro.</h1>
          <p className="mt-3 text-sm text-slate-300">Te llevaremos a la landing para iniciar el proceso correctamente.</p>
          <a href={LANDING_PATH} className="mt-6 inline-flex rounded-xl bg-fuchsia-600 px-6 py-3 font-bold">Ir al registro</a>
        </div>
      </main>
    );
  }

  return (
    <>
      <MetaPixel pageKey="auxiliar-whatsapp" />
      <main className="flex min-h-screen items-center justify-center bg-[#0f172a] px-5 py-8 text-white">
        <section className="w-full max-w-lg rounded-3xl border border-[#25D366]/25 bg-white/5 p-7 text-center shadow-2xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/15 text-3xl" aria-hidden="true">↗</div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#6CFF9A]">Abriendo WhatsApp</p>
          <h1 className="mt-3 text-3xl font-black">Estamos preparando tu acceso al grupo</h1>
          <p className="mt-4 leading-relaxed text-slate-300">En unos segundos se abrirá WhatsApp. Si no ocurre automáticamente, usa el botón de respaldo.</p>
          <p className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm font-bold leading-relaxed text-yellow-100">
            Cuando se abra WhatsApp, toca &quot;Unirme al grupo&quot; para completar tu acceso.
          </p>
          <a href={WHATSAPP_URL} className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 font-black text-white hover:bg-[#1fbe5c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6CFF9A]">
            Abrir WhatsApp manualmente
          </a>
        </section>
      </main>
    </>
  );
}
