"use client";

import { MetaPixel } from "@/components/meta-pixel";
import {
  buildMetaEventData,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import {
  consumeCompleteRegistrationProof,
  hasRecentRegistrationProof,
} from "@/lib/registration-session";
import {
  captureTrafficAttribution,
  getTrafficAttribution,
  withTrafficAttribution,
} from "@/lib/traffic-attribution";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LANDING_PATH = "/landings/auxiliar-contable";
const LANDING_SLUG = "auxiliar-contable";

export default function GraciasAuxiliar() {
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    document.title = "Último paso | Auxiliar Contable | CEFIN";
    captureTrafficAttribution(window.location.search, LANDING_SLUG);

    // Consumir primero la prueba impide duplicados por recarga, historial o React Strict Mode.
    const hasValidProof = hasRecentRegistrationProof();
    const canTrackRegistration = consumeCompleteRegistrationProof();
    // Se difiere el estado visual para mantener el efecto dedicado a sincronización externa.
    window.queueMicrotask(() => setIsValid(hasValidProof));

    if (canTrackRegistration) {
      trackMetaEvent(
        "CompleteRegistration",
        buildMetaEventData(LANDING_SLUG, "activecampaign_success", {
          content_name: "Auxiliar Contable - Entrenamiento en vivo",
          status: "registered",
          value: 0,
          currency: META_CURRENCY,
          ...getTrafficAttribution(),
        }),
      );
      return;
    }

    // Una recarga conserva la pantalla operativa, pero no vuelve a enviar la conversión.
    if (hasValidProof) return;

    // Un acceso directo no cuenta conversión y vuelve a la landing de forma controlada.
    const timeout = window.setTimeout(() => {
      router.replace(withTrafficAttribution(LANDING_PATH));
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [router]);

  if (isValid !== true) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f172a] px-5 text-white">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-7 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-300">
            {isValid === null ? "Validando registro" : "Registro no validado"}
          </p>
          <h1 className="mt-3 text-2xl font-black">No encontramos un registro reciente en esta sesión.</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Por seguridad, esta página no genera una conversión si se abre directamente. Te llevaremos al formulario para que completes el registro.
          </p>
          <a href={LANDING_PATH} className="mt-6 inline-flex rounded-xl bg-fuchsia-600 px-6 py-3 font-bold hover:bg-fuchsia-700">Volver al registro</a>
        </div>
      </main>
    );
  }

  const whatsappTransitionPath = "https://chat.whatsapp.com/CxNMHqccEOs9lpKLPOvHEI";

  return (
    <>
      <MetaPixel pageKey="auxiliar-gracias" />
      <main className="relative flex min-h-screen items-center overflow-hidden bg-[#0f172a] px-4 py-8 text-white sm:px-6">
        <div className="pointer-events-none absolute left-[-10%] top-[5%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/25 blur-[110px]" />
        <section className="relative mx-auto w-full max-w-3xl rounded-[2rem] border border-fuchsia-400/20 bg-white/5 p-5 text-center shadow-2xl backdrop-blur-xl sm:p-9 lg:p-12">
          <p className="inline-flex rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-200 sm:text-xs">
            Paso 2 de 2 · No cierres esta página
          </p>
          <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-fuchsia-500/15 text-fuchsia-300">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Ya guardamos tus datos
            <span className="mt-2 block text-yellow-400">Ahora completa tu acceso en WhatsApp</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tu acceso todavía no está completo. Entra al grupo oficial de WhatsApp para recibir el enlace de acceso, recordatorios, avisos y materiales importantes.
          </p>
          <a
            href={whatsappTransitionPath}
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-5 text-base font-black text-white shadow-[0_0_35px_rgba(37,211,102,.3)] transition hover:bg-[#1fbe5c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6CFF9A] active:scale-[0.98] sm:w-auto sm:text-lg"
          >
            Entrar al grupo oficial de WhatsApp
          </a>
          <p className="mx-auto mt-5 max-w-xl rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm font-bold leading-relaxed text-yellow-100 sm:text-base">
            Cuando se abra WhatsApp, toca &quot;Unirme al grupo&quot; para completar tu acceso.
          </p>
        </section>
      </main>
    </>
  );
}
