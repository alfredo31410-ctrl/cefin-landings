import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  PLATAFORMAS_REGISTRATION_COOKIE,
  verifyPlataformasRegistrationProof,
} from "@/lib/plataformas-registration";
import PlataformasGracias from "./plataformas-gracias";
import { PlataformasConversionClient } from "./plataformas-conversion-client";

export const metadata: Metadata = {
  title: "Último paso | Plataformas Tecnológicas | CEFIN",
  description:
    "Completa el acceso a la clase gratuita de Plataformas Tecnológicas.",
  robots: { index: false, follow: false },
};

export default async function PlataformasGraciasPage() {
  const cookieStore = await cookies();
  const proof = verifyPlataformasRegistrationProof(
    cookieStore.get(PLATAFORMAS_REGISTRATION_COOKIE)?.value,
  );

  return (
    <>
      <PlataformasGracias isValidRegistration={Boolean(proof)} />
      {proof?.state === "pending" && (
        <PlataformasConversionClient eventId={proof.eventId} />
      )}
    </>
  );
}
