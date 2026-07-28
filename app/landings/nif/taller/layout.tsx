import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taller Práctico de NIF | CEFIN",
  description:
    "Aprende a analizar operaciones reales, identificar la NIF aplicable y sustentar tus decisiones contables.",
  openGraph: {
    title: "Taller Práctico de NIF | CEFIN",
    description:
      "Un taller en vivo para llevar las NIF de la teoría a la aplicación práctica, potenciado con inteligencia artificial.",
    type: "website",
  },
};

export default function TallerNifLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
