"use client";

import { createPlataformasWhatsAppIntent } from "@/lib/plataformas-tracking-session";
import { landingConfig as config } from "../config";

function InvalidRegistration() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#03030a] px-4 py-10 text-white sm:px-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:p-9">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-300">
          Validación de registro
        </p>
        <h1 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl">
          No pudimos confirmar este registro
        </h1>
        <p className="mt-5 leading-relaxed text-white/70">
          El acceso no contiene una confirmación válida o la confirmación ya
          expiró. Regresa al formulario para completar el registro.
        </p>
        <a
          href="/landings/plataformas"
          className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-white px-7 text-sm font-black uppercase text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 sm:w-auto"
        >
          Volver al registro
        </a>
      </div>
    </main>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.82 11.82 0 0012.07 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.16 1.59 5.97L0 24l6.3-1.65a11.87 11.87 0 005.77 1.47h.01c6.57 0 11.91-5.35 11.92-11.92 0-3.18-1.24-6.17-3.48-8.42zM12.08 21.8h-.01a9.88 9.88 0 01-5.03-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 01-1.51-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.89-9.89 9.89zm5.42-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35z" />
    </svg>
  );
}

export default function PlataformasGracias({
  isValidRegistration,
}: {
  isValidRegistration: boolean;
}) {
  if (!isValidRegistration) return <InvalidRegistration />;

  const { whatsappEnabled, whatsappRedirectPath } = config.thankYou;

  return (
    <main className="relative flex min-h-screen items-center overflow-x-hidden bg-[#03030a] px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(77,89,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(77,89,255,.07)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <section className="relative mx-auto w-full max-w-[760px] rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(30,41,99,.72),rgba(8,8,24,.94))] p-5 shadow-[0_30px_100px_rgba(0,0,0,.55)] min-[390px]:p-6 sm:p-10 lg:p-12">
        <div className="inline-flex rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-lime-200 sm:text-xs">
          Paso 2 de 2 · Último paso
        </div>

        <h1 className="mt-5 max-w-2xl text-[2rem] font-black uppercase leading-[1.02] tracking-[-0.035em] min-[390px]:text-[2.25rem] sm:text-5xl lg:text-[3.4rem]">
          Solo falta entrar al grupo oficial de WhatsApp
        </h1>

        <p className="mt-5 text-base font-bold leading-relaxed text-white sm:text-lg">
          Tus datos ya fueron guardados correctamente.
        </p>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base">
          Entra ahora al grupo oficial para recibir el enlace de acceso,
          recordatorios, avisos y materiales de la clase.
        </p>

        {whatsappEnabled ? (
          <a
            href={whatsappRedirectPath}
            onClick={createPlataformasWhatsAppIntent}
            className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-lime-300 px-5 text-center text-sm font-black uppercase tracking-[0.03em] text-[#07111f] shadow-[0_18px_55px_rgba(163,230,53,.2)] transition hover:-translate-y-0.5 hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-200 sm:min-h-16 sm:text-base"
          >
            <WhatsAppIcon />
            Entrar al grupo oficial
          </a>
        ) : (
          <p className="mt-7 rounded-2xl border border-orange-300/25 bg-orange-300/10 p-4 text-sm font-bold text-orange-100">
            El grupo oficial todavía no está disponible.
          </p>
        )}

        <p className="mt-4 text-center text-sm font-bold leading-relaxed text-lime-100/80">
          Cuando se abra WhatsApp, todavía debes tocar “Unirme al grupo”.
        </p>

        <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 min-[430px]:grid-cols-2">
          <div className="rounded-2xl bg-white/[0.055] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">Clase en vivo</p>
            <p className="mt-1 text-sm font-black">1 de septiembre · 11:00 AM</p>
          </div>
          <div className="rounded-2xl bg-white/[0.055] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">Instructor</p>
            <p className="mt-1 text-sm font-black">Mtro. Alfredo Cobos</p>
          </div>
        </div>
      </section>
    </main>
  );
}
