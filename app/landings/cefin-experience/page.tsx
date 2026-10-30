import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { assetUrl, REGISTRATION_URL } from "./constants";
import { HeroVideo } from "./hero-video";
import { OfferSection, ProgramPromoCta, StickyPromoCta } from "./promo-offer";
import { CefinExperienceTracking } from "./tracking";
import styles from "./cefin-experience.module.css";

export const metadata: Metadata = {
  title: "CEFIN Experience 2027 | Ciudad de México",
  description:
    "CEFIN Experience 2027: dos días de transformación personal, reformas fiscales e inteligencia artificial. 17 y 18 de diciembre de 2026 en Ciudad de México.",
};

const experiences = [
  {
    number: "01",
    title: "Rompe tus techos mentales",
    description:
      "Una experiencia de transformación para desafiar límites y abrir nuevas posibilidades.",
  },
  {
    number: "02",
    title: "Anticípate a 2027",
    description:
      "Perspectiva, actualización y estrategia ante la nueva realidad fiscal.",
  },
  {
    number: "03",
    title: "Activa el futuro",
    description:
      "Inteligencia artificial aplicada al trabajo real de los profesionales contables.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M32 2l7 23 23-1-19 14 8 22-19-14-19 14 8-22L2 24l23 1 7-23Z" />
    </svg>
  );
}

export default function CefinExperiencePage() {
  return (
    <main className={styles.page}>
      <CefinExperienceTracking />
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio" aria-label="CEFIN Experience, inicio">
          <span className={styles.brandMark}>C</span>
          <span>
            <strong>CEFIN</strong>
            <small>Experience 2027</small>
          </span>
        </a>

        <div className={styles.headerDate}>
          <span>17—18 DIC</span>
          <span>CDMX</span>
        </div>

        <a
          className={styles.headerCta}
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.headerCtaLong}>Asegurar mi lugar</span>
          <span className={styles.headerCtaShort}>Mi lugar</span>
          <ArrowIcon />
        </a>
      </header>

      <section
        className={styles.hero}
        id="inicio"
        style={{
          "--hero-poster-desktop": `url("${assetUrl("/cefin-experience/cefin-hero-poster.jpg")}")`,
          "--hero-poster-mobile": `url("${assetUrl("/cefin-experience/cefin-hero-poster-9x16.jpg")}")`,
        } as CSSProperties}
      >
        <HeroVideo />
        <div className={styles.heroVideoShade} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroOrb} aria-hidden="true">
          <span>27</span>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.kicker}>
            <span className={styles.kickerDot} />
            El encuentro que impulsa tu siguiente nivel
          </div>

          <h1 className={styles.heroTitle}>
            <span>CEFIN</span>
            <strong>Experience</strong>
            <em>2027</em>
          </h1>

          <div className={styles.heroBottom}>
            <p>
              Dos días para transformar tu visión, anticiparte al cambio fiscal
              y llevar tu profesión a la era de la inteligencia artificial.
            </p>

            <a
              className={styles.primaryCta}
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Quiero vivir la experiencia</span>
              <i><ArrowIcon /></i>
            </a>
          </div>
        </div>

        <div className={styles.heroMeta}>
          <div>
            <small>Cuándo</small>
            <strong>17 y 18 de diciembre de 2026</strong>
          </div>
          <div>
            <small>Dónde</small>
            <strong>Ciudad de México</strong>
          </div>
          <div>
            <small>Experiencia</small>
            <strong>100% presencial</strong>
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-label="Transformación, estrategia e innovación">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((group) => (
            <div className={styles.marqueeGroup} aria-hidden={group === 1} key={group}>
              <span>Transformación</span><SparkIcon />
              <span>Estrategia fiscal</span><SparkIcon />
              <span>Inteligencia artificial</span><SparkIcon />
            </div>
          ))}
        </div>
      </div>

      <section className={styles.experienceSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Una experiencia que se vive</p>
          <h2>Todo cambia cuando decides ir más allá.</h2>
          <p className={styles.sectionDescription}>
            CEFIN Experience reúne mentalidad, conocimiento y tecnología en un
            encuentro creado para profesionales que no quieren quedarse atrás.
          </p>
        </div>

        <div className={styles.experienceGrid}>
          {experiences.map((experience) => (
            <article className={styles.experienceCard} key={experience.number}>
              <span>{experience.number}</span>
              <div>
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
              </div>
              <SparkIcon />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.daysSection} id="programa">
        <div className={styles.daysHeading}>
          <p className={styles.eyebrow}>Dos días. Una nueva perspectiva.</p>
          <h2>El programa</h2>
        </div>

        <div className={styles.daysGrid}>
          <article className={`${styles.dayCard} ${styles.dayOne}`}>
            <div className={styles.dayTopline}>
              <span>Día 01</span>
              <span>17 diciembre 2026</span>
            </div>
            <div className={styles.dayNumber}>17</div>
            <div className={styles.dayContent}>
              <p>Transformación + estrategia</p>
              <h3>Rompe tus techos mentales. Prepárate para 2027.</h3>
              <ul>
                <li>Experiencia para romper techos mentales</li>
                <li>Reforma Fiscal 2027</li>
                <li>Comida, cena y networking</li>
              </ul>
            </div>
          </article>

          <article className={`${styles.dayCard} ${styles.dayTwo}`}>
            <div className={styles.dayTopline}>
              <span>Día 02</span>
              <span>18 diciembre 2026</span>
            </div>
            <div className={styles.dayNumber}>18</div>
            <div className={styles.dayContent}>
              <p>Profesión + futuro</p>
              <h3>Inteligencia artificial para contadores.</h3>
              <ul>
                <li>IA aplicada al trabajo contable</li>
                <li>Nuevas oportunidades profesionales</li>
                <li>Una visión clara de tu siguiente paso</li>
              </ul>
            </div>
          </article>
        </div>

        <ProgramPromoCta />
      </section>

      <section className={styles.speakersSection}>
        <div className={styles.speakersCopy}>
          <p className={styles.eyebrow}>Voces que impulsan el cambio</p>
          <h2>Conocimiento que se convierte en acción.</h2>
          <p>
            Ideas, experiencia y herramientas para mirar tu profesión desde una
            perspectiva completamente nueva.
          </p>
        </div>

        <div className={styles.speakersGrid}>
          <article className={styles.speakerCard}>
            <div className={styles.speakerImageWrap}>
              <span className={styles.speakerShape} aria-hidden="true" />
              <Image
                className={styles.speakerImage}
                src={assetUrl("/alfredo.png")}
                alt="Alfredo Cobos"
                width={628}
                height={628}
                sizes="(max-width: 760px) 88vw, 38vw"
                unoptimized
              />
            </div>
            <div className={styles.speakerInfo}>
              <span>01</span>
              <div><h3>Alfredo Cobos</h3><p>Fundador de CEFIN</p></div>
            </div>
          </article>

          <article className={styles.speakerCard}>
            <div className={`${styles.speakerImageWrap} ${styles.speakerImageAlt}`}>
              <span className={styles.speakerShape} aria-hidden="true" />
              <Image
                className={styles.speakerImage}
                src={assetUrl("/contabilidad-electronica/marisol-contabilidad-electronica.png")}
                alt="Marisol Galván"
                width={567}
                height={551}
                sizes="(max-width: 760px) 88vw, 38vw"
                unoptimized
              />
            </div>
            <div className={styles.speakerInfo}>
              <span>02</span>
              <div><h3>Marisol Galván</h3><p>Especialista CEFIN</p></div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.communitySection}>
        <div className={styles.communityHeading}>
          <div>
            <p className={styles.eyebrow}>Comunidad CEFIN</p>
            <h2>Aprendemos juntos. Avanzamos más lejos.</h2>
          </div>
          <p>
            Personas reales, conexiones que permanecen y una comunidad que
            comparte la misma decisión: crecer profesionalmente.
          </p>
        </div>

        <div className={styles.communityVisual}>
          <Image
            className={styles.communityImage}
            src={assetUrl("/cefin-experience/comunidad-cefin-experience.jpg")}
            alt="Comunidad CEFIN reunida en diferentes encuentros presenciales"
            width={1672}
            height={941}
            sizes="(max-width: 760px) 100vw, 94vw"
            unoptimized
          />

          <div className={styles.communityBadge}>
            <span>Experiencias reales</span>
            <strong>Una comunidad que crece contigo.</strong>
          </div>
        </div>

        <div className={styles.communityTags} aria-label="Valores de la comunidad CEFIN">
          <span>Conexiones reales</span>
          <span>Aprendizaje compartido</span>
          <span>Crecimiento profesional</span>
        </div>

        <a
          className={styles.sectionCta}
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <small>17 y 18 de diciembre de 2026 · CDMX</small>
            Quiero ser parte de la experiencia
          </span>
          <i><ArrowIcon /></i>
        </a>
      </section>

      <OfferSection />

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>CEFIN EXPERIENCE</div>
        <div className={styles.footerBottom}>
          <span>17—18 DIC 2026</span>
          <span>CIUDAD DE MÉXICO</span>
          <span>© CEFIN 2026</span>
        </div>
      </footer>

      <StickyPromoCta />
    </main>
  );
}
