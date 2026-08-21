import type { Metadata } from "next";
import { landingConfig as config } from "../config";
import { RedirectToWhatsApp } from "./redirect-to-whatsapp";

export const metadata: Metadata = {
  title: "Abriendo el grupo oficial | Despierta tu Potencial Contable | CEFIN",
  description:
    "Acceso al grupo oficial de la clase Despierta tu Potencial Contable.",
  robots: { index: false, follow: false },
};

export default function UnirseWhatsAppPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1d1031] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,76,255,.38),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(37,211,102,.18),transparent_34%)]" />
      <section
        className="relative z-10 w-full max-w-xl rounded-2xl border border-white/12 bg-white/[0.08] p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur sm:p-10"
        aria-labelledby="whatsapp-redirect-title"
      >
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d9c5ff]">
          CEFIN · Paso final
        </p>
        <h1
          id="whatsapp-redirect-title"
          className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl"
        >
          Estamos abriendo el grupo oficial de WhatsApp…
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
          Cuando se abra WhatsApp, presiona <strong>“Unirme al grupo”</strong>{" "}
          para terminar.
        </p>
        <RedirectToWhatsApp
          defaultWhatsappGroupUrl={config.thankYou.whatsappGroupUrl}
          whatsappGroupUrlsByAdsetId={
            config.thankYou.whatsappGroupUrlsByAdsetId
          }
        />
        <p className="mt-5 text-sm font-semibold text-white/55">
          Si WhatsApp no se abre automáticamente, utiliza el botón manual.
        </p>
      </section>
    </main>
  );
}
