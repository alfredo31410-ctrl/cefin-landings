import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABC de las NIF | Clase gratuita en vivo | CEFIN",
  description: "Regístrate a la clase gratuita ABC de las NIF, impartida por el Mtro. Alfredo Cobos el 31 de julio de 2026 a las 11:00 a. m., hora de CDMX.",
  openGraph: {
    title: "ABC de las NIF | Clase gratuita en vivo | CEFIN",
    description: "Una clase gratuita en vivo para interpretar estados financieros con las bases esenciales de las NIF.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABC de las NIF | Clase gratuita en vivo | CEFIN",
    description: "Regístrate a la clase gratuita del 31 de julio de 2026.",
  },
};

export default function NifRegistroLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
