import { ReformasSalesPageViewTracking } from "./reformas-sales-tracking";

const CHECKOUT_URL = "https://pay.hotmart.com/M108233239C?off=bvhyp9r5&checkoutMode=10";

const outcomes = [
  "Entender qué cambios fiscales pueden influir en tus clientes rumbo a 2027.",
  "Analizar casos concretos y detectar por dónde empezar a revisar.",
  "Evaluar posibles estímulos, como el IVA, con mejor contexto.",
  "Usar inteligencia artificial como apoyo, sin sustituir tu criterio profesional.",
];

const process = [
  ["01", "Cambio", "Identifica qué puede cambiar y qué información ya no basta."],
  ["02", "Criterio", "Entiende cómo aterrizar el impacto en cada cliente."],
  ["03", "Acción", "Define qué revisar y cómo prepararte antes del próximo ejercicio."],
];

function CheckoutButton({ className = "" }: { className?: string }) {
  return (
    <a
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#22e6fa] px-7 py-4 text-center text-sm font-black uppercase tracking-[.08em] text-[#06101a] shadow-[0_12px_28px_rgba(0,0,0,.28)] ring-1 ring-white/25 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_17px_38px_rgba(34,230,250,.42)] sm:text-base ${className}`}
      href={CHECKOUT_URL}
    >
      Inscribirme ahora <span aria-hidden="true">→</span>
    </a>
  );
}

export const metadata = {
  title: "Cambios Fiscales 2027 | Actualización en vivo | CEFIN",
  description: "Prepárate para entender los cambios fiscales rumbo a 2027 y tomar mejores decisiones para tus clientes.",
};

export default function ReformasInscripcionPage() {
  return (
    <main className="overflow-x-hidden bg-[#f5f5ef] text-[#06101a] [font-family:var(--font-reformas-body),Arial,sans-serif]">
      <ReformasSalesPageViewTracking />

      <section className="relative isolate mx-2 mt-2 min-h-[760px] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_76%_24%,rgba(54,202,218,.36),transparent_24%),linear-gradient(118deg,#102939_0%,#0a3a53_47%,#041926_100%)] text-white sm:mx-3 sm:mt-3 sm:min-h-[calc(100svh-24px)] sm:rounded-2xl">
        <div className="pointer-events-none absolute -right-[14%] -top-[25%] h-[58rem] w-[58rem] rounded-full border border-cyan-100/25 shadow-[0_0_105px_35px_rgba(34,230,250,.13),inset_0_0_80px_rgba(34,230,250,.08)]" />
        <header className="relative z-20 flex items-center justify-between gap-3 px-5 py-5 sm:px-10 sm:py-7">
          <a className="font-serif text-4xl tracking-wide" href="/landings/reformas">CEFIN<sup className="ml-1 font-sans text-[.55rem]">®</sup></a>
          <CheckoutButton className="min-h-0 px-4 py-3 text-[.67rem] sm:px-5 sm:text-xs" />
        </header>

        <div className="absolute inset-0 z-10">
          <div className="absolute bottom-7 left-5 z-20 w-[calc(100%-40px)] max-w-[650px] sm:bottom-[clamp(38px,7vw,82px)] sm:left-[clamp(24px,7vw,110px)] sm:w-[min(650px,calc(100%-48px))]">
            <p className="text-[.68rem] font-black uppercase tracking-[.17em] text-[#22e6fa]">Actualización en vivo · Cambios fiscales</p>
            <h1 className="mt-4 [font-family:var(--font-reformas-display),Impact,sans-serif] text-[clamp(2.8rem,13vw,6.2rem)] font-extrabold leading-[.98]">No esperes a que tus clientes pregunten <em className="italic">para prepararte.</em></h1>
            <p className="mt-4 max-w-[570px] text-sm leading-relaxed text-white/90 sm:text-base">Convierte los cambios fiscales rumbo a <strong className="text-[#22e6fa]">2027</strong> en decisiones claras para ti y tus clientes.</p>
            <div className="my-5 flex max-w-[600px] flex-wrap border-y border-white/35">
              {[['24','de noviembre'],['10:00 AM','Hora CDMX'],['En vivo','En línea']].map(([title, detail]) => <div key={title} className="mr-3 grid gap-1 border-r border-white/35 py-3 pr-3 last:border-0 sm:mr-5 sm:pr-5"><b className="text-sm">{title}</b><span className="text-[.68rem] text-white/75">{detail}</span></div>)}
            </div>
            <CheckoutButton className="w-full sm:w-auto" />
            <p className="mt-3 text-[.7rem] text-white/60">Acceso seguro a través de Hotmart.</p>
          </div>
          <p className="absolute left-[7%] top-[12%] z-0 font-serif text-7xl tracking-tighter text-cyan-50/15 sm:left-[18%] sm:top-[18%] sm:text-[clamp(5rem,13vw,12rem)]">2027</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/alfredo.png" alt="Mtro. Alfredo Cobos" className="absolute bottom-[-3%] right-[-25%] z-10 h-[68%] max-w-[128%] object-contain object-bottom brightness-[.47] saturate-[.82] drop-shadow-[-12px_8px_18px_rgba(0,0,0,.55)] sm:right-[clamp(0px,7vw,110px)] sm:h-[96%] sm:max-w-[52%] sm:brightness-100 sm:saturate-100" />
          <div className="absolute bottom-[9%] right-[6vw] z-20 hidden border-l-2 border-[#22e6fa] bg-[#031623]/70 px-5 py-3 backdrop-blur sm:block"><span className="block text-[.65rem] font-black uppercase tracking-[.12em] text-[#22e6fa]">Impartido por</span><strong>Mtro. Alfredo Cobos</strong></div>
        </div>
      </section>

      <section className="px-6 py-24 text-center sm:px-10 sm:py-36">
        <p className="text-xs font-black uppercase tracking-[.17em] text-[#087bdb]">Tu criterio sigue al centro</p>
        <h2 className="mx-auto mt-4 max-w-5xl [font-family:var(--font-reformas-display),Impact,sans-serif] text-[clamp(2.5rem,5vw,5rem)] font-extrabold leading-none">Los cambios fiscales no se resuelven con más ruido. Se resuelven con <span className="text-[#087bdb]">claridad.</span></h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-600">Esta actualización está diseñada para pasar de la incertidumbre a una ruta de análisis útil para tu práctica profesional.</p>
        <CheckoutButton className="mt-8 w-full sm:w-auto" />
      </section>

      <section className="grid gap-12 bg-white px-6 py-20 sm:px-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:px-[max(26px,calc((100%-1120px)/2))] lg:py-28">
        <div><p className="text-xs font-black uppercase tracking-[.17em] text-[#087bdb]">Al terminar tendrás claridad para</p><h2 className="mt-4 [font-family:var(--font-reformas-display),Impact,sans-serif] text-5xl font-extrabold leading-none">Entender qué puede afectar a tus clientes.</h2></div>
        <div className="border-t border-slate-300">{outcomes.map((outcome, index) => <article key={outcome} className="grid grid-cols-[48px_1fr] gap-3 border-b border-slate-300 py-6"><span className="text-xs font-black text-[#087bdb]">0{index + 1}</span><p className="font-extrabold leading-snug">{outcome}</p></article>)}</div>
        <div className="lg:col-span-2"><CheckoutButton className="w-full bg-[#087bdb] text-white ring-0 hover:bg-[#06101a] sm:w-auto" /></div>
      </section>

      <section className="grid gap-12 bg-[#0b2737] px-6 py-20 text-white sm:px-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:px-[max(26px,calc((100%-1120px)/2))] lg:py-28">
        <div><p className="text-xs font-black uppercase tracking-[.17em] text-[#22e6fa]">Una ruta para prepararte</p><h2 className="mt-4 [font-family:var(--font-reformas-display),Impact,sans-serif] text-5xl font-extrabold leading-none">Del cambio fiscal a la decisión profesional.</h2><p className="mt-5 max-w-lg leading-relaxed text-[#c7dbea]">La inteligencia artificial puede apoyar el análisis. Pero las recomendaciones y decisiones siempre parten de tu conocimiento y criterio como contador.</p></div>
        <ol className="grid gap-px bg-cyan-300/25">{process.map(([number, title, text]) => <li key={number} className="bg-[#0b2737] p-7"><span className="text-xs font-black tracking-[.12em] text-[#22e6fa]">{number}</span><h3 className="mt-2 text-2xl font-black">{title}</h3><p className="mt-2 leading-relaxed text-[#c7dbea]">{text}</p></li>)}</ol>
        <div className="lg:col-span-2"><CheckoutButton className="w-full sm:w-auto" /></div>
      </section>

      <section className="grid gap-8 bg-[linear-gradient(120deg,#087bdb,#22e6fa)] px-6 py-20 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:px-[max(26px,calc((100%-1120px)/2))]">
        <div><p className="text-xs font-black uppercase tracking-[.17em] text-[#073a60]">Actualización Cambios Fiscales 2027</p><h2 className="mt-4 max-w-4xl [font-family:var(--font-reformas-display),Impact,sans-serif] text-[clamp(2.7rem,5vw,5rem)] font-extrabold leading-none">Prepárate hoy para responder con seguridad mañana.</h2><p className="mt-5 max-w-2xl leading-relaxed text-[#073a60]">Deja de esperar a que llegue la duda del cliente. Ten un marco claro para analizarla y actuar.</p></div>
        <CheckoutButton className="w-full bg-[#06101a] text-white hover:bg-white hover:text-[#06101a] lg:w-auto" />
      </section>

      <footer className="bg-[#06101a] px-6 py-6 text-center text-xs text-[#9fb6c5]">CEFIN · Formación que se convierte en criterio profesional.</footer>
    </main>
  );
}
