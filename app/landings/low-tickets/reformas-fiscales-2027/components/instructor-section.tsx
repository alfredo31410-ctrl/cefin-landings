import Image from "next/image";
import { instructorConfig } from "../config";
import styles from "../reformas.module.css";

export function InstructorSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b1118] text-[#f5f3ee]">
      <div className={`${styles.grid} absolute inset-0 opacity-20`} />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_45%,rgba(215,169,40,.12),transparent_42%)]" />

      <div className="relative mx-auto grid max-w-[1220px] px-5 sm:px-8 lg:min-h-[640px] lg:grid-cols-[.92fr_1.08fr] lg:px-10">
        <div className="flex flex-col justify-center py-16 lg:py-20">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d7a928]">
            Respaldo profesional
          </p>
          <h2 className="mt-4 max-w-[680px] text-4xl font-black leading-[.98] tracking-[-0.045em] sm:text-6xl">
            Experiencia que convierte información en criterio.
          </h2>
          <p className="mt-6 text-2xl font-black text-[#f5f3ee] sm:text-3xl">
            {instructorConfig.name}
          </p>
          <p className="mt-2 text-lg font-bold text-[#c4ccd3] sm:text-xl">
            {instructorConfig.role}
          </p>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-[#d7a928]">
            {instructorConfig.organization}
          </p>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#a8b2bc] sm:text-lg">
            {instructorConfig.bio}
          </p>

          <div className="mt-8 grid max-w-[600px] gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ["+15", "años de experiencia"],
              ["+260", "empresas asesoradas"],
              ["+15 mil", "contadores capacitados"],
            ].map(([value, label]) => (
              <div key={label} className="bg-[#101c26] p-5">
                <p className="text-2xl font-black text-[#d7a928]">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase leading-relaxed tracking-[0.1em] text-[#a8b2bc]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[390px] overflow-hidden sm:min-h-[480px] lg:min-h-full">
          <div className="absolute bottom-0 left-[8%] right-[3%] top-[12%] border border-[#d7a928]/25" />
          <div className="absolute bottom-0 left-[2%] h-[72%] w-[72%] bg-[#16232e]" />
          <div className="absolute bottom-8 left-[5%] top-[22%] w-px bg-[#d7a928]/70" />
          <p className="absolute bottom-8 left-1 z-20 hidden origin-bottom-left -rotate-90 text-[10px] font-black uppercase tracking-[0.28em] text-[#d7a928] lg:block">
            CEFIN · Formación fiscal
          </p>
          <Image
            src={instructorConfig.image}
            alt={instructorConfig.imageAlt}
            width={instructorConfig.imageWidth}
            height={instructorConfig.imageHeight}
            sizes="(max-width: 1023px) 90vw, 620px"
            className="absolute bottom-0 right-[-4%] z-10 h-[94%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_28px_60px_rgba(0,0,0,.5)] sm:right-[2%] lg:right-[-3%] lg:h-[90%]"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#0b1118] to-transparent" />
        </div>
      </div>
    </section>
  );
}
