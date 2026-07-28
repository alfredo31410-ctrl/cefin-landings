import type { Metadata } from "next";
import Link from "next/link";
import { landingConfig as config } from "../config";
import "./gracias.css";

export const metadata: Metadata = {
  title: "Registro guardado | Reto de nómina | CEFIN",
  description: "Confirma tu registro al reto gratuito de nómina en vivo de CEFIN.",
  robots: { index: false, follow: false },
};

const accessItems = [
  "Enlaces de acceso a las sesiones.",
  "Recordatorios antes de cada transmisión.",
  "Avisos importantes del reto.",
];

export default function NominaGraciasPage() {
  const { thankYou, instructor, eventType, dates, time, timezone, platform } = config;

  return (
    <main className="nomina-thankyou-page">
      <div className="thankyou-grid" aria-hidden="true" />
      <header className="thankyou-header">
        <Link href="/landings/nomina" className="thankyou-brand" aria-label="CEFIN, volver a la landing del reto">
          <span className="thankyou-brand-mark">C</span>
          <span><strong>CEFIN</strong><small>Centro de Estudios Fiscales</small></span>
        </Link>
        <span className="thankyou-step">Paso 2 de 2</span>
      </header>

      <section className="thankyou-shell" aria-labelledby="thankyou-title">
        <div className="thankyou-card">
          <p className="thankyou-eyebrow">PASO 2 DE 2 · NO CIERRES ESTA PÁGINA</p>
          <h1 id="thankyou-title">Solo falta entrar al grupo oficial de WhatsApp</h1>
          <p className="thankyou-lede">Tus datos ya fueron guardados correctamente. Entra ahora al grupo oficial para recibir los enlaces de las sesiones, recordatorios y avisos importantes.</p>
          <p className="thankyou-status">Tu registro está guardado, pero el proceso todavía no está completo.</p>

          {thankYou.whatsappEnabled ? (
            <div className="thankyou-action">
              <Link className="thankyou-cta" href={thankYou.whatsappRedirectPath}>ENTRAR AL GRUPO OFICIAL <span aria-hidden="true">→</span></Link>
              <p>Cuando se abra WhatsApp, toca “Unirme al grupo” para terminar.</p>
            </div>
          ) : (
            <div className="thankyou-pending" role="status">
              <p className="thankyou-pending-title">Estamos preparando el acceso al grupo</p>
              <p>El enlace oficial todavía no ha sido configurado. No abras registros al público hasta completar este paso.</p>
            </div>
          )}

          <div className="thankyou-columns">
            <div>
              <h2>Cuando el acceso esté habilitado recibirás</h2>
              <ul className="thankyou-benefits">{accessItems.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul>
            </div>
            <aside className="thankyou-event" aria-label="Resumen del evento">
              <p>Tu registro corresponde a</p>
              <strong>{eventType}</strong>
              <dl>
                <div><dt>Fechas</dt><dd>{dates}</dd></div>
                <div><dt>Horario</dt><dd>{time} · {timezone}</dd></div>
                <div><dt>Modalidad</dt><dd>{platform}</dd></div>
                <div><dt>Instructor</dt><dd>{instructor.name}</dd></div>
              </dl>
            </aside>
          </div>

          <p className="thankyou-close">Cuando hayas entrado al grupo, podrás cerrar esta página.</p>
        </div>
      </section>

      <footer className="thankyou-footer">CEFIN · Registro guardado · Sin tracking activo</footer>
    </main>
  );
}
