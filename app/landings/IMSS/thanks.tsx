import Image from "next/image";
import alfredoPortrait from "../../../public/alfredo/DSC_5172-sin-fondo.webp";
import { imssCampaign } from "./config";
import { ThankYouTracking } from "./components/thank-you-tracking";
import { WhatsAppReservationCta } from "./components/whatsapp-reservation-cta";
import styles from "./thanks.module.css";

const benefits = [
  "Recibir el acceso a la clase",
  "Recibir recordatorios antes de iniciar",
  "Consultar avisos importantes de la sesión",
] as const;

export default function ImssThankYouPage() {
  return (
    <main className={styles.page}>
      <ThankYouTracking />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <header className={styles.header}>
        <a href={imssCampaign.publicPath} className={styles.brand}>
          CEFIN
        </a>
        <p>Capacitación para contadores</p>
        <span>Clase gratuita en vivo</span>
      </header>

      <section className={styles.content} aria-labelledby="thank-you-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true">✓</span>
            Formulario recibido
          </p>

          <div className={styles.progressPanel}>
            <div className={styles.progressHeading}>
              <span>Tu registro va al 80%</span>
              <strong>80%</strong>
            </div>
            <div className={styles.progressTrack} aria-hidden="true">
              <span />
            </div>
            <p>El último paso es entrar al grupo de WhatsApp.</p>
          </div>

          <h1 id="thank-you-title">
            Tu lugar <em>aún no</em> está reservado.
          </h1>
          <p className={styles.intro}>
            Ya recibimos tus datos para <strong>IMSS — Actualización Total</strong>.
            Para completar tu registro y reservar tu lugar, entra ahora al grupo
            oficial de WhatsApp de la clase.
          </p>

          <div className={styles.actionCard}>
            <div className={styles.actionHeader}>
              <span className={styles.whatsappMark} aria-hidden="true">WA</span>
              <div>
                <small>Último paso</small>
                <h2>Entra al grupo y completa tu registro</h2>
              </div>
            </div>

            <ul className={styles.benefits}>
              {benefits.map((benefit) => (
                <li key={benefit}>
                  <span aria-hidden="true">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>

            <WhatsAppReservationCta href={imssCampaign.registration.whatsappGroupUrl} />
            <p className={styles.actionNote}>
              Tu lugar se considera reservado después de entrar al grupo.
            </p>
          </div>

          <div className={styles.eventCard}>
            <div>
              <small>Fecha</small>
              <time dateTime={imssCampaign.schedule.isoDateTime}>
                {imssCampaign.schedule.dateLabel}
              </time>
            </div>
            <div>
              <small>Hora</small>
              <strong>{imssCampaign.schedule.timeLabel}</strong>
              <span>{imssCampaign.schedule.timeZoneLabel}</span>
            </div>
            <div>
              <small>Modalidad</small>
              <strong>Clase gratuita en vivo</strong>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualBadge}>
            <span>02</span>
            <p>Entra al grupo</p>
            <strong>Reserva tu lugar</strong>
          </div>

          <figure className={styles.portrait}>
            <Image
              src={alfredoPortrait}
              alt={imssCampaign.portrait.alt}
              width={1024}
              height={1536}
              priority
              unoptimized
              sizes="(max-width: 768px) 88vw, 31rem"
            />
          </figure>

          <div className={styles.stepRail} aria-label="Progreso del registro">
            <div className={styles.stepComplete}>
              <span>01</span>
              <p>Formulario</p>
              <strong>Completado</strong>
            </div>
            <div className={styles.stepPending}>
              <span>02</span>
              <p>WhatsApp</p>
              <strong>Pendiente</strong>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>CEFIN · Formación práctica para profesionales contables.</p>
        <a href={imssCampaign.privacyUrl}>Aviso de privacidad</a>
      </footer>
    </main>
  );
}
