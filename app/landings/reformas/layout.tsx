import type { Metadata } from "next";
import localFont from "next/font/local";

const reformasDisplay = localFont({
  src: "../nif/inscripcion-nif/fonts/barlow-condensed-800-latin.woff2",
  variable: "--font-reformas-display",
  display: "swap",
});

const reformasBody = localFont({
  src: "../nif/inscripcion-nif/fonts/manrope-latin.woff2",
  variable: "--font-reformas-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cambios Fiscales | Clase gratuita en vivo | CEFIN",
  description:
    "Clase gratuita y en vivo para entender los cambios y reformas fiscales rumbo a 2027.",
};

export default function ReformasLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${reformasDisplay.variable} ${reformasBody.variable}`}>{children}</div>;
}
