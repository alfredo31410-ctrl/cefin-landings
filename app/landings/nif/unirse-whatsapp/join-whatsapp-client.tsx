"use client";

import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
} from "@/lib/meta-pixel";
import Script from "next/script";

const JOIN_GROUP_EVENT_KEY = "nifJoinGroupEventSent";

export default function JoinWhatsappClient({ groupUrl }: { groupUrl: string }) {
  const [status, setStatus] = useState("Redirigiendo a WhatsApp…");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatus("WhatsApp debería abrirse ahora.");
      window.location.assign(groupUrl);
    }, 1500);
    try {
      if (!window.sessionStorage.getItem(JOIN_GROUP_EVENT_KEY)) {
        window.sessionStorage.setItem(JOIN_GROUP_EVENT_KEY, "true");
        trackMetaCustomEvent("JoinGroup", {
          landing_slug: "nif-registro",
          funnel_step: "whatsapp_redirect",
        });
      }
    } catch {
      trackMetaCustomEvent("JoinGroup", {
        landing_slug: "nif-registro",
        funnel_step: "whatsapp_redirect",
      });
    }

    return () => window.clearTimeout(timer);
  }, [groupUrl]);

  return (
    <>
      <Script
        id="meta-pixel-nif-join"
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
      <main className="flex min-h-screen items-center justify-center bg-[#08080b] px-5 py-12 text-white">
        <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#121819] p-7 text-center shadow-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c9c2ff]">
            ABC de las NIF · Paso final
          </p>
          <h1 className="mt-5 text-3xl font-black uppercase leading-tight sm:text-5xl">
            Estamos abriendo el grupo oficial…
          </h1>
          <h2 className="mt-5 text-lg font-black uppercase text-[#ffcf83]">
            Tu acceso todavía está pendiente
          </h2>
          <p className="mt-5 text-white/70">
            En unos segundos se abrirá WhatsApp.
          </p>
          <p className="mt-5 rounded-2xl border border-[#25d366]/30 bg-[#25d366]/10 p-4 font-black text-[#6dff9d]">
            Cuando aparezca la invitación, toca “UNIRME AL GRUPO”.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            Abrir el enlace no completa el proceso. Debes entrar al grupo para
            recibir el acceso, los recordatorios y los avisos de la clase.
          </p>
          <p
            aria-live="polite"
            className="mt-6 text-sm font-bold text-white/75"
          >
            {status}
          </p>
          <a
            href={groupUrl}
            className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center rounded-2xl bg-[#25d366] px-5 py-4 text-center text-sm font-black uppercase text-[#062c15] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366]"
          >
            ¡Abrir el grupo y completar mi acceso!
          </a>
          <p className="mt-4 text-xs text-white/50">
            Si WhatsApp no se abre automáticamente, utiliza el botón anterior.
          </p>
        </section>
      </main>
    </>
  );
}
