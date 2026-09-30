import { CONTABILIDAD_ELECTRONICA_CAMPAIGN } from "@/app/landings/contabilidad-electronica/campaign";
import { initializeMetaPixel, META_CURRENCY } from "@/lib/meta-pixel";
import {
  getContabilidadElectronicaEventId,
  persistContabilidadElectronicaRegistrationSession,
  type ContabilidadElectronicaRegistrationSession,
} from "@/lib/contabilidad-electronica-tracking";

type CompleteRegistrationSource =
  | "activecampaign_callback"
  | "thank_you_redirect";

export function trackContabilidadElectronicaCompleteRegistration(
  session: ContabilidadElectronicaRegistrationSession,
  source: CompleteRegistrationSource,
) {
  if (session.completeRegistrationSent) return false;

  initializeMetaPixel();
  if (typeof window.fbq !== "function") return false;

  window.fbq(
    "track",
    "CompleteRegistration",
    {
      content_name: `${CONTABILIDAD_ELECTRONICA_CAMPAIGN.contentName} | Registro completado`,
      content_category: "Clase gratuita",
      landing_slug: "contabilidad-electronica",
      event_date: CONTABILIDAD_ELECTRONICA_CAMPAIGN.eventDate,
      event_time: `${CONTABILIDAD_ELECTRONICA_CAMPAIGN.timeLabel} CDMX`,
      registration_source: source,
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    },
    {
      eventID: getContabilidadElectronicaEventId(
        "complete-registration",
        session.id,
      ),
    },
  );

  session.completeRegistrationSent = true;
  persistContabilidadElectronicaRegistrationSession(session);
  return true;
}
