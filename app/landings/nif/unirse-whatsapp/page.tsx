import type { Metadata } from "next";
import JoinWhatsappClient from "./join-whatsapp-client";

export const metadata: Metadata = {
  title: "Abriendo el grupo oficial | ABC de las NIF",
  robots: { index: false, follow: false },
};

const fallbackGroupUrl = "https://chat.whatsapp.com/FbRR8asMMBDEwZgNtJNXSF";

export default function JoinWhatsappPage() {
  const groupUrl = process.env.NIF_WHATSAPP_GROUP_URL || fallbackGroupUrl;
  return <JoinWhatsappClient groupUrl={groupUrl} />;
}
