import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  ESTRATEGA_FISCAL_REGISTRATION_COOKIE,
  verifyEstrategaFiscalRegistrationProof,
} from "@/lib/estratega-fiscal-registration";
import { landingConfig as config } from "../config";
import { ConversionClient } from "./conversion-client";
import ThankYou from "./thank-you";
import { WhatsAppRedirect } from "./whatsapp-redirect";
import { getValidWhatsAppGroupUrl } from "../whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Registro confirmado | ${config.campaignName} | CEFIN`,
  description: "Confirmación de registro a la clase gratuita de CEFIN.",
  robots: { index: false, follow: false },
};

export default async function EstrategaFiscalThankYouPage() {
  const cookieStore = await cookies();
  const proof = verifyEstrategaFiscalRegistrationProof(
    cookieStore.get(ESTRATEGA_FISCAL_REGISTRATION_COOKIE)?.value,
  );
  const registrationActive = config.activation.registrationEnabled;
  const whatsappGroupUrl = registrationActive
    ? getValidWhatsAppGroupUrl(config.access.whatsappGroupUrl)
    : null;

  return (
    <>
      {registrationActive &&
        config.activation.trackingEnabled &&
        proof?.state === "pending" && (
          <ConversionClient eventId={proof.eventId} />
        )}
      {proof && whatsappGroupUrl && (
        <WhatsAppRedirect groupUrl={whatsappGroupUrl} />
      )}
      <ThankYou
        valid={Boolean(proof)}
        whatsappGroupUrl={proof ? whatsappGroupUrl : null}
      />
    </>
  );
}
