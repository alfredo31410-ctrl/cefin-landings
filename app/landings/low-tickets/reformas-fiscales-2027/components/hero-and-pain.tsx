import Image from "next/image";
import { instructorConfig, productConfig } from "../config";
import styles from "../reformas.module.css";
import { CtaLink } from "./cta-link";

const briefingQuestions = [
  "Qué cambia",
  "A quién puede afectar",
  "Qué conviene comparar",
];

export function HeroAndPain() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-[#0b1118] text-[#f5f3ee]">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_30%,rgba(215,169,40,.12),transparent_24%),radial-gradient(circle_at_12%_84%,rgba(31,61,80,.5),transparent_31%),linear-gradient(125deg,#0b1118_0%,#101c26_62%,#0b1118_100%)]" />
      <div className={`${styles.grid} absolute inset-0 -z-20 opacity-45`} />
      <div className={`${styles.noise} absolute inset-0 -z-10 opacity-10`} />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_bottom,transparent,#0b1118)]" />

      <div className="mx-auto flex min-h-svh max-w-[1280px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-10">
        <header className={`${styles.reveal} flex items-center justify-between gap-4`}>
          <span className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
            CEFIN<span className="text-[#d7a928]">.</span>
          </span>
          <a
            href="#cambios"
            className="border border-[#d7a928]/35 bg-[#d7a928]/[0.06] px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#e8bd45] transition hover:border-[#e8bd45] hover:bg-[#d7a928]/12 sm:px-4 sm:text-xs"
          >
            Abrir briefing
          </a>
        </header>

        <div className="grid flex-1 gap-8 pb-8 pt-11 lg:grid-cols-[.56fr_.44fr] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-10 lg:gap-y-5 lg:py-10">
          <div className={`${styles.reveal} ${styles.delayOne} lg:col-start-1 lg:row-start-1`}>
            <p className="inline-flex border-l-2 border-[#d7a928] bg-[#d7a928]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#e8bd45] sm:text-sm">
              Brief fiscal · 2027
            </p>
            <h1 className="mt-6 max-w-[760px] text-[clamp(3.25rem,7.1vw,6.8rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
              Reformas
              <span className="block text-[#f5f3ee]">Fiscales</span>
              <span className="block text-[.78em] text-[#d7a928]">2027</span>
            </h1>
          </div>

          <div
            className={`${styles.reveal} ${styles.delayTwo} relative min-h-[370px] overflow-hidden sm:min-h-[470px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-[700px] lg:self-stretch`}
          >
            <p
              aria-hidden="true"
              className="pointer-events-none absolute right-[-3%] top-[2%] select-none text-[clamp(8rem,19vw,17rem)] font-black leading-none tracking-[-0.09em] text-white/[0.025] lg:right-[-8%] lg:top-[8%]"
            >
              2027
            </p>
            <div className="absolute bottom-[10%] left-[2%] right-[2%] top-[12%] border-y border-[#d7a928]/20" />
            <div className="absolute bottom-[8%] right-[3%] h-[70%] w-[72%] bg-[radial-gradient(circle_at_50%_55%,rgba(215,169,40,.12),transparent_55%)]" />
            <div className="absolute bottom-[12%] right-[8%] h-[58%] w-[58%] rounded-full border border-[#d7a928]/15" />
            <div className="absolute bottom-[12%] right-[16%] h-[42%] w-[42%] rounded-full border border-white/[0.06]" />

            <Image
              src={instructorConfig.image}
              alt={instructorConfig.imageAlt}
              width={instructorConfig.imageWidth}
              height={instructorConfig.imageHeight}
              sizes="(max-width: 639px) 94vw, (max-width: 1023px) 76vw, 560px"
              preload
              className="absolute bottom-[2%] left-1/2 z-10 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_34px_70px_rgba(0,0,0,.6)] sm:h-[96%] lg:bottom-0 lg:h-[91%]"
            />
            <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#0b1118] via-[#0b1118]/70 to-transparent" />

            <div className="absolute bottom-5 left-0 z-20 border-l-2 border-[#d7a928] pl-4 sm:bottom-8 lg:left-2">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#f5f3ee] sm:text-base">
                {instructorConfig.name}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#d7a928] sm:text-xs">
                Contador público · Maestro en impuestos
              </p>
            </div>
          </div>

          <div className={`${styles.reveal} ${styles.delayOne} lg:col-start-1 lg:row-start-2`}>
            <p className="max-w-[660px] text-xl font-black leading-tight text-[#f5f3ee] sm:text-2xl lg:text-3xl">
              Ubica el cambio. Lee el impacto. Llega antes que la pregunta del
              cliente.
            </p>
            <p className="mt-5 max-w-[640px] text-base leading-relaxed text-[#a8b2bc] sm:text-lg">
              Una actualización práctica para identificar los movimientos que
              importan, comparar escenarios y saber qué revisar antes de enero.
            </p>
            <div className="mt-7">
              <CtaLink
                placement="hero"
                fallbackHref="#oferta"
                fallbackChildren={
                  <>
                    INSCRIBIRME YA
                    <span className="ml-3 text-xl">→</span>
                  </>
                }
                className="inline-flex min-h-[68px] w-full items-center justify-center bg-[#d7a928] px-8 text-center text-base font-black text-[#0b1118] shadow-[0_18px_50px_rgba(0,0,0,.28)] transition hover:-translate-y-1 hover:bg-[#e8bd45] sm:w-auto"
              >
                {productConfig.cta}<span className="ml-3 text-xl">→</span>
              </CtaLink>
              <p className="mt-4 max-w-[430px] border-l border-white/15 pl-3 text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-[#a8b2bc] sm:text-xs">
                Iniciativa · corte 05 oct 2026 · sujeta a cambios
              </p>
            </div>
          </div>
        </div>

        <div className="grid border-y border-white/10 sm:grid-cols-3">
          {briefingQuestions.map((item, index) => (
            <div
              key={item}
              className="grid grid-cols-[42px_1fr] items-center gap-3 border-b border-white/10 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0"
            >
              <span className="text-xs font-black tracking-[0.18em] text-[#d7a928]">
                0{index + 1}
              </span>
              <span className="text-sm font-bold text-[#c4ccd3]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
