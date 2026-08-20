export const landingConfig = {
  slug: "plataformas",
  title: "Plataformas Tecnológicas",
  eventType: "Clase gratuita",
  date: "1 de septiembre de 2026",
  dateShort: "1 de septiembre",
  eventDate: "2026-09-01",
  time: "11:00 AM",
  timezone: "CDMX",
  dateTimeLabel: "1 de septiembre de 2026 a las 11:00 AM (hora CDMX)",
  compactDateTimeLabel:
    "1 de septiembre de 2026 · 11:00 AM (hora CDMX)",
  activeCampaign: {
    formId: 323,
    formClass: "_form_323",
    embedUrl: "https://cefincapacitacion.activehosted.com/f/embed.php?id=323",
  },
  thankYou: {
    path: "/landings/plataformas/gracias",
    whatsappRedirectPath: "/landings/plataformas/unirse-whatsapp",
    whatsappEnabled: true,
    whatsappGroupUrl: "https://chat.whatsapp.com/JeFabJpd1VyIPkWyAdVpDr",
  },
} as const;

export const webinarEvent = {
  content_name: landingConfig.title,
  content_category: landingConfig.eventType,
  event_date: landingConfig.eventDate,
  event_time: `${landingConfig.time} ${landingConfig.timezone}`,
} as const;
