import styles from "../reformas.module.css";

const highlights = [
  {
    label: "RESICO Persona Física",
    value: "$5",
    suffix: "MILLONES",
    text: "Nuevo límite de ingresos propuesto rumbo a 2027.",
  },
  {
    label: "RESICO Persona Moral",
    value: "$50",
    suffix: "MILLONES",
    text: "Nuevo límite de ingresos propuesto.",
  },
  {
    label: "Computadoras y equipo relacionado",
    value: "100%",
    suffix: "HASTA",
    text: "Incremento máximo propuesto para determinadas inversiones.",
  },
  {
    label: "Pérdidas fiscales",
    value: "50%",
    suffix: "LÍMITE",
    text: "Para determinados contribuyentes sujetos al mecanismo propuesto.",
  },
  {
    label: "Intereses",
    value: "20%",
    suffix: "PROPUESTO",
    text: "Cambio planteado en el límite mencionado para su deducción.",
  },
  {
    label: "IVA",
    value: "7%",
    suffix: "OPCIÓN",
    text: "Para determinados contribuyentes RESICO con actividades al 16%.",
  },
];

const topics = [
  {
    number: "01",
    title: "RESICO Persona Física",
    body: "Analiza el incremento propuesto del límite de $3.5 a $5 millones, qué contribuyentes podrían entrar o volver a evaluar este régimen y qué requisitos deben revisarse antes de recomendar un cambio.",
  },
  {
    number: "02",
    title: "RESICO Persona Moral",
    body: "Comprende el aumento propuesto de $35 a $50 millones, las oportunidades potenciales para determinadas empresas y por qué debe compararse el régimen con la situación real del contribuyente.",
  },
  {
    number: "03",
    title: "Deducción de inversiones",
    body: "Revisa los cambios propuestos para computadoras, equipo tecnológico, mobiliario, automóviles, camiones, montacargas, maquinaria y determinados activos sectoriales.",
    callout:
      "2027 podría modificar cuándo conviene realizar determinadas inversiones y cómo se aprovechan fiscalmente.",
  },
  {
    number: "04",
    title: "Control de deducciones",
    body: "La propuesta contempla un nuevo mecanismo para determinadas personas morales con ingresos acumulables superiores a $50 millones.",
    callout: "¿Tienes clientes que superan los $50 millones de ingresos?",
  },
  {
    number: "05",
    title: "Pérdidas fiscales",
    body: "Para determinadas empresas afectadas por el nuevo mecanismo, se plantea limitar la disminución de pérdidas fiscales al 50% de la utilidad fiscal correspondiente.",
    callout:
      "¿Una empresa podría tener pérdidas fiscales pendientes y aun así terminar pagando ISR?",
  },
  {
    number: "06",
    title: "Intereses, anticipos y pagos al extranjero",
    body: "Conoce los cambios propuestos relacionados con el límite de intereses, pagos al extranjero, anticipos por servicios, anticipos de arrendamiento y otros ajustes relevantes para la planeación fiscal.",
  },
];

export function ReformSections() {
  return (
    <>
      <section id="cambios" className="relative overflow-hidden bg-[#07141e]">
        <div className={`${styles.grid} absolute inset-0 opacity-30`} />
        <div className="relative mx-auto max-w-[1260px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-[880px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#75e4c3]">
              Los números que pueden cambiar el escenario
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              Una cifra aislada informa. Su impacto exige contexto.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/58">
              Estos son algunos de los cambios propuestos que se analizan rumbo
              a 2027. Cada cifra debe leerse junto con sus requisitos y el caso
              real del contribuyente.
            </p>
          </div>

          <div className="mt-14 grid border-l border-t border-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.label}
                className="group min-h-[310px] border-b border-r border-white/12 bg-white/[0.025] p-7 transition duration-300 hover:bg-[#102b3a] sm:p-9"
              >
                <p className="min-h-11 text-xs font-black uppercase leading-relaxed tracking-[0.16em] text-white/50">
                  {item.label}
                </p>
                <p className="mt-8 text-[clamp(3.4rem,7vw,5.8rem)] font-black leading-none tracking-[-0.07em] text-[#c8f55c]">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-[#75e4c3]">
                  {item.suffix}
                </p>
                <p className="mt-7 leading-relaxed text-white/58">{item.text}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-5xl border border-[#75e4c3]/20 bg-[#75e4c3]/[0.06] p-5 text-xs leading-relaxed text-white/52">
            <strong className="text-white/78">Nota aclaratoria:</strong> las
            cifras se presentan como propuestas, iniciativas y escenarios rumbo
            a 2027. Pueden modificarse durante el proceso legislativo o mediante
            reglas posteriores.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f0e7] text-[#07141e]">
        <div className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <div className="lg:sticky lg:top-8 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087c68]">
                Qué cambios se analizan
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">
                Del cambio general al caso concreto.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/58">
                Un recorrido práctico para ubicar qué revisar, qué comparar y
                qué preguntas hacer antes de decidir.
              </p>
            </div>

            <div className="border-t border-black/12">
              {topics.map((topic) => (
                <article
                  key={topic.number}
                  className="grid gap-5 border-b border-black/12 py-8 sm:grid-cols-[70px_1fr] sm:py-10"
                >
                  <span className="text-sm font-black tracking-[0.18em] text-[#087c68]">
                    {topic.number}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black sm:text-3xl">
                      {topic.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-black/60">
                      {topic.body}
                    </p>
                    {topic.callout ? (
                      <p className="mt-5 border-l-3 border-[#ff7a45] bg-white/65 px-5 py-4 font-black leading-relaxed">
                        {topic.callout}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
