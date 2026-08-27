import type { Metadata } from "next";
import { landingConfig as config } from "../config";
import styles from "../estratega-fiscal.module.css";
import { ConversionClient } from "./conversion-client";

export const metadata: Metadata = {
  title: `Completa tu registro | ${config.campaignName} | CEFIN`,
  description: "Último paso para completar tu registro a la clase gratuita de CEFIN.",
  robots: { index: false, follow: false },
};

export default function EstrategaFiscalThankYouPage() {
  return (
    <>
      {config.activation.trackingEnabled && <ConversionClient />}
      <main
        className={`${styles.campaign} relative flex min-h-screen flex-col overflow-hidden bg-[var(--ef-petroleum)] text-[var(--ef-warm-white)]`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
          <div className={`${styles.heroGlowEmerald} absolute -right-24 -top-32 h-80 w-80 rounded-full blur-3xl`} />
          <div className={`${styles.heroGlowGold} absolute -bottom-32 left-[-5rem] h-80 w-80 rounded-full blur-3xl`} />
        </div>

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <a href={config.routes.root} className="flex items-center gap-2.5 text-2xl font-black tracking-[-0.06em] sm:text-3xl">
            <span className="h-8 w-1 rounded-full bg-[var(--ef-emerald)] sm:h-9" aria-hidden="true" />
            CEFIN
          </a>
          <span className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-[var(--ef-gold)] sm:text-xs">
            Paso 1 de 2
          </span>
        </header>

        <div className="relative z-10 flex flex-1 items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <section className="mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-[var(--ef-dark-overlay)] shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-emerald)]">
                Recibimos tus datos
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.96] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Tu registro aún no está completo
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ef-muted-dark)] sm:text-xl">
                Para confirmar tu lugar y recibir el acceso a la clase, debes unirte al grupo oficial de WhatsApp.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl border border-white/15 bg-white/[0.06] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--ef-gold)]">
                    Clase gratuita
                  </p>
                  <p className="mt-2 font-black">{config.date.visible}</p>
                  <p className="mt-1 text-sm text-[var(--ef-muted-dark)]">
                    {config.date.time} · {config.date.timeZoneLabel}
                  </p>
                </article>
                <article className="rounded-2xl border border-[var(--ef-emerald)]/40 bg-[var(--ef-emerald-soft)] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--ef-emerald)]">
                    Paso obligatorio
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--ef-warm-white)]">
                    Entra al grupo para completar tu registro y recibir los recordatorios importantes.
                  </p>
                </article>
              </div>

              <a
                href={config.routes.joinWhatsApp}
                className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[var(--ef-emerald)] px-7 py-3 text-center text-sm font-black uppercase tracking-[0.04em] text-[var(--ef-petroleum)] shadow-[0_16px_36px_var(--ef-cta-shadow)] transition hover:bg-[var(--ef-deep-green)] hover:text-[var(--ef-warm-white)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)] sm:w-auto"
              >
                Completar registro en WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
