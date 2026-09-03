export type DirectSaleConfig = {
  isDemo: boolean;
  product: {
    eyebrow: string;
    name: string;
    headline: string;
    promise: string;
    format: string;
    access: string;
    level: string;
  };
  pricing: {
    currency: "MXN";
    regularPrice: number;
    salePrice: number;
    installments: string;
    taxNote: string;
  };
  checkout: {
    enabled: boolean;
    url: string;
    buttonLabel: string;
    demoLabel: string;
  };
  highlights: readonly string[];
  modules: readonly {
    number: string;
    title: string;
    description: string;
  }[];
  bonuses: readonly {
    label: string;
    title: string;
    description: string;
    value: number;
  }[];
  audience: readonly string[];
  outcomes: readonly string[];
  testimonials: readonly {
    quote: string;
    name: string;
    role: string;
  }[];
  instructor: {
    name: string;
    role: string;
    bio: string;
    image: string;
    imageAlt: string;
  };
  guarantee: {
    days: number;
    title: string;
    description: string;
  };
  faq: readonly {
    question: string;
    answer: string;
  }[];
  legal: {
    privacyUrl: string;
    termsUrl: string;
  };
};

/**
 * CONTENIDO EDITABLE DE LA LANDING DE VENTA DIRECTA
 *
 * Todos los datos comerciales viven aquí para que la versión final se pueda
 * activar sin tocar la estructura ni los estilos de la página.
 */
export const directSaleConfig: DirectSaleConfig = {
  isDemo: true,
  product: {
    eyebrow: "Programa práctico para profesionales contables",
    name: "Estratega Fiscal",
    headline: "Deja de limitarte al cumplimiento y conviértete en el asesor que tus clientes necesitan.",
    promise:
      "Una ruta práctica para analizar casos, detectar oportunidades y convertir tu conocimiento fiscal en un servicio profesional de mayor valor.",
    format: "Programa 100% en línea",
    access: "Acceso por 12 meses",
    level: "De fundamentos a aplicación",
  },
  pricing: {
    currency: "MXN",
    regularPrice: 6990,
    salePrice: 3490,
    installments: "o 3 pagos mensuales de $1,297 MXN",
    taxNote: "Precio de demostración. Impuestos incluidos.",
  },
  checkout: {
    enabled: false,
    url: "",
    buttonLabel: "Quiero convertirme en estratega fiscal",
    demoLabel: "Compra disponible próximamente",
  },
  highlights: [
    "Método paso a paso",
    "Casos prácticos",
    "Recursos descargables",
    "Acceso inmediato",
  ],
  modules: [
    {
      number: "01",
      title: "Mentalidad de asesor",
      description:
        "La transición del trabajo operativo hacia una visión estratégica enfocada en decisiones y resultados.",
    },
    {
      number: "02",
      title: "Diagnóstico fiscal",
      description:
        "Un sistema para ordenar información, detectar riesgos y reconocer oportunidades relevantes para cada cliente.",
    },
    {
      number: "03",
      title: "Diseño de estrategias",
      description:
        "Criterios y procesos para convertir hallazgos técnicos en recomendaciones claras y accionables.",
    },
    {
      number: "04",
      title: "Presentación al cliente",
      description:
        "Cómo comunicar valor, entregar propuestas profesionales y sostener conversaciones de mayor nivel.",
    },
    {
      number: "05",
      title: "Modelo de servicio",
      description:
        "Una estructura inicial para delimitar, presentar y cobrar un servicio de asesoría fiscal.",
    },
    {
      number: "06",
      title: "Plan de implementación",
      description:
        "Una hoja de ruta para llevar lo aprendido a tu práctica profesional desde la primera semana.",
    },
  ],
  bonuses: [
    {
      label: "Bono 01",
      title: "Plantilla de diagnóstico fiscal",
      description: "Un formato editable para documentar hallazgos y oportunidades con orden.",
      value: 790,
    },
    {
      label: "Bono 02",
      title: "Guion para presentar tu asesoría",
      description: "Una estructura de conversación para explicar tu propuesta con mayor claridad.",
      value: 590,
    },
    {
      label: "Bono 03",
      title: "Modelo de propuesta profesional",
      description: "Documento base para definir alcance, entregables y condiciones del servicio.",
      value: 990,
    },
  ],
  audience: [
    "Eres contador y quieres ofrecer algo más valioso que el cumplimiento mensual.",
    "Ya tienes clientes, pero todavía no estructuras ni cobras la asesoría por separado.",
    "Quieres desarrollar criterio para comunicar recomendaciones con seguridad.",
    "Buscas una ruta práctica para mejorar tu perfil y tus oportunidades profesionales.",
  ],
  outcomes: [
    "Analizar la situación de un cliente con una visión más estratégica.",
    "Identificar riesgos y oportunidades que otros pasan por alto.",
    "Convertir observaciones técnicas en recomendaciones comprensibles.",
    "Estructurar una propuesta de asesoría con alcance y entregables claros.",
    "Comunicar y cobrar tu trabajo con mayor seguridad profesional.",
  ],
  testimonials: [
    {
      quote:
        "La metodología me ayudó a ordenar lo que ya sabía y presentarlo como un servicio mucho más profesional.",
      name: "Nombre del alumno",
      role: "Contador independiente",
    },
    {
      quote:
        "Ahora puedo detectar oportunidades y explicarlas a mis clientes sin quedarme solamente en la parte operativa.",
      name: "Nombre del alumno",
      role: "Titular de despacho",
    },
    {
      quote:
        "Recuperé la inversión con mi primera propuesta de asesoría. La estructura hizo toda la diferencia.",
      name: "Nombre del alumno",
      role: "Asesor fiscal",
    },
  ],
  instructor: {
    name: "Alfredo Cobos",
    role: "Contador público, maestro en impuestos y fundador de CEFIN",
    bio: "Ha dedicado su trayectoria a la práctica fiscal y a la formación de profesionales contables. En este programa comparte un método claro para transformar conocimiento técnico en una asesoría que genere valor real para el cliente.",
    image: "/academia-contabilidad/alfredo.png",
    imageAlt: "Alfredo Cobos, fundador de CEFIN",
  },
  guarantee: {
    days: 7,
    title: "Pruébalo con tranquilidad",
    description:
      "Tendrás 7 días naturales para revisar el programa. Si concluyes que no es para ti, podrás solicitar la devolución de tu inversión conforme a los términos aplicables.",
  },
  faq: [
    {
      question: "¿Necesito experiencia en asesoría fiscal?",
      answer:
        "No. El programa está planteado para construir la metodología desde sus fundamentos y avanzar hacia su aplicación profesional.",
    },
    {
      question: "¿Cuándo puedo comenzar?",
      answer:
        "Una vez confirmado el pago recibirás las instrucciones de acceso. En la versión final aquí se indicará el tiempo exacto de entrega.",
    },
    {
      question: "¿Durante cuánto tiempo tendré acceso?",
      answer:
        "La propuesta de muestra contempla 12 meses de acceso. Este dato podrá ajustarse cuando se definan las condiciones reales.",
    },
    {
      question: "¿Entregan constancia?",
      answer:
        "Este beneficio está pendiente de confirmación y se actualizará antes de habilitar la venta.",
    },
    {
      question: "¿Cómo funcionan los pagos?",
      answer:
        "La pasarela, los métodos de pago y las mensualidades se conectarán cuando exista una oferta comercial definitiva.",
    },
  ],
  legal: {
    privacyUrl: "https://cefin.mx/privacidad",
    termsUrl: "",
  },
};

