"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { getMetaPixelScript, trackMetaCustomEvent } from "@/lib/meta-pixel";

export default function JoinMedicos() {
  const [url, setUrl] = useState("");
  useEffect(() => { fetch("/api/medicos/whatsapp").then((r) => r.json()).then((data: { url?: string }) => setUrl(data.url ?? "")).catch(() => setUrl("")); }, []);
  useEffect(() => { if (!url || sessionStorage.getItem("cefin_medicos_joined")) return; sessionStorage.setItem("cefin_medicos_joined", "1"); trackMetaCustomEvent("JoinGroup", { landing_slug: "medicos" }); const timer = window.setTimeout(() => window.location.assign(url), 1500); return () => window.clearTimeout(timer); }, [url]);
  return <><Script id="meta-pixel-medicos-join" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: getMetaPixelScript(undefined, { trackPageView: false }) }} /><main className="medicos-result"><p className="medicos-section-label">CEFIN · PASO 2 DE 2</p><h1>Estamos abriendo el grupo oficial de WhatsApp…</h1><p>Cuando se abra WhatsApp, presiona “Unirme al grupo” para terminar.</p>{url ? <a className="medicos-cta" href={url}>ABRIR EL GRUPO MANUALMENTE</a> : <p className="medicos-note">El enlace oficial aún no está configurado.</p>}<style jsx global>{`.medicos-result{min-height:100svh;background:#050505;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:20px;padding:28px;max-width:820px;margin:auto;font-family:Arial,sans-serif}.medicos-result h1{font-family:Impact,'Arial Narrow',sans-serif;text-transform:uppercase;font-size:clamp(42px,7vw,84px);line-height:.92;margin:0}.medicos-result p{color:#d3d7ce;font-size:18px;line-height:1.6}.medicos-result .medicos-section-label{color:#c5ceae;font-size:11px;font-weight:800;letter-spacing:.18em}.medicos-result .medicos-note{color:#eea05a}.medicos-cta{display:inline-flex;align-items:center;min-height:54px;padding:15px 22px;background:#ee8b32;color:#17100a;text-decoration:none;font-size:13px;font-weight:900;letter-spacing:.07em}`}</style></main></>;
}
