"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getMetaPixelNoscriptUrl,
  getMetaPixelScript,
  trackMetaEvent,
} from "@/lib/meta-pixel";

const CHECKOUT_URL =
  "https://pay.hotmart.com/V106566733D?off=mxynkrmw&checkoutMode=10";
const PRICE = "$9,987";
const VALUE = "$42,447";

const agents = [
  ["Fiscalathor IA", "Consultor fiscal para dudas, obligaciones, regímenes, criterios y revisión de casos."],
  ["Norma IA", "Consultor contable especializado en NIF, registros, estados financieros y criterio contable."],
  ["Contadora Estratégica IA", "Apoyo para RESICO, médicos, contabilidad electrónica, cobro, propuestas y crecimiento."],
  ["Agente Consultor de Nómina", "Apoyo para la toma de decisiones de nómina y procesos laborales."],
  ["Asesor Empresarial CEFIN", "Visión empresarial para tomar decisiones de crecimiento en tu despacho contable."],
];

const bonuses = [
  ["BONO #1", "Flujos Contables y Fiscales con ChatGPT Work", "En vivo · 03 y 04 de septiembre", "$1,987 MXN"],
  ["BONO #2", "Agentes Contables y Fiscales con Claude", "En vivo · 12 y 13 de noviembre", "$1,987 MXN"],
  ["BONO #3", "Incubadora de Despachos Contables", "Acompañamiento para estructurar y fortalecer tu despacho", "$4,787 MXN"],
  ["BONO #4", "Rompe tus Techos Mentales", "Desarrolla la mentalidad que te llevará al siguiente nivel", "$1,987 MXN"],
  ["BONO #5", "6 meses de Sesiones en Vivo del Factor CEFIN", "Todos los lunes a las 11:00 AM · 24 sesiones", "$7,764 MXN"],
];

const workshopItems = [
  "Fundamentos de IA para contadores",
  "Configuración de ChatGPT como auxiliar contable",
  "Creación de prompts profesionales",
  "Procesamiento de XML y CFDI",
  "Generación de papeles de trabajo",
  "Análisis de información contable y fiscal",
  "Creación de reportes, revisión de errores y validación",
  "Aplicación conjunta de IA y Excel",
];

const audience = [
  "Contadores, asesores fiscales y dueños de despacho",
  "Profesionales que quieren aplicar IA sin conocimientos técnicos",
  "Personas que buscan reducir tiempo en tareas operativas",
  "Quienes desean mejorar sus análisis, reportes y procesos",
  "Profesionales que quieren crecer su despacho con metodología",
];

function CheckoutButton({ label = "QUIERO ACCEDER AHORA" }: { label?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      onClick={() => trackMetaEvent("InitiateCheckout", { content_name: "EstrategIA CEFIN", value: 9987, currency: "MXN" })}
      className="cta-shine inline-flex min-h-14 items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300 px-7 py-4 text-center text-sm font-black uppercase text-white shadow-[0_0_35px_rgba(34,211,238,.38)] transition hover:-translate-y-1 hover:brightness-110 sm:text-base"
    >
      {label}<span className="text-2xl leading-none">→</span>
    </a>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return <li className="flex gap-3 text-sm leading-relaxed text-slate-300"><span className="font-black text-cyan-300">✓</span><span>{children}</span></li>;
}

export default function EcosistemaPage() {
  useEffect(() => {
    document.title = "EstrategIA CEFIN | Evolución Contable con Inteligencia Artificial";
    trackMetaEvent("ViewContent", { content_name: "EstrategIA CEFIN", content_category: "Ecosistema IA", value: 9987, currency: "MXN" });
  }, []);

  useEffect(() => {
    const decoder = document.createElement("textarea");
    const walker = document.createTreeWalker(
      document.querySelector("main") ?? document.body,
      NodeFilter.SHOW_TEXT,
    );
    const textNodes: Text[] = [];
    let node: Node | null;

    while ((node = walker.nextNode())) {
      if (node.textContent?.includes("&")) textNodes.push(node as Text);
    }

    textNodes.forEach((textNode) => {
      decoder.innerHTML = textNode.textContent ?? "";
      textNode.textContent = decoder.value;
    });

    const conciseAnswers = [
      "No. Est&aacute; pensado para contadores y no requiere programar.",
      "Taller, cinco agentes CEFIN y cinco bonos exclusivos.",
      "Un a&ntilde;o para talleres y bonos; acceso vitalicio para los agentes.",
      "Hotmart confirma tu compra y te env&iacute;a las instrucciones de acceso.",
    ];

    document.querySelectorAll("main details").forEach((detail, index) => {
      if (index >= conciseAnswers.length) {
        detail.remove();
        return;
      }

      const answer = detail.querySelector("p");
      if (answer) {
        decoder.innerHTML = conciseAnswers[index];
        answer.textContent = decoder.value;
      }
    });
  }, []);

  return (
    <>
      <Script id="meta-pixel-estrategia" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: getMetaPixelScript() }} />
      <noscript><img height="1" width="1" style={{ display: "none" }} src={getMetaPixelNoscriptUrl()} alt="" /></noscript>

      <main className="min-h-screen overflow-x-hidden bg-[#02040a] text-white">
        <header className="border-b border-cyan-400/15 bg-[#020812]/90 px-4 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <div className="flex items-center gap-3"><span className="text-3xl font-black tracking-tight">CEFI<span className="text-red-500">N</span></span><span className="hidden border-l border-white/20 pl-3 text-[10px] leading-tight text-slate-300 sm:block">Centro de Estudios Fiscales,<br />Innovación y Negocios</span></div>
            <div className="hidden items-center gap-7 text-xs font-bold text-slate-300 md:flex"><span>▣ Acceso por 1 año a la formación</span><span className="text-cyan-300">◎ Acceso vitalicio a los agentes de IA</span></div>
            <a href={CHECKOUT_URL} className="rounded-lg bg-lime-300 px-4 py-2 text-xs font-black uppercase text-black transition hover:bg-lime-200">Acceso inmediato</a>
          </div>
        </header>

        <section className="hero-grid relative overflow-hidden px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(0,119,255,.25),transparent_33%),linear-gradient(110deg,#02040a,#06152b_60%,#02040a)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr_.72fr]">
            <div>
              <p className="eyebrow">ECOSISTEMA DE INTELIGENCIA ARTIFICIAL PARA CONTADORES</p>
              <h1 className="mt-5 text-4xl font-black leading-[.95] sm:text-6xl lg:text-7xl">Convierte la<br />Inteligencia Artificial<br />en tu nueva <span className="text-cyan-300">ventaja</span><br /><span className="gradient-text">profesional</span></h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">Domina la IA y Excel aplicados al trabajo contable, utiliza agentes especializados para resolver situaciones fiscales y financieras, y fortalece tu despacho con acompañamiento estratégico.</p>
              <div className="mt-7 grid grid-cols-2 gap-3 text-xs font-bold text-slate-300 sm:grid-cols-4"><span>♧ Taller completo</span><span>♙ 5 agentes especializados</span><span>♧ Talleres en vivo</span><span>◉ Bonos estratégicos</span></div>
              <div className="mt-8"><CheckoutButton label="QUIERO INCORPORAR IA A MI PRÁCTICA" /></div>
              <p className="mt-4 text-xs text-slate-400">◉ Pago seguro procesado por Hotmart · Acceso inmediato a los contenidos</p>
            </div>

            <div className="relative hidden min-h-[460px] lg:block"><div className="absolute inset-8 rounded-full border border-cyan-300/30 shadow-[0_0_80px_rgba(0,174,255,.3)]" /><div className="absolute inset-20 flex items-center justify-center rounded-full border border-blue-400/40 bg-[#031326]/75 text-center shadow-[0_0_50px_rgba(0,174,255,.35)]"><div><p className="text-3xl font-black text-white">EstrategIA<br /><span className="text-cyan-300">CEFIN</span></p><p className="mt-2 text-sm text-slate-300">Evolución contable<br />con inteligencia artificial</p></div></div><div className="absolute left-0 top-1/2 rounded-xl border border-cyan-400/50 bg-[#031326]/90 px-4 py-4 text-center text-xs font-black text-cyan-200">◉<br />AGENTES<br />ESPECIALIZADOS</div><div className="absolute right-0 top-1/4 rounded-xl border border-cyan-400/50 bg-[#031326]/90 px-4 py-4 text-center text-xs font-black text-cyan-200">▣<br />BONOS<br />ESTRATÉGICOS</div><div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl border border-cyan-400/50 bg-[#031326]/90 px-5 py-3 text-center text-xs font-black text-cyan-200">♙ ACOMPAÑAMIENTO<br />Y CRECIMIENTO</div></div>

            <aside className="relative rounded-2xl border border-cyan-400/45 bg-[#031326]/80 p-6 shadow-[0_0_45px_rgba(0,174,255,.18)] backdrop-blur-xl"><p className="text-center text-xs text-slate-400">Valor total de la experiencia:</p><p className="mt-1 text-center text-3xl font-black text-slate-400 line-through">{VALUE} <small className="text-base no-underline">MXN</small></p><div className="my-5 border-t border-white/10 pt-4 text-center"><p className="text-xs font-bold">HOY PUEDES ACCEDER POR:</p><p className="mt-2 text-5xl font-black text-cyan-300">{PRICE}</p><p className="font-black text-lime-300">MXN</p></div><CheckoutButton label="ACCESO INMEDIATO" /><ul className="mt-5 space-y-3"><Check>Acceso por 1 año al taller principal y talleres incluidos</Check><Check>Acceso vitalicio a los agentes de IA</Check><Check>Participación en sesiones y actividades especializadas</Check><Check>Pago 100% seguro con Hotmart</Check></ul></aside>
          </div>
        </section>

        <section className="border-y border-cyan-400/15 bg-[#030b18] px-4 py-14 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.75fr_1.1fr_1fr]"><div className="hidden h-64 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#06152b] sm:block"><img src="/alfredo.png" alt="Instructor CEFIN" className="h-full w-full object-contain object-bottom" /></div><div><p className="eyebrow">El cambio profesional</p><h2 className="mt-3 text-3xl font-black">La IA no reemplazará al contador.<br /><span className="text-cyan-300">Pero sí cambiará la forma de trabajar.</span></h2><p className="mt-4 leading-7 text-slate-300">Mientras algunos profesionales siguen realizando manualmente procesos repetitivos, tú podrás revisar información, estructurar reportes, analizar casos y responder con mayor rapidez.</p></div><div className="overflow-hidden rounded-xl border border-cyan-400/30"><div className="grid grid-cols-2 bg-[#0b1930] text-center text-xs font-black"><div className="p-3">ANTES</div><div className="bg-cyan-400/20 p-3 text-cyan-300">CON ESTRATEGIA CEFIN</div></div>{[["Prompts improvisados","Instrucciones profesionales"],["Procesos manuales","Flujos apoyados por IA y Excel"],["Herramientas generales","Agentes especializados"],["Información dispersa","Un ecosistema integrado"],["Más tiempo operativo","Mayor capacidad de análisis"]].map(([a,b])=><div key={a} className="grid grid-cols-2 border-t border-white/10 text-xs"><div className="p-3 text-slate-400">› {a}</div><div className="p-3 text-cyan-300">» {b}</div></div>)}</div></div></section>

        <section className="px-4 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="La formación completa" title={<>¿Qué incluye <span>EstrategIA CEFIN</span>?</>} /><div className="grid gap-5 lg:grid-cols-2"><article className="glow-card"><div className="number">1</div><h3 className="card-title">TALLER DE INTELIGENCIA ARTIFICIAL Y EXCEL PARA CONTADORES</h3><p className="mt-4 text-sm text-slate-300">La formación base donde aprenderás a usar herramientas de IA y Excel aplicadas al trabajo real del contador.</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{workshopItems.map((item)=><Check key={item}>{item}</Check>)}</ul></article><article className="glow-card"><div className="number">2</div><h3 className="card-title">SUITE DE AGENTES DE INTELIGENCIA ARTIFICIAL CEFIN</h3><p className="mt-4 text-sm text-slate-300">Asistentes especializados creados por CEFIN para acompañarte en distintas áreas de tu práctica profesional.</p><div className="mt-5 space-y-4">{agents.map(([name,description])=><div key={name} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">◉</span><p className="text-sm leading-5"><strong className="text-cyan-300">{name}</strong><br /><span className="text-slate-400">{description}</span></p></div>)}</div></article></div></div></section>

        <section className="bg-[#030b18] px-4 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Valor adicional incluido" title={<>BONOS <span>ESTRATÉGICOS</span> INCLUIDOS</>} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{bonuses.map(([tag,title,detail,value])=><article key={tag} className="bonus-card"><span className="bonus-tag">{tag}</span><div className="mt-5 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-blue-950 to-cyan-900/40 text-4xl text-cyan-300">✦</div><h3 className="mt-5 min-h-16 text-center text-sm font-black text-white">{title}</h3><p className="mt-3 min-h-12 text-center text-xs leading-5 text-slate-400">{detail}</p><p className="mt-4 text-center text-sm font-black text-lime-300">Valor comercial<br />{value}</p></article>)}</div></div></section>

        <section className="px-4 py-16 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1fr_1fr]"><article className="glow-card"><p className="eyebrow">Resumen de inversión</p><div className="mt-5 space-y-3 text-sm">{[["Suite de 5 Agentes CEFIN","$23,935 MXN"],["Flujos con ChatGPT Work","$1,987 MXN"],["Agentes con Claude","$1,987 MXN"],["Incubadora de Despachos","$4,787 MXN"],["Rompe tus Techos Mentales","$1,987 MXN"],["Sesiones Factor CEFIN","$7,764 MXN"]].map(([a,b])=><div key={a} className="flex justify-between gap-3 border-b border-white/10 pb-2 text-slate-400"><span>{a}</span><span className="whitespace-nowrap text-slate-200">{b}</span></div>)}</div><div className="mt-5 flex justify-between font-black text-cyan-300"><span>VALOR TOTAL</span><span>{VALUE} MXN</span></div></article><article className="glow-card flex flex-col items-center justify-center text-center"><p className="eyebrow">Tu inversión hoy</p><p className="mt-3 text-6xl font-black text-cyan-300">{PRICE}</p><p className="font-black text-lime-300">MXN</p><CheckoutButton label="ACCESO INMEDIATO" /><p className="mt-4 text-xs text-slate-400">Formas de pago seguras · Pago procesado por Hotmart</p></article><article className="glow-card"><p className="eyebrow">Tu tranquilidad</p><h3 className="mt-5 text-2xl font-black text-cyan-300">GARANTÍA CEFIN</h3><p className="mt-4 leading-7 text-slate-300">Tu satisfacción es nuestra prioridad. Si en los primeros 7 días el contenido no cumple tus expectativas, solicita tu reembolso.</p><div className="mt-6 text-center text-3xl font-black text-white">♢ <span className="block text-sm text-lime-300">7 DÍAS DE GARANTÍA</span></div></article></div></section>

        <section className="bg-[#030b18] px-4 py-16 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_.9fr_1fr]"><article className="glow-card"><p className="eyebrow">¿Es para ti?</p><h2 className="mt-4 text-2xl font-black">¿PARA QUIÉN ES ESTRATEGIA CEFIN?</h2><ul className="mt-6 space-y-4">{audience.map((item)=><Check key={item}>{item}</Check>)}</ul><div className="mt-7 rounded-lg border border-white/10 bg-black/20 p-4"><p className="text-sm font-black text-cyan-300">NO ES PARA TI SI...</p><p className="mt-3 text-sm leading-6 text-slate-400">Buscas que la IA tome decisiones por ti o genere resultados automáticos sin revisar ni validar.</p></div></article><article className="glow-card"><p className="eyebrow">Instructor</p><img src="/alfredo.png" alt="Alfredo Cobos" className="mx-auto mt-4 h-48 object-contain" /><h3 className="text-center text-xl font-black text-cyan-300">Alfredo Cobos</h3><p className="mt-3 text-sm leading-6 text-slate-400">Contador, conferencista y mentor con más de 20 años de experiencia en el área contable y fiscal. Fundador de CEFIN y creador de metodologías prácticas para profesionales.</p></article><article className="glow-card"><p className="eyebrow">Prueba social</p><h2 className="mt-4 text-2xl font-black">LO QUE DICEN NUESTROS ALUMNOS</h2>{["EstrategIA CEFIN me ayudó a automatizar procesos que me tomaban horas.","Los agentes son increíbles, me apoyan todos los días en mi trabajo."].map((quote,i)=><div key={quote} className="mt-5 rounded-xl border border-cyan-400/25 bg-black/25 p-5"><p className="text-sm italic leading-6 text-slate-300">“{quote}”</p><p className="mt-3 text-yellow-300">★★★★★</p><p className="mt-2 text-xs font-bold text-slate-500">{i===0?"María G. · Contadora Pública":"Javier R. · Asesor Fiscal"}</p></div>)}</article></div></section>

        <section className="border-t border-cyan-400/25 bg-gradient-to-r from-[#06152b] via-[#02040a] to-[#06152b] px-4 py-12 text-center sm:px-8"><p className="eyebrow">El siguiente paso</p><h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black sm:text-5xl">Da el siguiente paso en tu <span className="text-cyan-300">evolución profesional</span></h2><p className="mx-auto mt-4 max-w-2xl text-slate-400">Incorpora inteligencia artificial a tu práctica contable y trabaja con más estrategia, orden y seguridad.</p><div className="mt-7"><CheckoutButton /></div></section>

        <footer className="border-t border-white/10 bg-[#02040a] px-4 py-6 text-center text-xs text-slate-500">CEFIN · Ecosistema de Inteligencia Artificial para Contadores</footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          .hero-grid { background-image: url('/ia-contadores/ecosistema-hero.png'),linear-gradient(rgba(34,211,238,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.06) 1px,transparent 1px); background-position: right center, 0 0, 0 0; background-repeat: no-repeat, repeat, repeat; background-size: min(56vw, 820px) auto, 44px 44px, 44px 44px; }
          .hero-grid::before { position:absolute; inset:-18%; pointer-events:none; content:""; z-index:1; opacity:.55; background-image:radial-gradient(circle at 18% 30%,rgba(34,211,238,.22) 0 1px,transparent 2px),radial-gradient(circle at 44% 18%,rgba(163,230,53,.18) 0 1px,transparent 2px),radial-gradient(circle at 72% 70%,rgba(96,165,250,.2) 0 1px,transparent 2px),radial-gradient(ellipse at 28% 65%,rgba(34,211,238,.12),transparent 28%),radial-gradient(ellipse at 78% 35%,rgba(59,130,246,.14),transparent 32%); background-size:170px 150px,230px 190px,260px 220px,100% 100%,100% 100%; filter:blur(.2px); animation:ambient-drift 18s ease-in-out infinite alternate; }
          .hero-grid::after { position:absolute; inset:0; pointer-events:none; content:""; background:linear-gradient(115deg,transparent 20%,rgba(34,211,238,.08) 48%,transparent 72%); transform:translateX(-120%); animation:hero-scan 9s ease-in-out infinite; }
          .hero-grid > div.relative { position:relative; z-index:2; }
          .hero-grid > div { animation:hero-enter .85s cubic-bezier(.2,.8,.2,1) both; }
          .hero-grid aside { animation:price-float 5.5s ease-in-out 1s infinite; }
          .hero-grid .relative.hidden { animation:network-pulse 6s ease-in-out 1.2s infinite; }
          .eyebrow { color:#67e8f9; font-size:.72rem; font-weight:900; letter-spacing:.18em; text-transform:uppercase; }
          .gradient-text { background:linear-gradient(90deg,#22d3ee,#60a5fa,#a3e635); background-clip:text; color:transparent; }
          .glow-card { border:1px solid rgba(56,189,248,.25); border-radius:1rem; background:linear-gradient(145deg,rgba(7,26,49,.82),rgba(2,8,18,.8)); padding:1.5rem; box-shadow:0 0 28px rgba(0,174,255,.06); transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease,background .3s ease; }
          .glow-card:hover { transform:translateY(-5px); border-color:rgba(103,232,249,.55); background:linear-gradient(145deg,rgba(8,36,66,.9),rgba(2,8,18,.86)); box-shadow:0 12px 42px rgba(0,174,255,.16); }
          .number { display:flex; height:2.3rem; width:2.3rem; align-items:center; justify-content:center; border:1px solid #22d3ee; border-radius:.5rem; color:#67e8f9; font-weight:900; }
          .card-title { margin-top:-2rem; padding-left:3.1rem; font-size:1rem; font-weight:900; line-height:1.25; color:#67e8f9; }
          .bonus-card { position:relative; border:1px solid rgba(56,189,248,.35); border-radius:.9rem; background:rgba(2,12,28,.78); padding:1.15rem; padding-top:1.55rem; transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease; }
          .bonus-card:hover { transform:translateY(-7px); border-color:rgba(163,230,53,.65); box-shadow:0 14px 35px rgba(34,211,238,.16),0 0 24px rgba(163,230,53,.08); }
          .bonus-card::before { content:"✓"; position:absolute; left:1rem; top:1.15rem; color:#67e8f9; font-size:1.1rem; font-weight:900; }
          .bonus-card > div.mt-5 { display:none; }
          .bonus-card h3 { padding-left:1.35rem; }
          .bonus-tag { position:absolute; left:50%; top:-.7rem; transform:translateX(-50%); white-space:nowrap; border-radius:.35rem; background:#075bd6; padding:.25rem .75rem; font-size:.65rem; font-weight:900; }
          .cta-shine { position:relative; overflow:hidden; }
          .cta-shine::after { position:absolute; inset:0; content:""; background:linear-gradient(110deg,transparent 20%,rgba(255,255,255,.45) 48%,transparent 74%); transform:translateX(-140%); animation:shine 4.5s ease-in-out infinite; }
          @keyframes shine { 0%,68%{transform:translateX(-140%)} 94%,100%{transform:translateX(140%)} }
          @keyframes hero-enter { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          @keyframes ambient-drift { 0%{transform:translate3d(-2%,0,0) scale(1);opacity:.35} 50%{transform:translate3d(2%,-1.5%,0) scale(1.03);opacity:.62} 100%{transform:translate3d(-1%,2%,0) scale(1.01);opacity:.45} }
          @keyframes hero-scan { 0%,65%{transform:translateX(-120%)} 88%,100%{transform:translateX(120%)} }
          @keyframes price-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes network-pulse { 0%,100%{filter:drop-shadow(0 0 0 rgba(34,211,238,0))} 50%{filter:drop-shadow(0 0 18px rgba(34,211,238,.2))} }
          @media (prefers-reduced-motion:reduce) { html{scroll-behavior:auto}.hero-grid::before,.hero-grid::after,.hero-grid > div,.hero-grid aside,.hero-grid .relative.hidden,.cta-shine::after{animation:none}.glow-card,.bonus-card{transition:none}.glow-card:hover,.bonus-card:hover{transform:none} }
        `}</style>
        <section className="border-y border-cyan-400/15 bg-[#020b1b] px-4 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="eyebrow">Despu&eacute;s de pagar</p><h2 className="mt-3 text-3xl font-black uppercase italic sm:text-5xl">Entra hoy y empieza con claridad.</h2><p className="mt-4 text-lg leading-7 text-slate-300">Tu compra no se queda en una promesa: recibir&aacute;s instrucciones claras para comenzar a usar tu ecosistema de formaci&oacute;n y agentes.</p></div><div className="mt-10 grid gap-4 md:grid-cols-4"><article className="glow-card"><p className="text-3xl font-black text-cyan-300">01</p><h3 className="mt-4 font-black uppercase">Confirma tu pago</h3><p className="mt-2 text-sm leading-6 text-slate-400">Hotmart procesa tu compra y env&iacute;a la confirmaci&oacute;n a tu correo.</p></article><article className="glow-card"><p className="text-3xl font-black text-cyan-300">02</p><h3 className="mt-4 font-black uppercase">Recibe tus accesos</h3><p className="mt-2 text-sm leading-6 text-slate-400">Encontrar&aacute;s las indicaciones para entrar al taller y a los bonos incluidos.</p></article><article className="glow-card"><p className="text-3xl font-black text-cyan-300">03</p><h3 className="mt-4 font-black uppercase">Activa tus agentes</h3><p className="mt-2 text-sm leading-6 text-slate-400">Tendr&aacute;s acceso vitalicio a la Suite de Agentes de Inteligencia Artificial CEFIN.</p></article><article className="glow-card"><p className="text-3xl font-black text-cyan-300">04</p><h3 className="mt-4 font-black uppercase">Implementa</h3><p className="mt-2 text-sm leading-6 text-slate-400">Trabaja con la formaci&oacute;n durante un a&ntilde;o y avanza con las sesiones en vivo.</p></article></div></div></section>

        <section className="bg-[#02040a] px-4 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="eyebrow">&Uacute;ltimas objeciones</p><h2 className="mt-3 text-3xl font-black uppercase italic sm:text-5xl">Preguntas frecuentes</h2></div><div className="mt-10 border-t border-white/10">{[["&iquest;Necesito conocimientos t&eacute;cnicos?","No. La oferta est&aacute; pensada para contadores y profesionales que quieren implementar IA sin programar."],["&iquest;Qu&eacute; incluye exactamente mi compra?","Incluye el Taller de Inteligencia Artificial y Excel para Contadores, la Suite de cinco Agentes CEFIN y los cinco bonos exclusivos."],["&iquest;Cu&aacute;nto tiempo tendr&eacute; acceso?","Tendr&aacute;s acceso por un a&ntilde;o al taller principal y a los talleres incluidos en los bonos. Los Agentes de Inteligencia Artificial tienen acceso vitalicio."],["&iquest;C&oacute;mo recibir&eacute; los bonos?","Despu&eacute;s del pago recibir&aacute;s en tu correo las instrucciones de acceso y las fechas o enlaces correspondientes a cada actividad."],["&iquest;Qu&eacute; pasa despu&eacute;s de pagar?","Hotmart te mostrar&aacute; la confirmaci&oacute;n de compra y recibir&aacute;s los siguientes pasos para entrar a tu formaci&oacute;n y activar tus accesos."]].map(([question,answer])=><details key={question} className="group border-b border-white/10 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black text-white">{question}<span className="text-2xl text-lime-300 transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 leading-7 text-slate-400">{answer}</p></details>)}</div></div></section>

        </main>
    </>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center"><p className="eyebrow">{eyebrow}</p><h2 className="mt-3 text-3xl font-black uppercase italic sm:text-5xl">{title}</h2></div>;
}
