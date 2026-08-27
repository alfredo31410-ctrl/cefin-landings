import Script from "next/script";
import { landingConfig as config } from "./config";

export default function RegistrationForm() {
  if (!config.activation.registrationEnabled || !config.activeCampaign.enabled) {
    return null;
  }

  return (
    <div id="registro" tabIndex={-1} className="scroll-mt-4 outline-none">
      <div
        className={`_form_${config.activeCampaign.formId}`}
        aria-label="Formulario oficial de registro de ActiveCampaign"
      />
      <Script
        src={config.activeCampaign.embedUrl}
        strategy="afterInteractive"
        charSet="utf-8"
      />
    </div>
  );
}
