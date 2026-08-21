import type { UtmParamName } from "@/lib/hotmart-utms";

const assetBase =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";

export const landingConfig = {
  slug: "despierta-tu-potencial-contable",
  title: "Despierta tu Potencial Contable",
  eventType: "Clase gratuita",
  date: "23 de junio",
  time: "11:00 AM",
  timezone: "CDMX",
  activeCampaign: {
    formId: 325,
    formClass: "_form_325",
    formSelector: "form._form_325",
    embedUrl: "https://cefincapacitacion.activehosted.com/f/embed.php?id=325",
    attributionFieldIds: {
      utm_source: 7,
      utm_medium: 8,
      utm_campaign: 9,
      utm_content: 10,
      // El formulario 325 no publica IDs para los siguientes parámetros.
      utm_term: null,
      fbclid: null,
      campaign_id: null,
      adset_id: null,
      ad_id: null,
      placement: null,
      landing: null,
      producto: null,
    } satisfies Record<UtmParamName, number | null>,
  },
  thankYou: {
    path: "/landings/despierta-tu-potencial-contable/gracias",
    whatsappRedirectPath:
      "/landings/despierta-tu-potencial-contable/unirse-whatsapp",
    whatsappGroupUrl: "https://chat.whatsapp.com/HaQoyKQgnRjJKTdL2zdIqP",
  },
  checkout: {
    price: 4787,
    url: "https://pay.hotmart.com/L106443767M?off=kmo127nh&checkoutMode=10&bid=1782760909751",
  },
  assets: {
    marisol: `${assetBase}/despierta-tu-potencial-contable/marisol-despierta-tu-potencial-contable.png`,
    banner: `${assetBase}/despierta-tu-potencial-contable/banner-despierta-tu-potencial-contable.png`,
  },
} as const;

export const campaignEvent = {
  content_name: landingConfig.title,
  content_category: landingConfig.eventType,
  event_date_label: landingConfig.date,
  event_time: `${landingConfig.time} ${landingConfig.timezone}`,
} as const;
