"use client";

import Script from "next/script";
import { useEffect } from "react";
import { META_CURRENCY, META_PIXEL_ID } from "@/lib/meta-pixel";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const PAYMENT_URL = "https://pay.hotmart.com/N105507797E?off=cl39s5z7&checkoutMode=10"; // <-- cambia esto
const PRODUCT_NAME = "Reto NIF | CEFIN";
const PRODUCT_VALUE = 487; // <-- cambia esto cuando tengas precio
const PRICE = "$487 MXN"; // <-- cambia esto
const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/alfredo.png";

export default function RetoNifSalesPage() {
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (data) {
      window.fbq("track", event, data);
      return;
    }

    window.fbq("track", event);
  };

  const handleCheckoutClick = () => {
    trackEvent("InitiateCheckout", {
      content_name: PRODUCT_NAME,
      content_category: "Curso",
      value: PRODUCT_VALUE,
      currency: META_CURRENCY,
    });
  };

  useEffect(() => {
    document.title = "Reto NIF | CEFIN";

    trackEvent("ViewContent", {
      content_name: PRODUCT_NAME,
      content_category: "Curso",
      value: PRODUCT_VALUE,
      currency: META_CURRENCY,
    });
  }, []);

  const includes = [
    "5 clases en vivo de 2 horas cada una.",
    "Aplicación real de NIF, no teoría suelta.",
    "Criterio profesional para interpretar estados financieros.",
    "Ruta para pasar de contador operativo a asesor estratégico.",
  ];

  const syllabus = [
    {
      label: "Clase 1",
      title: "El verdadero juego de las NIF",
      accent: "from-blue-500 to-cyan-300",
      objective:
        "Romper paradigmas y entender por qué las NIF cambian tu valor en el mercado.",
      topics: [
        "El error del contador tradicional: enfoque solo fiscal.",
        "Contador operativo vs asesor estratégico.",
        "Qué son las NIF y para qué sirven realmente.",
        "Contabilidad financiera vs fiscal.",
        "Información para SAT vs información para decisiones.",
        "Principios de contabilidad, NIF y convergencia internacional.",
        "Estructura de las NIF y marco conceptual NIF A-1.",
      ],
      practice:
        "Identificación de errores comunes y ejercicio para detectar si una contabilidad sirve para tomar decisiones.",
    },
    {
      label: "Clase 2",
      title: "Postulados básicos aplicados",
      accent: "from-violet-500 to-fuchsia-400",
      objective:
        "Entender y aplicar postulados básicos en casos reales donde empieza el criterio profesional.",
      topics: [
        "Qué son los postulados básicos NIF A-2.",
        "Sustancia económica.",
        "Devengación contable.",
        "Asociación de costos y gastos.",
        "Consistencia.",
        "Errores comunes por no aplicarlos.",
        "Impacto fiscal vs impacto contable.",
      ],
      practice:
        "Casos de ingresos incorrectos, gastos no deducibles vs contables y registros bajo sustancia económica.",
    },
    {
      label: "Clase 3",
      title: "Registro contable con NIF",
      accent: "from-emerald-500 to-lime-300",
      objective:
        "Dominar el registro contable con base en NIF, usando lógica y no memoria.",
      topics: [
        "Concepto de cuenta, activo, pasivo y capital.",
        "Reglas de cargo y abono con lógica real.",
        "NIF C-1: efectivo.",
        "NIF C-3: clientes.",
        "NIF C-4: inventarios.",
        "NIF C-6: activo fijo.",
        "NIF C-9 y C-19: pasivos.",
      ],
      practice:
        "Registro de venta, compra, IVA y préstamos, con ejercicio guiado y validación de errores comunes.",
    },
    {
      label: "Clase 4",
      title: "Estados financieros que sí sirven",
      accent: "from-orange-500 to-amber-300",
      objective:
        "Aprender a construir e interpretar estados financieros con criterio y utilidad real.",
      topics: [
        "Que son los estados financieros y para que sirven realmente.",
        "Estado de resultados.",
        "Balance general.",
        "Flujo de efectivo.",
        "Cambios en el capital.",
        "El error de hacer estados financieros sin entenderlos.",
      ],
      practice:
        "Construccion de estado de resultados, interpretacion del negocio y diagnostico financiero basico.",
    },
    {
      label: "Clase 5",
      title: "De contador a asesor estrategico",
      accent: "from-red-500 to-orange-300",
      objective:
        "Convertir el conocimiento de NIF en valor económico real para el contador y sus clientes.",
      topics: [
        "Cómo usar NIF para tomar decisiones.",
        "Cómo asesorar clientes con información financiera.",
        "Cómo cobrar mejor por tu criterio.",
        "Qué sí le importa al cliente: crecer, ganar dinero y entender su negocio.",
        "Conexión entre NIF, estados financieros y estrategia.",
        "Introducción al uso de IA en contabilidad.",
      ],
      practice:
        "Caso completo desde registro, estados financieros e interpretación hasta diagnóstico tipo consultor.",
    },
  ];

  return (
    <>
      <Script
        id="meta-pixel-reto-nif"
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

            if (!window.__cefinMetaPixelInitialized) {
              fbq('init', '${META_PIXEL_ID}');
              window.__cefinMetaPixelInitialized = true;
            }
            fbq('track', 'PageView');
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <main className="relative min-h-screen overflow-x-hidden bg-[#080807] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,193,46,0.38),transparent_24%),radial-gradient(circle_at_12%_84%,rgba(230,115,0,0.42),transparent_24%),linear-gradient(135deg,#090908_0%,#161411_48%,#080807_100%)]" />
          <div className="absolute left-[3%] top-[4%] text-[19rem] font-black uppercase leading-none tracking-[-0.12em] text-amber-300/85 sm:text-[27rem] lg:text-[34rem]">
            NIF
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.78)_0%,rgba(8,8,7,0.48)_45%,rgba(8,8,7,0.7)_100%)]" />
          <div className="absolute left-[-8%] bottom-[-12%] h-[38%] w-[48%] -rotate-6 bg-orange-500/75" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080807] via-[#080807]/78 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[48%] lg:block">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-0 right-[10%] h-[82%] w-auto max-w-none object-contain opacity-95"
          />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#080807] via-[#080807]/80 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 lg:hidden">
          <img
            src={HERO_IMAGE_URL}
            alt="Alfredo Cobos"
            className="absolute bottom-[24%] right-[-24%] h-[46%] w-auto max-w-none object-contain opacity-55"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,8,7,0.42)_0%,rgba(8,8,7,0.72)_56%,rgba(8,8,7,0.96)_100%)]" />
        </div>

        <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
          <div className="text-3xl font-black tracking-tight">CEFIN</div>
          <a
            href={PAYMENT_URL}
            onClick={handleCheckoutClick}
            className="hidden rounded-full bg-amber-300 px-6 py-3 text-sm font-black uppercase tracking-tight text-black transition hover:scale-[1.02] md:inline-flex"
          >
            Inscribirme
          </a>
        </header>

        <section className="relative z-30 mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-14 pt-4 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-7">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-300">
              Oferta activa
            </p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.85] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl xl:text-[8.8rem]">
              Bienvenido
              <br />
              al reto
            </h1>

            <div className="mt-6 inline-flex rounded-full bg-amber-300 px-7 py-3 text-xl font-black text-black sm:text-2xl">
              La base sólida que siempre necesitaste
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">
                  Fecha
                </p>
                <p className="mt-1 text-2xl font-black uppercase text-white">
                  18 al 22 de mayo
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">
                  Horario
                </p>
                <p className="mt-1 text-2xl font-black uppercase text-white">
                  11:00 AM (HORARIO CDMX)
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/78 sm:text-xl">
              Entra al entrenamiento completo para fortalecer tu criterio con NIF,
              leer mejor la información financiera y explicar tus conclusiones con
              más seguridad frente a clientes y equipos.
            </p>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {includes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-amber-300/15 bg-white/[0.06] p-4 text-sm font-semibold text-white/82 backdrop-blur"
                >
                  <span className="mr-2 text-amber-300">+</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={PAYMENT_URL}
                onClick={handleCheckoutClick}
                className="inline-flex items-center justify-center rounded-2xl bg-amber-300 px-9 py-5 text-base font-black uppercase tracking-tight text-black shadow-[0_18px_50px_rgba(251,191,36,0.28)] transition hover:scale-[1.01] hover:bg-amber-200 active:scale-[0.98] sm:text-lg"
              >
                Inscribirme al reto
              </a>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/60">
                Pago seguro por Hotmart
              </p>
            </div>
          </div>

          <aside className="relative z-30 rounded-[2rem] border border-amber-300/18 bg-black/50 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur lg:col-span-5 lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Registro de pago
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-white">
              Entra hoy al programa completo
            </h2>

            <div className="mt-4">
              <p className="text-sm font-black uppercase text-amber-300">
                Hoy puedes entrar por
              </p>
              <p className="mt-1 text-5xl font-black text-white">{PRICE}</p>
            </div>

            <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">
                  Fecha
                </p>
                <p className="mt-1 text-lg font-black uppercase text-white">
                  18 al 22 de mayo
                </p>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">
                  Horario
                </p>
                <p className="mt-1 text-lg font-black uppercase text-white">
                  11:00 AM (HORARIO CDMX)
                </p>
              </div>
            </div>

            <a
              href={PAYMENT_URL}
              onClick={handleCheckoutClick}
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-amber-300 px-7 py-5 text-center text-base font-black uppercase tracking-tight text-black transition hover:scale-[1.01] hover:bg-amber-200 active:scale-[0.98]"
            >
              Finalizar registro
            </a>

            <p className="mt-4 text-sm font-semibold text-white/48">
              Purchase debe dispararse desde Hotmart al completar el pago.
            </p>
          </aside>
        </section>

        <section className="relative z-30 border-t border-white/10 bg-black/30">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-300">
                Temario completo
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-6xl">
                Taller Práctico de NIF
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/68">
                5 clases en vivo de 2 horas por sesión, con enfoque en
                aplicación real, criterio profesional e impacto directo en el
                negocio.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {syllabus.map((item) => (
                <article
                  key={item.label}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur"
                >
                  <div className={`h-2 bg-gradient-to-r ${item.accent}`} />
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">
                          {item.label}
                        </p>
                        <h3 className="mt-2 text-2xl font-black uppercase leading-tight text-white">
                          {item.title}
                        </h3>
                      </div>
                      <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-black uppercase text-amber-200">
                        En vivo
                      </div>
                    </div>

                    <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-amber-300">
                      Objetivo
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-white/72">
                      {item.objective}
                    </p>

                    <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-white/45">
                      Contenido
                    </p>
                    <ul className="mt-3 space-y-2">
                      {item.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex gap-3 text-sm leading-relaxed text-white/72"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                        Parte práctica
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/76">
                        {item.practice}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-[2rem] border border-amber-300/20 bg-gradient-to-r from-amber-300/18 to-orange-500/10 p-6 backdrop-blur sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-200">
                    Entra al taller completo
                  </p>
                  <h3 className="mt-2 text-3xl font-black uppercase leading-tight text-white">
                    Aprende NIF para asesorar, interpretar y cobrar mejor.
                  </h3>
                </div>
                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-300 px-8 py-5 text-base font-black uppercase tracking-tight text-black transition hover:scale-[1.01] hover:bg-amber-200 active:scale-[0.98]"
                >
                  Inscribirme ahora
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
