"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "./config";
import { NominaRevealObserver } from "./nomina-reveal";
import { NominaFormSubmitTracker } from "./nomina-tracking-client";
import "./nomina.css";

const IconArrow = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-6-6 6 6-6 6"
    />
  </svg>
);

function scrollToRegistration() {
  const section = document.getElementById("registration");
  if (!section) return;
  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
  window.setTimeout(
    () => document.getElementById("registration-heading")?.focus(),
    450,
  );
}

export default function NominaLanding() {
  const registrationRef = useRef<HTMLElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const section = registrationRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-nomina"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />
      <NominaRevealObserver />
      <main className="nomina-page">
        <div className="nomina-grid" aria-hidden="true" />
        <header className="nomina-header shell">
          <a href="#top" className="brand-lockup" aria-label="CEFIN, inicio">
            <span className="brand-mark">C</span>
            <span>
              <strong>CEFIN</strong>
              <small>Centro de Estudios Fiscales</small>
            </span>
          </a>
          <span className="header-tag">Reto profesional en vivo</span>
        </header>

        <section id="top" className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow" data-nomina-reveal="hero-eyebrow">
              <span className="live-dot" />
              {config.eventType}
            </p>
            <h1 data-nomina-reveal="hero-title">{config.title}</h1>
            <p className="hero-lede" data-nomina-reveal="hero-lede">
              {config.promise}
            </p>
            <div
              className="event-details"
              aria-label="Datos del evento"
              data-nomina-reveal="hero-details"
            >
              <div>
                <span className="detail-icon" aria-hidden="true">
                  ◷
                </span>
                <span>
                  <b>{config.dates}</b>
                  <small>
                    {config.time} · {config.timezone}
                  </small>
                </span>
              </div>
              <div>
                <span className="detail-icon" aria-hidden="true">
                  ◉
                </span>
                <span>
                  <b>{config.platform}</b>
                  <small>Acceso gratuito con registro previo</small>
                </span>
              </div>
            </div>
            <button
              className="primary-cta"
              data-nomina-reveal="hero-cta"
              onClick={scrollToRegistration}
            >
              {config.ctaLabel}
              <IconArrow />
            </button>
            <p className="process-copy" data-nomina-reveal="hero-process">
              {config.processCopy}
            </p>
          </div>
          <div data-nomina-reveal="hero-image">
            <HeroPortrait />
          </div>
        </section>

        <ChallengeMap />
        <RegistrationCta microcopy="Registro gratuito · Completa los 2 pasos para recibir tu acceso." />

        <section className="section problem-section shell">
          <div className="section-intro">
            <p className="section-kicker">El punto de partida</p>
            <h2>Una nómina timbrada también puede estar mal.</h2>
            <p>
              El sistema puede procesar y timbrar la información, pero no
              reemplaza el criterio necesario para revisar cálculos, detectar
              inconsistencias y evaluar una integración salarial.
            </p>
          </div>
          <div className="signal-grid">
            <SignalCard
              number="01"
              title="ISR"
              text="Revisa los elementos que intervienen en el cálculo y reconoce señales que merecen atención."
            />
            <SignalCard
              number="02"
              title="IMSS"
              text="Observa la relación entre la información de nómina y los aspectos que deben verificarse."
            />
            <SignalCard
              number="03"
              title="Integración salarial"
              text="Identifica por qué una integración incorrecta puede afectar cálculos y obligaciones."
            />
          </div>
        </section>

        <section className="section outcomes-section shell" id="temario">
          <div className="section-intro">
            <p className="section-kicker">La claridad que buscas</p>
            <h2>Al terminar el reto tendrás mayor claridad para…</h2>
          </div>
          <ul className="outcomes-grid">
            {config.outcomes.map((outcome) => (
              <li key={outcome}>
                <span>+</span>
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        <section className="section transformation-section shell">
          <div className="section-intro">
            <p className="section-kicker">La evolución</p>
            <h2>Pasa de operar la nómina a revisarla con mayor criterio.</h2>
          </div>
          <div className="transformation-grid">
            <TransformCard
              label="Antes"
              items={[
                "Captura",
                "Timbra",
                "Corrige lo evidente",
                "Depende del sistema",
              ]}
              muted
            />
            <div className="transform-arrow" aria-hidden="true">
              <IconArrow />
            </div>
            <TransformCard
              label="Después"
              items={[
                "Revisa",
                "Analiza",
                "Detecta inconsistencias",
                "Recomienda con criterio",
              ]}
            />
          </div>
        </section>

        <RegistrationCta microcopy="Registro gratuito · Completa los 2 pasos para recibir tu acceso." />

        <section className="section audience-section shell">
          <div className="audience-panel">
            <div className="section-intro">
              <p className="section-kicker">Para quién es</p>
              <h2>Este reto es para ti si…</h2>
            </div>
            <ul className="check-list">
              {config.audience.map((item) => (
                <li key={item}>
                  <span>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section instructor-section shell">
          <div className="instructor-portrait">
            <Image
              src={config.instructor.image}
              alt={config.instructor.imageAlt}
              width={600}
              height={720}
              loading="lazy"
              sizes="(max-width: 600px) 280px, 290px"
            />
            <span className="portrait-label">CEFIN / DOCENTE</span>
          </div>
          <div className="instructor-copy">
            <p className="section-kicker">La mirada detrás del reto</p>
            <h2>Aprende con el Mtro. Alfredo Cobos</h2>
            <p className="instructor-role">{config.instructor.specialty}</p>
            <p>{config.instructor.bio}</p>
          </div>
          <div className="authority-pills">
            <span>Fundador de CEFIN</span>
            <span>Asesoría fiscal</span>
            <span>Capacitación profesional</span>
          </div>
        </section>

        <section
          ref={registrationRef}
          id="registration"
          className="section registration-section shell nomina-registration"
          aria-labelledby="registration-heading"
        >
          <div className="registration-panel">
            <div className="registration-copy">
              <p className="section-kicker">Paso 1 de 2</p>
              <h2 id="registration-heading" tabIndex={-1}>
                Reserva tu lugar gratis
              </h2>
              <p>
                Deja tus datos para guardar tu lugar. Después pasarás al último
                paso: entrar al grupo oficial de WhatsApp.
              </p>
              <div className="registration-meta">
                <span>{config.dates}</span>
                <span>
                  {config.time} · {config.timezone}
                </span>
                <span>{config.platform}</span>
              </div>
            </div>
            <ActiveCampaignForm />
          </div>
        </section>

        <Faq />
        <footer className="nomina-footer shell">
          <span className="footer-brand">CEFIN</span>
          <span>Centro de Estudios Fiscales, Innovación y Negocios</span>
          <span>Registro gratuito · Acceso en dos pasos</span>
        </footer>
        {showSticky && (
          <button className="sticky-cta" onClick={scrollToRegistration}>
            {config.ctaLabel}
            <IconArrow />
          </button>
        )}
      </main>
    </>
  );
}

function HeroPortrait() {
  return (
    <div className="hero-portrait">
      <div className="portrait-halo" aria-hidden="true" />
      <Image
        src={config.heroImage}
        alt={config.heroImageAlt}
        width={560}
        height={620}
        priority
        sizes="(max-width: 600px) 300px, (max-width: 1100px) 42vw, 520px"
      />
      <div className="hero-event-chip">
        <strong>3 DÍAS</strong>
        <span>{config.platform}</span>
      </div>
    </div>
  );
}

function RegistrationCta({ microcopy }: { microcopy: string }) {
  return (
    <section
      className="registration-cta-section shell"
      data-nomina-reveal="secondary-cta"
    >
      <button className="secondary-cta" onClick={scrollToRegistration}>
        {config.ctaLabel}
        <IconArrow />
      </button>
      <p>{microcopy}</p>
    </section>
  );
}

function ChallengeMap() {
  return (
    <section
      className="challenge-map shell"
      aria-labelledby="challenge-map-title"
    >
      <div className="challenge-map-heading">
        <div>
          <p className="section-kicker">El recorrido</p>
          <h2 id="challenge-map-title">El mapa del reto</h2>
          <p>
            Durante tres sesiones desarrollarás una forma más analítica de
            revisar la nómina.
          </p>
        </div>
        <span className="map-index">03 SESIONES</span>
      </div>
      <div className="challenge-map-grid">
        {config.days.map((day, index) => (
          <article
            className="map-card"
            key={day.id}
            style={{ "--accent": day.accent } as React.CSSProperties}
          >
            <div className="map-card-top">
              <span className="map-day-number">0{index + 1}</span>
              <span className="map-day-label">
                DÍA {index + 1} ·{" "}
                {index === 0
                  ? "REVISIÓN"
                  : index === 1
                    ? "INTEGRACIÓN"
                    : "ESTRATEGIA"}
              </span>
            </div>
            <div className="map-icon">
              <DayIcon index={index} />
            </div>
            <h3>{day.title}</h3>
            <p>{day.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DayIcon({ index }: { index: number }) {
  if (index === 0)
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
        <path d="M12 6h18l8 8v28H12V6Z" stroke="currentColor" strokeWidth="2" />
        <path
          d="M30 6v9h8M18 23h14M18 29h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="33"
          cy="34"
          r="6"
          fill="#0d1b2d"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m30.5 34 1.8 1.8 3.3-3.6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (index === 1)
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
        <rect
          x="10"
          y="8"
          width="28"
          height="32"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 16h16M16 22h16M16 28h5M28 28h4M16 34h5M28 34h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M25 5v6M20 5v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
      <path
        d="M10 37V12l10-5 9 5 9-5v25l-9 5-9-5-10 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 7v25M29 12v25M16 18h1M25 23h1M33 18h1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m16 27 4 4 10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignalCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="signal-card">
      <span className="card-number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
function TransformCard({
  label,
  items,
  muted,
}: {
  label: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <div className={`transform-card ${muted ? "muted" : ""}`}>
      <span className="transform-label">{label}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
function ActiveCampaignForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const formRoot = formRef.current;
    if (!formRoot) return;

    const hasInjectedForm = () => {
      const formExists = Boolean(
        formRoot.querySelector("form, ._form-content, ._form_element"),
      );
      if (formExists) setStatus("ready");
    };

    const observer = new MutationObserver(hasInjectedForm);
    observer.observe(formRoot, { childList: true, subtree: true });
    hasInjectedForm();

    const timeout = window.setTimeout(() => {
      if (!formRoot.querySelector("form, ._form-content, ._form_element")) {
        setStatus("error");
      }
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="nomina-form-shell">
      <NominaFormSubmitTracker formRef={formRef} />
      <Script
        id="activecampaign-form-295"
        src="https://cefincapacitacion.activehosted.com/f/embed.php?id=295"
        strategy="afterInteractive"
        charSet="utf-8"
        onError={() => setStatus("error")}
      />
      {status === "loading" && (
        <p className="nomina-form-status" role="status">
          Cargando formulario…
        </p>
      )}
      {status === "error" && (
        <p className="nomina-form-status nomina-form-error" role="alert">
          No pudimos cargar el formulario. Recarga la página e inténtalo
          nuevamente.
        </p>
      )}
      <div
        ref={formRef}
        className="_form_295"
        aria-label="Formulario de registro"
      />
    </div>
  );
}
function Faq() {
  return (
    <section className="section faq-section shell">
      <div className="section-intro">
        <p className="section-kicker">Preguntas frecuentes</p>
        <h2>Antes de reservar</h2>
      </div>
      <div className="faq-list">
        {config.faq.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span>+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
