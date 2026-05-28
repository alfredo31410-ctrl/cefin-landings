"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  META_CURRENCY,
  trackMetaEvent,
} from "@/lib/meta-pixel";

/*
  LINK DE WHATSAPP
  --------------------------------------------------
  Aquí va el enlace final del grupo de WhatsApp.

  Ejemplo:
  const WHATSAPP_URL = "https://chat.whatsapp.com/XXXXXXXXXXXX";

  Mientras esté vacío, el botón se verá, pero no abrirá ningún enlace.
*/
const WHATSAPP_URL = "https://chat.whatsapp.com/JHvz3iFmBB2FPOTrquktas";

/*
  BASE DE ASSETS
  --------------------------------------------------
  En producción usa la URL de Vercel.
  En local usa rutas relativas desde /public.

  Esto permite que:
  - En localhost cargue desde /agapes/banner_gracias.png
  - En producción cargue desde la URL pública de Vercel
*/
const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";

/*
  IMAGEN DE FONDO DE LA PÁGINA DE GRACIAS
  --------------------------------------------------
  Este archivo debe existir en:
  public/agapes/banner_gracias.png

  Si después quieres cambiar la imagen, solo cambia el nombre aquí.
*/
const BANNER_IMAGE_URL = `${ASSET_BASE}/agapes/banner_gracias.png`;

export default function GraciasAgapesPage() {
  /*
    EVENTO AL CARGAR LA PÁGINA
    --------------------------------------------------
    Cambia el título de la pestaña y dispara el evento
    de registro completado para Meta Pixel.
  */
  useEffect(() => {
    document.title = "Registro completado | AGAPES | CEFIN";

    trackMetaEvent("CompleteRegistration", {
      content_name: "AGAPES | Registro completado",
      content_category: "Clase gratuita",
      status: "completed",
      value: 0,
      currency: META_CURRENCY,
    });
  }, []);

  /*
    CLICK EN BOTÓN DE WHATSAPP
    --------------------------------------------------
    Este handler registra el evento Lead y después abre
    el grupo de WhatsApp si WHATSAPP_URL ya tiene enlace.
  */
  const handleWhatsAppClick = () => {
    trackMetaEvent("Lead", {
      content_name: "AGAPES | Click grupo WhatsApp",
      content_category: "Grupo de WhatsApp",
      status: "whatsapp_group_click",
      value: 0,
      currency: META_CURRENCY,
    });

    if (!WHATSAPP_URL) return;

    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* SCRIPT DE META PIXEL */}
      <Script
        id="meta-pixel-agapes-thankyou"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }}
      />

      {/* FALLBACK NOSCRIPT PARA META PIXEL */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={getMetaPixelNoscriptUrl()}
          alt=""
        />
      </noscript>

  {/*
  CONTENEDOR GENERAL
  --------------------------------------------------
  min-h-screen:
  - Permite que la página mida al menos toda la pantalla.
  - Si el contenido crece en móvil, permite scroll natural.

  overflow-x-hidden:
  - Evita scroll lateral por capas absolutas o brillos decorativos.
  - No bloquea el scroll vertical.
*/}
<main className="relative min-h-screen overflow-x-hidden bg-[#06110d] text-white">        {/*
          CAPAS DE FONDO
          --------------------------------------------------
          Todo este bloque es decorativo.
          pointer-events-none evita que el fondo interfiera con clicks.
        */}
        <div className="pointer-events-none absolute inset-0">
          {/*
            FONDO PARA MOBILE
            --------------------------------------------------
            Esta capa solo aparece en pantallas pequeñas.

            Objetivo:
            - Que Alfredo quede centrado arriba.
            - Que se vea como fondo.
            - Que el texto no le tape la cara.

            Ajustes rápidos:
            - backgroundPosition: "center top"
              Si la cara queda muy arriba, usa "center 8%" o "center 12%".
            - opacity-90
              Si se ve muy fuerte, baja a opacity-80.
              Si se pierde, sube a opacity-100.
          */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat opacity-90 md:hidden"
            style={{
              backgroundImage: `url("${BANNER_IMAGE_URL}")`,
              backgroundPosition: "center top",
            }}
          />

          {/*
            FONDO PARA DESKTOP
            --------------------------------------------------
            Esta capa aparece desde tablet/desktop.

            Objetivo:
            - Mantener el fondo elegante.
            - Dejar el contenido legible del lado izquierdo.
            - No perder la imagen de fondo.

            backgroundPosition:
            - "left center" funciona si Alfredo está más hacia la izquierda.
            - Si lo quieres más centrado en desktop, prueba "center center".
          */}
          <div
            className="absolute inset-0 hidden bg-cover bg-no-repeat opacity-95 md:block"
            style={{
              backgroundImage: `url("${BANNER_IMAGE_URL}")`,
              backgroundPosition: "left center",
            }}
          />

          {/*
            OVERLAY MOBILE
            --------------------------------------------------
            Este degradado va de arriba hacia abajo.

            Objetivo:
            - Arriba deja ver mejor a Alfredo.
            - Abajo oscurece para que el texto y el botón se lean bien.

            Si Alfredo se ve muy oscuro:
            baja 0.18 y 0.40.

            Si el texto se pierde:
            sube 0.70 y 0.94.
          */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,32,24,0.18)_0%,rgba(4,32,24,0.28)_28%,rgba(4,32,24,0.70)_58%,rgba(4,32,24,0.94)_100%)] md:hidden" />

          {/*
            OVERLAY DESKTOP
            --------------------------------------------------
            Este degradado va de izquierda a derecha.

            Objetivo:
            - Izquierda más oscura para proteger el texto.
            - Derecha más clara para que el fondo respire.

            Si quieres que el fondo se vea más:
            baja los valores 0.88, 0.68 y 0.32.

            Si quieres más lectura:
            sube los valores de la izquierda.
          */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(4,32,24,0.88)_0%,rgba(4,32,24,0.68)_36%,rgba(4,32,24,0.32)_68%,rgba(4,32,24,0.14)_100%)] md:block" />

          {/*
            SOMBRA INFERIOR GENERAL
            --------------------------------------------------
            Ayuda a que el cierre visual del hero no se vea cortado.
          */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,17,13,0)_0%,rgba(6,17,13,0.18)_60%,#06110d_100%)]" />

          {/*
            RESPLANDOR DECORATIVO
            --------------------------------------------------
            Es la luz verde/neón que da profundidad visual.
            Puedes moverlo cambiando left/top/right.

            Para apagarlo:
            cambia bg-lime-400/14 a bg-lime-400/8.
          */}
          <div className="absolute left-[-8%] top-[15%] h-[300px] w-[300px] rounded-full bg-lime-400/14 blur-[110px]" />
        </div>

        {/*
          CONTENIDO
          --------------------------------------------------
          Este bloque contiene todo el texto y CTA.

          Mobile:
          - pt-[300px] baja el contenido para que no tape la cara de Alfredo.
          - Si todavía tapa la cara, sube a pt-[330px] o pt-[360px].
          - Si queda demasiado espacio, baja a pt-[260px].

          Desktop:
          - md:pt-12 regresa el contenido a una posición normal.
          - lg:items-center centra verticalmente.
        */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-start px-6 pb-12 pt-[300px] md:items-center md:px-8 md:py-12 lg:px-10">
          {/*
            COLUMNA DE TEXTO
            --------------------------------------------------
            max-w-3xl limita el ancho para que el texto sea cómodo.
          */}
          <div className="w-full max-w-3xl">
            {/*
              ETIQUETA SUPERIOR
              --------------------------------------------------
              Pequeño indicador de progreso.
            */}
            <div className="inline-flex rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-lime-300">
              Registro 80% completado
            </div>

            {/*
              TÍTULO PRINCIPAL
              --------------------------------------------------
              Responsive:
              - Mobile: text-4xl para evitar que se desborde.
              - sm: text-6xl para pantallas medianas.
              - xl: tamaño grande en desktop.

              Si en móvil lo ves muy grande:
              cambia text-4xl por text-3xl.
            */}
            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.35)] sm:text-6xl xl:text-[5.5rem]">
              Falta entrar
              <br />
              al grupo
            </h1>

            {/*
              TEXTO INTRODUCTORIO
            */}
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/86 sm:text-xl">
              Tu registro para la clase gratuita de{" "}
              <span className="font-black text-lime-300">AGAPES</span> ya quedó
              casi listo.
            </p>

            {/*
              TEXTO DE INSTRUCCIÓN
            */}
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
              Para que tu registro quede totalmente completo, entra ahora al
              grupo de WhatsApp. Ahí se comparte el acceso, recordatorios y
              avisos importantes de la sesión.
            </p>

            {/*
  FECHA Y HORA DE LA CLASE
  --------------------------------------------------
  Este bloque refuerza cuándo será la clase después del registro.
  Se coloca antes de la tarjeta principal para que el usuario lo vea
  antes de entrar al grupo de WhatsApp.

  Ajustes rápidos:
  - Si quieres que resalte más, sube bg-lime-300/14 a bg-lime-300/20.
  - Si quieres menos brillo, baja shadow-[...] o cambia border-lime-300/40.
  - Si cambia la fecha, edita únicamente:
    "2 de junio · 11:00 a.m. · Hora CDMX"
*/}
<div className="mt-6 inline-flex w-full flex-col items-center gap-2 rounded-2xl border border-lime-300/40 bg-lime-300/14 px-5 py-4 text-center shadow-[0_0_35px_rgba(190,242,100,0.24)] backdrop-blur-md sm:w-auto sm:flex-row sm:gap-3 sm:px-6">
  <span className="text-xs font-black uppercase tracking-[0.22em] text-lime-200">
    Fecha de la clase
  </span>

  <span className="text-base font-black uppercase tracking-tight text-white sm:text-lg">
    2 de junio · 11:00 a.m. · Hora CDMX
  </span>
</div>

            {/*
              TARJETA PRINCIPAL
              --------------------------------------------------
              Aquí vive la barra de progreso y el botón.
              backdrop-blur ayuda a separar el contenido del fondo.
            */}
            <div className="mt-8 rounded-2xl border border-lime-200/12 bg-white/[0.065] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur sm:p-6">
              {/*
                BLOQUE DE PROGRESO
              */}
              <div className="mb-6 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 p-4">
                <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#6CFF9A]">
                  <span>Registro casi listo</span>
                  <span>80%</span>
                </div>

                <div className="mt-3 h-2 overflow-x-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-[#25D366] shadow-[0_0_22px_rgba(37,211,102,0.75)]" />
                </div>

                <p className="mt-3 text-sm font-bold text-white">
                  El último 20% es entrar al grupo de WhatsApp.
                </p>
              </div>

              {/*
                BOTÓN WHATSAPP
                --------------------------------------------------
                Diseño:
                - bg-lime-400: color principal brillante.
                - shadow: resplandor alrededor.
                - group-hover: activa el brillo que cruza el botón.

                Responsive:
                - w-full en móvil para que sea más fácil tocarlo.
                - sm:w-auto en pantallas más grandes.

                Si lo quieres más verde WhatsApp:
                cambia bg-lime-400 por bg-[#25D366].
              */}
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="group relative inline-flex w-full items-center justify-center overflow-x-hidden rounded-2xl border border-lime-200/70 bg-lime-400 px-8 py-5 text-center text-base font-black uppercase tracking-tight text-[#06110d] shadow-[0_0_35px_rgba(163,255,18,0.50)] transition-all duration-300 hover:scale-[1.03] hover:bg-lime-300 hover:shadow-[0_0_60px_rgba(163,255,18,0.85)] active:scale-[0.98] sm:w-auto sm:text-lg"
              >
                {/*
                  BRILLO ANIMADO DEL BOTÓN
                  --------------------------------------------------
                  Este span crea el efecto de luz al pasar el mouse.
                */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative z-10">
                  Entrar al grupo de WhatsApp
                </span>
              </button>

              {/*
                NOTA DE URGENCIA / IMPORTANCIA
              */}
              <p className="mt-3 text-sm font-semibold text-white/58">
                Sin este paso podrías perder el acceso y los recordatorios.
              </p>
            </div>

            {/*
              BENEFICIOS / RECORDATORIOS
              --------------------------------------------------
              En móvil se apilan.
              En pantallas medianas se acomodan en 3 columnas.
            */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "Te llegarán recordatorios",
                "Recibirás el acceso a la sesión",
                "Evitas perder avisos importantes",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-lime-200/12 bg-white/[0.045] p-4 text-sm font-medium text-white/78 backdrop-blur"
                >
                  <span className="mr-2 text-lime-300">●</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}