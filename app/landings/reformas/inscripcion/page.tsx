import Link from "next/link";
import styles from "../reformas.module.css";

export default function ReformasInscripcionPage() {
  return <main className={styles.thanks}><p className={styles.kicker}>Próximamente</p><h1>Inscripción a <span>Cambios Fiscales.</span></h1><p>Esta página quedará lista para la oferta de venta directa y su checkout.</p><Link className={styles.cta} href="/landings/reformas">Regístrate gratis <span>→</span></Link></main>;
}
