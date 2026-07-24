import type { Metadata } from "next";
import type { ReactNode } from "react";

// Esta ruta es transitoria y no aporta contenido indexable.
export const metadata: Metadata = {
  title: "Abriendo WhatsApp | Auxiliar Contable | CEFIN",
  robots: { index: false, follow: false },
};

export default function UnirseWhatsappLayout({ children }: { children: ReactNode }) {
  return children;
}
