import { REGISTRATION_URL } from "./constants";
import styles from "./cefin-experience.module.css";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ProgramPromoCta() {
  return (
    <a
      className={`${styles.sectionCta} ${styles.sectionCtaDark}`}
      href={REGISTRATION_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        <small>Precio de preventa · quedan pocos lugares a este precio</small>
        Dos días. Un solo paso para asegurar tu lugar.
      </span>
      <i><ArrowIcon /></i>
    </a>
  );
}

export function OfferSection() {
  return (
    <section className={styles.offerSection} id="boletos">
      <div className={styles.offerNoise} aria-hidden="true" />
      <div className={styles.offerHeader}>
        <p className={styles.offerEyebrow}>Preventa · pocos lugares a precio especial</p>
        <h2>Tu lugar en la experiencia comienza aquí.</h2>
      </div>

      <div className={styles.offerContent}>
        <div className={styles.priceBlock}>
          <small>Inversión especial de preventa</small>
          <div className={styles.price}>
            <span className={styles.priceSymbol}>$</span>
            <span className={styles.priceAmount}>4,987</span>
            <span className={styles.priceCurrency}>MXN</span>
          </div>
          <p><s>$6,987</s> precio regular</p>
          <p className={styles.installments}>
            O hasta 12 pagos de $500.71 con tarjeta de crédito.
          </p>
        </div>

        <div className={styles.offerBenefits}>
          <p><span>01</span> Acceso al programa del 17 de diciembre</p>
          <p><span>02</span> Comida y cena incluidas</p>
          <p><span>03</span> Acceso sin costo al evento de IA del día 18</p>
        </div>

        <a
          className={styles.offerCta}
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <small>Quedan pocos lugares a este precio</small>
            Quiero asegurar mi lugar
          </span>
          <i><ArrowIcon /></i>
        </a>
      </div>
    </section>
  );
}

export function StickyPromoCta() {
  return (
    <a
      className={styles.stickyMobileCta}
      href={REGISTRATION_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        <small>Precio de preventa</small>
        $4,987 MXN
      </span>
      <strong>Asegurar lugar <ArrowIcon /></strong>
    </a>
  );
}
