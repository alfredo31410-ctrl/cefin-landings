import styles from "./gracias.module.css";
import { ReformasGraciasTracking } from "./gracias-tracking";

export const metadata = {
  title: "Último paso | Cambios Fiscales | CEFIN",
  robots: { index: false, follow: false },
};

export default function ReformasGraciasPage() {
  return (
    <main className={`${styles.page} gracias-mobile-tune`}>
      <ReformasGraciasTracking />
      <style>{`.whatsapp-live-link{background:#25d366!important;color:#051d12!important;cursor:pointer!important;opacity:1!important;text-decoration:none!important;box-shadow:0 12px 26px rgba(37,211,102,.22)!important}.whatsapp-live-link:hover{background:#35e47a!important;transform:translateY(-3px)}@media (max-width:620px){.gracias-mobile-tune .mobile-gracias-content{display:flex;flex-direction:column}.gracias-mobile-tune .mobile-gracias-content .steps{order:2}.gracias-mobile-tune .mobile-gracias-content .action{order:3}.gracias-mobile-tune .mobile-gracias-content .event{order:4;margin-top:30px}.gracias-mobile-tune .mobile-gracias-content .notice{order:5}.gracias-mobile-tune .mobile-gracias-visual{display:none!important}}`}</style>
      <div className={styles.orbit} aria-hidden="true" />
      <header className={styles.header}>
        <a href="/landings/reformas" className={styles.logo}>CEFIN<span>®</span></a>
        <span>Clase gratuita · En vivo</span>
      </header>
      <section className={styles.shell}>
        <div className={`${styles.content} mobile-gracias-content`} style={{ display: "flex", flexDirection: "column" }}>
          <p className={styles.kicker}><i /> Registro recibido · Falta un paso</p>
          <h1>Tu acceso aún <em>no está completo.</em></h1>
          <p className={styles.lead}>Tus datos ya fueron registrados para la clase gratuita <strong>Cambios Fiscales</strong>. Para asegurar que recibas el acceso y los avisos, todavía debes entrar al grupo oficial de WhatsApp.</p>
          <div className={styles.event} style={{ order: 4 }}>
            <div><small>Fecha</small><b>24 de noviembre</b></div>
            <div><small>Horario</small><b>10:00 AM · CDMX</b></div>
            <div><small>Modalidad</small><b>En vivo · En línea</b></div>
          </div>
          <section className={styles.steps} style={{ order: 2 }} aria-label="Progreso del registro">
            <div className={styles.progress}><span /></div>
            <div className={styles.stepDone}><b>✓</b><p><small>Paso 1</small><strong>Formulario enviado</strong></p></div>
            <div className={styles.stepPending}><b>2</b><p><small>Paso final</small><strong>Entrar al grupo de WhatsApp</strong></p></div>
          </section>
          <div className={styles.action} style={{ order: 3 }}>
            <a href="https://chat.whatsapp.com/Jr9da8JwPXBIVf5Z3jumlG" target="_blank" rel="noopener noreferrer" data-reformas-whatsapp-group className={`${styles.whatsappButton} whatsapp-live-link`}><span className={styles.whatsappIcon} aria-hidden="true">◔</span>Entrar al grupo de WhatsApp<span aria-hidden="true">→</span></a>
            <p className={styles.pending}>Se abrirá WhatsApp. Toca “Unirme al grupo” para asegurar tu acceso.</p>
          </div>
          <p className={styles.notice} style={{ order: 5 }}><strong>Importante:</strong> esta es la única vía para recibir el enlace de la clase, recordatorios y avisos importantes.</p>
        </div>
        <aside className={`${styles.visual} mobile-gracias-visual`} aria-label="Mtro. Alfredo Cobos">
          <p>CAMBIOS<br />FISCALES</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/alfredo.png" alt="Mtro. Alfredo Cobos" className={styles.alfredo} />
          <div className={styles.instructor}><span>Tu instructor</span><strong>Mtro. Alfredo Cobos</strong></div>
        </aside>
      </section>
    </main>
  );
}
