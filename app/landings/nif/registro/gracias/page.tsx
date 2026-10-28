import type { Metadata } from "next";
import GraciasNifClient from "./gracias-nif-client";

export const metadata: Metadata = {
  title: "Completa tu acceso | ABC de NIF | CEFIN",
  description:
    "Último paso para completar tu acceso a la clase gratuita ABC de NIF.",
  robots: { index: false, follow: false },
};

export default function NifGraciasPage() {
  return <GraciasNifClient />;
}
