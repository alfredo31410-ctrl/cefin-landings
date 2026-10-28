import Image from "next/image";
import {
  TallerTrackingClient,
  trackTallerCheckoutClick,
} from "./taller-tracking-client";
import { ScrollRevealClient } from "./scroll-reveal-client";
import "./taller.css";

const CHECKOUT_URL =
  "https://pay.hotmart.com/H108211101R?off=9c34jhld&checkoutMode=10";

const eventDetails = [
  ["Fecha", "23—27 NOV 2026"],
  ["Horario", "11:00 A. M. CDMX"],
  ["Formato", "EN VIVO · ONLINE"],
  ["Duración", "5 DÍAS"],
] as const;

const outcomes = [
  ["01", "Analiza antes de registrar", "Ordena los hechos y detecta la información que todavía falta."],
  ["02", "Identifica la NIF aplicable", "Ubica la norma que necesitas revisar para cada operación."],
  ["03", "Sustenta tu decisión", "Explica el tratamiento contable con mayor claridad y criterio."],
] as const;

const workshopRoute = [
  ["Día 01", "Analiza", "Lee la operación antes de pensar en el asiento."],
  ["Día 02", "Ordena", "Separa los datos relevantes y detecta vacíos de información."],
  ["Día 03", "Identifica", "Define qué NIF necesitas consultar para resolver el caso."],
  ["Día 04", "Estructura", "Apóyate en IA para organizar preguntas y alternativas."],
  ["Día 05", "Sustenta", "Construye una conclusión contable que puedas explicar."],
] as const;

const faqs = [
  ["¿Para quién es?", "Para contadores y profesionales del área contable que quieren aplicar las NIF a operaciones reales."],
  ["¿Cómo se imparte?", "Son cinco sesiones en vivo y 100 % en línea, del 23 al 27 de noviembre de 2026."],
  ["¿La IA sustituye mi criterio?", "No. La IA ayuda a ordenar información; tú validas los datos y sustentas la decisión contable."],
] as const;

function CheckoutLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`nif-cta ${className}`}
      href={CHECKOUT_URL}
      onClick={trackTallerCheckoutClick}
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function InscripcionNifPage() {
  return (
    <div className="nif-sale">
      <TallerTrackingClient />
      <ScrollRevealClient />

      <header className="nif-header">
        <a className="nif-brand" href="#inicio" aria-label="CEFIN, ir al inicio">
          CEFIN<span>.</span>
        </a>
        <nav aria-label="Navegación de la landing">
          <a className="nif-nav-link" href="#programa">Programa</a>
          <CheckoutLink className="nif-cta-header">INSCRIBIRME AHORA</CheckoutLink>
        </nav>
      </header>

      <main>
        <section className="nif-hero" id="inicio">
          <div className="nif-hero-grid" aria-hidden="true" />
          <div className="nif-hero-copy">
            <p className="nif-eyebrow">Formación en vivo · CEFIN</p>
            <h1>
              Taller <span>Práctico</span> de NIF
            </h1>
            <p className="nif-hero-intro">
              Lleva las NIF de la teoría a casos reales y aprende a explicar el
              criterio detrás de cada decisión contable.
            </p>
            <div className="nif-hero-actions">
              <CheckoutLink>INSCRIBIRME AHORA</CheckoutLink>
              <a className="nif-secondary-link" href="#programa">Ver la ruta de 5 días</a>
            </div>
            <p className="nif-presale-note">
              <strong>Precio de preventa: $587 MXN.</strong> El precio subirá al terminar esta etapa.
            </p>
          </div>

          <div className="nif-hero-visual">
            <span className="nif-visual-word" aria-hidden="true">NIF</span>
            <Image
              src="/alfredo-nif.png"
              alt="Mtro. Alfredo Cobos, instructor del Taller Práctico de NIF"
              width={518}
              height={590}
              priority
              sizes="(max-width: 760px) 88vw, 46vw"
            />
            <div className="nif-instructor-tag">
              <span>Instructor</span>
              <strong>Mtro. Alfredo Cobos</strong>
            </div>
          </div>

          <div className="nif-event-bar" aria-label="Información del taller">
            {eventDetails.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="nif-manifesto">
          <p className="nif-vertical-copy" aria-hidden="true">ANÁLISIS · CRITERIO · NIF</p>
          <div className="nif-section-copy" data-reveal>
            <p className="nif-eyebrow nif-eyebrow-dark">El cambio de enfoque</p>
            <h2>El asiento puede cuadrar. Tu decisión también debe sostenerse.</h2>
            <p className="nif-body-copy">
              Una operación real no llega con la respuesta escrita. Primero debes
              entender el caso, detectar qué información falta y encontrar la norma
              que sustenta el tratamiento.
            </p>
          </div>

          <div className="nif-outcomes">
            {outcomes.map(([number, title, text]) => (
              <article key={number} data-reveal>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="nif-inline-cta" data-reveal>
            <div>
              <span>PREVENTA · $587 MXN · PRECIO PRÓXIMO A SUBIR</span>
              <strong>Aprende a sustentar cada decisión contable.</strong>
            </div>
            <CheckoutLink>INSCRIBIRME AHORA</CheckoutLink>
          </div>
        </section>

        <section className="nif-program" id="programa">
          <div className="nif-program-heading" data-reveal>
            <div>
              <p className="nif-eyebrow">Ruta práctica</p>
              <h2>Cinco días.<br />Un método claro.</h2>
            </div>
            <p>
              No se trata de memorizar más. Se trata de aprender a hacer mejores
              preguntas antes de registrar.
            </p>
          </div>

          <div className="nif-program-layout">
            <div className="nif-days">
              {workshopRoute.map(([day, title, text]) => (
                <article key={day} data-reveal>
                  <span>{day}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>

            <aside className="nif-program-card" data-reveal>
              <span className="nif-program-card-number">05</span>
              <p className="nif-eyebrow">Taller en vivo</p>
              <h3>De la operación a una decisión sustentada.</h3>
              <ul>
                <li>Casos y análisis práctico</li>
                <li>NIF aplicada con criterio</li>
                <li>IA como apoyo, no como sustituto</li>
              </ul>
              <CheckoutLink className="nif-cta-program">INSCRIBIRME AHORA</CheckoutLink>
            </aside>
          </div>
        </section>

        <section className="nif-offer" id="inscripcion">
          <div className="nif-offer-copy" data-reveal>
            <p className="nif-eyebrow nif-eyebrow-dark">Inscripción abierta</p>
            <h2>Construye criterio. No solo registros.</h2>
            <p>
              Del lunes 23 al viernes 27 de noviembre de 2026, a las 11:00 a. m.,
              hora de CDMX.
            </p>
          </div>

          <div className="nif-price-card" data-reveal>
            <span className="nif-presale-badge">Precio de preventa</span>
            <p>Taller Práctico de NIF</p>
            <div className="nif-price"><span>$</span>587<small>MXN</small></div>
            <CheckoutLink>INSCRIBIRME AHORA</CheckoutLink>
            <small>El precio subirá al terminar la preventa · Pago seguro por Hotmart.</small>
          </div>

          <div className="nif-faq" data-reveal>
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {question}
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="nif-footer">
        <strong>CEFIN<span>.</span></strong>
        <p>Taller Práctico de NIF · Noviembre 2026</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>

      <CheckoutLink className="nif-mobile-cta">INSCRIBIRME AHORA</CheckoutLink>
    </div>
  );
}
