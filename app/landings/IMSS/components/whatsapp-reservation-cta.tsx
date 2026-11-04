"use client";

import { trackMetaCustomEventImmediate } from "@/lib/meta-pixel";
import { imssCampaign } from "../config";
import { readImssAttribution } from "../registration-adapter";
import styles from "../thanks.module.css";

type WhatsAppReservationCtaProps = {
  href: string | null;
};

export function WhatsAppReservationCta({ href }: WhatsAppReservationCtaProps) {
  if (!href) {
    return (
      <button className={styles.pendingCta} type="button" disabled>
        <strong>Enlace del grupo pendiente</strong>
        <span>Agrega el enlace de WhatsApp para activar este último paso.</span>
      </button>
    );
  }

  const trackWhatsAppIntent = () => {
    trackMetaCustomEventImmediate(imssCampaign.tracking.joinIntentEvent, {
      content_name: `${imssCampaign.tracking.contentName} | Grupo de WhatsApp`,
      content_category: "Grupo de WhatsApp",
      landing_slug: imssCampaign.slug,
      destination: "whatsapp_group",
      status: "clicked",
      ...readImssAttribution(),
    });
  };

  return (
    <a
      className={styles.whatsappCta}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppIntent}
    >
      <span>Entrar al grupo y reservar mi lugar</span>
      <b aria-hidden="true">↗</b>
    </a>
  );
}
