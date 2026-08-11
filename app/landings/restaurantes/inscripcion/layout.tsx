import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asesor Fiscal de Restaurantes | Programa CEFIN",
  description:
    "Aprende a atender restaurantes y negocios de comida con un método fiscal claro, práctico y rentable.",
  openGraph: {
    title: "Asesor Fiscal de Restaurantes | Programa CEFIN",
    description:
      "Convierte el conocimiento fiscal de restaurantes en una asesoría más segura y valiosa.",
    type: "website",
  },
};

export default function RestaurantesInscripcionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
