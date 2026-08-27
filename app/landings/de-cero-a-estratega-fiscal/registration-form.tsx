"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { landingConfig as config } from "./config";

declare global {
  interface Window {
    _form_callback?: (id: string) => void;
  }
}

export default function RegistrationForm() {
  const registrationTrackedRef = useRef(false);

  useEffect(() => {
    if (!config.activation.trackingEnabled) return;

    const previousCallback = window._form_callback;
    const handleActiveCampaignSuccess = (id: string) => {
      previousCallback?.(id);
      if (registrationTrackedRef.current) return;

      const form = document.getElementById(`_form_${id}_`);
      if (!form?.classList.contains(`_form_${config.activeCampaign.formId}`)) {
        return;
      }

      registrationTrackedRef.current = true;
      window.fbq?.("track", "CompleteRegistration");
    };

    window._form_callback = handleActiveCampaignSuccess;
    return () => {
      if (window._form_callback === handleActiveCampaignSuccess) {
        window._form_callback = previousCallback;
      }
    };
  }, []);

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
