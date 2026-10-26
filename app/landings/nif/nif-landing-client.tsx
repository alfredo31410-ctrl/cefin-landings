"use client";

import Image from "next/image";
import Script from "next/script";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  NIF_REGISTRATION_ATTEMPT_STORAGE_KEY,
  NIF_TRAFFIC_SOURCE_STORAGE_KEY,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import styles from "./nif-landing.module.css";

const ACTIVE_CAMPAIGN_FORM_ID = 369;
const FORM_CLASS = "_form_" + ACTIVE_CAMPAIGN_FORM_ID;
const EVENT_DATE = "6 de noviembre";
const EVENT_TIME = "11:00 a. m.";

const learningPoints = [
  {
    number: "01",
    title: "Entiende las NIF sin memorizar definiciones",
    description:
      "Comprende la lógica que hay detrás de las normas para que los conceptos dejen de sentirse abstractos.",
  },
  {
    number: "02",
    title: "Lee la información financiera con criterio",
    description:
      "Conecta las NIF con lo que realmente reflejan las cuentas y los números de una empresa.",
  },
  {
    number: "03",
    title: "Lleva la teoría a casos contables reales",
    description:
      "Aterriza las bases en ejemplos prácticos que puedas reconocer y aplicar en tu trabajo o formación.",
  },
];

const audiencePoints = [
  "Estudias o trabajas en contabilidad y quieres construir bases más sólidas.",
  "Has escuchado hablar de las NIF, pero todavía no sabes cómo conectarlas con la práctica.",
  "Quieres dejar de registrar operaciones en automático y comenzar a entender su lógica.",
  "Buscas explicar la información financiera con mayor seguridad y criterio profesional.",
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="m5 10.5 3.1 3L15 6.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RegistrationButton({
  location,
  className,
  children,
  onOpen,
}: {
  location: string;
  className: string;
  children: React.ReactNode;
  onOpen: (location: string, trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={(event: ReactMouseEvent<HTMLButtonElement>) =>
        onOpen(location, event.currentTarget)
      }
    >
      {children}
    </button>
  );
}

export function NifLandingClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openRegistration = (location: string, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    trackMetaCustomEvent("NifRegistrationOpen", {
      content_name: "ABC de NIF",
      button_location: location,
    });
    setIsModalOpen(true);
  };

  const closeRegistration = () => setIsModalOpen(false);

  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "ABC de NIF",
      content_category: "Clase gratuita en vivo",
      landing_slug: "nif",
    });

    const params = new URLSearchParams(window.location.search);
    const source =
      params.get("src") || params.get("source") || params.get("channel");
    if (source) {
      window.sessionStorage.setItem(
        NIF_TRAFFIC_SOURCE_STORAGE_KEY,
        source.toLowerCase(),
      );
    }

    const revealElements = document.querySelectorAll<HTMLElement>(
      "[data-nif-reveal]",
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) =>
        element.classList.add(styles.isVisible),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.isVisible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    void fetch("/api/nif/registro/intento", {
      method: "POST",
      credentials: "same-origin",
    }).catch(() => undefined);

    const formRoot = document.querySelector<HTMLElement>("." + FORM_CLASS);
    document.getElementById("activecampaign-nif-form")?.remove();
    if (formRoot) formRoot.innerHTML = "";

    const bindForm = () => {
      if (!formRoot) return;

      const form = formRoot.querySelector<HTMLFormElement>("form");
      if (form && !form.dataset.nifBound) {
        form.dataset.nifBound = "true";
        form.addEventListener("submit", () => {
          window.sessionStorage.setItem(
            NIF_REGISTRATION_ATTEMPT_STORAGE_KEY,
            JSON.stringify({ createdAt: Date.now() }),
          );
          trackMetaCustomEvent("NifRegistrationSubmit", {
            content_name: "ABC de NIF",
          });
        });
      }

      const submit = formRoot.querySelector<HTMLButtonElement>(
        "button[type='submit'], ._submit",
      );
      if (submit) submit.textContent = "¡Quiero mi lugar gratis!";
    };

    const observer = new MutationObserver(bindForm);
    if (formRoot) {
      observer.observe(formRoot, { childList: true, subtree: true });
    }

    const script = document.createElement("script");
    script.id = "activecampaign-nif-form";
    script.src =
      "https://cefincapacitacion.activehosted.com/f/embed.php?id=" +
      ACTIVE_CAMPAIGN_FORM_ID;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeRegistration();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      observer.disconnect();
      script.remove();
      window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
    };
  }, [isModalOpen]);

  return (
    <>
      <Script
        id="meta-pixel-nif"
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

      <main className="min-h-screen overflow-x-hidden bg-[#07080b] text-white">
        <div className="relative z-50 border-b border-white/10 bg-[#101117]/95 px-4 py-2.5 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/78 sm:text-xs">
              Clase gratuita en vivo
              <span className="mx-2 text-[#a78bfa]">·</span>
              {EVENT_DATE}
              <span className="hidden sm:inline">
                <span className="mx-2 text-[#a78bfa]">·</span>
                {EVENT_TIME} CDMX
              </span>
            </p>
            <RegistrationButton
              location="announcement"
              onOpen={openRegistration}
              className="shrink-0 rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.06em] text-[#090a0e] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ddd6fe] sm:px-5 sm:text-xs"
            >
              Registrarme
            </RegistrationButton>
          </div>
        </div>

        <section className={"relative isolate overflow-hidden " + styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlowOne} aria-hidden="true" />
          <div className={styles.heroGlowTwo} aria-hidden="true" />

          <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
            <a
              href="#inicio"
              className="text-2xl font-black tracking-[-0.06em] text-white sm:text-3xl"
              aria-label="CEFIN, inicio"
            >
              CEFIN<span className="text-[#8b5cf6]">.</span>
            </a>
            <p className="hidden text-xs font-bold uppercase tracking-[0.18em] text-white/45 sm:block">
              Formación contable que sí se aplica
            </p>
          </nav>

          <div
            id="inicio"
            className="relative z-10 mx-auto grid min-h-[calc(100svh-104px)] max-w-7xl items-center gap-4 px-5 pb-14 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:pb-0"
          >
            <div className={"relative z-20 pt-3 lg:py-16 " + styles.heroCopy}>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/30 bg-[#8b5cf6]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#c4b5fd] sm:text-xs">
                <span className={styles.liveDot} />
                En vivo con el Mtro. Alfredo Cobos
              </p>

              <h1 className="mt-6 max-w-4xl text-[3.7rem] font-black uppercase leading-[0.83] tracking-[-0.075em] sm:text-[6.6rem] lg:text-[7.5rem] xl:text-[9rem]">
                ABC de
                <span className={"block text-transparent " + styles.nifText}>
                  NIF
                </span>
              </h1>

              <p className="mt-6 max-w-[28rem] text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">
                Deja de hacer números a ciegas.
                <span className="block text-white/62">
                  Entiende la lógica y construye bases que sí puedas aplicar.
                </span>
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {[EVENT_DATE, EVENT_TIME + " · CDMX", "100% gratuita"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-white/82 backdrop-blur-md sm:text-sm"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <RegistrationButton
                  location="hero"
                  onOpen={openRegistration}
                  className={"group " + styles.primaryButton}
                >
                  <span>Quiero registrarme gratis</span>
                  <ArrowIcon />
                </RegistrationButton>
                <p className="max-w-[20rem] text-xs font-semibold leading-relaxed text-white/48">
                  Aparta tu lugar y completa tu acceso entrando al grupo oficial
                  de WhatsApp.
                </p>
              </div>
            </div>

            <div
              className={
                "relative z-10 min-h-[25rem] self-end sm:min-h-[35rem] lg:min-h-[43rem] " +
                styles.alfredoStage
              }
            >
              <div className={styles.portraitHalo} aria-hidden="true" />
              <Image
                src="/alfredo.png"
                alt="Mtro. Alfredo Cobos, instructor de la clase ABC de NIF"
                width={800}
                height={800}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className={
                  "absolute bottom-0 left-1/2 z-10 h-auto w-[31rem] max-w-none -translate-x-1/2 object-contain sm:w-[42rem] lg:left-[86%] lg:w-[38rem] xl:left-[88%] xl:w-[41rem] " +
                  styles.alfredoImage
                }
              />
              <div
                className={
                  "absolute bottom-6 left-1/2 z-20 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border border-white/15 bg-[#0c0d12]/75 p-4 shadow-2xl backdrop-blur-xl lg:bottom-12 lg:left-0 lg:translate-x-0 " +
                  styles.instructorCard
                }
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a78bfa]">
                  Tu instructor
                </p>
                <p className="mt-1 text-lg font-black">Mtro. Alfredo Cobos</p>
                <p className="mt-1 text-xs text-white/55">Instructor de CEFIN</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0d0f14]">
          <div className="mx-auto grid max-w-7xl divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">
            {[
              ["01", "Una clase en vivo"],
              ["02", "Explicación desde cero"],
              ["03", "Aplicación contable real"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-4 py-5 sm:px-6">
                <span className="text-sm font-black text-[#8b5cf6]">
                  {number}
                </span>
                <span className="text-xs font-black uppercase tracking-[0.11em] text-white/65 sm:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className={styles.sectionGlow} aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl">
            <div data-nif-reveal className={styles.reveal}>
              <p className={styles.eyebrow}>Lo que vas a aprender</p>
              <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                  Las NIF dejan de ser teoría cuando entiendes su lógica.
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg lg:justify-self-end">
                  Esta clase no busca llenarte de definiciones. Busca darte una
                  estructura clara para comprender qué estás registrando, por
                  qué importa y cómo se conecta con la realidad de una empresa.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {learningPoints.map((point, index) => (
                <article
                  key={point.number}
                  data-nif-reveal
                  className={styles.reveal}
                  style={{ transitionDelay: index * 90 + "ms" }}
                >
                  <div className={styles.learningCard}>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-black tracking-[0.2em] text-[#a78bfa]">
                        {point.number}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/45">
                        <ArrowIcon />
                      </span>
                    </div>
                    <h3 className="mt-12 text-2xl font-black leading-tight tracking-[-0.025em]">
                      {point.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                      {point.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div
            data-nif-reveal
            className={
              "mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#101218] " +
              styles.reveal
            }
          >
            <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative overflow-hidden bg-[#7c3aed] p-8 sm:p-12">
                <div className={styles.audiencePattern} aria-hidden="true" />
                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/65">
                    ¿Esta clase es para ti?
                  </p>
                  <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                    Sí, si quieres dejar de operar en automático.
                  </h2>
                  <p className="mt-6 max-w-md leading-relaxed text-white/72">
                    No necesitas dominar las NIF. Solo traer tus ganas de
                    comprenderlas y llevarlas a la práctica.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 p-6 sm:p-10">
                {audiencePoints.map((point) => (
                  <div
                    key={point}
                    className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4 text-sm font-semibold leading-relaxed text-white/72 transition duration-300 hover:border-[#8b5cf6]/35 hover:bg-white/[0.06] sm:p-5 sm:text-base"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8b5cf6]/15 text-[#c4b5fd]">
                      <CheckIcon />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
          <div
            data-nif-reveal
            className={
              "relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-[#8b5cf6]/25 bg-[linear-gradient(135deg,#171326_0%,#0d0f14_70%)] px-6 py-12 text-center shadow-[0_40px_120px_rgba(67,32,132,0.22)] sm:px-10 sm:py-16 " +
              styles.reveal
            }
          >
            <div className={styles.finalGlow} aria-hidden="true" />
            <div className="relative mx-auto max-w-4xl">
              <p className={styles.eyebrow}>Tu lugar está a un clic</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.96] tracking-[-0.05em] sm:text-6xl">
                Empieza a entender las NIF con claridad y criterio.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg">
                Regístrate gratis para la clase en vivo del {EVENT_DATE} a las{" "}
                {EVENT_TIME}, hora de CDMX.
              </p>
              <RegistrationButton
                location="final"
                onOpen={openRegistration}
                className={"mx-auto mt-8 " + styles.primaryButton}
              >
                <span>Apartar mi lugar gratis</span>
                <ArrowIcon />
              </RegistrationButton>
              <p className="mt-4 text-xs font-semibold text-white/38">
                Paso 1: registra tus datos · Paso 2: entra al grupo de WhatsApp
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-black tracking-[-0.04em] text-white/70">
              CEFIN<span className="text-[#8b5cf6]">.</span>
            </p>
            <p>Formación práctica para profesionales contables.</p>
          </div>
        </footer>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#090a0e]/92 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
          <RegistrationButton
            location="mobile_sticky"
            onOpen={openRegistration}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-black uppercase tracking-[0.04em] text-[#090a0e]"
          >
            Registrarme gratis
            <ArrowIcon />
          </RegistrationButton>
        </div>
      </main>

      {isModalOpen && (
        <div
          className={
            "fixed inset-0 z-[100] flex items-center justify-center bg-[#050609]/88 p-3 backdrop-blur-xl sm:p-5 " +
            styles.modalBackdrop
          }
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeRegistration();
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="nif-modal-title"
            aria-describedby="nif-modal-description"
            className={
              "relative flex max-h-[94svh] w-full max-w-[560px] flex-col overflow-hidden rounded-[1.8rem] border border-white/12 bg-[#f7f7f4] text-[#141619] shadow-[0_40px_140px_rgba(0,0,0,0.7)] " +
              styles.modalPanel
            }
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeRegistration}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-black/[0.04] text-xl font-medium text-black/55 transition hover:bg-black/[0.08] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c3aed]"
              aria-label="Cerrar formulario de registro"
            >
              ×
            </button>

            <div className="shrink-0 border-b border-black/8 px-6 pb-5 pt-7 sm:px-9 sm:pb-6 sm:pt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#6d28d9]">
                Registro gratuito · Paso 1 de 2
              </p>
              <h2
                id="nif-modal-title"
                className="mt-2 pr-10 text-3xl font-black tracking-[-0.04em]"
              >
                Aparta tu lugar en ABC de NIF
              </h2>
              <p
                id="nif-modal-description"
                className="mt-2 text-sm leading-relaxed text-black/55"
              >
                Completa tus datos. Después te llevaremos al grupo oficial de
                WhatsApp para terminar tu acceso.
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-9 sm:py-7">
              <div
                className={
                  styles.formShell + " " + FORM_CLASS + " min-h-[420px]"
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
