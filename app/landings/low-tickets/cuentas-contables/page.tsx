"use client";

import Script from "next/script";
import { useEffect, type MouseEvent } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const PRICE = 297;
const CTA_LABEL = "INSCRIBIRME YA";

const CHECKOUT_URL =
  "https://pay.hotmart.com/J106299049Q?off=rf1ez41t&checkoutMode=10";

const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";

const ALFREDO_IMAGE_URL = `${ASSET_BASE}/cuentas-contables/alfredo-cuentas-contables.png`;

const outcomes = [
  [
    "01",
    "Identifica cuentas",
    "Reconoce qué cuenta corresponde según el tipo de operación.",
  ],
  [
    "02",
    "Entiende cargos y abonos",
    "Comprende la lógica del debe y el haber sin depender de la memoria.",
  ],
  [
    "03",
    "Registra operaciones",
    "Aplica reglas contables para registrar correctamente en libros y pólizas.",
  ],
  [
    "04",
    "Analiza movimientos",
    "Interpreta el efecto de cada operación en la información financiera.",
  ],
  [
    "05",
    "Gana seguridad",
    "Toma decisiones contables con mayor claridad y confianza.",
  ],
  [
    "06",
    "Refuerza tus bases",
    "Construye fundamentos sólidos para continuar creciendo en contabilidad.",
  ],
];

const lessons = [
  ["Activo", "Qué representa y cómo se comportan sus cuentas."],
  ["Pasivo", "Cómo identificar obligaciones y deudas."],
  ["Capital", "Cómo registrar las aportaciones y resultados."],
  ["Ingresos", "Cómo reconocer las entradas generadas por la operación."],
  [
    "Costos",
    "Cómo identificar los recursos utilizados para producir o vender.",
  ],
  ["Gastos", "Cómo registrar los desembolsos necesarios para operar."],
  ["¿Cuándo se cargan?", "Reglas para identificar movimientos deudores."],
  ["¿Cuándo se abonan?", "Reglas para identificar movimientos acreedores."],
  [
    "Análisis de operaciones",
    "Cómo interpretar cada operación antes de registrarla.",
  ],
  ["Registros contables", "Aplicación práctica mediante ejemplos y pólizas."],
];

const audience = [
  "Eres estudiante y quieres entender contabilidad desde la base.",
  "Eres auxiliar o asistente contable y necesitas reforzar tus fundamentos.",
  "Eres recién egresado y buscas mayor seguridad para registrar operaciones.",
  "Eres contador con experiencia, pero todavía tienes dudas en lo esencial.",
];

const faqs = [
  {
    question: "¿Necesito conocimientos previos de contabilidad?",
    answer:
      "No. La guía comienza desde los fundamentos y explica la lógica de las cuentas paso a paso.",
  },
  {
    question: "¿Qué aprenderé con esta guía?",
    answer:
      "Aprenderás a identificar cuentas, comprender cargos y abonos, analizar operaciones y realizar registros con mayor seguridad.",
  },
  {
    question: "¿Cuándo recibo el acceso?",
    answer:
      "El acceso es inmediato después de confirmar tu pago y podrás revisar el contenido a tu propio ritmo.",
  },
  {
    question: "¿El pago es único?",
    answer:
      "Sí. La inversión es de $297 MXN en un solo pago, sin mensualidades ni cargos recurrentes.",
  },
];

export default function CuentasContablesPage() {
  useEffect(() => {
    document.title = "Cuentas Contables desde Cero | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Cuentas Contables desde Cero",
      content_category: "Contabilidad básica / Fundamentos contables",
      value: PRICE,
      currency: META_CURRENCY,
    });
  }, []);

  const handleCheckout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    trackMetaEvent("InitiateCheckout", {
      content_name: "Cuentas Contables desde Cero",
      content_category: "Guía práctica / Low ticket evergreen",
      value: PRICE,
      currency: META_CURRENCY,
    });

    window.setTimeout(() => {
      window.location.assign(CHECKOUT_URL);
    }, 250);
  };

  return (
    <>
      <Script
        id="meta-pixel-cuentas-contables"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl()}
          alt=""
        />
      </noscript>

      <main className="cuentas-landing overflow-x-hidden bg-[#031a36] text-white">
        <section className="relative isolate min-h-svh overflow-hidden">
          <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_25%,rgba(222,169,61,.24),transparent_30%),linear-gradient(120deg,#021226_0%,#07305a_55%,#03172e_100%)]" />
          <div className="gold-grid absolute inset-0 -z-20 opacity-20" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_bottom,transparent,#031a36)]" />

          <div className="mx-auto flex min-h-svh max-w-[1280px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-10">
            <header className="reveal flex items-center justify-between">
              <div>
                <p className="text-2xl font-black sm:text-3xl">CEFIN</p>

                <p className="mt-1 hidden text-xs leading-tight text-white/50 sm:block">
                  Formación que transforma
                  <br />
                  tu práctica contable
                </p>
              </div>

              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine inline-flex min-h-11 items-center justify-center rounded-md bg-[#e5b84b] px-5 text-xs font-black uppercase text-[#071426] transition hover:-translate-y-0.5 hover:bg-[#f5ce6a]"
              >
                {CTA_LABEL}
              </a>
            </header>

            <div className="grid flex-1 items-center gap-5 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-2">
              <div className="reveal delay-1 order-1 text-center lg:text-left">
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  <span className="rounded-full border border-[#e5b84b]/60 bg-[#e5b84b]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/80 sm:text-xs">
                    Contabilidad básica{" "}
                    <span className="text-[#e5b84b]">
                      / Fundamentos contables
                    </span>
                  </span>

                  <span className="rounded-full border border-[#e5b84b]/60 bg-[#e5b84b]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/80 sm:text-xs">
                    Guía práctica{" "}
                    <span className="text-[#e5b84b]">
                      / Acceso inmediato
                    </span>
                  </span>
                </div>

                <h1 className="mt-6 text-[clamp(3rem,6.5vw,6.4rem)] font-black uppercase leading-[0.86] tracking-normal">
                  Cuentas contables
                  <span className="mt-3 block text-[#e5b84b]">
                    desde cero
                  </span>
                </h1>

                <p className="mt-6 text-xl font-black uppercase text-[#f0c75e] sm:text-2xl">
                  Cargos, abonos y registros sin confusión
                </p>

                <p className="mx-auto mt-3 max-w-[650px] text-lg leading-relaxed text-white/70 lg:mx-0">
                  Aprende la lógica básica para identificar cuentas, registrar
                  operaciones y entender cargos y abonos paso a paso.
                </p>

                <div className="mx-auto mt-7 max-w-[640px] border border-[#e5b84b]/55 bg-[#020d20]/60 p-5 text-left backdrop-blur-md lg:mx-0">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <p className="text-4xl font-black text-[#e5b84b] sm:border-r sm:border-white/15 sm:pr-7">
                      $297 <span className="text-lg text-white">MXN</span>
                    </p>

                    <div>
                      <p className="text-sm text-white/50">Impartido por el</p>

                      <p className="text-lg font-black">Mtro. Alfredo Cobos</p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-lg leading-relaxed text-white/70">
                    Una guía práctica para entender la lógica de las cuentas,
                    los cargos, los abonos y los registros contables.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={CHECKOUT_URL}
                      onClick={handleCheckout}
                      className="cta-shine inline-flex min-h-14 flex-1 items-center justify-center bg-[#e5b84b] px-6 text-sm font-black uppercase text-[#071426] transition hover:-translate-y-1 hover:bg-[#f5ce6a]"
                    >
                      {CTA_LABEL}
                      <span className="ml-3 text-xl">→</span>
                    </a>

                    <a
                      href="#contenido"
                      className="inline-flex min-h-14 items-center justify-center border border-[#e5b84b]/70 px-7 text-sm font-black uppercase transition hover:bg-[#e5b84b]/10 hover:text-[#f0c75e]"
                    >
                      Ver temario
                    </a>
                  </div>
                </div>
              </div>

              <div className="reveal delay-2 relative order-2 mx-auto h-[430px] w-full max-w-[590px] self-end sm:h-[590px] lg:h-[720px]">
                <div className="absolute bottom-[12%] left-1/2 h-[64%] w-[74%] -translate-x-1/2 border border-[#e5b84b]/20 bg-[#c99124]/10" />

                <img
                  src={ALFREDO_IMAGE_URL}
                  alt="Mtro. Alfredo Cobos"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_30px_55px_rgba(0,0,0,.7)] [mask-image:linear-gradient(to_bottom,black_0%,black_91%,transparent_100%)]"
                />
              </div>
            </div>

            <div className="grid border border-[#e5b84b]/30 bg-[#031a36]/90 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Inmediato", "Acceso disponible después de tu compra."],
                ["Práctico", "Ejemplos claros para comprender cada tema."],
                ["Comprensible", "Explicaciones sencillas y sin confusión."],
                ["Flexible", "Aprende a tu ritmo y desde cualquier lugar."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="border-b border-[#e5b84b]/20 px-6 py-5 sm:border-r"
                >
                  <p className="font-black text-[#e5b84b]">{title}</p>

                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contenido" className="bg-[#061c36] text-white">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Qué es esta guía</p>

              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
                Entiende la lógica detrás de cada registro.
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-white/65">
                Es una guía práctica creada para que entiendas la lógica detrás
                de las cuentas contables, los cargos, los abonos y los
                registros.
              </p>

              <p className="mt-4 text-lg font-bold leading-relaxed text-white/75">
                No se trata de memorizar, sino de comprender para que puedas
                analizar cualquier operación con seguridad y claridad.
              </p>
            </div>

            <div className="relative min-h-[390px] overflow-hidden border border-[#e5b84b]/25 bg-[#03152d] p-7 sm:p-10">
              <div className="absolute right-[-7%] top-[-9%] h-44 w-44 rotate-12 border-[28px] border-[#e5b84b]/10" />

              <div className="relative mx-auto max-w-[520px]">
                <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-[#e5b84b]">
                  Naturaleza de las cuentas
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="border border-[#e5b84b]/30 bg-[#08294d] p-6 text-center">
                    <p className="text-sm font-black uppercase text-white/55">
                      Debe
                    </p>

                    <p className="mt-4 text-5xl font-black text-[#e5b84b]">
                      +
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      Comprende cuándo cargar una cuenta.
                    </p>
                  </div>

                  <div className="border border-[#e5b84b]/30 bg-[#08294d] p-6 text-center">
                    <p className="text-sm font-black uppercase text-white/55">
                      Haber
                    </p>

                    <p className="mt-4 text-5xl font-black text-[#e5b84b]">
                      −
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      Comprende cuándo abonar una cuenta.
                    </p>
                  </div>
                </div>

                <div className="mt-5 border border-[#e5b84b]/20 bg-[#020d20] p-5 text-center">
                  <p className="font-black text-[#e5b84b]">
                    Analiza primero. Registra después.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[#031a36] text-white">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="eyebrow">Lo que vas a lograr</p>

              <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                De registrar por intuición a comprender la lógica contable.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
                Construye fundamentos sólidos para registrar operaciones con
                mayor seguridad, precisión y claridad.
              </p>
            </div>

            <div className="mt-14 grid border-l border-t border-[#e5b84b]/20 sm:grid-cols-2 lg:grid-cols-3">
              {outcomes.map(([number, title, text]) => (
                <article
                  key={number}
                  className="group border-b border-r border-[#e5b84b]/20 bg-[#061f3e] p-7 transition duration-500 hover:bg-[#0b2d52] sm:p-9"
                >
                  <p className="text-sm font-black tracking-[0.2em] text-[#e5b84b]">
                    {number}
                  </p>

                  <h3 className="mt-9 text-2xl font-black transition group-hover:text-[#f5ce6a]">
                    {title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-white/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA intermedio */}
        <section className="relative overflow-hidden bg-[#061c36] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="gold-grid absolute inset-0 opacity-10" />
          <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#e5b84b]/15 blur-3xl" />
          <div className="absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[#c99124]/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1160px] overflow-hidden border border-[#e5b84b]/35 bg-[linear-gradient(120deg,#04162d_0%,#0b2f55_54%,#062546_100%)] p-7 shadow-[0_28px_70px_rgba(0,0,0,.3)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:p-12">
            <div className="absolute inset-y-0 right-0 hidden w-[34%] bg-[linear-gradient(135deg,transparent_0%,rgba(229,184,75,.1)_100%)] lg:block" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-[#e5b84b]/55 bg-[#e5b84b]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f5ce6a]">
                  Domina la base antes de avanzar
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                  Claridad · Práctica · Seguridad
                </span>
              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl">
                No memorices cargos y abonos.
                <span className="mt-2 block text-[#e5b84b]">
                  Entiende la lógica y registra con seguridad.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                Aprende a identificar cada cuenta, analizar operaciones y
                registrar con mayor claridad, incluso cuando enfrentes casos que
                antes te generaban dudas.
              </p>
            </div>

            <div className="relative mt-8 w-full border border-[#e5b84b]/35 bg-[#020d20]/70 p-6 text-center backdrop-blur sm:p-7 lg:mt-0 lg:w-[300px]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Acceso inmediato
              </p>

              <p className="mt-2 text-4xl font-black text-[#e5b84b] sm:text-5xl">
                $297 MXN
              </p>

              <p className="mt-3 text-sm font-bold text-white/65">
                Pago único · Sin mensualidades
              </p>

              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine mt-6 inline-flex min-h-14 w-full items-center justify-center bg-[#e5b84b] px-6 text-sm font-black uppercase text-[#071426] transition hover:-translate-y-1 hover:bg-[#f5ce6a] sm:text-base"
              >
                {CTA_LABEL}
                <span className="ml-3 text-2xl">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0e8] text-[#071a3f]">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Qué aprenderás</p>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Los fundamentos para comprender cualquier registro contable.
              </h2>

              <div className="mt-10 grid border-l border-t border-[#b88828]/25 sm:grid-cols-2 lg:grid-cols-3">
                {lessons.map(([title, text], index) => (
                  <article
                    key={title}
                    className="border-b border-r border-[#b88828]/25 bg-white/55 p-5 transition hover:bg-white"
                  >
                    <span className="text-xs font-black text-[#a3741f]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-5 text-lg font-black">{title}</h3>

                    <p className="mt-2 text-sm leading-relaxed text-black/55">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="border border-[#b88828]/25 bg-[#071d38] p-7 text-white sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e5b84b]">
                Ideal para ti si...
              </p>

              <h3 className="mt-4 text-3xl font-black">
                Quieres comprender lo esencial con mayor seguridad.
              </h3>

              <div className="mt-7 space-y-5">
                {audience.map((item) => (
                  <div key={item} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e5b84b] text-xs font-black text-[#071426]">
                      ✓
                    </span>

                    <p className="font-semibold leading-relaxed text-white/70">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-[#031a36] text-white">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:px-10">
            <div className="relative overflow-hidden border border-[#e5b84b]/25 bg-[#061f3e] p-7 sm:p-10">
              <div className="gold-grid absolute inset-0 opacity-10" />

              <div className="relative">
                <h2 className="text-center text-3xl font-black uppercase sm:text-4xl">
                  De registrar por memoria o intuición
                  <span className="mt-2 block text-[#e5b84b]">
                    a entender la lógica contable
                  </span>
                </h2>

                <div className="mt-9 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                  <div className="border border-white/10 bg-[#03152d] p-6">
                    <p className="text-center text-sm font-black uppercase tracking-[0.18em] text-white/55">
                      Antes
                    </p>

                    <ul className="mt-5 space-y-3 text-white/70">
                      <li>× Tienes dudas en cada operación.</li>
                      <li>× Dependes de otros para validar.</li>
                      <li>× Realizas registros inconsistentes.</li>
                      <li>× No tienes claridad en los reportes.</li>
                    </ul>
                  </div>

                  <span className="text-center text-6xl font-black text-[#e5b84b]">
                    ›
                  </span>

                  <div className="bg-[#e5b84b] p-6 text-[#071426]">
                    <p className="text-center text-sm font-black uppercase tracking-[0.18em]">
                      Después
                    </p>

                    <ul className="mt-5 space-y-3 font-semibold">
                      <li>✓ Comprendes la lógica contable.</li>
                      <li>✓ Registras con confianza y precisión.</li>
                      <li>✓ Analizas operaciones con claridad.</li>
                      <li>✓ Tomas mejores decisiones.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="comprar" className="relative overflow-hidden bg-[#031a36]">
          <div className="gold-grid absolute inset-0 opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(229,184,75,.18),transparent_30%)]" />

          <div className="relative mx-auto grid max-w-[1120px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-10 lg:py-24">
            <div className="text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#e5b84b]">
                Tu base contable sólida empieza hoy
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-6xl">
                Entiende. Aplica. Crece.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-white/65">
                Aprende a identificar cuentas, comprender cargos y abonos y
                registrar operaciones con mayor seguridad.
              </p>
            </div>

            <div className="border border-[#e5b84b]/30 bg-[#020d20]/60 p-6 text-center backdrop-blur sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Precio especial
              </p>

              <p className="mt-2 text-5xl font-black text-[#e5b84b] sm:text-6xl">
                $297 MXN
              </p>

              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine mt-7 inline-flex min-h-16 w-full items-center justify-center bg-[#e5b84b] px-7 text-lg font-black uppercase text-[#071426] transition hover:-translate-y-1 hover:bg-[#f5ce6a]"
              >
                {CTA_LABEL}
                <span className="ml-4 text-2xl">→</span>
              </a>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-white/45">
                Pago seguro · Acceso inmediato y de por vida
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0e8] text-[#071a3f]">
          <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-24">
            <p className="eyebrow text-center">Preguntas frecuentes</p>

            <h2 className="mt-4 text-center text-4xl font-black sm:text-5xl">
              Antes de comenzar
            </h2>

            <div className="mt-10 border-t border-[#08285c]/15">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border-b border-[#08285c]/15 py-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                    {faq.question}

                    <span className="text-2xl text-[#b18124] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="max-w-3xl pt-4 leading-relaxed text-black/60">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-[#e5b84b]/15 bg-[#020d20]">
          <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-3 px-5 py-7 text-center text-sm text-white/40 sm:flex-row sm:px-8 sm:text-left">
            <span className="text-xl font-black text-white">CEFIN</span>

            <p>Fundamentos sólidos para crecer en contabilidad.</p>

            <a
              href="https://cefin.mx"
              className="font-bold transition hover:text-white"
            >
              cefin.mx
            </a>
          </div>
        </footer>

        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          .gold-grid {
            background-image:
              linear-gradient(
                rgba(229, 184, 75, 0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(229, 184, 75, 0.08) 1px,
                transparent 1px
              );
            background-size: 48px 48px;
          }

          .eyebrow {
            color: #b18124;
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .reveal {
            animation: cuentas-reveal 0.85s cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          .delay-1 {
            animation-delay: 0.12s;
          }

          .delay-2 {
            animation-delay: 0.22s;
          }

          .cta-shine {
            position: relative;
            overflow: hidden;
          }

          .cta-shine::after {
            position: absolute;
            inset: 0;
            content: "";
            background: linear-gradient(
              110deg,
              transparent 20%,
              rgba(255, 255, 255, 0.4) 48%,
              transparent 74%
            );
            transform: translateX(-140%);
            animation: cuentas-shine 4.6s ease-in-out infinite;
          }

          @keyframes cuentas-reveal {
            from {
              opacity: 0;
              transform: translateY(28px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes cuentas-shine {
            0%,
            66% {
              transform: translateX(-140%);
            }

            92%,
            100% {
              transform: translateX(140%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }

            .reveal,
            .cta-shine::after {
              animation: none;
            }
          }
        `}</style>
      </main>
    </>
  );
}