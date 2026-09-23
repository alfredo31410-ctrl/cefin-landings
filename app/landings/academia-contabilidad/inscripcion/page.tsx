"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const CHECKOUT_URL =
  "https://pay.hotmart.com/J105150710D?off=ciu6d3oe&checkoutMode=10";
const PRODUCT_PRICE = 1987;
const PRODUCT_PRICE_LABEL = "$1,987 MXN";
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/academia-contabilidad/alfredo.png`;
const HERO_BACKGROUND_URL = `${ASSET_BASE}/academia-contabilidad/academia-live-bg.png`;

const COURSE_MODULES = [
  "Introducción y bienvenida al curso",
  "Introducción a la Inteligencia Artificial que usaremos en el curso",
  "Introducción a la contabilidad",
  "Ingresos del Régimen General de Ley",
  "Reglas del cargo y el abono; cuentas de activo, pasivo y capital",
  "Cuentas de resultados y postulados básicos",
  "Primera reunión de trabajo con el cliente",
  "Manejo contable del IVA e introducción a los inventarios",
  "Práctica contable",
  "Requisitos legales de los asientos contables",
  "Práctica contable con facturas y estado de cuenta",
  "Configuración de Aspel COI",
  "Prácticas contables con Aspel COI",
  "Práctica contable con CFDI",
  "Balanza de comprobación y envío al SAT",
  "Contpaqi y Contalink",
  "Cierre del ejercicio y estados financieros",
] as const;

const LEARNING_RESULTS = [
  {
    number: "01",
    title: "Entender la lógica contable",
    text: "Construye una base sólida para comprender cargos, abonos, cuentas y movimientos sin memorizar conceptos aislados.",
  },
  {
    number: "02",
    title: "Llevarlo a la práctica",
    text: "Trabaja con facturas, estados de cuenta, CFDI, IVA e inventarios a través de ejercicios aplicados.",
  },
  {
    number: "03",
    title: "Conocer herramientas reales",
    text: "Acércate a sistemas como Aspel COI, Contpaqi y Contalink para comprender cómo se trabaja en la vida profesional.",
  },
] as const;

const FAQS = [
  [
    "¿Necesito conocimientos previos?",
    "No. La academia está diseñada para comenzar desde cero y avanzar de forma progresiva hacia temas y prácticas contables más completas.",
  ],
  [
    "¿El programa es completamente en línea?",
    "Sí. Puedes estudiar en línea y avanzar a tu ritmo desde cualquier lugar con conexión a internet.",
  ],
  [
    "¿Qué incluye mi inscripción?",
    "Incluye acceso a los 17 módulos de la Academia de Contabilidad Básica y 4 sesiones en vivo del Factor CEFIN para preguntas y respuestas.",
  ],
  [
    "¿Cuándo recibo el acceso?",
    "Después de completar el pago en Hotmart recibirás las indicaciones para acceder a las clases disponibles.",
  ],
  [
    "¿Profe Cobos está incluido?",
    "Es un producto adicional opcional. Puedes agregarlo por $697 MXN desde el checkout antes de completar tu compra.",
  ],
  [
    "¿Puedo pagar a mensualidades?",
    "El checkout muestra opciones de pago de hasta 12 mensualidades. El importe final de cada mensualidad se confirma directamente en Hotmart.",
  ],
] as const;

export default function AcademiaContabilidadInscripcionPage() {
  const [showAllModules, setShowAllModules] = useState(false);

  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "Academia de Contabilidad Básica",
      content_category: "Curso de pago",
      currency: "MXN",
      value: PRODUCT_PRICE,
    });
  }, []);

  const handleCheckoutClick = (source: string) => () => {
    trackMetaCustomEvent("ClickCheckout", {
      content_name: "Academia de Contabilidad Básica",
      funnel_step: "checkout_click",
      lead_stage: "purchase_intent",
      source,
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-academia-contabilidad-inscripcion"
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

      <main className="min-h-screen overflow-x-hidden bg-[#13051f] pb-20 text-white md:pb-0">
        <section className="relative isolate min-h-[100svh] overflow-hidden">
          <div
            className="absolute inset-0 -z-30 bg-cover bg-[72%_center] lg:bg-center"
            style={{
              backgroundImage: `url("${HERO_BACKGROUND_URL}")`,
            }}
          />
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(17,3,31,.16)_0%,rgba(17,3,31,.28)_42%,#13051f_72%)] lg:bg-[linear-gradient(90deg,rgba(17,3,31,.05)_0%,rgba(17,3,31,.22)_42%,rgba(17,3,31,.92)_66%,#13051f_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="academia-mobile-photo pointer-events-none absolute inset-x-0 top-[4.6rem] z-0 flex h-[40svh] min-h-[230px] max-h-[390px] items-end justify-center lg:hidden">
            <img
              src={ALFREDO_IMAGE_URL}
              alt=""
              className="h-full w-auto max-w-[88vw] object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,.42)]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
              }}
            />
          </div>

          <header className="relative z-30 mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-5 min-[380px]:px-5 sm:px-8 sm:py-6 lg:px-10">
            <span className="text-xl font-black tracking-[0.2em] min-[380px]:text-2xl min-[380px]:tracking-[0.22em]">
              CEFIN
            </span>
            <a
              href={CHECKOUT_URL}
              onClick={handleCheckoutClick("header")}
              className="hidden rounded-full border border-white/20 bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#2d0a4a] shadow-xl transition hover:-translate-y-0.5 sm:inline-flex"
            >
              INSCRIBIRME AHORA
            </a>
          </header>

          <div className="academia-hero-content relative z-20 mx-auto grid min-h-[calc(100svh-76px)] w-full max-w-[1280px] items-end px-4 pb-10 pt-[46svh] min-[380px]:px-5 min-[380px]:pt-[48svh] sm:px-8 sm:pt-[50svh] md:pt-[48svh] lg:min-h-[calc(100svh-88px)] lg:grid-cols-2 lg:items-center lg:px-10 lg:pb-16 lg:pt-8">
            <div className="hidden lg:block" />

            <div className="relative z-10 text-center lg:text-left">
              <p className="inline-flex rounded-full border border-[#ff6a77]/45 bg-[#ff596f]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ff9aa5] backdrop-blur">
                Inscripciones abiertas · 100% en línea
              </p>

              <p className="mt-5 text-[clamp(1.8rem,8.5vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
                Academia
              </p>
              <h1 className="mt-1 text-[clamp(2.35rem,11.5vw,6.6rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
                <span className="bg-gradient-to-r from-[#ff6a57] via-[#ff4f7b] to-[#d65cff] bg-clip-text text-transparent">
                  Contabilidad
                </span>
                <span className="mt-2 block text-white">Básica</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/82 min-[380px]:text-lg sm:mt-6 sm:text-xl lg:mx-0">
                Aprende contabilidad desde cero y transforma tu forma de
                entender los negocios con una ruta clara, práctica y a tu
                ritmo.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <a
                  href={CHECKOUT_URL}
                  onClick={handleCheckoutClick("hero")}
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff5f68] via-[#ff466f] to-[#c445f4] px-5 py-4 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_20px_65px_rgba(222,63,139,.42)] transition hover:-translate-y-1 hover:brightness-110 min-[380px]:min-h-16 min-[380px]:px-8 min-[380px]:py-5 min-[380px]:text-base min-[380px]:tracking-[0.08em]"
                >
                  INSCRIBIRME AHORA
                </a>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-center backdrop-blur sm:text-left">
                  <p className="text-2xl font-black">{PRODUCT_PRICE_LABEL}</p>
                  <p className="text-xs font-bold text-white/60">
                    IVA incluido · Hasta 12 mensualidades
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-white/52">
                Pago seguro procesado por Hotmart
              </p>
            </div>
          </div>

          <div className="relative z-20 mx-auto grid w-full max-w-[1120px] grid-cols-2 border-y border-white/10 bg-[#180625]/80 text-center backdrop-blur md:grid-cols-4">
            {[
              "Aprende a tu ritmo",
              "Conocimiento práctico",
              "17 módulos completos",
              "Respaldo CEFIN",
            ].map((item) => (
              <p
                key={item}
                className="border-b border-r border-white/10 px-4 py-5 text-xs font-black uppercase tracking-[0.12em] text-white/72 md:border-b-0"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="relative border-t border-white/10 bg-[#13051f] px-4 py-16 min-[380px]:px-5 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(255,75,117,.13),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(153,61,235,.15),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff8190]">
                Tu éxito contable comienza aquí
              </p>
              <h2 className="mt-4 max-w-2xl text-[clamp(2rem,9vw,3.75rem)] font-black uppercase leading-[0.95] tracking-[-0.04em]">
                Deja de ver la contabilidad como un idioma imposible.
              </h2>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/66">
                Aprende desde los fundamentos y avanza hacia situaciones que
                aparecen en el trabajo real, con una ruta ordenada que conecta
                cada concepto con su aplicación.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {LEARNING_RESULTS.map((item) => (
                <article
                  key={item.number}
                  className="group grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_55px_rgba(0,0,0,.2)] transition hover:-translate-y-1 hover:border-[#ff6680]/35 sm:block lg:grid lg:grid-cols-[72px_1fr] lg:items-center"
                >
                  <span className="text-4xl font-black text-transparent [-webkit-text-stroke:1px_#ff6a77]">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-black uppercase text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-white/62">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f7f1ff] px-4 py-16 text-[#241132] min-[380px]:px-5 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff5f68] via-[#d950ef] to-[#7548ff]" />
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a632bf]">
                  Temario del curso
                </p>
                <h2 className="mt-4 text-[clamp(2rem,9vw,3.75rem)] font-black uppercase leading-none tracking-[-0.04em]">
                  17 módulos para construir bases contables de verdad.
                </h2>
              </div>
              <p className="max-w-xl text-base font-semibold leading-relaxed text-[#5d4869] lg:pb-2">
                Comienza con los conceptos esenciales y avanza hacia prácticas,
                herramientas y procesos que forman parte del ejercicio
                contable.
              </p>
            </div>

            <div className="mt-12 grid gap-3 md:grid-cols-2">
              {(showAllModules
                ? COURSE_MODULES
                : COURSE_MODULES.slice(0, 6)
              ).map((module, index) => (
                <article
                  key={module}
                  className="group flex min-h-[84px] items-center gap-3 rounded-[1.25rem] border border-[#e3d4ed] bg-white p-3 shadow-[0_12px_35px_rgba(54,24,75,.07)] transition hover:-translate-y-1 hover:border-[#d556e9] hover:shadow-[0_18px_40px_rgba(138,48,162,.13)] min-[380px]:min-h-[92px] min-[380px]:gap-4 min-[380px]:p-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff635f] to-[#d840db] text-lg font-black text-white shadow-[0_10px_25px_rgba(216,64,219,.25)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="break-words text-sm font-extrabold leading-snug text-[#33203f] min-[380px]:text-base">
                    {module}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllModules((current) => !current)}
                aria-expanded={showAllModules}
                className="inline-flex min-h-14 w-full max-w-[370px] items-center justify-center rounded-full border-2 border-[#8f2aaa] bg-white px-5 py-4 text-xs font-black uppercase tracking-[0.08em] text-[#7d2094] transition hover:-translate-y-0.5 hover:bg-[#f6e9fb] min-[380px]:px-7 min-[380px]:text-sm min-[380px]:tracking-[0.1em]"
              >
                {showAllModules
                  ? "Ver menos módulos"
                  : "Ver temario completo (+11)"}
                <span
                  className={`ml-3 text-xl transition-transform ${showAllModules ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckoutClick("temario")}
                className="inline-flex min-h-16 w-full max-w-[520px] items-center justify-center rounded-2xl bg-[#281036] px-8 py-5 text-base font-black uppercase tracking-[0.08em] text-white shadow-[0_20px_55px_rgba(36,17,50,.2)] transition hover:-translate-y-1 hover:bg-[#3a1550]"
              >
                INSCRIBIRME AHORA
              </a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1c082b] px-4 py-16 min-[380px]:px-5 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:38px_38px]" />
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#ff496d]/20 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#9947ff]/25 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div className="relative mx-auto flex w-full max-w-[470px] items-end justify-center overflow-hidden">
              <div className="absolute inset-8 rounded-full border border-[#ff7286]/25" />
              <div className="absolute inset-16 rounded-full border border-[#a45cff]/30" />
              <div className="absolute bottom-3 left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-full bg-black/45 blur-xl" />
              <img
                src={ALFREDO_IMAGE_URL}
                alt="Mtro. Alfredo Cobos, instructor de la Academia de Contabilidad Básica"
                className="relative z-10 mx-auto h-[290px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_30px_55px_rgba(0,0,0,.48)] min-[380px]:h-[330px] sm:h-[390px]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[#1c082b] to-transparent" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff8d9a]">
                Impartida por
              </p>
              <h2 className="mt-4 text-[clamp(2rem,9vw,3.75rem)] font-black uppercase leading-none">
                Mtro. Alfredo Cobos
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/70">
                Aprende con explicaciones directas y un enfoque práctico para
                convertir conceptos contables en conocimientos que puedas
                aplicar con mayor claridad y seguridad.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Explicaciones desde cero",
                  "Ejercicios y práctica contable",
                  "Herramientas del trabajo real",
                  "Avance en línea y a tu ritmo",
                ].map((item) => (
                  <p
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-4 text-sm font-extrabold text-white/78"
                  >
                    <span className="mr-2 text-[#ff657a]">●</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#2b0c3e] px-4 py-16 min-[380px]:px-5 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1120px] gap-7 lg:grid-cols-2">
            <article className="relative overflow-hidden rounded-[2rem] border border-[#ff7789]/25 bg-gradient-to-br from-[#4c174f] to-[#250934] p-7 shadow-[0_28px_80px_rgba(0,0,0,.25)] sm:p-9">
              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#ff526d]/25 blur-3xl" />
              <p className="relative text-xs font-black uppercase tracking-[0.25em] text-[#ff9aa6]">
                Además te llevas gratis
              </p>
              <div className="relative mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6a64] to-[#df43df] text-3xl shadow-xl">
                🎁
              </div>
              <h2 className="relative mt-6 text-3xl font-black uppercase leading-tight sm:text-4xl">
                4 sesiones en vivo del Factor CEFIN
              </h2>
              <p className="relative mt-4 text-base font-medium leading-relaxed text-white/68">
                Espacios de preguntas y respuestas para resolver dudas y
                reforzar tu aprendizaje junto con el equipo CEFIN.
              </p>
              <p className="relative mt-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/80">
                Incluidas con tu inscripción
              </p>
            </article>

            <article className="relative overflow-hidden rounded-[2rem] border border-[#a970ff]/30 bg-gradient-to-br from-[#2b1455] via-[#291044] to-[#19072a] p-7 shadow-[0_28px_80px_rgba(0,0,0,.25)] sm:p-9">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6549ff]/30 blur-3xl" />
              <p className="relative text-xs font-black uppercase tracking-[0.25em] text-[#bba0ff]">
                Producto adicional opcional
              </p>
              <div className="relative mt-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#b888ff]/30 bg-[#8c4eff]/15 text-3xl shadow-xl">
                🤖
              </div>
              <h2 className="relative mt-6 text-3xl font-black uppercase leading-tight sm:text-4xl">
                Profe Cobos, tu maestro IA de contabilidad
              </h2>
              <p className="relative mt-4 text-base font-medium leading-relaxed text-white/68">
                Agrega en el checkout un agente de IA para consultar dudas,
                corregir ejercicios y practicar paso a paso.
              </p>
              <div className="relative mt-6 flex items-end gap-3">
                <p className="text-4xl font-black text-white">$697 MXN</p>
                <p className="pb-1 text-sm font-bold text-white/45 line-through">
                  $2,987
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#11031b] px-4 py-16 min-[380px]:px-5 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(200,62,240,.22),transparent_42%)]" />
          <div className="relative mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[1fr_.82fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff8797]">
                Tu formación, nuevas oportunidades
              </p>
              <h2 className="mt-4 text-[clamp(2rem,9vw,3.75rem)] font-black uppercase leading-[0.95] tracking-[-0.04em]">
                Empieza hoy a construir una base contable más sólida.
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/66">
                Accede a una ruta completa, estudia a tu ritmo y deja de
                depender de explicaciones aisladas para entender la
                contabilidad.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#d66aff]/35 bg-white/[0.07] p-6 text-center shadow-[0_30px_90px_rgba(113,32,157,.28)] backdrop-blur sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#dda0ff]">
                Inversión por participante
              </p>
              <p className="mt-5 text-[clamp(3.25rem,17vw,4.5rem)] font-black tracking-[-0.06em] text-white">
                $1,987
              </p>
              <p className="mt-1 text-sm font-black uppercase tracking-[0.2em] text-white/55">
                MXN · IVA incluido
              </p>
              <p className="mt-5 text-sm font-semibold leading-relaxed text-white/62">
                Opciones de pago de hasta 12 mensualidades disponibles en el
                checkout.
              </p>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckoutClick("price_card")}
                className="mt-7 flex min-h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff625f] via-[#ff4775] to-[#c342ef] px-5 py-4 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_20px_55px_rgba(223,65,162,.38)] transition hover:-translate-y-1 hover:brightness-110 min-[380px]:min-h-16 min-[380px]:px-6 min-[380px]:py-5 min-[380px]:text-base min-[380px]:tracking-[0.08em]"
              >
                INSCRIBIRME AHORA
              </a>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.13em] text-white/42">
                Compra protegida y procesada por Hotmart
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f1ff] px-4 py-16 text-[#251332] min-[380px]:px-5 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[920px]">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a632bf]">
                Preguntas frecuentes
              </p>
              <h2 className="mt-4 text-[clamp(2rem,9vw,3rem)] font-black uppercase leading-none">
                Antes de inscribirte
              </h2>
            </div>

            <div className="mt-10 grid gap-3">
              {FAQS.map(([question, answer]) => (
                <details
                  key={question}
                  className="group rounded-[1.25rem] border border-[#dfd1e8] bg-white px-5 py-1 shadow-[0_10px_30px_rgba(62,31,80,.05)] open:border-[#c34fd8]"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-black [&::-webkit-details-marker]:hidden">
                    <span>{question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4e6fa] text-xl text-[#9f2db8] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="border-t border-[#eee2f3] pb-5 pt-4 text-sm font-medium leading-relaxed text-[#6c5777] sm:text-base">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-br from-[#3e124d] via-[#270b3b] to-[#160522] px-4 py-16 text-center min-[380px]:px-5 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="relative mx-auto max-w-[940px]">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff91a0]">
              Inscripciones abiertas
            </p>
            <h2 className="mt-4 text-[clamp(2.1rem,9.5vw,4.5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em]">
              Tu éxito contable puede comenzar hoy.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/68">
              Da el primer paso con una formación clara, práctica y respaldada
              por CEFIN.
            </p>
            <a
              href={CHECKOUT_URL}
              onClick={handleCheckoutClick("final_cta")}
              className="mx-auto mt-8 flex min-h-14 w-full max-w-[520px] items-center justify-center rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.05em] text-[#331143] shadow-[0_22px_70px_rgba(0,0,0,.28)] transition hover:-translate-y-1 hover:bg-[#fff4ff] min-[380px]:min-h-16 min-[380px]:px-8 min-[380px]:py-5 min-[380px]:text-base min-[380px]:tracking-[0.08em]"
            >
              INSCRIBIRME YA POR {PRODUCT_PRICE_LABEL}
            </a>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#0d0214] px-5 py-8 text-center sm:px-8">
          <p className="text-lg font-black tracking-[0.22em] text-white">CEFIN</p>
          <p className="mt-2 text-xs font-medium text-white/42">
            Tu formación, nuevas oportunidades.
          </p>
        </footer>

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#14051e]/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-15px_45px_rgba(0,0,0,.35)] backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <div className="shrink-0 pl-1">
              <p className="text-lg font-black leading-none">$1,987</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                MXN
              </p>
            </div>
            <a
              href={CHECKOUT_URL}
              onClick={handleCheckoutClick("mobile_sticky")}
              className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#ff625f] to-[#c342ef] px-4 text-center text-xs font-black uppercase tracking-[0.08em] text-white"
            >
              INSCRIBIRME AHORA
            </a>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 1023px) and (max-height: 700px) {
            .academia-mobile-photo {
              top: 3.8rem;
              height: 42svh;
              min-height: 170px;
              max-height: 260px;
            }

            .academia-hero-content {
              padding-top: 44svh;
            }
          }

          @media (max-width: 340px) {
            .academia-mobile-photo img {
              max-width: 82vw;
            }
          }
        `}</style>
      </main>
    </>
  );
}
