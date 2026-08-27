import { landingConfig as config } from "../config";

export default function ThankYou({
  valid,
  whatsappGroupUrl,
}: {
  valid: boolean;
  whatsappGroupUrl: string | null;
}) {
  if (!valid) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111827] px-4 py-12 text-white">
        <section className="w-full max-w-xl rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 text-center sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-300">
            Verificación de registro
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            No pudimos confirmar este registro
          </h1>
          <p className="mt-4 leading-relaxed text-slate-300">
            La comprobación falta, expiró o ya no es válida. Vuelve a la página de
            registro para intentarlo nuevamente.
          </p>
          <a
            href={config.routes.root}
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-black uppercase text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Volver al registro
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4f8] px-4 py-8 text-slate-950 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
        <header className="flex items-center justify-between gap-4 bg-[#111827] px-6 py-5 text-white sm:px-9">
          <span className="text-2xl font-black tracking-[-0.06em]">CEFIN</span>
          <span className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-pink-200 sm:text-xs">
            Registro confirmado
          </span>
        </header>
        <section className="px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-black text-emerald-700">
            ✓
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
            Tu registro fue confirmado
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
            Ya reservamos tus datos para la clase gratuita “{config.title}”.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-[#faf8fb] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c21870]">
                Revisa tu correo
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Ahí enviaremos la información de acceso y los recordatorios de la
                transmisión.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-[#faf8fb] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c21870]">
                Revisa tu WhatsApp
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                También usaremos el número registrado para enviarte indicaciones
                relacionadas con la clase.
              </p>
            </article>
          </div>

          <p className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-relaxed text-amber-950">
            Si no encuentras el mensaje, revisa las carpetas de spam, correo no
            deseado o promociones.
          </p>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-500">
              {config.date.visible} · {config.date.time} · {config.date.timeZoneLabel}
            </p>
            <p className="mt-1 font-black">{config.modality}</p>
            {whatsappGroupUrl ? (
              <a
                href={whatsappGroupUrl}
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                Unirme al grupo de WhatsApp
              </a>
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                Te enviaremos por correo y WhatsApp la información necesaria
                para acceder a la clase.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
