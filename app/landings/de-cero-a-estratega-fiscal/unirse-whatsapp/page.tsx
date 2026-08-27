import type { Metadata } from "next";
import { landingConfig as config } from "../config";
import styles from "../estratega-fiscal.module.css";
import { WhatsAppRedirect } from "../gracias/whatsapp-redirect";

export const metadata: Metadata = {
  title: `Último paso | ${config.campaignName} | CEFIN`,
  description: "Únete al grupo de WhatsApp para completar tu registro.",
  robots: { index: false, follow: false },
};

export default function EstrategaFiscalJoinWhatsAppPage() {
  const whatsappGroupUrl = config.activation.registrationEnabled
    ? config.access.whatsappGroupUrl
    : null;

  return (
    <main
      className={`${styles.campaign} relative flex min-h-screen flex-col overflow-hidden bg-[var(--ef-petroleum)] text-[var(--ef-warm-white)]`}
    >
      {whatsappGroupUrl && <WhatsAppRedirect groupUrl={whatsappGroupUrl} />}

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
          Paso 2 de 2
        </span>
      </header>

      <div className="relative z-10 flex flex-1 items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/15 bg-[var(--ef-dark-overlay)] px-6 py-10 text-center shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-10 sm:py-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ef-emerald-soft)] text-3xl font-black text-[var(--ef-emerald)]">
            ✓
          </div>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-gold)]">
            Último paso
          </p>
          <h1 className="mt-3 text-4xl font-black leading-[0.96] tracking-[-0.045em] sm:text-5xl">
            Completa tu registro en WhatsApp
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--ef-muted-dark)]">
            Tu lugar queda confirmado cuando entras al grupo. Ahí recibirás el acceso y los recordatorios de la clase.
          </p>

          {whatsappGroupUrl ? (
            <>
              <p className="mt-6 text-sm font-semibold text-[var(--ef-muted-dark)]" role="status">
                Te estamos llevando al grupo oficial…
              </p>
              <a
                href={whatsappGroupUrl}
                className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[var(--ef-emerald)] px-7 py-3 text-sm font-black uppercase tracking-[0.04em] text-[var(--ef-petroleum)] shadow-[0_16px_36px_var(--ef-cta-shadow)] transition hover:bg-[var(--ef-deep-green)] hover:text-[var(--ef-warm-white)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)] sm:w-auto"
              >
                Unirme al grupo de WhatsApp
              </a>
            </>
          ) : (
            <p className="mt-7 rounded-xl border border-[var(--ef-gold)]/40 bg-white/[0.06] p-4 text-sm font-semibold text-[var(--ef-warm-white)]">
              El grupo no está disponible en este momento. Te enviaremos el acceso a los datos registrados.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
