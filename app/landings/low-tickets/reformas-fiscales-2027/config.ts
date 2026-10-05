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
