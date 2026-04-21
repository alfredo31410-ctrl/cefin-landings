"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = "733425513099672";
const PAYMENT_URL =
  "https://pay.hotmart.com/J105434552K?off=399ngaxa&checkoutMode=10&bid=1776798830168"; // <-- cambialo

const PRODUCT_NAME = "EstrategIA Evolucion Contable";
const PRICE = "$ 3,387 MXN"; // <-- cambialo
const OLD_PRICE = "$6,774 MXN"; // <-- cambialo
const PRODUCT_VALUE = 3387; // <-- cambialo
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
    "Como integrar IA a procesos contables con mas criterio y menos caos.",
    "Prompts, estructura y enfoque para ahorrar tiempo real en el despacho.",
    "Aplicaciones practicas para reportes, analisis y soporte al cliente.",
    "Una ruta mas clara para evolucionar tu perfil contable con IA.",
  ];

  const modules = [
    "Modulo 1. Mentalidad y estrategia para usar IA en contabilidad",
    "Modulo 2. Flujos practicos para acelerar tareas repetitivas",
    "Modulo 3. Como redactar prompts utiles para trabajo contable",
    "Modulo 4. IA aplicada a reportes, analisis y comunicacion",
    "Modulo 5. Evolucion profesional del contador con tecnologia",
  ];

  const bonuses = [
    "Acceso a la grabacion para repasar la clase",
    "Material de apoyo para implementar mas rapido",
    "Acceso por 12 meses",
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

      <main className="min-h-screen w-full overflow-x-hidden bg-[#050713] text-white relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="hidden lg:block absolute inset-y-0 right-0 w-[56%]">
            <img
              src={DESKTOP_BG}
              alt="EstrategIA Evolucion Contable"
              className="absolute bottom-0 right-[-2%] h-[86%] w-auto max-w-none object-contain opacity-72 xl:h-[90%]"
            />
          </div>
          <div className="block lg:hidden absolute inset-0">
            <img
              src={MOBILE_BG}
              alt="EstrategIA Evolucion Contable"
              className="absolute bottom-0 right-[-14%] h-[58%] w-auto max-w-none object-contain opacity-70"
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,8,20,0.18),rgba(4,8,20,0.44),#050713)] lg:bg-[linear-gradient(90deg,rgba(5,7,19,0.88)_0%,rgba(5,7,19,0.72)_36%,rgba(5,7,19,0.18)_68%,rgba(5,7,19,0.56)_100%)]" />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#050713]/86 via-[#050713]/54 to-transparent" />
          <div className="block lg:hidden absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,19,0.22)_0%,rgba(5,7,19,0.22)_24%,rgba(5,7,19,0.46)_48%,rgba(5,7,19,0.82)_100%)]" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(70,226,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(70,226,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute left-[-4%] top-[12%] h-[340px] w-[340px] rounded-full bg-cyan-400/14 blur-[130px]" />
          <div className="absolute right-[-6%] bottom-[8%] h-[300px] w-[300px] rounded-full bg-lime-300/10 blur-[130px]" />
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
            className="hidden md:inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black uppercase tracking-tight text-[#08111c] shadow-[0_10px_30px_rgba(70,226,255,0.28)] transition hover:scale-[1.02] hover:bg-cyan-300"
          >
            Inscribirme ahora
          </a>
        </header>

        <section className="relative z-20 mx-auto max-w-7xl px-6 pb-14 pt-6 lg:px-12 lg:pb-20 lg:pt-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/10 px-4 py-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
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
                  <span className="block mt-[-0.12em] text-cyan-300">Evolucion</span>
                  <span className="block mt-[-0.12em] text-cyan-300">Contable</span>
                </h1>
              </div>

              <div className="inline-flex bg-[#4f5cff]/90 px-5 py-3 font-mono text-base font-black uppercase tracking-[0.2em] text-white shadow-[0_16px_45px_rgba(79,92,255,0.35)] sm:text-lg">
                Condiciones especiales por tiempo limitado
              </div>

              <p className="max-w-[42rem] text-lg leading-relaxed text-slate-200 sm:text-xl">
                Si ya viste la clase gratuita y entendiste que la IA no es moda
                sino ventaja competitiva, esta es tu oportunidad para entrar a la
                version completa con una oferta especial y aplicarla de verdad a
                tu trabajo contable.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-10 py-5 text-lg font-black uppercase tracking-tight text-[#07111b] shadow-[0_18px_45px_rgba(70,226,255,0.28)] transition duration-200 hover:scale-[1.01] hover:bg-cyan-300 hover:shadow-[0_22px_60px_rgba(70,226,255,0.38)] active:scale-[0.98]"
                >
                  <span>Quiero entrar ahora</span>
                </a>

                <a
                  href="#oferta"
                  className="inline-flex items-center justify-center rounded-2xl border border-cyan-400/22 bg-white/5 px-8 py-5 text-lg font-black uppercase tracking-tight text-white transition hover:bg-cyan-400/10"
                >
                  Ver lo que incluye
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
                  Pasa de usar herramientas sueltas a construir una forma mas
                  inteligente, mas rapida y mas rentable de trabajar como contador.
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
                    <p className="text-slate-200">Metodo pensado para aplicar IA con criterio contable</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <p className="text-slate-200">Ruta clara para evolucionar tu perfil profesional</p>
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
                  Oferta dirigida a personas que ya mostraron interes en la clase gratuita.
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
                <span className="text-lime-300"> El problema es usarla sin estrategia.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Muchos contadores prueban herramientas, pero siguen perdiendo
                tiempo, sin estructura, sin prompts utiles y sin una forma clara
                de llevar la tecnologia a resultados reales. Este programa busca
                darte una ruta mas practica y profesional para dejar de improvisar.
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
                Que vas a trabajar
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
                Ideal para ti si...
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase">
                Quieres evolucionar con mas claridad
              </h3>

              <div className="mt-6 space-y-4 leading-relaxed text-slate-200">
                <p>• Ya viste el potencial de la IA, pero quieres bajar eso a procesos utiles.</p>
                <p>• Quieres diferenciarte como contador con una oferta mas moderna.</p>
                <p>• Necesitas ahorrar tiempo sin perder criterio profesional.</p>
                <p>• Buscas pasar de la curiosidad a una implementacion real.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-12">
            <p className="font-mono text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              Temario
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase md:text-5xl">
              Modulos del programa
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {modules.map((module) => (
                <div
                  key={module}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-semibold text-slate-200"
                >
                  {module}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
          <div className="rounded-[2rem] border border-lime-300/16 bg-lime-300/[0.06] p-8 lg:p-12">
            <p className="font-mono text-sm font-black uppercase tracking-[0.24em] text-lime-300">
              Bonos
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase md:text-5xl">
              Ademas te llevas esto
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {bonuses.map((bonus) => (
                <div
                  key={bonus}
                  className="rounded-2xl border border-white/10 bg-[#08111b]/45 px-5 py-5 font-semibold text-slate-100"
                >
                  {bonus}
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
              La IA no reemplaza al contador que piensa mejor; lo potencia.
              Aprovecha el precio especial y da un paso mas firme hacia una
              practica contable mas inteligente.
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
