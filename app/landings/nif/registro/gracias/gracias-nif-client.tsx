"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  NIF_REGISTRATION_COMPLETION_STORAGE_KEY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const JOIN_ROUTE = "/landings/nif/unirse-whatsapp";

function claimRegistrationConversion(registrationId: string) {
  const conversionKey = `${NIF_REGISTRATION_COMPLETION_STORAGE_KEY}:${registrationId}`;

  try {
    if (window.localStorage.getItem(conversionKey)) return false;
    window.localStorage.setItem(conversionKey, "true");
    return true;
  } catch {
    if (
      window.sessionStorage.getItem(
        NIF_REGISTRATION_COMPLETION_STORAGE_KEY,
      ) === registrationId
    ) {
      return false;
    }
    window.sessionStorage.setItem(
      NIF_REGISTRATION_COMPLETION_STORAGE_KEY,
      registrationId,
    );
    return true;
  }
}

export default function GraciasNifClient() {
  useEffect(() => {
    fetch("/api/nif/registro/consumir", {
      method: "POST",
      credentials: "same-origin",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("invalid-registration");
        return (await response.json()) as { registrationId: string };
      })
      .then(({ registrationId }) => {
        if (!claimRegistrationConversion(registrationId)) return;
        trackMetaEvent(
          "CompleteRegistration",
          {
            content_name: "ABC de NIF",
            content_category: "Clase gratuita en vivo",
            status: "completed",
            value: 0,
            currency: "MXN",
          },
          { eventID: registrationId },
        );
      })
      .catch(() => undefined);
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-nif-gracias"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl()}
          alt=""
        />
      </noscript>
      <main className="min-h-screen overflow-x-hidden bg-[#08080b] px-5 py-8 pb-28 text-white sm:px-8 lg:pb-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-[#a79bff]/30 bg-[#7c42ff]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#c9c2ff]">
              Paso 2 de 2 · Acción obligatoria
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              ¡Todavía no has completado tu acceso!
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Tus datos ya fueron guardados correctamente, pero todavía falta el
              último paso:
            </p>
            <p className="mt-4 max-w-2xl text-xl font-black uppercase leading-tight text-[#c9c2ff]">
              Entra ahora al grupo oficial de WhatsApp
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
              Dentro del grupo recibirás el enlace para entrar a la clase, los
              recordatorios, los avisos importantes y cualquier actualización
              relacionada con el evento.
            </p>
            <p className="mt-4 max-w-2xl rounded-2xl border border-[#ffbf69]/30 bg-[#ffbf69]/10 p-4 text-sm font-bold leading-relaxed text-[#ffd59e]">
              Si no entras al grupo, no tendrás completo el canal por el que
              enviaremos el acceso y los avisos de la clase.
            </p>
            <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
              <div className="grid gap-3 text-sm font-bold sm:grid-cols-2">
                <p className="rounded-xl bg-[#7c42ff]/10 p-4 text-[#c9c2ff]">
                  ✓ Paso 1: Tus datos fueron guardados.
                </p>
                <p className="rounded-xl bg-white/[0.06] p-4 text-white/80">
                  → Paso 2: Entra al grupo oficial de WhatsApp.
                </p>
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#ffcf83]">
                Acceso pendiente de completar
              </p>
              <a
                href={JOIN_ROUTE}
                className="mt-6 inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-[#25d366] px-6 py-4 text-center text-sm font-black uppercase text-[#062c15] shadow-[0_18px_45px_rgba(37,211,102,0.2)] transition hover:bg-[#6dff9d]"
              >
                ¡Entrar al grupo y completar mi acceso!
              </a>
              <p className="mt-4 text-center text-sm font-bold text-white/75">
                Cuando se abra WhatsApp, toca “Unirme al grupo”.
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/alfredo.png"
              alt="Mtro. Alfredo Cobos"
              width={800}
              height={800}
              sizes="35vw"
              className="h-auto w-full object-contain opacity-90"
            />
          </div>
        </div>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#090b0d]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <a
          href={JOIN_ROUTE}
          className="flex min-h-[52px] items-center justify-center rounded-xl bg-[#25d366] px-4 text-center text-xs font-black uppercase text-[#062c15]"
        >
          ¡Completar mi acceso ahora!
        </a>
      </div>
    </>
  );
}
