"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  NIF_REGISTRATION_COMPLETION_STORAGE_KEY,
  trackMetaCustomEventImmediate,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import {
  NIF_WHATSAPP_GROUP_URLS,
  resolveNifWhatsappGroupUrl,
} from "../../nif-whatsapp-routing";
import styles from "./gracias-nif.module.css";

const JOIN_GROUP_EVENT_KEY = "nifJoinGroupEventSent";
const subscribeToNifWhatsappSelection = () => () => undefined;
const getPrincipalNifWhatsappGroup = () => NIF_WHATSAPP_GROUP_URLS.principal;

function unlockDocumentScroll() {
  [document.documentElement, document.body].forEach((element) => {
    if (element.style.overflow === "hidden") {
      element.style.removeProperty("overflow");
    }
    if (element.style.overflowY === "hidden") {
      element.style.removeProperty("overflow-y");
    }
  });
}

function claimRegistrationConversion(registrationId: string) {
  const conversionKey = `${NIF_REGISTRATION_COMPLETION_STORAGE_KEY}:${registrationId}`;

  try {
    if (window.localStorage.getItem(conversionKey)) return false;
    window.localStorage.setItem(conversionKey, "true");
    return true;
  } catch {
    if (
      window.sessionStorage.getItem(
        NIF_REGISTRATION_COMPLETION_STORAGE_KEY,
      ) === registrationId
    ) {
      return false;
    }
    window.sessionStorage.setItem(
      NIF_REGISTRATION_COMPLETION_STORAGE_KEY,
      registrationId,
    );
    return true;
  }
}

export default function GraciasNifClient() {
  const groupUrl = useSyncExternalStore(
    subscribeToNifWhatsappSelection,
    resolveNifWhatsappGroupUrl,
    getPrincipalNifWhatsappGroup,
  );

  useEffect(() => {
    unlockDocumentScroll();
  }, []);

  useEffect(() => {
    fetch("/api/nif/registro/consumir", {
      method: "POST",
      credentials: "same-origin",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("invalid-registration");
        return (await response.json()) as { registrationId: string };
      })
      .then(({ registrationId }) => {
        if (!claimRegistrationConversion(registrationId)) return;
        trackMetaEvent(
          "CompleteRegistration",
          {
            content_name: "ABC de NIF",
            content_category: "Clase gratuita en vivo",
            status: "completed",
            value: 0,
            currency: "MXN",
          },
          { eventID: registrationId },
        );
      })
      .catch(() => undefined);
  }, []);

  const trackJoinGroup = () => {
    try {
      if (window.sessionStorage.getItem(JOIN_GROUP_EVENT_KEY)) return;
      window.sessionStorage.setItem(JOIN_GROUP_EVENT_KEY, "true");
    } catch {
      // El tracking nunca debe bloquear la salida directa hacia WhatsApp.
    }

    trackMetaCustomEventImmediate("JoinGroup", {
      landing_slug: "nif-registro",
      funnel_step: "whatsapp_direct",
    });
  };

  return (
    <>
      <Script
        id="meta-pixel-nif-gracias"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl()}
          alt=""
        />
      </noscript>
      <main className={styles.page}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.glowOne} aria-hidden="true" />
        <div className={styles.glowTwo} aria-hidden="true" />

        <section className={styles.shell}>
          <header className={styles.topbar}>
            <a href="/landings/nif" className={styles.brand}>
              <span className={styles.brandMark}>C</span>
              <span>CEFIN</span>
            </a>
            <span className={styles.freeBadge}>Clase 100% gratuita</span>
          </header>

          <div className={styles.heroLayout}>
            <div className={styles.copy}>
              <div className={styles.kicker}>
                <span className={styles.liveDot} aria-hidden="true" />
                Datos recibidos · Falta un último paso
              </div>

              <h1 className={styles.title}>
                Tu acceso a <span>ABC de NIF</span> aún no está completo.
              </h1>

              <p className={styles.lead}>
                Ya recibimos tus datos, pero todavía no estás dentro de la
                clase. Para confirmar tu acceso, entra ahora al grupo oficial de
                WhatsApp.
              </p>

              <div className={styles.eventCard}>
                <div>
                  <span>Fecha</span>
                  <strong>Jueves 5 de noviembre</strong>
                </div>
                <div>
                  <span>Hora</span>
                  <strong>11:00 a. m. · CDMX</strong>
                </div>
                <div>
                  <span>Modalidad</span>
                  <strong>En vivo y online</strong>
                </div>
              </div>

              <div className={styles.accessNotice} role="note">
                <span aria-hidden="true">!</span>
                <p>
                  <strong>Aún no estás dentro de la clase.</strong>
                  Tu acceso queda completo cuando entras al grupo oficial, donde
                  recibirás el enlace y los avisos del evento.
                </p>
              </div>

              <div className={styles.actionCard}>
                <div className={styles.progressHeader}>
                  <p>Finaliza tu registro</p>
                  <span>1 de 2 listo</span>
                </div>
                <div className={styles.progressTrack} aria-hidden="true">
                  <span />
                </div>

                <div className={styles.steps}>
                  <div className={styles.stepDone}>
                    <span>✓</span>
                    <div>
                      <small>Paso 1</small>
                      <strong>Formulario enviado</strong>
                    </div>
                  </div>
                  <div className={styles.stepPending}>
                    <span>2</span>
                    <div>
                      <small>Paso final</small>
                      <strong>Confirmar en WhatsApp</strong>
                    </div>
                  </div>
                </div>

                <a
                  href={groupUrl}
                  onClick={trackJoinGroup}
                  className={styles.whatsappButton}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.16 1.59 5.97L.06 24l6.25-1.64a11.9 11.9 0 0 0 5.76 1.47h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.19-1.24-6.18-3.48-8.43ZM12.08 21.82h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.84 9.84 0 0 1-1.52-5.29c0-5.46 4.44-9.9 9.91-9.9a9.83 9.83 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c-.01 5.46-4.45 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
                  </svg>
                  Confirmar mi acceso en WhatsApp
                  <span aria-hidden="true">→</span>
                </a>
                <p className={styles.microcopy}>
                  WhatsApp se abrirá directamente. Toca “Unirme al grupo” para
                  quedar dentro de la clase.
                </p>
              </div>
            </div>

            <div className={styles.instructorStage}>
              <div className={styles.portraitHalo} aria-hidden="true" />
              <Image
                src="/alfredo.png"
                alt="Mtro. Alfredo Cobos, instructor de ABC de NIF"
                width={800}
                height={900}
                priority
                sizes="(max-width: 900px) 100vw, 42vw"
                className={styles.instructorImage}
              />
              <div className={styles.instructorCard}>
                <span>Tu instructor</span>
                <strong>Mtro. Alfredo Cobos</strong>
                <p>Especialista en Normas de Información Financiera</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className={styles.mobileSticky}>
        <a
          href={groupUrl}
          onClick={trackJoinGroup}
          className={styles.mobileStickyButton}
        >
          Confirmar mi acceso <span aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
}
