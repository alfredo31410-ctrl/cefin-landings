const audience = [
  "Contadores y asesores fiscales",
  "Despachos con cartera de personas físicas y morales",
  "Profesionales que atienden contribuyentes RESICO",
  "Equipos que deben prepararse antes del cierre 2026",
];

const outcomes = [
  "Ubicar qué cambios pueden impactar a cada tipo de cliente.",
  "Comparar RESICO, inversiones y escenarios de IVA.",
  "Detectar riesgos y oportunidades antes de recomendar.",
  "Explicar al cliente qué revisar y por qué.",
  "Priorizar lo que debe analizarse antes de enero.",
];

export function AudienceLearningTransformation() {
  return (
    <section className="bg-[#f1e3d5] text-[#17141d]">
      <div className="mx-auto max-w-[1220px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-[820px]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4967d8]">
            Del dato al criterio
          </p>
          <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">
            Un mapa para responder mejor, no otra lista de cambios.
          </h2>
        </div>

        <div className="mt-12 grid overflow-hidden border border-[#5a1832]/15 lg:grid-cols-[.85fr_1.15fr]">
          <div className="bg-[#fffaf5]/80 p-7 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5a1832]">
              Especialmente útil para
            </p>
            <ul className="mt-7 border-t border-[#5a1832]/12">
              {audience.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[34px_1fr] gap-3 border-b border-[#5a1832]/12 py-4"
                >
                  <span className="text-xs font-black text-[#4967d8]">
                    0{index + 1}
                  </span>
                  <span className="font-bold leading-relaxed text-black/72">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#5a1832] p-7 text-white sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#afcbff]">
              Al terminar podrás
            </p>
            <ol className="mt-7 grid gap-px bg-white/12 sm:grid-cols-2">
              {outcomes.map((item, index) => (
                <li
                  key={item}
                  className={`bg-[#5a1832] p-5 ${
                    index === outcomes.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="text-xs font-black tracking-[0.16em] text-[#afcbff]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-bold leading-relaxed text-white/82">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
