"use client";

import Script from "next/script";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { useEffect, type MouseEvent, useRef } from "react";

const CHECKOUT_URL = "https://pay.hotmart.com/R105211548E?off=2fonqwf3&checkoutMode=10&bid=1783529102396";
const PRODUCT_PRICE = 3687;
const PRODUCT_PRICE_LABEL = "$3,687 MXN";
const REGULAR_PRICE_LABEL = "$13,848 MXN";

const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";

const TEXTURE_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal-pf/textura-papel.jpg`;
const ALFREDO_IMAGE_URL = `${ASSET_BASE}/asesor-fiscal-pf/alfredo-pf.png`;

const LEARNINGS = [
  "Cómo detectar oportunidades fiscales reales en personas físicas.",
  "Qué revisar antes de proponer una estrategia o corrección.",
  "Cómo explicar obligaciones fiscales sin sonar técnico ni confuso.",
  "Cómo pasar de resolver declaraciones a vender asesoría con estructura.",
  "Cómo presentar recomendaciones con mayor seguridad profesional.",
  "Cómo cobrar mejor al convertir tu conocimiento en diagnóstico y estrategia.",
];

const INCLUDES = [
  ["🎥", "Clase práctica", "Contenido claro, directo y enfocado en personas físicas."],
  ["📄", "Material de apoyo", "Guía para seguir el proceso y tomar mejores decisiones."],
  ["🧾", "Enfoque fiscal", "Pensado para contadores que quieren asesorar con más criterio."],
  ["💼", "Aplicación comercial", "Ideas para convertir el conocimiento en servicios mejor cobrados."],
];

const BONUSES = [
  "Checklist para revisar el caso de una persona física antes de asesorar.",
  "Guía de preguntas clave para detectar necesidades fiscales del cliente.",
  "Formato base para ordenar recomendaciones y siguientes pasos.",
];

const FAQS = [
  [
    "¿Es para contadores principiantes?",
    "Sí. La página está pensada para quienes ya tienen bases fiscales, pero quieren empezar a asesorar personas físicas con más orden y seguridad.",
  ],
  [
    "¿Necesito experiencia previa como asesor fiscal?",
    "No necesariamente. La idea es ayudarte a dar tus primeros pasos de forma estructurada, sin improvisar frente al cliente.",
  ],
  [
    "¿Me sirve si ya presento declaraciones?",
    "Sí. Justamente el objetivo es que no te quedes solo en la parte operativa, sino que empieces a detectar oportunidades, explicar mejor y cobrar por criterio.",
  ],
  [
    "¿El acceso es inmediato?",
    "Sí. Después de completar tu inscripción en el checkout, recibirás las indicaciones de acceso según la plataforma de pago.",
  ],
];

export default function AsesorFiscalPFInscripcionPage() {
    const isRedirectingRef = useRef(false);
  useEffect(() => {
  document.title = "Asesor Fiscal PF | Inscripción";

  trackMetaEvent("ViewContent", {
    content_name: "Asesor Fiscal PF | Inscripción",
    content_category: "Curso de pago",
    currency: "MXN",
    value: PRODUCT_PRICE,
  });
}, []);

const handleCheckoutClick =
  (ctaLocation: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (isRedirectingRef.current) return;
    isRedirectingRef.current = true;

    trackMetaEvent("InitiateCheckout", {
      content_name: "Asesor Fiscal PF | Inscripción",
      content_category: "Curso de pago",
      currency: "MXN",
      value: PRODUCT_PRICE,
      source: ctaLocation,
    });

    trackMetaCustomEvent("ClickCheckout", {
      content_name: "Asesor Fiscal PF | Inscripción",
      content_category: "Curso de pago",
      funnel_step: "checkout_click",
      lead_stage: "purchase_intent",
      source: ctaLocation,
      status: "checkout_opened",
    });

    window.setTimeout(() => {
      window.location.href = CHECKOUT_URL;
    }, 700);
  };

  return (
    <>
      <Script
        id="meta-pixel-asesor-fiscal-pf-inscripcion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getMetaPixelScript(),
        }}
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

      <main className="relative min-h-[100svh] overflow-x-hidden bg-[#3A241D] text-white">
        <div className="pointer-events-none fixed inset-0 z-0 landing-bg">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url("${TEXTURE_IMAGE_URL}")` }}
          />
          <div className="absolute inset-0 bg-[#3A241D]/72" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_14%,rgba(255,255,255,0.16)_0%,transparent_32%),radial-gradient(circle_at_82%_20%,rgba(225,132,82,0.26)_0%,transparent_34%),radial-gradient(circle_at_55%_78%,rgba(0,0,0,0.55)_0%,transparent_42%)]" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[radial-gradient(circle,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:4px_4px]" />
          <div className="brush brush-top-left" />
          <div className="brush brush-bottom-left" />
          <div className="brush brush-top-right" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.32)_54%,rgba(0,0,0,0.90)_100%)]" />
        </div>

        <header className="relative z-30">
          <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 pt-6 sm:px-8 lg:px-12 xl:px-16">
            <p className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
              CEFIN
            </p>

            <a
              href={CHECKOUT_URL}
              onClick={handleCheckoutClick("header")}
              className="hidden rounded-full border border-white/15 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#3A241D] shadow-[0_16px_45px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#FFF4E8] sm:inline-flex"
            >
              Inscribirme ya
            </a>
          </div>
        </header>

        <section className="relative z-20">
          <div className="mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-[1500px] items-center gap-6 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-16 xl:px-16">
            <div className="hero-copy relative z-30 order-2 text-center lg:order-1 lg:col-span-7 lg:max-w-[790px] lg:text-left">
              <p className="hero-reveal hero-reveal-delay-0 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.28)] backdrop-blur-md">
                ● Inscripción abierta
              </p>

              <h1
                className="hero-reveal hero-reveal-delay-1 premium-title mt-5 text-[2.75rem] font-black uppercase italic text-white sm:text-[4rem] md:text-[4.8rem] lg:text-[5.4rem] xl:text-[6.25rem]"
                style={{ fontFamily: "Impact, 'Arial Narrow', sans-serif" }}
              >
                <span className="block leading-[0.86]">Asesor</span>
                <span className="block leading-[0.86]">Fiscal</span>
                <span className="premium-fiscal">de Personas Físicas</span>
              </h1>

              <div className="hero-reveal hero-reveal-delay-2 mx-auto mt-4 flex max-w-[520px] items-center justify-center gap-3 lg:mx-0 lg:justify-start">
                <span className="h-px flex-1 bg-white/25" />
                <p className="text-xs font-black uppercase tracking-[0.30em] text-[#F1B08A] sm:text-sm">
                  Personas físicas
                </p>
                <span className="h-px flex-1 bg-white/25" />
              </div>

              <p className="hero-reveal hero-reveal-delay-3 mx-auto mt-5 max-w-2xl text-lg font-bold leading-relaxed text-white/92 lg:ml-0 lg:mr-auto lg:text-xl">
                Aprende a dar tus primeros pasos como asesor fiscal de personas
                físicas, con estructura, criterio y seguridad para dejar de
                competir solo por declaraciones.
              </p>

              <div className="hero-reveal hero-reveal-delay-4 mx-auto mt-6 max-w-2xl rounded-[1.7rem] border border-white/15 bg-black/22 p-4 text-left shadow-[0_20px_55px_rgba(0,0,0,0.25)] backdrop-blur-md lg:mx-0">
                <p className="text-sm font-bold leading-relaxed text-white/82 sm:text-base">
                  Para contadores que ya resuelven trámites, declaraciones o
                  dudas fiscales, pero quieren empezar a vender asesoría con más
                  valor, más claridad y mejor posicionamiento frente al cliente.
                </p>
              </div>

              <div className="hero-reveal hero-reveal-delay-5 mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={CHECKOUT_URL}
                  onClick={handleCheckoutClick("hero")}
                  className="cta-pulse group relative flex min-h-[64px] w-full max-w-[430px] items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/20 bg-gradient-to-r from-[#E18452] via-[#C66A42] to-[#9F4F31] px-7 py-5 text-center text-base font-black uppercase tracking-[0.1em] text-white shadow-[0_24px_65px_rgba(0,0,0,0.55)] ring-4 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.62)] active:translate-y-0 active:scale-[0.98] sm:w-auto sm:px-11"
                >
                  <span className="absolute inset-y-0 left-[-35%] w-[30%] rotate-12 bg-white/30 blur-md transition duration-700 group-hover:left-[120%]" />
                  <span className="relative">Inscribirme ya</span>
                </a>

                <div className="rounded-2xl border border-white/15 bg-white/[0.08] px-5 py-4 text-center shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md sm:text-left">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/60">
                    Precio de inscripción
                  </p>
                  <p className="mt-1 text-3xl font-black text-[#F6B17D]">
                    {PRODUCT_PRICE_LABEL}
                  </p>
                </div>
              </div>

              <p className="hero-reveal hero-reveal-delay-6 mx-auto mt-3 max-w-[460px] text-center text-xs font-bold uppercase tracking-[0.14em] text-white/65 lg:mx-0 lg:text-left">
                Acceso en línea · enfoque práctico · contenido para contadores
              </p>

              <div className="hero-reveal hero-reveal-delay-7 mt-6 grid grid-cols-3 gap-2 sm:gap-3 lg:max-w-[680px]">
                {[
                  ["📚", "Curso", "Práctico"],
                  ["💼", "Enfoque", "Asesoría fiscal"],
                  ["📡", "Modalidad", "En línea"],
                ].map(([icon, title, detail]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/15 bg-white/[0.08] px-3 py-4 text-left shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md sm:px-4"
                  >
                    <p className="text-lg sm:text-xl">{icon}</p>
                    <p className="mt-2 text-[11px] font-black uppercase leading-tight tracking-wide text-white sm:text-sm">
                      {title}
                    </p>
                    <p className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-white/55 sm:text-xs">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-photo relative z-20 order-1 mx-auto flex h-[250px] w-full max-w-[360px] items-end justify-center sm:h-[310px] sm:max-w-[430px] md:h-[360px] lg:order-2 lg:col-span-5 lg:h-[min(76vh,760px)] lg:max-w-none lg:justify-end">
              <div className="brush brush-photo-white" />
              <div className="brush brush-photo-orange" />
              <div className="brush brush-photo-black" />
              <img
                src={ALFREDO_IMAGE_URL}
                alt="Mtro. Alfredo Cobos"
                className="hero-image relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_32px_70px_rgba(0,0,0,0.70)]"
              />
            </div>
          </div>
        </section>

        <section className="relative z-20 border-y border-white/10 bg-black/20 py-10 backdrop-blur-sm sm:py-12">
          <div className="mx-auto grid w-full max-w-[1180px] gap-4 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
            {[
              ["De operativo a asesor", "Deja de ser visto solo como quien presenta declaraciones y empieza a ser percibido como quien ayuda a tomar mejores decisiones."],
              ["Mayor seguridad", "Ordena tu criterio fiscal para explicar, recomendar y sostener tus propuestas frente a personas físicas."],
              ["Mejor valor percibido", "Convierte tu conocimiento en diagnósticos, recomendaciones y servicios que se pueden cobrar mejor."],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
              >
                <p className="text-lg font-black uppercase tracking-tight text-[#F6B17D]">
                  {title}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-white/76">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-20 py-14 sm:py-20">
          <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[#F6B17D]">
                Lo que vas a trabajar
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none text-white sm:text-4xl lg:text-5xl">
                Una ruta clara para comenzar a asesorar personas físicas
              </h2>
              <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/72">
                La intención no es llenarte de teoría. Es ayudarte a pensar con
                estructura, detectar oportunidades y comunicar mejor tu valor
                como contador.
              </p>

              <div className="mt-8 grid gap-3">
                {LEARNINGS.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.25rem] border border-white/12 bg-white/[0.07] p-4 shadow-[0_14px_35px_rgba(0,0,0,0.16)]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F6B17D] text-sm font-black text-[#3A241D]">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm font-bold leading-relaxed text-white/84 sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-6 rounded-[2rem] border border-white/15 bg-[#FFF4E8] p-5 text-[#2B1710] shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#A85A3A]">
                  Inscripción
                </p>
                <h3 className="mt-3 text-3xl font-black uppercase leading-none">
                  Asesor Fiscal de Personas Físicas
                </h3>
                <p className="mt-3 text-sm font-bold leading-relaxed text-[#5F3A2B]">
                  Para contadores que quieren vender asesoría fiscal con más
                  estructura, claridad y autoridad.
                </p>

                <div className="mt-6 rounded-[1.5rem] bg-white p-5 shadow-[0_18px_45px_rgba(58,36,29,0.14)]">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8C5A46]">
                    Precio actual
                  </p>
                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-5xl font-black tracking-tight text-[#3A241D]">
                      {PRODUCT_PRICE_LABEL}
                    </p>
                  </div>
                  <p className="mt-2 text-sm font-bold text-[#8C5A46] line-through">
                    Valor de referencia {REGULAR_PRICE_LABEL}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 text-sm font-bold leading-relaxed text-[#4F2F23]">
                  <li>✓ Acceso al contenido del programa</li>
                  <li>✓ Material de apoyo descargable</li>
                  <li>✓ Enfoque práctico para personas físicas</li>
                  <li>✓ Compra segura desde la plataforma de pago</li>
                </ul>

                <a
                  href={CHECKOUT_URL}
                  onClick={handleCheckoutClick("price_card")}
                  className="mt-6 flex min-h-[60px] w-full items-center justify-center rounded-[1.25rem] bg-gradient-to-r from-[#E18452] via-[#C66A42] to-[#9F4F31] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_45px_rgba(159,79,49,0.38)] transition hover:-translate-y-1"
                >
                  Inscribirme ya
                </a>

                <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#8C5A46]">
                  Revisa el link de checkout antes de publicar
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="relative z-20 bg-[#23130F]/72 py-14 sm:py-20">
          <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[#F6B17D]">
                Qué incluye
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none text-white sm:text-4xl lg:text-5xl">
                Una experiencia simple, directa y aplicable
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {INCLUDES.map(([icon, title, text]) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                >
                  <p className="text-3xl">{icon}</p>
                  <p className="mt-4 text-lg font-black uppercase tracking-tight text-white">
                    {title}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white/70">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 py-14 sm:py-20">
          <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[#F6B17D]">
                Bonos de acción
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none text-white sm:text-4xl">
                Herramientas para aterrizarlo más rápido
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-white/72">
                La diferencia entre saber y asesorar está en tener un proceso.
                Estos recursos te ayudan a ordenar la conversación con el
                cliente y dar siguientes pasos claros.
              </p>
            </div>

            <div className="grid gap-4 lg:col-span-7">
              {BONUSES.map((bonus, index) => (
                <div
                  key={bonus}
                  className="rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                >
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F6B17D]">
                    Bono {index + 1}
                  </p>
                  <p className="mt-2 text-lg font-black leading-snug text-white">
                    {bonus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 bg-black/24 py-14 sm:py-20">
          <div className="mx-auto grid w-full max-w-[1180px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-5">
              <div className="relative mx-auto flex h-[340px] max-w-[360px] items-end justify-center lg:mx-0">
                <div className="brush brush-photo-white" />
                <div className="brush brush-photo-orange" />
                <div className="brush brush-photo-black" />
                <img
                  src={ALFREDO_IMAGE_URL}
                  alt="Mtro. Alfredo Cobos"
                  className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_32px_70px_rgba(0,0,0,0.70)]"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[#F6B17D]">
                Impartido por
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none text-white sm:text-4xl lg:text-5xl">
                Mtro. Alfredo Cobos
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/76 sm:text-lg">
                Un enfoque práctico para que puedas ordenar tus ideas, mejorar
                la forma en que explicas el valor de tu trabajo y empezar a
                posicionarte como asesor fiscal frente a personas físicas.
              </p>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckoutClick("instructor")}
                className="mt-7 inline-flex min-h-[58px] items-center justify-center rounded-[1.25rem] bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#3A241D] shadow-[0_18px_45px_rgba(0,0,0,0.26)] transition hover:-translate-y-1 hover:bg-[#FFF4E8]"
              >
                Inscribirme ya por {PRODUCT_PRICE_LABEL}
              </a>
            </div>
          </div>
        </section>

        <section className="relative z-20 py-14 sm:py-20">
          <div className="mx-auto w-full max-w-[980px] px-5 sm:px-8 lg:px-12">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[#F6B17D]">
                Preguntas frecuentes
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none text-white sm:text-4xl">
                Antes de inscribirte
              </h2>
            </div>

            <div className="mt-8 grid gap-4">
              {FAQS.map(([question, answer]) => (
                <div
                  key={question}
                  className="rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                >
                  <p className="text-lg font-black text-white">{question}</p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white/72 sm:text-base">
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 px-5 pb-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[980px] rounded-[2rem] border border-white/15 bg-[#FFF4E8] p-6 text-center text-[#2B1710] shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#A85A3A]">
              Inscripción disponible
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-none sm:text-5xl">
              Empieza a vender asesoría, no solo declaraciones
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-relaxed text-[#5F3A2B]">
              Da el siguiente paso para ordenar tu criterio, comunicar mejor tu
              valor y comenzar a posicionarte como asesor fiscal de personas
              físicas.
            </p>
            <a
              href={CHECKOUT_URL}
              onClick={handleCheckoutClick("final_cta")}
              className="mx-auto mt-7 flex min-h-[62px] w-full max-w-[430px] items-center justify-center rounded-[1.35rem] bg-gradient-to-r from-[#E18452] via-[#C66A42] to-[#9F4F31] px-8 py-5 text-center text-base font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_45px_rgba(159,79,49,0.38)] transition hover:-translate-y-1"
            >
              Inscribirme ya por {PRODUCT_PRICE_LABEL}
            </a>
          </div>
        </section>

        <style jsx global>{`
          @keyframes heroReveal {
            from {
              opacity: 0;
              transform: translateY(22px) scale(0.98);
              filter: blur(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes photoReveal {
            from {
              opacity: 0;
              transform: translateY(34px) scale(0.96);
              filter: blur(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes heroFloat {
            0% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-6px) scale(1.008);
            }
            100% {
              transform: translateY(0px) scale(1);
            }
          }

          @keyframes heroGlow {
            0% {
              filter: drop-shadow(0 32px 70px rgba(0, 0, 0, 0.55));
            }
            50% {
              filter: drop-shadow(0 42px 90px rgba(0, 0, 0, 0.72));
            }
            100% {
              filter: drop-shadow(0 32px 70px rgba(0, 0, 0, 0.55));
            }
          }

          @keyframes backgroundDrift {
            from {
              transform: scale(1.02) translate3d(0, 0, 0);
            }
            to {
              transform: scale(1.05) translate3d(-10px, -8px, 0);
            }
          }

          @keyframes ctaPulse {
            0%,
            100% {
              box-shadow:
                0 24px 65px rgba(0, 0, 0, 0.55),
                0 0 0 0 rgba(225, 132, 82, 0.32);
            }
            50% {
              box-shadow:
                0 30px 80px rgba(0, 0, 0, 0.62),
                0 0 0 10px rgba(225, 132, 82, 0);
            }
          }

          .landing-bg {
            animation: backgroundDrift 18s ease-in-out infinite alternate;
            transform-origin: center;
          }

          .hero-photo {
            animation: photoReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-delay: 180ms;
          }

          .hero-image {
            animation:
              heroFloat 7s ease-in-out 1.2s infinite,
              heroGlow 7s ease-in-out 1.2s infinite;
            transform-origin: center bottom;
            will-change: transform, filter;
          }

          .hero-reveal {
            animation: heroReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .hero-reveal-delay-1 {
            animation-delay: 100ms;
          }

          .hero-reveal-delay-2 {
            animation-delay: 180ms;
          }

          .hero-reveal-delay-3 {
            animation-delay: 260ms;
          }

          .hero-reveal-delay-4 {
            animation-delay: 340ms;
          }

          .hero-reveal-delay-5 {
            animation-delay: 420ms;
          }

          .hero-reveal-delay-6 {
            animation-delay: 500ms;
          }

          .hero-reveal-delay-7 {
            animation-delay: 580ms;
          }

          .cta-pulse {
            animation:
              heroReveal 760ms cubic-bezier(0.22, 1, 0.36, 1) 340ms both,
              ctaPulse 2.6s ease-in-out 1.3s infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .landing-bg,
            .hero-photo,
            .hero-reveal,
            .cta-pulse {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
            .hero-image {
              animation: none !important;
            }
          }

          .premium-title {
            overflow: visible;
            padding-right: 0.12em;
            text-shadow:
              0 5px 0 rgba(0, 0, 0, 0.42),
              0 22px 55px rgba(0, 0, 0, 0.34);
          }

          .premium-fiscal {
            display: block;
            width: max-content;
            margin: 0.04em auto 0;
            padding: 0.02em 0.18em 0.18em 0.03em;
            overflow: visible;
            line-height: 0.98;
            background: none;
            color: #f5a06d;
            -webkit-text-fill-color: #f5a06d;
            text-shadow:
              0 3px 0 rgba(112, 48, 25, 0.82),
              0 7px 0 rgba(53, 20, 10, 0.42),
              0 16px 24px rgba(0, 0, 0, 0.28);
          }

          @media (min-width: 1024px) {
            .premium-fiscal {
              margin-left: 0;
              margin-right: 0;
            }
          }

          .brush {
            position: absolute;
            pointer-events: none;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            filter: drop-shadow(0 22px 40px rgba(0, 0, 0, 0.32));
          }

          .brush::before,
          .brush::after {
            content: "";
            position: absolute;
            inset: 0;
            background: inherit;
            clip-path: inherit;
            opacity: 0.45;
            transform: translate(18px, 10px) scaleX(0.96);
          }

          .brush::after {
            opacity: 0.28;
            transform: translate(-14px, -8px) scaleX(1.03);
          }

          .brush-top-left {
            left: -7%;
            top: 8%;
            z-index: 1;
            width: 62%;
            height: 33%;
            background: #050505;
            clip-path: polygon(
              0 18%,
              8% 11%,
              19% 14%,
              29% 6%,
              43% 13%,
              55% 5%,
              72% 12%,
              90% 7%,
              100% 18%,
              94% 32%,
              100% 45%,
              88% 55%,
              97% 68%,
              77% 72%,
              83% 85%,
              60% 80%,
              51% 94%,
              37% 82%,
              24% 92%,
              16% 74%,
              3% 80%,
              9% 56%,
              0 48%
            );
          }

          .brush-bottom-left {
            left: -12%;
            bottom: -2%;
            z-index: 1;
            width: 45%;
            height: 18%;
            background: #020202;
            clip-path: polygon(
              0 38%,
              13% 24%,
              27% 32%,
              42% 18%,
              58% 28%,
              72% 14%,
              100% 34%,
              93% 55%,
              100% 76%,
              74% 66%,
              61% 88%,
              42% 72%,
              24% 86%,
              12% 66%,
              0 72%
            );
          }

          .brush-top-right {
            right: -9%;
            top: 20%;
            z-index: 1;
            width: 28%;
            height: 17%;
            background: #050505;
            opacity: 0.82;
            clip-path: polygon(
              0 36%,
              18% 16%,
              36% 24%,
              53% 10%,
              77% 21%,
              100% 13%,
              94% 38%,
              100% 58%,
              80% 72%,
              62% 62%,
              43% 86%,
              21% 68%,
              5% 76%
            );
          }

          .brush-photo-white {
            bottom: 9%;
            right: -2%;
            z-index: 1;
            width: 105%;
            height: 66%;
            background: #fff4e8;
            opacity: 0.96;
            clip-path: polygon(
              0 48%,
              9% 37%,
              18% 42%,
              27% 28%,
              41% 33%,
              53% 18%,
              68% 28%,
              82% 13%,
              100% 23%,
              91% 42%,
              100% 56%,
              84% 62%,
              94% 78%,
              69% 72%,
              58% 91%,
              45% 76%,
              24% 86%,
              14% 68%,
              0 75%
            );
          }

          .brush-photo-orange {
            bottom: 18%;
            right: -7%;
            z-index: 0;
            width: 92%;
            height: 45%;
            background: linear-gradient(
              90deg,
              rgba(225, 132, 82, 0.1),
              rgba(225, 132, 82, 0.82)
            );
            clip-path: polygon(
              0 44%,
              18% 31%,
              32% 38%,
              48% 22%,
              66% 33%,
              100% 17%,
              91% 41%,
              100% 61%,
              72% 54%,
              58% 80%,
              40% 62%,
              22% 74%
            );
            filter: blur(1px) drop-shadow(0 0 30px rgba(225, 132, 82, 0.48));
          }

          .brush-photo-black {
            bottom: 0;
            right: -4%;
            z-index: 0;
            width: 105%;
            height: 40%;
            background: #050505;
            opacity: 0.9;
            clip-path: polygon(
              0 40%,
              10% 30%,
              24% 36%,
              40% 19%,
              58% 31%,
              78% 16%,
              100% 28%,
              90% 50%,
              100% 72%,
              72% 64%,
              55% 88%,
              35% 69%,
              18% 82%,
              0 68%
            );
          }

          @media (max-width: 1023px) {
            .brush-top-left {
              left: -24%;
              top: 12%;
              width: 112%;
              height: 22%;
            }

            .brush-bottom-left {
              left: -20%;
              bottom: 1%;
              width: 72%;
              height: 13%;
            }

            .brush-top-right {
              right: -30%;
              top: 14%;
              width: 60%;
              height: 12%;
            }

            .brush-photo-white {
              left: 50%;
              right: auto;
              bottom: 6%;
              width: 105%;
              height: 70%;
              transform: translateX(-50%);
            }

            .brush-photo-orange {
              left: 50%;
              right: auto;
              bottom: 14%;
              width: 100%;
              height: 48%;
              transform: translateX(-50%);
            }

            .brush-photo-black {
              left: 50%;
              right: auto;
              bottom: 0;
              width: 110%;
              height: 40%;
              transform: translateX(-50%);
            }
          }
        `}</style>
      </main>
    </>
  );
}
