"use client";

import { campaign } from "../config";
import { trackConfirmedJoinGroup } from "./tracking";

function getVerifiedWhatsappUrl() {
  try {
    const url = new URL(campaign.whatsapp.groupUrl);
    if (url.protocol !== "https:" || url.hostname !== "chat.whatsapp.com") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function WhatsappGroupLink() {
  const whatsappUrl = getVerifiedWhatsappUrl();

  if (!whatsappUrl) {
    return (
      <p role="alert" className="mt-7 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-sm leading-relaxed text-white/70">
        El enlace oficial de WhatsApp no está disponible en este momento.
      </p>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      suppressHydrationWarning
      onClick={() => trackConfirmedJoinGroup()}
      className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.04em] text-[#063B1B] shadow-[0_18px_45px_rgba(37,211,102,0.22)] transition hover:bg-[#2BE074] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
    >
      UNIRME AL GRUPO DE WHATSAPP
    </a>
  );
}
