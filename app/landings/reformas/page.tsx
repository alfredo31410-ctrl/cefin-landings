import { ActiveCampaignForm } from "./activecampaign-form";
import { LandingMotion } from "./landing-motion";
import styles from "./reformas.module.css";

const topics = [
  "Principales cambios y reformas rumbo a 2027",
  "Impacto en personas físicas y morales",
  "Actualizaciones en RESICO",
  "Deducciones, pérdidas y controles",
  "Estímulos fiscales, como el IVA",
];

function RegisterButton({ className = "" }: { className?: string }) {
  return (
    <a className={`${styles.cta} ${className}`} href="#registro-modal">
      Regístrate gratis <span aria-hidden="true">→</span>
    </a>
  );
}

export default function ReformasPage() {
  return (
    <main className={styles.landing} id="reformas-landing">
      <LandingMotion />
      <section className={styles.hero} data-parallax-hero>
        <div className={styles.heroAura} />
        <header className={styles.header}>
          <a className={styles.logo} href="#inicio" aria-label="CEFIN, inicio">CEFIN<span>®</span></a>
          <RegisterButton className={styles.headerCta} />
        </header>

        <div className={styles.heroGrid} id="inicio">
          <div className={styles.heroCopy}>
            <p className={styles.kicker} data-hero-item>Clase gratuita · En vivo</p>
            <h1 data-hero-item>Hay contadores que esperan los cambios.<br /><em>Y otros que se preparan antes.</em></h1>
            <p className={styles.lead} data-hero-item>
              Prepárate desde hoy con una actualización en vivo sobre los cambios y reformas fiscales que debes conocer rumbo a <strong>2027.</strong>
            </p>
            <div className={styles.eventDetails} aria-label="Detalles del evento" data-hero-item>
              <div><b>24</b><span>de noviembre</span></div>
              <div><b>10:00 AM</b><span>Hora CDMX</span></div>
              <div><b>En vivo</b><span>Gratuita · En línea</span></div>
            </div>
            <span className={styles.heroSign} data-hero-item>Actualízate y anticípate</span>
            <span data-hero-item><RegisterButton /></span>
          </div>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.year}>2027</div>
            <div className={styles.road} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.alfredoPhoto} src="/alfredo/DSC_5172-sin-fondo.webp" alt="" />
            <p>Impartido por el<br /><strong>Mtro. Alfredo Cobos</strong></p>
          </div>
        </div>
      </section>

      <section className={styles.problem} data-reveal>
        <p className={styles.eyebrow}>Cambios Fiscales · Clase gratuita</p>
        <h2>La información fiscal del año pasado <span>ya no te alcanza</span> para 2027.</h2>
        <p className={styles.sectionIntro}>Entiende qué revisar, cómo interpretar los cambios y por dónde empezar antes del próximo ejercicio.</p>
        <RegisterButton className={styles.problemCta} />
      </section>

      <section className={styles.agenda} id="temario">
        <div data-reveal>
          <p className={styles.eyebrow}>En esta clase gratuita conocerás</p>
          <h2>Lo que realmente puede afectar a tus clientes.</h2>
          <p>Una sesión para ordenar los temas que merecen tu atención antes de iniciar 2027.</p>
        </div>
        <ol data-reveal>
          {topics.map((topic, index) => <li key={topic} style={{ "--item-delay": `${index * 70}ms` } as React.CSSProperties}><span>0{index + 1}</span>{topic}</li>)}
        </ol>
      </section>

      <section className={styles.registration} id="registro">
        <div data-reveal>
          <p className={styles.eyebrow}>Tu lugar es gratuito</p>
          <h2>Prepárate antes de que tus clientes pregunten.</h2>
          <p>Déjanos tus datos para recibir la información de acceso a la clase.</p>
          <RegisterButton className={styles.registrationCta} />
        </div>
      </section>

      <section id="registro-modal" className={styles.modal} role="dialog" aria-modal="true" aria-label="Registro a Cambios Fiscales">
        <a className={styles.modalBackdrop} href="#registro" aria-label="Cerrar formulario" />
        <div className={styles.modalCard}>
          <a className={styles.modalClose} href="#registro" aria-label="Cerrar formulario">×</a>
          <ActiveCampaignForm className={styles.form} />
        </div>
      </section>
    </main>
  );
}
