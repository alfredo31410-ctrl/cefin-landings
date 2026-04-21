"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = "1485908226564541";
const PAYMENT_URL =
  "https://pay.hotmart.com/J105434552K?off=399ngaxa&checkoutMode=10&bid=1776798830168";

const PRODUCT_NAME = "EstrategIA Evolucion Contable";
const PRICE = "$ 3,387 MXN";
const OLD_PRICE = "$22,922 MXN";
const PRODUCT_VALUE = 3387;
const DESKTOP_BG =
  "https://cefin-landings-z9uk.vercel.app/IA-retargeting.png";
const MOBILE_BG =
  "https://cefin-landings-z9uk.vercel.app/IA-retargeting.png";

export default function IARetargetingPage() {
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window === "undefined" || !window.fbq) return;

    if (data) {
      window.fbq("track", event, data);
      return;
    }

    window.fbq("track", event);
  };

  const handleCheckoutClick = () => {
    trackEvent("InitiateCheckout", {
      content_name: PRODUCT_NAME,
      content_category: "Curso",
      value: PRODUCT_VALUE,
      currency: "MXN",
    });
  };

  useEffect(() => {
    document.title = "EstrategIA Evolucion Contable | Oferta Especial CEFIN";

    trackEvent("ViewContent", {
      content_name: PRODUCT_NAME,
      content_category: "Curso",
      value: PRODUCT_VALUE,
      currency: "MXN",
    });
  }, []);

  const includes = [
    "Acceso a Inteligencia Artificial y Excel para Contadores.",
    "Acceso a 4 sesiones del Factor CEFIN, en vivo, los lunes a las 11:00 a.m.",
    "Acceso al curso de Estrategias y Beneficios Fiscales.",
    'Acceso al "Fiscalathor IA - Fiscal" (Agente IA).',
    'Acceso a "Norma - tu IA Contable" (Agente IA).',
    "Reprograma tu Relacion con el dinero - Finanzas para contadores.",
    "Mentoria FONACOT en vivo.",
  ];

  const packageValues = [
    "Inteligencia Artificial y Excel para Contadores - valor $4,387 MXN",
    "4 sesiones del Factor CEFIN en vivo - valor $2,320 MXN",
    "Curso de Estrategias y Beneficios Fiscales - valor $4,387 MXN",
    "Fiscalathor IA - Fiscal (Agente IA) - valor $4,387 MXN",
    "Norma - tu IA Contable (Agente IA) - valor $4,387 MXN",
    "Reprograma tu Relacion con el dinero - valor $1,527 MXN",
    "Mentoria FONACOT en vivo - valor $1,527 MXN",
  ];

  const valuePoints = [
    "No compras una sola clase: compras una estructura completa de evolucion contable.",
    "Tienes acceso a herramientas, sesiones y agentes IA que se complementan entre si.",
    "Entras con condiciones especiales por tiempo limitado.",
    "Pagas $3,387 MXN por contenidos con valor acumulado de $22,922 MXN.",
  ];

  return (
    <>
      <Script
        id="meta-pixel-retargeting-ia"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050713] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 right-0 hidden w-[54%] lg:block">
            <img
              src={DESKTOP_BG}
              alt="EstrategIA Evolucion Contable"
              className="absolute bottom-0 right-[3%] h-[78%] w-auto max-w-none object-contain object-right-bottom opacity-[0.92] xl:h-[86%]"
            />
          </div>

          <div className="absolute inset-0 lg:hidden">
            <img
              src={MOBILE_BG}
              alt="EstrategIA Evolucion Contable"
              className="absolute bottom-[7%] right-[-6%] h-[48%] w-auto max-w-none object-contain object-right-bottom opacity-[0.88]"
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,8,20,0.05),rgba(4,8,20,0.18),#050713)] lg:bg-[linear-gradient(90deg,rgba(5,7,19,0.92)_0%,rgba(5,7,19,0.78)_32%,rgba(5,7,19,0.16)_64%,rgba(5,7,19,0.18)_100%)]" />
          <div className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-[#050713]/94 via-[#050713]/66 to-transparent lg:block" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,19,0.04)_0%,rgba(5,7,19,0.06)_20%,rgba(5,7,19,0.18)_45%,rgba(5,7,19,0.72)_100%)] lg:hidden" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(70,226,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(70,226,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute left-[-4%] top-[12%] h-[340px] w-[340px] rounded-full bg-cyan-400/14 blur-[130px]" />
          <div className="absolute bottom-[8%] right-[-6%] h-[300px] w-[300px] rounded-full bg-lime-300/10 blur-[130px]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050713] via-[#050713]/68 to-transparent" />
        </div>

        <header className="relative z-20 flex items-center justify-between px-6 py-6 lg:px-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/12 bg-white/5 px-4 py-2 backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/15">
              <span className="text-sm font-black text-cyan-300">C</span>
            </div>
            <div className="text-left leading-none">
              <p className="text-sm font-black tracking-tight text-white">CEFIN</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Estrategia y evolucion contable
              </p>
            </div>
          </div>

          <a
            href={PAYMENT_URL}
            onClick={handleCheckoutClick}
            className="hidden items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black uppercase tracking-tight text-[#08111c] shadow-[0_10px_30px_rgba(70,226,255,0.28)] transition hover:scale-[1.02] hover:bg-cyan-300 md:inline-flex"
          >
            Inscribirme ahora
          </a>
        </header>

        <section className="relative z-20 mx-auto max-w-7xl px-6 pb-14 pt-6 lg:px-12 lg:pb-20 lg:pt-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/10 px-4 py-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300 sm:text-[11px]">
                  Inscripciones abiertas
                </p>
              </div>

              <div className="max-w-3xl font-mono uppercase leading-[0.88] tracking-[-0.06em]">
                <h1 className="text-[3.2rem] sm:text-[4.3rem] lg:text-[6.2rem] xl:text-[6.8rem]">
                  <span className="block text-cyan-300">
                    Estrateg<span className="text-lime-300">IA</span>
                  </span>
                  <span className="mt-[-0.12em] block text-cyan-300">Evolucion</span>
                  <span className="mt-[-0.12em] block text-cyan-300">Contable</span>
                </h1>
              </div>

              <div className="inline-flex bg-[#4f5cff]/90 px-5 py-3 font-mono text-base font-black uppercase tracking-[0.2em] text-white shadow-[0_16px_45px_rgba(79,92,255,0.35)] sm:text-lg">
                Condiciones especiales por tiempo limitado
              </div>

              <p className="max-w-[42rem] text-lg leading-relaxed text-slate-200 sm:text-xl">
                Si ya viste la clase gratuita y entendiste que la IA no es moda
                sino ventaja competitiva, esta es tu oportunidad para entrar a la
                version completa con una oferta especial que concentra sesiones,
                cursos, agentes IA y herramientas pensadas para acelerar y elevar
                tu practica contable.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-10 py-5 text-lg font-black uppercase tracking-tight text-[#07111b] shadow-[0_18px_45px_rgba(70,226,255,0.28)] transition duration-200 hover:scale-[1.01] hover:bg-cyan-300 hover:shadow-[0_22px_60px_rgba(70,226,255,0.38)] active:scale-[0.98]"
                >
                  <span>Quiero entrar ahora</span>
                </a>

                
              </div>

              <div className="flex flex-wrap gap-4 pt-2 text-sm font-bold uppercase text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Acceso por 12 meses
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Enfoque practico
                </span>
                <span className="rounded-full border border-cyan-400/16 bg-cyan-400/8 px-4 py-2 text-cyan-200">
                  Perfil contable + IA
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                id="oferta"
                className="rounded-[2rem] border border-cyan-400/15 bg-[#07101b]/85 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              >
                <p className="font-mono text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                  Oferta activa
                </p>

                <h2 className="mt-4 text-3xl font-black uppercase leading-none text-white">
                  Entra hoy al programa completo
                </h2>

                <p className="mt-4 leading-relaxed text-slate-300">
                  Accede a un paquete completo de contenidos, sesiones en vivo y
                  agentes IA pensados para contadores que quieren usar tecnologia
                  con mas estructura, criterio y ventaja competitiva.
                </p>

                <div className="mt-8">
                  <p className="text-sm font-bold uppercase text-slate-400">
                    Inversion normal
                  </p>
                  <p className="text-2xl font-black text-slate-500 line-through">
                    {OLD_PRICE}
                  </p>

                  <p className="mt-4 text-sm font-bold uppercase text-lime-300">
                    Hoy puedes entrar por
                  </p>
                  <p className="text-5xl font-black tracking-tight text-white">
                    {PRICE}
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <p className="text-slate-200">Acceso inmediato</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <p className="text-slate-200">
                      Incluye cursos, sesiones y agentes IA aplicados al contador
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <p className="text-slate-200">
                      Valor total real de $22,922 MXN por solo $3,387 MXN
                    </p>
                  </div>
                </div>

                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-8 py-5 text-lg font-black uppercase tracking-tight text-[#07111b] shadow-[0_15px_40px_rgba(70,226,255,0.28)] transition hover:bg-cyan-300"
                >
                  Inscribirme con precio especial
                </a>

                <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
                  Oferta dirigida a personas que ya mostraron interes en la clase
                  gratuita.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-12">
            <div className="max-w-4xl">
              <p className="font-mono text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                La realidad
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight md:text-5xl">
                El problema no es querer usar IA.
                <span className="text-lime-300">
                  {" "}
                  El problema es usarla sin estrategia.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Muchos contadores prueban herramientas, pero siguen perdiendo
                tiempo, sin estructura, sin prompts utiles y sin una forma clara
                de llevar la tecnologia a resultados reales. Esta oferta junta en
                una sola inversion varios recursos que normalmente comprarias por
                separado para ayudarte a avanzar mas rapido.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-cyan-400/16 bg-cyan-400/[0.06] p-8">
              <p className="font-mono text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                Lo que incluye
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase">
                Todo lo que recibes
              </h3>

              <div className="mt-6 space-y-4">
                {includes.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300" />
                    <p className="leading-relaxed text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="font-mono text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                Valor del paquete
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase">
                Contenidos y valor real
              </h3>

              <div className="mt-6 space-y-4 leading-relaxed text-slate-200">
                {packageValues.map((item) => (
                  <p key={item}>&#8226; {item}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-12">
            <p className="font-mono text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              Oferta total
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase md:text-5xl">
              Lo que hace valiosa esta oportunidad
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {valuePoints.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-semibold text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-5xl px-6 pb-20 pt-8 lg:px-12">
          <div className="rounded-[2rem] border border-cyan-400/18 bg-gradient-to-br from-cyan-400/12 to-white/[0.03] p-8 text-center lg:p-12">
            <p className="font-mono text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              Ultimo paso
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase leading-tight md:text-5xl">
              Si esto es lo que necesitas,
              <br />
              <span className="text-lime-300">entra hoy.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              Si ya decidiste que quieres evolucionar como contador con ayuda de
              IA, esta es una forma mucho mas inteligente de entrar: con una sola
              inversion accedes a contenidos y herramientas con mucho mas valor
              del que pagas hoy.
            </p>

            <a
              href={PAYMENT_URL}
              onClick={handleCheckoutClick}
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-10 py-5 text-lg font-black uppercase tracking-tight text-[#07111b] shadow-[0_15px_40px_rgba(70,226,255,0.28)] transition hover:bg-cyan-300"
            >
              Quiero aprovechar la oferta
            </a>

            <p className="mt-4 text-sm text-slate-400">
              Precio especial: <span className="font-black text-white">{PRICE}</span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
