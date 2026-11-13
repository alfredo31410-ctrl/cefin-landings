import Image from "next/image";
import alfredo from "@/public/alfredo/DSC_5172-sin-fondo.webp";
import styles from "./gracias.module.css";

export const metadata = {
  title: "Último paso | Cambios Fiscales | CEFIN",
  robots: { index: false, follow: false },
};

export default function ReformasGraciasPage() {
  return (
    <main className={styles.page}>
      <div className={styles.orbit} aria-hidden="true" />
      <header className={styles.header}>
        <a href="/landings/reformas" className={styles.logo}>CEFIN<span>®</span></a>
        <span>Clase gratuita · En vivo</span>
      </header>
      <section className={styles.shell}>
        <div className={styles.content}>
          <p className={styles.kicker}><i /> Registro recibido · Falta un paso</p>
          <h1>Tu acceso aún <em>no está completo.</em></h1>
          <p className={styles.lead}>Tus datos ya fueron registrados para la clase gratuita <strong>Cambios Fiscales</strong>. Para asegurar que recibas el acceso y los avisos, todavía debes entrar al grupo oficial de WhatsApp.</p>
          <div className={styles.event}>
            <div><small>Fecha</small><b>24 de noviembre</b></div>
            <div><small>Horario</small><b>10:00 AM · CDMX</b></div>
            <div><small>Modalidad</small><b>En vivo · En línea</b></div>
          </div>
          <section className={styles.steps} aria-label="Progreso del registro">
            <div className={styles.progress}><span /></div>
            <div className={styles.stepDone}><b>✓</b><p><small>Paso 1</small><strong>Formulario enviado</strong></p></div>
            <div className={styles.stepPending}><b>2</b><p><small>Paso final</small><strong>Entrar al grupo de WhatsApp</strong></p></div>
          </section>
          <div className={styles.action}>
            <button type="button" disabled className={styles.whatsappButton}><span className={styles.whatsappIcon} aria-hidden="true">◔</span>Entrar al grupo de WhatsApp<span aria-hidden="true">→</span></button>
            <p className={styles.pending}>El enlace al grupo de WhatsApp está pendiente de configuración.</p>
          </div>
          <p className={styles.notice}><strong>Importante:</strong> esta es la única vía para recibir el enlace de la clase, recordatorios y avisos importantes.</p>
        </div>
        <aside className={styles.visual} aria-label="Mtro. Alfredo Cobos">
          <p>CAMBIOS<br />FISCALES</p>
          <Image src={alfredo} alt="Mtro. Alfredo Cobos" priority className={styles.alfredo} />
          <div className={styles.instructor}><span>Tu instructor</span><strong>Mtro. Alfredo Cobos</strong></div>
        </aside>
      </section>
    </main>
  );
}
