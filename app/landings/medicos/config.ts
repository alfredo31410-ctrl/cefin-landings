export const medicosConfig = {
  slug: "medicos",
  eventName: "Asesor Fiscal de MÉDICOS",
  instructor: "Marisol Galván",
  date: "PENDIENTE DE VERIFICACIÓN",
  time: "PENDIENTE DE VERIFICACIÓN",
  timezone: "CDMX",
  modality: "En vivo · Online",
  free: true,
  formId: 275,
  assets: {
    portrait: "/medicos/Marisol-medicos.png",
    portraitTablet: "/medicos/Marisol-medicos-1024.png",
    portraitMobile: "/medicos/Marisol-medicos-720.png",
    background: "/medicos/Fondo-medicos.jpg",
  },
} as const;

export const MEDICOS_CONFIRMATION_COOKIE = "cefin_medicos_registration";
export const MEDICOS_REGISTRATION_TTL_SECONDS = 10 * 60;

export function getMedicosWhatsAppUrl() {
  return process.env.MEDICOS_WHATSAPP_URL ?? "";
}
