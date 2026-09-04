import Image from "next/image";
import { directSaleConfig as config } from "./config";
import styles from "./inscripcion.module.css";
import { EstrategaFiscalTracking, TrackedCheckoutLink } from "./tracking";

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: config.pricing.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function PurchaseCta({
  className = "",
  location,
}: {
  className?: string;
  location: string;
}) {
  return (
    <TrackedCheckoutLink
      className={`${styles.purchaseCta} ${className}`}
      location={location}
      ariaLabel={`${config.checkout.buttonLabel}; continuar al pago seguro en Hotmart`}
    >
      {config.checkout.buttonLabel}
    </TrackedCheckoutLink>
  );
}

export default function InscripcionLanding() {
  return (
    <main className={styles.page}>
      <EstrategaFiscalTracking />
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <header className={styles.header}>
          <a className={styles.brand} href="#inicio" aria-label="CEFIN, inicio">
            <span aria-hidden="true" />
            CEFIN
          </a>
          <p>Estrategia · Conocimiento · Resultados</p>
        </header>

        <div className={styles.heroGrid} id="inicio">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{config.product.eyebrow}</p>
            <h1>{config.product.headline}</h1>
            <p className={styles.lead}>{config.product.promise}</p>

            <ul className={styles.quickBenefits} aria-label="Beneficios principales">
              {config.highlights.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <PurchaseCta location="hero" />
          </div>

          <div className={styles.productStage} aria-label={`Vista del programa ${config.product.name}`}>
            <div className={styles.productCardBack} aria-hidden="true" />
            <div className={styles.productCard}>
              <span className={styles.productKicker}>Programa de 5 días</span>
              <span className={styles.productName}>Estrategia Fiscal</span>
              <span className={styles.productLine} aria-hidden="true" />
              <span className={styles.productTagline}>Paso a paso</span>
              <Image
                src={config.instructor.image}
                alt=""
                width={460}
                height={628}
                sizes="330px"
                className={styles.heroInstructorImage}
                aria-hidden="true"
                unoptimized
                priority
              />
              <div className={styles.productSeal}>CEFIN</div>
            </div>
            <div className={styles.accessCard}>
              <span>Imparte</span>
              <strong>{config.instructor.name}</strong>
              <small>Sesiones en vivo y acceso a grabaciones</small>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="Características del programa">
        <div>
          <p>{config.product.format}</p>
          <p>{config.product.level}</p>
          <p>{config.product.access}</p>
        </div>
      </section>

      <section className={styles.previewOffer} id="oferta">
        <div>
          <p className={styles.eyebrow}>Estrategia Fiscal Paso a Paso</p>
          <h2>Aprende a crear estrategias reales y llevarlas a tu práctica profesional.</h2>
          <p>
            Recorre en cinco días el proceso completo: diagnosticar, comparar, diseñar, planear y convertir lo aprendido en un servicio para tus clientes.
          </p>
        </div>

        <aside className={styles.priceCard}>
          <p>Inversión</p>
          <strong>{formatMoney(config.pricing.salePrice)} <small>MXN</small></strong>
          <span>{config.pricing.taxNote}</span>
          <PurchaseCta location="resumen-oferta" />
          <small>Serás dirigido al pago seguro de Hotmart.</small>
        </aside>
      </section>

      <section className={styles.outcomesSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Conocimiento aplicado</p>
          <h2>Del diagnóstico fiscal a un servicio que puedas ofrecer.</h2>
        </div>
        <ol className={styles.outcomesList}>
          {config.outcomes.map((outcome, index) => (
            <li key={outcome}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{outcome}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.curriculumSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Programa de 5 días</p>
          <h2>Un paso concreto cada día.</h2>
          <p>
            Cada sesión desarrolla una etapa del proceso para que avances con orden desde el análisis hasta la creación de tu servicio.
          </p>
        </div>
        <div className={styles.moduleGrid}>
          {config.modules.map((module) => (
            <article key={module.day} className={styles.moduleCard}>
              <span>{module.day}</span>
              <div>
                <p className={styles.moduleAction}>{module.action}</p>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.bonusSection}>
        <div className={styles.bonusHeader}>
          <div>
            <p className={styles.eyebrow}>Tu inscripción incluye</p>
            <h2>Todo lo que necesitas para completar la experiencia.</h2>
          </div>
          <p>Acceso completo</p>
        </div>
        <div className={styles.inclusionGrid}>
          {config.inclusions.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.instructorSection}>
        <div className={styles.instructorImageWrap}>
          <div className={styles.instructorBackdrop} aria-hidden="true" />
          <Image
            src={config.instructor.image}
            alt={config.instructor.imageAlt}
            width={518}
            height={590}
            sizes="(max-width: 800px) 82vw, 420px"
            className={styles.instructorImage}
            unoptimized
          />
        </div>
        <div className={styles.instructorCopy}>
          <p className={styles.eyebrow}>Imparte</p>
          <h2>{config.instructor.name}</h2>
          <strong>{config.instructor.role}</strong>
          <p>
            Acompaña tu aprendizaje durante las cinco sesiones y conoce un proceso práctico para llevar tu conocimiento fiscal al siguiente nivel.
          </p>
          <div className={styles.signature}>CEFIN · Estrategia · Conocimiento · Resultados</div>
        </div>
      </section>

      <section className={styles.offerSection}>
        <div className={styles.offerHeader}>
          <p className={styles.eyebrow}>Inscripción al programa</p>
          <h2>{config.product.slogan}</h2>
        </div>
        <div className={styles.offerLayout}>
          <div className={styles.valueStack}>
            <div>
              <span>Programa completo de 5 días</span>
              <strong>Incluido</strong>
            </div>
            {config.inclusions.map((item) => (
              <div key={item.title}>
                <span>{item.title}</span>
                <strong>✓</strong>
              </div>
            ))}
          </div>
          <aside className={styles.finalPriceCard}>
            <p>Inversión única</p>
            <strong>{formatMoney(config.pricing.salePrice)}</strong>
            <small>MXN</small>
            <PurchaseCta location="oferta-final" />
            <ul>
              <li>Pago procesado de forma segura por Hotmart</li>
              <li>Acceso a grabaciones durante un año</li>
              <li>Certificado digital incluido</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Preguntas frecuentes</p>
          <h2>Lo que incluye tu inscripción.</h2>
        </div>
        <div className={styles.faqList}>
          {config.faq.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalSection}>
        <div>
          <p className={styles.eyebrow}>Estrategia Fiscal Paso a Paso</p>
          <h2>5 días para llevar tu conocimiento fiscal al siguiente nivel.</h2>
          <p>
            Aprende a aplicar estrategias reales y conviértelas en mejores resultados para tu práctica profesional y tus clientes.
          </p>
        </div>
        <PurchaseCta className={styles.finalButton} location="cierre" />
      </section>

      <footer className={styles.footer}>
        <div>
          <a className={styles.brand} href="#inicio" aria-label="CEFIN, volver al inicio">
            <span aria-hidden="true" />
            CEFIN
          </a>
          <p>Centro de Estudios Fiscales, Innovación y Negocios.</p>
        </div>
        <nav aria-label="Información legal">
          <a href={config.legal.privacyUrl}>Aviso de privacidad</a>
          {config.legal.termsUrl ? <a href={config.legal.termsUrl}>Términos y condiciones</a> : null}
        </nav>
      </footer>

      <div className={styles.mobileCta}>
        <div>
          <small>Inversión</small>
          <strong>{formatMoney(config.pricing.salePrice)} MXN</strong>
        </div>
        <TrackedCheckoutLink location="barra-movil">Inscribirme</TrackedCheckoutLink>
      </div>
    </main>
  );
}
