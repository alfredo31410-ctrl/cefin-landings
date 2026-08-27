import Script from "next/script";
import { getMetaPixelScript } from "@/lib/meta-pixel";
import { landingConfig as config } from "./config";

export function CampaignTracking() {
  if (!config.activation.trackingEnabled) return null;

  return (
    <Script
      id="meta-pixel-estratega-fiscal"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
    />
  );
}
