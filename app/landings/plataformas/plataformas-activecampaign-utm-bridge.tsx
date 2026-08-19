"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

const ATTRIBUTION_STORAGE_KEY = "cefinHotmartUtmParams";
const PLATFORM_ATTRIBUTION_STORAGE_KEY = "cefinPlataformasUtmParams";
const FORM_SELECTOR = "form._form_323";
const FORM_INJECTION_TIMEOUT_MS = 10_000;

const UTM_FIELDS = [
  { name: "utm_source", fieldId: 7 },
  { name: "utm_medium", fieldId: 8 },
  { name: "utm_campaign", fieldId: 9 },
  { name: "utm_content", fieldId: 10 },
] as const;

type UtmName = (typeof UTM_FIELDS)[number]["name"];
type UtmValues = Partial<Record<UtmName, string>>;

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readUrlUtms(search: string): UtmValues {
  const params = new URLSearchParams(search);
  const values: UtmValues = {};

  UTM_FIELDS.forEach(({ name }) => {
    const value = normalizeValue(params.get(name));
    if (value) values[name] = value;
  });

  return values;
}

function readSessionUtms(key: string): UtmValues {
  try {
    const serialized = window.sessionStorage.getItem(key);
    if (!serialized) return {};

    const parsed = JSON.parse(serialized) as Record<string, unknown>;
    const values: UtmValues = {};

    UTM_FIELDS.forEach(({ name }) => {
      const value = normalizeValue(parsed[name]);
      if (value) values[name] = value;
    });

    return values;
  } catch {
    return {};
  }
}

function mergeUtmValues(...sources: UtmValues[]) {
  return Object.fromEntries(
    UTM_FIELDS.map(({ name }) => [
      name,
      sources.find((source) => source[name])?.[name] || "",
    ]),
  ) as Record<UtmName, string>;
}

function savePlatformSessionUtms(values: UtmValues) {
  if (!Object.values(values).some(Boolean)) return;

  try {
    window.sessionStorage.setItem(
      PLATFORM_ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(values),
    );
  } catch {
    // Attribution must never interrupt the landing or the registration form.
  }
}

export function PlataformasAttributionSession() {
  useEffect(() => {
    const urlValues = readUrlUtms(window.location.search);
    const platformValues = readSessionUtms(PLATFORM_ATTRIBUTION_STORAGE_KEY);
    const sharedValues = readSessionUtms(ATTRIBUTION_STORAGE_KEY);

    // Per-field priority: current URL, then this landing's session snapshot,
    // then the pre-existing shared session attribution.
    savePlatformSessionUtms(
      mergeUtmValues(urlValues, platformValues, sharedValues),
    );
  }, []);

  return null;
}

export function PlataformasActiveCampaignUtmBridge({
  formRef,
}: {
  formRef: RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const formRoot = formRef.current;
    if (!formRoot) return;

    const urlValues = readUrlUtms(window.location.search);
    const persistedValues = mergeUtmValues(
      readSessionUtms(PLATFORM_ATTRIBUTION_STORAGE_KEY),
      readSessionUtms(ATTRIBUTION_STORAGE_KEY),
    );
    const finalValues = mergeUtmValues(urlValues, persistedValues);

    let observer: MutationObserver | null = null;
    let timeoutId: number | undefined;

    const syncFields = () => {
      const form = formRoot.querySelector<HTMLFormElement>(FORM_SELECTOR);
      if (!form) return false;

      let allInputsFound = true;

      UTM_FIELDS.forEach(({ name, fieldId }) => {
        const input = form.querySelector<HTMLInputElement>(
          `input[name="field[${fieldId}]"]`,
        );
        const finalValue = finalValues[name];

        if (!input) {
          allInputsFound = false;
        } else if (finalValue && input.value !== finalValue) {
          // ActiveCampaign serializes the current value of form.elements at
          // submit time, so no listener replacement or synthetic event is needed.
          input.value = finalValue;
        }
      });

      return allInputsFound;
    };

    const stopWatching = () => {
      observer?.disconnect();
      observer = null;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };

    if (!syncFields()) {
      observer = new MutationObserver(() => {
        if (syncFields()) stopWatching();
      });
      observer.observe(formRoot, { childList: true, subtree: true });
      timeoutId = window.setTimeout(stopWatching, FORM_INJECTION_TIMEOUT_MS);
    }

    return stopWatching;
  }, [formRef]);

  return null;
}
