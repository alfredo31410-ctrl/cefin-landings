"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const ACTIVE_CAMPAIGN_FORM_ID = 183;
const FORM_CLASS = `_form_${ACTIVE_CAMPAIGN_FORM_ID}`;

export default function ResicoPersonasFisicasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trackEvent = (
    event: string,
    data?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (data && options) {
      window.fbq("track", event, data, options);
      return;
    }

    if (data) {
      window.fbq("track", event, data);
      return;
    }

    window.fbq("track", event);
  };

  useEffect(() => {
    document.title = "RESICO Personas Físicas | Clase Gratuita en Vivo | CEFIN";
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    trackEvent("InitiateCheckout", {
      content_name: "RESICO Personas Físicas | Apertura de formulario",
      content_category: "Clase gratuita",
    });

    const oldScript = document.getElementById("ac-script-loader");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = "ac-script-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${ACTIVE_CAMPAIGN_FORM_ID}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
  }, [isModalOpen]);

  return (
    <>
      <Script
        id="meta-pixel-resico-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof fbq !== 'undefined') {
              fbq('track', 'PageView');
              fbq('trackCustom', 'ResicoLandingView', {
                content_name: 'RESICO Personas Físicas | Landing'
              });
            }
          `,
        }}
      />

      <Script
        id="meta-pixel-resico-landing-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1485908226564541');
            fbq('track', 'PageView');
            fbq('trackCustom', 'ResicoLandingView', {
              content_name: 'RESICO Personas Fisicas | Landing'
            });
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1485908226564541&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <main className="relative min-h-screen overflow-x-hidden bg-[#09090f] text-white">
        {/* Fondo base */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#09090f,#12111a,#09090f)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:26px_26px]" />

          <div
            className="absolute left-[-10%] top-[5%] h-[300px] w-[300px] rounded-full opacity-40 blur-[100px] sm:h-[500px] sm:w-[500px]"
            style={{
              background:
                "radial-gradient(circle, rgba(217,70,239,0.45) 0%, transparent 70%)",
            }}
          />

          <div
            className="absolute right-[-8%] top-[10%] h-[240px] w-[240px] rounded-full opacity-30 blur-[100px] sm:h-[340px] sm:w-[340px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Imagen de fondo desktop */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
          <img
            src="https://cefin-landings-z9uk.vercel.app/resico/marisol-resico.png"
            alt="Marisol Galván"
            className="absolute bottom-0 right-[8%] h-[92%] w-auto max-w-none object-contain opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090f] via-[#09090f]/58 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090f] via-[#09090f]/90 to-transparent" />
        </div>

        {/* Imagen de fondo mobile/tablet */}
        <div className="pointer-events-none absolute inset-0 z-10 lg:hidden">
          <img
            src="https://cefin-landings-z9uk.vercel.app/resico/marisol-resico.png"
            alt="Marisol Galván"
            className="absolute inset-0 h-full w-full object-cover object-[center_top] opacity-80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,6,12,0.58)_0%,rgba(8,8,16,0.64)_22%,rgba(10,10,18,0.60)_48%,rgba(9,9,15,0.84)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#09090f] via-[#09090f]/95 to-transparent" />
        </div>

        {/* Header */}
        <header className="relative z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-1 rounded-full bg-gradient-to-b from-fuchsia-500 to-violet-500" />
              <div>
                <p className="text-2xl font-black tracking-tight">CEFIN</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Formación contable y fiscal
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/15 md:inline-flex"
            >
              Registrarme
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="relative z-30">
          <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 pb-12 pt-6 lg:px-10 lg:pb-16">
            <div className="w-full max-w-3xl space-y-6">
              <div className="inline-flex items-center rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-fuchsia-200">
                Clase gratuita totalmente en vivo
              </div>

              <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[7.5rem]">
                RESICO
              </h1>

              <h2 className="mt-[-6px] text-xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
                Personas Físicas
              </h2>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70 sm:text-base">
                Impartido por Marisol Galván
              </p>

              <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Una clase diseñada para contadores que necesitan entender con claridad
                cómo aplicar RESICO en personas físicas, detectar errores comunes y
                explicar este régimen con más seguridad frente a sus clientes.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-xl">
                    📅
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                      Fecha
                    </p>
                    <p className="text-lg font-black text-white">28 de abril</p>
                  </div>
                </div>

                <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/20 text-xl">
                    ⏰
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                      Hora
                    </p>
                    <p className="text-lg font-black text-white">11:00 AM (CDMX)</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-500 to-violet-600 px-8 py-5 text-base font-black uppercase tracking-tight text-white shadow-[0_18px_50px_rgba(168,85,247,0.38)] transition hover:scale-[1.01] hover:shadow-[0_22px_65px_rgba(168,85,247,0.5)] active:scale-[0.98] sm:text-lg"
                >
                  Quiero mi lugar gratis
                </button>

                <p className="text-sm font-semibold text-white/65">
                  Cupo limitado para la sesión en vivo.
                </p>
              </div>

              <div className="grid gap-4 pt-2 sm:grid-cols-2">
                {[
                  "Entiende cuándo sí aplica RESICO PF y cuándo no.",
                  "Evita errores comunes que le cuestan dinero al cliente.",
                  "Aprende a explicarlo con criterio y seguridad.",
                  "Llévate claridad práctica, no teoría suelta.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-white/80 backdrop-blur"
                  >
                    <span className="mr-2 text-fuchsia-400">●</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bloque de conexión */}
        <section className="relative z-30 border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-fuchsia-300">
                  ¿Por qué entrar a esta clase?
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Porque entender RESICO no es lo mismo que saber aplicarlo.
                </h3>
              </div>

              <div className="space-y-5 lg:col-span-7">
                <p className="text-lg leading-relaxed text-white/75">
                  Muchos contadores han leído sobre el régimen, pero cuando llega
                  el momento de revisar casos reales, dar una recomendación o
                  explicarle algo al cliente, aparece la duda.
                </p>
                <p className="text-lg leading-relaxed text-white/75">
                  Esta clase está pensada para darte una base más clara, más
                  práctica y más útil para trabajar RESICO Personas Físicas con
                  criterio profesional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="relative z-30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.03] p-8 shadow-2xl backdrop-blur md:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-violet-300">
                    Reserva tu lugar
                  </p>
                  <h4 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Clase gratuita en vivo para contadores
                  </h4>
                  <p className="mt-2 max-w-2xl text-white/70">
                    Regístrate ahora y asegura tu acceso a la sesión de RESICO
                    Personas Físicas.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-black uppercase tracking-tight text-[#111827] transition hover:scale-[1.01] active:scale-[0.98]"
                >
                  Registrarme gratis
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-30 border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center text-sm text-white/45 lg:px-10">
            <p className="font-black tracking-[0.25em]">CEFIN</p>
            <p>Formación práctica para contadores que quieren trabajar con más seguridad.</p>
          </div>
        </footer>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05050a]/85 p-3 backdrop-blur-md sm:p-4">
            <div className="relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 text-2xl font-bold text-slate-400 transition hover:text-slate-900"
                aria-label="Cerrar modal"
              >
                ×
              </button>

              <div className="shrink-0 px-5 pb-4 pt-7 text-center sm:px-8 sm:pb-5 sm:pt-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-fuchsia-600">
                  Clase gratuita
                </p>
                <h5 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
                  RESICO Personas Físicas
                </h5>
                <p className="mt-2 text-sm text-slate-500">
                  Completa tus datos para asegurar tu lugar.
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-8 sm:pb-8">
                <div className="min-h-[420px]">
                  <div className={FORM_CLASS}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .${FORM_CLASS} {
            background: transparent !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 430px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .${FORM_CLASS} form {
            margin: 0 auto !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 430px !important;
            background: transparent !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .${FORM_CLASS} ._form-content {
            margin: 0 !important;
            padding: 0 !important;
          }

          .${FORM_CLASS} ._form-content,
          .${FORM_CLASS} ._form_element,
          .${FORM_CLASS} ._field-wrapper {
            width: 100% !important;
            max-width: 100% !important;
          }

          .${FORM_CLASS},
          .${FORM_CLASS} ._form-content,
          .${FORM_CLASS} ._form-body,
          .${FORM_CLASS} ._inline-style,
          .${FORM_CLASS} ._form-thank-you {
            background: transparent !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .${FORM_CLASS} ._form_element,
          .${FORM_CLASS} ._field-wrapper,
          .${FORM_CLASS} ._button-wrapper {
            margin: 0 0 14px 0 !important;
          }

          .${FORM_CLASS} ._form-title,
          .${FORM_CLASS} ._form-branding {
            display: none !important;
          }

          .${FORM_CLASS} p {
            margin: 0 0 14px 0 !important;
            color: #334155 !important;
            font-size: 14px !important;
            line-height: 1.65 !important;
          }

          .${FORM_CLASS} ._form-label {
            display: block !important;
            color: #334155 !important;
            font-size: 13px !important;
            font-weight: 700 !important;
            margin-bottom: 6px !important;
          }

          .${FORM_CLASS} input[type="text"],
          .${FORM_CLASS} input[type="email"],
          .${FORM_CLASS} input[type="tel"],
          .${FORM_CLASS} select,
          .${FORM_CLASS} textarea {
            width: 100% !important;
            border-radius: 16px !important;
            border: 1px solid #e5e7eb !important;
            background: #f8fafc !important;
            padding: 14px 16px !important;
            color: #0f172a !important;
            font-size: 15px !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .${FORM_CLASS} input[type="checkbox"] {
            margin-right: 10px !important;
            transform: translateY(2px);
          }

          .${FORM_CLASS} ._checkbox-radio,
          .${FORM_CLASS} ._checkbox-radio label {
            color: #475569 !important;
            font-size: 13px !important;
            line-height: 1.6 !important;
          }

          .${FORM_CLASS} input:focus,
          .${FORM_CLASS} select:focus,
          .${FORM_CLASS} textarea:focus {
            border-color: #a855f7 !important;
            background: #ffffff !important;
          }

          .${FORM_CLASS} ._submit,
          .${FORM_CLASS} button[type="submit"] {
            width: 100% !important;
            border: 0 !important;
            border-radius: 18px !important;
            background: linear-gradient(90deg, #d946ef 0%, #8b5cf6 100%) !important;
            color: white !important;
            padding: 16px 20px !important;
            font-size: 15px !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.02em !important;
            cursor: pointer !important;
          }
        `}</style>
      </main>
    </>
  );
}
