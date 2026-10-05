import styles from "../reformas.module.css";

const scenarios = [
  {
    id: "A",
    accent: "mint",
    rows: [
      ["Ingresos", "$100,000"],
      ["IVA trasladado", "$16,000"],
      ["IVA acreditable", "$2,000"],
      ["Esquema tradicional", "$14,000"],
      ["Opción 7%", "$7,000"],
    ],
    result: "En este ejemplo, la opción del 7% sería más favorable.",
  },
  {
    id: "B",
    accent: "orange",
    rows: [
      ["Ingresos", "$100,000"],
      ["IVA trasladado", "$16,000"],
      ["IVA acreditable", "$12,000"],
      ["Esquema tradicional", "$4,000"],
      ["Opción 7%", "$7,000"],
    ],
    result: "En este ejemplo, el esquema tradicional sería más favorable.",
  },
];

export function VatComparison() {
  return (
    <section className="relative overflow-hidden bg-[#17141d] text-white">
      <div className={`${styles.grid} absolute inset-0 opacity-15`} />
      <div className="absolute right-[-15%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[#4967d8]/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#afcbff]">
              La comparación que importa
            </p>
            <h2 className="mt-4 text-5xl font-black leading-[.96] tracking-[-0.05em] sm:text-7xl">
              ¿IVA tradicional o <span className="text-[#ff6b35]">7%?</span>
            </h2>
          </div>
          <div className="border-l border-white/16 pl-6 sm:pl-8">
            <p className="text-xl font-black leading-tight sm:text-2xl">
              Una de las propuestas más llamativas rumbo a 2027 no
              necesariamente le conviene a todos.
            </p>
            <p className="mt-4 leading-relaxed text-white/58">
              Se plantea una opción para determinados contribuyentes RESICO con
              actividades gravadas al 16%: calcular un pago definitivo mensual
              equivalente al 7% de las contraprestaciones efectivamente
              cobradas.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {scenarios.map((scenario) => {
            const isMint = scenario.accent === "mint";

            return (
              <article
                key={scenario.id}
                className={`${styles.ring} overflow-hidden bg-[#251927]`}
              >
                <div
                  className={`flex items-center justify-between px-6 py-5 sm:px-8 ${
                    isMint
                      ? "bg-[#afcbff] text-[#17141d]"
                      : "bg-[#ff6b35] text-[#17141d]"
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em]">
                    Escenario
                  </p>
                  <p className="text-4xl font-black">{scenario.id}</p>
                </div>

                <dl className="px-6 py-4 sm:px-8">
                  {scenario.rows.map(([label, value], index) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between gap-5 border-b border-white/10 py-3 ${
                        index >= 3 ? "font-black" : "text-white/65"
                      }`}
                    >
                      <dt className="text-sm sm:text-base">{label}</dt>
                      <dd
                        className={`shrink-0 text-lg sm:text-xl ${
                          index === 4
                            ? isMint
                              ? "text-[#afcbff]"
                              : "text-[#ff9a73]"
                            : ""
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p
                  className={`mx-6 mb-6 p-4 text-base font-black leading-snug sm:mx-8 ${
                    isMint
                      ? "bg-[#afcbff]/10 text-[#d5e2ff]"
                      : "bg-[#ff6b35]/10 text-[#ffb89f]"
                  }`}
                >
                  {scenario.result}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-7 grid gap-5 border border-[#afcbff]/30 bg-[#afcbff]/[0.08] p-6 sm:p-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <p className="text-2xl font-black leading-tight sm:text-3xl">
            El 7% no es automáticamente mejor.
            <span className="mt-2 block text-[#afcbff]">
              La clave está en saber hacer los números.
            </span>
          </p>
          <p className="border-l border-white/16 pl-5 text-xs leading-relaxed text-white/72">
            Ejemplos simplificados para fines educativos. Suponen ingresos antes
            de IVA y no incorporan retenciones ni todos los requisitos que
            podrían resultar aplicables a un caso real.
          </p>
        </div>
      </div>
    </section>
  );
}
