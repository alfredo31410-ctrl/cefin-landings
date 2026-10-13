import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { campaign } from "../config";
import { CampaignPageTracking } from "../components/tracking";
import { WhatsappGroupLink } from "../components/whatsapp-group-link";
import styles from "../landing.module.css";

export const metadata: Metadata = {
  title: "Registro recibido | CEFIN",
  description: "Completa el último paso para recibir el acceso y los avisos de la clase gratuita.",
  robots: { index: false, follow: false },
};

export default function GraciasActualizacionPersonasMoralesPage() {
  return (
    <main className={`${styles.darkSection} relative min-h-screen overflow-hidden px-5 py-10 text-white sm:px-8 lg:py-16`}>
      <CampaignPageTracking page="thanks" />
      <div className={`${styles.gridOverlay} pointer-events-none absolute inset-0 opacity-50`} />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-center">
        <div>
          <Link href="/landings/actualizacion-personas-morales-2027" className={`${styles.focusRing} inline-flex rounded-lg text-2xl font-black tracking-[-0.04em]`}>
            CEFIN
          </Link>
          <p className="mt-10 inline-flex rounded-full border border-[#13B8A6]/35 bg-[#13B8A6]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#9FF6EC]">
            Paso final
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl">
            ¡Tu registro fue recibido!
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">
            Estás a un paso de recibir la información de acceso a la clase gratuita.
          </p>

          <div className="mt-9 rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(3,18,25,0.28)] backdrop-blur sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#71E5D8]">Paso final</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">Únete al grupo de WhatsApp</h2>
            <p className="mt-4 leading-relaxed text-white/68">
              Únete al grupo de WhatsApp para recibir el enlace de acceso, recordatorios y avisos importantes.
            </p>
            <WhatsappGroupLink />
            <p className="mt-3 text-center text-xs leading-relaxed text-white/55">
              El grupo se abrirá en una pestaña nueva.
            </p>
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-white/45">
            Abrir esta página directamente no confirma un registro ni activa el evento CompleteRegistration.
          </p>
        </div>

        <div className={`${styles.photoFrame} relative mx-auto hidden w-full max-w-md overflow-hidden rounded-[2rem] border border-white/15 px-5 pt-6 lg:block`}>
          <Image
            src={campaign.instructor.image}
            alt={campaign.instructor.imageAlt}
            width={639}
            height={628}
            sizes="34vw"
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </main>
  );
}
