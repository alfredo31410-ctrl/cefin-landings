"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { META_CURRENCY, META_PIXEL_ID } from "@/lib/meta-pixel";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

// Reemplazar cuando Hotmart tenga la liga final de Sistema 360.
const PAYMENT_URL =
  "https://pay.hotmart.com/Y105942158X?off=57a4x11n&checkoutMode=10&bid=1779461792632";
const PRODUCT_NAME = "Sistema 360°: Asesor Contable | CEFIN";
const PRODUCT_VALUE = 9987;
const PRICE = "$9,987";
const HERO_IMAGE_URL = "https://cefin-landings-z9uk.vercel.app/alfredo.png";
const ENROLLMENT_DEADLINE = new Date("2026-06-01T00:00:00-06:00");

const courses = [
  "Seminario Práctico de NIF del Activo",
  "Seminario Práctico de NIF del Pasivo y Capital",
  "Seminario Práctico de NIF de Ingresos, Costos y Gastos",
  "Contabilidad Avanzada",
  "Elaboración y Análisis de Estados Financieros",
  "Contabilidad de Costos e Inventarios",
  "Normas de Sustentabilidad CINIF",
  "Depreciaciones y Deducción de Inversiones",
];

const highlights = [
  "Deja de solo registrar operaciones y aprende a interpretar el negocio.",
  "Convierte NIF, costos y estados financieros en asesoría con criterio.",
  "Responde con seguridad, cobra mejor y deja de sentir que improvisas.",
];

const transformationPoints = [
  "Leerás los estados financieros para detectar riesgos, oportunidades y decisiones que el cliente sí necesita.",
  "Conectarás NIF, costos, inventarios, depreciaciones y sustentabilidad en una visión contable completa.",
  "Pasarás de entregar números a explicar qué significan y qué hacer con ellos.",
];

type DeadlineState = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isClosed: boolean;
};

function getDeadlineState(): DeadlineState {
  const remainingMs = ENROLLMENT_DEADLINE.getTime() - Date.now();

  if (remainingMs <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isClosed: true,
    };
  }

  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    isClosed: false,
  };
}

function DeadlineCountdown() {
  const [deadlineState, setDeadlineState] = useState(getDeadlineState);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDeadlineState(getDeadlineState());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const countdownItems = [
    { label: "Días", value: deadlineState.days },
    { label: "Horas", value: deadlineState.hours },
    { label: "Min", value: deadlineState.minutes },
    { label: "Seg", value: deadlineState.seconds },
  ];

  return (
    <div className="rounded-[1.6rem] border-2 border-orange-400 bg-black/82 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur sm:p-5">
      <p className="text-sm font-black uppercase leading-tight text-yellow-300">
        {deadlineState.isClosed
          ? "La inscripción ya cerró"
          : "Inscripción disponible solo hasta el 31 de mayo de 2026"}
      </p>
      <p className="mt-1 text-sm font-semibold text-white/70">
        Cierre exacto: 31 de mayo de 2026, 11:59 PM (hora CDMX).
      </p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {countdownItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-yellow-300/20 bg-white/[0.08] px-2 py-3 text-center"
          >
            <p className="text-2xl font-black leading-none text-white sm:text-3xl">
              {item.value}
            </p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-yellow-300">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Sistema360InscripcionPage() {
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
      content_category: "Programa",
      value: PRODUCT_VALUE,
      currency: META_CURRENCY,
    });
  };

  useEffect(() => {
    document.title = "Sistema 360°: Asesor Contable | CEFIN";

    trackEvent("ViewContent", {
      content_name: PRODUCT_NAME,
      content_category: "Programa",
      value: PRODUCT_VALUE,
      currency: META_CURRENCY,
    });
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-sistema-360-inscripcion"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#060606] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#060606_0%,#12100a_36%,#070707_68%,#111111_100%)]" />
          <div className="absolute left-[-9%] top-[8%] h-24 w-[52%] -rotate-[24deg] bg-orange-500 sm:top-[18%] sm:h-32" />
          <div className="absolute left-[-14%] top-[13%] h-5 w-[60%] -rotate-[22deg] bg-[#111]" />
          <div className="absolute right-[-10%] top-[-2%] h-28 w-[50%] -rotate-[18deg] bg-orange-500 sm:h-40" />
          <div className="absolute right-[-6%] top-[11%] h-7 w-[46%] -rotate-[16deg] bg-black" />
          <div className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:4px_4px]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.96)_0%,rgba(6,6,6,0.74)_42%,rgba(6,6,6,0.25)_68%,rgba(6,6,6,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#060606] via-[#060606]/88 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[52%] lg:block">
          <img
            src={HERO_IMAGE_URL}
            alt="Mtro. Alfredo Cobos"
            className="absolute bottom-0 right-[4%] h-[94%] w-auto max-w-none object-contain object-bottom"
          />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#060606] via-[#060606]/72 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 lg:hidden">
          <img
            src={HERO_IMAGE_URL}
            alt="Mtro. Alfredo Cobos"
            className="absolute right-[-17%] top-[7.5rem] h-[32rem] w-auto max-w-none object-contain opacity-70 sm:right-[-7%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,6,6,0.08)_0%,rgba(6,6,6,0.48)_30%,rgba(6,6,6,0.96)_68%,#060606_100%)]" />
        </div>

        <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <p className="text-2xl font-black tracking-tight">CEFIN</p>
          <a
            href={PAYMENT_URL}
            onClick={handleCheckoutClick}
            className="hidden rounded-full border border-yellow-300 bg-yellow-300 px-6 py-3 text-sm font-black uppercase text-black transition hover:scale-[1.02] hover:bg-yellow-200 md:inline-flex"
          >
            Quiero ser asesor 360°
          </a>
        </header>

        <section className="relative z-30 mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl gap-10 px-6 pb-14 pt-5 lg:grid-cols-12 lg:items-center lg:px-10">
          <div className="lg:col-span-7">
            <div className="mb-6 max-w-2xl lg:hidden">
              <DeadlineCountdown />
            </div>

            <p className="text-base font-black uppercase text-white/92 sm:text-2xl">
              Sistema 360°:
            </p>

            <h1 className="mt-2 text-5xl font-black uppercase leading-[0.86] tracking-tight text-yellow-300 sm:text-7xl lg:text-8xl">
              Asesor
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Contable
              </span>
            </h1>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-white/70 sm:text-sm">
              Impartido por el Mtro. Alfredo Cobos
            </p>

            <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/82 sm:text-xl">
              Transforma tu forma de ejercer: deja de ser el contador que solo
              entrega reportes y conviértete en el asesor que interpreta,
              explica y guía decisiones con seguridad.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={PAYMENT_URL}
                onClick={handleCheckoutClick}
                className="inline-flex w-fit rounded-2xl bg-yellow-300 px-6 py-4 text-center text-lg font-black uppercase leading-tight text-black shadow-[0_18px_60px_rgba(250,204,21,0.26)] transition hover:scale-[1.01] hover:bg-yellow-200 sm:px-8 sm:text-2xl"
              >
                Quiero transformar mi asesoría
              </a>
              <p className="max-w-xs text-sm font-black uppercase leading-tight tracking-[0.14em] text-orange-200">
                Última oportunidad: cierra el 31 de mayo de 2026
              </p>
            </div>

            <div className="mt-10 max-w-4xl rounded-[1.8rem] border-2 border-yellow-300 bg-black/70 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur sm:p-7">
              <div className="mx-auto -mt-12 flex w-fit items-center gap-4 rounded-full border-2 border-yellow-300 bg-yellow-300 px-5 py-3 text-black shadow-[0_16px_40px_rgba(0,0,0,0.32)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black text-2xl font-black">
                  +
                </span>
                <span className="max-w-[14rem] text-base font-black uppercase leading-[0.92]">
                  Nuestros mejores cursos contables
                </span>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2 md:gap-x-7">
                {courses.map((course, index) => (
                  <div
                    key={course}
                    className={`flex gap-3 text-base font-bold leading-[1.04] text-white ${
                      index === 4 ? "md:border-l md:border-yellow-300 md:pl-7" : ""
                    } ${index > 4 ? "md:border-l md:border-yellow-300 md:pl-7" : ""}`}
                  >
                    <span className="text-yellow-300">{index + 1}.</span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="self-end lg:col-span-5 lg:pl-8">
            <div className="grid gap-5 pt-[24rem] sm:pt-[30rem] lg:pt-0">
              <div className="hidden lg:block">
                <DeadlineCountdown />
              </div>

              <div className="rounded-[1.8rem] border-2 border-yellow-300 bg-black/76 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur">
                <p className="border-b-2 border-yellow-300 pb-2 text-lg font-black uppercase leading-none text-white">
                  Inversión por participante:
                </p>
                <p className="mt-4 text-5xl font-black italic tracking-tight text-white sm:text-6xl">
                  {PRICE}
                  <span className="ml-2 text-xl uppercase text-yellow-300">
                    MXN.
                  </span>
                </p>

                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-yellow-300 px-6 py-4 text-center text-base font-black uppercase text-black transition hover:scale-[1.01] hover:bg-yellow-200"
                >
                  Sí, quiero el Sistema 360°
                </a>
                <p className="mt-3 text-center text-sm font-bold text-orange-100">
                  Inscríbete antes del 31 de mayo y entra a la ruta completa.
                </p>
              </div>

              <div className="space-y-4 px-2">
                <p className="text-2xl font-black uppercase italic leading-[0.98] text-white">
                  <span className="text-yellow-300">6 meses</span> del Factor
                  CEFIN para preguntas y respuestas en vivo
                </p>
                <div className="rounded-xl bg-yellow-300 px-4 py-2 text-center text-sm font-black uppercase text-black">
                  Además, te llevas gratis:
                </div>
                <p className="flex gap-3 text-lg font-black leading-tight text-white">
                  <span className="text-yellow-300">+</span>
                  <span>
                    Norma IA: Agente de Inteligencia Artificial para dudas
                    contables
                  </span>
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="relative z-30 border-t border-yellow-300/20 bg-black/58">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-yellow-300">
                  La transformación
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
                  Fórmate para asesorar con una visión contable 360°.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-300/16 bg-white/[0.06] p-5 text-base font-bold leading-relaxed text-white/84 backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {transformationPoints.map((item, index) => (
                <article
                  key={item}
                  className="rounded-[1.5rem] border border-orange-300/18 bg-black/62 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur"
                >
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                    Resultado {index + 1}
                  </p>
                  <p className="mt-3 text-lg font-bold leading-relaxed text-white">
                    {item}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 grid gap-5 rounded-[1.8rem] border-2 border-yellow-300 bg-yellow-300 p-6 text-black shadow-[0_24px_90px_rgba(0,0,0,0.32)] lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em]">
                  Cierre de inscripción
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase leading-tight sm:text-4xl">
                  Después del 31 de mayo de 2026 esta oferta deja de estar
                  disponible.
                </h3>
              </div>
              <a
                href={PAYMENT_URL}
                onClick={handleCheckoutClick}
                className="inline-flex items-center justify-center rounded-2xl bg-black px-8 py-5 text-center text-base font-black uppercase text-white transition hover:scale-[1.01] hover:bg-zinc-900"
              >
                Tomar mi lugar ahora
              </a>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-lg font-semibold text-white/68">
                Accede a la ruta de cursos contables, el acompañamiento del
                Factor CEFIN y el bono de IA para resolver dudas contables.
              </p>
              <a
                href={PAYMENT_URL}
                onClick={handleCheckoutClick}
                className="inline-flex items-center justify-center rounded-2xl bg-yellow-300 px-8 py-5 text-base font-black uppercase text-black transition hover:scale-[1.01] hover:bg-yellow-200"
              >
                Quiero asesorar con seguridad
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
