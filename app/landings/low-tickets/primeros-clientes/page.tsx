"use client";

import Image from "next/image";
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
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/primeros-5-clientes/alfredo-5-clientes.png`;
const outcomes = [
  ["01", "Define a tu cliente ideal", "Deja de hablarle a todos y reconoce a quién puedes ayudar mejor."],
  ["02", "Presenta tus servicios", "Explica lo que haces de forma clara, profesional y fácil de valorar."],
  ["03", "Inicia conversaciones", "Usa mensajes prácticos para contactar prospectos sin sentirte invasivo."],
  ["04", "Da seguimiento", "Mantén vivas las oportunidades sin perseguir ni presionar a nadie."],
  ["05", "Convierte con criterio", "Lleva cada conversación hacia una propuesta y un siguiente paso concreto."],
  ["06", "Crea un sistema", "Deja de depender únicamente de recomendaciones o de la suerte."],
];

const audience = [
  "Eres contador y estás comenzando tu despacho.",
  "Acabas de egresar y quieres conseguir tus primeros clientes.",
  "Eres auxiliar contable y quieres independizarte.",
  "Ya tienes despacho, pero todavía cuentas con pocos clientes.",
  "Dependes de recomendaciones y buscas crecer de forma constante.",
];

const roadmap = [
  ["Punto de partida", "Define qué servicio ofrecer y qué problema puedes resolver."],
  ["Prospectos correctos", "Identifica personas y empresas con mayor posibilidad de necesitarte."],
  ["Mensaje inicial", "Aprende qué decir para abrir una conversación profesional."],
  ["Presentación", "Comunica tu servicio desde el valor, no desde una lista de tareas."],
  ["Seguimiento", "Sabe cuándo volver a escribir y cómo mantener el interés."],
  ["Conversión", "Convierte una conversación en una oportunidad comercial real."],
];

const faqs = [
  {
    question: "¿Necesito tener experiencia vendiendo?",
    answer:
      "No. La guía está pensada para contadores que quieren comenzar desde una ruta clara, sencilla y aplicable.",
  },
  {
    question: "¿Esto funciona si todavía no tengo despacho?",
    answer:
      "Sí. Puedes usarla para validar tus primeros servicios y comenzar a construir una cartera antes de independizarte por completo.",
  },
  {
    question: "¿Cuándo recibo el acceso?",
    answer:
      "El acceso es inmediato después de confirmar tu pago y podrás revisar el contenido a tu propio ritmo.",
  },
  {
    question: "¿La inversión es un solo pago?",
    answer:
      "Sí. Son $297 MXN en un solo pago, sin mensualidades ni cargos recurrentes.",
  },
];

export default function PrimerosClientesPage() {
  useEffect(() => {
    document.title = "Tus Primeros 5 Clientes Contables | CEFIN";
    trackMetaEvent("ViewContent", {
      content_name: "Tus Primeros 5 Clientes Contables",
      content_category: "Crecimiento de despacho / Captación de clientes",
      value: PRICE,
      currency: META_CURRENCY,
    });
  }, []);

  const handleCheckout = () => {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Tus Primeros 5 Clientes Contables",
      content_category: "Low ticket evergreen",
      value: PRICE,
      currency: META_CURRENCY,
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-primeros-clientes"
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

      <main className="landing overflow-x-hidden bg-[#05070a] text-white">
        <section className="hero relative isolate min-h-svh overflow-hidden">
          <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_72%_25%,rgba(0,159,255,.2),transparent_30%),linear-gradient(120deg,#05070a_0%,#0a1119_54%,#030507_100%)]" />
          <div className="grid-lines absolute inset-0 -z-20 opacity-25" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-[linear-gradient(to_bottom,transparent,#05070a)]" />

          <div className="mx-auto flex min-h-svh max-w-[1240px] flex-col px-5 pb-10 pt-7 sm:px-8 lg:px-10">
            <div className="reveal flex items-center justify-between">
              <span className="text-2xl font-black tracking-tight sm:text-3xl">CEFIN</span>
              <span className="border border-white/15 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 backdrop-blur-md sm:text-xs">
                Guía práctica · Acceso inmediato
              </span>
            </div>

            <div className="grid flex-1 items-center gap-3 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-0">
              <div className="reveal delay-1 relative order-2 mx-auto h-[380px] w-full max-w-[510px] self-end sm:h-[510px] lg:order-1 lg:h-[690px]">
                <div className="absolute bottom-[12%] left-1/2 h-[62%] w-[72%] -translate-x-1/2 border border-[#0aa8ff]/30 bg-[#087ac4]/10 [transform:translateX(-50%)_rotate(-4deg)]" />
                <div className="absolute bottom-[17%] left-[9%] h-24 w-24 border-l-2 border-t-2 border-[#17b9ff]/70" />
                <Image
                  src={ALFREDO_IMAGE_URL}
                  alt="Mtro. Alfredo Cobos"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 48vw"
                  className="object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,.72)] [mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)]"
                />
              </div>

              <div className="reveal delay-2 order-1 text-center lg:order-2 lg:pl-8 lg:text-left">
                <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                  <span className="bg-[#079de8] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] sm:text-xs">
                    Crecimiento de despacho
                  </span>
                  <span className="border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/65 sm:text-xs">
                    Captación de clientes
                  </span>
                </div>

                <p className="text-sm font-black uppercase tracking-[0.28em] text-[#32c7ff]">
                  La ruta para dejar de esperar
                </p>
                <h1 className="mt-4 text-[clamp(3.3rem,8vw,7.4rem)] font-black leading-[0.82] tracking-normal">
                  Tus primeros
                  <span className="mt-2 block text-[#18b8ff]">5 clientes</span>
                  <span className="mt-3 block text-[.55em] leading-none text-white">contables</span>
                </h1>

                <p className="mx-auto mt-7 max-w-[680px] text-base leading-relaxed text-white/72 sm:text-xl lg:mx-0">
                  Una guía práctica para atraer, contactar y convertir prospectos
                  en clientes para tu despacho contable.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold text-white/65 lg:justify-start">
                  <span className="flex h-9 w-9 items-center justify-center border border-[#18b8ff]/50 text-xs font-black text-[#32c7ff]">
                    AC
                  </span>
                  Impartido por el Mtro. Alfredo Cobos
                </div>

                <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <span className="bg-white px-7 py-3 text-3xl font-black text-[#05070a] shadow-[0_15px_45px_rgba(0,158,255,.2)]">
                    $297 MXN
                  </span>
                  <a
                    href={CHECKOUT_URL}
                    onClick={handleCheckout}
                    className="cta-shine inline-flex min-h-16 items-center justify-center bg-[#079fe9] px-8 text-base font-black transition duration-300 hover:-translate-y-1 hover:bg-[#18b8ff] sm:text-lg"
                  >
                    Quiero empezar ahora <span className="ml-4 text-2xl">→</span>
                  </a>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/42">
                  Pago único · Acceso inmediato · Disponible 24/7
                </p>
              </div>
            </div>

            <a
              href="#transformacion"
              className="mx-auto hidden animate-bounce items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45 lg:flex"
            >
              Descubre la ruta <span>↓</span>
            </a>
          </div>
        </section>

        <section id="transformacion" className="bg-white text-[#090c11]">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Una guía para avanzar</p>
              <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-normal sm:text-6xl">
                Tu despacho no tiene que crecer por casualidad.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/65">
                Si quieres clientes, pero no sabes cómo buscarlos, esta guía te
                ayuda a convertir la incertidumbre en acciones concretas.
              </p>
            </div>

            <div className="relative border-l border-black/15 pl-6 sm:pl-10">
              <div className="absolute -left-[5px] top-0 h-3 w-3 bg-[#079fe9]" />
              <p className="text-sm font-black uppercase tracking-[0.18em] text-black/40">Pasas de</p>
              <p className="mt-3 text-2xl font-black text-black/48 line-through decoration-[#079fe9] decoration-2 sm:text-3xl">
                “Quiero clientes, pero no sé cómo buscarlos”
              </p>
              <div className="my-8 h-px bg-black/10" />
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#078fd1]">A lograr</p>
              <p className="mt-3 text-2xl font-black leading-tight sm:text-4xl">
                Una ruta clara para contactar prospectos, presentar tus servicios
                y conseguir tus primeros clientes contables.
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#080b0f]">
          <div className="grid-lines absolute inset-0 opacity-10" />
          <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="eyebrow">Lo que vas a lograr</p>
              <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                De la intención a un sistema comercial.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
                Aprende el proceso completo para crear oportunidades sin dejar de
                sentirte contador.
              </p>
            </div>

            <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {outcomes.map(([number, title, text]) => (
                <article
                  key={number}
                  className="group border-b border-r border-white/10 p-7 transition duration-500 hover:bg-[#079fe9]/10 sm:p-9"
                >
                  <p className="text-sm font-black tracking-[0.2em] text-[#21bfff]">{number}</p>
                  <h3 className="mt-10 text-2xl font-black transition group-hover:text-[#32c7ff]">{title}</h3>
                  <p className="mt-3 leading-relaxed text-white/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#edf5f9] text-[#090c11]">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
              <div>
                <p className="eyebrow">Tu mapa de acción</p>
                <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                  Qué encontrarás dentro de la guía
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-black/60">
                  Sin teoría de relleno. Cada bloque responde a una decisión que
                  necesitas tomar para conseguir clientes.
                </p>
              </div>

              <div className="border-t border-black/15">
                {roadmap.map(([title, text], index) => (
                  <div
                    key={title}
                    className="group grid gap-3 border-b border-black/15 py-6 sm:grid-cols-[70px_190px_1fr] sm:items-center"
                  >
                    <span className="text-sm font-black text-[#078fd1]">
                      0{index + 1}
                    </span>
                    <h3 className="text-lg font-black">{title}</h3>
                    <p className="leading-relaxed text-black/55">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-[#090c11]">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Ideal para ti si...</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                Estás listo para dejar de esperar recomendaciones.
              </h2>
              <div className="mt-9 space-y-5">
                {audience.map((item) => (
                  <div key={item} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-[#079fe9] text-xs font-black text-white">
                      ✓
                    </span>
                    <p className="text-lg font-semibold leading-relaxed text-black/65">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden bg-[#080b0f] p-8 text-white sm:p-12">
              <div className="grid-lines absolute inset-0 opacity-15" />
              <div className="relative">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#32c7ff]">
                  Después de tus primeros clientes
                </p>
                <h3 className="mt-4 text-4xl font-black leading-tight">
                  Escala hacia algo más grande.
                </h3>
                <p className="mt-5 leading-relaxed text-white/62">
                  Esta guía es el primer paso. Cuando estés listo para construir,
                  posicionar y escalar tu despacho, continúa con nuestro programa
                  completo.
                </p>
                <div className="mt-9 border-l-4 border-[#079fe9] bg-white/[0.06] p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-white/45">Método CEFIN</p>
                  <p className="mt-2 text-2xl font-black">
                    Incubadora de Despachos Contables
                  </p>
                </div>
                <a href="https://cefin.mx" className="mt-8 inline-flex font-black text-[#32c7ff]">
                  Conoce el Método CEFIN <span className="ml-3">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#080b0f]">
          <div className="mx-auto grid max-w-[1240px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Práctico", "Acciones concretas, sin teoría innecesaria."],
              ["Inmediato", "Comienza en cuanto confirmes tu compra."],
              ["Flexible", "Avanza a tu ritmo, desde donde estés."],
              ["Seguro", "Pago único y compra protegida."],
            ].map(([title, text]) => (
              <div key={title} className="border-b border-white/10 px-7 py-9 sm:border-r">
                <p className="text-xl font-black text-[#32c7ff]">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="comprar" className="relative overflow-hidden bg-[#05070a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,163,255,.16),transparent_38%)]" />
          <div className="grid-lines absolute inset-0 opacity-15" />
          <div className="relative mx-auto max-w-[1050px] px-5 py-20 text-center sm:px-8 lg:py-28">
            <p className="eyebrow">Da el primer paso hoy</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
              Tu próximo cliente puede estar más cerca de lo que crees.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/58">
              Comienza a construir el despacho que quieres con una ruta práctica
              para encontrar y convertir oportunidades.
            </p>

            <div className="mx-auto mt-10 max-w-[560px] border border-white/15 bg-white/[0.05] p-6 backdrop-blur sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Pago único</p>
              <p className="mt-2 text-5xl font-black sm:text-6xl">$297 MXN</p>
              <p className="mt-3 font-bold text-[#32c7ff]">Acceso inmediato</p>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine mt-7 inline-flex min-h-16 w-full items-center justify-center bg-[#079fe9] px-7 text-lg font-black transition duration-300 hover:-translate-y-1 hover:bg-[#18b8ff]"
              >
                Quiero empezar ahora <span className="ml-4 text-2xl">→</span>
              </a>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-white/40">
                Compra segura · Sin mensualidades
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#edf5f9] text-[#090c11]">
          <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-24">
            <p className="eyebrow text-center">Preguntas frecuentes</p>
            <h2 className="mt-4 text-center text-4xl font-black sm:text-5xl">Antes de comenzar</h2>
            <div className="mt-10 border-t border-black/15">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-black/15 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                    {faq.question}
                    <span className="text-2xl text-[#078fd1] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-4 leading-relaxed text-black/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#05070a]">
          <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-3 px-5 py-7 text-center text-sm text-white/40 sm:flex-row sm:px-8 sm:text-left">
            <span className="text-xl font-black text-white">CEFIN</span>
            <p>Formación y crecimiento para contadores que quieren más.</p>
            <a href="https://cefin.mx" className="font-bold transition hover:text-white">cefin.mx</a>
          </div>
        </footer>

        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          .landing {
            --accent: #079fe9;
          }

          .grid-lines {
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
            background-size: 48px 48px;
          }

          .eyebrow {
            color: #078fd1;
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .reveal {
            animation: reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
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
            box-shadow: 0 16px 45px rgba(0, 159, 233, 0.2);
          }

          .cta-shine::after {
            position: absolute;
            inset: 0;
            content: "";
            background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.28) 47%, transparent 74%);
            transform: translateX(-130%);
            animation: shine 4.5s ease-in-out infinite;
          }

          @keyframes reveal-up {
            from {
              opacity: 0;
              transform: translateY(28px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shine {
            0%, 65% {
              transform: translateX(-130%);
            }
            90%, 100% {
              transform: translateX(130%);
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
