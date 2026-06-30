"use client";
/* eslint-disable @next/next/no-img-element */

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const PRICE = 3687;
const CHECKOUT_URL: string = "https://pay.hotmart.com/L106443767M?off=kmo127nh&checkoutMode=10&bid=1782760909751";
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";
const MARISOL_IMAGE_URL = `${ASSET_BASE}/contadora-estrategica/marisol_contadora_estrategica.png`;
const BANNER_IMAGE_URL = `${ASSET_BASE}/contadora-estrategica/banner-contadora-estrategica.png`;

const courses = [
  "Asesor fiscal de médicos",
  "ISR por actividades empresariales",
  "RESICO",
  "Contabilidad electrónica",
  "Facturación electrónica",
  "Operaciones con el público en general",
  "Contabilidad de costos e inventarios",
  "El arte de saber cobrar para contadores",
  "Entrenamiento para la fuerza de ventas",
  "Marca personal",
];

const bonuses = [
  "Agente de inteligencia artificial Contadora Estratégica",
  "6 mentorías en vivo: Contadora Estratégica en acción",
  "Kit de inicio de la Contadora Estratégica",
];

const outcomes = [
  ["01", "Decide con estrategia", "Deja de operar solo como capturista y aprende a tomar mejores decisiones."],
  ["02", "Comunica valor", "Presenta tus servicios con claridad para que tus clientas entiendan lo que haces."],
  ["03", "Cobra mejor", "Ordena tu oferta, tus honorarios y tu posicionamiento profesional."],
  ["04", "Crece con dirección", "Combina técnica, mentalidad comercial y marca personal para avanzar con estructura."],
];

const audience = [
  "Eres contadora y quieres dejar de competir solo por precio.",
  "Quieres fortalecer tu criterio fiscal y contable con cursos prácticos.",
  "Buscas comunicar mejor tu valor profesional.",
  "Quieres una ruta para posicionarte, vender y cobrar con más seguridad.",
];

export default function ContadoraEstrategicaPagoPage() {
  useEffect(() => {
    document.title = "Contadora Estratégica | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Contadora Estratégica",
      content_category: "Programa de capacitación / Contadoras",
      value: PRICE,
      currency: META_CURRENCY,
    });
  }, []);

  const handleCheckout = () => {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Contadora Estratégica",
      content_category: "Programa de capacitación / Contadoras",
      value: PRICE,
      currency: META_CURRENCY,
    });

    if (!CHECKOUT_URL || CHECKOUT_URL=== "#") {
      console.warn("No hay una URL de checkout configurada.");
      return;
    }

    window.setTimeout(() => {
      window.location.href = CHECKOUT_URL;
    }, 250);
  };

  return (
    <>
      <Script
        id="meta-pixel-contadora-estrategica-pago"
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

      <main className="overflow-x-hidden bg-[#08050d] text-white">
        <section className="relative isolate min-h-svh overflow-hidden">
          <div className="absolute inset-0 -z-30">
            <img
              src={BANNER_IMAGE_URL}
              alt=""
              className="h-full w-full object-cover opacity-35 blur-[1px] saturate-125"
            />
          </div>
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_16%,rgba(155,89,255,.38),transparent_30%),linear-gradient(108deg,rgba(255,255,255,.9)_0%,rgba(255,255,255,.76)_39%,rgba(124,58,237,.82)_39.2%,rgba(18,6,35,.96)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-[linear-gradient(to_bottom,transparent,#08050d)]" />

          <div className="mx-auto flex min-h-svh max-w-[1320px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-10">
            <header className="flex items-center justify-between">
              <span className="text-2xl font-black tracking-normal text-[#151018] sm:text-3xl">
                CEFIN
              </span>
              <button
                onClick={handleCheckout}
                className="hidden min-h-11 items-center rounded-full bg-[#8c52ff] px-5 text-sm font-black uppercase text-white shadow-[0_0_34px_rgba(140,82,255,.3)] transition hover:-translate-y-0.5 hover:bg-[#7440e6] sm:inline-flex"
              >
                Inscribirme ahora
              </button>
            </header>

            <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.03fr_0.97fr]">
              <div className="text-[#09070d]">
                <p className="inline-flex rounded-full border border-[#8c52ff]/35 bg-white/65 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#7c3aed]">
                  Programa para contadoras
                </p>

                <h1 className="mt-6 max-w-4xl text-[clamp(3.4rem,8vw,7.5rem)] font-black uppercase leading-[0.86] tracking-normal">
                  Contadora
                  <span className="block bg-gradient-to-r from-[#8c52ff] via-[#a855f7] to-[#5b21b6] bg-clip-text text-transparent">
                    Estratégica
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-xl font-semibold leading-relaxed text-[#292334] sm:text-2xl">
                  Aprende a dejar de operar solo como capturista y empieza a
                  posicionarte como una asesora que toma decisiones, comunica
                  valor y cobra mejor.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="rounded-[1.2rem] bg-[#111] px-6 py-4 text-4xl font-black italic text-white shadow-[0_18px_50px_rgba(0,0,0,.22)]">
                    $3,687 MXN
                  </p>

                  <button
                    onClick={handleCheckout}
                    className="inline-flex min-h-16 items-center justify-center rounded-[1.2rem] bg-[#8c52ff] px-8 text-base font-black uppercase text-white shadow-[0_22px_70px_rgba(140,82,255,.38)] transition hover:-translate-y-1 hover:bg-[#7440e6]"
                  >
                    Inscribirme ahora
                    <span className="ml-4 text-2xl">→</span>
                  </button>
                </div>

                <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[#5b21b6]">
                  100% en línea · Acceso a cursos + bonos estratégicos
                </p>
              </div>

<div className="relative mx-auto min-h-[460px] w-full max-w-[580px] sm:min-h-[540px] lg:min-h-[620px]">
  {/* Halo principal detrás de Marisol */}
  <div className="absolute inset-x-[12%] bottom-[8%] top-[14%] rounded-full bg-[#8c52ff]/35 blur-[90px]" />

  {/* Luz suave detrás de cabello y hombros */}
  <div className="absolute right-[10%] top-[12%] h-[52%] w-[58%] rounded-full bg-[#d8b4fe]/20 blur-[85px]" />

  {/* Sombra suave en la base para integrarla al fondo */}
  <div className="absolute inset-x-[14%] bottom-0 h-28 rounded-full bg-black/35 blur-3xl" />

  <img
    src={MARISOL_IMAGE_URL}
    alt="Marisol Galván"
    className="absolute bottom-0 left-1/2 z-10 h-[min(70vh,670px)] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,.42)] lg:-translate-x-[58%]"
    style={{
      WebkitMaskImage:
        "radial-gradient(ellipse 67% 96% at 42% 47%, black 34%, rgba(0,0,0,.96) 52%, rgba(0,0,0,.72) 67%, transparent 90%)",
      maskImage:
        "radial-gradient(ellipse 67% 96% at 42% 47%, black 34%, rgba(0,0,0,.96) 52%, rgba(0,0,0,.72) 67%, transparent 90%)",
    }}
  />

  {/* Funde la parte inferior con el fondo del hero */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#08050d] via-[#08050d]/45 to-transparent sm:h-28" />
</div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0d0b12] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <p className="text-center text-sm font-black uppercase tracking-[0.28em] text-[#a78bfa]">
              Cursos que incluye
            </p>
            <h2 className="mt-3 text-center text-[clamp(2.1rem,5vw,4.6rem)] font-black uppercase leading-none">
              Una ruta completa para crecer como contadora
            </h2>

            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {courses.map((course, index) => (
                <div
                  key={course}
                  className="flex items-center gap-4 border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#8c52ff] text-sm font-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-black uppercase leading-tight">
                    {course}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-[1180px] justify-center">
            <button
              onClick={handleCheckout}
              className="inline-flex min-h-16 items-center justify-center rounded-[1.2rem] bg-[#8c52ff] px-8 text-center text-base font-black uppercase text-white shadow-[0_22px_70px_rgba(140,82,255,.38)] transition hover:-translate-y-1 hover:bg-[#7440e6] sm:px-12"
            >
              INSCRIBIRME AHORA!!!
            </button>
          </div>
        </section>

        <section className="bg-white px-5 py-16 text-[#100d16] sm:px-8">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8c52ff]">
                Además te llevas gratis
              </p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-none">
                Bonos para acelerar tu implementación
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
                No es solo contenido. La idea es que tengas una estructura,
                herramientas y acompañamiento para avanzar con más seguridad.
              </p>
            </div>

            <div className="grid gap-4">
              {bonuses.map((bonus) => (
                <div
                  key={bonus}
                  className="border border-[#8c52ff]/20 bg-[#f5f0ff] p-5 shadow-[0_18px_55px_rgba(88,28,135,.08)]"
                >
                  <p className="text-xl font-black uppercase leading-tight text-[#2b173f]">
                    🎁 {bonus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0711] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="text-center text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-none">
              Lo que vas a lograr
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {outcomes.map(([number, title, text]) => (
                <div
                  key={title}
                  className="border border-[#8c52ff]/25 bg-white/[0.04] p-6"
                >
                  <p className="text-sm font-black text-[#a78bfa]">{number}</p>
                  <h3 className="mt-4 text-2xl font-black uppercase leading-none">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-white/70">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#150b22] px-5 py-16 sm:px-8">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#c4b5fd]">
                Ideal para ti si...
              </p>
              <div className="mt-6 space-y-4">
                {audience.map((item) => (
                  <p
                    key={item}
                    className="border-l-4 border-[#8c52ff] bg-white/[0.05] p-4 text-lg font-bold text-white/86"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-[linear-gradient(135deg,#8c52ff,#3b0764)] p-8 shadow-[0_30px_90px_rgba(140,82,255,.2)]">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-white/70">
                Inversión por participante
              </p>
              <p className="mt-4 text-[clamp(3rem,7vw,6rem)] font-black italic leading-none">
                $3,687
              </p>
              <p className="mt-2 text-2xl font-black uppercase text-white/75">
                MXN
              </p>
              <button
                onClick={handleCheckout}
                className="mt-8 inline-flex min-h-16 w-full items-center justify-center rounded-[1.1rem] bg-white px-8 text-base font-black uppercase text-[#4c1d95] shadow-[0_20px_60px_rgba(0,0,0,.22)] transition hover:-translate-y-1 hover:bg-purple-100"
              >
                Inscribirme ahora
                <span className="ml-4 text-2xl">→</span>
              </button>
              <p className="mt-4 text-center text-sm font-bold text-white/72">
                Pago único. Acceso 100% en línea.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-black px-5 py-7 sm:px-8">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-3 text-sm font-bold text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-2xl font-black text-white">CEFIN</span>
            <span>Capacitación fiscal y contable para crecer con estrategia.</span>
          </div>
        </footer>
      </main>
    </>
  );
}
