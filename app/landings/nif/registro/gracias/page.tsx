"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  NIF_REGISTRATION_COMPLETION_STORAGE_KEY,
  NIF_REGISTRATION_SUCCESS_STORAGE_KEY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const JOIN_ROUTE = "/landings/nif/unirse-whatsapp";

function markRegistrationComplete() {
  const rawSuccess = window.sessionStorage.getItem(NIF_REGISTRATION_SUCCESS_STORAGE_KEY);
  if (!rawSuccess || window.sessionStorage.getItem(NIF_REGISTRATION_COMPLETION_STORAGE_KEY)) return;

  try {
    const success = JSON.parse(rawSuccess) as { createdAt?: number };
    if (!success.createdAt || Date.now() - success.createdAt > 30 * 60 * 1000) return;
  } catch {
    return;
  }

  window.sessionStorage.setItem(NIF_REGISTRATION_COMPLETION_STORAGE_KEY, "true");
  trackMetaEvent("Lead", {
    content_name: "ABC de las NIF | Registro válido",
    content_category: "Clase gratuita en vivo",
    status: "activecampaign_redirected_to_thanks",
    value: 0,
    currency: META_CURRENCY,
  });
}

export default function NifGraciasPage() {
  useEffect(() => {
    markRegistrationComplete();
  }, []);

  return (
    <>
      <Script id="meta-pixel-nif-gracias" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }} />
      <noscript><img height="1" width="1" style={{ display: "none" }} src={getMetaPixelNoscriptUrl()} alt="" /></noscript>
      <main className="min-h-screen overflow-x-hidden bg-[#08080b] px-5 py-8 pb-28 text-white sm:px-8 lg:pb-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-[#a79bff]/30 bg-[#7c42ff]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#c9c2ff]">Paso 2 de 2 · Acción obligatoria</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">¡Todavía no has completado tu acceso!</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">Tus datos ya fueron guardados correctamente, pero todavía falta el último paso:</p>
            <p className="mt-4 max-w-2xl text-xl font-black uppercase leading-tight text-[#c9c2ff]">Entra ahora al grupo oficial de WhatsApp</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/70">Dentro del grupo recibirás el enlace para entrar a la clase, los recordatorios, los avisos importantes y cualquier actualización relacionada con el evento.</p>
            <p className="mt-4 max-w-2xl rounded-2xl border border-[#ffbf69]/30 bg-[#ffbf69]/10 p-4 text-sm font-bold leading-relaxed text-[#ffd59e]">Si no entras al grupo, no tendrás completo el canal por el que enviaremos el acceso y los avisos de la clase.</p>

            <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
              <div className="grid gap-3 text-sm font-bold sm:grid-cols-2">
                <p className="rounded-xl bg-[#7c42ff]/10 p-4 text-[#c9c2ff]">✓ Paso 1: Tus datos fueron guardados.</p>
                <p className="rounded-xl bg-white/[0.06] p-4 text-white/80">→ Paso 2: Entra al grupo oficial de WhatsApp.</p>
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#ffcf83]">Acceso pendiente de completar</p>
              <a href={JOIN_ROUTE} className="mt-6 inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-[#25d366] px-6 py-4 text-center text-sm font-black uppercase text-[#062c15] shadow-[0_18px_45px_rgba(37,211,102,0.2)] transition hover:bg-[#6dff9d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366]">¡Entrar al grupo y completar mi acceso!</a>
              <p className="mt-4 text-center text-sm font-bold text-white/75">Cuando se abra WhatsApp, toca “Unirme al grupo”.</p>
              <p className="mt-2 text-center text-xs text-white/55">Abrir WhatsApp no es suficiente. Debes presionar “Unirme al grupo” para terminar.</p>
            </div>
          </div>
          <div className="hidden lg:block"><Image src="/alfredo.png" alt="Mtro. Alfredo Cobos" width={800} height={800} sizes="35vw" className="h-auto w-full object-contain opacity-90" /></div>
        </div>

        <section className="mx-auto mt-14 max-w-6xl rounded-3xl border border-white/10 bg-[#121819] p-6 sm:p-8">
          <h2 className="text-2xl font-black sm:text-3xl">No cierres esta página todavía</h2>
          <p className="mt-3 max-w-2xl text-white/70">Tu acceso estará completo cuando abras WhatsApp y presiones “UNIRME AL GRUPO”.</p>
          <a href={JOIN_ROUTE} className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-[#25d366]/50 px-5 py-4 text-center text-sm font-black uppercase text-[#6dff9d] transition hover:bg-[#25d366]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366] sm:w-auto">¡Completar mi acceso en WhatsApp ahora!</a>
          <div className="mt-10 border-t border-white/10 pt-7"><h2 className="text-xl font-black">¿WhatsApp no abrió?</h2><p className="mt-2 text-white/65">Presiona nuevamente el botón.</p><a href={JOIN_ROUTE} className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-5 py-3 text-center text-xs font-black uppercase text-[#111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Abrir el grupo manualmente</a><p className="mt-3 text-sm text-white/55">Recuerda: después de abrir la invitación, todavía debes tocar “Unirme al grupo”.</p></div>
          <p className="mt-8 text-sm font-bold text-white/70">Cuando ya aparezcas dentro del grupo oficial de WhatsApp, podrás cerrar esta página.</p>
        </section>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#090b0d]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur sm:hidden"><a href={JOIN_ROUTE} className="flex min-h-[52px] items-center justify-center rounded-xl bg-[#25d366] px-4 text-center text-xs font-black uppercase text-[#062c15] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]">¡Completar mi acceso ahora!</a></div>
    </>
  );
}
