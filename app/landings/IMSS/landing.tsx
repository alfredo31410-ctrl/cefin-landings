import Image from "next/image";
import alfredoPortrait from "../../../public/alfredo/DSC_5172-sin-fondo.webp";
import { imssCampaign, imssHighlights, imssTopics } from "./config";
import { CampaignTracking } from "./components/campaign-tracking";
import { RegistrationForm } from "./components/registration-form";
import styles from "./landing.module.css";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}
export default function ImssActualizacionTotalLanding() {
  return (
    <main id="inicio" className={styles.page}>
      <CampaignTracking />

      <a className={styles.skipLink} href={`#${imssCampaign.formAnchor}`}>
        Ir al registro
      </a>

      <div className={styles.heroShell}>
        <header className={styles.header}>
          <a className={styles.brand} href="#inicio" aria-label="CEFIN, volver al inicio">
            CEFIN
          </a>
          <p>Capacitación para contadores</p>
          <a className={styles.headerCta} href={`#${imssCampaign.formAnchor}`}>
            Registro gratuito
            <ArrowIcon />
          </a>
        </header>

        <section className={styles.hero} aria-labelledby="imss-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              {imssCampaign.eyebrow}
            </p>

            <h1 id="imss-title">{imssCampaign.headline}</h1>
            <p className={styles.subtitle}>{imssCampaign.subtitle}</p>

            <div className={styles.heroDetails}>
              <div>
                <p className={styles.statement}>{imssCampaign.statement}</p>
                <p className={styles.summary}>{imssCampaign.summary}</p>
                <p className={styles.sessionFocus}>{imssCampaign.sessionFocus}</p>
              </div>

              <div className={styles.schedule}>
                <span aria-hidden="true">●</span>
                <div>
                  <small>Agenda</small>
                  <time dateTime={imssCampaign.schedule.isoDateTime}>
                    <strong>{imssCampaign.schedule.dateLabel}</strong>
                    <span className={styles.scheduleTime}>
                      {imssCampaign.schedule.timeLabel} · {imssCampaign.schedule.timeZoneLabel}
                    </span>
                  </time>
                </div>
              </div>
            </div>

            <a className={styles.heroCta} href={`#${imssCampaign.formAnchor}`}>
              Quiero registrarme gratis
              <ArrowIcon />
            </a>
          </div>

          <figure className={styles.heroPortrait}>
            <Image
              src={alfredoPortrait}
              alt={imssCampaign.portrait.alt}
              width={1024}
              height={1536}
              priority
              unoptimized
              sizes="(max-width: 768px) 92vw, (max-width: 1360px) 26rem, 29rem"
            />
          </figure>

          <aside id={imssCampaign.formAnchor} className={styles.registrationCard} aria-labelledby="registration-title">
            <p className={styles.formEyebrow}>
              <span>01</span>
              Paso 1 de 2 · Registro gratuito
            </p>
            <h2 id="registration-title">
              Reserva tu lugar <em>gratis</em>
            </h2>
            <p className={styles.formIntro}>Completa tus datos para registrarte.</p>
            <div className={styles.formPromise}>
              <span aria-hidden="true">✓</span>
              <p>
                <strong>Clase gratuita en vivo.</strong>
                Al finalizar, continúa al grupo de WhatsApp para reservar tu lugar.
              </p>
            </div>
            <RegistrationForm />
          </aside>
        </section>
      </div>

      <a
        className={styles.mobileStickyCta}
        href={`#${imssCampaign.formAnchor}`}
        aria-label="Ir al formulario de registro gratuito"
      >
        Registrarme gratis
        <ArrowIcon />
      </a>

      <section className={styles.highlights} aria-label="Características de la clase">
        {imssHighlights.map((highlight, index) => (
          <div key={highlight}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{highlight}</strong>
          </div>
        ))}
      </section>

      <section className={styles.topics} aria-labelledby="topics-title">
        <div className={styles.topicsHeading}>
          <p className={styles.sectionLabel}>Lo que revisaremos</p>
          <h2 id="topics-title">{imssCampaign.topicsHeading}</h2>
          <p>{imssCampaign.topicsSummary}</p>
        </div>

        <div className={styles.topicGrid}>
          {imssTopics.map((topic) => (
            <article key={topic.number}>
              <span>{topic.number}</span>
              <div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <div className={styles.closingMark} aria-hidden="true">
          C
        </div>
        <div>
          <p className={styles.sectionLabel}>Actualización Total IMSS</p>
          <h2 id="closing-title">{imssCampaign.closingStatement}</h2>
        </div>
        <a href={`#${imssCampaign.formAnchor}`} className={styles.closingCta}>
          RESERVAR MI LUGAR GRATIS
          <ArrowIcon />
        </a>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#inicio" aria-label="CEFIN, volver al inicio">
          CEFIN
        </a>
        <p>Formación práctica para profesionales contables.</p>
        <a href={imssCampaign.privacyUrl} target="_blank" rel="noopener noreferrer">
          Aviso de privacidad
        </a>
      </footer>
    </main>
  );
}
