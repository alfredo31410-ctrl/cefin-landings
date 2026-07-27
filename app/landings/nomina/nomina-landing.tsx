"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { landingConfig as config, type ChallengeDay } from "./config";
import "./nomina.css";

const IconArrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

function scrollToRegistration() {
  const section = document.getElementById("registration");
  if (!section) return;
  section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  window.setTimeout(() => document.getElementById("registration-heading")?.focus(), 450);
}

export default function NominaLanding() {
  const [activeDay, setActiveDay] = useState(0);
  const registrationRef = useRef<HTMLElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const section = registrationRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="nomina-page">
      <div className="nomina-grid" aria-hidden="true" />
      <header className="nomina-header shell">
        <a href="#top" className="brand-lockup" aria-label="CEFIN, inicio">
          <span className="brand-mark">C</span>
          <span><strong>CEFIN</strong><small>Centro de Estudios Fiscales</small></span>
        </a>
        <span className="header-tag">Reto profesional en vivo</span>
      </header>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" />{config.eventType}</p>
          <h1>{config.title}</h1>
          <p className="hero-lede">{config.promise}</p>
          <div className="event-details" aria-label="Datos del evento">
            <div><span className="detail-icon">◷</span><span><b>{config.dates}</b><small>{config.time} · {config.timezone}</small></span></div>
            <div><span className="detail-icon">◉</span><span><b>{config.platform}</b><small>Acceso gratuito con registro previo</small></span></div>
          </div>
          <button className="primary-cta" onClick={scrollToRegistration}>{config.ctaLabel}<IconArrow /></button>
          <p className="process-copy">{config.processCopy}</p>
        </div>

        <ChallengeCarousel activeDay={activeDay} setActiveDay={setActiveDay} />
      </section>

      <section className="section problem-section shell">
        <div className="section-intro"><p className="section-kicker">El punto de partida</p><h2>Una nómina timbrada también puede estar mal.</h2><p>El sistema puede procesar y timbrar la información, pero no reemplaza el criterio necesario para revisar cálculos, detectar inconsistencias y evaluar una integración salarial.</p></div>
        <div className="signal-grid">
          <SignalCard number="01" title="ISR" text="Revisa los elementos que intervienen en el cálculo y reconoce señales que merecen atención." />
          <SignalCard number="02" title="IMSS" text="Observa la relación entre la información de nómina y los aspectos que deben verificarse." />
          <SignalCard number="03" title="Integración salarial" text="Identifica por qué una integración incorrecta puede afectar cálculos y obligaciones." />
        </div>
      </section>

      <section className="section days-section shell" id="temario">
        <div className="section-heading"><div><p className="section-kicker">El recorrido</p><h2>Lo que revisarás durante los 3 días</h2></div><span className="heading-note">{config.challengeName}</span></div>
        <div className="days-grid">{config.days.map((day) => <DayCard key={day.id} day={day} />)}</div>
      </section>

      <section className="section transformation-section shell">
        <div className="section-intro"><p className="section-kicker">La evolución</p><h2>Pasa de operar la nómina a revisarla con mayor criterio.</h2></div>
        <div className="transformation-grid"><TransformCard label="Antes" items={["Captura", "Timbra", "Corrige lo evidente", "Depende del sistema"]} muted /><div className="transform-arrow" aria-hidden="true"><IconArrow /></div><TransformCard label="Después" items={["Revisa", "Analiza", "Detecta inconsistencias", "Recomienda con criterio"]} /></div>
      </section>

      <section className="section audience-section shell"><div className="audience-panel"><div className="section-intro"><p className="section-kicker">Para quién es</p><h2>Este reto es para ti si…</h2></div><ul className="check-list">{config.audience.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></div></section>

      <section className="section instructor-section shell"><div className="instructor-portrait"><Image src={config.instructor.image} alt={config.instructor.imageAlt} width={600} height={720} loading="lazy" /><span className="portrait-label">CEFIN / DOCENTE</span></div><div className="instructor-copy"><p className="section-kicker">La mirada detrás del reto</p><h2>Aprende con el Mtro. Alfredo Cobos</h2><p className="instructor-role">{config.instructor.specialty}</p><p>{config.instructor.bio}</p><div className="authority-pills"><span>Fundador de CEFIN</span><span>Asesoría fiscal</span><span>Capacitación profesional</span></div></div></section>

      <section ref={registrationRef} id="registration" className="section registration-section shell" aria-labelledby="registration-heading"><div className="registration-panel"><div className="registration-copy"><p className="section-kicker">Paso 1 de 2</p><h2 id="registration-heading" tabIndex={-1}>Reserva tu lugar gratis</h2><p>Deja tus datos para guardar tu lugar. Después pasarás al último paso: entrar al grupo oficial de WhatsApp.</p><div className="registration-meta"><span>4, 5 y 6 de agosto</span><span>11:00 a. m. · CDMX</span><span>En vivo por YouTube</span></div></div><ActiveCampaignFormPlaceholder /></div></section>

      <Faq />
      <footer className="nomina-footer shell"><span className="footer-brand">CEFIN</span><span>Centro de Estudios Fiscales, Innovación y Negocios</span><span>Registro gratuito · Sin tracking activo</span></footer>
      {showSticky && <button className="sticky-cta" onClick={scrollToRegistration}>{config.ctaLabel}<IconArrow /></button>}
    </main>
  );
}

function ChallengeCarousel({ activeDay, setActiveDay }: { activeDay: number; setActiveDay: (index: number) => void }) {
  const day = config.days[activeDay];
  const touchStart = useRef<number | null>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => { if (event.key === "ArrowRight") setActiveDay((activeDay + 1) % config.days.length); if (event.key === "ArrowLeft") setActiveDay((activeDay + config.days.length - 1) % config.days.length); };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) setActiveDay(distance < 0 ? (activeDay + 1) % config.days.length : (activeDay + config.days.length - 1) % config.days.length); touchStart.current = null; };
  return <div className="challenge-visual"><Image className="hero-person" src={config.heroImage} alt={config.heroImageAlt} width={480} height={540} priority sizes="(max-width: 900px) 180px, 300px" /><div className="visual-chrome"><span>MAPA DEL RETO</span><span>0{activeDay + 1} / 03</span></div><div className="carousel" tabIndex={0} role="region" aria-roledescription="carrusel" aria-label="Temario del reto" onKeyDown={handleKeyDown} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>{config.days.map((item, index) => { const offset = index - activeDay; return <article key={item.id} className={`challenge-card ${offset === 0 ? "is-active" : ""}`} style={{ "--offset": offset, "--accent": item.accent } as React.CSSProperties} aria-hidden={offset !== 0}><span className="card-number">{item.label}</span><div className="card-art"><span className="art-line line-one" /><span className="art-line line-two" /><span className="art-node node-one" /><span className="art-node node-two" /><span className="art-code">NÓMINA<br /><b>REVISION</b></span></div><div className="card-content"><h3>{item.title}</h3><p>{item.description}</p></div></article>; })}<button className="carousel-control prev" onClick={() => setActiveDay((activeDay + config.days.length - 1) % config.days.length)} aria-label="Ver día anterior">←</button><button className="carousel-control next" onClick={() => setActiveDay((activeDay + 1) % config.days.length)} aria-label="Ver día siguiente">→</button></div><div className="pagination" aria-label="Seleccionar día">{config.days.map((item, index) => <button key={item.id} className={index === activeDay ? "active" : ""} onClick={() => setActiveDay(index)} aria-label={`Ver ${item.label}`} aria-current={index === activeDay ? "step" : undefined}><span /></button>)}</div><p className="carousel-hint">Usa las flechas o desliza para explorar el reto</p><span className="sr-only">{day.title}</span></div>;
}

function SignalCard({ number, title, text }: { number: string; title: string; text: string }) { return <article className="signal-card"><span className="card-number">{number}</span><h3>{title}</h3><p>{text}</p></article>; }
function DayCard({ day }: { day: ChallengeDay }) { return <article className="day-card" style={{ "--accent": day.accent } as React.CSSProperties}><span>{day.label}</span><h3>{day.title}</h3><p>{day.description}</p><div className="day-rule" /></article>; }
function TransformCard({ label, items, muted }: { label: string; items: string[]; muted?: boolean }) { return <div className={`transform-card ${muted ? "muted" : ""}`}><span className="transform-label">{label}</span><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>; }

function ActiveCampaignFormPlaceholder() { return <div className="ac-placeholder" aria-label="Espacio reservado para formulario de registro"><div className="placeholder-icon">+</div><h3>Formulario de registro</h3><p>El formulario oficial se integrará aquí en la siguiente etapa.</p>{process.env.NODE_ENV === "development" && <small>Desarrollo: falta insertar el embed aprobado de ActiveCampaign.</small>}<div className="form-reserved-fields" aria-hidden="true"><span /><span /><span /></div></div>; }

function Faq() { return <section className="section faq-section shell"><div className="section-intro"><p className="section-kicker">Preguntas frecuentes</p><h2>Antes de reservar</h2></div><div className="faq-list">{config.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></section>; }
