import { productConfig } from "../config";
import styles from "../reformas.module.css";
import { CtaLink } from "./cta-link";

const briefingQuestions = [
  "Qué cambia",
  "A quién puede afectar",
  "Qué conviene comparar",
];

export function HeroAndPain() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-[#fff4ea] text-[#17141d]">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_20%,rgba(175,203,255,.72),transparent_27%),radial-gradient(circle_at_14%_82%,rgba(255,107,53,.16),transparent_30%),linear-gradient(125deg,#fff4ea_0%,#f8eadf_58%,#f1e3d5_100%)]" />
      <div className={`${styles.grid} absolute inset-0 -z-20 opacity-70`} />
      <div className={`${styles.noise} absolute inset-0 -z-10 opacity-10`} />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_bottom,transparent,#fff4ea)]" />

      <div className="mx-auto flex min-h-svh max-w-[1280px] flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-10">
        <header className={`${styles.reveal} flex items-center justify-between gap-4`}>
          <span className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
            CEFIN<span className="text-[#ff6b35]">.</span>
          </span>
          <a
            href="#cambios"
            className="border border-[#5a1832]/25 bg-white/45 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#5a1832] transition hover:border-[#4967d8] hover:bg-white/75 sm:text-xs"
          >
            Abrir briefing
          </a>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div className={`${styles.reveal} ${styles.delayOne}`}>
            <p className="inline-flex border-l-2 border-[#4967d8] bg-[#afcbff]/35 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#301024] sm:text-sm">
              Brief fiscal · 2027
            </p>
            <h1 className="mt-6 max-w-[860px] text-[clamp(3.4rem,8vw,7.6rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
              Reformas
              <span className="block text-[#5a1832]">Fiscales</span>
              <span className="block text-[.76em] text-[#4967d8]">2027</span>
            </h1>
            <p className="mt-7 max-w-[720px] text-xl font-black leading-tight text-[#17141d] sm:text-2xl lg:text-3xl">
              Ubica el cambio. Lee el impacto. Llega antes que la pregunta del
              cliente.
            </p>
            <p className="mt-5 max-w-[660px] text-base leading-relaxed text-[#17141d]/72 sm:text-lg">
              Una actualización práctica para identificar los movimientos que
              importan, comparar escenarios y saber qué revisar antes de enero.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <CtaLink
                placement="hero"
                fallbackHref="#cambios"
                fallbackChildren={
                  <>
                    VER EL RADAR FISCAL<span className="ml-3 text-xl">→</span>
                  </>
                }
                className="inline-flex min-h-16 w-full items-center justify-center bg-[#ff6b35] px-7 text-center text-sm font-black text-[#17141d] shadow-[0_18px_50px_rgba(90,24,50,.18)] transition hover:-translate-y-1 hover:bg-[#ff825f] sm:w-auto sm:text-base"
              >
                {productConfig.cta}<span className="ml-3 text-xl">→</span>
              </CtaLink>
              <span className="max-w-[270px] text-xs font-bold uppercase leading-relaxed tracking-[0.12em] text-[#301024]/68">
                Iniciativa · corte 05 oct 2026 · sujeta a cambios
              </span>
            </div>
          </div>

          <aside
            className={`${styles.reveal} ${styles.delayTwo} ${styles.ring} relative mx-auto w-full max-w-[520px] overflow-hidden bg-[#301024] p-6 text-white sm:p-9`}
          >
            <div className="absolute right-[-65px] top-[-65px] h-48 w-48 rounded-full border-[36px] border-[#afcbff]/15" />
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#afcbff]">
                Briefing 01 / 2027
              </p>
              <span className="bg-[#ff6b35] px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#17141d]">
                Propuesto
              </span>
            </div>
            <p className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
              Información fiscal convertida en criterio.
            </p>
            <div className="mt-7 border-t border-white/12">
              {briefingQuestions.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[42px_1fr] items-center gap-4 border-b border-white/12 py-4"
                >
                  <span className="text-xs font-black tracking-[0.18em] text-[#afcbff]">
                    0{index + 1}
                  </span>
                  <span className="font-bold text-white/88">{item}</span>
                </div>
              ))}
            </div>
            <blockquote className="mt-7 border-l-2 border-[#ff6b35] pl-5 text-lg font-black leading-snug text-white/88">
              “Contador, ¿esto me va a afectar?”
            </blockquote>
            <p className="mt-3 text-sm leading-relaxed text-white/58">
              La respuesta empieza mucho antes de que llegue enero.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
