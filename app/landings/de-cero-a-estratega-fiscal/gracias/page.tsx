import type { Metadata } from "next";
import { landingConfig as config } from "../config";
import { ConversionClient } from "./conversion-client";

export const metadata: Metadata = {
  title: `Registro confirmado | ${config.campaignName} | CEFIN`,
  description: "Confirmación de registro a la clase gratuita de CEFIN.",
  robots: { index: false, follow: false },
};

export default function EstrategaFiscalThankYouPage() {
  return (
    <>
      {config.activation.trackingEnabled && <ConversionClient />}
      <main className="min-h-screen bg-[#f7f4f8] px-4 py-8 text-slate-950 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
          <header className="flex items-center justify-between gap-4 bg-[#111827] px-6 py-5 text-white sm:px-9">
            <span className="text-2xl font-black tracking-[-0.06em]">CEFIN</span>
            <span className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-pink-200 sm:text-xs">
              Registro confirmado
            </span>
          </header>
          <section className="px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-black text-emerald-700">
              ✓
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
              Tu registro fue confirmado
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
              Ya reservamos tus datos para la clase gratuita “{config.title}”.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-[#faf8fb] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c21870]">
                  Revisa tu correo
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Ahí enviaremos el acceso y los recordatorios de la transmisión.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[#faf8fb] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c21870]">
                  Únete al grupo
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  En WhatsApp compartiremos indicaciones importantes de la clase.
                </p>
              </article>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-sm text-slate-500">
                {config.date.visible} · {config.date.time} · {config.date.timeZoneLabel}
              </p>
              <a
                href={config.routes.joinWhatsApp}
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                Continuar a WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
