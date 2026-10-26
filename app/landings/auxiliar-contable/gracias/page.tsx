"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  META_CURRENCY,
  META_PIXEL_ID,
  initializeMetaPixel,
} from "@/lib/meta-pixel";
import {
  getAuxiliarContableEventId,
  getAuxiliarContableRegistrationSession,
  persistAuxiliarContableRegistrationSession,
  type AuxiliarContableRegistrationSession,
} from "@/lib/auxiliar-contable-tracking";
import {
  AUXILIAR_EVENT,
  AUXILIAR_WHATSAPP_URL,
} from "../config";
import styles from "./gracias.module.css";

const benefits = [
  "Liga de acceso a la clase",
  "Recordatorios importantes",
  "Materiales y avisos exclusivos",
];

const steps = [
  { number: "01", label: "Registro guardado", status: "complete" },
  { number: "02", label: "Entrar a WhatsApp", status: "current" },
  { number: "03", label: "Recibir tu acceso", status: "pending" },
] as const;

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.82 11.82 0 0012.07 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.16 1.59 5.97L0 24l6.3-1.65a11.87 11.87 0 005.77 1.47h.01c6.57 0 11.91-5.35 11.92-11.92 0-3.18-1.24-6.18-3.5-8.44zM12.07 21.68c-1.8 0-3.56-.48-5.1-1.38l-.37-.22-3.83 1.01.99-3.65-.24-.38A9.88 9.88 0 0112.07 2.12c5.43 0 9.85 4.43 9.85 9.87 0 2.63-1.01 5.1-2.86 6.96-1.85 1.85-4.32 2.87-6.99 2.87z" />
    </svg>
  );
}

export default function GraciasAuxiliar() {
  const sessionRef = useRef<AuxiliarContableRegistrationSession | null>(null);
  const joinGroupSentRef = useRef(false);

  useEffect(() => {
    document.title = `Último paso | ${AUXILIAR_EVENT.name} | CEFIN`;
    const session = getAuxiliarContableRegistrationSession();
    sessionRef.current = session;
    if (!session || session.completeRegistrationSent) return;

    initializeMetaPixel();
    if (typeof window.fbq !== "function") return;

    window.fbq(
      "track",
      "CompleteRegistration",
      {
        content_name: AUXILIAR_EVENT.name,
        content_category: "Clase gratuita",
        landing_slug: "auxiliar-contable",
        event_date: AUXILIAR_EVENT.dateIso,
        event_time: `${AUXILIAR_EVENT.time} ${AUXILIAR_EVENT.timezone}`,
        registration_source: "thank_you_redirect",
        status: "completed",
        value: 0,
        currency: META_CURRENCY,
      },
      {
        eventID: getAuxiliarContableEventId(
          "complete-registration",
          session.id,
        ),
      },
    );

    session.completeRegistrationSent = true;
    persistAuxiliarContableRegistrationSession(session);
  }, []);

  const handleWhatsAppClick = () => {
    if (joinGroupSentRef.current) return;

    initializeMetaPixel();
    if (typeof window.fbq !== "function") return;

    const session = sessionRef.current;
    if (session?.joinGroupSent) return;

    joinGroupSentRef.current = true;
    const sessionId =
      session?.id ??
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

    if (session) {
      session.joinGroupSent = true;
      persistAuxiliarContableRegistrationSession(session);
    }

    window.fbq(
      "trackCustom",
      "JoinGroup",
      {
        content_name: AUXILIAR_EVENT.name,
        content_category: "Grupo de WhatsApp",
        landing_slug: "auxiliar-contable",
        source: "thank_you_page",
        destination: "whatsapp_group",
        status: "clicked",
      },
      {
        eventID: getAuxiliarContableEventId("join-group", sessionId),
      },
    );
  };

  return (
    <>
      <Script
        id="meta-pixel-auxiliar-thank-you"
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
          <div className={styles.statusPill}>
            <span>✓</span> Registro recibido
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
          <div className={styles.visual} aria-hidden="true">
            <span className={styles.portraitHalo} />
            <span className={styles.portraitRing} />
            <Image
              className={styles.portrait}
              src="/alfredo.png"
              alt=""
              width={628}
              height={628}
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />

            <div className={styles.eventBadge}>
              <div>
                <small>Tu clase en vivo</small>
                <strong>{AUXILIAR_EVENT.shortDate}</strong>
              </div>
              <span>
                {AUXILIAR_EVENT.time}
                <small>{AUXILIAR_EVENT.timezone}</small>
              </span>
            </div>
          </div>

          <div className={styles.content}>
            <div className={`${styles.eyebrow} ${styles.revealOne}`}>
              <span>✓</span>
              <p>Registro guardado correctamente</p>
              <i />
            </div>

            <h1 className={`${styles.title} ${styles.revealTwo}`}>
              Tu lugar está
              <strong>casi listo</strong>
            </h1>

            <p className={`${styles.intro} ${styles.revealThree}`}>
              Ya guardamos tus datos. Completa el último paso entrando al grupo
              privado de WhatsApp para recibir el acceso a la clase
              <strong> {AUXILIAR_EVENT.name}</strong>.
            </p>

            <div className={`${styles.actionCard} ${styles.revealFour}`}>
              <div className={styles.progressHeading}>
                <span>Tu registro</span>
                <strong>80% completado</strong>
              </div>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-label="Progreso del registro"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={80}
              >
                <span />
              </div>

              <a
                className={styles.whatsappCta}
                href={AUXILIAR_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
              >
                <i><WhatsAppIcon /></i>
                <span>
                  <small>Último paso</small>
                  Entrar al grupo de WhatsApp
                </span>
                <b>→</b>
              </a>

              <p className={styles.ctaHint}>
                Haz clic en el botón para completar tu inscripción.
              </p>
            </div>

            <div className={`${styles.benefits} ${styles.revealFive}`}>
              <p>En el grupo recibirás:</p>
              <div>
                {benefits.map((benefit) => (
                  <span key={benefit}>
                    <i>✓</i> {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.stepsSection} aria-label="Pasos del registro">
          <div className={styles.steps}>
            {steps.map((step) => (
              <div
                className={`${styles.step} ${styles[step.status]}`}
                key={step.number}
              >
                <span>{step.number}</span>
                <p>{step.label}</p>
                <i>{step.status === "complete" ? "✓" : step.status === "current" ? "Ahora" : "Después"}</i>
              </div>
            ))}
          </div>

          <p className={styles.note}>
            <strong>Importante:</strong> WhatsApp será el canal principal para
            compartir el enlace, recordatorios y materiales. Entra ahora para
            no perderte ninguna actualización.
          </p>
        </section>
      </main>
    </>
  );
}
