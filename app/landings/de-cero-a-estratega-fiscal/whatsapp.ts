export function getValidWhatsAppGroupUrl(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value);
    const pathParts = url.pathname.split("/").filter(Boolean);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "chat.whatsapp.com" ||
      pathParts.length !== 1 ||
      !/^[A-Za-z0-9]+$/.test(pathParts[0])
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}
