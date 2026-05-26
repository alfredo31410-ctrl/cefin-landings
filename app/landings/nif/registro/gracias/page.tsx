"use client";

import Script from "next/script";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  NIF_TRAFFIC_SOURCE_STORAGE_KEY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const WHATSAPP_GROUPS = {
  default: "https://chat.whatsapp.com/FbRR8asMMBDEwZgNtJNXSF",
} as const;

const HERO_IMAGE_URL = "https://cefin-landings-z9uk.vercel.app/alfredo.png";

function GraciasEstadosFinancierosContent() {
  const searchParams = useSearchParams();

  const resolvedTrafficSource = useMemo(() => {
    const rawSource =
      searchParams.get("src") ||
      searchParams.get("source") ||
      searchParams.get("channel") ||
      (typeof window !== "undefined"
        ? window.sessionStorage.getItem(NIF_TRAFFIC_SOURCE_STORAGE_KEY) ||
          window.localStorage.getItem(NIF_TRAFFIC_SOURCE_STORAGE_KEY)
        : null) ||
      "default";

    return rawSource.toLowerCase();
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        NIF_TRAFFIC_SOURCE_STORAGE_KEY,
        resolvedTrafficSource,
      );
      window.localStorage.setItem(
        NIF_TRAFFIC_SOURCE_STORAGE_KEY,
        resolvedTrafficSource,
      );
    }
  }, [resolvedTrafficSource]);

  const whatsappUrl = useMemo(() => {
    return (
      WHATSAPP_GROUPS[resolvedTrafficSource as keyof typeof WHATSAPP_GROUPS] ||
      WHATSAPP_GROUPS.default
    );
  }, [resolvedTrafficSource]);

  useEffect(() => {
    document.title =
      "Registro completado | Estados Financieros con NIF | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "Estados Financieros con NIF | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  return (
    <main className="relative h-screen overflow-x-hidden overflow-y-auto bg-[#08080b] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_80%,rgba(55,86,235,0.34),transparent_24%),radial-gradient(circle_at_92%_12%,rgba(124,66,255,0.4),transparent_24%),linear-gradient(135deg,#07070a_0%,#16161b_48%,#08080b_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-size-[30px_30px]" />
        <div className="absolute right-[-8%] top-0 h-[45%] w-[34%] rotate-12 bg-violet-500/75 blur-[1px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#08080b] via-[#08080b]/78 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[48%] lg:block">
        <Image
          src={HERO_IMAGE_URL}
          alt="Alfredo Cobos"
          width={1000}
          height={1000}
          className="absolute bottom-0 right-[6%] h-[86%] w-auto max-w-none object-contain opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#08080b] via-[#08080b]/58 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
        <div className="w-full max-w-3xl">
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-emerald-300">
            Registro 80% completado
          </div>

          <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl xl:text-[5.5rem]">
            Falta entrar
            <br />
            al grupo
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Tu registro para{" "}
            <span className="font-black text-violet-300">
              Estados Financieros con NIF
            </span>{" "}
            ya quedó casi listo.
          </p>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Para que tu registro quede totalmente completo, entra ahora al grupo
            de WhatsApp. Ahí recibirás acceso, recordatorios y avisos
            importantes de la sesión.
          </p>

          <div className="mt-8 rounded-4xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
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

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                  Día 1
                </p>
                <p className="mt-1 text-xl font-black text-white">12 de mayo</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                  Hora
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  11:00 AM (CDMX)
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                window.open(whatsappUrl, "_blank", "noopener,noreferrer")
              }
              className="mt-6 inline-flex w-full items-center justify-center rounded-[1.2rem] bg-[#25D366] px-6 py-5 text-center text-base font-black uppercase tracking-tight text-[#062c15] shadow-[0_22px_60px_rgba(37,211,102,0.35)] transition hover:scale-[1.01] active:scale-[0.98] sm:w-auto sm:min-w-90 sm:text-lg"
            >
              Entrar al grupo de WhatsApp
            </button>

            <p className="mt-3 text-sm font-semibold text-white/55">
              Fuente detectada:{" "}
              <span className="font-black uppercase text-white/80">
                {resolvedTrafficSource}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function GraciasEstadosFinancierosPage() {
  return (
    <>
      <Script
        id="meta-pixel-estados-financieros-thankyou"
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

      <Suspense fallback={null}>
        <GraciasEstadosFinancierosContent />
      </Suspense>
    </>
  );
}
