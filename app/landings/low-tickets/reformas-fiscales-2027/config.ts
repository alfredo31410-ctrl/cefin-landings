export type ProductConfig = {
  productName: string;
  price: number | null;
  originalPrice: number | null;
  checkoutUrl: string | null;
  cta: string;
  fallbackCta: string;
  trackingValue: number | null;
  modality: string | null;
  duration: string | null;
  access: string | null;
  materials: string[];
  bonuses: string[];
  guarantee: string | null;
};

/**
 * Configuración comercial de la landing.
 * Completa únicamente los campos confirmados. Los valores null no se muestran.
 */
export const productConfig: ProductConfig = {
  productName: "Reformas Fiscales 2027",
  price: null,
  originalPrice: null,
  checkoutUrl: null,
  cta: "QUIERO PREPARARME PARA 2027",
  fallbackCta: "REVISAR EL CONTENIDO",
  trackingValue: null,
  modality: null,
  duration: null,
  access: null,
  materials: [],
  bonuses: [],
  guarantee: null,
};

export const productTracking = {
  contentName: productConfig.productName,
  contentCategory: "Actualización fiscal / Low ticket",
};

/**
 * Información reutilizada de perfiles institucionales ya publicados en el
 * proyecto. Mantener aquí únicamente datos verificables.
 */
export const instructorConfig = {
  name: "Mtro. Alfredo Cobos",
  role: "Contador público y maestro en impuestos",
  organization: "Fundador de CEFIN · Director de la Red CEFIN",
  bio: "Cuenta con más de 15 años de experiencia en asesoría fiscal, consultoría empresarial y capacitación profesional.",
  image: "/alfredo.png",
  imageAlt: "Mtro. Alfredo Cobos, instructor de CEFIN",
  imageWidth: 639,
  imageHeight: 628,
};
