import type { Metadata } from "next";
import { landingConfig as config } from "./config";
import EstrategaFiscalLanding from "./landing";

export const metadata: Metadata = {
  title: `${config.title} | Clase gratuita | CEFIN`,
  description: config.description,
  openGraph: {
    title: `${config.title} | CEFIN`,
    description: config.description,
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary",
    title: `${config.title} | CEFIN`,
    description: config.description,
  },
};

export default function EstrategaFiscalPage() {
  return <EstrategaFiscalLanding />;
}
