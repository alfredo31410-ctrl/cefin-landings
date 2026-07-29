import Image from "next/image";
import Link from "next/link";
import { TallerTrackingClient, trackTallerCheckoutClick } from "./taller-tracking-client";
import "./taller.css";

const CHECKOUT_URL =
  "https://pay.hotmart.com/G106884758Y?off=anbe55e7&checkoutMode=10";

const eventDetails = [
  "24 al 28 de agosto de 2026",
  "11:00 a. m. · Hora CDMX",
  "En vivo",
  "100 % en línea",
  "5 días",
];

const pains = [
  "La operación parece sencilla, pero no sabes qué NIF sustenta el tratamiento.",
  "El asiento cuadra, aunque todavía faltan datos para explicar la decisión.",
  "La información del caso está dispersa y cuesta ordenar el análisis.",
  "Conoces la teoría, pero necesitas llevarla a situaciones reales.",
];

const outcomes = [
  ["01", "Explicar el tratamiento", "Explicarás por qué elegiste un tratamiento contable."],
  ["02", "Detectar información", "Detectarás cuándo falta información relevante."],
  ["03", "Analizar antes de registrar", "Evitarás registrar automáticamente sin analizar."],
  ["04", "Comunicar conclusiones", "Comunicarás una conclusión con mayor claridad."],
  ["05", "Sustentar decisiones", "Sustentarás una decisión con mayor criterio profesional."],
] as const;

const practicalFocus = [
  ["Analiza", "Analiza la operación antes de pensar en el registro."],
  ["Ordena", "Ordena la información disponible del caso."],
  ["Detecta", "Detecta los datos faltantes para continuar."],
  ["Identifica", "Identifica qué NIF necesitas revisar."],
  ["Estructura", "Estructura el análisis contable."],
  ["Sustenta", "Sustenta la decisión contable."],
] as const;

const faqs = [
  ["¿Cuándo se realizará el taller?", "Del 24 al 28 de agosto de 2026."],
  ["¿A qué hora será?", "A las 11:00 a. m., hora de CDMX."],
  ["¿Cómo se impartirá?", "Será en vivo y 100 % en línea."],
  ["¿Cuánto dura?", "Son 5 días."],
  ["¿Cuál es el precio?", "El precio es de $587 MXN."],
] as const;

function CheckoutLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={CHECKOUT_URL}
      className={`taller-cta ${className}`}
      onClick={trackTallerCheckoutClick}
    >
      {children}
    </Link>
  );
}

export default function TallerNifPage() {
  return (
    <div className="nif-taller">
      <TallerTrackingClient />

      <section className="taller-hero" id="inicio">
        <div className="taller-shell taller-hero-inner">
          <header className="taller-header-inner">
            <Link href="#inicio" className="taller-brand">
              CEFIN
            </Link>
            <a className="taller-header-link" href="#metodo">
              Inscribirme ya
            </a>
          </header>

          <div className="taller-hero-grid">
            <div>
              <p className="taller-kicker">
                Taller en vivo para contadores y profesionales del área contable
              </p>
              <h1>
                No basta con que el asiento cuadre. Debes poder explicar qué NIF
                sustenta tu <em>decisión.</em>
              </h1>
              <p className="taller-copy">
                Aprende a analizar operaciones reales, identificar la norma aplicable
                y sustentar el tratamiento contable con un método práctico potenciado
                con inteligencia artificial.
              </p>
              <div className="taller-event-strip" aria-label="Datos del taller">
                {eventDetails.map((detail) => (
                  <div className="taller-event-item" key={detail}>
                    {detail}
                  </div>
                ))}
              </div>
              <CheckoutLink>Inscribirme ya por $587 MXN</CheckoutLink>
              <p className="taller-microcopy">
                Serás dirigido a Hotmart para completar tu inscripción de forma segura.
              </p>
            </div>

            <div className="taller-hero-visual">
              <div className="taller-hero-badge">
                <span>Taller Práctico de NIF</span>
                <strong>Potenciado con Inteligencia Artificial</strong>
              </div>
              <Image
                src="/contrato-servicios-contables/alfredo-servicios-contables.png"
                alt="Mtro. Alfredo Cobos, instructor del Taller Práctico de NIF"
                width={800}
                height={800}
                priority
                sizes="(max-width: 959px) 80vw, 35vw"
              />
              <span className="taller-instructor-label">Mtro. Alfredo Cobos</span>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="taller-section taller-dark-section">
          <div className="taller-shell">
            <p className="taller-kicker">El problema</p>
            <h2 className="taller-heading">
              Conocer las NIF no basta si no sabes aplicarlas.
            </h2>
            <p className="taller-copy">
              En la práctica, muchas operaciones no llegan con la respuesta escrita.
              Primero necesitas analizar el caso, identificar qué información falta y
              entender qué norma aplica antes de registrar.
            </p>
            <div className="taller-pain-grid">
              {pains.map((pain) => (
                <div className="taller-pain" key={pain}>{pain}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="taller-section taller-light-section">
          <div className="taller-shell taller-reframe">
            <div>
              <p className="taller-kicker">El reencuadre</p>
              <h2 className="taller-heading">Primero analiza. Después registra.</h2>
              <p className="taller-copy">
                El criterio contable aparece cuando el caso no viene resuelto. El
                objetivo no es memorizar más, sino aprender a justificar mejor.
              </p>
            </div>
            <div className="taller-reframe-list">
              <div><strong>La IA puede ayudarte a ordenar.</strong><span>Pero tú validas la información.</span></div>
              <div><strong>La IA puede estructurar preguntas.</strong><span>Pero tú identificas qué NIF necesitas revisar.</span></div>
              <div><strong>La IA puede apoyar el análisis.</strong><span>Pero tú sustentas la decisión contable.</span></div>
            </div>
          </div>
        </section>

        <section className="taller-section taller-dark-section">
          <div className="taller-shell">
            <div className="taller-centered-heading">
              <p className="taller-kicker">Lo que lograrás</p>
              <h2 className="taller-heading">
                Llevarás las NIF de la teoría a la aplicación práctica.
              </h2>
            </div>
            <div className="taller-outcome-grid">
              {outcomes.map(([number, title, text]) => (
                <article className="taller-outcome" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="taller-cta-band">
          <div className="taller-shell">
            <div>
              <p className="taller-kicker">Taller en vivo · 5 días</p>
              <h2>Aprende a sustentar cada decisión contable.</h2>
              <p>Reserva tu lugar por $587 MXN.</p>
            </div>
            <CheckoutLink>Inscribirme ya por $587 MXN</CheckoutLink>
          </div>
        </section>

        <section className="taller-section taller-light-section" id="metodo">
          <div className="taller-shell">
            <p className="taller-kicker">Ejes prácticos del taller</p>
            <h2 className="taller-heading">Esto es lo que trabajarás durante el taller.</h2>
            <div className="taller-focus-grid">
              {practicalFocus.map(([title, text], index) => (
                <article className="taller-focus" key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="taller-section taller-dark-section">
          <div className="taller-shell taller-audience-grid">
            <div>
              <p className="taller-kicker">Para quién es</p>
              <h2 className="taller-heading">Para contadores y profesionales del área contable.</h2>
              <p className="taller-copy">
                Para quienes quieren analizar operaciones reales, identificar la NIF
                aplicable y explicar sus decisiones con mayor criterio profesional.
              </p>
            </div>
            <div className="taller-audience-card">
              <strong>No es solo teoría.</strong>
              <p>Es un enfoque práctico para trabajar con casos y estructurar mejor el análisis.</p>
            </div>
          </div>
        </section>

        <section className="taller-section taller-light-section">
          <div className="taller-shell">
            <p className="taller-kicker">Uso de inteligencia artificial</p>
            <h2 className="taller-heading">La IA no sustituye tu criterio profesional.</h2>
            <p className="taller-copy">
              Puede ayudarte a ordenar la información, clasificar elementos, detectar
              datos faltantes y estructurar el análisis.
            </p>
            <div className="taller-ai-grid">
              <div>Ordenar información de una operación.</div>
              <div>Clasificar datos relevantes.</div>
              <div>Detectar información faltante.</div>
              <div>Apoyar la revisión de alternativas.</div>
            </div>
          </div>
        </section>

        <section className="taller-cta-band">
          <div className="taller-shell">
            <div>
              <p className="taller-kicker">Método práctico con IA</p>
              <h2>Inscríbete y lleva el análisis a casos reales.</h2>
            </div>
            <CheckoutLink>Inscribirme ya por $587 MXN</CheckoutLink>
          </div>
        </section>

        <section className="taller-section taller-dark-section">
          <div className="taller-shell">
            <p className="taller-kicker">Preguntas frecuentes</p>
            <h2 className="taller-heading">Lo esencial antes de reservar</h2>
            <div className="taller-faq">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="taller-section taller-final" id="oferta">
          <div className="taller-shell taller-final-grid">
            <div>
              <p className="taller-kicker">Reserva tu lugar</p>
              <h2 className="taller-heading">No basta con que el asiento cuadre.</h2>
              <p className="taller-copy">
                Aprende a explicar qué NIF sustenta tu decisión y lleva tu análisis
                contable de la teoría a la práctica.
              </p>
            </div>
            <div className="taller-offer-card">
              <p className="taller-kicker">Taller Práctico de NIF</p>
              <p className="taller-price">$587<span>MXN</span></p>
              <p>24 al 28 de agosto de 2026 · 11:00 a. m. · Hora CDMX</p>
              <CheckoutLink>Inscribirme ya por $587 MXN</CheckoutLink>
              <p className="taller-microcopy">
                Serás dirigido a Hotmart para completar tu inscripción de forma segura.
              </p>
            </div>
          </div>
        </section>

        <section className="taller-cta-band taller-final-cta">
          <div className="taller-shell">
            <div>
              <p className="taller-kicker">Reserva tu lugar</p>
              <h2>Da el siguiente paso para sustentar tus decisiones contables.</h2>
            </div>
            <CheckoutLink>Inscribirme ya por $587 MXN</CheckoutLink>
          </div>
        </section>
      </main>

      <footer className="taller-footer">
        <div className="taller-shell">CEFIN · Taller Práctico de NIF</div>
      </footer>
    </div>
  );
}
