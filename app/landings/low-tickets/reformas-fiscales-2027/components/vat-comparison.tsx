import { productConfig } from "../config";
import styles from "../reformas.module.css";
import { CtaLink } from "./cta-link";

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
    <section className="relative overflow-hidden bg-[#0a1c2b]">
      <div className={`${styles.grid} absolute inset-0 opacity-25`} />
      <div className="absolute right-[-15%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[#75e4c3]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#75e4c3]">
              La comparación que importa
            </p>
            <h2 className="mt-4 text-5xl font-black leading-[.96] tracking-[-0.05em] sm:text-7xl">
              ¿IVA tradicional o <span className="text-[#c8f55c]">7%?</span>
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

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {scenarios.map((scenario) => {
            const isMint = scenario.accent === "mint";

            return (
              <article
                key={scenario.id}
                className={`${styles.ring} overflow-hidden bg-[#07141e]`}
              >
                <div
                  className={`flex items-center justify-between px-6 py-5 sm:px-8 ${
                    isMint
                      ? "bg-[#75e4c3] text-[#061019]"
                      : "bg-[#ff9b62] text-[#1c0e08]"
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em]">
                    Escenario
                  </p>
                  <p className="text-4xl font-black">{scenario.id}</p>
                </div>

                <dl className="p-6 sm:p-8">
                  {scenario.rows.map(([label, value], index) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between gap-5 border-b border-white/10 py-4 ${
                        index >= 3 ? "font-black" : "text-white/65"
                      }`}
                    >
                      <dt className="text-sm sm:text-base">{label}</dt>
                      <dd
                        className={`shrink-0 text-lg sm:text-xl ${
                          index === 4
                            ? isMint
                              ? "text-[#c8f55c]"
                              : "text-[#ffb58c]"
                            : ""
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p
                  className={`mx-6 mb-6 p-5 text-lg font-black leading-snug sm:mx-8 sm:mb-8 ${
                    isMint
                      ? "bg-[#75e4c3]/10 text-[#9cf0d8]"
                      : "bg-[#ff9b62]/10 text-[#ffb58c]"
                  }`}
                >
                  {scenario.result}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 border border-[#c8f55c]/30 bg-[#c8f55c]/[0.07] p-6 text-center sm:p-9">
          <p className="text-2xl font-black leading-tight sm:text-4xl">
            El 7% no es automáticamente mejor.
            <span className="mt-2 block text-[#c8f55c]">
              La clave está en saber hacer los números.
            </span>
          </p>
          <div className="mx-auto mt-7 flex max-w-[980px] flex-col items-stretch justify-center gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            {["Ingresos", "IVA acreditable", "Retenciones", "Características"].map(
              (item, index) => (
                <div key={item} className="contents">
                  <span className="border border-white/15 bg-white/[0.04] px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white/72">
                    {item}
                  </span>
                  {index < 3 ? (
                    <span className="hidden text-[#75e4c3] sm:inline">+</span>
                  ) : null}
                </div>
              ),
            )}
            <span className="hidden text-[#75e4c3] sm:inline">=</span>
            <span className="bg-[#c8f55c] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#061019]">
              Decisión
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-y border-white/12 py-8 text-center lg:flex-row lg:text-left">
          <div>
            <p className="text-2xl font-black">
              No te quedes con el porcentaje. Aprende a comparar el escenario.
            </p>
            <p className="mt-2 text-sm text-white/50">
              Actualización práctica para contadores y profesionales fiscales.
            </p>
          </div>
          <CtaLink
            placement="iva-comparison"
            className="inline-flex min-h-14 w-full shrink-0 items-center justify-center bg-[#c8f55c] px-7 text-sm font-black text-[#061019] transition hover:-translate-y-1 hover:bg-[#dcff8c] sm:w-auto"
          >
            {productConfig.cta}<span className="ml-3 text-xl">→</span>
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
