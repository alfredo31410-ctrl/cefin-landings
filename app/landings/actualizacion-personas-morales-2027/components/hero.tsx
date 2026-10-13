import Image from "next/image";
import { campaign } from "../config";
import styles from "../landing.module.css";
import { CtaLink } from "./cta-link";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#13B8A6]/45 bg-[#13B8A6]/12 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#A5FFF5]">
        <span className="h-2 w-2 rounded-full bg-[#13B8A6] shadow-[0_0_12px_#13B8A6]" />
        Clase 100% gratuita
      </p>

      <h1 id="hero-title" className="mt-4 max-w-3xl text-4xl font-black leading-[0.97] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem]">
        Actualización Total de Personas Morales <span className={styles.titleAccent}>rumbo a 2027</span>
      </h1>

      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/72 sm:text-base xl:text-lg">
        {campaign.description}
      </p>

      <CtaLink className="mt-4 w-full sm:w-auto" />

      <div className="mt-4 grid max-w-xl grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] gap-2.5">
        <div className={`${styles.glassPanel} rounded-xl border border-white/12 px-4 py-3`}>
          <span className="block text-[9px] font-black uppercase tracking-[0.16em] text-[#7EE9DD]">Fecha</span>
          <strong className="mt-1 block text-sm">{campaign.date}</strong>
        </div>
        <div className={`${styles.glassPanel} rounded-xl border border-white/12 px-4 py-3`}>
          <span className="block text-[9px] font-black uppercase tracking-[0.16em] text-[#7EE9DD]">Horario</span>
          <strong className="mt-1 block text-sm">{campaign.time} {campaign.timezone}</strong>
        </div>
      </div>

      <figure className={`${styles.instructorFeature} mt-4 grid max-w-xl grid-cols-[minmax(118px,0.72fr)_minmax(0,1.28fr)] overflow-hidden rounded-[1.4rem] border border-white/15 sm:grid-cols-[170px_minmax(0,1fr)]`}>
        <div className={`${styles.instructorPortrait} flex min-h-[128px] items-end justify-center overflow-hidden sm:min-h-[150px]`}>
          <Image
            src={campaign.instructor.image}
            alt={campaign.instructor.imageAlt}
            width={639}
            height={628}
            sizes="(max-width: 639px) 34vw, 170px"
            priority
            className="max-h-[138px] w-full object-contain object-bottom sm:max-h-[164px]"
          />
        </div>
        <figcaption className="flex min-w-0 flex-col justify-center border-l border-white/10 p-4 sm:p-5">
          <span className="text-[9px] font-black uppercase tracking-[0.16em] text-[#92F5E9]">Instructor</span>
          <strong className="mt-1.5 text-xl font-black leading-tight sm:text-2xl">{campaign.instructor.name}</strong>
          <span className="mt-1.5 text-[11px] leading-snug text-white/62 sm:text-sm">{campaign.instructor.role}</span>
        </figcaption>
      </figure>
    </section>
  );
}
