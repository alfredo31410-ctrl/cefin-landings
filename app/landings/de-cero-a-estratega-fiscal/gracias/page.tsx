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
  const statusId = "estratega-fiscal-registration-status";
  const titleId = "estratega-fiscal-registration-title";
  const descriptionId = "estratega-fiscal-registration-description";
  const actionPanelId = "estratega-fiscal-whatsapp-actions";

  return (
    <>
      <main
        className={`${styles.campaign} relative flex min-h-screen flex-col overflow-x-hidden bg-[var(--ef-petroleum)] text-[var(--ef-warm-white)]`}
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
            Último paso
          </span>
        </header>

        <div className="relative z-10 flex flex-1 items-start px-4 pb-8 pt-3 sm:items-center sm:px-6 sm:py-12 lg:px-8">
          <section className="mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-[var(--ef-dark-overlay)] shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <div className="px-5 py-6 sm:px-10 sm:py-12 lg:px-14">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-emerald)]">
                Registro confirmado
              </p>
              <h1
                id={titleId}
                className="mt-3 max-w-3xl text-[2.55rem] font-black leading-[0.94] tracking-[-0.045em] sm:mt-4 sm:text-5xl lg:text-6xl"
                suppressHydrationWarning
              >
                ¡Registro completado!
              </h1>
              <p
                id={descriptionId}
                className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-[var(--ef-warm-white)] sm:mt-6 sm:text-xl"
                suppressHydrationWarning
              >
                Tu registro está listo. Ahora entra al grupo de WhatsApp para recibir los accesos y avisos de la clase.
              </p>
              <p
                id={statusId}
                className="mt-3 text-sm font-bold text-[var(--ef-muted-dark)]"
                role="status"
                aria-live="polite"
                suppressHydrationWarning
              >
                Comprobando tu registro reciente…
              </p>

              <div id={actionPanelId} className="mt-6" suppressHydrationWarning>
                <a
                  id={whatsappLinkId}
                  aria-disabled="true"
                  tabIndex={-1}
                  suppressHydrationWarning
                  className="inline-flex min-h-16 w-full items-center justify-center rounded-2xl border-2 border-white/50 bg-[var(--ef-emerald)] px-5 py-4 text-center text-base font-black uppercase tracking-[0.035em] text-[var(--ef-petroleum)] shadow-[0_0_0_6px_rgba(25,169,116,0.18),0_20px_48px_rgba(25,169,116,0.4)] transition hover:-translate-y-0.5 hover:bg-[var(--ef-deep-green)] hover:text-[var(--ef-warm-white)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)] active:scale-[0.98] aria-disabled:cursor-not-allowed aria-disabled:opacity-60 sm:min-h-[4.5rem] sm:text-lg"
                >
                  Entrar al grupo de WhatsApp
                </a>

                <div className="mt-6 rounded-2xl border-2 border-[var(--ef-gold)] bg-[rgba(244,196,89,0.13)] px-4 py-4 sm:px-6 sm:py-5">
                  <p className="text-sm font-black leading-relaxed text-[var(--ef-warm-white)] sm:text-base">
                    <span className="text-[var(--ef-gold)]">IMPORTANTE:</span>{" "}
                    Si Facebook o Instagram te pregunta si quieres salir de la app, toca CONTINUAR para abrir WhatsApp.
                  </p>
                </div>

                <ol className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    <>Toca “Entrar al grupo de WhatsApp”.</>,
                    <>Si Facebook o Instagram pregunta si quieres continuar, toca “CONTINUAR”.</>,
                    <>En WhatsApp, toca “UNIRME AL GRUPO”.</>,
                  ].map((step, index) => (
                    <li
                      key={index}
                      className="flex gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-sm font-semibold leading-relaxed"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ef-emerald)] font-black text-[var(--ef-petroleum)]">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <p className="mt-6 text-center text-xs font-semibold text-[var(--ef-muted-dark)] sm:text-sm">
                  Clase gratuita: {config.date.visible} · {config.date.time} · {config.date.timeZoneLabel}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ConversionClient
        groupUrl={config.access.whatsappGroupUrl}
        whatsappLinkId={whatsappLinkId}
        statusId={statusId}
        titleId={titleId}
        descriptionId={descriptionId}
        actionPanelId={actionPanelId}
      />
    </>
  );
}
