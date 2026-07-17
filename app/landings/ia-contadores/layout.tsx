import { redirect } from "next/navigation";

const COURSES_URL = "https://cefin.mx/cursos";

export default function IAContadoresLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isCampaignActive =
    process.env.LANDING_IA_CONTADORES_ACTIVE === "true";

  if (!isCampaignActive) {
    redirect(COURSES_URL);
  }

  return children;
}
