"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const PAYMENT_URL =
  "https://pay.hotmart.com/M105254402Q?off=hpfi29f1&checkoutMode=10&bid=1778088304149";

const PRODUCT_NAME = "Impuestos y Contabilidad para Constructoras";
const PRICE = "$3,387 MXN";
const OLD_PRICE = "$6,707 MXN";
const PRODUCT_VALUE = 3387;
const INSTALLMENT_TEXT = "o en 12 cuotas de $340.06";
const INSTALLMENT_NOTE = "* con tarjeta de credito";

const HERO_IMAGE_URL =
  "https://cefin-landings-z9uk.vercel.app/constructoras/alfredo-constructoras.png";
const includes = [
  "Curso Constructoras ABC de Contabilidad e Impuestos.",
  "4 sesiones de preguntas y respuestas para reforzar criterio.",
  "Base practica para llevar contabilidad e impuestos del giro constructor.",
  "Enfoque claro para asesorar mejor a clientes del sector.",
];

const modules = [
  "Modulo 1. Logica contable real en el giro constructor",
  "Modulo 2. Impuestos, riesgos y errores que cuestan dinero",
  "Modulo 3. Costos, materiales y orden de operaciones",
  "Modulo 4. Criterio para explicar estados y obligaciones al cliente",
  "Modulo 5. Ruta para convertirte en un asesor mas solido en constructoras",
];

const bonuses = [
  "Acceso inmediato al contenido",
  "Material de apoyo para repasar los puntos clave",
  "4 sesiones de preguntas y respuestas",
];

export default function ConstructorasRetargetingPage() {
  const handleCheckoutClick = () => {
    trackMetaEvent("InitiateCheckout", {
      content_name: PRODUCT_NAME,
      content_category: "Curso",
      value: PRODUCT_VALUE,
      currency: META_CURRENCY,
    });
  };

  useEffect(() => {
    document.title = "Constructoras | Oferta Especial CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: PRODUCT_NAME,
      content_category: "Curso",
      value: PRODUCT_VALUE,
      currency: META_CURRENCY,
    });
  }, []);

  return (
    <>
      <Script
        id="meta-pixel-retargeting-constructoras"
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

      <main className="relative min-h-screen overflow-x-hidden bg-[#0b0d0c] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#121411,#161815,#0b0d0c)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,12,0.96)_0%,rgba(11,13,12,0.86)_42%,rgba(11,13,12,0.40)_74%,rgba(11,13,12,0.66)_100%)]" />
          <div className="absolute left-0 top-0 h-[180px] w-[240px] opacity-60 [background-image:radial-gradient(#bfff5c_1.25px,transparent_1.25px)] [background-size:10px_10px]" />
          <div className="absolute bottom-[-8%] left-[-8%] h-[320px] w-[320px] rounded-full bg-lime-400/10 blur-[120px]" />
          <div className="absolute right-[-6%] top-[15%] h-[300px] w-[300px] rounded-full bg-emerald-500/15 blur-[130px]" />
          <div className="absolute bottom-[20%] left-[12%] hidden h-[1px] w-[30%] bg-lime-300/50 lg:block" />
          <div className="absolute bottom-[23%] left-[13%] hidden h-[3px] w-[22%] bg-lime-300/25 blur-sm lg:block" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[26%] lg:block xl:w-[24%]">
          <img
            src={HERO_IMAGE_URL}
            alt="Mtro. Alfredo Cobos"
            className="absolute bottom-0 right-[-10%] h-[78%] w-auto max-w-none object-contain opacity-95 xl:right-[-12%] xl:h-[76%]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0b0d0c]/0 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0b0d0c] via-[#0b0d0c]/85 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <img
            src={HERO_IMAGE_URL}
            alt="Mtro. Alfredo Cobos"
            className="absolute bottom-0 right-[-16%] h-[56%] w-auto max-w-none object-contain opacity-62 sm:right-[-10%] sm:h-[60%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,10,9,0.68)_0%,rgba(10,12,11,0.74)_36%,rgba(11,13,12,0.9)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0b0d0c] via-[#0b0d0c]/92 to-transparent" />
        </div>

        <header className="relative z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-1 rounded-full bg-gradient-to-b from-lime-300 to-emerald-500" />
              <div>
                <p className="text-2xl font-black tracking-tight">CEFIN</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                  Oferta especial para constructoras
                </p>
              </div>
            </div>

            <a
              href={PAYMENT_URL}
              onClick={handleCheckoutClick}
              className="hidden rounded-full border border-lime-300/20 bg-white/8 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/12 md:inline-flex"
            >
              Inscribirme ahora
            </a>
          </div>
        </header>

        <section className="relative z-20 mx-auto max-w-7xl px-6 pb-14 pt-0 lg:px-10 lg:pb-20 lg:pt-0">
          <div className="grid items-center gap-12 lg:grid-cols-12 xl:gap-14">
            <div className="lg:col-span-8 lg:max-w-[820px] lg:-translate-y-16 xl:-translate-y-20">
              <div className="inline-flex items-center rounded-full border border-lime-300/25 bg-black/45 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.34em] text-lime-300">
                Inscripciones abiertas
              </div>

              <div className="mt-6 max-w-4xl">
                <p className="text-base font-black uppercase tracking-[0.28em] text-white/75 sm:text-lg">
                  CEFIN
                </p>

                <h1 className="mt-2 text-5xl font-black uppercase leading-[0.82] tracking-[-0.06em] text-lime-300 sm:text-6xl lg:text-[5.4rem] xl:text-[5.8rem]">
                  Constructoras
                </h1>

                <h2 className="mt-4 max-w-3xl text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-white sm:text-3xl lg:max-w-[720px] lg:text-4xl">
                  Impuestos y contabilidad con enfoque real
                </h2>
              </div>

              <div className="mt-8 inline-flex items-center rounded-full bg-black px-6 py-4 text-lg font-black uppercase tracking-tight text-lime-300 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                Oferta especial por tiempo limitado
              </div>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Si ya viste la clase gratuita y te diste cuenta de que el giro
                constructor necesita una lectura mas fina en contabilidad,
                costos e impuestos, esta es tu oportunidad para entrar al
                programa completo con una oferta especial.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 px-8 py-5 text-base font-black uppercase tracking-tight text-[#081008] shadow-[0_18px_50px_rgba(174,255,78,0.28)] transition hover:scale-[1.01] hover:shadow-[0_24px_70px_rgba(174,255,78,0.38)] active:scale-[0.98] sm:text-lg"
                >
                  Quiero entrar ahora
                </a>

                <a
                  href="#oferta"
                  className="inline-flex items-center justify-center rounded-2xl border border-lime-300/20 bg-white/[0.03] px-8 py-5 text-base font-black uppercase tracking-tight text-white transition hover:bg-white/[0.06] sm:text-lg"
                >
                  Ver lo que incluye
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {includes.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-lime-300/10 bg-black/28 p-4 text-sm font-medium text-white/82 backdrop-blur"
                  >
                    <span className="mr-2 text-lime-300">•</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div
                id="oferta"
                className="rounded-[2rem] border border-lime-300/15 bg-white/[0.05] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:ml-auto lg:max-w-[390px]"
              >
                <p className="text-sm font-black uppercase tracking-[0.22em] text-lime-300">
                  Oferta activa
                </p>

                <h2 className="mt-4 text-3xl font-black uppercase leading-none text-white">
                  Entra hoy al programa completo
                </h2>

                <p className="mt-4 leading-relaxed text-white/72">
                  Lleva tu criterio contable y fiscal en constructoras a un
                  nivel mas claro, mas seguro y mucho mas util para tus clientes.
                </p>

                <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Producto
                  </p>
                  <p className="mt-2 text-xl font-black leading-tight text-white">
                    {PRODUCT_NAME}
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Autor: CEFIN - Contabilidad e Impuestos
                  </p>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-bold uppercase text-white/45">
                    Inversion normal
                  </p>
                  <p className="text-2xl font-black text-white/35 line-through">
                    {OLD_PRICE}
                  </p>

                  <p className="mt-4 text-sm font-bold uppercase text-lime-300">
                    Hoy puedes entrar por
                  </p>
                  <p className="text-5xl font-black tracking-tight text-white">
                    {PRICE}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/65">
                    {INSTALLMENT_TEXT}
                  </p>
                  <p className="text-xs text-white/45">{INSTALLMENT_NOTE}</p>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300" />
                    <p className="text-white/80">Acceso inmediato</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300" />
                    <p className="text-white/80">
                      Contenido aterrizado al giro constructor
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300" />
                    <p className="text-white/80">
                      Ruta practica para cobrar y asesorar mejor
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.4rem] border border-lime-300/12 bg-lime-300/[0.06] p-5">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-300">
                    Que contiene
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      "Curso Constructoras ABC de Contabilidad e Impuestos",
                      "4 sesiones de preguntas y respuestas",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300" />
                        <p className="text-white/82">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 px-8 py-5 text-lg font-black uppercase tracking-tight text-[#081008] shadow-[0_18px_50px_rgba(174,255,78,0.28)] transition hover:scale-[1.01] hover:shadow-[0_24px_70px_rgba(174,255,78,0.38)] active:scale-[0.98]"
                >
                  Inscribirme con precio especial
                </a>

                <p className="mt-4 text-center text-xs leading-relaxed text-white/45">
                  Oferta dirigida a personas que ya mostraron interes en la
                  clase gratuita de constructoras.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-12">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-300">
                Lo que vas a reforzar
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-white md:text-5xl">
                El problema no es solo llevar la contabilidad.
                <span className="text-lime-300">
                  {" "}
                  El reto es entender el giro constructor con criterio.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/72">
                Cuando una constructora mezcla anticipos, materiales,
                contratistas, maquinaria, costos y presion fiscal, cualquier
                error contable se vuelve caro. Este entrenamiento busca darte
                una base mas solida para ordenar mejor la informacion y
                asesorar con mas seguridad.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="grid gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module}
                className="rounded-[1.75rem] border border-lime-300/10 bg-black/25 p-6 backdrop-blur"
              >
                <p className="text-lg font-bold leading-relaxed text-white/85">
                  {module}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-300">
                Bonos y extras
              </p>
              <div className="mt-6 space-y-4">
                {bonuses.map((bonus) => (
                  <div
                    key={bonus}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-5 py-4"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300" />
                    <p className="text-white/82">{bonus}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-lime-300/15 bg-lime-300/[0.08] p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-300">
                Cierre de oferta
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none text-white">
                Entra hoy y lleva el giro constructor con mas claridad
              </h2>
              <p className="mt-5 leading-relaxed text-white/75">
                Si ya viste la clase gratuita, este es el momento de pasar de
                interes a aplicacion real con una oferta especial.
              </p>
              <a
                href={PAYMENT_URL}
                onClick={handleCheckoutClick}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 px-8 py-5 text-lg font-black uppercase tracking-tight text-[#081008] shadow-[0_18px_50px_rgba(174,255,78,0.28)] transition hover:scale-[1.01] hover:shadow-[0_24px_70px_rgba(174,255,78,0.38)] active:scale-[0.98]"
              >
                Quiero mi acceso ahora
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
