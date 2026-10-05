import type { Metadata } from "next";
import { ReformasFiscalesLanding } from "./landing";

export const metadata: Metadata = {
  title: "Reformas Fiscales 2027 | CEFIN",
  description:
    "Conoce los principales cambios fiscales rumbo a 2027, cómo pueden impactar a tus clientes y qué debes comenzar a analizar antes de enero.",
  openGraph: {
    title: "Reformas Fiscales 2027 | CEFIN",
    description:
      "Lo que cambia, a quién afecta y qué debes preparar antes de enero.",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary",
    title: "Reformas Fiscales 2027 | CEFIN",
    description:
      "Cambios propuestos, escenarios y preguntas clave para prepararte antes de enero.",
  },
};

export default function ReformasFiscales2027Page() {
  return <ReformasFiscalesLanding />;
}
