export type AudienceVariant = "broad" | "seg" | "unknown";

export type WhatsAppGroupUrls = Readonly<{
  broad: string;
  seg: string;
  fallback: string;
}>;

export function classifyAudience(utmTerm?: string | null): AudienceVariant {
  const parts = (utmTerm ?? "")
    .split("|")
    .map((part) => part.trim().toUpperCase())
    .filter(Boolean);

  if (parts.includes("BROAD")) return "broad";
  if (parts.includes("SEG") || parts.includes("SEGMENTADO")) return "seg";
  return "unknown";
}

export function resolveAudienceWhatsAppGroup(
  utmTerm: string | null | undefined,
  whatsappGroupUrls: WhatsAppGroupUrls,
) {
  const audienceVariant = classifyAudience(utmTerm);
  const routedGroupUrl =
    audienceVariant === "seg"
      ? whatsappGroupUrls.seg
      : whatsappGroupUrls.fallback;

  return { audienceVariant, routedGroupUrl };
}
