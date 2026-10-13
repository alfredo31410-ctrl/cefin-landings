import type { Metadata } from "next";
import { campaign } from "./config";
import ActualizacionPersonasMoralesLanding from "./landing";

export const metadata: Metadata = {
  title: `${campaign.title} | Clase gratuita CEFIN`,
  description: campaign.description,
  openGraph: {
    title: campaign.title,
    description: campaign.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: campaign.title,
    description: campaign.description,
  },
};

export default function ActualizacionPersonasMoralesPage() {
  return <ActualizacionPersonasMoralesLanding />;
}
