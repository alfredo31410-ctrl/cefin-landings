export type ChallengeDay = {
  id: string;
  label: string;
  title: string;
  description: string;
  accent: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const landingConfig = {
  slug: "nomina",
  brand: "CEFIN",
  institutionalName: "Centro de Estudios Fiscales, Innovación y Negocios",
  eventType: "Reto gratuito en vivo · 3 días",
  title: "Deja de solo timbrar nóminas y aprende a revisarlas con criterio",
  challengeName: "De cero a especialista en nómina",
  promise:
    "Descubre cómo detectar errores que el sistema no siempre te muestra, revisar aspectos clave de ISR e IMSS y reconocer fallas en la integración salarial.",
  dates: "4, 5 y 6 de agosto de 2026",
  time: "11:00 a. m.",
  timezone: "Hora de Ciudad de México",
  platform: "En vivo por YouTube",
  ctaLabel: "RESERVAR MI LUGAR GRATIS",
  processCopy:
    "Paso 1 de 2. Guarda tus datos y después completa tu acceso en el grupo oficial de WhatsApp.",
  instructor: {
    name: "Mtro. Alfredo Cobos",
    specialty: "Contador público y maestro en impuestos",
    bio: "Contador público y maestro en impuestos, fundador de CEFIN, con amplia experiencia en asesoría fiscal y capacitación profesional.",
    image: "/academia-contabilidad/alfredo.png",
    imageAlt: "Mtro. Alfredo Cobos, instructor de CEFIN",
  },
  heroImage: "/alfredo.png",
  heroImageAlt: "Mtro. Alfredo Cobos, fundador de CEFIN",
  days: [
    {
      id: "day-1",
      label: "Día 1",
      title: "Una nómina timbrada también puede estar mal",
      description:
        "Identifica señales de error que pueden pasar inadvertidas aunque el comprobante ya haya sido timbrado.",
      accent: "#ef4444",
    },
    {
      id: "day-2",
      label: "Día 2",
      title: "El costo oculto de una mala integración salarial",
      description:
        "Reconoce cómo una integración incorrecta puede afectar cálculos y obligaciones relacionadas con la nómina.",
      accent: "#3b82f6",
    },
    {
      id: "day-3",
      label: "Día 3",
      title: "El mapa del especialista en nómina",
      description:
        "Conoce las áreas que debes revisar para pasar de ejecutar procesos a analizar y recomendar con mayor criterio.",
      accent: "#f59e0b",
    },
  ] satisfies ChallengeDay[],
  audience: [
    "Capturas o timbras nóminas, pero quieres comprender mejor lo que estás procesando.",
    "Trabajas en contabilidad, nómina o recursos humanos.",
    "Deseas detectar inconsistencias antes de que se conviertan en problemas.",
    "Quieres desarrollar una visión más analítica y menos operativa.",
  ],
  faq: [
    {
      question: "¿El reto es realmente gratuito?",
      answer: "El registro es gratuito.",
    },
    {
      question: "¿Las sesiones serán en vivo?",
      answer: "Las sesiones se realizarán en vivo.",
    },
    {
      question: "¿Dónde se transmitirá?",
      answer: "La transmisión será por YouTube.",
    },
    {
      question: "¿Necesito experiencia previa?",
      answer:
        "Está dirigido a personas relacionadas con contabilidad, nómina o recursos humanos.",
    },
    {
      question: "¿Cómo recibiré los accesos?",
      answer:
        "Después del registro se solicitará completar el acceso mediante el grupo oficial de WhatsApp.",
    },
  ] satisfies FaqItem[],
  activeCampaign: { enabled: false, embedCode: null },
  whatsapp: { enabled: false, groupUrl: null },
  tracking: { enabled: false, pixelId: null },
} as const;

export type LandingConfig = typeof landingConfig;
