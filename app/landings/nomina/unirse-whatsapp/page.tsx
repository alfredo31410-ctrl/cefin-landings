import type { Metadata } from "next";
import { landingConfig as config } from "../config";
import { RedirectToWhatsApp } from "./redirect-to-whatsapp";
import "./unirse-whatsapp.css";

export const metadata: Metadata = {
  title: "Abriendo el grupo oficial | Reto de nómina | CEFIN",
  description: "Acceso al grupo oficial del reto gratuito de nómina de CEFIN.",
  robots: { index: false, follow: false },
};

export default function UnirseWhatsAppPage() {
  const { thankYou } = config;

  return (
    <main className="nomina-whatsapp-redirect">
      <section
        className="whatsapp-redirect-card"
        aria-labelledby="whatsapp-redirect-title"
      >
        <p className="whatsapp-redirect-eyebrow">CEFIN · PASO 2 DE 2</p>
        <h1 id="whatsapp-redirect-title">
          Estamos abriendo el grupo oficial de WhatsApp…
        </h1>
        <p className="whatsapp-redirect-copy">
          Cuando se abra WhatsApp, toca “Unirme al grupo” para terminar.
        </p>
        <RedirectToWhatsApp whatsappGroupUrl={thankYou.whatsappGroupUrl} />
        <p className="whatsapp-redirect-note">
          Si WhatsApp no se abre automáticamente, usa el botón.
        </p>
      </section>
    </main>
  );
}
