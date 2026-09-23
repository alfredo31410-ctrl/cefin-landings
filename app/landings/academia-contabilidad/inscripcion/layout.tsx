import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academia de Contabilidad Básica | CEFIN",
  description:
    "Aprende contabilidad desde cero, a tu ritmo y con un enfoque práctico. Conoce los 17 módulos de la Academia de Contabilidad Básica de CEFIN.",
  openGraph: {
    title: "Academia de Contabilidad Básica | CEFIN",
    description:
      "Aprende contabilidad desde cero con 17 módulos prácticos y acceso 100% en línea.",
    type: "website",
    images: [
      {
        url: "https://cefin-landings-z9uk.vercel.app/academia-contabilidad/academia-contabilidad-og.png",
        width: 1740,
        height: 907,
        alt: "Academia de Contabilidad Básica de CEFIN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academia de Contabilidad Básica | CEFIN",
    description:
      "Aprende contabilidad desde cero con 17 módulos prácticos y acceso 100% en línea.",
    images: [
      "https://cefin-landings-z9uk.vercel.app/academia-contabilidad/academia-contabilidad-og.png",
    ],
  },
};

export default function AcademiaContabilidadInscripcionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
