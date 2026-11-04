import type { Metadata } from "next";
import { imssCampaign } from "./config";
import ImssActualizacionTotalLanding from "./landing";

export const metadata: Metadata = {
  title: `${imssCampaign.title} | Clase gratuita CEFIN`,
  description: imssCampaign.description,
  alternates: {
    canonical: imssCampaign.canonicalUrl,
  },
  openGraph: {
    title: `${imssCampaign.title} | CEFIN`,
    description: imssCampaign.description,
    type: "website",
    url: imssCampaign.canonicalUrl,
  },
  twitter: {
    card: "summary",
    title: `${imssCampaign.title} | CEFIN`,
    description: imssCampaign.description,
  },
};

export default function ImssActualizacionTotalPage() {
  return <ImssActualizacionTotalLanding />;
}
