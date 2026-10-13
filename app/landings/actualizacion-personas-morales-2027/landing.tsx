import { HeroSection } from "./components/hero";
import { BenefitsSection } from "./components/insights";
import { RegistrationSection } from "./components/registration";
import { CampaignPageTracking } from "./components/tracking";
import { campaign } from "./config";
import styles from "./landing.module.css";

export default function ActualizacionPersonasMoralesLanding() {
  return (
    <main className={`${styles.page} ${styles.heroBackdrop} min-h-screen overflow-x-hidden text-white`}>
      <CampaignPageTracking page="landing" trackViewContent />
      <div className={`${styles.gridOverlay} pointer-events-none fixed inset-0 opacity-60`} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 py-3 sm:py-4">
          <span className="text-2xl font-black tracking-[-0.05em]">CEFIN</span>
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55 sm:text-xs">
            Clase en vivo · 2026
          </span>
        </header>

        <div className="grid gap-7 py-4 sm:py-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.72fr)] lg:items-start lg:gap-12 lg:py-6">
          <div className="min-w-0">
            <HeroSection />
            <BenefitsSection />
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-white/50">
              La sesión distinguirá las disposiciones vigentes de las propuestas y escenarios que aún pueden modificarse.
            </p>
          </div>

          <RegistrationSection />
        </div>

        <footer className="border-t border-white/10 py-4 text-center text-[11px] leading-relaxed text-white/45 sm:text-left">
          CEFIN · Uso de datos exclusivamente para gestionar el acceso y los avisos de esta clase. {" "}
          <a
            href={campaign.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
            className="rounded-sm underline decoration-white/35 underline-offset-2 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71E5D8]"
          >
            Aviso de privacidad
          </a>
          .
        </footer>
      </div>
    </main>
  );
}
