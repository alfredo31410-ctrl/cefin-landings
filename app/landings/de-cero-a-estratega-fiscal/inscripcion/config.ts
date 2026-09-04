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
    slogan: string;
  };
  pricing: {
    currency: "MXN";
    salePrice: number;
    taxNote: string;
  };
  checkout: {
    enabled: boolean;
    url: string;
    buttonLabel: string;
  };
  highlights: readonly string[];
  modules: readonly {
    day: string;
    action: string;
    title: string;
    description: string;
  }[];
  inclusions: readonly {
    title: string;
    description: string;
  }[];
  outcomes: readonly string[];
  instructor: {
    name: string;
    role: string;
    image: string;
    imageAlt: string;
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
 * CONTENIDO COMERCIAL DE ESTRATEGIA FISCAL PASO A PASO
 *
 * Mantener aquí precio, checkout, temario y beneficios para que futuras
 * actualizaciones no requieran modificar la estructura visual de la página.
 */
export const directSaleConfig: DirectSaleConfig = {
  isDemo: false,
  product: {
    eyebrow: "Programa intensivo de estrategia fiscal",
    name: "Estrategia Fiscal Paso a Paso",
    headline: "5 días para convertirte en un estratega fiscal de gran nivel",
    promise:
      "Lleva tu conocimiento fiscal al siguiente nivel y aprende a aplicar estrategias reales en tu práctica profesional.",
    format: "5 sesiones en vivo",
    access: "Grabaciones por un año",
    level: "1 hora diaria",
    slogan: "Estrategia hoy; mejores resultados mañana.",
  },
  pricing: {
    currency: "MXN",
    salePrice: 987,
    taxNote: "Inversión única de $987.00 MXN.",
  },
  checkout: {
    enabled: true,
    url: "https://pay.hotmart.com/L107321129X?off=hs9wp3t0&checkoutMode=10&bid=1788550850213",
    buttonLabel: "Inscribirme ahora por $987 MXN",
  },
  highlights: [
    "Sesión en vivo · 1 hora diaria",
    "Certificado digital",
    "Material de apoyo",
    "Grabaciones disponibles un año",
  ],
  modules: [
    {
      day: "Día 1",
      action: "Diagnosticar",
      title: "Diagnóstico Fiscal Estratégico",
      description:
        "Aprende a diagnosticar una empresa, detectar oportunidades y encontrar el punto de partida para construir estrategias fiscales.",
    },
    {
      day: "Día 2",
      action: "Comparar",
      title: "Arquitectura Fiscal del Contribuyente",
      description:
        "Aprende a comparar escenarios y elegir la estructura fiscal más conveniente para cada contribuyente.",
    },
    {
      day: "Día 3",
      action: "Diseñar",
      title: "Estrategia Fiscal Empresa–Socio",
      description:
        "Aprende a crear estrategias para la empresa y diseñar mejores alternativas para la retribución de sus socios.",
    },
    {
      day: "Día 4",
      action: "Planear",
      title: "Planeación Estratégica de Deducciones",
      description:
        "Aprende a planear las deducciones para reducir legalmente la carga fiscal y generar mejores resultados para tu cliente.",
    },
    {
      day: "Día 5",
      action: "Convertir en un servicio",
      title: "El Negocio de la Estrategia Fiscal",
      description:
        "Aprende a convertir todo lo anterior en un servicio que puedas ofrecer, cobrar y aplicar con tus propios clientes.",
    },
  ],
  inclusions: [
    {
      title: "Sesiones en vivo",
      description: "Cinco sesiones de una hora, una por cada día del programa.",
    },
    {
      title: "Certificado digital",
      description: "Recibe un certificado digital por tu participación en el programa.",
    },
    {
      title: "5 días de aprendizaje",
      description: "Una ruta concentrada que avanza del diagnóstico a la creación de tu servicio.",
    },
    {
      title: "Material de apoyo",
      description: "Recursos para acompañar los contenidos y facilitar su aplicación profesional.",
    },
    {
      title: "Grabaciones por un año",
      description: "Consulta nuevamente las sesiones durante doce meses.",
    },
  ],
  outcomes: [
    "Diagnosticar una empresa y detectar oportunidades fiscales.",
    "Comparar escenarios para elegir una estructura fiscal conveniente.",
    "Diseñar estrategias para la empresa y la retribución de sus socios.",
    "Planear deducciones para reducir legalmente la carga fiscal.",
    "Convertir tu conocimiento en un servicio que puedas ofrecer y cobrar.",
  ],
  instructor: {
    name: "Mtro. Alfredo Cobos",
    role: "Instructor de Estrategia Fiscal Paso a Paso",
    image:
      "https://cefin-landings-z9uk.vercel.app/contrato-servicios-contables/alfredo-servicios-contables.png",
    imageAlt: "Mtro. Alfredo Cobos, instructor del programa",
  },
  faq: [
    {
      question: "¿Cuánto dura el programa?",
      answer:
        "El programa se desarrolla durante cinco días, con una sesión en vivo de una hora cada día.",
    },
    {
      question: "¿Podré volver a ver las sesiones?",
      answer:
        "Sí. Las grabaciones estarán disponibles durante un año para que puedas consultar nuevamente el contenido.",
    },
    {
      question: "¿Incluye material de apoyo?",
      answer:
        "Sí. Tu inscripción incluye material de apoyo para acompañar el aprendizaje y facilitar la aplicación de los temas.",
    },
    {
      question: "¿Recibiré certificado?",
      answer: "Sí. El programa incluye certificado digital.",
    },
    {
      question: "¿Cuál es la inversión?",
      answer: "La inversión para acceder al programa completo es de $987.00 MXN.",
    },
  ],
  legal: {
    privacyUrl: "https://cefin.mx/privacidad",
    termsUrl: "",
  },
};
