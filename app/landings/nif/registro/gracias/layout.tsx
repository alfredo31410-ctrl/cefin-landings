import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completa tu acceso | ABC de las NIF | CEFIN",
  robots: { index: false, follow: false },
};

export default function NifGraciasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
