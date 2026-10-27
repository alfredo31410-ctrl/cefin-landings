import { productConfig } from "../config";
import styles from "../reformas.module.css";
import { CtaLink } from "./cta-link";

const clientQuestions = [
  "Contador, ¿esto me va a afectar?",
  "¿Qué tenemos que hacer?",
  "¿Me conviene seguir en este régimen?",
  "¿Qué cambia para mi empresa?",
  "¿Debemos hacer algo antes de enero?",
];

const frictionPoints = [
  "Exceso de información",
  "Publicaciones contradictorias",
  "Miedo a interpretar incorrectamente",
  "Presión por actualizarse",
  "Dificultad para identificar a quién afecta",
  "Riesgo de llegar a enero reaccionando",
];

export function HeroAndPain() {
  return (
    <>
      <section className="relative isolate min-h-svh overflow-hidden">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_22%,rgba(117,228,195,.22),transparent_26%),radial-gradient(circle_at_16%_80%,rgba(255,155,98,.13),transparent_30%),linear-gradient(125deg,#061019_0%,#0b2231_58%,#07141e_100%)]" />
        <div className={`${styles.grid} absolute inset-0 -z-20 opacity-50`} />
        <div className={`${styles.noise} absolute inset-0 -z-10 opacity-20`} />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_bottom,transparent,#061019)]" />

        <div className="mx-auto flex min-h-svh max-w-[1280px] flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <header className={`${styles.reveal} flex items-center justify-between gap-4`}>
            <span className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              CEFIN<span className="text-[#75e4c3]">.</span>
            </span>
            <a
              href="#cambios"
              className="border border-white/15 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/70 transition hover:border-[#75e4c3]/60 hover:text-white sm:text-xs"
            >
              Ver cambios clave
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:py-12">
            <div className={`${styles.reveal} ${styles.delayOne}`}>
              <p className="inline-flex border-l-2 border-[#c8f55c] bg-[#c8f55c]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#d8ff7a] sm:text-sm">
                Actualización fiscal 2027
              </p>
              <h1 className="mt-6 max-w-[860px] text-[clamp(3.4rem,8vw,7.6rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
                Reformas
                <span className="block text-[#75e4c3]">Fiscales</span>
                <span className="block text-[.76em] text-white">2027</span>
              </h1>
              <p className="mt-7 max-w-[720px] text-xl font-black leading-tight text-white sm:text-2xl lg:text-3xl">
                Lo que cambia, a quién afecta y qué debes preparar antes de
                enero.
              </p>
              <p className="mt-5 max-w-[690px] text-base leading-relaxed text-white/68 sm:text-lg">
                Conoce los puntos clave, identifica oportunidades y riesgos y
                entiende qué debes comenzar a analizar con tus clientes antes
                de que los cambios entren en vigor.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <CtaLink
                  placement="hero"
                  className="inline-flex min-h-16 w-full items-center justify-center bg-[#c8f55c] px-7 text-center text-sm font-black text-[#07121a] shadow-[0_18px_50px_rgba(200,245,92,.18)] transition hover:-translate-y-1 hover:bg-[#dcff8c] sm:w-auto sm:text-base"
                >
                  {productConfig.cta}<span className="ml-3 text-xl">→</span>
                </CtaLink>
                <span className="max-w-[250px] text-xs font-bold uppercase leading-relaxed tracking-[0.12em] text-white/45">
                  Claridad · Interpretación · Anticipación
                </span>
              </div>
            </div>

            <div
              className={`${styles.reveal} ${styles.delayTwo} ${styles.ring} relative mx-auto w-full max-w-[520px] overflow-hidden bg-[#0a1c2b]/88 p-6 backdrop-blur sm:p-9`}
            >
              <div className="absolute right-[-65px] top-[-65px] h-48 w-48 rounded-full border-[36px] border-[#75e4c3]/10" />
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#75e4c3]">
                Información ≠ estrategia
              </p>
              <p className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                Conocer la reforma es sólo el inicio.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Entender el impacto",
                  "Comparar escenarios",
                  "Saber qué revisar",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border border-white/10 bg-white/[0.035] p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#75e4c3] text-sm font-black text-[#061019]">
                      0{index + 1}
                    </span>
                    <span className="font-bold text-white/82">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-7 border-t border-white/12 pt-6 text-sm leading-relaxed text-white/55">
                La diferencia está en convertir los cambios en preguntas y
                decisiones concretas para cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f0e7] text-[#07141e]">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087c68]">
                La presión empieza antes de enero
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">
                Tus clientes no van a esperar a que termines de entender la
                reforma.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/60">
                Cada cambio abre dudas, interpretaciones y decisiones que no se
                resuelven con una publicación aislada.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {clientQuestions.map((question, index) => (
                <blockquote
                  key={question}
                  className={`border border-black/10 p-6 text-lg font-black leading-snug ${
                    index === clientQuestions.length - 1
                      ? "bg-[#0a1c2b] text-white sm:col-span-2"
                      : "bg-white"
                  }`}
                >
                  <span className="mb-6 block text-xs tracking-[0.18em] text-[#087c68]">
                    0{index + 1}
                  </span>
                  “{question}”
                </blockquote>
              ))}
            </div>
          </div>

          <div className="mt-14 grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {frictionPoints.map((point) => (
              <div
                key={point}
                className="flex min-h-24 items-center gap-3 border-b border-r border-black/10 bg-white/45 p-5"
              >
                <span className="h-2.5 w-2.5 shrink-0 bg-[#ff7a45]" />
                <p className="font-bold text-black/72">{point}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 border-l-4 border-[#ff7a45] pl-6 text-2xl font-black leading-tight sm:text-3xl">
            El problema no es que existan cambios. El problema es llegar a
            ellos sin haber analizado cómo pueden afectar a tus clientes.
          </p>
        </div>
      </section>
    </>
  );
}
