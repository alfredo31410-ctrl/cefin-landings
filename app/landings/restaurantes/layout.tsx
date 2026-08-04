import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asesor Fiscal de Restaurantes | Clase gratuita | CEFIN",
  description:
    "Aprende a asesorar fiscalmente a restaurantes y negocios de comida en una clase gratuita en línea con el Mtro. Alfredo Cobos.",
  openGraph: {
    title: "Asesor Fiscal de Restaurantes | Clase gratuita | CEFIN",
    description:
      "Una clase gratuita para entender los retos fiscales de restaurantes y negocios de comida.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asesor Fiscal de Restaurantes | Clase gratuita | CEFIN",
    description: "Regístrate a la clase gratuita de asesoría fiscal para restaurantes.",
  },
};

export default function RestaurantesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
