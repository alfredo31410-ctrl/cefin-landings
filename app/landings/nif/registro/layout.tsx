import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABC PRÁCTICO DE NIF | Clase gratuita en vivo | CEFIN",
  description:
    "Regístrate a la clase gratuita ABC PRÁCTICO DE NIF, impartida por el Mtro. Alfredo Cobos el 20 de agosto de 2026 a las 11:00 a. m., hora de CDMX.",
  openGraph: {
    title: "ABC PRÁCTICO DE NIF | Clase gratuita en vivo | CEFIN",
    description:
      "Una clase gratuita en vivo para aprender las bases de las NIF desde cero.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABC PRÁCTICO DE NIF | Clase gratuita en vivo | CEFIN",
    description: "Regístrate a la clase gratuita del 20 de agosto de 2026.",
  },
};

export default function NifRegistroLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
