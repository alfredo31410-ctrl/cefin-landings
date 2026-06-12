"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const PRICE = 197;
const CHECKOUT_URL = "https://pay.hotmart.com/C106298773X?off=lgv68uq8&checkoutMode=10&bid=1781287899459";
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/contrato-servicios-contables/alfredo-servicios-contables.png`;

const outcomes = [
  ["01", "Delimita alcances", "Define con precisión qué incluye y qué no incluye tu servicio."],
  ["02", "Aclara responsabilidades", "Establece qué corresponde al contador y qué debe cumplir el cliente."],
  ["03", "Protege tus honorarios", "Documenta montos, fechas, formas de pago y consecuencias por incumplimiento."],
  ["04", "Ordena entregables", "Aterriza documentos, información, fechas y canales de comunicación."],
  ["05", "Cuida la información", "Incluye criterios de confidencialidad para ambas partes."],
  ["06", "Reduce conflictos", "Evita que acuerdos ambiguos se conviertan en problemas con tus clientes."],
];

const clauses = [
  "Identificación de las partes",
  "Objeto y alcance del servicio",
  "Responsabilidades del contador",
  "Obligaciones del cliente",
  "Honorarios y forma de pago",
  "Entregables y fechas",
  "Confidencialidad",
  "Vigencia y terminación",
];

const audience = [
  "Ya tienes clientes y quieres trabajar con mayor claridad.",
  "Estás por conseguir clientes y quieres iniciar de forma profesional.",
  "Quieres evitar problemas por falta de claridad en tus servicios.",
  "Buscas proteger mejor tu tiempo, tu trabajo y tus acuerdos.",
];

const faqs = [
  {
    question: "¿Este entrenamiento sustituye la asesoría de un abogado?",
    answer:
      "No. Te ayuda a reconocer y organizar los elementos comerciales y operativos que debes cuidar. Cuando tu situación lo requiera, conviene validar el documento final con un profesional jurídico.",
  },
  {
    question: "¿Sirve si apenas voy a conseguir mi primer cliente?",
    answer:
      "Sí. Es mejor definir reglas claras desde el inicio que intentar corregir acuerdos informales después.",
  },
  {
    question: "¿Cuándo recibo el acceso?",
    answer:
      "El acceso es inmediato después de confirmar tu pago y podrás avanzar a tu propio ritmo.",
  },
  {
    question: "¿El pago es único?",
    answer:
      "Sí. La inversión es de $197 MXN en un solo pago, sin mensualidades ni cargos recurrentes.",
  },
];

export default function ServiciosContablesPage() {
  useEffect(() => {
    document.title = "Crea tu Contrato de Servicios Contables | CEFIN";
    trackMetaEvent("ViewContent", {
      content_name: "Crea tu Contrato de Servicios Contables",
      content_category: "Formalización profesional / Protección del servicio",
      value: PRICE,
      currency: META_CURRENCY,
    });
  }, []);

  const handleCheckout = () => {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Crea tu Contrato de Servicios Contables",
      content_category: "Entrenamiento práctico / Low ticket evergreen",
      value: PRICE,
      currency: META_CURRENCY,
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-servicios-contables"
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

      <main className="contract-landing overflow-x-hidden bg-[#08090b] text-white">
        <section className="relative isolate min-h-svh overflow-hidden">
          <div className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,#ca1023_0%,#820513_100%)] lg:bg-[linear-gradient(118deg,#f3f3f1_0%,#e7e7e5_42%,#ca1023_42.1%,#8b0615_100%)]" />
          <div className="contract-grid absolute inset-0 -z-20 opacity-15" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(to_bottom,transparent,#08090b)]" />

          <div className="mx-auto flex min-h-svh max-w-[1320px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-10">
            <header className="reveal flex items-center justify-between">
              <span className="text-2xl font-black tracking-normal text-white sm:text-3xl lg:text-[#090a0c]">
                CEFIN
              </span>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="hidden min-h-11 items-center bg-white px-5 text-sm font-black text-[#a20818] shadow-lg transition hover:-translate-y-0.5 sm:inline-flex"
              >
                Formalizar mis servicios
              </a>
            </header>

            <div className="grid flex-1 items-center gap-2 py-8 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="reveal delay-1 relative order-2 mx-auto h-[420px] w-full max-w-[520px] self-end sm:h-[560px] lg:order-1 lg:h-[710px]">
                <div className="absolute bottom-[12%] left-1/2 h-[66%] w-[72%] -translate-x-1/2 border border-black/15 bg-white/30 backdrop-blur-sm" />
                <img
                  src={ALFREDO_IMAGE_URL}
                  alt="Mtro. Alfredo Cobos"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_28px_45px_rgba(0,0,0,.35)] [mask-image:linear-gradient(to_bottom,black_0%,black_90%,transparent_100%)]"
                />
              </div>

              <div className="reveal delay-2 order-1 py-5 text-center lg:order-2 lg:pl-8 lg:text-left">
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  <span className="border border-white/30 bg-black/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] backdrop-blur sm:text-xs">
                    Formalización profesional
                  </span>
                  <span className="border border-white/30 bg-black/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] backdrop-blur sm:text-xs">
                    Low ticket evergreen
                  </span>
                </div>

                <p className="mt-6 text-sm font-black uppercase tracking-[0.26em] text-white/70">
                  Protege el valor de tu trabajo
                </p>
                <h1 className="mt-3 text-[clamp(3.25rem,7vw,7rem)] font-black uppercase leading-[0.84] tracking-normal text-white [text-shadow:0_6px_0_rgba(80,0,8,.24)]">
                  Crea tu contrato
                  <span className="mt-3 block">de servicios</span>
                  <span className="mt-3 block text-[#fff2f2]">contables</span>
                </h1>

                <p className="mx-auto mt-7 max-w-[680px] text-lg font-semibold leading-relaxed text-white/85 lg:mx-0">
                  Aprende qué elementos debe incluir tu contrato para evitar malos
                  entendidos, delimitar responsabilidades y formalizar mejor la
                  relación con tus clientes.
                </p>

                <div className="mt-5 flex items-center justify-center gap-3 text-sm font-bold text-white/75 lg:justify-start">
                  <span className="flex h-9 w-9 items-center justify-center border border-white/35 text-xs font-black">
                    AC
                  </span>
                  Impartido por el Mtro. Alfredo Cobos
                </div>

                <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <span className="border border-white/40 bg-black/20 px-7 py-3 text-3xl font-black backdrop-blur">
                    $197 MXN
                  </span>
                  <a
                    href={CHECKOUT_URL}
                    onClick={handleCheckout}
                    className="cta-shine inline-flex min-h-16 items-center justify-center bg-white px-8 text-lg font-black text-[#a20818] shadow-[0_18px_45px_rgba(50,0,5,.25)] transition hover:-translate-y-1"
                  >
                    Quiero empezar ahora <span className="ml-4 text-2xl">→</span>
                  </a>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                  Pago único · Acceso inmediato · Garantía de 7 días
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-[#101114]">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Qué es este entrenamiento</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
                Reglas claras antes de comenzar.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/65">
                Es un entrenamiento práctico para contadores independientes que
                quieren formalizar la relación con sus clientes mediante acuerdos
                claros, profesionales y adaptados a sus servicios.
              </p>
              <p className="mt-4 text-lg font-bold leading-relaxed text-black/75">
                Te enseña qué debe incluir tu contrato para trabajar con más
                seguridad, orden y confianza.
              </p>
            </div>

            <div className="relative min-h-[390px] overflow-hidden bg-[#f4f1f1] p-7 sm:p-10">
              <div className="absolute right-[-8%] top-[-8%] h-44 w-44 rotate-12 border-[28px] border-[#c81022]/10" />
              <div className="relative mx-auto max-w-[440px] bg-white p-6 shadow-[0_25px_60px_rgba(40,0,5,.14)] sm:p-8">
                <div className="flex items-start justify-between border-b-2 border-[#c81022] pb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#bd0b1d]">Documento profesional</p>
                    <p className="mt-2 text-2xl font-black">Contrato de servicios</p>
                  </div>
                  <span className="text-4xl font-black text-[#c81022]">✓</span>
                </div>
                <div className="mt-6 space-y-4">
                  {[84, 100, 76, 91, 62].map((width, index) => (
                    <div key={width} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[#c81022] text-[10px] font-black text-white">
                        {index + 1}
                      </span>
                      <span className="h-2 bg-black/12" style={{ width: `${width}%` }} />
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-right font-serif text-2xl italic text-black/45">Firma</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[#0b0c0f]">
          <div className="contract-grid absolute inset-0 opacity-[0.06]" />
          <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[850px] text-center">
              <p className="eyebrow">Lo que vas a lograr</p>
              <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                De acuerdos de palabra a servicios profesionales.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/58">
                Reduce riesgos innecesarios y construye relaciones comerciales
                alineadas al valor de tu trabajo.
              </p>
            </div>

            <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {outcomes.map(([number, title, text]) => (
                <article
                  key={number}
                  className="group border-b border-r border-white/10 p-7 transition duration-500 hover:bg-[#c81022]/12 sm:p-9"
                >
                  <p className="text-sm font-black tracking-[0.2em] text-[#ef3348]">{number}</p>
                  <h3 className="mt-9 text-2xl font-black transition group-hover:text-[#ff5366]">{title}</h3>
                  <p className="mt-3 leading-relaxed text-white/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3f3f1] text-[#101114]">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Qué aprenderás</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                Los elementos que sostienen una relación clara.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-black/60">
                No se trata de llenar páginas, sino de dejar documentadas las
                decisiones que protegen el servicio y la relación con tu cliente.
              </p>
            </div>

            <div className="grid border-l border-t border-black/12 sm:grid-cols-2">
              {clauses.map((clause, index) => (
                <div key={clause} className="flex min-h-28 gap-4 border-b border-r border-black/12 bg-white p-6">
                  <span className="text-sm font-black text-[#c81022]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-black">{clause}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white text-[#101114]">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Ideal para ti si...</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                Quieres trabajar con claridad desde el inicio.
              </h2>
              <div className="mt-9 space-y-5">
                {audience.map((item) => (
                  <div key={item} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-[#c81022] text-xs font-black text-white">
                      ✓
                    </span>
                    <p className="text-lg font-semibold leading-relaxed text-black/65">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden bg-[#0b0c0f] p-8 text-white sm:p-11">
              <div className="contract-grid absolute inset-0 opacity-[0.08]" />
              <div className="relative">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ef3348]">Tu transformación</p>
                <p className="mt-6 text-xl font-black text-white/40 line-through decoration-[#ef3348] decoration-2 sm:text-2xl">
                  Trabajar con acuerdos de palabra y riesgos innecesarios.
                </p>
                <div className="my-8 h-px bg-white/12" />
                <p className="text-3xl font-black leading-tight sm:text-4xl">
                  Formalizar tus servicios con contratos más claros, profesionales
                  y alineados al valor de tu trabajo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0c0f]">
          <div className="mx-auto grid max-w-[1240px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Aplicable", "Contenido práctico pensado para tu despacho."],
              ["Inmediato", "Comienza en cuanto confirmes tu compra."],
              ["Profesional", "Creado para la realidad de los contadores."],
              ["Protegido", "Pago único y garantía de 7 días."],
            ].map(([title, text]) => (
              <div key={title} className="border-b border-white/10 px-7 py-9 sm:border-r">
                <p className="text-xl font-black text-[#ef3348]">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#101114]">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
              <div>
                <p className="eyebrow">Escala hacia más</p>
                <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                  Este es un paso para seguir creciendo.
                </h2>
                <p className="mt-5 leading-relaxed text-white/58">
                  Continúa tu ruta profesional con soluciones para captar clientes,
                  construir un sistema comercial y escalar tu despacho.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["01", "Tus Primeros 5 Clientes", "Atrae, contacta y convierte prospectos."],
                  ["02", "Método CEFIN", "Estructura, posiciona y escala tu despacho."],
                  ["03", "Incubadora de Despachos", "Acompañamiento para construir algo más grande."],
                ].map(([number, title, text]) => (
                  <article key={number} className="border border-white/15 bg-white/[0.04] p-6">
                    <span className="flex h-9 w-9 items-center justify-center bg-[#c81022] text-sm font-black">{number}</span>
                    <h3 className="mt-8 text-xl font-black">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="comprar" className="relative overflow-hidden bg-[#a60819]">
          <div className="contract-grid absolute inset-0 opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(255,255,255,.13),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-[1120px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-10 lg:py-24">
            <div className="text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/65">Formaliza desde el inicio</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-6xl">
                Tus servicios merecen reglas claras.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                Protege tu tiempo, tu trabajo y la relación con cada cliente.
              </p>
            </div>

            <div className="border border-white/25 bg-black/20 p-6 text-center backdrop-blur sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Pago único</p>
              <p className="mt-2 text-5xl font-black sm:text-6xl">$197 MXN</p>
              <p className="mt-3 font-bold text-white/75">Acceso inmediato</p>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine mt-7 inline-flex min-h-16 w-full items-center justify-center bg-white px-7 text-lg font-black text-[#a20818] shadow-xl transition hover:-translate-y-1"
              >
                Quiero formalizar mis servicios <span className="ml-4 text-2xl">→</span>
              </a>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                Compra segura · Garantía de 7 días
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f3f1] text-[#101114]">
          <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-24">
            <p className="eyebrow text-center">Preguntas frecuentes</p>
            <h2 className="mt-4 text-center text-4xl font-black sm:text-5xl">Antes de comenzar</h2>
            <div className="mt-10 border-t border-black/15">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-black/15 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                    {faq.question}
                    <span className="text-2xl text-[#c81022] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-4 leading-relaxed text-black/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#08090b]">
          <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-3 px-5 py-7 text-center text-sm text-white/40 sm:flex-row sm:px-8 sm:text-left">
            <span className="text-xl font-black text-white">CEFIN</span>
            <p>Educación y crecimiento para contadores que quieren más.</p>
            <a href="https://cefin.mx" className="font-bold transition hover:text-white">cefin.mx</a>
          </div>
        </footer>

        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          .contract-grid {
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
            background-size: 46px 46px;
          }

          .eyebrow {
            color: #c81022;
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .reveal {
            animation: contract-reveal 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .delay-1 {
            animation-delay: 0.12s;
          }

          .delay-2 {
            animation-delay: 0.23s;
          }

          .cta-shine {
            position: relative;
            overflow: hidden;
          }

          .cta-shine::after {
            position: absolute;
            inset: 0;
            content: "";
            background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.48) 48%, transparent 74%);
            transform: translateX(-140%);
            animation: contract-shine 4.6s ease-in-out infinite;
          }

          @keyframes contract-reveal {
            from {
              opacity: 0;
              transform: translateY(28px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes contract-shine {
            0%, 66% {
              transform: translateX(-140%);
            }
            92%, 100% {
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
