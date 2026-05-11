"use client";

import Script from "next/script";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: Record<string, unknown>,
      ) => {
        destroy?: () => void;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * ============================================================================
 * BLOQUE DE CONFIGURACION
 * ============================================================================
 * Todo lo importante que seguramente vas a cambiar mas adelante vive aqui.
 * La idea es que no tengas que buscar por todo el archivo.
 */

const LIVE_PAGE_DATA = {
  title: "Academia de Contabilidad Basica",
  subtitle:
    "Vuelve a la contabilidad con una clase guiada cada jueves y construye una base real para trabajar con claridad y confianza.",
  pageBackgroundImage:
    "https://cefin-landings-z9uk.vercel.app/academia-contabilidad/academia-live-bg.png",
  heroImage:
    "https://cefin-landings-z9uk.vercel.app/academia-contabilidad/academia-live-bg.png",
  heroImageAlt: "Mtro. Alfredo Cobos",
  heroSupportText:
    "Cada jueves esta pagina abre una clase guiada para reconectar con la contabilidad real y, al final, desbloquear el acceso a la academia completa.",
  liveLabel: "Sesion semanal",
  openLabel: "Estamos en vivo",
  paymentLabel: "Quiero entrar a la academia",
  paymentUrl:
    "https://pay.hotmart.com/K105150399H?off=9ho393qq&checkoutMode=10&bid=1778522461361",
  price: "$4,387",
  oldPrice: "",
  priceCurrency: "MXN",
  productValue: 4387,
  presenter: "Mtro. Alfredo Cobos",
  broadcastDayLabel: "Jueves",
  broadcastTimeLabel: "11:00 AM (CDMX)",
  liveNoticeTitle: "La sesion abre solo los jueves a las 11:00 AM",
  liveNoticeBody:
    "Fuera de ese horario puedes usar esta pagina como pre-landing y volver cuando se active la transmision.",
  enrollmentTitle: "Entra a la Academia CEFIN de Contabilidad Basica",
  enrollmentDescription:
    "Cuando Alfredo llegue al cierre de la clase se activa la oferta completa: 16 modulos, acceso por un ano, software contable, IA aplicada y el bono de acompanamiento en vivo.",
  enrollmentBadges: [
    "16 modulos grabados",
    "Acceso por 1 ano",
    "4 sesiones en vivo del Factor CEFIN",
    "Software contable + IA aplicada",
  ],
  realityTitle: "No te falta capacidad. Te falta claridad.",
  realityItems: [
    "La mayoria de los colegas no se aleja de la contabilidad por falta de talento, sino porque nadie se la explico con logica y aplicacion real.",
    "Puedes haber egresado hace anos, haber pausado tu carrera o sentir que lo viste en la escuela, pero no sabes como aterrizarlo en empresas reales.",
    "La contabilidad no se memoriza como receta: se entiende, se razona y luego se aplica con tecnica.",
  ],
  realityResult:
    "Cuando entiendes la logica detras de cada cargo, abono y asiento, recuperas seguridad para trabajar, cobrar mejor y volver a disfrutar la profesion.",
  realityWarning:
    "Este live esta pensado para despertar lo que ya sabes, ordenar tu criterio y convertir la contabilidad en una habilidad util para trabajar y crecer.",
  problemTitle: "Que se desbloquea durante la clase",
  problemSubtitle:
    "La pagina va soltando cada bloque en el momento donde Alfredo lo explica: reconexion, metodo, practica real, academia y cierre con oferta.",
  learnEyebrow: "Timeline de la clase",
  learnTitle: "Ruta del entrenamiento en esta sesion",
  learnClosing:
    "La meta es que el CTA fuerte aparezca justo cuando ya viste la promesa, la logica del metodo y el contenido completo de la academia.",
  valueTitle: "Lo que desbloqueas al entrar hoy",
  valueSubtitle:
    "Esta no es solo una clase aislada: es una ruta completa para regresar a la contabilidad desde cero y con acompanamiento.",
  urgencyTitle: "La decision correcta se toma dentro de la clase",
  urgencySubtitle:
    "El cierre vive aqui mismo: si la clase te dio claridad, entra hoy y asegura acceso a la academia completa con sus bonos activos.",
  footerNotes: [
    "La promesa central de esta pagina es simple: volver a la contabilidad si, pero volver con metodo, practica y confianza real.",
    "Cuando me compartas el embed final del directo, solo hay que pegarlo arriba y esta experiencia queda lista para repetirse cada jueves.",
  ],
};

/**
 * TODO: pega aqui el embed real del live de YouTube.
 * Ejemplo:
 * https://www.youtube.com/embed/TU_VIDEO_ID?autoplay=1&rel=0
 */
const YOUTUBE_EMBED_URL =
  "https://www.youtube.com/embed/PEGA_AQUI_EL_EMBED_DEL_LIVE?rel=0";

/**
 * REGLAS DEL EVENTO SEMANAL
 * - solo los jueves
 * - 11:00 AM
 * - hora CDMX
 * - con una ventana total configurable
 */
const LIVE_TIMEZONE = "America/Mexico_City";
const LIVE_WEEKDAY = "Thu";
const LIVE_START_HOUR = 11;
const LIVE_START_MINUTE = 0;
const LIVE_DURATION_MINUTES = 84;

/**
 * Esta timeline es la base del desbloqueo por tiempo.
 * Cuando me pases la transcripcion se puede mover minuto por minuto.
 */
const LIVE_STEPS = [
  {
    id: "intro",
    minute: 0,
    title: "Reconecta con la contabilidad",
    description:
      "Alfredo abre la clase explicando para quien es: recien egresados, colegas que se alejaron y estudiantes que quieren aterrizar la practica real.",
  },
  {
    id: "benefits",
    minute: 8,
    title: "No te falta capacidad, te falta claridad",
    description:
      "Se activa el bloque donde baja el miedo, explica por que la contabilidad no se memoriza y muestra que la base sigue viva si se entiende con logica.",
  },
  {
    id: "reality",
    minute: 20,
    title: "Metodo, practica y casos reales",
    description:
      "En este punto ya entra la parte practica: cuentas, cargo y abono, asientos, IVA, software y el enfoque real que transforma la seguridad del alumno.",
  },
  {
    id: "offer",
    minute: 74,
    title: "Se revela la academia completa",
    description:
      "Se abre el bloque donde Alfredo presenta la Academia CEFIN de Contabilidad Basica con sus 16 modulos, acceso por un ano y herramientas incluidas.",
  },
  {
    id: "checkout",
    minute: 80,
    title: "Cierre y boton de inscripcion",
    description:
      "Se activa el boton principal de Hotmart en el momento del cierre, junto con el bono de 4 sesiones en vivo del Factor CEFIN.",
  },
];

type LiveClockState = {
  currentDay: string;
  currentHour: number;
  currentMinute: number;
  currentSecond: number;
  isLiveDay: boolean;
  minutesSinceStart: number;
  isBeforeLive: boolean;
  isDuringLive: boolean;
  isAfterLive: boolean;
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">{children}</div>;
}

function SectionEyebrow({
  children,
  center = false,
  dark = false,
}: {
  children: React.ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <p
      className={[
        "text-sm font-black uppercase tracking-[0.18em]",
        center ? "text-center" : "",
        dark ? "text-[#ff8cae]" : "text-[#ff5e7a]",
      ].join(" ")}
    >
      {children}
    </p>
  );
}

function PrimaryButton({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center rounded-2xl bg-[#ff5e7a] px-8 py-5",
        "text-center text-lg font-black text-white shadow-xl",
        "transition duration-300 hover:-translate-y-1 hover:bg-[#f04d6a]",
        "md:text-2xl",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function SurfaceCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[2rem] border border-white/10 bg-white shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function EnrollmentCard({
  onCheckout,
  offerUnlocked,
  checkoutUnlocked,
}: {
  onCheckout: () => void;
  offerUnlocked: boolean;
  checkoutUnlocked: boolean;
}) {
  return (
    <div className="rounded-[2rem] border border-[#ffb6c4] bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] md:p-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full bg-[#fff1f4] px-4 py-1 text-sm font-bold uppercase tracking-wide text-[#d9355a]">
            Oferta de la clase
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight text-slate-900 md:text-3xl">
            {LIVE_PAGE_DATA.enrollmentTitle}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
            {LIVE_PAGE_DATA.enrollmentDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm md:text-base">
            {LIVE_PAGE_DATA.enrollmentBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-slate-50 px-4 py-2 font-semibold text-slate-700"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="min-w-[260px] rounded-[1.5rem] bg-slate-950 p-6 text-white">
          <p className="text-sm uppercase tracking-[0.18em] text-[#ff8cae]">
            Inversion hoy
          </p>

          <p className="mt-2 text-4xl font-black md:text-5xl">
            {LIVE_PAGE_DATA.price}
          </p>

          <p className="text-sm text-slate-300">{LIVE_PAGE_DATA.priceCurrency}</p>

          {offerUnlocked ? (
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              La oferta ya esta desbloqueada dentro del flujo de la clase.
            </p>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Esta tarjeta se activa automaticamente cuando Alfredo entra al
              bloque de academia y cierre.
            </p>
          )}

          {checkoutUnlocked ? (
            <a
              href={LIVE_PAGE_DATA.paymentUrl}
              onClick={onCheckout}
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#ff5e7a] px-6 py-4 text-center text-base font-black text-white transition duration-300 hover:bg-[#f04d6a] md:text-lg"
            >
              {LIVE_PAGE_DATA.paymentLabel}
            </a>
          ) : (
            <div className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-800 px-6 py-4 text-center text-base font-black text-slate-400 md:text-lg">
              Se activa al llegar el cierre
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getLiveClockState(): LiveClockState {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: LIVE_TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const currentDay =
    parts.find((part) => part.type === "weekday")?.value ?? "Mon";
  const currentHour = Number(
    parts.find((part) => part.type === "hour")?.value ?? "0",
  );
  const currentMinute = Number(
    parts.find((part) => part.type === "minute")?.value ?? "0",
  );
  const currentSecond = Number(
    parts.find((part) => part.type === "second")?.value ?? "0",
  );

  const isLiveDay = currentDay === LIVE_WEEKDAY;
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const liveStartTotalMinutes = LIVE_START_HOUR * 60 + LIVE_START_MINUTE;
  const liveEndTotalMinutes = liveStartTotalMinutes + LIVE_DURATION_MINUTES;
  const minutesSinceStart = currentTotalMinutes - liveStartTotalMinutes;

  return {
    currentDay,
    currentHour,
    currentMinute,
    currentSecond,
    isLiveDay,
    minutesSinceStart,
    isBeforeLive: isLiveDay && currentTotalMinutes < liveStartTotalMinutes,
    isDuringLive:
      isLiveDay &&
      currentTotalMinutes >= liveStartTotalMinutes &&
      currentTotalMinutes < liveEndTotalMinutes,
    isAfterLive: isLiveDay && currentTotalMinutes >= liveEndTotalMinutes,
  };
}

function formatMexicoTime(clockState: LiveClockState) {
  const hour = String(clockState.currentHour).padStart(2, "0");
  const minute = String(clockState.currentMinute).padStart(2, "0");
  const second = String(clockState.currentSecond).padStart(2, "0");

  return `${hour}:${minute}:${second}`;
}

export default function AcademiaContabilidadLivePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [clockState, setClockState] = useState<LiveClockState | null>(null);
  const playerRef = useRef<{ destroy?: () => void } | null>(null);

  useEffect(() => {
    document.title = "Academia de Contabilidad | Live semanal | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: `${LIVE_PAGE_DATA.title} | Live`,
      content_category: "Masterclass",
    });
  }, []);

  useEffect(() => {
    setClockState(getLiveClockState());

    const intervalId = window.setInterval(() => {
      setClockState(getLiveClockState());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!hasStarted || !clockState?.isDuringLive) return;

    const setupPlayer = () => {
      if (!window.YT?.Player || playerRef.current) return;

      playerRef.current = new window.YT.Player("academia-live-player", {
        videoId: undefined,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
      });
    };

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      setupPlayer();
    };

    if (window.YT?.Player) {
      setupPlayer();
    }

    return () => {
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [clockState?.isDuringLive, hasStarted]);

  const unlockedSteps = useMemo(() => {
    if (!clockState || (!clockState.isDuringLive && !clockState.isAfterLive)) {
      return [];
    }

    return LIVE_STEPS.filter(
      (step) => clockState.minutesSinceStart >= step.minute,
    );
  }, [clockState]);

  const benefitsUnlocked = unlockedSteps.some((step) => step.id === "benefits");
  const realityUnlocked = unlockedSteps.some((step) => step.id === "reality");
  const offerUnlocked = unlockedSteps.some((step) => step.id === "offer");
  const checkoutUnlocked = unlockedSteps.some((step) => step.id === "checkout");

  const handleCheckoutClick = () => {
    const payload: Record<string, unknown> = {
      content_name: LIVE_PAGE_DATA.title,
      content_category: "Curso",
    };

    if (LIVE_PAGE_DATA.productValue > 0) {
      payload.value = LIVE_PAGE_DATA.productValue;
      payload.currency = META_CURRENCY;
    }

    trackMetaEvent("InitiateCheckout", payload);
  };

  return (
    <div className="relative h-screen overflow-y-auto bg-[#120018] text-slate-900 selection:bg-red-100">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `url('${LIVE_PAGE_DATA.pageBackgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(30,6,38,0.30)_0%,rgba(30,6,38,0.44)_26%,rgba(255,255,255,0.90)_60%,rgba(255,255,255,1)_100%)]" />

      <Script
        id="meta-pixel-academia-live"
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

      <header className="sticky top-0 z-50 text-white">
        <Container>
          <div className="flex items-center justify-between py-5">
            <div>
              <p className="text-3xl font-black tracking-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                CEFIN
              </p>
            </div>

            <div className="rounded-full bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur md:text-sm">
              {!clockState
                ? "Cargando horario CDMX"
                : clockState.isDuringLive
                ? `CDMX ${formatMexicoTime(clockState)}`
                : `${LIVE_PAGE_DATA.broadcastDayLabel} ${LIVE_PAGE_DATA.broadcastTimeLabel}`}
            </div>
          </div>
        </Container>
      </header>

      <main className="relative z-10 overflow-x-hidden">
        <section className="relative overflow-hidden pb-8 pt-24 md:pb-12 md:pt-32">
          <Container>
            <div className="relative z-10 mx-auto max-w-5xl">
              <div className="text-center">
                <h1 className="text-4xl font-black leading-[1.02] text-white md:text-6xl">
                  {LIVE_PAGE_DATA.title}
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-white/88 md:text-2xl">
                  {LIVE_PAGE_DATA.subtitle}
                </p>
              </div>

              <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_20px_80px_rgba(15,23,42,0.12)] md:p-3">
                <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-black">
                  {!clockState?.isDuringLive ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${LIVE_PAGE_DATA.pageBackgroundImage}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/35" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                        <p className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/85">
                          Sesion semanal automatizada
                        </p>
                        <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                          {LIVE_PAGE_DATA.liveNoticeTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                          {LIVE_PAGE_DATA.liveNoticeBody}
                        </p>
                        <p className="mt-4 text-base font-bold text-white/90 md:text-lg">
                          Hora actual en CDMX:{" "}
                          {clockState ? formatMexicoTime(clockState) : "--:--:--"}
                        </p>
                      </div>
                    </>
                  ) : !hasStarted ? (
                    <button
                      type="button"
                      onClick={() => setHasStarted(true)}
                      aria-label="Reproducir live"
                      className="absolute inset-0 z-10 flex items-center justify-center"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-90"
                        style={{
                          backgroundImage: `url('${LIVE_PAGE_DATA.heroImage}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/30" />

                      <div className="absolute bottom-5 left-5 right-5 text-left text-white md:bottom-8 md:left-8 md:right-8">
                        <p className="max-w-2xl text-sm font-semibold text-white/80 md:text-base">
                          {LIVE_PAGE_DATA.heroSupportText}
                        </p>
                      </div>

                      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#ff5e7a] shadow-2xl transition duration-300 hover:scale-110 md:h-28 md:w-28">
                        <svg
                          className="h-12 w-12 translate-x-1 fill-current text-white md:h-14 md:w-14"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <iframe
                      src={YOUTUBE_EMBED_URL}
                      title="Live Academia de Contabilidad"
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>

              <div className="mt-10 text-center">
                {checkoutUnlocked ? (
                  <PrimaryButton
                    href={LIVE_PAGE_DATA.paymentUrl}
                    onClick={handleCheckoutClick}
                  >
                    {LIVE_PAGE_DATA.paymentLabel}
                  </PrimaryButton>
                ) : (
                  <div className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-8 py-5 text-center text-lg font-black text-slate-500 md:text-2xl">
                  El CTA se habilita durante la clase
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {benefitsUnlocked && (
          <section className="bg-white/96 pb-10 pt-12 backdrop-blur-[2px] md:pb-12 md:pt-16">
            <Container>
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
                  {LIVE_PAGE_DATA.realityTitle}
                </h2>

                <div className="mt-8 rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.24)] md:p-10">
                  <div className="space-y-4 text-lg leading-relaxed text-slate-200 md:text-xl">
                    {LIVE_PAGE_DATA.realityItems.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>

                  <div className="mt-8 h-px w-full bg-white/10" />

                  <p className="mt-8 text-2xl font-black leading-tight text-white md:text-3xl">
                    {LIVE_PAGE_DATA.realityResult}
                  </p>

                  <p className="mt-4 text-lg text-slate-300 md:text-xl">
                    {LIVE_PAGE_DATA.realityWarning}
                  </p>
                </div>
              </div>
            </Container>
          </section>
        )}

        <section className="bg-white/96 pb-16 pt-4 backdrop-blur-[2px] md:pb-20 md:pt-6">
          <Container>
            <div className="mx-auto max-w-5xl">
              <EnrollmentCard
                onCheckout={handleCheckoutClick}
                offerUnlocked={offerUnlocked}
                checkoutUnlocked={checkoutUnlocked}
              />
            </div>
          </Container>
        </section>

        {realityUnlocked && (
          <section className="bg-slate-50/96 py-20 backdrop-blur-[2px] md:py-24">
            <Container>
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
                  {LIVE_PAGE_DATA.problemTitle}
                </h2>

                <p className="mt-6 text-xl font-bold leading-relaxed text-slate-700 md:text-2xl">
                  {LIVE_PAGE_DATA.problemSubtitle}
                </p>
              </div>
            </Container>
          </section>
        )}

        <section className="bg-white/96 py-20 backdrop-blur-[2px] md:py-24">
          <Container>
            <div className="mx-auto max-w-5xl">
              <SectionEyebrow center>{LIVE_PAGE_DATA.learnEyebrow}</SectionEyebrow>

              <h2 className="mt-4 text-center text-3xl font-black leading-tight text-slate-900 md:text-5xl">
                {LIVE_PAGE_DATA.learnTitle}
              </h2>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {LIVE_STEPS.map((item) => {
                  const unlocked = unlockedSteps.some(
                    (step) => step.id === item.id,
                  );

                  return (
                    <SurfaceCard
                      key={item.id}
                      className={`p-6 ${
                        unlocked ? "border-[#ffb6c4] bg-[#fff7f9]" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-lg font-black leading-relaxed text-slate-800">
                          {item.title}
                        </p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${
                            unlocked
                              ? "bg-[#ffe3ea] text-[#d9355a]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {unlocked ? "Activo" : `${item.minute} min`}
                        </span>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </SurfaceCard>
                  );
                })}
              </div>

              <p className="mt-8 text-center text-xl font-black text-slate-700 md:text-2xl">
                {LIVE_PAGE_DATA.learnClosing}
              </p>
            </div>
          </Container>
        </section>

        {offerUnlocked && (
          <section className="bg-white/96 py-20 backdrop-blur-[2px] md:py-24">
            <Container>
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
                  {LIVE_PAGE_DATA.valueTitle}
                </h2>

                <p className="mt-5 text-xl leading-relaxed text-slate-700 md:text-2xl">
                  {LIVE_PAGE_DATA.valueSubtitle}
                </p>

                <div className="mt-10 rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-[0_20px_60px_rgba(15,23,42,0.24)]">
                  <p className="text-5xl font-black text-[#ff8cae] md:text-7xl">
                    {LIVE_PAGE_DATA.price} {LIVE_PAGE_DATA.priceCurrency}
                  </p>

                  <div className="mt-8 space-y-3 text-lg text-slate-200 md:text-xl">
                    {LIVE_PAGE_DATA.enrollmentBadges.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        <section className="bg-[#ff5e7a]/96 py-20 text-white backdrop-blur-[2px] md:py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-black leading-tight md:text-5xl">
                {LIVE_PAGE_DATA.urgencyTitle}
              </h2>

              <p className="mt-6 text-xl font-bold leading-relaxed text-red-50 md:text-2xl">
                {LIVE_PAGE_DATA.urgencySubtitle}
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-white/96 py-20 backdrop-blur-[2px] md:py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              {checkoutUnlocked ? (
                <PrimaryButton
                  href={LIVE_PAGE_DATA.paymentUrl}
                  onClick={handleCheckoutClick}
                >
                  {LIVE_PAGE_DATA.paymentLabel}
                </PrimaryButton>
              ) : (
                <div className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-8 py-5 text-center text-lg font-black text-slate-500 md:text-2xl">
                  El boton se mostrara cuando llegue el bloque de cierre
                </div>
              )}
            </div>
          </Container>
        </section>

        <section className="bg-slate-50/96 pb-24 pt-6 backdrop-blur-[2px] md:pb-28">
          <Container>
            <div className="mx-auto max-w-5xl">
              <SurfaceCard className="p-8 md:p-10">
                {LIVE_PAGE_DATA.footerNotes.map((note) => (
                  <p
                    key={note}
                    className="text-lg leading-relaxed text-slate-700 md:text-xl [&:not(:first-child)]:mt-5"
                  >
                    {note}
                  </p>
                ))}
              </SurfaceCard>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
