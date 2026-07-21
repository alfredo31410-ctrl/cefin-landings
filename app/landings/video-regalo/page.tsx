"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const ACTIVE_CAMPAIGN_FORM_ID = 291;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;
const ACCESS_STORAGE_KEY = "cefin:video-regalo:access";
const CONVERSION_STORAGE_KEY = "cefin:video-regalo:conversion-tracked";
const LANDING_SLUG = "video-regalo";
const VIDEO_PATH = "/landings/video-regalo/video";

// Mantiene esta landing independiente de otros embudos que siguen en desarrollo.
function buildVideoEventData(
  eventSource: string,
  data: Record<string, unknown> = {},
) {
  return {
    ...data,
    landing_slug: LANDING_SLUG,
    event_source: eventSource,
    event_timestamp: Math.floor(Date.now() / 1000),
  };
}

const PAGE_DATA = {
  title: "Desbloquea tu video especial de CEFIN",
  subtitle:
    "Déjanos tus datos y obtén acceso inmediato a este contenido exclusivo preparado para ti.",
  eyebrow: "Regalo gratuito",
};

function hasSessionAccess() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(ACCESS_STORAGE_KEY) === "granted";
  } catch {
    // Si el navegador bloquea storage, el formulario sigue funcionando en la visita actual.
    return false;
  }
}

export default function VideoRecursoPage() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    document.title = `${PAGE_DATA.title} | CEFIN`;
    const storedAccess = hasSessionAccess();
    if (storedAccess) {
      router.replace(VIDEO_PATH);
    }
    window.queueMicrotask(() => {
      setHasAccess(storedAccess);
      setIsCheckingAccess(false);
    });

    trackMetaEvent(
      "ViewContent",
      buildVideoEventData("landing_view", {
        content_name: `${PAGE_DATA.title} | Registro`,
        content_category: "Contenido educativo",
      }),
    );
  }, [router]);

  // ActiveCampaign inyecta el formulario; se evita duplicar el script en recargas cliente.
  useEffect(() => {
    if (hasAccess || isCheckingAccess) return;
    document.getElementById("ac-video-regalo-loader")?.remove();

    const formRoot = document.querySelector(`.${FORM_CLASS}`);
    if (formRoot) formRoot.innerHTML = "";

    const script = document.createElement("script");
    script.id = "ac-video-regalo-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, [hasAccess, isCheckingAccess]);

  // Se guarda la intención solo cuando el formulario supera la validación del navegador.
  // ActiveCampaign debe redirigir a VIDEO_PATH; la confirmación visible también navega allí.
  useEffect(() => {
    if (hasAccess || isCheckingAccess) return;
    const formRoot = document.querySelector(`.${FORM_CLASS}`);
    if (!formRoot) return;

    const bindSubmitListener = () => {
      const form = formRoot.querySelector<HTMLFormElement>("form");
      if (!form || form.dataset.cefinAccessListener === "true") return;
      form.dataset.cefinAccessListener = "true";
      form.addEventListener("submit", () => {
        if (!form.checkValidity()) return;
        try {
          window.sessionStorage.setItem(ACCESS_STORAGE_KEY, "granted");
        } catch {
          // Sin storage, la ruta protegida no puede validar el acceso tras una redirección.
        }
      });
    };

    const observer = new MutationObserver(bindSubmitListener);
    observer.observe(formRoot, { childList: true, subtree: true });
    bindSubmitListener();
    return () => observer.disconnect();
  }, [hasAccess, isCheckingAccess]);

  // Se desbloquea únicamente cuando ActiveCampaign hace visible su confirmación de éxito.
  // Un clic en enviar no es suficiente porque el proveedor todavía podría rechazar los datos.
  useEffect(() => {
    if (hasAccess || isCheckingAccess) return;
    const formRoot = document.querySelector(`.${FORM_CLASS}`);
    if (!formRoot) return;

    const detectSuccessfulRegistration = () => {
      const confirmation = formRoot.querySelector<HTMLElement>("._form-thank-you");
      if (!confirmation) return;

      const isVisible =
        confirmation.getClientRects().length > 0 &&
        window.getComputedStyle(confirmation).display !== "none";
      if (!isVisible) return;

      try {
        window.sessionStorage.setItem(ACCESS_STORAGE_KEY, "granted");
      } catch {
        // El estado React permite ver el regalo aunque storage esté deshabilitado.
      }

      let shouldTrackConversion = true;
      try {
        shouldTrackConversion =
          window.sessionStorage.getItem(CONVERSION_STORAGE_KEY) !== "yes";
        window.sessionStorage.setItem(CONVERSION_STORAGE_KEY, "yes");
      } catch {
        // Sin storage se prioriza el acceso; el Pixel podría duplicarse en una recarga.
      }

      if (shouldTrackConversion) {
        trackMetaEvent(
          "CompleteRegistration",
          buildVideoEventData("activecampaign_success", {
            content_name: `${PAGE_DATA.title} | Acceso al video`,
            content_category: "Contenido educativo",
            status: "registered",
          }),
        );
      }

      setHasAccess(true);
      router.push(VIDEO_PATH);
    };

    const observer = new MutationObserver(detectSuccessfulRegistration);
    observer.observe(formRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    detectSuccessfulRegistration();
    return () => observer.disconnect();
  }, [hasAccess, isCheckingAccess, router]);

  return (
    <>
      <Script
        id="meta-pixel-video-recurso"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />
      <noscript>
        {/* El fallback solo mide PageView porque el registro requiere JavaScript. */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl()}
          alt=""
        />
      </noscript>

      <main className="relative min-h-dvh overflow-x-hidden bg-[#06080f] text-white">
        {/* Estas capas fijas cubren siempre el viewport aunque el formulario aumente la altura. */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(6,182,212,0.22),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(147,51,234,0.18),transparent_32%),linear-gradient(145deg,#07131b_0%,#090b16_52%,#080611_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#06080f] to-transparent" />
        </div>

        <header className="relative z-10 mx-auto flex max-w-6xl justify-center px-5 py-6 sm:justify-start sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-cyan-500 font-black text-[#041016] shadow-[0_10px_35px_rgba(34,211,238,.22)]">C</div>
            <div><p className="font-black leading-none">CEFIN</p><p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/45">Capacitación financiera</p></div>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-3 sm:px-8 lg:px-10 lg:pt-8">
          {isCheckingAccess ? (
            <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center text-white/70">Comprobando tu acceso…</div>
          ) : hasAccess ? (
            <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center text-white/70">Preparando tu video…</div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-14">
              <div className="text-center lg:text-left">
                <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200 sm:text-xs">{PAGE_DATA.eyebrow}</p>
                <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">{PAGE_DATA.title}</h1>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg lg:mx-0">{PAGE_DATA.subtitle}</p>

                {/* La vista previa comunica el premio sin exponer el iframe antes del registro. */}
                <div className="relative mx-auto mt-8 aspect-video max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-[#101726] to-fuchsia-500/15 shadow-[0_25px_80px_rgba(0,0,0,.35)] lg:mx-0">
                  <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:18px_18px]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                      <svg className="ml-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-white/80">Video exclusivo bloqueado</p>
                    <p className="mt-2 text-sm text-white/50">Completa el formulario para reproducirlo</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/60 bg-white p-5 text-slate-900 shadow-[0_30px_100px_rgba(0,0,0,.38)] sm:p-8">
                <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-sm font-black text-cyan-800">1</span><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Un solo paso</p></div>
                <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">¿A dónde te enviamos el acceso?</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Completa tus datos y el video se desbloqueará aquí mismo.</p>
                <div className="mt-5 rounded-2xl bg-slate-50 p-2 sm:p-4"><div className={`${FORM_CLASS} min-h-[380px]`} aria-live="polite" /></div>
                <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">Tus datos se utilizarán para gestionar este acceso y enviarte información relacionada con CEFIN.</p>
              </div>
            </div>
          )}
        </section>

      </main>
    </>
  );
}
