import type { Metadata } from "next";
import Image from "next/image";
import { HotmartPrice } from "@/components/HotmartPrice";
import { CONTABILIDAD_ELECTRONICA_PRODUCT } from "./config";
import {
  CheckoutLink,
  ContabilidadElectronicaInscripcionAnalytics,
} from "./tracking";

export const metadata: Metadata = {
  title: "Contabilidad Electrónica 2026 | Inscripción CEFIN",
  description:
    "Aprende a revisar catálogo, balanza, pólizas e inconsistencias antes de enviar la contabilidad electrónica al SAT.",
  openGraph: {
    title: "Contabilidad Electrónica 2026 | CEFIN",
    description:
      "Una ruta práctica para entender qué recibe el SAT y enviar con más orden, criterio y seguridad.",
    type: "website",
    images: [
      {
        url: "/contabilidad-electronica/background-banner.png",
        width: 1200,
        height: 628,
        alt: "Programa Contabilidad Electrónica 2026 de CEFIN",
      },
    ],
  },
};

export const revalidate = 300;

const pains = [
  "Envías archivos sin tener claridad de todo lo que el SAT puede revisar.",
  "El catálogo y la balanza no siempre conservan una lógica consistente.",
  "Detectas diferencias cuando el envío ya está demasiado avanzado.",
  "Las pólizas y auxiliares no cuentan la misma historia que la balanza.",
  "Dependes del sistema, aunque el sistema no sustituye tu criterio.",
  "Te cuesta construir una revisión previa que puedas repetir cada mes.",
];

const outcomes = [
  [
    "01",
    "Entender qué se informa",
    "Conecta catálogo, balanza, pólizas y auxiliares para comprender el alcance real del envío.",
  ],
  [
    "02",
    "Revisar con estructura",
    "Sigue una secuencia práctica para detectar diferencias antes de presentar la información.",
  ],
  [
    "03",
    "Identificar inconsistencias",
    "Reconoce señales que merecen revisión y evita trabajar únicamente por automatización.",
  ],
  [
    "04",
    "Enviar con más criterio",
    "Documenta tus validaciones y toma decisiones con mayor claridad y seguridad profesional.",
  ],
];

const program = [
  {
    number: "01",
    title: "El mapa de la contabilidad electrónica",
    description:
      "Comprende qué información integra el envío y cómo se relacionan sus componentes.",
    topics: [
      "Alcance del envío",
      "Relación entre archivos",
      "Información que recibe el SAT",
      "Secuencia de revisión",
    ],
  },
  {
    number: "02",
    title: "Catálogo de cuentas y código agrupador",
    description:
      "Ordena la base del envío para que la clasificación tenga lógica contable.",
    topics: [
      "Estructura del catálogo",
      "Agrupación de cuentas",
      "Consistencia de la clasificación",
      "Errores frecuentes",
    ],
  },
  {
    number: "03",
    title: "Balanza, pólizas y auxiliares",
    description:
      "Revisa que saldos, movimientos y soportes conserven congruencia entre sí.",
    topics: [
      "Lectura de la balanza",
      "Movimientos y saldos",
      "Pólizas y auxiliares",
      "Cruces de información",
    ],
  },
  {
    number: "04",
    title: "Validación antes del envío",
    description:
      "Construye una revisión final para localizar inconsistencias y documentar tus hallazgos.",
    topics: [
      "Validaciones clave",
      "Focos rojos",
      "Revisión previa",
      "Criterio profesional",
    ],
  },
];

const audience = [
  "Eres contador, auxiliar contable o responsable de presentar información al SAT.",
  "Quieres entender el envío, no limitarte a generar archivos desde el sistema.",
  "Buscas reducir errores y retrabajos en tus procesos mensuales.",
  "Necesitas una forma ordenada de revisar antes de presentar.",
  "Atiendes clientes y quieres explicar con claridad qué se está reportando.",
  "Quieres fortalecer tu criterio en un proceso cada vez más observado.",
];

const included = [
  "Formación especializada en Contabilidad Electrónica 2026.",
  "Ruta de revisión desde el catálogo hasta el envío.",
  "Criterios para analizar balanza, pólizas y auxiliares.",
  "Identificación de errores e inconsistencias frecuentes.",
  "Proceso práctico de validación antes de presentar.",
  "Acceso centralizado y pago protegido mediante Hotmart.",
];

const faqs = [
  [
    "¿Para quién está diseñado el programa?",
    "Para contadores, auxiliares y responsables de preparar o revisar la contabilidad electrónica antes de su envío.",
  ],
  [
    "¿Necesito ser especialista?",
    "No. La formación organiza los conceptos y el proceso de revisión para que puedas desarrollar criterio paso a paso.",
  ],
  [
    "¿Cómo recibo el acceso?",
    "Después de completar tu compra, Hotmart mostrará la confirmación y enviará las indicaciones de acceso al correo utilizado en el pago.",
  ],
  [
    "¿El pago es seguro?",
    "Sí. El checkout y la confirmación de la compra son procesados directamente por Hotmart.",
  ],
  [
    "¿El precio que aparece está actualizado?",
    "Sí. La landing consulta la oferta vinculada en Hotmart y conserva un precio de respaldo si el servicio no está disponible temporalmente.",
  ],
];

const primaryButton =
  "inline-flex min-h-16 w-full items-center justify-center rounded-2xl bg-cyan-300 px-7 py-5 text-center text-base font-black uppercase tracking-[0.04em] text-[#021014] shadow-[0_22px_65px_rgba(34,211,238,.28)] transition hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-[0_28px_75px_rgba(34,211,238,.38)] active:translate-y-0 sm:w-auto";

export default function ContabilidadElectronicaInscripcionPage() {
  return (
    <>
      <ContabilidadElectronicaInscripcionAnalytics />

      <main className="overflow-x-hidden bg-[#02070a] pb-20 text-white md:pb-0">
        <section className="relative isolate min-h-svh overflow-hidden">
          <div className="absolute inset-0 -z-30 bg-[#02070a]" />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_18%,rgba(34,211,238,.17),transparent_28%),linear-gradient(105deg,#02070a_0%,rgba(2,7,10,.64)_42%,rgba(2,7,10,.94)_68%,#02070a_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(103,232,249,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.16)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

          <div className="mx-auto flex min-h-svh max-w-[1240px] flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-10">
            <header className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-200">
                  C
                </span>
                <span>
                  <strong className="block text-base font-black leading-none">
                    CEFIN
                  </strong>
                  <small className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.17em] text-white/50 sm:block">
                    Formación fiscal especializada
                  </small>
                </span>
              </div>

              <CheckoutLink
                location="header"
                className="inline-flex min-h-11 items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 text-xs font-black uppercase tracking-[0.08em] text-cyan-100 backdrop-blur transition hover:bg-cyan-300/20"
              >
                Inscribirme
              </CheckoutLink>
            </header>

            <div className="grid min-w-0 flex-1 items-center gap-4 py-8 lg:grid-cols-2 lg:gap-12 lg:py-14">
              <div className="relative mx-auto h-[310px] w-full max-w-[480px] lg:hidden">
                <div className="absolute inset-x-8 bottom-3 h-48 rounded-full bg-cyan-300/16 blur-[70px]" />
                <Image
                  src={CONTABILIDAD_ELECTRONICA_PRODUCT.image}
                  alt="Marisol Galván, instructora de CEFIN"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 90vw, 0px"
                  className="object-contain object-bottom drop-shadow-[0_25px_55px_rgba(0,0,0,.55)]"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#02070a] to-transparent" />
              </div>

              <div className="relative hidden min-h-[660px] lg:block">
                <div className="absolute inset-x-10 bottom-10 h-72 rounded-full bg-cyan-300/15 blur-[95px]" />
                <div className="absolute inset-8 rounded-full border border-cyan-300/10" />
                <Image
                  src={CONTABILIDAD_ELECTRONICA_PRODUCT.image}
                  alt="Marisol Galván, instructora de Contabilidad Electrónica"
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 50vw, 0px"
                  className="object-contain object-bottom drop-shadow-[0_32px_65px_rgba(0,0,0,.6)]"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#02070a] to-transparent" />
              </div>

              <div className="min-w-0 text-center lg:text-left">
                <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200 backdrop-blur sm:text-xs sm:tracking-[0.24em]">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#67e8f9]" />
                  Inscripciones abiertas · <span className="hidden sm:inline">Programa </span>2026
                </p>

                <h1 className="mt-6 text-[clamp(2rem,8.5vw,5.2rem)] font-black uppercase italic leading-[0.86] tracking-[-0.055em] text-white sm:text-[clamp(2.8rem,10.5vw,5.6rem)]">
                  Contabilidad
                  <span className="block text-cyan-300">Electrónica</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-white/78 sm:text-xl lg:mx-0">
                  Deja de enviar archivos a ciegas. Aprende a revisar lo que
                  recibe el SAT y valida tu información con más orden, criterio
                  y seguridad.
                </p>

                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <CheckoutLink location="hero" className={primaryButton}>
                    Inscribirme ahora
                    <span className="ml-3 text-2xl" aria-hidden="true">
                      →
                    </span>
                  </CheckoutLink>
                  <div className="rounded-2xl border border-cyan-300/20 bg-black/35 px-6 py-4 text-left backdrop-blur">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
                      Inversión
                    </p>
                    <p className="mt-1 text-2xl font-black text-cyan-200">
                      <HotmartPrice offer="contabilidadElectronicaInscripcion" />
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm font-semibold text-white/45">
                  Pago seguro procesado por Hotmart · Precio en MXN
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {["Enfoque práctico", "Ruta paso a paso", "Acceso vía Hotmart"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold text-white/72 backdrop-blur"
                      >
                        <span className="mr-2 text-cyan-300">●</span>
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-cyan-200/10 bg-[#051015] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1160px]">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                El problema
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.94] sm:text-5xl">
                Generar el archivo no significa que la información esté bien
                revisada.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/62">
                El sistema ayuda a producir datos. Tu criterio profesional es
                lo que permite entenderlos, cruzarlos y detectar lo que no hace
                sentido antes del envío.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-cyan-300/15 sm:grid-cols-2 lg:grid-cols-3">
              {pains.map((pain, index) => (
                <article key={pain} className="bg-[#08171d] p-6">
                  <p className="text-xs font-black text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 font-bold leading-relaxed text-white/72">
                    {pain}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#02070a] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                Lo que vas a lograr
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.94] sm:text-5xl">
                Pasa de enviar por rutina a revisar con método.
              </h2>
            </div>

            <div className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {outcomes.map(([number, title, description]) => (
                <article
                  key={number}
                  className="border-b border-r border-white/10 p-6 transition hover:bg-cyan-300/[0.055]"
                >
                  <p className="text-sm font-black text-cyan-300">{number}</p>
                  <h3 className="mt-8 text-xl font-black uppercase leading-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/52">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-cyan-300 px-5 py-12 text-[#021014] sm:px-8 lg:px-10">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(2,16,20,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(2,16,20,.2)_1px,transparent_1px)] [background-size:38px_38px]" />
          <div className="relative mx-auto flex max-w-[1160px] flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#075565]">
                Tu siguiente paso
              </p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-tight sm:text-5xl">
                Convierte cada envío en un proceso que puedas explicar y
                defender.
              </h2>
            </div>

            <div className="shrink-0 rounded-2xl bg-[#021014] p-2 shadow-[12px_12px_0_rgba(2,16,20,.18)]">
              <CheckoutLink
                location="midpage_banner"
                className="inline-flex min-h-16 w-full items-center justify-center rounded-xl bg-white px-8 text-base font-black uppercase text-[#021014] transition hover:-translate-y-1 hover:bg-cyan-50 sm:w-auto"
              >
                Inscribirme ahora <span className="ml-3 text-2xl">→</span>
              </CheckoutLink>
              <p className="mt-3 px-4 pb-1 text-center text-sm font-black uppercase text-cyan-200">
                <HotmartPrice offer="contabilidadElectronicaInscripcion" /> · Pago seguro
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#071319] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1160px]">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                Ruta de aprendizaje
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.94] sm:text-5xl">
                Un recorrido completo para revisar antes de enviar.
              </h2>
            </div>

            <div className="mt-12 space-y-5">
              {program.map((module) => (
                <article
                  key={module.number}
                  className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:grid-cols-[110px_1fr] lg:grid-cols-[110px_.75fr_1.25fr] lg:items-center"
                >
                  <p className="text-5xl font-black text-transparent [-webkit-text-stroke:1px_#67e8f9]">
                    {module.number}
                  </p>
                  <div>
                    <h3 className="text-2xl font-black uppercase leading-tight">
                      {module.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/52">
                      {module.description}
                    </p>
                  </div>
                  <ul className="grid gap-3 text-sm font-semibold text-white/68 sm:grid-cols-2">
                    {module.topics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.045] px-4 py-3"
                      >
                        <span className="mr-2 text-cyan-300">✓</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#02070a] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                Esto es para ti si...
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.94] sm:text-5xl">
                Quieres trabajar con más seguridad, sin delegar tu criterio al
                sistema.
              </h2>
            </div>

            <div className="space-y-3">
              {audience.map((item) => (
                <p
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-4 font-semibold leading-relaxed text-white/70"
                >
                  <span className="mr-3 text-cyan-300">✓</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-cyan-200/10 bg-[#071319] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1160px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                Qué incluye tu inscripción
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.94] sm:text-5xl">
                La estructura que necesitas para dejar de revisar a ciegas.
              </h2>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item, index) => (
                <article
                  key={item}
                  className="rounded-2xl border border-cyan-300/12 bg-gradient-to-br from-cyan-300/[0.09] to-transparent p-6"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                    Incluido {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 font-bold leading-relaxed text-white/76">
                    {item}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <CheckoutLink location="includes" className={primaryButton}>
                Quiero entrar al programa
                <span className="ml-3 text-2xl" aria-hidden="true">
                  →
                </span>
              </CheckoutLink>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#02070a] px-5 py-20 sm:px-8 lg:px-10">
          <div className="absolute left-[-8rem] top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-[110px]" />
          <div className="relative mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="relative mx-auto h-[420px] w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.04]">
              <div className="absolute inset-8 rounded-full border border-cyan-300/15" />
              <Image
                src={CONTABILIDAD_ELECTRONICA_PRODUCT.image}
                alt="Marisol Galván, instructora del programa Contabilidad Electrónica"
                fill
                unoptimized
                sizes="(max-width: 1024px) 90vw, 430px"
                className="object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,.55)]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#02070a] to-transparent" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                Tu instructora
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-5xl">
                Marisol Galván
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
                Aprende con un enfoque directo y práctico para convertir los
                archivos de la contabilidad electrónica en información que
                puedas revisar, comprender y explicar.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Explicaciones claras",
                  "Enfoque aplicado",
                  "Revisión con método",
                  "Criterio profesional",
                ].map((item) => (
                  <p
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-bold text-white/72"
                  >
                    <span className="mr-2 text-cyan-300">●</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#ecfeff] px-5 py-20 text-[#06252c] sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[900px]">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#08768b]">
                Preguntas frecuentes
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-5xl">
                Antes de inscribirte
              </h2>
            </div>

            <div className="mt-10 space-y-3">
              {faqs.map(([question, answer]) => (
                <details
                  key={question}
                  className="group rounded-2xl border border-cyan-900/12 bg-white px-5 shadow-[0_12px_35px_rgba(8,118,139,.06)] open:border-cyan-600/35"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-black [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xl text-cyan-800 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="border-t border-cyan-900/10 pb-5 pt-4 leading-relaxed text-[#365d65]">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="comprar" className="relative overflow-hidden bg-[#071319] px-5 py-20 sm:px-8 lg:px-10">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(103,232,249,.55)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                Inscripciones abiertas
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase italic leading-[0.94] sm:text-6xl">
                El próximo envío puede encontrarte mejor preparado.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
                Entra a Contabilidad Electrónica 2026 y construye una revisión
                que puedas repetir con más orden, claridad y criterio.
              </p>
            </div>

            <div className="rounded-[2rem] border border-cyan-300/25 bg-[#02070a]/80 p-7 text-center shadow-[0_30px_90px_rgba(34,211,238,.12)] backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">
                Inversión por participante
              </p>
              <p className="mt-5 text-[clamp(3rem,14vw,4.5rem)] font-black tracking-[-0.06em] text-white">
                <HotmartPrice offer="contabilidadElectronicaInscripcion" />
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white/42">
                Oferta vinculada con Hotmart
              </p>
              <CheckoutLink
                location="final_offer"
                className={`${primaryButton} mt-7 sm:w-full`}
              >
                Comprar mi acceso
                <span className="ml-3 text-2xl" aria-hidden="true">
                  →
                </span>
              </CheckoutLink>
              <p className="mt-4 text-sm leading-relaxed text-white/42">
                Hotmart procesa el pago y confirma tu compra de forma segura.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#02070a] px-5 py-8 text-center text-sm text-white/40">
          <p className="text-base font-black tracking-[0.22em] text-white">
            CEFIN
          </p>
          <p className="mt-2">
            Formación práctica para contadores y profesionales fiscales.
          </p>
        </footer>

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-cyan-300/15 bg-[#02070a]/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-15px_45px_rgba(0,0,0,.4)] backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <div className="shrink-0 pl-1">
              <p className="text-lg font-black leading-none">$1,287</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                MXN
              </p>
            </div>
            <CheckoutLink
              location="mobile_sticky"
              className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-cyan-300 px-4 text-center text-xs font-black uppercase tracking-[0.08em] text-[#021014]"
            >
              Comprar mi acceso
            </CheckoutLink>
          </div>
        </div>
      </main>
    </>
  );
}
