import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  ESTRATEGA_FISCAL_REGISTRATION_COOKIE,
  verifyEstrategaFiscalRegistrationProof,
} from "@/lib/estratega-fiscal-registration";
import { landingConfig as config } from "../config";
import { WhatsAppRedirect } from "../gracias/whatsapp-redirect";
import { getValidWhatsAppGroupUrl } from "../whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Únete al grupo | ${config.campaignName} | CEFIN`,
  description: "Acceso al grupo de WhatsApp de la clase gratuita de CEFIN.",
  robots: { index: false, follow: false },
};

export default async function EstrategaFiscalJoinWhatsAppPage() {
  const cookieStore = await cookies();
  const proof = verifyEstrategaFiscalRegistrationProof(
    cookieStore.get(ESTRATEGA_FISCAL_REGISTRATION_COOKIE)?.value,
  );
  const whatsappGroupUrl =
    proof && config.activation.registrationEnabled
      ? getValidWhatsAppGroupUrl(config.access.whatsappGroupUrl)
      : null;

  if (!proof) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111827] px-4 py-12 text-white">
        <section className="w-full max-w-xl rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 text-center sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-300">
            Acceso protegido
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Primero confirma tu registro
          </h1>
          <p className="mt-4 leading-relaxed text-slate-300">
            Regístrate en la clase para poder continuar al grupo oficial de
            WhatsApp.
          </p>
          <a
            href={config.routes.root}
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-black uppercase text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Ir al registro
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f4f8] px-4 py-12 text-slate-950">
      {whatsappGroupUrl && (
        <WhatsAppRedirect groupUrl={whatsappGroupUrl} />
      )}
      <section className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
        <header className="flex items-center justify-between gap-4 bg-[#111827] px-6 py-5 text-white sm:px-9">
          <span className="text-2xl font-black tracking-[-0.06em]">CEFIN</span>
          <span className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-emerald-200 sm:text-xs">
            Último paso
          </span>
        </header>
        <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-black text-emerald-700">
            ✓
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
            Únete al grupo de WhatsApp
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
            Ahí compartiremos el acceso y los recordatorios importantes de la
            clase.
          </p>

          {whatsappGroupUrl ? (
            <>
              <p className="mt-5 text-sm font-semibold text-slate-500">
                Te estamos redirigiendo automáticamente…
              </p>
              <a
                href={whatsappGroupUrl}
                className="mt-7 inline-flex min-h-14 items-center justify-center rounded-xl bg-emerald-600 px-7 py-3 text-sm font-black uppercase text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                Unirme al grupo de WhatsApp
              </a>
            </>
          ) : (
            <p className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-950">
              El enlace del grupo no está disponible en este momento. Te
              enviaremos el acceso al correo y WhatsApp registrados.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
