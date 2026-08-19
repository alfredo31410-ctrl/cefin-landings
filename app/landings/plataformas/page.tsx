import type { Metadata } from "next";
import PlataformasLanding from "./plataformas-landing";

export const metadata: Metadata = {
  title: "Plataformas Tecnológicas | CEFIN",
  description:
    "Clase gratuita en vivo sobre obligaciones fiscales e ingresos por plataformas tecnológicas.",
  openGraph: {
    title: "Plataformas Tecnológicas | CEFIN",
    description:
      "Aprende qué revisar antes de declarar operaciones digitales ante el SAT.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plataformas Tecnológicas | CEFIN",
    description: "Clase gratuita en vivo con el Mtro. Alfredo Cobos.",
  },
};

export default function PlataformasPage() {
  return <PlataformasLanding />;
}
