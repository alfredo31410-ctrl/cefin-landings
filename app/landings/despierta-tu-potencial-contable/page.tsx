import type { Metadata } from "next";
import DespiertaLanding from "./despierta-landing";

export const metadata: Metadata = {
  title: "Despierta tu Potencial Contable | Clase Gratuita | CEFIN",
  description:
    "Clase gratuita para profesionales contables que quieren comunicar valor, tomar mejores decisiones y cobrar mejor.",
  openGraph: {
    title: "Despierta tu Potencial Contable | CEFIN",
    description:
      "Desarrolla una práctica contable más clara, rentable y estratégica.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Despierta tu Potencial Contable | CEFIN",
    description: "Clase gratuita en línea con Marisol Galván.",
  },
};

export default function DespiertaTuPotencialContablePage() {
  return <DespiertaLanding />;
}
