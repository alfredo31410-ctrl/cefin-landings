import Image from "next/image";
import { CampaignTracking } from "./campaign-tracking";
import { landingConfig as config } from "./config";
import styles from "./estratega-fiscal.module.css";
import { RegistrationCta } from "./registration-cta";
import RegistrationForm from "./registration-form";

function FaqAnswer({ id }: { id: (typeof config.faq)[number]["id"] }) {
  if (id === "cost") return <>No. El registro a esta clase es gratuito.</>;
  if (id === "date") {
    return (
      <>
        {config.date.visible} a las {config.date.time} ({config.date.timeZoneLabel}).
      </>
    );
  }
  if (id === "access") return <>{config.access.message}</>;
  return <>Sí. La clase se realizará mediante una {config.modality.toLowerCase()}.</>;
}

function HighlightedTitle() {
  const emphasis = "estratega fiscal";
  const emphasisStart = config.title.toLocaleLowerCase("es-MX").indexOf(emphasis);

  if (emphasisStart < 0) return <>{config.title}</>;

  const emphasisEnd = emphasisStart + emphasis.length;
  return (
    <>
      {config.title.slice(0, emphasisStart)}
      <span className="text-[var(--ef-emerald)]">
        {config.title.slice(emphasisStart, emphasisEnd)}
      </span>
      {config.title.slice(emphasisEnd)}
    </>
  );
}

export default function EstrategaFiscalLanding() {
  return (
    <>
      <CampaignTracking />
      <main
        className={`${styles.campaign} overflow-x-hidden bg-[var(--ef-ivory)] text-[var(--ef-charcoal)]`}
      >
        <section className="relative overflow-hidden bg-[var(--ef-petroleum)] text-[var(--ef-warm-white)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
          >
            <div
              className={`${styles.heroGlowEmerald} absolute -right-24 -top-32 h-80 w-80 rounded-full blur-3xl`}
            />
            <div
              className={`${styles.heroGlowGold} absolute -bottom-32 left-[-5rem] h-80 w-80 rounded-full blur-3xl`}
            />
          </div>

          <header className="relative z-30 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2.5 text-2xl font-black tracking-[-0.06em] sm:text-3xl">
              <span
                className="h-8 w-1 rounded-full bg-[var(--ef-emerald)] sm:h-9"
                aria-hidden="true"
              />
              CEFIN
            </span>
            <span className="max-w-[190px] text-right text-[10px] font-black uppercase tracking-[0.13em] text-[var(--ef-gold)] sm:max-w-none sm:text-xs">
              {config.eventType} · {config.modality}
            </span>
          </header>

          <div className="relative mx-auto grid max-w-6xl gap-7 px-4 pb-14 pt-3 sm:gap-9 sm:px-6 sm:pb-18 lg:grid-cols-[minmax(0,1.22fr)_minmax(380px,.78fr)] lg:items-center lg:gap-7 lg:px-8 lg:pb-16 lg:pt-2">
            <div className="relative isolate min-w-0 overflow-hidden lg:min-h-[650px]">
              <Image
                src={config.instructor.image}
                alt={config.instructor.imageAlt}
                width={config.instructor.imageWidth}
                height={config.instructor.imageHeight}
                sizes="(max-width: 639px) 82vw, (max-width: 1023px) 54vw, 510px"
                preload
                className={`${styles.heroPortrait} absolute right-[-1.25rem] top-2 z-0 h-[310px] w-auto max-w-none object-contain object-top opacity-85 sm:right-2 sm:h-[390px] md:right-8 md:h-[460px] lg:-right-16 lg:bottom-0 lg:top-auto lg:h-[570px] lg:opacity-100`}
              />
              <div
                className={`${styles.heroImageGuard} pointer-events-none absolute inset-0 z-10`}
                aria-hidden="true"
              />
              <div
                className={`${styles.heroBottomGuard} pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64`}
                aria-hidden="true"
              />

              <div
                className={`${styles.heroCopy} relative z-20 flex min-h-full flex-col justify-center py-6 lg:py-10`}
              >
                <p className="max-w-xl text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-gold)] sm:text-sm">
                  Para contadores que quieren crecer profesionalmente
                </p>
                <h1 className="mt-5 max-w-[34rem] text-4xl font-black leading-[0.96] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  <HighlightedTitle />
                </h1>
                <p className="mt-6 max-w-[33rem] text-base leading-relaxed text-[var(--ef-warm-white)] sm:text-lg">
                  {config.promise}
                </p>

                <div className="mt-7 grid max-w-[34rem] gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-[var(--ef-dark-overlay)] p-4 backdrop-blur-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--ef-gold)]">
                      Fecha
                    </p>
                    <time
                      dateTime={config.date.startsAt}
                      className="mt-2 block text-base font-black"
                    >
                      {config.date.visible}
                      <span className="mt-1 block text-sm text-[var(--ef-muted-dark)]">
                        {config.date.time} · {config.date.timeZoneLabel}
                      </span>
                    </time>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-[var(--ef-dark-overlay)] p-4 backdrop-blur-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--ef-emerald)]">
                      Instructor
                    </p>
                    <p className="mt-2 text-base font-black">
                      {config.instructor.name}
                    </p>
                  </div>
                </div>

                <p className="mt-5 flex max-w-[34rem] items-start gap-3 text-sm font-semibold leading-relaxed text-[var(--ef-muted-dark)]">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--ef-emerald-soft)] text-[var(--ef-emerald)]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {config.access.message}
                </p>
              </div>
            </div>

            <div className={`${styles.heroForm} relative z-30 self-center lg:py-8`}>
              <RegistrationForm />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-accessible-green)]">
                El siguiente paso profesional
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                {config.problem.title}
              </h2>
            </div>
            <div
              className={`${styles.scrollReveal} rounded-[1.5rem] border border-[var(--ef-form-border)] bg-[var(--ef-form)] p-6 shadow-sm sm:p-8`}
            >
              <p className="text-lg leading-relaxed text-[var(--ef-charcoal)]">
                {config.problem.description}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--ef-form)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-accessible-green)]">
              Lo que vas a descubrir
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
              Una ruta para convertir conocimiento técnico en criterio profesional.
            </h2>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {config.learnings.map((learning, index) => (
                <article
                  key={learning.title}
                  className={`${styles.scrollReveal} rounded-[1.5rem] border border-[var(--ef-form-border)] bg-[var(--ef-ivory)] p-6`}
                >
                  <span className="text-sm font-black text-[var(--ef-accessible-green)]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-6 text-xl font-black leading-tight">
                    {learning.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ef-muted)]">
                    {learning.description}
                  </p>
                </article>
              ))}
            </div>
            <div className={`${styles.scrollReveal} mt-9 flex justify-center`}>
              <RegistrationCta
                className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[var(--ef-emerald)] px-7 py-3 text-center text-sm font-black uppercase tracking-[0.04em] text-[var(--ef-petroleum)] shadow-[0_16px_36px_var(--ef-cta-shadow)] transition hover:bg-[var(--ef-deep-green)] hover:text-[var(--ef-warm-white)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)] motion-reduce:transition-none sm:w-auto"
              >
                {config.cta}
              </RegistrationCta>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-accessible-green)]">
              Para quién es
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Para perfiles contables que quieren avanzar con más estructura.
            </h2>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {config.audiences.map((audience) => (
                <article
                  key={audience.title}
                  className={`${styles.scrollReveal} rounded-2xl border border-[var(--ef-form-border)] bg-[var(--ef-form)] p-5`}
                >
                  <h3 className="font-black">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ef-muted)]">
                    {audience.description}
                  </p>
                </article>
              ))}
            </div>
            <div
              className={`${styles.scrollReveal} mt-9 flex flex-col items-center gap-3 text-center`}
            >
              <RegistrationCta
                className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[var(--ef-petroleum)] px-7 py-3 text-sm font-black uppercase tracking-[0.04em] text-[var(--ef-warm-white)] shadow-lg transition hover:bg-[var(--ef-dark-surface)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-deep-green)] motion-reduce:transition-none sm:w-auto"
              >
                {config.cta}
              </RegistrationCta>
              <p className="text-sm text-[var(--ef-muted)]">
                {config.eventType} · {config.date.visible} · {config.date.time} ·{" "}
                {config.date.timeZoneLabel}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--ef-dark-surface)] px-4 py-10 text-[var(--ef-warm-white)] sm:px-6 sm:py-12 lg:px-8">
          <div
            className={`${styles.scrollReveal} mx-auto grid max-w-5xl gap-5 sm:grid-cols-[minmax(190px,.55fr)_minmax(0,1.45fr)] sm:items-center sm:gap-10`}
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-gold)]">
                Instructor
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                {config.instructor.name}
              </h2>
            </div>
            <div className="border-t border-white/15 pt-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <p className="max-w-2xl text-base leading-relaxed text-[var(--ef-muted-dark)] sm:text-lg">
                {config.instructor.bio}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--ef-form)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-accessible-green)]">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-center text-3xl font-black tracking-tight sm:text-4xl">
              Lo esencial antes de registrarte
            </h2>
            <div className="mt-8 divide-y divide-[var(--ef-form-border)] border-y border-[var(--ef-form-border)]">
              {config.faq.map((item) => (
                <details
                  key={item.id}
                  className={`${styles.scrollReveal} group py-5`}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black outline-none focus-visible:ring-2 focus-visible:ring-[var(--ef-deep-green)] focus-visible:ring-offset-4">
                    {item.question}
                    <span
                      className="text-2xl text-[var(--ef-accessible-green)] transition group-open:rotate-45 motion-reduce:transition-none"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-10 leading-relaxed text-[var(--ef-muted)]">
                    <FaqAnswer id={item.id} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--ef-emerald)] px-4 py-14 text-[var(--ef-petroleum)] sm:px-6 lg:px-8">
          <div
            className={`${styles.scrollReveal} mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left`}
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-petroleum)]">
                {config.date.visible} · {config.date.time} · {config.date.timeZoneLabel}
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Da el siguiente paso hacia una asesoría más estratégica.
              </h2>
            </div>
            <RegistrationCta
              className="inline-flex min-h-14 w-full shrink-0 items-center justify-center rounded-xl bg-[var(--ef-warm-white)] px-7 py-3 text-sm font-black uppercase tracking-[0.04em] text-[var(--ef-petroleum)] shadow-xl transition hover:bg-[var(--ef-ivory)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-petroleum)] motion-reduce:transition-none sm:w-auto"
            >
              {config.cta}
            </RegistrationCta>
          </div>
        </section>

        <footer className="bg-[var(--ef-petroleum)] px-4 py-7 text-[var(--ef-muted-dark)] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm sm:flex-row sm:text-left">
            <p className="font-black text-[var(--ef-warm-white)]">CEFIN</p>
            {config.privacy.url ? (
              <a
                href={config.privacy.url}
                className="underline decoration-white/50 underline-offset-4 hover:text-[var(--ef-warm-white)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)]"
              >
                Aviso de privacidad
              </a>
            ) : (
              <span className="text-[var(--ef-muted-dark)]">Aviso de Privacidad</span>
            )}
          </div>
        </footer>
      </main>
    </>
  );
}
