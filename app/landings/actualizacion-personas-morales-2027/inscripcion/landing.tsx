import Image from "next/image";
import { salesPage } from "./config";
import styles from "./inscripcion.module.css";
import { CheckoutLink, SalesPageTracking } from "./tracking";

function Check() {
  return <span className={styles.check} aria-hidden="true">✓</span>;
}

function PurchaseButton({ location, compact = false }: { location: string; compact?: boolean }) {
  return (
    <CheckoutLink
      location={location}
      className={`${styles.purchaseButton} ${compact ? styles.compactButton : ""}`}
    >
      Inscribirme ahora <span aria-hidden="true">→</span>
    </CheckoutLink>
  );
}

function SectionCta({
  location,
  title,
  detail,
}: {
  location: string;
  title: string;
  detail: string;
}) {
  return (
    <div className={styles.sectionCta}>
      <p>
        <strong>{title}</strong>
        <span>{detail}</span>
      </p>
      <PurchaseButton location={location} compact />
    </div>
  );
}

export default function InscripcionPersonasMoralesLanding() {
  return (
    <main className={styles.page}>
      <SalesPageTracking />

      <section className={styles.hero} id="inicio">
        <div className={styles.heroTexture} aria-hidden="true" />

        <header className={styles.header}>
          <a className={styles.brand} href="#inicio" aria-label="CEFIN, inicio">
            CEFIN
            <small>Estudios Fiscales, Innovación y Negocios</small>
          </a>
          <nav aria-label="Navegación principal">
            <a href="#incluye">Qué incluye</a>
            <a href="#resultados">Resultados</a>
            <a href="#oferta">Inversión</a>
            <CheckoutLink className={styles.navCta} location="navegacion">
              Inscribirme
            </CheckoutLink>
          </nav>
        </header>

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Actualización total · Personas morales 2027</p>
          <h1>Convierte los cambios fiscales en decisiones claras.</h1>
          <p>
            Prepárate para analizar, calcular y recomendar antes de que tus clientes te pregunten qué hacer en 2027.
          </p>
          <PurchaseButton location="hero" />
        </div>

        <div className={styles.productMockup} aria-label="Contenido del programa">
          <div className={styles.desktopCard}>
            <div className={styles.windowBar} aria-hidden="true">
              <span /><span /><span />
              <small>CEFIN · Campus virtual</small>
            </div>
            <div className={styles.desktopContent}>
              <div className={styles.programCopy}>
                <p>Empieza hoy</p>
                <h2>Estratega Fiscal para Personas Morales</h2>
                <strong>Actualización total 2027</strong>
                <ul>
                  <li><Check /> Cambios fiscales y fundamentos</li>
                  <li><Check /> Casos, cálculos y estrategias</li>
                  <li><Check /> Aplicación práctica en empresas</li>
                </ul>
              </div>
              <div className={styles.instructorBadge}>
                <span>Imparte</span>
                <strong>Mtro. Alfredo Cobos</strong>
                <small>Fundador y director de CEFIN</small>
              </div>
              <Image
                src={salesPage.instructor.image}
                alt=""
                width={518}
                height={590}
                sizes="(max-width: 760px) 54vw, 330px"
                className={styles.heroInstructor}
                priority
                unoptimized
                aria-hidden="true"
              />
            </div>
            <div className={styles.credibilityStrip}>
              <span>16 módulos</span>
              <span>Papeles de trabajo</span>
              <span>Grabaciones por un año</span>
            </div>
          </div>

          <div className={styles.mobileCard}>
            <div className={styles.phoneSpeaker} aria-hidden="true" />
            <p>Mentorías en vivo</p>
            <strong>9 y 23</strong>
            <span>Noviembre 2026</span>
            <div className={styles.sessionList}>
              <p><b>09 NOV</b> Actualización</p>
              <p><b>23 NOV</b> Estrategia</p>
            </div>
            <small>9:00 a. m. · CDMX<br />3 horas cada sesión</small>
          </div>
        </div>
      </section>

      <section className={styles.actionBar} aria-label="Resumen de inscripción">
        <div>
          <p>
            <strong>Programa completo + 2 mentorías + 2 bonos</strong>
            <span>Acceso y grabaciones durante un año</span>
          </p>
          <div className={styles.actionPrice}>
            <small>Inversión</small>
            <strong>{salesPage.priceLabel}</strong>
            <span>IVA incluido</span>
          </div>
          <PurchaseButton location="barra_principal" compact />
        </div>
      </section>

      <section className={styles.includesSection} id="incluye">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrowDark}>Una ruta simple y completa</p>
          <h2>Aprende hoy. Actualiza en vivo. Diseña la estrategia.</h2>
          <p>Todo está conectado para llevarte del cambio fiscal a una recomendación concreta.</p>
        </div>

        <div className={styles.offerGrid}>
          {salesPage.coreOffer.map((item) => (
            <article key={item.number}>
              <div className={styles.cardTopline}>
                <span>{item.number}</span>
                <small>{item.kicker}</small>
              </div>
              <h3>{item.title}</h3>
              <strong>{item.subtitle}</strong>
              <p>{item.description}</p>
              <ul>
                {item.details.slice(0, 3).map((detail) => (
                  <li key={detail}><Check /> {detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <SectionCta
          location="despues_de_incluye"
          title="Empieza hoy con acceso inmediato"
          detail="Avanza a tu ritmo y llega preparado a las mentorías en vivo."
        />
      </section>

      <section className={styles.resultsSection} id="resultados">
        <div className={styles.resultsIntro}>
          <p className={styles.eyebrowDark}>Lo que cambia para ti</p>
          <h2>De conocer la reforma a saber qué recomendar.</h2>
        </div>

        <div className={styles.resultsGrid}>
          {salesPage.outcomes.slice(0, 4).map((outcome, index) => (
            <article key={outcome.title}>
              <span>0{index + 1}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
            </article>
          ))}
        </div>

        <SectionCta
          location="despues_de_resultados"
          title="Llega a 2027 con una respuesta clara"
          detail={`Programa completo por ${salesPage.priceLabel} · IVA incluido.`}
        />
      </section>

      <section className={styles.offerSection} id="oferta">
        <div className={styles.offerContent}>
          <div className={styles.bonusCopy}>
            <p className={styles.eyebrow}>Tu inscripción también incluye</p>
            <h2>Dos bonos para cerrar 2026 y entrar preparado a 2027.</h2>
            <div className={styles.bonusList}>
              {salesPage.bonuses.map((bonus) => (
                <article key={bonus.label}>
                  <span>{bonus.label}</span>
                  <div>
                    <h3>{bonus.title}</h3>
                    <p>{bonus.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.updateNote}>
              <Check />
              <p><strong>Garantía de actualización total</strong>Contenido actualizado para las condiciones fiscales de 2027 durante tu acceso.</p>
            </div>
          </div>

          <aside className={styles.priceCard}>
            <p>Oferta presentada en clase</p>
            <s>{salesPage.totalValueLabel}</s>
            <span>Tu inversión</span>
            <strong>{salesPage.priceLabel}</strong>
            <small>IVA incluido · Compra facturable</small>
            <PurchaseButton location="oferta_final" />
            <p className={styles.paymentNote}>Pago seguro procesado por Hotmart.</p>
          </aside>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <p className={styles.eyebrowDark}>Preguntas frecuentes</p>
          <h2>Antes de entrar</h2>
        </div>
        <div className={styles.faqList}>
          {salesPage.faq.slice(0, 4).map((item) => (
            <details key={item.question}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>CEFIN</strong>
          <p>Formación práctica para contadores y profesionales fiscales.</p>
        </div>
        <p>
          Programa educativo ·{" "}
          <a
            href={salesPage.legal.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            Aviso de privacidad
          </a>
        </p>
      </footer>

      <div className={styles.mobileBar}>
        <div><strong>{salesPage.priceLabel}</strong><span>IVA incluido</span></div>
        <PurchaseButton location="mobile_sticky" compact />
      </div>
    </main>
  );
}
