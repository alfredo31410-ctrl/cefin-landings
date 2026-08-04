import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro confirmado | Asesor Fiscal de Restaurantes | CEFIN",
  description:
    "Tu registro a la clase gratuita de Asesor Fiscal de Restaurantes fue recibido.",
  robots: { index: false, follow: false },
};

export default function RestaurantesGraciasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
