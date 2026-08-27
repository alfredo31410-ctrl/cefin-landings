"use client";

import { useState, type FormEvent } from "react";
import {
  HOTMART_ATTRIBUTION_PARAM_NAMES,
  getActiveUtmParams,
} from "@/lib/hotmart-utms";
import { landingConfig as config } from "./config";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "consent", string>
>;

const integrationReady = Boolean(
  config.activation.registrationEnabled &&
    config.activeCampaign.enabled &&
    config.activeCampaign.endpoint &&
    config.activeCampaign.formId &&
    config.activeCampaign.formUser &&
    config.activeCampaign.formOrigin &&
    config.privacy.url,
);

function validateForm(form: HTMLFormElement) {
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").replace(/\s+/g, " ").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const consent = formData.get("consent") === "on";
  const errors: FieldErrors = {};

  if (
    name.length < 3 ||
    name.length > 120 ||
    name.split(" ").filter(Boolean).length < 2
  ) {
    errors.name = "Escribe tu nombre completo.";
  }
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = "Escribe un correo electrónico válido.";
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (
    phone.length > 32 ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15 ||
    !/^[+\d().\-\s]+$/.test(phone)
  ) {
    errors.phone = "Escribe un número de WhatsApp válido.";
  }
  if (!consent) {
    errors.consent = "Necesitamos tu consentimiento para gestionar el registro.";
  }

  return { errors, values: { name, email, phone, consent } };
}

export default function RegistrationForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const { errors: nextErrors, values } = validateForm(form);
    setErrors(nextErrors);
    setStatusMessage("");

    if (Object.keys(nextErrors).length > 0) {
      window.requestAnimationFrame(() => {
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    if (!integrationReady) {
      setStatus("error");
      setStatusMessage(
        "El registro no está disponible en este momento. Intenta nuevamente más tarde.",
      );
      return;
    }

    setStatus("submitting");
    const attribution = getActiveUtmParams();
    const normalizedAttribution = Object.fromEntries(
      HOTMART_ATTRIBUTION_PARAM_NAMES.map((name) => [
        name,
        attribution[name] || "",
      ]),
    );

    try {
      const formData = new FormData(form);
      const response = await fetch(config.routes.registrationApi, {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(formData.get("website") || ""),
          ...normalizedAttribution,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        redirect?: string;
      };

      if (
        !response.ok ||
        !result.ok ||
        result.redirect !== config.routes.thankYou
      ) {
        throw new Error("registration-failed");
      }
      window.location.assign(config.routes.thankYou);
    } catch {
      setStatus("error");
      setStatusMessage(
        "No pudimos confirmar tu registro. Revisa tus datos e inténtalo nuevamente.",
      );
    }
  }

  const submitDisabled = !integrationReady || status === "submitting";
  const submitLabel = !integrationReady
    ? "Registro no disponible"
    : status === "submitting"
      ? "Confirmando registro…"
      : status === "error"
        ? "Reintentar registro"
        : config.cta;

  return (
    <div
      id="registro"
      tabIndex={-1}
      className="scroll-mt-4 rounded-[1.75rem] border border-[var(--ef-form-border)] bg-[var(--ef-form)] p-5 text-[var(--ef-charcoal)] shadow-[0_30px_90px_var(--ef-shadow)] sm:p-7"
    >
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ef-accessible-green)]">
        Registro gratuito
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
        Reserva tu acceso
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ef-muted)]">
        {config.access.message}
      </p>

      {!integrationReady && (
        <p
          className="mt-4 border-l-2 border-[var(--ef-form-border)] pl-3 text-sm leading-relaxed text-[var(--ef-muted)]"
          role="status"
        >
          El registro no está disponible en este momento. Intenta nuevamente
          más tarde.
        </p>
      )}

      <form className="mt-5 space-y-4" noValidate onSubmit={handleSubmit}>
        <div>
          <label
            className="text-sm font-bold text-[var(--ef-charcoal)]"
            htmlFor="name"
          >
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-1.5 min-h-12 w-full rounded-xl border border-[var(--ef-form-border)] bg-[var(--ef-field)] px-4 text-base text-[var(--ef-charcoal)] outline-none transition focus:border-[var(--ef-emerald)] focus:ring-4 focus:ring-[var(--ef-gold-soft)] aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-100"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm font-semibold text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-sm font-bold text-[var(--ef-charcoal)]"
            htmlFor="email"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-1.5 min-h-12 w-full rounded-xl border border-[var(--ef-form-border)] bg-[var(--ef-field)] px-4 text-base text-[var(--ef-charcoal)] outline-none transition focus:border-[var(--ef-emerald)] focus:ring-4 focus:ring-[var(--ef-gold-soft)] aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-100"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm font-semibold text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-sm font-bold text-[var(--ef-charcoal)]"
            htmlFor="phone"
          >
            WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={32}
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : "phone-help"}
            className="mt-1.5 min-h-12 w-full rounded-xl border border-[var(--ef-form-border)] bg-[var(--ef-field)] px-4 text-base text-[var(--ef-charcoal)] outline-none transition focus:border-[var(--ef-emerald)] focus:ring-4 focus:ring-[var(--ef-gold-soft)] aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-100"
          />
          <p id="phone-help" className="mt-1.5 text-xs text-[var(--ef-muted)]">
            Incluye lada y código de país cuando corresponda.
          </p>
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-sm font-semibold text-red-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div
          className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="website">No completes este campo</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ef-charcoal)]">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--ef-emerald)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ef-gold)]"
            />
            <p>
              <label className="cursor-pointer" htmlFor="consent">
                Acepto el uso de mis datos para gestionar este registro por
                correo y WhatsApp.
              </label>{" "}
              <a
                href={config.privacy.url!}
                target="_blank"
                rel="noreferrer"
                aria-label="Aviso de Privacidad (abre en una pestaña nueva)"
                className="font-semibold text-[var(--ef-accessible-green)] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ef-gold)]"
              >
                Aviso de Privacidad
              </a>
            </p>
          </div>
          {errors.consent && (
            <p id="consent-error" className="mt-1.5 text-sm font-semibold text-red-700">
              {errors.consent}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitDisabled}
          aria-busy={status === "submitting"}
          className="min-h-14 w-full rounded-xl bg-[var(--ef-emerald)] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[var(--ef-petroleum)] shadow-[0_16px_36px_var(--ef-cta-shadow)] transition hover:bg-[var(--ef-deep-green)] hover:text-[var(--ef-warm-white)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ef-gold)] disabled:cursor-not-allowed disabled:opacity-65 motion-reduce:transition-none"
        >
          {submitLabel}
        </button>

        {statusMessage && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
            role="alert"
          >
            {statusMessage}
          </p>
        )}
      </form>
    </div>
  );
}
