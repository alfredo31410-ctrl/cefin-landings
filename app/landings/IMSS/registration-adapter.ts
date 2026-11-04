"use client";

import { trackMetaEvent } from "@/lib/meta-pixel";
import { imssCampaign, imssUtmKeys } from "./config";

type ImssAttribution = Partial<
  Record<(typeof imssUtmKeys)[number], string>
>;

const PENDING_CONFIRMATION_KEY =
  "cefin:imss-actualizacion-total:pending-confirmation";
const PENDING_CONFIRMATION_TTL_MS = 30 * 60 * 1000;

export function readImssAttribution(): ImssAttribution {
  const params = new URLSearchParams(window.location.search);

  return Object.fromEntries(
    imssUtmKeys.flatMap((key) => {
      const value = params.get(key)?.trim();
      return value ? [[key, value]] : [];
    }),
  ) as ImssAttribution;
}
function findInputByLabel(
  form: HTMLFormElement,
  labelPattern: RegExp,
): HTMLInputElement | null {
  const label = Array.from(form.querySelectorAll("label")).find((candidate) =>
    labelPattern.test(candidate.textContent ?? ""),
  );
  const fieldId = label?.htmlFor;

  if (fieldId) {
    const field = form.querySelector(`#${CSS.escape(fieldId)}`);
    if (field instanceof HTMLInputElement) return field;
  }

  const wrapper = label?.closest("._form_element");
  const field = wrapper?.querySelector("input");
  return field instanceof HTMLInputElement ? field : null;
}
function findPhoneField(form: HTMLFormElement) {
  const directMatch = form.querySelector(
    'input[name="phone"], input[type="tel"], input[autocomplete="tel"]',
  );

  if (directMatch instanceof HTMLInputElement) return directMatch;
  return findInputByLabel(form, /whats\s*app|tel[eé]fono|celular/i);
}
function preparePhoneField(field: HTMLInputElement) {
  field.inputMode = "tel";
  field.autocomplete = "tel";
}
function fillUtmFields(form: HTMLFormElement) {
  const attribution = readImssAttribution();

  for (const key of imssUtmKeys) {
    const value = attribution[key];
    if (!value) continue;

    const fieldId = imssCampaign.registration.utmFieldIds[key];
    const field =
      form.elements.namedItem(`field[${fieldId}]`) ??
      form.elements.namedItem(key);

    if (field instanceof HTMLInputElement && !field.value) {
      field.value = value;
    }
  }
}

export function prepareImssActiveCampaignForm(form: HTMLFormElement) {
  const firstNameField = form.querySelector(
    'input[name="firstname"], input[name="first_name"]',
  );
  const lastNameField = form.querySelector(
    'input[name="lastname"], input[name="last_name"]',
  );
  const emailField = form.querySelector('input[name="email"], input[type="email"]');
  const phoneField = findPhoneField(form);

  if (firstNameField instanceof HTMLInputElement) {
    firstNameField.autocomplete = "given-name";
  }
  if (lastNameField instanceof HTMLInputElement) {
    lastNameField.autocomplete = "family-name";
  }
  if (emailField instanceof HTMLInputElement) emailField.autocomplete = "email";
  if (phoneField) preparePhoneField(phoneField);

  fillUtmFields(form);
}

export function createImssConfirmationId() {
  const formId = imssCampaign.registration.activeCampaignFormId;

  if (typeof crypto.randomUUID === "function") {
    return `ac-${formId}-${crypto.randomUUID()}`;
  }

  return `ac-${formId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function persistImssRegistrationConfirmation(confirmationId: string) {
  if (!confirmationId) return false;

  try {
    window.sessionStorage.setItem(
      PENDING_CONFIRMATION_KEY,
      JSON.stringify({ id: confirmationId, createdAt: Date.now() }),
    );
    return true;
  } catch {
    return false;
  }
}

export function consumeImssRegistrationConfirmation() {
  try {
    const serialized = window.sessionStorage.getItem(PENDING_CONFIRMATION_KEY);
    window.sessionStorage.removeItem(PENDING_CONFIRMATION_KEY);
    if (!serialized) return null;

    const parsed = JSON.parse(serialized) as {
      id?: unknown;
      createdAt?: unknown;
    };
    const age = Date.now() - Number(parsed.createdAt);

    if (
      typeof parsed.id !== "string" ||
      !parsed.id ||
      !Number.isFinite(age) ||
      age < 0 ||
      age > PENDING_CONFIRMATION_TTL_MS
    ) {
      return null;
    }

    return parsed.id;
  } catch {
    return null;
  }
}

export function getImssThankYouUrl() {
  const path = imssCampaign.registration.thankYouPath;
  if (!path) return imssCampaign.publicPath;

  const url = new URL(path, window.location.origin);
  const attribution = readImssAttribution();

  for (const [key, value] of Object.entries(attribution)) {
    if (value) url.searchParams.set(key, value);
  }

  return `${url.pathname}${url.search}`;
}

export function trackConfirmedImssLead(confirmationId: string) {
  if (!confirmationId) return false;

  const storageKey = `cefin:${imssCampaign.slug}:confirmed-form-submission`;

  try {
    if (window.sessionStorage.getItem(storageKey) === confirmationId) return true;
    window.sessionStorage.setItem(storageKey, confirmationId);
  } catch {
    // La confirmación real no depende del almacenamiento del navegador.
  }

  trackMetaEvent(
    imssCampaign.tracking.formSubmissionEvent,
    {
      content_name: imssCampaign.tracking.contentName,
      content_category: imssCampaign.tracking.contentCategory,
      status: "form_confirmed",
      value: 0,
      currency: "MXN",
      ...readImssAttribution(),
    },
    { eventID: confirmationId },
  );

  return true;
}
