import type { Metadata } from "next";
import InscripcionPersonasMoralesLanding from "./landing";
import { salesPage } from "./config";

export const metadata: Metadata = {
  title: `${salesPage.productName} | CEFIN`,
  description: salesPage.promise,
  openGraph: {
    title: `${salesPage.productName} | CEFIN`,
    description: salesPage.promise,
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: `${salesPage.productName} | CEFIN`,
    description: salesPage.promise,
  },
};

export default function InscripcionPersonasMoralesPage() {
  return <InscripcionPersonasMoralesLanding />;
}
