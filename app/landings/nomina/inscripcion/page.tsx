import type { Metadata } from "next";
import Image from "next/image";
import "../nomina.css";

export const metadata: Metadata = {
  title: "Especialista en Nómina Estratégica CEFIN",
  description:
    "Aprende a revisar nóminas con estrategia, detectar errores y desarrollar criterio profesional con el programa de CEFIN.",
  openGraph: {
    title: "Especialista en Nómina Estratégica CEFIN",
    description:
      "Deja de solo timbrar nóminas y aprende a revisarlas con estrategia.",
    type: "website",
  },
};

const CHECKOUT_URL =
  "https://pay.hotmart.com/F107061566L?off=rk750909&checkoutMode=10";
const PRODUCT_NAME = "Especialista en Nómina Estratégica CEFIN";
const PRICE = "$5,987 MXN";

const modules = [
  ["A", "Asesor fiscal de sueldos y salarios", "Revisa ISR, ingresos gravados y exentos, retenciones, subsidio y obligaciones fiscales."],
  ["B", "Estratega en IMSS e integración salarial", "Trabaja SBC, prestaciones integrables, exclusiones, límites, cuotas y estrategia salarial."],
  ["C", "Gestión estratégica de INFONAVIT y FONACOT", "Comprende créditos, descuentos, obligaciones, avisos y riesgos patronales."],
  ["D", "Expedientes laborales estratégicos", "Organiza documentación clave, soporte preventivo y control laboral estratégico."],
];

const benefits = [
  "Detecta y previene errores en la elaboración y revisión de nómina.",
  "Comprende el impacto laboral, fiscal, contable y financiero de tus decisiones.",
  "Fortalece tus procesos internos y reduce riesgos para la empresa.",
  "Brinda un servicio más seguro, profesional y estratégico.",
];

const bonuses = [
  "Agente de Inteligencia Artificial Consultor de Nómina con acceso vitalicio.",
  "6 meses de sesiones de preguntas y respuestas.",
  "Techos mentales: trabaja los bloqueos que frenan tu crecimiento profesional.",
  "El arte de saber cobrar por tu conocimiento y servicio.",
  "Curso de REPSE y obligaciones relacionadas.",
];

const faqs = [
  ["¿Para quién es este programa?", "Para contadores, auxiliares, responsables de nómina y profesionales de recursos humanos que quieren revisar con mayor criterio."],
  ["¿Necesito experiencia previa?", "No necesitas ser especialista. El programa parte de los fundamentos y avanza hacia una revisión más estratégica."],
  ["¿Cómo recibo el acceso?", "Después de completar tu compra, Hotmart te mostrará la confirmación y las instrucciones de acceso."],
  ["¿El pago es seguro?", "Sí. El pago se procesa directamente a través de Hotmart."],
];

function CheckoutButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      className={`nomina-sale-cta ${className}`}
      target="_blank"
      rel="noreferrer"
    >
      INSCRIBIRME AHORA <span aria-hidden="true">→</span>
    </a>
  );
}

export default function NominaInscripcionPage() {
  return (
    <main className="nomina-page nomina-sale-page">
      <div className="nomina-grid" />
      <header className="shell nomina-header">
        <a className="brand-lockup" href="/landings/nomina">
          <span className="brand-mark">C</span>
          <span>
            <strong>CEFIN</strong>
            <small>Formación fiscal especializada</small>
          </span>
        </a>
        <span className="header-tag">Programa profesional de nómina</span>
      </header>

      <section className="shell nomina-sale-hero">
        <div className="nomina-sale-copy">
          <p className="eyebrow"><span className="live-dot" /> Programa profesional CEFIN</p>
          <h1>Especialista en Nómina Estratégica CEFIN.</h1>
          <p className="hero-lede">
            Pasa de calcular nóminas a revisar, diagnosticar y prevenir riesgos
            con criterio fiscal, laboral y de seguridad social.
          </p>
          <div className="nomina-sale-points">
            <span>Acceso por 1 año</span>
            <span>Actualizaciones incluidas</span>
            <span>Material descargable</span>
          </div>
          <CheckoutButton />
          <p className="nomina-sale-note">{PRICE} · IVA incluido · Pago seguro por Hotmart.</p>
        </div>

        <div className="nomina-sale-portrait">
          <div className="portrait-halo" />
          <Image
            src="/alfredo.png"
            alt="Mtro. Alfredo Cobos"
            width={620}
            height={700}
            priority
          />
          <div className="nomina-sale-badge">
            <strong>ACCESO COMPLETO</strong>
            <span>Agosto 2026 a agosto 2027</span>
          </div>
        </div>
      </section>

      <section className="shell nomina-sale-section">
        <div className="section-intro">
          <p className="section-kicker">Lo que vas a aprender</p>
          <h2>Una formación integral para dominar la nómina estratégica.</h2>
          <p>
            Aprende la correcta elaboración, revisión y gestión de la nómina,
            comprendiendo no solo los cálculos, sino también su impacto laboral,
            fiscal, contable y financiero.
          </p>
        </div>
        <div className="nomina-sale-module-grid">
          {modules.map(([number, title, description]) => (
            <article className="nomina-sale-module" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nomina-sale-section nomina-sale-dark-section">
        <div className="shell">
          <div className="section-intro">
            <p className="section-kicker">Tu transformación</p>
            <h2>De operar nóminas a entenderlas con criterio.</h2>
          </div>
          <div className="nomina-sale-benefits">
            {benefits.map((benefit) => (
              <div key={benefit}><span>✓</span><p>{benefit}</p></div>
            ))}
          </div>
          <CheckoutButton />
        </div>
      </section>

      <section className="shell nomina-sale-section">
        <div className="section-intro">
          <p className="section-kicker">Implementación acompañada</p>
          <h2>Tres meses para implementarlo contigo.</h2>
          <p>
            No vas a estudiar solo. Tendrás seis mentorías en vivo, cada quince
            días, para resolver dudas y convertir el conocimiento en aplicación real.
          </p>
        </div>
        <div className="nomina-sale-timeline">
          {["Prestaciones gravadas y exentas para ISR", "Retenciones, subsidio y ajuste mensual", "Contratos laborales blindados con IA", "Blindaje ante revisiones de la STPS", "Bases del impuesto sobre nóminas", "Diseño de servicios de nómina"].map((item, index) => (
            <div key={item}><strong>{index + 1}</strong><p>{item}</p></div>
          ))}
        </div>
      </section>

      <section className="nomina-sale-section nomina-sale-dark-section">
        <div className="shell">
          <div className="section-intro">
            <p className="section-kicker">Bonos de regalo</p>
            <h2>Más herramientas para resolver en la práctica.</h2>
          </div>
          <div className="nomina-sale-bonus-grid">
            {bonuses.map((bonus, index) => <div key={bonus}><span>0{index + 1}</span><p>{bonus}</p></div>)}
          </div>
          <CheckoutButton />
        </div>
      </section>

      <section className="shell nomina-sale-instructor">
        <div className="nomina-sale-instructor-image">
          <Image src="/alfredo.png" alt="Mtro. Alfredo Cobos" width={500} height={560} />
        </div>
        <div>
          <p className="section-kicker">Tu instructor</p>
          <h2>Mtro. Alfredo Cobos</h2>
          <p>
            Contador público y maestro en impuestos, fundador de CEFIN, con
            experiencia en asesoría fiscal y capacitación profesional.
          </p>
          <div className="authority-pills">
            <span>Contador público</span>
            <span>Maestro en impuestos</span>
            <span>Fundador de CEFIN</span>
          </div>
        </div>
      </section>

      <section className="nomina-sale-section nomina-sale-faq">
        <div className="shell">
          <div className="section-intro">
            <p className="section-kicker">Preguntas frecuentes</p>
            <h2>Antes de inscribirte.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <div className="nomina-sale-final-cta">
            <div>
              <p className="section-kicker">{PRODUCT_NAME}</p>
              <h2>Entra a una ruta profesional completa.</h2>
              <p className="nomina-sale-price">{PRICE} <small>IVA incluido</small></p>
            </div>
            <CheckoutButton />
          </div>
        </div>
      </section>

      <footer className="shell nomina-footer">
        <span className="footer-brand">CEFIN</span>
        <span>Programa profesional de nómina</span>
      </footer>
    </main>
  );
}
