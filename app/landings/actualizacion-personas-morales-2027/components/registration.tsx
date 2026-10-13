import { campaign } from "../config";
import styles from "../landing.module.css";
import { ActiveCampaignForm } from "./activecampaign-form";

export function RegistrationSection() {
  return (
    <section id={campaign.formAnchor} className="scroll-mt-4" aria-labelledby="registration-title">
      <div className={`${styles.registrationCard} rounded-[1.75rem] border border-white/45 bg-white p-6 text-[#102C3A] shadow-[0_28px_80px_rgba(3,18,25,0.38)] sm:p-7 lg:sticky lg:top-5`}>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0B8F82]">Registro gratuito</p>
        <h2 id="registration-title" className="mt-2 text-3xl font-black leading-tight tracking-[-0.035em] sm:text-4xl">
          ¡Asegura tu lugar gratis!
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#17495A]/75 sm:text-base">
          Completa tus datos y después únete al grupo de WhatsApp para recibir el acceso.
        </p>

        <div className="my-4 h-px bg-[#17495A]/10" />

        <ActiveCampaignForm />
      </div>
    </section>
  );
}
