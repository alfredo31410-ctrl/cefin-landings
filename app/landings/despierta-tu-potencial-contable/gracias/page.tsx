import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  DESPIERTA_REGISTRATION_COOKIE,
  verifyDespiertaRegistrationProof,
} from "@/lib/despierta-potencial-registration";
import { DespiertaConversionClient } from "./conversion-client";
import DespiertaGracias from "./despierta-gracias";

export const metadata: Metadata = {
  title: "Último paso | Despierta tu Potencial Contable | CEFIN",
  description:
    "Completa el acceso a la clase gratuita Despierta tu Potencial Contable.",
  robots: { index: false, follow: false },
};

export default async function GraciasDespiertaTuPotencialContablePage() {
  const cookieStore = await cookies();
  const proof = verifyDespiertaRegistrationProof(
    cookieStore.get(DESPIERTA_REGISTRATION_COOKIE)?.value,
  );

  return (
    <>
      <DespiertaGracias isValidRegistration={Boolean(proof)} />
      {proof?.state === "pending" && (
        <DespiertaConversionClient eventId={proof.eventId} />
      )}
    </>
  );
}
