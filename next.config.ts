import type { NextConfig } from "next";

const nextConfig: NextConfig = {


  /* Opcional: Si usas imágenes de dominios externos o quieres optimización específica */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /* Esto ayuda a mantener la compatibilidad si usas rutas con o sin slash al final */
  trailingSlash: false,
};

export default nextConfig;