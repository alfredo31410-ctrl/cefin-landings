import type { Metadata } from "next";
import NominaLanding from "./nomina-landing";

export const metadata: Metadata = {
  title: "Reto gratuito de nómina en vivo | CEFIN",
  description: "Aprende a detectar errores que el sistema no siempre muestra y desarrolla criterio para revisar ISR, IMSS e integración salarial.",
  openGraph: {
    title: "Reto gratuito de nómina en vivo | CEFIN",
    description: "Deja de solo timbrar nóminas y aprende a revisarlas con criterio.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Reto gratuito de nómina en vivo | CEFIN", description: "Aprende a revisar nóminas con mayor criterio profesional." },
};

export default function NominaPage() { return <NominaLanding />; }
