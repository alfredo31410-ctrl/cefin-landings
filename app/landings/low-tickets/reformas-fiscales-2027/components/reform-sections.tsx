import styles from "../reformas.module.css";

const radarItems = [
  {
    number: "01",
    tag: "RESICO · PF",
    value: "$5M",
    title: "Nuevo límite propuesto",
    body: "El límite de ingresos pasaría de $3.5 a $5 millones. La oportunidad depende de requisitos y situación real.",
  },
  {
    number: "02",
    tag: "RESICO · PM",
    value: "$50M",
    title: "Más empresas por revisar",
    body: "El límite propuesto subiría de $35 a $50 millones. Entrar al régimen exige comparar, no asumir.",
  },
  {
    number: "03",
    tag: "Inversiones",
    value: "100%",
    title: "Deducción máxima",
    body: "Computadoras y determinados activos podrían cambiar el momento fiscalmente conveniente para invertir.",
  },
  {
    number: "04",
    tag: "Deducciones",
    value: ">$50M",
    title: "Nuevo mecanismo de control",
    body: "Determinadas personas morales con ingresos superiores a este umbral requerirían una revisión especial.",
  },
  {
    number: "05",
    tag: "Pérdidas fiscales",
    value: "50%",
    title: "Límite de disminución",
    body: "Algunas empresas podrían tener pérdidas pendientes y aun así terminar pagando ISR.",
  },
  {
    number: "06",
    tag: "Intereses",
    value: "20%",
    title: "Límite propuesto",
    body: "Intereses netos, anticipos y pagos al extranjero demandan revisar los supuestos aplicables.",
  },
];

export function ReformSections() {
  return (
    <section
      id="cambios"
      className="relative overflow-hidden bg-[#301024] text-white"
    >
      <div className={`${styles.grid} absolute inset-0 opacity-15`} />
      <div className="relative mx-auto max-w-[1260px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#afcbff]">
              Radar fiscal 2027
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              Seis movimientos que merecen contexto.
            </h2>
          </div>
          <div className="border-l border-white/16 pl-6 sm:pl-8">
            <p className="text-xl font-black leading-tight sm:text-2xl">
              La cifra abre la conversación. El caso del contribuyente decide
              qué hacer con ella.
            </p>
            <p className="mt-4 leading-relaxed text-white/58">
              Este mapa reúne el dato, el tema y la pregunta práctica en un solo
              lugar para evitar explicaciones repetidas.
            </p>
          </div>
        </div>

        <div className="mt-12 grid border-l border-t border-white/12 sm:grid-cols-2 lg:grid-cols-3">
          {radarItems.map((item) => (
            <article
              key={item.number}
              className="group flex min-h-[300px] flex-col border-b border-r border-white/15 bg-white/[0.035] p-7 transition duration-300 hover:bg-[#5a1832] sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black tracking-[0.18em] text-[#afcbff]">
                  {item.number}
                </span>
                <span className="text-right text-[10px] font-black uppercase tracking-[0.17em] text-white/55">
                  {item.tag}
                </span>
              </div>
              <p className="mt-8 text-[clamp(3.2rem,6vw,5rem)] font-black leading-none tracking-[-0.07em] text-[#afcbff]">
                {item.value}
              </p>
              <h3 className="mt-4 text-xl font-black leading-tight text-white">
                {item.title}
              </h3>
              <p className="mt-4 leading-relaxed text-white/65">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 border border-[#afcbff]/30 bg-[#afcbff]/10 p-5 text-sm leading-relaxed text-white/78 lg:grid-cols-[1fr_auto] lg:items-center">
          <p>
            <strong className="text-white">Estatus y fecha de corte:</strong>{" "}
            iniciativa del Paquete Económico 2027, revisada al 5 de octubre de
            2026. Las cifras pueden cambiar durante el proceso legislativo o
            mediante reglas posteriores.
          </p>
          <a
            href="https://www.finanzaspublicas.hacienda.gob.mx/es/Finanzas_Publicas/Paquete_Economico_y_Presupuesto"
            target="_blank"
            rel="noreferrer"
            data-no-xcod-url=""
            suppressHydrationWarning
            className="font-black text-[#afcbff] underline decoration-[#ff6b35] decoration-2 underline-offset-4 transition hover:text-white"
          >
            Ver fuente oficial ↗
          </a>
        </div>
      </div>
    </section>
  );
}
