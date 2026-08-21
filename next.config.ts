import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  assetPrefix: isProd ? "https://cefin-landings-z9uk.vercel.app" : "",
  async redirects() {
    return [
      {
        source: "/landings/contadora-estrategica",
        destination: "/landings/despierta-tu-potencial-contable",
        permanent: true,
      },
      {
        source: "/landings/contadora-estrategica/inscripcion",
        destination: "/landings/despierta-tu-potencial-contable/inscripcion",
        permanent: true,
      },
      {
        source: "/landings/contadora-estrategica/gracias",
        destination: "/landings/despierta-tu-potencial-contable/gracias",
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  trailingSlash: false,
};

export default nextConfig;
