"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { campaign } from "../config";

const ATTRIBUTION_STORAGE_KEY = "actualizacionPersonasMorales2027Attribution";
const REGISTRATION_STORAGE_KEY = "actualizacionPersonasMorales2027Registration";
const REGISTRATION_ATTEMPT_STORAGE_KEY = "actualizacionPersonasMorales2027RegistrationAttempt";
const JOIN_GROUP_STORAGE_KEY = "actualizacionPersonasMorales2027JoinGroup";
const REGISTRATION_ATTEMPT_TTL_MS = 10 * 60 * 1000;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const trackedPageLoads = new Set<string>();
let joinGroupTracked = false;

type CampaignPageTrackingProps = {
  page: "landing" | "thanks";
  trackViewContent?: boolean;
};

type ConfirmedRegistration = {
  registrationId: string;
};

type RegistrationAttempt = ConfirmedRegistration & {
  createdAt: number;
};

function preserveAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const current = Object.fromEntries(
      UTM_KEYS.flatMap((key) => {
        const value = params.get(key);
        return value ? [[key, value]] : [];
      }),
    );

    if (Object.keys(current).length > 0) {
      window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(current));
    }
  } catch {
    // La navegación continúa aunque el almacenamiento no esté disponible.
  }
}

export function getPreservedAttribution(): Record<string, string> {
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function createRegistrationId() {
  if (typeof crypto.randomUUID === "function") {
    return `ac-${campaign.activeCampaign.formId}-${crypto.randomUUID()}`;
  }

  return `ac-${campaign.activeCampaign.formId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function preserveRegistrationAttempt() {
  const attempt: RegistrationAttempt = {
    registrationId: createRegistrationId(),
    createdAt: Date.now(),
  };

  try {
    window.sessionStorage.setItem(REGISTRATION_ATTEMPT_STORAGE_KEY, JSON.stringify(attempt));
  } catch {
    // ActiveCampaign puede continuar aunque el almacenamiento no esté disponible.
  }

  return attempt;
}

export function consumeRegistrationAttempt(): RegistrationAttempt | null {
  try {
    const stored = window.sessionStorage.getItem(REGISTRATION_ATTEMPT_STORAGE_KEY);
    window.sessionStorage.removeItem(REGISTRATION_ATTEMPT_STORAGE_KEY);
    if (!stored) return null;

    const attempt = JSON.parse(stored) as Partial<RegistrationAttempt>;
    const isValid =
      typeof attempt.registrationId === "string" &&
      attempt.registrationId.length > 0 &&
      typeof attempt.createdAt === "number" &&
      Date.now() - attempt.createdAt >= 0 &&
      Date.now() - attempt.createdAt <= REGISTRATION_ATTEMPT_TTL_MS;

    return isValid ? (attempt as RegistrationAttempt) : null;
  } catch {
    return null;
  }
}

export function trackConfirmedRegistration({ registrationId }: ConfirmedRegistration) {
  if (!registrationId) return false;

  try {
    const previousId = window.sessionStorage.getItem(REGISTRATION_STORAGE_KEY);
    if (previousId === registrationId) return true;
    window.sessionStorage.setItem(REGISTRATION_STORAGE_KEY, registrationId);
  } catch {
    // La confirmación del registro no depende del almacenamiento del navegador.
  }

  trackMetaEvent(
    "CompleteRegistration",
    {
      content_name: campaign.tracking.contentName,
      content_category: campaign.tracking.contentCategory,
      status: "confirmed",
      value: 0,
      currency: "MXN",
      ...getPreservedAttribution(),
    },
    { eventID: registrationId },
  );
  return true;
}

export function trackConfirmedJoinGroup() {
  if (!campaign.whatsapp.groupUrl) return false;
  if (joinGroupTracked) return true;

  try {
    if (window.sessionStorage.getItem(JOIN_GROUP_STORAGE_KEY) === "tracked") {
      joinGroupTracked = true;
      return true;
    }
    window.sessionStorage.setItem(JOIN_GROUP_STORAGE_KEY, "tracked");
  } catch {
    // El acceso al grupo no depende del almacenamiento del navegador.
  }

  joinGroupTracked = true;
  try {
    trackMetaCustomEvent("JoinGroup", {
      content_name: campaign.tracking.contentName,
      ...getPreservedAttribution(),
    });
  } catch {
    // El enlace debe funcionar incluso si Meta Pixel no está disponible.
  }
  return true;
}

export function CampaignPageTracking({ page, trackViewContent = false }: CampaignPageTrackingProps) {
  useEffect(() => {
    preserveAttribution();

    const loadKey = `${page}:${window.location.pathname}:${window.location.search}`;
    if (trackedPageLoads.has(loadKey)) return;
    trackedPageLoads.add(loadKey);

    trackMetaEvent("PageView");
    if (trackViewContent) {
      trackMetaEvent("ViewContent", {
        content_name: campaign.tracking.contentName,
        content_category: campaign.tracking.contentCategory,
        ...getPreservedAttribution(),
      });
    }

    if (page === "thanks") {
      const registrationAttempt = consumeRegistrationAttempt();
      if (registrationAttempt) trackConfirmedRegistration(registrationAttempt);
    }
  }, [page, trackViewContent]);

  return (
    <>
      <Script
        id={`meta-pixel-${campaign.slug}-${page}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(undefined, { trackPageView: false }),
        }}
      />
      <noscript>
        {/* El fallback del píxel debe ser un img HTML de 1×1 sin optimización. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getMetaPixelNoscriptUrl()}
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
        />
      </noscript>
    </>
  );
}
