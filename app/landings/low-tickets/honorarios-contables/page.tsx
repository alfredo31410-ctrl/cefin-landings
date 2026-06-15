"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

// Información comercial del producto
const PRICE = 297;
const CHECKOUT_URL = "https://pay.hotmart.com/D106297950M?off=y8s212iw&checkoutMode=10";

// En producción servimos la imagen desde Vercel para evitar problemas con el proxy de cefin.mx
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/honorarios-contables/alfredo-honorarios-contables.png`;

// Resultados principales que se presentan en la sección de beneficios
const outcomes = [
  ["01", "Cotiza con seguridad", "Calcula tus honorarios con criterios claros y deja de improvisar precios."],
  ["02", "Defiende tu valor", "Explica por qué tu trabajo vale lo que cobras sin sentir culpa."],
  ["03", "Presenta propuestas", "Comunica tus servicios de forma clara, profesional y convincente."],
  ["04", "Eleva tu percepción", "Posiciónate como un especialista, no como alguien que solo entrega tareas."],
  ["05", "Mejora tus ingresos", "Construye honorarios más rentables y sostenibles para tu despacho."],
  ["06", "Atrae mejores clientes", "Trabaja con personas que reconocen y respetan tu profesionalismo."],
];

// Temas que forman parte de la guía
const lessons = [
  ["Tiempo", "Cómo calcular el tiempo real que requiere cada servicio."],
  ["Complejidad", "Cómo evaluar el nivel de dificultad y esfuerzo."],
  ["Entregables", "Cómo definir resultados claros y medibles."],
  ["Responsabilidad", "Cómo considerar el nivel de responsabilidad asumida."],
  ["Tipo de cliente", "Cómo adaptar el precio al contexto del cliente."],
  ["Valor generado", "Cómo comunicar los beneficios de tu trabajo."],
  ["Cómo cotizar", "Fórmulas y criterios para establecer honorarios."],
  ["Cómo presentar", "Estructura de una propuesta profesional."],
  ["Cómo defender el precio", "Respuestas para manejar objeciones con seguridad."],
];

// Perfil de las personas para quienes fue creado el producto
const audience = [
  "Eres contador y ya tienes prospectos o clientes.",
  "No sabes cuánto cobrar por tus servicios.",
  "Te cuesta justificar tus precios.",
  "Sientes culpa o incomodidad al cobrar.",
  "Improvisas tus cotizaciones o propuestas.",
  "Quieres profesionalizar tu forma de vender.",
];

// Preguntas frecuentes mostradas al final de la landing
const faqs = [
  {
    question: "¿Necesito tener un despacho para aprovechar la guía?",
    answer:
      "No. Puedes aplicarla si estás comenzando, si trabajas de forma independiente o si ya administras un despacho contable.",
  },
  {
    question: "¿La guía me dice exactamente cuánto cobrar?",
    answer:
      "Te ayuda a evaluar tiempo, complejidad, responsabilidad, entregables, tipo de cliente y valor generado para construir un precio con criterio.",
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

export default function HonorariosContablesPage() {
  // Registra la visita a la landing cuando el componente se carga
  useEffect(() => {
    document.title = "Honorarios Contables | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Honorarios Contables",
      content_category: "Cobro profesional / Honorarios",
      value: PRICE,
      currency: META_CURRENCY,
    });
  }, []);

  // Registra la intención de compra antes de abrir el checkout
  const handleCheckout = () => {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Honorarios Contables",
      content_category: "Guía práctica / Low ticket evergreen",
      value: PRICE,
      currency: META_CURRENCY,
    });
  };

  return (
    <>
      {/* Meta Pixel */}
      <Script
        id="meta-pixel-honorarios-contables"
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

      <main className="honorarios-landing overflow-x-hidden bg-[#031027] text-white">
        {/* Hero principal: presenta el producto, el precio y la llamada a la compra */}
        <section className="relative isolate min-h-svh overflow-hidden">
          <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_72%_30%,rgba(16,183,226,.22),transparent_30%),linear-gradient(120deg,#02091a_0%,#062b60_55%,#031331_100%)]" />
          <div className="blue-grid absolute inset-0 -z-20 opacity-20" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_bottom,transparent,#031027)]" />

          <div className="mx-auto flex min-h-svh max-w-[1280px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-10">
            {/* Encabezado mínimo para evitar distracciones */}
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
                className="cta-shine inline-flex min-h-11 items-center justify-center bg-[#4ce0dc] px-5 text-xs font-black uppercase text-[#031027] transition hover:-translate-y-0.5 hover:bg-[#72f3ef]"
              >
                Quiero inscribirme
              </a>
            </header>

            <div className="grid flex-1 items-center gap-5 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-2">
              {/* Mensaje y oferta principal */}
              <div className="reveal delay-1 order-1 text-center lg:text-left">
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  <span className="rounded-full border border-[#4ce0dc]/60 bg-[#4ce0dc]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/80 sm:text-xs">
                    Cobro profesional <span className="text-[#4ce0dc]">/ Honorarios</span>
                  </span>
                  <span className="rounded-full border border-[#4ce0dc]/60 bg-[#4ce0dc]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/80 sm:text-xs">
                    Guía práctica <span className="text-[#4ce0dc]">/ Low ticket evergreen</span>
                  </span>
                </div>

                <h1 className="mt-6 text-[clamp(3.3rem,7vw,6.9rem)] font-black uppercase leading-[0.84] tracking-normal">
                  Honorarios
                  <span className="mt-3 block text-[#4ce0dc]">Contables</span>
                </h1>
                <p className="mt-6 text-xl font-black uppercase sm:text-2xl">
                  Aprende a cotizar y cobrar sin miedo
                </p>
                <p className="mx-auto mt-3 max-w-[650px] text-lg leading-relaxed text-white/70 lg:mx-0">
                  Calcula, presenta y defiende tus honorarios contables con mayor
                  seguridad.
                </p>

                {/* Caja de compra del hero */}
                <div className="mx-auto mt-7 max-w-[640px] border border-[#4ce0dc]/55 bg-[#020a1b]/60 p-5 text-left backdrop-blur-md lg:mx-0">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <p className="text-4xl font-black text-[#4ce0dc] sm:border-r sm:border-white/15 sm:pr-7">
                      $297 <span className="text-lg text-white">MXN</span>
                    </p>
                    <div>
                      <p className="text-sm text-white/50">Impartido por el</p>
                      <p className="text-lg font-black">Mtro. Alfredo Cobos</p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-lg leading-relaxed text-white/70">
                    Una guía directa para calcular y presentar tus honorarios
                    contables con mayor seguridad.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={CHECKOUT_URL}
                      onClick={handleCheckout}
                      className="cta-shine inline-flex min-h-14 flex-1 items-center justify-center bg-[#4ce0dc] px-6 text-sm font-black uppercase text-[#031027] transition hover:-translate-y-1 hover:bg-[#72f3ef]"
                    >
                      Quiero inscribirme ahora <span className="ml-3 text-xl">→</span>
                    </a>
                    <a
                      href="#contenido"
                      className="inline-flex min-h-14 items-center justify-center border border-white/40 px-7 text-sm font-black uppercase transition hover:border-[#4ce0dc] hover:text-[#4ce0dc]"
                    >
                      Ver contenido
                    </a>
                  </div>
                </div>
              </div>

              {/* Imagen principal del instructor */}
              <div className="reveal delay-2 relative order-2 mx-auto h-[430px] w-full max-w-[590px] self-end sm:h-[590px] lg:h-[720px]">
                <div className="absolute bottom-[12%] left-1/2 h-[64%] w-[74%] -translate-x-1/2 border border-[#4ce0dc]/20 bg-[#0875bb]/10" />
                <img
                  src={ALFREDO_IMAGE_URL}
                  alt="Mtro. Alfredo Cobos"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_30px_55px_rgba(0,0,0,.7)] [mask-image:linear-gradient(to_bottom,black_0%,black_91%,transparent_100%)]"
                />
              </div>
            </div>

            {/* Beneficios rápidos visibles desde la primera pantalla */}
            <div className="grid border border-[#4ce0dc]/30 bg-[#031333]/85 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Seguridad", "Más confianza al cotizar y cobrar."],
                ["Práctico", "Método claro y accionable."],
                ["Directo", "Contenido útil, sin rodeos."],
                ["Rentable", "Mejores ingresos y mayor valor."],
              ].map(([title, description]) => (
                <div key={title} className="border-b border-[#4ce0dc]/20 px-6 py-5 sm:border-r">
                  <p className="font-black text-[#4ce0dc]">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Presentación: explica el propósito general de la guía */}
        <section id="contenido" className="bg-white text-[#071a3f]">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Qué es esta guía</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
                Cobra con método, no al tanteo.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/65">
                Una guía práctica y directa para ayudarte a calcular, presentar y
                defender tus honorarios contables con profesionalismo.
              </p>
              <p className="mt-4 text-lg font-bold leading-relaxed text-black/72">
                Aprenderás a dejar atrás el miedo, la culpa y la improvisación para
                construir propuestas de valor sólidas y cobrar lo justo por tu trabajo.
              </p>
            </div>

            {/* Ilustración construida con CSS para representar una cotización */}
            <div className="relative min-h-[390px] overflow-hidden bg-[#eaf6fb] p-7 sm:p-10">
              <div className="absolute right-[-7%] top-[-9%] h-44 w-44 rotate-12 border-[28px] border-[#16cbd1]/10" />
              <div className="relative mx-auto grid max-w-[520px] grid-cols-[1fr_0.72fr] items-end gap-5">
                <div className="bg-white p-6 shadow-[0_25px_60px_rgba(4,32,75,.16)]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0875bb]">Cotización profesional</p>
                  <div className="mt-6 space-y-5">
                    {[88, 72, 96, 62].map((width) => (
                      <div key={width} className="flex items-center gap-3">
                        <span className="text-lg font-black text-[#29c9cc]">✓</span>
                        <span className="h-2 bg-[#09275a]/12" style={{ width: `${width}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#08285c] p-5 text-white shadow-xl">
                  <p className="text-sm font-black uppercase text-[#62e8e4]">Propuesta de valor</p>
                  <div className="mt-9 flex h-32 items-end gap-2">
                    {[32, 50, 72, 98].map((height) => (
                      <span key={height} className="flex-1 bg-[#4ce0dc]" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficios: resultados concretos que obtiene el comprador */}
        <section className="relative bg-[#f3f8fb] text-[#071a3f]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="eyebrow">Lo que vas a lograr</p>
              <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                Convierte tu experiencia en honorarios bien sustentados.
              </h2>
            </div>

            <div className="mt-14 grid border-l border-t border-[#08285c]/12 sm:grid-cols-2 lg:grid-cols-3">
              {outcomes.map(([number, title, text]) => (
                <article
                  key={number}
                  className="group border-b border-r border-[#08285c]/12 bg-white p-7 transition duration-500 hover:bg-[#e6fbfb] sm:p-9"
                >
                  <p className="text-sm font-black tracking-[0.2em] text-[#0875bb]">{number}</p>
                  <h3 className="mt-9 text-2xl font-black transition group-hover:text-[#008e99]">{title}</h3>
                  <p className="mt-3 leading-relaxed text-black/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contenido de la guía e identificación del público ideal */}
        <section className="bg-white text-[#071a3f]">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-28">
            <div>
              <p className="eyebrow">Qué aprenderás</p>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Nueve decisiones para construir una cotización profesional.
              </h2>
              <div className="mt-10 grid border-l border-t border-[#08285c]/12 sm:grid-cols-2 lg:grid-cols-3">
                {lessons.map(([title, text], index) => (
                  <article key={title} className="border-b border-r border-[#08285c]/12 p-5">
                    <span className="text-xs font-black text-[#0794b4]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/55">{text}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="bg-[#eef8fa] p-7 sm:p-9">
              <p className="eyebrow">Ideal para ti si...</p>
              <div className="mt-7 space-y-5">
                {audience.map((item) => (
                  <div key={item} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#34c9c9] text-xs font-black text-white">
                      ✓
                    </span>
                    <p className="font-semibold leading-relaxed text-black/65">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* Transformación: contraste entre el estado actual y el resultado esperado */}
        <section className="bg-[#f3f8fb] text-[#071a3f]">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:px-10">
            <div className="relative overflow-hidden bg-[#05275b] p-7 text-white sm:p-10">
              <div className="blue-grid absolute inset-0 opacity-10" />
              <div className="relative">
                <h2 className="text-center text-3xl font-black uppercase sm:text-4xl">
                  De cobrar al tanteo <span className="text-[#4ce0dc]">a cobrar con claridad</span>
                </h2>
                <div className="mt-9 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                  <div className="bg-[#073c82] p-6">
                    <p className="text-center text-sm font-black uppercase tracking-[0.18em] text-white/65">Antes</p>
                    <ul className="mt-5 space-y-3 text-white/72">
                      <li>× Cotizas sin una estructura definida.</li>
                      <li>× Dudas y sientes culpa al cobrar.</li>
                      <li>× Los clientes regatean tus precios.</li>
                      <li>× Tus ingresos son bajos e inestables.</li>
                    </ul>
                  </div>
                  <span className="text-center text-6xl font-black text-[#4ce0dc]">›</span>
                  <div className="bg-[#62e8e4] p-6 text-[#031027]">
                    <p className="text-center text-sm font-black uppercase tracking-[0.18em]">Después</p>
                    <ul className="mt-5 space-y-3 font-semibold">
                      <li>✓ Cotizas con método y seguridad.</li>
                      <li>✓ Defiendes tu valor con confianza.</li>
                      <li>✓ Tus clientes valoran tu trabajo.</li>
                      <li>✓ Generas ingresos más sostenibles.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Escalamiento: productos que continúan la ruta de crecimiento */}
        <section className="bg-white text-[#071a3f]">
          <div className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
            <p className="eyebrow text-center">Escala hacia más</p>
            <h2 className="mt-4 text-center text-4xl font-black sm:text-5xl">
              Continúa profesionalizando tu despacho.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                ["01", "El arte de saber cobrar", "Mentalidad y conversaciones para cobrar con maestría."],
                ["02", "Método CEFIN", "Sistema para construir ofertas, procesos y precios rentables."],
                ["03", "Incubadora de Despachos", "Acompañamiento para escalar y multiplicar resultados."],
              ].map(([number, title, text]) => (
                <article key={number} className="group bg-[#06285c] p-7 text-white transition hover:-translate-y-1 hover:bg-[#07418e]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4ce0dc] text-sm font-black text-[#4ce0dc]">
                    {number}
                  </span>
                  <h3 className="mt-8 text-2xl font-black">{title}</h3>
                  <p className="mt-3 leading-relaxed text-white/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Oferta final: repite el precio y concentra la decisión de compra */}
        <section id="comprar" className="relative overflow-hidden bg-[#05275b]">
          <div className="blue-grid absolute inset-0 opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(76,224,220,.16),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-[1120px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-10 lg:py-24">
            <div className="text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#4ce0dc]">Tu valor tiene precio</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-6xl">
                Aprende a cobrarlo sin miedo.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/65">
                Da el siguiente paso para cotizar, presentar y cobrar tus servicios
                contables con profesionalismo.
              </p>
            </div>

            <div className="border border-[#4ce0dc]/30 bg-[#020b1f]/50 p-6 text-center backdrop-blur sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Precio especial</p>
              <p className="mt-2 text-5xl font-black text-[#4ce0dc] sm:text-6xl">$297 MXN</p>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="cta-shine mt-7 inline-flex min-h-16 w-full items-center justify-center bg-[#4ce0dc] px-7 text-lg font-black uppercase text-[#031027] transition hover:-translate-y-1 hover:bg-[#72f3ef]"
              >
                Quiero inscribirme ahora <span className="ml-4 text-2xl">→</span>
              </a>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-white/45">
                Pago seguro · Acceso inmediato · Contenido evergreen
              </p>
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes: resuelve las últimas objeciones */}
        <section className="bg-[#f3f8fb] text-[#071a3f]">
          <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-24">
            <p className="eyebrow text-center">Preguntas frecuentes</p>
            <h2 className="mt-4 text-center text-4xl font-black sm:text-5xl">Antes de comenzar</h2>
            <div className="mt-10 border-t border-[#08285c]/15">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-[#08285c]/15 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                    {faq.question}
                    <span className="text-2xl text-[#0794b4] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-4 leading-relaxed text-black/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Pie de página */}
        <footer className="border-t border-white/10 bg-[#02091a]">
          <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-3 px-5 py-7 text-center text-sm text-white/40 sm:flex-row sm:px-8 sm:text-left">
            <span className="text-xl font-black text-white">CEFIN</span>
            <p>Formación que transforma tu práctica contable.</p>
            <a href="https://cefin.mx" className="font-bold transition hover:text-white">
              cefin.mx
            </a>
          </div>
        </footer>

        {/* Estilos globales exclusivos de esta landing */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          .blue-grid {
            background-image:
              linear-gradient(rgba(76, 224, 220, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(76, 224, 220, 0.08) 1px, transparent 1px);
            background-size: 48px 48px;
          }

          .eyebrow {
            color: #0788aa;
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .reveal {
            animation: honorarios-reveal 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
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
            background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.4) 48%, transparent 74%);
            transform: translateX(-140%);
            animation: honorarios-shine 4.6s ease-in-out infinite;
          }

          @keyframes honorarios-reveal {
            from {
              opacity: 0;
              transform: translateY(28px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes honorarios-shine {
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
