"use client";

import Script from "next/script";
import Image from "next/image";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const PRICE = 497;
const CHECKOUT_URL = "#comprar";
const ASSET_BASE = "https://cefin-landings-z9uk.vercel.app";
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/alfredo.png`;
const EVENT_DATE_TEXT = "Del 20 al 24 de julio | 11:00 AM (hora CDMX)";

const PRODUCT_EVENT = {
  content_name: "MasterIA CEFIN",
  content_category: "Taller practico en vivo / IA para contadores",
  value: PRICE,
  currency: META_CURRENCY,
};

const pains = [
  "Mas CFDI por revisar.",
  "Mas XML por descargar y organizar.",
  "Mas reportes por preparar.",
  "Mas conciliaciones.",
  "Mas informacion dispersa.",
  "Mas pendientes operativos.",
  "Menos tiempo para analizar y asesorar.",
  "Muchas horas en tareas repetitivas.",
];

const outcomes = [
  ["01", "Dar instrucciones claras a la IA", "Aprende a pedir resultados utiles, estructurados y revisables."],
  ["02", "Crear prompts contables", "Construye instrucciones profesionales para tareas reales de contabilidad."],
  ["03", "Organizar CFDI y XML", "Convierte datos dispersos en informacion ordenada para revisar mejor."],
  ["04", "Usar IA + Excel", "Apoya tu trabajo con estructuras, formulas, tablas y analisis guiado."],
  ["05", "Crear reportes", "Prepara borradores, checklists y papeles de trabajo con mayor velocidad."],
  ["06", "Ahorrar tiempo operativo", "Reduce tareas repetitivas sin soltar tu criterio profesional."],
  ["07", "Saber que delegar", "Identifica que puede apoyar la IA y que debes validar personalmente."],
  ["08", "Aplicarlo en tu practica", "Usa el metodo en despacho, empleo, clientes o etapa de aprendizaje."],
];

const program = [
  {
    day: "Dia 1",
    title: "De contador saturado a contador potenciado con IA",
    bullets: [
      "La nueva realidad del trabajo contable.",
      "Que puede hacer la IA por un contador.",
      "Que nunca debe hacer sin revision profesional.",
      "Las 3 reglas: contexto, estructura y criterio.",
    ],
    key: "No necesitas saber programar. Necesitas aprender a dirigir la IA como dirigirias a un auxiliar contable.",
  },
  {
    day: "Dia 2",
    title: "Prompts contables profesionales",
    bullets: [
      "Por que muchas respuestas de IA salen genericas.",
      "Estructura CEFIN para prompts: rol, contexto, objetivo, tarea y formato.",
      "Prompts para CFDI, reportes, papeles de trabajo y conciliaciones.",
    ],
    key: "La calidad de la respuesta de la IA depende de la calidad de la instruccion que le das.",
  },
  {
    day: "Dia 3",
    title: "IA + Excel para convertir datos en informacion util",
    bullets: [
      "Por que Excel sigue siendo el centro del trabajo contable.",
      "Organizacion de CFDI, XML y datos contables.",
      "Papeles de trabajo, conciliaciones, reportes y checklists.",
    ],
    key: "Pasa de datos contables sueltos a informacion organizada y procesos mas claros.",
  },
  {
    day: "Dia 4",
    title: "Tus consultores digitales",
    bullets: [
      "El problema de usar IA como chat aislado.",
      "Como trabajar con proyectos, memorias y GPT personalizados.",
      "Que es un agente de IA explicado para contadores.",
    ],
    key: "Empieza a usar la IA como un sistema de apoyo, no como una pregunta suelta.",
  },
  {
    day: "Dia 5",
    title: "Ruta de implementacion",
    bullets: [
      "Recapitulacion de lo aprendido.",
      "Los 4 niveles del contador con IA.",
      "Mapa de implementacion para despacho, empleo o practica profesional.",
    ],
    key: "No terminas con mas informacion. Terminas con una nueva forma de trabajar.",
  },
];

const audience = [
  "Eres contador, auxiliar o estudiante de contabilidad.",
  "Pasas demasiado tiempo organizando informacion.",
  "Tienes muchas tareas repetitivas cada mes.",
  "Quieres usar IA de forma practica y segura.",
  "Quieres aprender a trabajar con IA + Excel.",
  "Buscas mejorar tu productividad sin perder criterio.",
  "Te interesa atender mejor a tus clientes.",
  "No sabes programar, pero quieres aprovechar la IA en tu profesion.",
];

const includes = [
  "5 sesiones practicas en vivo.",
  "Aplicacion de IA a tareas contables reales.",
  "Uso de ChatGPT como auxiliar contable digital.",
  "Creacion de prompts profesionales.",
  "Ejercicios con CFDI, XML y Excel.",
  "Papeles de trabajo, reportes y checklists.",
  "Ruta de implementacion.",
  "Materiales practicos del taller.",
];

const faqs = [
  {
    question: "Necesito saber programar?",
    answer:
      "No. El taller esta disenado para contadores que quieren aprender a usar herramientas de IA de forma practica, sin programar.",
  },
  {
    question: "La IA va a sustituir mi trabajo como contador?",
    answer:
      "No. La IA puede ayudarte a reducir tareas repetitivas, organizar informacion y crear borradores, pero el analisis, validacion y criterio profesional siguen siendo tuyos.",
  },
  {
    question: "Puedo tomarlo si nunca he usado ChatGPT?",
    answer:
      "Si. El taller parte desde una explicacion clara y practica para que puedas empezar a utilizar la IA en tareas reales.",
  },
  {
    question: "Me sirve si trabajo en un despacho?",
    answer:
      "Si. Esta pensado para contadores, auxiliares y profesionistas que trabajan con CFDI, XML, reportes, conciliaciones y papeles de trabajo.",
  },
  {
    question: "Me sirve si soy estudiante o recien egresado?",
    answer:
      "Si. Te ayudara a desarrollar una forma mas moderna, ordenada y practica de trabajar con informacion contable.",
  },
  {
    question: "Que pasa si ya uso ChatGPT?",
    answer:
      "Te servira para dejar de usarlo solo como un chat de preguntas y empezar a darle instrucciones estructuradas para tareas contables reales.",
  },
];

export default function MasterIAInscripcionPage() {
  useEffect(() => {
    document.title = "MasterIA CEFIN | Inscripcion";

    trackMetaEvent("ViewContent", {
      ...PRODUCT_EVENT,
      source: "masteria_sales_page",
    });
  }, []);

  const handleCheckout = () => {
    trackMetaEvent("InitiateCheckout", {
      ...PRODUCT_EVENT,
      source: "masteria_cta",
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-masteria"
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

      <main className="overflow-x-hidden bg-[#02040a] text-white">
        <section className="relative isolate min-h-svh overflow-hidden">
          <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_20%,rgba(163,230,53,.2),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(34,211,238,.18),transparent_28%),linear-gradient(120deg,#02040a_0%,#06132c_52%,#02040a_100%)]" />
          <div className="ai-grid absolute inset-0 -z-20 opacity-[0.16]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-[linear-gradient(to_bottom,transparent,#02040a)]" />

          <div className="mx-auto flex min-h-svh max-w-[1240px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-10">
            <header className="flex items-center justify-between">
              <div className="inline-flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-200">
                  C
                </span>
                <div>
                  <p className="text-lg font-black">CEFIN</p>
                  <p className="hidden text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:block">
                    IA aplicada a contabilidad
                  </p>
                </div>
              </div>

              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="inline-flex min-h-11 items-center bg-lime-400 px-5 text-xs font-black uppercase text-black shadow-[0_0_28px_rgba(163,230,53,.22)] transition hover:-translate-y-0.5 hover:bg-lime-300"
              >
                INSCRIBIRME AHORA
              </a>
            </header>

            <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="inline-flex border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                  Taller practico en vivo para contadores
                </p>

                <h1 className="mt-6 max-w-4xl text-[clamp(3rem,7vw,6.6rem)] font-black uppercase italic leading-[0.88] tracking-normal">
                  Convierte la IA en tu
                  <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-lime-300 bg-clip-text text-transparent">
                    auxiliar contable digital
                  </span>
                  <span className="block">en solo 5 dias</span>
                </h1>

                <p className="mt-6 inline-flex border border-lime-300/40 bg-lime-300/10 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-lime-200">
                  {EVENT_DATE_TEXT}
                </p>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                  Aprende a usar IA, Excel y prompts profesionales para organizar
                  CFDI y XML, crear papeles de trabajo, preparar reportes y reducir
                  tareas repetitivas sin dejar de usar tu criterio profesional.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="border border-lime-300/35 bg-lime-300/10 px-6 py-4 text-3xl font-black text-lime-300">
                    $497 MXN
                  </p>

                  <a
                    href={CHECKOUT_URL}
                    onClick={handleCheckout}
                    className="cta-shine inline-flex min-h-16 items-center justify-center bg-lime-400 px-8 text-base font-black uppercase text-black shadow-[0_20px_60px_rgba(163,230,53,.25)] transition hover:-translate-y-1 hover:bg-lime-300"
                  >
                    INSCRIBIRME AHORA
                    <span className="ml-4 text-2xl">→</span>
                  </a>
                </div>

                <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                  Acceso al taller practico de 5 dias para contadores.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -inset-5 bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-lime-300/20 blur-2xl" />
                <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-white/[0.06] backdrop-blur-xl">
                  <div className="ai-grid absolute inset-0 opacity-[0.18]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(163,230,53,.22),transparent_28%),linear-gradient(to_bottom,rgba(2,4,10,.08),#02040a_92%)]" />

                  <div className="absolute left-5 top-5 z-20 border border-cyan-300/30 bg-[#02040a]/80 px-4 py-3 backdrop-blur">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                      MasterIA
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      IA dirigida por criterio contable
                    </p>
                  </div>

                  <div className="absolute bottom-6 right-5 z-20 max-w-[250px] border border-lime-300/30 bg-lime-300 px-5 py-4 text-black shadow-[0_20px_70px_rgba(163,230,53,.25)]">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-black/55">
                      {EVENT_DATE_TEXT}
                    </p>
                    <p className="mt-1 text-2xl font-black uppercase leading-none">
                      Tu nuevo auxiliar digital
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-1/2 z-10 h-[94%] w-[78%] -translate-x-1/2 sm:w-[68%] lg:w-[82%]">
                    <Image
                      src={ALFREDO_IMAGE_URL}
                      alt="Mtro. Alfredo Cobos"
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, 85vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#02040a] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1160px]">
            <div className="max-w-3xl">
              <p className="eyebrow">El problema</p>
              <h2 className="mt-4 text-4xl font-black uppercase italic sm:text-5xl">
                Sientes que tu trabajo contable cada mes exige mas tiempo?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-400">
                El problema no es que te falte capacidad. El problema es que
                sigues resolviendo demasiadas tareas manualmente.
              </p>
            </div>

            <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {pains.map((pain) => (
                <div key={pain} className="bg-[#071126] p-6">
                  <p className="font-bold text-slate-300">{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#071126] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">El reencuadre</p>
              <h2 className="mt-4 text-4xl font-black uppercase italic sm:text-5xl">
                La inteligencia artificial no viene a quitarte valor.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                Viene a ayudarte a reducir tareas repetitivas para que uses mejor
                tu criterio profesional, trabajes con mas orden y te enfoques en
                lo que realmente aporta valor.
              </p>
            </div>

            <div className="grid gap-px bg-cyan-300/15">
              {[
                ["La IA puede ayudarte a organizar informacion", "Pero tu debes validar resultados"],
                ["La IA puede estructurar reportes", "Pero tu debes aplicar criterio profesional"],
                ["La IA puede preparar borradores", "Pero tu debes tomar decisiones contables y fiscales"],
              ].map(([left, right]) => (
                <div key={left} className="grid gap-px bg-cyan-300/15 sm:grid-cols-2">
                  <div className="bg-[#020b1b] p-5 font-bold text-cyan-100">{left}</div>
                  <div className="bg-[#020b1b] p-5 font-bold text-lime-200">{right}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#02040a] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Lo que lograras</p>
              <h2 className="mt-4 text-4xl font-black uppercase italic sm:text-5xl">
                En 5 dias podras empezar a usar IA en tareas contables reales.
              </h2>
            </div>

            <div className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {outcomes.map(([number, title, text]) => (
                <article key={number} className="border-b border-r border-white/10 p-6 transition hover:bg-white/[0.05]">
                  <p className="text-sm font-black text-lime-300">{number}</p>
                  <h3 className="mt-6 text-xl font-black uppercase text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-lime-400 px-5 py-12 text-black sm:px-8 lg:px-10">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(0,0,0,.18)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.18)_1px,transparent_1px)] [background-size:38px_38px]" />
          <div className="relative mx-auto flex max-w-[1160px] flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/55">
                Ya viste lo que puede cambiar
              </p>
              <h2 className="mt-3 text-4xl font-black uppercase italic leading-tight sm:text-5xl">
                Compra tu acceso y empieza a usar IA como auxiliar contable.
              </h2>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-black/70">
                Son 5 dias para dejar de improvisar prompts y empezar a
                trabajar con estructura, Excel y criterio profesional.
              </p>
              <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-black/60">
                {EVENT_DATE_TEXT}
              </p>
            </div>
            <div className="shrink-0 border-2 border-black bg-black p-2 shadow-[12px_12px_0_rgba(0,0,0,.22)]">
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine inline-flex min-h-16 w-full items-center justify-center bg-white px-8 text-base font-black uppercase text-black shadow-[0_18px_45px_rgba(0,0,0,.25)] transition hover:-translate-y-1 hover:bg-cyan-100 sm:w-auto"
              >
                INSCRIBIRME AHORA
                <span className="ml-3 text-2xl leading-none">→</span>
              </a>
              <p className="mt-3 text-center text-sm font-black uppercase text-lime-200">
                ${PRICE} MXN · Acceso al taller de 5 dias
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#071126] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1160px]">
            <div className="max-w-3xl">
              <p className="eyebrow">Programa de 5 dias</p>
              <h2 className="mt-4 text-4xl font-black uppercase italic sm:text-5xl">
                Esto es lo que trabajaras durante el taller.
              </h2>
            </div>

            <div className="mt-12 space-y-5">
              {program.map((item) => (
                <article key={item.day} className="grid gap-6 border border-white/10 bg-white/[0.04] p-6 lg:grid-cols-[170px_1fr]">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">{item.day}</p>
                    <h3 className="mt-3 text-2xl font-black uppercase text-white">{item.title}</h3>
                  </div>
                  <div>
                    <ul className="grid gap-3 text-slate-300 sm:grid-cols-2">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>• {bullet}</li>
                      ))}
                    </ul>
                    <p className="mt-5 border-l-4 border-cyan-300 bg-cyan-300/10 p-4 font-bold text-cyan-100">
                      {item.key}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-5 border border-lime-300/25 bg-lime-300/10 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
                  Agenda cerrada
                </p>
                <p className="mt-2 text-2xl font-black uppercase text-white">
                  Aparta tu acceso antes de que empiece el taller.
                </p>
                <p className="mt-2 font-bold text-slate-400">{EVENT_DATE_TEXT}</p>
              </div>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine inline-flex min-h-14 w-full items-center justify-center bg-lime-400 px-7 text-sm font-black uppercase text-black shadow-[0_18px_55px_rgba(163,230,53,.22)] transition hover:-translate-y-1 hover:bg-lime-300 sm:w-auto"
              >
                INSCRIBIRME AHORA
                <span className="ml-3 text-xl leading-none">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#02040a] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Esto es para ti si...</p>
              <h2 className="mt-4 text-4xl font-black uppercase italic sm:text-5xl">
                Quieres trabajar mejor sin perder tu criterio.
              </h2>
              <div className="mt-8 space-y-4">
                {audience.map((item) => (
                  <p key={item} className="border border-white/10 bg-white/[0.04] p-4 font-bold text-slate-300">
                    ✓ {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="border border-red-400/25 bg-red-500/10 p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-200">
                Esto no es para ti si...
              </p>
              <p className="mt-5 text-3xl font-black leading-tight">
                Buscas que la IA haga tu trabajo sin revision, sustituya tu
                criterio o tome decisiones contables y fiscales por ti.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#071126] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1160px]">
            <p className="eyebrow text-center">Que incluye</p>
            <h2 className="mt-4 text-center text-4xl font-black uppercase italic sm:text-5xl">
              Tu acceso a MasterIA CEFIN incluye:
            </h2>
            <div className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {includes.map((item) => (
                <div key={item} className="border-b border-r border-white/10 p-6">
                  <p className="font-bold text-slate-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                {EVENT_DATE_TEXT}
              </p>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine mt-4 inline-flex min-h-14 items-center justify-center bg-lime-400 px-8 text-sm font-black uppercase text-black shadow-[0_18px_55px_rgba(163,230,53,.22)] transition hover:-translate-y-1 hover:bg-lime-300"
              >
                INSCRIBIRME AHORA
                <span className="ml-3 text-xl leading-none">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#02040a] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[900px]">
            <p className="eyebrow text-center">Tal vez estas pensando...</p>
            <h2 className="mt-4 text-center text-4xl font-black uppercase italic sm:text-5xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-10 border-t border-white/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-white/10 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                    {faq.question}
                    <span className="text-2xl text-lime-300 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-4 leading-relaxed text-slate-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="comprar" className="relative overflow-hidden bg-[#071126] px-5 py-20 sm:px-8 lg:px-10">
          <div className="ai-grid absolute inset-0 opacity-[0.12]" />
          <div className="relative mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow">Cierre de venta</p>
              <h2 className="mt-4 text-4xl font-black uppercase italic sm:text-6xl">
                En 5 dias puedes dejar de usar IA solo para preguntar y empezar a trabajar mejor.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                No necesitas convertirte en programador. Necesitas usar la
                inteligencia artificial con estrategia, estructura y criterio
                profesional.
              </p>
            </div>

            <div className="border border-lime-300/25 bg-[#02040a]/70 p-7 text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                MasterIA CEFIN
              </p>
              <p className="mt-3 text-5xl font-black text-lime-300">$497 MXN</p>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
                {EVENT_DATE_TEXT}
              </p>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine mt-7 inline-flex min-h-16 w-full items-center justify-center bg-lime-400 px-7 text-base font-black uppercase text-black shadow-[0_22px_70px_rgba(163,230,53,.25)] transition hover:-translate-y-1 hover:bg-lime-300"
              >
                INSCRIBIRME AHORA
                <span className="ml-4 text-2xl">→</span>
              </a>
              <p className="mt-4 text-sm text-slate-500">
                Da el primer paso para trabajar con mas orden, velocidad y claridad.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#02040a] px-5 py-7 text-center text-sm text-slate-500 sm:px-8">
          CEFIN · Inteligencia artificial aplicada al trabajo contable
        </footer>

        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          .ai-grid {
            background-image:
              linear-gradient(rgba(34, 211, 238, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.12) 1px, transparent 1px);
            background-size: 44px 44px;
          }

          .eyebrow {
            color: #a3e635;
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .cta-shine {
            position: relative;
            overflow: hidden;
          }

          .cta-shine::after {
            position: absolute;
            inset: 0;
            content: "";
            background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.42) 48%, transparent 74%);
            transform: translateX(-140%);
            animation: masteria-shine 4.8s ease-in-out infinite;
          }

          @keyframes masteria-shine {
            0%, 68% {
              transform: translateX(-140%);
            }
            94%, 100% {
              transform: translateX(140%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }

            .cta-shine::after {
              animation: none;
            }
          }
        `}</style>
      </main>
    </>
  );
}
