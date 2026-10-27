import GraciasNifClient from "./gracias-nif-client";

const fallbackGroupUrl = "https://chat.whatsapp.com/B8GmVjXScJbF6YEPYwZSHW";

export default function NifGraciasPage() {
  const groupUrl = process.env.NIF_WHATSAPP_GROUP_URL || fallbackGroupUrl;
  return <GraciasNifClient groupUrl={groupUrl} />;
}
