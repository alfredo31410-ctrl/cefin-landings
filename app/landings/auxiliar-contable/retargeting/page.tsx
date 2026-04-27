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
  "https://pay.hotmart.com/O105327844S?off=wnp9zod8&checkoutMode=10&bid=1776267977704";

const PRODUCT_NAME = "Auxiliar Contable";
const PRICE = "$4,387 MXN";
const OLD_PRICE = "$6,707 MXN";
const PRODUCT_VALUE = 4387;

const includes = [
  "Cómo trabaja realmente un auxiliar contable en el día a día.",
  "Facturación y registro correcto de operaciones.",
  "Relación práctica entre contabilidad y SAT.",
  "Temas clave como IVA, RESICO y control documental.",
  "Bases para integrarte con más seguridad a un área contable.",
];

const modules = [
  "Módulo 1. Rol real del auxiliar contable",
  "Módulo 2. Registro de operaciones paso a paso",
  "Módulo 3. Facturación y control básico",
  "Módulo 4. IVA, RESICO y relación con obligaciones fiscales",
  "Módulo 5. Orden, criterio y flujo de trabajo contable",
];

const bonuses = [
  "Acceso a la grabación para repasar la clase",
  "Material de apoyo para seguir mejor el entrenamiento",
  "Acceso por 12 meses",
];

export default function AuxiliarContableRetargetingPage() {
  const handleCheckoutClick = () => {
    trackMetaEvent("InitiateCheckout", {
      content_name: PRODUCT_NAME,
      content_category: "Curso",
      value: PRODUCT_VALUE,
      currency: META_CURRENCY,
    });
  };

  useEffect(() => {
    document.title = "Auxiliar Contable | Oferta Especial CEFIN";

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
        id="meta-pixel-retargeting-auxiliar"
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

      <main className="relative min-h-screen w-full overflow-x-hidden bg-[#0f172a] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-[-10%] top-[5%] h-[320px] w-[320px] rounded-full opacity-30 blur-[120px] sm:h-[520px] sm:w-[520px]"
            style={{
              background:
                "radial-gradient(circle, rgba(230,0,126,1) 0%, rgba(230,0,126,0) 70%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.55),rgba(15,23,42,0.9),#0f172a)]" />
          <div className="absolute inset-0 opacity-[0.10]">
            <img
              src="https://cefin-landings-z9uk.vercel.app/alfredo.png"
              alt="Mtro. Alfredo Cobos"
              className="h-full w-full object-contain object-left-bottom"
            />
          </div>
        </div>

        <header className="relative z-20 flex items-center justify-between px-6 py-6 lg:px-12">
          <div className="border-l-4 border-fuchsia-600 pl-4 text-left">
            <p className="text-2xl font-black leading-none tracking-tighter">
              CEFIN
            </p>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              Mtro. Alfredo Cobos
            </p>
          </div>

          <a
            href={PAYMENT_URL}
            onClick={handleCheckoutClick}
            className="hidden items-center justify-center rounded-xl bg-fuchsia-600 px-6 py-3 text-sm font-black uppercase italic tracking-tight shadow-[0_10px_30px_rgba(230,0,126,0.35)] transition hover:bg-fuchsia-700 md:inline-flex"
          >
            Inscribirme ahora
          </a>
        </header>

        <section className="relative z-20 mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-12 lg:pb-20 lg:pt-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
              <div className="inline-block rounded-sm bg-fuchsia-600 px-4 py-2 text-[11px] font-black uppercase italic tracking-widest text-white">
                Oferta especial para dar el siguiente paso
              </div>

              <h1 className="text-5xl font-black uppercase italic leading-[0.88] tracking-tighter sm:text-6xl xl:text-[86px]">
                Auxiliar <br />
                <span className="text-yellow-400">Contable</span>
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
                Si ya viste el entrenamiento gratuito y te diste cuenta de que
                necesitas estructura, práctica y seguridad para trabajar mejor en
                contabilidad, esta es tu oportunidad para entrar con una oferta
                especial.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-fuchsia-600 px-10 py-5 text-lg font-black uppercase italic tracking-tighter text-white shadow-[0_15px_40px_rgba(230,0,126,0.4)] transition-all hover:bg-fuchsia-700 active:scale-95 sm:text-xl"
                >
                  <span className="relative z-10">Quiero entrar ahora</span>
                  <div className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-500 group-hover:translate-x-[100%]" />
                </a>

                <a
                  href="#oferta"
                  className="inline-flex items-center justify-center rounded-xl border border-fuchsia-500/40 px-8 py-5 text-lg font-black uppercase italic tracking-tighter text-white transition hover:bg-fuchsia-600/10"
                >
                  Ver lo que incluye
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm font-bold uppercase text-slate-300 lg:justify-start">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Acceso por 12 meses
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Enfoque práctico
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Ideal para principiantes
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                id="oferta"
                className="rounded-[2rem] border border-fuchsia-500/20 bg-white/[0.05] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              >
                <p className="text-sm font-black uppercase tracking-[0.2em] text-fuchsia-400">
                  Oferta activa
                </p>

                <h2 className="mt-4 text-3xl font-black uppercase italic leading-none">
                  Entra hoy al entrenamiento completo
                </h2>

                <p className="mt-4 leading-relaxed text-slate-300">
                  Da el paso de solo interesarte por contabilidad a comenzar a
                  entender cómo se trabaja en la práctica.
                </p>

                <div className="mt-8">
                  <p className="text-sm font-bold uppercase text-slate-400">
                    Inversión normal
                  </p>
                  <p className="text-2xl font-black text-slate-500 line-through">
                    {OLD_PRICE}
                  </p>

                  <p className="mt-4 text-sm font-bold uppercase text-yellow-400">
                    Hoy puedes entrar por
                  </p>
                  <p className="text-5xl font-black tracking-tight text-white">
                    {PRICE}
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-fuchsia-500" />
                    <p className="text-slate-200">Acceso inmediato</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-fuchsia-500" />
                    <p className="text-slate-200">
                      Contenido pensado para empezar con claridad
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-fuchsia-500" />
                    <p className="text-slate-200">
                      Aplicación práctica con enfoque real de trabajo
                    </p>
                  </div>
                </div>

                <a
                  href={PAYMENT_URL}
                  onClick={handleCheckoutClick}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-fuchsia-600 px-8 py-5 text-lg font-black uppercase italic tracking-tight text-white shadow-[0_15px_40px_rgba(230,0,126,0.4)] transition hover:bg-fuchsia-700"
                >
                  Inscribirme con precio especial
                </a>

                <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
                  Oferta dirigida a personas que ya mostraron interés en el entrenamiento.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-12">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-fuchsia-400">
                La realidad
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase italic leading-tight md:text-5xl">
                El problema no es querer entrar al área contable.
                <span className="text-yellow-400"> El problema es entrar sin bases.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Muchos quieren trabajar como auxiliares contables, pero llegan
                inseguros, confundidos con los registros, con dudas sobre
                facturación, IVA, SAT y con miedo a equivocarse en tareas
                básicas. Este entrenamiento busca darte una base más clara,
                práctica y útil para que dejes de sentir que todo está suelto.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-fuchsia-500/20 bg-fuchsia-500/[0.06] p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-fuchsia-400">
                Lo que incluye
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase italic">
                Qué vas a trabajar
              </h3>

              <div className="mt-6 space-y-4">
                {includes.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <p className="leading-relaxed text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-fuchsia-400">
                Ideal para ti si...
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase italic">
                Buscas empezar con más seguridad
              </h3>

              <div className="mt-6 space-y-4 leading-relaxed text-slate-200">
                <p>• Vas empezando en contabilidad y quieres entender mejor el trabajo real.</p>
                <p>• Sientes que conoces conceptos, pero todavía no te sientes seguro aplicándolos.</p>
                <p>• Quieres dar mejores pasos para integrarte a un despacho o área administrativa.</p>
                <p>• Necesitas una base más práctica y menos revuelta.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-fuchsia-400">
              Temario
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase italic md:text-5xl">
              Módulos del entrenamiento
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
          <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.06] p-8 lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
              Bonos
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase italic md:text-5xl">
              Además te llevas esto
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {bonuses.map((bonus) => (
                <div
                  key={bonus}
                  className="rounded-2xl border border-white/10 bg-[#0f172a]/40 px-5 py-5 font-semibold text-slate-100"
                >
                  {bonus}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto max-w-5xl px-6 pb-20 pt-8 lg:px-12">
          <div className="rounded-[2rem] border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-600/15 to-white/[0.03] p-8 text-center lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-fuchsia-400">
              Último paso
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase italic leading-tight md:text-5xl">
              Si esto es lo que necesitas,
              <br />
              <span className="text-yellow-400">entra hoy.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              Seguir postergándolo no te da más seguridad. La práctica, la
              estructura y el criterio sí. Aprovecha el precio especial y da un
              paso más firme en tu formación contable.
            </p>

            <a
              href={PAYMENT_URL}
              onClick={handleCheckoutClick}
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-fuchsia-600 px-10 py-5 text-lg font-black uppercase italic tracking-tight text-white shadow-[0_15px_40px_rgba(230,0,126,0.4)] transition hover:bg-fuchsia-700"
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
