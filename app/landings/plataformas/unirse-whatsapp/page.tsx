import type { Metadata } from "next";
import { landingConfig as config } from "../config";
import { RedirectToWhatsApp } from "./redirect-to-whatsapp";
import "./unirse-whatsapp.css";

export const metadata: Metadata = {
  title: "Abriendo el grupo oficial | Plataformas Tecnológicas | CEFIN",
  description:
    "Acceso al grupo oficial de la clase gratuita de Plataformas Tecnológicas.",
  robots: { index: false, follow: false },
};

export default function UnirseWhatsAppPage() {
  const { whatsappEnabled, whatsappGroupUrl } = config.thankYou;

  if (!whatsappEnabled || !whatsappGroupUrl) {
    return (
      <main className="plataformas-whatsapp-redirect">
        <section
          className="whatsapp-redirect-card"
          aria-labelledby="whatsapp-redirect-title"
        >
          <p className="whatsapp-redirect-eyebrow">CEFIN · REGISTRO GUARDADO</p>
          <h1 id="whatsapp-redirect-title">
            El grupo oficial de WhatsApp estará disponible próximamente
          </h1>
          <p className="whatsapp-redirect-copy">
            Tu registro ya quedó completo. Este acceso se habilitará cuando el
            grupo oficial esté listo.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="plataformas-whatsapp-redirect">
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
        <RedirectToWhatsApp whatsappGroupUrl={whatsappGroupUrl} />
        <p className="whatsapp-redirect-note">
          Si WhatsApp no se abre automáticamente, usa el botón.
        </p>
      </section>
    </main>
  );
}
