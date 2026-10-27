import type { Metadata } from "next";
import localFont from "next/font/local";

const headingFont = localFont({
  src: [
    { path: "./fonts/barlow-condensed-700-latin.woff2", weight: "700" },
    { path: "./fonts/barlow-condensed-800-latin.woff2", weight: "800" },
    { path: "./fonts/barlow-condensed-900-latin.woff2", weight: "900" },
  ],
  variable: "--font-nif-heading",
  display: "swap",
});

const bodyFont = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "400 800",
  variable: "--font-nif-body",
  display: "swap",
});

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
  return (
    <div className={`${headingFont.variable} ${bodyFont.variable}`}>
      {children}
    </div>
  );
}
