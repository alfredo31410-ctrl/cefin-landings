"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import {
  META_PIXEL_ID,
  trackMetaCustomEvent,
} from "@/lib/meta-pixel";
import { createAuxiliarContableRegistrationProof } from "@/lib/auxiliar-contable-tracking";
import { AUXILIAR_EVENT } from "./config";
import styles from "./auxiliar-contable.module.css";

const topics = [
  "Bases contables",
  "Control de facturas",
  "Reportería esencial",
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function LandingCEFIN() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = `${AUXILIAR_EVENT.name} | CEFIN`;
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const oldScript = document.getElementById("ac-script-loader");
    oldScript?.remove();

    const script = document.createElement("script");
    script.id = "ac-script-loader";
    script.src = `https://cefincapacitacion.activehosted.com/f/embed.php?id=${AUXILIAR_EVENT.activeCampaignFormId}`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };
    const captureRegistrationAttempt = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!form.closest(`._form_${AUXILIAR_EVENT.activeCampaignFormId}`)) return;
      createAuxiliarContableRegistrationProof();
    };
    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("submit", captureRegistrationAttempt, true);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("submit", captureRegistrationAttempt, true);
    };
  }, [isModalOpen]);

  return (
    <>
      <Script
        id="meta-pixel-auxiliar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            if (!window.__cefinMetaPixelInitialized) {
              fbq('init', '${META_PIXEL_ID}');
              window.__cefinMetaPixelInitialized = true;
            }
            fbq('track', 'PageView');
          `,
        }}
      />

      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta Pixel requires its tracking image inside noscript. */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <main className={styles.page}>
        <div className={styles.ambient} aria-hidden="true">
          <span className={styles.auroraOne} />
          <span className={styles.auroraTwo} />
          <span className={styles.grid} />
          <span className={styles.noise} />
        </div>

        <header className={styles.header}>
          <div className={styles.livePill}>
            <span /> Clase gratuita en vivo
          </div>

          <a
            className={styles.brand}
            href="https://cefin.mx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar el sitio de CEFIN"
          >
            <span>CEFIN</span>
            <small>Mtro. Alfredo Cobos</small>
          </a>
        </header>

        <section className={styles.hero}>
          <div className={styles.portraitWrap} aria-hidden="true">
            <span className={styles.portraitHalo} />
            <span className={styles.portraitRing} />
            <Image
              className={styles.portrait}
              src="/alfredo.png"
              alt=""
              width={628}
              height={628}
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <div className={styles.expertBadge}>
              <span className={styles.expertNumber}>01</span>
              <span>Nivel inicial<br />desde cero</span>
            </div>
          </div>

          <div className={styles.content}>
            <div className={`${styles.eyebrow} ${styles.revealOne}`}>
              <span>01</span>
              <p>Entrenamiento desde cero</p>
              <i />
            </div>

            <h1 className={`${styles.title} ${styles.revealTwo}`}>
              <span>Auxiliares</span>
              <strong>Contables</strong>
              <em>con Inteligencia Artificial</em>
            </h1>

            <p className={`${styles.subtitle} ${styles.revealThree}`}>
              Aprende las bases que necesitas para comenzar con seguridad y
              apóyate en la inteligencia artificial para trabajar mejor.
            </p>

            <div className={`${styles.sessionTag} ${styles.revealThree}`}>
              <span className={styles.sessionDot} />
              Sesión 100% en vivo
              <i />
              Cupo limitado
            </div>

            <div className={`${styles.eventCard} ${styles.revealFour}`}>
              <div className={styles.calendarIcon} aria-hidden="true">
                <span />
                <span />
                <b>{AUXILIAR_EVENT.day}</b>
              </div>
              <div className={styles.eventCopy}>
                <small>Reserva la fecha</small>
                <p>{AUXILIAR_EVENT.date}</p>
              </div>
              <div className={styles.eventTime}>
                <small>Hora</small>
                <p>{AUXILIAR_EVENT.time}</p>
                <span>{AUXILIAR_EVENT.timezone}</span>
              </div>
            </div>

            <div className={`${styles.actions} ${styles.revealFive}`}>
              <button
                type="button"
                className={styles.primaryCta}
                onClick={() => {
                  trackMetaCustomEvent("OpenRegistrationForm", {
                    content_name: AUXILIAR_EVENT.name,
                    form_id: AUXILIAR_EVENT.activeCampaignFormId,
                  });
                  setIsModalOpen(true);
                }}
              >
                <span>¡Registrarme gratis!</span>
                <i><ArrowIcon /></i>
              </button>
              <p><span>✓</span> Sin costo · Acceso inmediato</p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.topics}>
            {topics.map((topic, index) => (
              <span key={topic}>
                <i>0{index + 1}</i> {topic}
              </span>
            ))}
          </div>

          <a
            className={styles.secondaryCta}
            href="https://cefin.mx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <small>¿Quieres saber más de nosotros?</small>
              Conoce lo que hacemos en CEFIN
            </span>
            <i><ArrowIcon /></i>
          </a>
        </footer>

        {isModalOpen && (
          <div
            className={styles.modalBackdrop}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsModalOpen(false);
            }}
          >
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="registration-title"
            >
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar formulario"
                autoFocus
              >
                <span />
                <span />
              </button>

              <div className={styles.modalHeading}>
                <span>Registro gratuito</span>
                <h2 id="registration-title">
                  Asegura tu <strong>lugar</strong>
                </h2>
                <p>{AUXILIAR_EVENT.name} · {AUXILIAR_EVENT.shortDate}</p>
              </div>

              <div className={`${styles.formWrapper} ac-modal-wrapper`}>
                <div className={`_form_${AUXILIAR_EVENT.activeCampaignFormId}`} />
              </div>

              <p className={styles.privacyNote}>
                Tus datos están seguros. No compartimos tu información.
              </p>
            </div>
          </div>
        )}

        <style jsx global>{`
          .ac-modal-wrapper ._form_${AUXILIAR_EVENT.activeCampaignFormId},
          .ac-modal-wrapper form,
          .ac-modal-wrapper ._form-content {
            background: transparent !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .ac-modal-wrapper ._form-title,
          .ac-modal-wrapper ._form-branding {
            display: none !important;
          }
        `}</style>
      </main>
    </>
  );
}
