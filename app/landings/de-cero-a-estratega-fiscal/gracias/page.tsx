import type { Metadata } from "next";
import { landingConfig as config } from "../config";
import styles from "../estratega-fiscal.module.css";
import { ConversionClient } from "./conversion-client";

export const metadata: Metadata = {
  title: `Registro completado | ${config.campaignName} | CEFIN`,
  description: "Registro completado para la clase gratuita de CEFIN.",
  robots: { index: false, follow: false },
};

export default function EstrategaFiscalThankYouPage() {
  const whatsappLinkId = "estratega-fiscal-whatsapp-link";
  const statusId = "estratega-fiscal-whatsapp-status";

  return (
    <>
      <main
        className={`${styles.campaign} relative flex min-h-screen flex-col overflow-hidden bg-[var(--ef-petroleum)] text-[var(--ef-warm-white)]`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
          <div className={`${styles.heroGlowEmerald} absolute -right-24 -top-32 h-80 w-80 rounded-full blur-3xl`} />
          <div className={`${styles.heroGlowGold} absolute -bottom-32 left-[-5rem] h-80 w-80 rounded-full blur-3xl`} />
        </div>

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <a href={config.routes.root} className="flex items-center gap-2.5 text-2xl font-black tracking-[-0.06em] sm:text-3xl">
            <span className="h-8 w-1 rounded-full bg-[var(--ef-emerald)] sm:h-9" aria-hidden="true" />
            CEFIN
          </a>
          <span className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-[var(--ef-gold)] sm:text-xs">
            Registro completado
          </span>
        </header>

        <div className="relative z-10 flex flex-1 items-start px-4 pb-8 pt-3 sm:items-center sm:px-6 sm:py-12 lg:px-8">
          <section className="mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-[var(--ef-dark-overlay)] shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <div className="px-5 py-6 sm:px-10 sm:py-12 lg:px-14">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-emerald)]">
                Recibimos tus datos
              </p>
              <h1 className="mt-3 max-w-3xl text-[2.55rem] font-black leading-[0.94] tracking-[-0.045em] sm:mt-4 sm:text-5xl lg:text-6xl">
                ¡Gracias por registrarte!
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ef-muted-dark)] sm:mt-6 sm:text-xl">
                Tu registro quedó confirmado. Te llevaremos al grupo oficial de WhatsApp para que recibas el acceso y los recordatorios de la clase.
              </p>

              {config.access.whatsappGroupUrl && (
                <>
                  <p
                    id={statusId}
                    className="mt-5 text-center text-sm font-bold text-[var(--ef-warm-white)] sm:mt-7 sm:text-left"
                    role="status"
                    aria-live="polite"
                    suppressHydrationWarning
                  >
                    Registro completado. Te estamos llevando al grupo de WhatsApp…
                  </p>
                  <a
                    id={whatsappLinkId}
                    aria-disabled="true"
                    tabIndex={-1}
                    suppressHydrationWarning
                    className="mt-3 inline-flex min-h-16 w-full items-center justify-center rounded-2xl border-2 border-white/40 bg-[var(--ef-emerald)] px-6 py-4 text-center text-base font-black uppercase tracking-[0.045em] text-[var(--ef-petroleum)] shadow-[0_0_0_5px_rgba(25,169,116,0.16),0_20px_48px_rgba(25,169,116,0.38)] transition hover:-translate-y-0.5 hover:bg-[var(--ef-deep-green)] hover:text-[var(--ef-warm-white)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)] active:scale-[0.98] aria-disabled:cursor-not-allowed aria-disabled:opacity-70 sm:w-auto sm:min-w-[390px]"
                  >
                    Entrar al grupo de WhatsApp
                  </a>
                </>
              )}

              <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                <article className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 sm:p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--ef-gold)]">
                    Clase gratuita
                  </p>
                  <p className="mt-2 font-black">{config.date.visible}</p>
                  <p className="mt-1 text-sm text-[var(--ef-muted-dark)]">
                    {config.date.time} · {config.date.timeZoneLabel}
                  </p>
                </article>
                <article className="rounded-2xl border border-[var(--ef-emerald)]/40 bg-[var(--ef-emerald-soft)] p-4 sm:p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--ef-emerald)]">
                    Acceso al grupo
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--ef-warm-white)]">
                    WhatsApp se abrirá automáticamente. Si no ocurre, usa el botón de arriba.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ConversionClient
        groupUrl={config.access.whatsappGroupUrl}
        whatsappLinkId={whatsappLinkId}
        statusId={statusId}
      />
    </>
  );
}
