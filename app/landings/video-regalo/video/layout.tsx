import type { Metadata } from "next";
import type { ReactNode } from "react";

// La página contiene un recurso condicionado y no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Tu video especial | CEFIN",
  robots: { index: false, follow: false },
};

export default function VideoLayout({ children }: { children: ReactNode }) {
  return children;
}
