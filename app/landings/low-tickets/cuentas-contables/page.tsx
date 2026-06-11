"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const PRICE = 297;
const CHECKOUT_URL = "#comprar";
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/alfredo.png`;

const outcomes = [
  {
    number: "01",
    title: "Clasifica correctamente",
    text: "Identifica la naturaleza de cada cuenta y evita registros improvisados.",
  },
  {
    number: "02",
    title: "Construye tu catalogo",
    text: "Organiza activos, pasivos, capital, ingresos, costos y gastos.",
  },
  {
    number: "03",
    title: "Registra con criterio",
    text: "Comprende cuando cargar, cuando abonar y como interpretar saldos.",
  },
  {
    number: "04",
    title: "Detecta errores",
    text: "Ubica inconsistencias antes de que lleguen a balanza o estados financieros.",
  },
  {
    number: "05",
    title: "Explica la informacion",
    text: "Comunica movimientos y saldos con claridad a clientes y equipos.",
  },
  {
    number: "06",
    title: "Trabaja con seguridad",
    text: "Deja de memorizar cuentas y empieza a tomar decisiones contables.",
  },
];

const audience = [
  "Estudias contabilidad y quieres comprender la logica de las cuentas.",
  "Eres auxiliar contable y buscas registrar operaciones con mayor seguridad.",
  "Estas iniciando tu despacho y necesitas ordenar tus catalogos.",
  "Capturas polizas, pero aun dudas entre cuentas parecidas.",
  "Quieres reforzar bases antes de entrar a temas fiscales mas avanzados.",
];

const syllabus = [
  "Que es una cuenta contable y para que sirve.",
  "Naturaleza deudora y acreedora sin memorizar reglas aisladas.",
  "Clasificacion de activo, pasivo, capital, resultados y orden.",
  "Estructura practica de un catalogo de cuentas.",
  "Cargos, abonos, movimientos y saldos.",
  "Errores frecuentes al seleccionar cuentas.",
  "Lectura basica de balanza y estados financieros.",
  "Ejemplos aplicados a operaciones comunes.",
];

const faqs = [
  {
    question: "¿Necesito experiencia previa?",
    answer:
      "No. La guia parte de conceptos esenciales y avanza hacia ejemplos aplicados.",
  },
  {
    question: "¿Cuanto tiempo tendre acceso?",
    answer:
      "El acceso es inmediato y de por vida para que puedas avanzar a tu ritmo.",
  },
  {
    question: "¿Es un curso fiscal?",
    answer:
      "No. Esta guia fortalece la base contable que necesitas antes de aplicar criterios fiscales.",
  },
  {
    question: "¿Incluye ejercicios?",
    answer:
      "Si. El contenido esta planteado para que relaciones cada concepto con operaciones reales.",
  },
];

export default function CuentasContablesPage() {
  useEffect(() => {
    document.title = "Cuentas Contables | Guia Practica | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Guia de Cuentas Contables",
      content_category: "Low ticket",
      value: PRICE,
      currency: META_CURRENCY,
    });
  }, []);

  const handleCheckoutClick = () => {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Guia de Cuentas Contables",
      content_category: "Low ticket",
      value: PRICE,
      currency: META_CURRENCY,
    });
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

      <main className="overflow-x-hidden bg-[#07090c] text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050608]/94 backdrop-blur-lg">
          <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 lg:px-8">
            <a href="#inicio" className="text-2xl font-black tracking-tight">
              CEFIN
            </a>

            <div className="hidden items-center gap-7 text-sm font-semibold text-white/68 md:flex">
              <a href="#contenido" className="transition hover:text-white">
                Contenido
              </a>
              <a href="#beneficios" className="transition hover:text-white">
                Beneficios
              </a>
              <a href="#para-quien" className="transition hover:text-white">
                Para quien es
              </a>
              <a href="#temario" className="transition hover:text-white">
                Temario
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQ
              </a>
            </div>

            <a
              href={CHECKOUT_URL}
              onClick={handleCheckoutClick}
              className="rounded-md bg-[#12a8f4] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0698df]"
            >
              Quiero empezar
            </a>
          </nav>
        </header>

        <section
          id="inicio"
          className="relative isolate min-h-[calc(100svh-64px)] overflow-hidden border-b border-white/10"
        >
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,#0c1117_0%,#111820_50%,#050608_100%)]" />
          <div className="absolute inset-0 -z-20 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:46px_46px]" />
          <div className="absolute left-[-8%] top-[-15%] -z-10 h-[480px] w-[480px] rounded-full bg-[#078ee2]/20 blur-[120px]" />
          <div className="absolute bottom-[-18%] right-[-4%] -z-10 h-[420px] w-[420px] rounded-full bg-[#16c8ff]/12 blur-[130px]" />

          <div className="mx-auto grid min-h-[calc(100svh-64px)] max-w-[1240px] items-center px-5 py-10 lg:grid-cols-12 lg:px-8">
            <div className="relative order-2 flex h-[440px] items-end justify-center lg:order-1 lg:col-span-5 lg:h-[640px]">
              <div className="absolute bottom-[10%] h-52 w-52 rounded-full border border-[#12a8f4]/30" />
              <div className="absolute bottom-[16%] h-72 w-72 rounded-full border border-[#12a8f4]/12" />
              <img
                src={ALFREDO_IMAGE_URL}
                alt="Mtro. Alfredo Cobos"
                className="relative z-10 h-full w-full max-w-[560px] object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,0.68)] [mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)]"
              />
            </div>

            <div className="order-1 py-8 text-center lg:col-span-7 lg:pl-10 lg:text-left">
              <div className="flex flex-wrap justify-center gap-2 text-xs font-black uppercase tracking-[0.12em] lg:justify-start">
                <span className="rounded-full bg-[#12a8f4] px-4 py-2">
                  Fundamentos contables
                </span>
                <span className="rounded-full border border-white/18 bg-white/5 px-4 py-2 text-white/68">
                  Guia practica
                </span>
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-[#27c7ff]">
                Domina la base de todo registro
              </p>

              <h1 className="mt-3 text-5xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-[5.4rem]">
                Cuentas
                <span className="block text-[#27c7ff]">Contables</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/74 sm:text-xl lg:mx-0">
                Una guia para entender la naturaleza, clasificacion y uso de
                las cuentas sin depender de la memoria ni registrar por
                intuicion.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold text-white/72 lg:justify-start">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#12a8f4]/40 text-[#27c7ff]">
                  AC
                </span>
                Impartido por el Mtro. Alfredo Cobos
              </div>

              <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <div className="rounded-md bg-white px-7 py-3 text-3xl font-black text-black shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
                  $297 MXN
                </div>
                <p className="max-w-[210px] text-sm leading-relaxed text-white/54">
                  Pago unico, acceso inmediato y contenido disponible 24/7.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={CHECKOUT_URL}
                  onClick={handleCheckoutClick}
                  className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#12a8f4] px-8 text-lg font-black transition hover:bg-[#0698df]"
                >
                  Quiero dominar mis cuentas
                  <span className="ml-4 text-2xl">→</span>
                </a>
                <a
                  href="#temario"
                  className="inline-flex min-h-14 items-center justify-center rounded-md border border-[#12a8f4] px-7 text-base font-black transition hover:bg-[#12a8f4]/10"
                >
                  Ver contenido
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contenido" className="bg-white text-[#101318]">
          <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:px-8 lg:py-20">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078ee2]">
                La base antes de avanzar
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                ¿Que es esta guia?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-black/68">
                Es un recurso practico para comprender como se organiza la
                informacion contable y por que cada operacion debe registrarse
                en una cuenta especifica.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-black/68">
                No aprenderas una lista para memorizar. Aprenderas una logica
                que puedas aplicar al revisar facturas, polizas, balanzas y
                estados financieros.
              </p>
            </div>

            <div className="relative min-h-[330px] overflow-hidden bg-[#eef8ff] p-7">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(7,142,226,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(7,142,226,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative grid h-full grid-cols-4 items-end gap-4 pt-16">
                {[32, 48, 62, 78].map((height, index) => (
                  <div key={height} className="flex flex-col items-center gap-3">
                    <span className="font-black text-[#078ee2]">
                      {index + 1}
                    </span>
                    <div
                      className="w-full bg-[linear-gradient(to_top,#0666b5,#24c8ff)]"
                      style={{ height: `${height * 2}px` }}
                    />
                  </div>
                ))}
              </div>
              <div className="relative mt-5 border-t-4 border-[#101318] pt-3 text-center text-sm font-black uppercase tracking-[0.2em]">
                Orden · Registro · Lectura · Decision
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="bg-[#090c10]">
          <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#27c7ff]">
                Lo que vas a lograr
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                De registrar por intuicion a trabajar con criterio
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/62">
                Una ruta concreta para comprender que cuenta usar, como se
                mueve y que significa su saldo.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {outcomes.map((item) => (
                <article key={item.number} className="bg-[#090c10] p-6">
                  <p className="text-3xl font-black text-[#12a8f4]">
                    {item.number}
                  </p>
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/58">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="para-quien" className="bg-[#f5f7fa] text-[#101318]">
          <div className="mx-auto grid max-w-[1160px] gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078ee2]">
                Ideal para ti si
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Quieres bases que realmente puedas aplicar
              </h2>

              <div className="mt-8 space-y-4">
                {audience.map((item) => (
                  <div key={item} className="flex gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#12a8f4] text-xs font-black text-white">
                      ✓
                    </span>
                    <p className="font-semibold leading-relaxed text-black/68">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0b0f14] p-7 text-white sm:p-9">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#27c7ff]">
                Tu siguiente nivel
              </p>
              <h3 className="mt-3 text-3xl font-black">
                Una contabilidad mas ordenada empieza desde el catalogo
              </h3>
              <p className="mt-5 leading-relaxed text-white/64">
                Cuando comprendes las cuentas, puedes revisar mejor el trabajo,
                explicar resultados y avanzar hacia procesos contables y
                fiscales mas complejos.
              </p>

              <div className="mt-8 border-l-4 border-[#12a8f4] bg-white/[0.06] p-5">
                <p className="text-2xl font-black text-[#27c7ff]">
                  Metodo CEFIN
                </p>
                <p className="mt-2 font-semibold text-white/76">
                  Concepto claro, ejemplo aplicado y criterio para decidir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="temario" className="bg-white text-[#101318]">
          <div className="mx-auto max-w-[1120px] px-5 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078ee2]">
                  Contenido paso a paso
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                  Lo que encontraras dentro
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-black/64">
                  Ocho bloques breves y aplicados para que puedas consultar la
                  guia mientras trabajas.
                </p>
              </div>

              <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
                {syllabus.map((item, index) => (
                  <div key={item} className="flex gap-4 bg-white p-5">
                    <span className="text-xl font-black text-[#078ee2]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-semibold leading-relaxed text-black/72">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#090c10]">
          <div className="mx-auto grid max-w-[1240px] gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Practico", "Sin teoria innecesaria. Todo orientado al registro."],
              ["Inmediato", "Acceso disponible desde el momento de tu compra."],
              ["A tu ritmo", "Consulta el contenido cuando y donde lo necesites."],
              ["Protegido", "Compra segura y garantia de satisfaccion."],
            ].map(([title, text]) => (
              <div key={title} className="bg-[#090c10] px-6 py-8">
                <p className="text-xl font-black text-[#27c7ff]">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/56">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-[#f5f7fa] text-[#101318]">
          <div className="mx-auto max-w-[920px] px-5 py-16 lg:px-8 lg:py-20">
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#078ee2]">
                Preguntas frecuentes
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Antes de comenzar
              </h2>
            </div>

            <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                    {faq.question}
                    <span className="text-2xl text-[#078ee2] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pt-3 leading-relaxed text-black/62">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="comprar" className="relative overflow-hidden bg-[#080b0f]">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(18,168,244,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(18,168,244,0.18)_1px,transparent_1px)] [background-size:38px_38px]" />

          <div className="relative mx-auto grid max-w-[1120px] gap-10 px-5 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8 lg:py-20">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#27c7ff]">
                Empieza hoy
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
                Cada registro correcto comienza con una cuenta bien elegida.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/62">
                Invierte en una base contable que podras consultar una y otra
                vez durante tu formacion y tu trabajo.
              </p>
            </div>

            <div className="border border-white/12 bg-white/[0.06] p-6 text-center backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-white/52">
                Pago unico
              </p>
              <p className="mt-2 text-5xl font-black">$297 MXN</p>
              <p className="mt-2 text-sm font-semibold text-[#27c7ff]">
                Acceso inmediato y de por vida
              </p>

              <a
                href={CHECKOUT_URL}
                onClick={handleCheckoutClick}
                className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-md bg-[#12a8f4] px-7 text-lg font-black transition hover:bg-[#0698df]"
              >
                Quiero acceder ahora
                <span className="ml-4 text-2xl">→</span>
              </a>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-white/42">
                Compra segura · Garantia de 7 dias
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#050608]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-7 text-center text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
            <p className="text-xl font-black text-white">CEFIN</p>
            <p>Formacion practica para contadores que quieren avanzar.</p>
            <a href="https://cefin.mx" className="font-bold hover:text-white">
              cefin.mx
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
