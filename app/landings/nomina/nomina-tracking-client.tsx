"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { createNominaRegistrationAttempt } from "@/lib/nomina-tracking-session";

export function NominaFormSubmitTracker({ formRef }: { formRef: RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const formRoot = formRef.current;
    if (!formRoot) return;

    const boundForms = new Map<HTMLFormElement, EventListener>();
    const bindForm = () => {
      const form = formRoot.querySelector("form");
      if (!form || boundForms.has(form)) return;

      const handleSubmit = () => {
        // Heurística: este comprobante demuestra submit + redirección a gracias,
        // pero no sustituye una confirmación server-to-server de ActiveCampaign.
        createNominaRegistrationAttempt();
      };

      form.addEventListener("submit", handleSubmit);
      boundForms.set(form, handleSubmit);
    };

    const observer = new MutationObserver(bindForm);
    observer.observe(formRoot, { childList: true, subtree: true });
    bindForm();

    return () => {
      observer.disconnect();
      boundForms.forEach((handler, form) => form.removeEventListener("submit", handler));
    };
  }, [formRef]);

  return null;
}
