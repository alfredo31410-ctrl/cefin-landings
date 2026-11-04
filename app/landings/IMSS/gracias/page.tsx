import type { Metadata } from "next";
import { imssCampaign } from "../config";
import ImssThankYouPage from "../thanks";

export const metadata: Metadata = {
  title: "Registro completado | IMSS — Actualización Total | CEFIN",
  description: "Confirmación de registro a la clase gratuita IMSS — Actualización Total.",
  alternates: {
    canonical: `${imssCampaign.canonicalUrl}/gracias`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default ImssThankYouPage;
