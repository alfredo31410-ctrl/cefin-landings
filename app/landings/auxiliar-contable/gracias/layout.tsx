import type { Metadata } from "next";
import type { ReactNode } from "react";

// La página operativa no debe competir en buscadores con la landing pública.
export const metadata: Metadata = {
  title: "Último paso | Auxiliar Contable | CEFIN",
  robots: { index: false, follow: false },
};

export default function GraciasLayout({ children }: { children: ReactNode }) {
  return children;
}
