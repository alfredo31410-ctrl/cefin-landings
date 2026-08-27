import type { UtmParamName } from "@/lib/hotmart-utms";

type CampaignConfig = {
  campaignName: string;
  slug: string;
  title: string;
  promise: string;
  description: string;
  eventType: string;
  modality: string;
  date: {
    iso: string;
    startsAt: string;
    visible: string;
    time: string;
    timeZone: "America/Mexico_City";
    timeZoneLabel: "CDMX";
  };
  instructor: {
    name: string;
    bio: string;
    image: string;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
  };
  problem: { title: string; description: string };
  learnings: readonly { title: string; description: string }[];
  audiences: readonly { title: string; description: string }[];
  faq: readonly {
    id: "cost" | "date" | "access" | "live";
    question: string;
  }[];
  cta: string;
  activation: {
    registrationEnabled: boolean;
    trackingEnabled: boolean;
  };
  routes: {
    root: string;
    thankYou: string;
    registrationApi: string;
    completionApi: string;
  };
  activeCampaign: {
    enabled: boolean;
    endpoint: string | null;
    formId: number | null;
    formUser: string | null;
    formOrigin: string | null;
    attributionFieldIds: Record<UtmParamName, number | null>;
  };
  conversionEvent: {
    name: "CompleteRegistration";
    contentName: string;
    contentCategory: string;
    landingSlug: string;
  };
  privacy: { url: string | null };
  access: {
    channels: readonly ["correo", "WhatsApp"];
    message: string;
    whatsappGroupUrl: string | null;
  };
};

/**
 * Configuración operativa pública y versionable. El secreto de firma
 * ESTRATEGA_FISCAL_REGISTRATION_SECRET vive únicamente en el entorno del servidor.
 */
export const landingConfig: CampaignConfig = {
  campaignName: "De cero a estratega fiscal",
  slug: "de-cero-a-estratega-fiscal",
  title: "De cero a estratega fiscal: el paso a paso",
  promise:
    "Descubre cómo transformar tus conocimientos contables en un servicio de asesoría fiscal que puedas ofrecer profesionalmente y convertir en una nueva fuente de ingresos.",
  description:
    "Clase gratuita en vivo para contadores que quieren transformar sus conocimientos contables en un servicio profesional de asesoría fiscal.",
  eventType: "Clase gratuita",
  modality: "Transmisión en vivo",
  date: {
    iso: "2026-09-04",
    startsAt: "2026-09-04T11:00:00-06:00",
    visible: "Viernes 4 de septiembre de 2026",
    time: "11:00 a. m.",
    timeZone: "America/Mexico_City",
    timeZoneLabel: "CDMX",
  },
  instructor: {
    name: "Alfredo Cobos",
    bio: "Contador público y maestro en impuestos, fundador de CEFIN, con amplia experiencia en asesoría fiscal y capacitación profesional.",
    image:
      "https://cefin-landings-z9uk.vercel.app/academia-contabilidad/alfredo.png",
    imageAlt: "Alfredo Cobos, instructor de CEFIN",
    imageWidth: 518,
    imageHeight: 590,
  },
  problem: {
    title: "Saber hacer tareas contables no siempre basta para asesorar.",
    description:
      "La asesoría fiscal exige detectar necesidades, ordenar hallazgos, presentar recomendaciones con claridad y convertir ese criterio en un servicio profesional.",
  },
  learnings: [
    {
      title: "Pasar de lo operativo a lo estratégico",
      description:
        "Reconoce cómo ampliar tu mirada más allá del cumplimiento y la captura de información.",
    },
    {
      title: "Detectar oportunidades de asesoría",
      description:
        "Identifica necesidades que pueden convertirse en recomendaciones fiscales de mayor valor para un cliente.",
    },
    {
      title: "Estructurar un servicio profesional",
      description:
        "Conoce una ruta para presentar, delimitar y cobrar una asesoría con mayor claridad.",
    },
  ],
  audiences: [
    {
      title: "Auxiliares y contadores empleados",
      description:
        "Para quienes quieren desarrollar una visión más analítica y ampliar su perfil profesional.",
    },
    {
      title: "Contadores independientes",
      description:
        "Para quienes todavía no han estructurado un servicio de asesoría fiscal.",
    },
    {
      title: "Estudiantes y recién egresados",
      description:
        "Para quienes quieren comprender cómo se transforma el conocimiento técnico en un servicio.",
    },
    {
      title: "Despachos contables",
      description:
        "Para equipos que buscan presentar sus recomendaciones con mayor orden y enfoque.",
    },
  ],
  faq: [
    { id: "cost", question: "¿La clase tiene costo?" },
    { id: "date", question: "¿Cuándo será?" },
    { id: "access", question: "¿Dónde recibiré el acceso?" },
    { id: "live", question: "¿Será en vivo?" },
  ],
  cta: "Reservar mi acceso gratuito",
  activation: {
    registrationEnabled: true,
    trackingEnabled: true,
  },
  routes: {
    root: "/landings/de-cero-a-estratega-fiscal",
    thankYou: "/landings/de-cero-a-estratega-fiscal/gracias",
    registrationApi:
      "/landings/de-cero-a-estratega-fiscal/api/registro",
    completionApi:
      "/landings/de-cero-a-estratega-fiscal/api/registro/completar",
  },
  activeCampaign: {
    enabled: true,
    // ActiveCampaign requiere este modo de respuesta para confirmar el alta.
    // La solicitud sigue siendo POST servidor-a-servidor y no coloca PII en la URL.
    endpoint:
      "https://cefincapacitacion.activehosted.com/proc.php?jsonp=true",
    formId: 333,
    formUser: "6A906CD653B29",
    formOrigin: "2ecd4dc9-db41-4469-8ed8-27da740cfc32",
    attributionFieldIds: {
      utm_source: 7,
      utm_medium: 8,
      utm_campaign: 9,
      utm_content: 10,
      utm_term: 11,
      fbclid: null,
      campaign_id: null,
      adset_id: null,
      ad_id: null,
      placement: null,
      landing: null,
      producto: null,
    },
  },
  conversionEvent: {
    name: "CompleteRegistration",
    contentName: "De cero a estratega fiscal: el paso a paso",
    contentCategory: "Clase gratuita",
    landingSlug: "de-cero-a-estratega-fiscal",
  },
  privacy: { url: "https://cefin.mx/privacidad" },
  access: {
    channels: ["correo", "WhatsApp"],
    message:
      "Enviaremos el acceso y los recordatorios al correo y al WhatsApp que registres.",
    whatsappGroupUrl:
      "https://chat.whatsapp.com/Kw4t4V7USSh1SzxRrtJAD4",
  },
};
