"use client";

import Image from "next/image";
import alfredoImage from "@/public/honorarios-contables/alfredo-honorarios-contables.png";
import { createPlataformasWhatsAppIntent } from "@/lib/plataformas-tracking-session";
import { landingConfig as config } from "../config";

function CampaignBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(77,89,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(77,89,255,.07)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-blue-700/20 blur-[110px]" />
      <div className="absolute -right-24 top-56 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
    </div>
  );
}

function CampaignHeader() {
  return (
    <header className="relative flex items-center justify-between gap-4">
      <div className="inline-flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/35 bg-blue-500/10 text-sm font-black text-blue-200">
          C
        </span>
        <div>
          <p className="text-base font-black leading-none">CEFIN</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
            Capacitación fiscal y contable
          </p>
        </div>
      </div>
      <p className="hidden text-xs font-black uppercase tracking-[0.18em] text-white/45 sm:block">
        Plataformas Tecnológicas
      </p>
    </header>
  );
}

function InvalidRegistration() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03030a] px-4 py-6 text-white sm:px-6 sm:py-8">
      <CampaignBackground />
      <div className="relative mx-auto w-full max-w-[1240px]">
        <CampaignHeader />
        <section className="mx-auto mt-16 w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:mt-24 sm:p-9">
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
            Volver a la página de registro
          </a>
        </section>
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
    <main className="relative min-h-screen overflow-x-hidden bg-[#03030a] px-4 py-6 text-white sm:px-6 sm:py-8 lg:py-10">
      <CampaignBackground />

      <section className="relative mx-auto w-full max-w-[1240px]">
        <CampaignHeader />

        <div className="mt-9 grid items-center gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,.75fr)] lg:gap-10 xl:gap-14">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-lime-200 sm:text-xs">
                Registro completado
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45 sm:text-xs">
                Paso 2 de 2
              </span>
            </div>

            <h1 className="mt-5 max-w-[760px] text-[2.55rem] font-black uppercase leading-[0.98] tracking-[-0.045em] min-[390px]:text-[2.9rem] min-[412px]:text-[3.05rem] sm:text-[3.75rem] lg:text-[4.2rem] xl:text-[4.7rem]">
              ¡Gracias por registrarte!
            </h1>

            <p className="mt-5 max-w-[680px] text-lg font-bold leading-relaxed text-white sm:text-xl">
              Tus datos fueron registrados correctamente para la clase
              Plataformas Tecnológicas.
            </p>
            <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-white/72 sm:text-base lg:text-lg">
              Ahora solo falta entrar al grupo oficial de WhatsApp para recibir
              la información de acceso, recordatorios y avisos de la clase.
            </p>

            <div className="mt-6 flex max-w-[680px] flex-wrap gap-x-5 gap-y-3 border-y border-white/10 py-4">
              <div className="min-w-[155px] flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">
                  Fecha
                </p>
                <p className="mt-1 text-sm font-black uppercase min-[412px]:text-base">
                  1 de septiembre de 2026
                </p>
              </div>
              <div className="min-w-[145px] flex-1 min-[390px]:border-l min-[390px]:border-white/10 min-[390px]:pl-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">
                  Hora
                </p>
                <p className="mt-1 text-sm font-black uppercase min-[412px]:text-base">
                  11:00 AM · Hora CDMX
                </p>
              </div>
              <div className="w-full min-[540px]:w-auto min-[540px]:border-l min-[540px]:border-white/10 min-[540px]:pl-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">
                  Modalidad
                </p>
                <p className="mt-1 text-sm font-black uppercase min-[412px]:text-base">
                  Clase online en vivo
                </p>
              </div>
            </div>

            {whatsappEnabled ? (
              <a
                href={whatsappRedirectPath}
                onClick={createPlataformasWhatsAppIntent}
                className="mt-7 inline-flex min-h-14 w-full max-w-[680px] items-center justify-center gap-3 rounded-2xl bg-lime-300 px-5 text-center text-sm font-black uppercase tracking-[0.03em] text-[#07111f] shadow-[0_18px_55px_rgba(163,230,53,.2)] transition hover:-translate-y-0.5 hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-200 sm:min-h-16 sm:w-auto sm:px-9 sm:text-base"
              >
                <WhatsAppIcon />
                Entrar al grupo oficial de WhatsApp
              </a>
            ) : (
              <p className="mt-7 max-w-[680px] rounded-2xl border border-orange-300/25 bg-orange-300/10 p-4 text-sm font-bold text-orange-100">
                El grupo oficial todavía no está disponible.
              </p>
            )}

            <p className="mt-4 max-w-[680px] text-center text-sm font-bold leading-relaxed text-lime-100/80 sm:text-left">
              Cuando se abra WhatsApp, toca “Unirme al grupo”.
            </p>
          </div>

          <aside
            className="relative mx-auto w-full max-w-[390px] lg:max-w-none"
            aria-label="Instructor de la clase"
          >
            <div
              className="pointer-events-none absolute inset-x-[8%] bottom-[8%] top-[18%] rounded-full bg-[radial-gradient(circle,rgba(76,94,255,.34),rgba(120,55,220,.14)_48%,transparent_72%)] blur-2xl"
              aria-hidden="true"
            />
            <figure className="relative flex min-h-[285px] flex-col justify-end overflow-hidden min-[390px]:min-h-[320px] sm:min-h-[390px] lg:min-h-[470px]">
              <Image
                src={alfredoImage}
                alt="Mtro. Alfredo Cobos"
                loading="eager"
                fetchPriority="high"
                unoptimized
                className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#03030a] via-[#03030a]/74 to-transparent" />
              <figcaption className="relative z-10 mx-auto mb-1 w-fit px-4 text-center lg:mb-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-300">
                  Nos vemos en clase
                </p>
                <p className="mt-1 text-base font-black sm:text-lg">
                  Mtro. Alfredo Cobos
                </p>
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>
    </main>
  );
}
