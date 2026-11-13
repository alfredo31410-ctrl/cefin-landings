"use client";

import { useEffect, useRef } from "react";

const FORM_ID = 394;
const FORM_CLASS = `_form_${FORM_ID}`;
const SCRIPT_ID = `activecampaign-reformas-form-${FORM_ID}`;
export const REFORMAS_FORM_SUBMITTED_KEY = "cefin:reformas:form-394-submitted";

export function ActiveCampaignForm({ className }: { className: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || initializedRef.current) return;

    // Mark synchronously before appending. This survives React Strict Mode's
    // development effect re-run and prevents ActiveCampaign from rendering copies.
    initializedRef.current = true;
    mount.innerHTML = `<div class="${FORM_CLASS}"></div>`;

    document.getElementById(SCRIPT_ID)?.remove();
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${FORM_ID}`;
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    const markSubmission = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || !form.closest(`.${FORM_CLASS}`)) return;
      try {
        window.sessionStorage.setItem(REFORMAS_FORM_SUBMITTED_KEY, "true");
      } catch {
        // The thank-you page simply won't emit a Lead if storage is blocked.
      }
    };

    mount.addEventListener("submit", markSubmission, true);
    return () => mount.removeEventListener("submit", markSubmission, true);
  }, []);

  return (
    <div className={className} ref={mountRef} />
  );
}
