const audience = [
  "Contadores con cartera de clientes",
  "Asesores fiscales",
  "Despachos contables",
  "Profesionales que atienden personas físicas y morales",
  "Quienes trabajan con contribuyentes RESICO",
  "Quienes tienen clientes prestadores de servicios",
  "Quienes asesoran empresas en crecimiento",
  "Quienes necesitan prepararse antes del cierre 2026",
];

const outcomes = [
  "Identificar los principales cambios fiscales planteados rumbo a 2027.",
  "Distinguir qué cambios pueden impactar a personas físicas y morales.",
  "Comprender los nuevos límites propuestos de RESICO.",
  "Reconocer oportunidades relacionadas con deducción de inversiones.",
  "Identificar empresas que podrían quedar sujetas al nuevo control de deducciones y pérdidas.",
  "Entender cómo funcionaría la opción del 7% de IVA.",
  "Comparar el 7% contra el esquema tradicional.",
  "Detectar qué clientes requieren un análisis más profundo.",
  "Llegar a 2027 con un mapa mucho más claro de los cambios relevantes.",
];

const reactive = [
  "Se entera cuando el cambio ya llegó.",
  "Busca respuestas aisladas.",
  "Tiene dudas al responder al cliente.",
  "Reacciona a los problemas.",
  "Conoce información, pero no siempre sabe cómo aterrizarla.",
];

const strategist = [
  "Analiza antes de actuar.",
  "Identifica riesgos y detecta oportunidades.",
  "Compara escenarios y utiliza datos.",
  "Explica al cliente qué debe revisar y por qué.",
  "Se anticipa a los cambios.",
];

export function AudienceLearningTransformation() {
  return (
    <>
      <section className="bg-[#f4f0e7] text-[#07141e]">
        <div className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087c68]">
                Para quién es especialmente relevante
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                Para profesionales que necesitan responder con criterio.
              </h2>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {audience.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-24 gap-4 border border-black/10 bg-white/60 p-5"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#087c68] text-xs font-black text-white">
                      ✓
                    </span>
                    <p className="font-bold leading-relaxed text-black/65">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#07141e] p-7 text-white sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#75e4c3]">
                Al terminar esta capacitación podrás
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                Ver el mapa, no sólo las piezas.
              </h2>
              <ol className="mt-9 border-t border-white/12">
                {outcomes.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[40px_1fr] gap-3 border-b border-white/12 py-4"
                  >
                    <span className="text-xs font-black text-[#c8f55c]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-white/68">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07141e]">
        <div className="absolute left-[-10%] top-[20%] h-80 w-80 rounded-full bg-[#ff9b62]/10 blur-3xl" />
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[850px] text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#75e4c3]">
              La transformación
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              No llegues a 2027 reaccionando.
              <span className="block text-[#c8f55c]">Llega preparado.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <article className="border border-white/12 bg-white/[0.025] p-7 sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff9b62]">
                Contador reactivo
              </p>
              <h3 className="mt-4 text-3xl font-black">Llega después.</h3>
              <ul className="mt-8 space-y-4">
                {reactive.map((item) => (
                  <li key={item} className="flex gap-3 text-white/58">
                    <span className="font-black text-[#ff9b62]">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <div className="flex items-center justify-center py-3 lg:px-3 lg:py-0">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#0d2736] text-sm font-black text-white/65">
                VS
              </span>
            </div>

            <article className="bg-[#c8f55c] p-7 text-[#061019] sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#31521b]">
                Estratega fiscal
              </p>
              <h3 className="mt-4 text-3xl font-black">Llega antes.</h3>
              <ul className="mt-8 space-y-4">
                {strategist.map((item) => (
                  <li key={item} className="flex gap-3 font-semibold text-black/68">
                    <span className="font-black text-[#087c68]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
