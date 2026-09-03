import Image from "next/image";
import { directSaleConfig as config } from "./config";
import styles from "./inscripcion.module.css";

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: config.pricing.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function PurchaseCta({ className = "" }: { className?: string }) {
  if (config.checkout.enabled && config.checkout.url) {
    return (
      <a className={`${styles.purchaseCta} ${className}`} href={config.checkout.url}>
        {config.checkout.buttonLabel}
      </a>
    );
  }

  return (
    <button className={`${styles.purchaseCta} ${className}`} type="button" disabled>
      {config.checkout.demoLabel}
    </button>
  );
}

export default function InscripcionLanding() {
  return (
    <main className={styles.page}>
      {config.isDemo && (
        <div className={styles.demoBar} role="status">
          <span>Vista de demostración</span>
          <p>El contenido, precio y beneficios todavía son provisionales.</p>
        </div>
      )}

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <header className={styles.header}>
          <a className={styles.brand} href="#inicio" aria-label="CEFIN, inicio">
            <span aria-hidden="true" />
            CEFIN
          </a>
          <p>Formación para profesionales contables</p>
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

            <a className={styles.primaryCta} href="#oferta">
              Conocer la oferta
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.productStage} aria-label={`Vista del programa ${config.product.name}`}>
            <div className={styles.productCardBack} aria-hidden="true" />
            <div className={styles.productCard}>
              <span className={styles.productKicker}>Programa digital</span>
              <span className={styles.productName}>{config.product.name}</span>
              <span className={styles.productLine} aria-hidden="true" />
              <span className={styles.productTagline}>Método · criterio · implementación</span>
              <div className={styles.productSeal}>CEFIN</div>
            </div>
            <div className={styles.accessCard}>
              <span>Incluye</span>
              <strong>Recursos de implementación</strong>
              <small>Plantillas y materiales editables</small>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="Características del programa">
        <div>
          <p>{config.product.format}</p>
          <p>{config.product.access}</p>
          <p>{config.product.level}</p>
        </div>
      </section>

      <section className={styles.previewOffer} id="oferta">
        <div>
          <p className={styles.eyebrow}>Oferta de lanzamiento</p>
          <h2>Todo lo necesario para comenzar a construir tu servicio de asesoría.</h2>
          <p>
            Esta primera versión permite validar el recorrido de compra y la presentación del precio antes de conectar una pasarela real.
          </p>
        </div>

        <aside className={styles.priceCard}>
          <p>Inversión de demostración</p>
          <del>{formatMoney(config.pricing.regularPrice)}</del>
          <strong>{formatMoney(config.pricing.salePrice)}</strong>
          <small>{config.pricing.installments}</small>
          <PurchaseCta />
          <span>{config.pricing.taxNote}</span>
        </aside>
      </section>

      <section className={styles.problemSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Una evolución profesional</p>
          <h2>No necesitas saber más normas. Necesitas convertir lo que sabes en decisiones valiosas.</h2>
          <p>
            Muchos contadores tienen el conocimiento técnico, pero siguen atrapados en tareas operativas porque nadie les enseñó a estructurar, presentar y cobrar su criterio.
          </p>
        </div>

        <div className={styles.comparison}>
          <article className={styles.beforeCard}>
            <p>Antes</p>
            <h3>El contador operativo</h3>
            <ul>
              <li>Reacciona a obligaciones y fechas límite.</li>
              <li>Compite principalmente por precio.</li>
              <li>Entrega datos, pero pocas recomendaciones.</li>
              <li>Su experiencia no se refleja en sus honorarios.</li>
            </ul>
          </article>
          <div className={styles.comparisonArrow} aria-hidden="true">→</div>
          <article className={styles.afterCard}>
            <p>Después</p>
            <h3>El estratega fiscal</h3>
            <ul>
              <li>Analiza antes de que aparezca el problema.</li>
              <li>Es reconocido por su criterio profesional.</li>
              <li>Convierte hallazgos en decisiones claras.</li>
              <li>Cobra por el valor de su asesoría.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.outcomesSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Tu nueva forma de trabajar</p>
          <h2>Al terminar este programa podrás:</h2>
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
          <p className={styles.eyebrow}>Contenido del programa</p>
          <h2>Una ruta completa, de la mentalidad a la implementación.</h2>
          <p>
            Los nombres y alcances de estos módulos son demostrativos. La estructura ya está preparada para recibir el temario definitivo.
          </p>
        </div>
        <div className={styles.moduleGrid}>
          {config.modules.map((module) => (
            <article key={module.number} className={styles.moduleCard}>
              <span>{module.number}</span>
              <div>
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
            <p className={styles.eyebrow}>Recursos incluidos</p>
            <h2>Además, recibirás materiales para pasar de la teoría a la acción.</h2>
          </div>
          <p>Bonos de demostración</p>
        </div>
        <div className={styles.bonusGrid}>
          {config.bonuses.map((bonus) => (
            <article key={bonus.label}>
              <span>{bonus.label}</span>
              <div className={styles.bonusIcon} aria-hidden="true">+</div>
              <h3>{bonus.title}</h3>
              <p>{bonus.description}</p>
              <small>Valor de referencia: {formatMoney(bonus.value)}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div className={styles.audienceCopy}>
          <p className={styles.eyebrow}>Este programa es para ti si...</p>
          <h2>Estás listo para ocupar un lugar más estratégico.</h2>
          <p>
            No importa si trabajas de forma independiente, en un despacho o dentro de una empresa. Lo importante es que quieras convertir tu conocimiento en mejores decisiones.
          </p>
        </div>
        <ul className={styles.audienceList}>
          {config.audience.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
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
          />
        </div>
        <div className={styles.instructorCopy}>
          <p className={styles.eyebrow}>Tu instructor</p>
          <h2>{config.instructor.name}</h2>
          <strong>{config.instructor.role}</strong>
          <p>{config.instructor.bio}</p>
          <div className={styles.signature}>CEFIN · Formación con experiencia práctica</div>
        </div>
      </section>

      <section className={styles.testimonialSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Resultados de alumnos</p>
          <h2>La transformación que buscamos generar.</h2>
          <p>Estos testimonios son marcadores visuales y deberán sustituirse por casos reales antes del lanzamiento.</p>
        </div>
        <div className={styles.testimonialGrid}>
          {config.testimonials.map((testimonial) => (
            <figure key={`${testimonial.name}-${testimonial.role}`}>
              <span className={styles.demoTag}>Testimonio de muestra</span>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>
                <span aria-hidden="true">{testimonial.name.charAt(0)}</span>
                <div>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.guaranteeSection}>
        <div className={styles.guaranteeSeal} aria-hidden="true">
          <strong>{config.guarantee.days}</strong>
          <span>días</span>
        </div>
        <div>
          <p className={styles.eyebrow}>Garantía de satisfacción</p>
          <h2>{config.guarantee.title}</h2>
          <p>{config.guarantee.description}</p>
        </div>
      </section>

      <section className={styles.offerSection}>
        <div className={styles.offerHeader}>
          <p className={styles.eyebrow}>Resumen de tu acceso</p>
          <h2>Todo el sistema. Una sola inversión.</h2>
        </div>
        <div className={styles.offerLayout}>
          <div className={styles.valueStack}>
            <div>
              <span>Programa {config.product.name}</span>
              <strong>{formatMoney(config.pricing.regularPrice)}</strong>
            </div>
            {config.bonuses.map((bonus) => (
              <div key={bonus.label}>
                <span>{bonus.title}</span>
                <strong>{formatMoney(bonus.value)}</strong>
              </div>
            ))}
            <div className={styles.totalValue}>
              <span>Valor total de referencia</span>
              <strong>
                {formatMoney(
                  config.pricing.regularPrice +
                    config.bonuses.reduce((total, bonus) => total + bonus.value, 0),
                )}
              </strong>
            </div>
          </div>
          <aside className={styles.finalPriceCard}>
            {config.isDemo && <span className={styles.demoPill}>Oferta de muestra</span>}
            <p>Hoy puedes acceder por</p>
            <del>{formatMoney(config.pricing.regularPrice)}</del>
            <strong>{formatMoney(config.pricing.salePrice)}</strong>
            <small>{config.pricing.installments}</small>
            <PurchaseCta />
            <ul>
              <li>Acceso digital seguro</li>
              <li>Garantía de {config.guarantee.days} días</li>
              <li>Pago todavía desactivado</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Preguntas frecuentes</p>
          <h2>Resuelve tus dudas antes de comenzar.</h2>
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
          <p className={styles.eyebrow}>Tu siguiente nivel profesional</p>
          <h2>El conocimiento técnico abre la puerta. El criterio estratégico cambia tu carrera.</h2>
          <p>
            La página está lista para recibir la oferta definitiva y empezar a vender en cuanto se habiliten los datos reales.
          </p>
        </div>
        <PurchaseCta className={styles.finalButton} />
      </section>

      <footer className={styles.footer}>
        <div>
          <a className={styles.brand} href="#inicio" aria-label="CEFIN, volver al inicio">
            <span aria-hidden="true" />
            CEFIN
          </a>
          <p>Formación especializada para profesionales contables.</p>
        </div>
        <nav aria-label="Información legal">
          <a href={config.legal.privacyUrl}>Aviso de privacidad</a>
          {config.legal.termsUrl ? <a href={config.legal.termsUrl}>Términos y condiciones</a> : null}
        </nav>
      </footer>

      <div className={styles.mobileCta}>
        <div>
          <small>Precio de muestra</small>
          <strong>{formatMoney(config.pricing.salePrice)}</strong>
        </div>
        <a href="#oferta">Ver oferta</a>
      </div>
    </main>
  );
}
