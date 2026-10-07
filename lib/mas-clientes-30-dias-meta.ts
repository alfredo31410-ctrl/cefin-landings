import { MAS_CLIENTES_30_DIAS_CAMPAIGN } from "@/app/landings/mas-clientes-30-dias/campaign";
import { initializeMetaPixel, META_CURRENCY } from "@/lib/meta-pixel";
import {
  getMasClientes30DiasEventId,
  persistMasClientes30DiasRegistrationSession,
  type MasClientes30DiasRegistrationSession,
} from "@/lib/mas-clientes-30-dias-tracking";

type CompleteRegistrationSource =
  | "activecampaign_callback"
  | "thank_you_redirect";

export function trackMasClientes30DiasCompleteRegistration(
  session: MasClientes30DiasRegistrationSession,
  source: CompleteRegistrationSource,
) {
  if (session.completeRegistrationSent) return false;

  initializeMetaPixel();
  if (typeof window.fbq !== "function") return false;

  window.fbq(
    "track",
    "CompleteRegistration",
    {
      content_name: `${MAS_CLIENTES_30_DIAS_CAMPAIGN.contentName} | Registro completado`,
      content_category: "Clase gratuita",
      landing_slug: "mas-clientes-30-dias",
      event_date: MAS_CLIENTES_30_DIAS_CAMPAIGN.eventDate,
      event_time: `${MAS_CLIENTES_30_DIAS_CAMPAIGN.timeLabel} CDMX`,
      registration_source: source,
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    },
    {
      eventID: getMasClientes30DiasEventId(
        "complete-registration",
        session.id,
      ),
    },
  );

  session.completeRegistrationSent = true;
  persistMasClientes30DiasRegistrationSession(session);
  return true;
}
