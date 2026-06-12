import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

//INFORMACION COMERCIAL DEL PRODUCTO
const PRICE = 297;
const CHECKOUT_URL = "";

//IMG PRINCIPAL DEL PRODUCTO
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "hhttps://cefin-landings-z9uk.vercel.app"
    : "";

const ALFREDO_IMAGE_URL = `${ASSET_BASE}/honorarios-contables/alfredo-honorarios-contables.png`;

export default function HonorariosContablesPage() {
  //REGISTRA LA VISITA A LA LANDING EN META PIXEL
  useEffect(() => {
    document.title = "Honorarios Contables | CEFIN";

    trackMetaEvent("ViewContent", {
      content_name: "Honorarios Contables",
      content_category: "Cobro Profesional / Honorarios",
      value: PRICE,
      currency: META_CURRENCY,
    });
  }, []);
  // REGISTRA LA INTENCION DE COMPRA ANTES DE ABRIR EL CHECKOUT
  const handleCheckout = () => {
    trackMetaEvent("initiateCheckout", {
      content_name: "Honorarios Contables",
      content_category: "Guia práctica / low ticket evergreen",
      value: PRICE,
      currency: META_CURRENCY,
    });
  };

  return (
    <>
      {/*META PIXEL*/}
      <Script
        id="meta-pixel-honorario-contables"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelNoscriptUrl() }}
      />

      <noscript>
        <img height="1" src={getMetaPixelNoscriptUrl()} alt="" width="1" />
      </noscript>

      <main className="main-h-screen overflow-x-hidden bg-[#041532] text-white">
        {/*CONSTRUCCION DE SECCIONES*/}

        {/* Hero principal */}
        <section className="relative isolate min-h-svh overflow-hidden">
          {/* Fondo azul */}
          <div className="absolute inset-0 -z-30 bg-[linear-gradient(120deg,#031027_0%,#062655_52%,#031332_100%)]" />

          {/* Cuadrícula decorativa */}
          <div className="absolute inset-0 -z-20 opacity-20 [background-image:linear-gradient(rgba(58,220,224,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(58,220,224,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />

          {/* Resplandor detrás de Alfredo */}
          <div className="absolute right-[5%] top-[16%] -z-10 h-[440px] w-[440px] rounded-full bg-[#16cbd1]/15 blur-[130px]" />

          <div className="mx-auto flex min-h-svh max-w-[1280px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-10">
            {/* Encabezado */}
            <header className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-black tracking-normal sm:text-3xl">
                  CEFIN
                </p>

                <p className="mt-1 hidden text-xs leading-tight text-white/55 sm:block">
                  Formación que transforma
                  <br />
                  tu práctica contable
                </p>
              </div>

              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#4ce0dc] px-5 text-xs font-black uppercase text-[#031027] transition hover:-translate-y-0.5 hover:bg-[#70f0eb]"
              >
                Quiero inscribirme
              </a>
            </header>

            {/* Contenido principal */}
            <div className="grid flex-1 items-center gap-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-4">
              {/* Información comercial */}
              <div className="order-1 text-center lg:text-left">
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  <span className="rounded-full border border-[#4ce0dc]/60 bg-[#4ce0dc]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/80 sm:text-xs">
                    Cobro profesional
                    <span className="text-[#4ce0dc]"> / Honorarios</span>
                  </span>

                  <span className="rounded-full border border-[#4ce0dc]/60 bg-[#4ce0dc]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/80 sm:text-xs">
                    Guía práctica
                    <span className="text-[#4ce0dc]">
                      {" "}
                      / Low ticket evergreen
                    </span>
                  </span>
                </div>

                <h1 className="mt-6 text-[clamp(3.4rem,7vw,6.8rem)] font-black uppercase leading-[0.84] tracking-normal">
                  Honorarios
                  <span className="mt-3 block text-[#4ce0dc]">Contables</span>
                </h1>

                <p className="mt-6 text-xl font-black uppercase sm:text-2xl">
                  Aprende a cotizar y cobrar sin miedo
                </p>

                <p className="mx-auto mt-3 max-w-[650px] text-lg leading-relaxed text-white/70 lg:mx-0">
                  Calcula, presenta y defiende tus honorarios contables con
                  mayor seguridad.
                </p>

                {/* Oferta */}
                <div className="mx-auto mt-7 max-w-[630px] border border-[#4ce0dc]/60 bg-[#020a1b]/55 p-5 text-left backdrop-blur-md lg:mx-0">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="sm:border-r sm:border-white/15 sm:pr-7">
                      <p className="text-4xl font-black text-[#4ce0dc]">
                        $297
                        <span className="ml-2 text-lg text-white">MXN</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-white/55">Impartido por el</p>

                      <p className="text-lg font-black">Mtro. Alfredo Cobos</p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-lg leading-relaxed text-white/72">
                    Guía práctica para calcular y presentar tus honorarios
                    contables con mayor seguridad.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={CHECKOUT_URL}
                      onClick={handleCheckout}
                      className="inline-flex min-h-14 flex-1 items-center justify-center rounded-md bg-[#4ce0dc] px-6 text-sm font-black uppercase text-[#031027] transition hover:-translate-y-1 hover:bg-[#70f0eb]"
                    >
                      Quiero inscribirme ahora
                      <span className="ml-3 text-xl">→</span>
                    </a>

                    <a
                      href="#contenido"
                      className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/40 px-7 text-sm font-black uppercase transition hover:border-[#4ce0dc] hover:text-[#4ce0dc]"
                    >
                      Ver contenido
                    </a>
                  </div>
                </div>
              </div>

              {/* Fotografía de Alfredo */}
              <div className="relative order-2 mx-auto h-[440px] w-full max-w-[570px] self-end sm:h-[590px] lg:h-[720px]">
                <div className="absolute bottom-[12%] left-1/2 h-[65%] w-[75%] -translate-x-1/2 border border-[#4ce0dc]/20 bg-[#0875bb]/10" />

                <img
                  src={ALFREDO_IMAGE_URL}
                  alt="Mtro. Alfredo Cobos"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_30px_55px_rgba(0,0,0,0.7)] [mask-image:linear-gradient(to_bottom,black_0%,black_91%,transparent_100%)]"
                />
              </div>
            </div>

            {/* Beneficios rápidos */}
            <div className="grid border border-[#4ce0dc]/30 bg-[#031333]/80 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Seguridad", "Más confianza al cotizar y cobrar."],
                ["Práctico", "Método claro y accionable."],
                ["Directo", "Contenido útil, sin rodeos."],
                ["Rentable", "Mejores ingresos y mayor valor."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="border-b border-[#4ce0dc]/20 px-6 py-5 sm:border-r"
                >
                  <p className="font-black text-[#4ce0dc]">{title}</p>

                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
