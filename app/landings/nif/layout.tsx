import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://cefin.mx"),
  title: "ABC de NIF | Clase gratuita en vivo | CEFIN",
  description:
    "Aprende las bases de las Normas de Información Financiera en una clase gratuita, práctica y en vivo con el Mtro. Alfredo Cobos.",
  alternates: {
    canonical: "https://cefin.mx/landings/nif",
  },
  openGraph: {
    title: "ABC de NIF | Clase gratuita en vivo | CEFIN",
    description:
      "Deja de hacer números a ciegas. Construye bases sólidas en NIF y aprende a aplicarlas con criterio contable.",
    url: "https://cefin.mx/landings/nif",
    siteName: "CEFIN",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/alfredo.png",
        width: 800,
        height: 800,
        alt: "Mtro. Alfredo Cobos, instructor de CEFIN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABC de NIF | Clase gratuita en vivo | CEFIN",
    description:
      "Comprende las NIF desde cero y llévalas a situaciones contables reales.",
    images: ["/alfredo.png"],
  },
};

export default function NifLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
