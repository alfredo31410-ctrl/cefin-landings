"use client";

import { useEffect, useRef } from "react";

const FORM_ID = 394;
const FORM_CLASS = `_form_${FORM_ID}`;
const SCRIPT_ID = `activecampaign-reformas-form-${FORM_ID}`;

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
  }, []);

  return (
    <div className={className} ref={mountRef} />
  );
}
