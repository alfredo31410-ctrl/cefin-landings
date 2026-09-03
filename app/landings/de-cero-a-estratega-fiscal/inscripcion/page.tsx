import type { Metadata } from "next";
import { directSaleConfig as config } from "./config";
import InscripcionLanding from "./inscripcion-landing";

export const metadata: Metadata = {
  title: `${config.product.name} | Programa en línea | CEFIN`,
  description: config.product.promise,
  robots: config.isDemo ? { index: false, follow: false } : undefined,
  openGraph: {
    title: `${config.product.name} | CEFIN`,
    description: config.product.promise,
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary",
    title: `${config.product.name} | CEFIN`,
    description: config.product.promise,
  },
};

export default function InscripcionPage() {
  return <InscripcionLanding />;
}
