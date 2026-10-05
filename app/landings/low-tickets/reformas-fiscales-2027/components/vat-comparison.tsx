import { productConfig } from "../config";
import styles from "../reformas.module.css";
import { CtaLink } from "./cta-link";

const scenarios = [
  {
    id: "A",
    income: "$100,000",
    transferred: "$16,000",
    creditable: "$2,000",
    traditional: "$14,000",
    proposed: "$7,000",
    favorable: "proposed",
    result: "En este ejemplo, la opción del 7% sería más favorable.",
  },
  {
    id: "B",
    income: "$100,000",
    transferred: "$16,000",
    creditable: "$12,000",
    traditional: "$4,000",
    proposed: "$7,000",
    favorable: "traditional",
    result: "En este ejemplo, el esquema tradicional sería más favorable.",
  },
] as const;

export function VatComparison() {
  return (
    <section className="relative overflow-hidden bg-[#0b1118] text-[#f5f3ee]">
      <div className={`${styles.grid} absolute inset-0 opacity-20`} />
      <div className="absolute right-[-15%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[#d7a928]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d7a928]">
              La comparación que importa
            </p>
            <h2 className="mt-4 text-5xl font-black leading-[.96] tracking-[-0.05em] sm:text-7xl">
              ¿IVA tradicional o <span className="text-[#d7a928]">7%?</span>
            </h2>
          </div>
          <div className="border-l border-white/12 pl-6 sm:pl-8">
            <p className="text-xl font-black leading-tight sm:text-2xl">
              Una de las propuestas más llamativas rumbo a 2027 no
              necesariamente le conviene a todos.
            </p>
            <p className="mt-4 leading-relaxed text-[#a8b2bc]">
              Se plantea una opción para determinados contribuyentes RESICO con
              actividades gravadas al 16%: calcular un pago definitivo mensual
              equivalente al 7% de las contraprestaciones efectivamente
              cobradas.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {scenarios.map((scenario) => (
            <article
              key={scenario.id}
              className={`${styles.ring} overflow-hidden bg-[#16232e]`}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a8b2bc]">
                    Comparativo simplificado
                  </p>
                  <p className="mt-1 text-lg font-black">Escenario {scenario.id}</p>
                </div>
                <span className="border border-[#f59e0b]/35 bg-[#f59e0b]/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#fbbf24]">
                  Propuesto
                </span>
              </div>

              <dl className="grid grid-cols-3 gap-px bg-white/10">
                {[
                  ["Ingresos", scenario.income],
                  ["IVA trasladado", scenario.transferred],
                  ["IVA acreditable", scenario.creditable],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#16232e] p-4 sm:p-5">
                    <dt className="text-[10px] font-black uppercase leading-relaxed tracking-[0.1em] text-[#a8b2bc]">
                      {label}
                    </dt>
                    <dd className="mt-2 text-base font-black sm:text-lg">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <div className="bg-[#101c26] p-6 sm:p-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a8b2bc]">
                    Tradicional
                  </p>
                  <p
                    className={`mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl ${
                      scenario.favorable === "traditional"
                        ? "text-[#22c55e]"
                        : "text-[#f5f3ee]"
                    }`}
                  >
                    {scenario.traditional}
                  </p>
                  {scenario.favorable === "traditional" ? (
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[#22c55e]">
                      Menor en este ejemplo
                    </p>
                  ) : null}
                </div>
                <div className="bg-[#101c26] p-6 sm:p-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
                    Opción propuesta · 7%
                  </p>
                  <p
                    className={`mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl ${
                      scenario.favorable === "proposed"
                        ? "text-[#22c55e]"
                        : "text-[#f5f3ee]"
                    }`}
                  >
                    {scenario.proposed}
                  </p>
                  {scenario.favorable === "proposed" ? (
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[#22c55e]">
                      Menor en este ejemplo
                    </p>
                  ) : null}
                </div>
              </div>

              <p className="border-t border-white/10 px-6 py-5 font-black leading-snug text-[#f5f3ee] sm:px-8">
                {scenario.result}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-7 grid gap-5 border border-[#d7a928]/25 bg-[#d7a928]/[0.05] p-6 sm:p-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <p className="text-2xl font-black leading-tight sm:text-3xl">
            El 7% no es automáticamente mejor.
            <span className="mt-2 block text-[#d7a928]">
              La clave está en saber hacer los números.
            </span>
          </p>
          <p className="border-l border-white/12 pl-5 text-xs leading-relaxed text-[#a8b2bc]">
            Ejemplos simplificados para fines educativos. Suponen ingresos antes
            de IVA y no incorporan retenciones ni todos los requisitos que
            podrían resultar aplicables a un caso real.
          </p>
        </div>

        <div className="mt-12 grid gap-7 border-y border-white/10 py-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d7a928]">
            Información → criterio → recomendación
          </p>
          <div>
            <h3 className="text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
              El problema no será conocer el nuevo porcentaje. Será saber cuándo
              aplicarlo.
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-[#a8b2bc]">
              Dos clientes pueden tener ingresos similares y requerir análisis
              diferentes. El valor está en saber qué revisar antes de recomendar
              un esquema.
            </p>
            <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md font-black text-[#f5f3ee]">
                Prepárate para responder con criterio en 2027.
              </p>
              <CtaLink
                placement="vat_bridge"
                fallbackHref="#oferta"
                fallbackChildren={
                  <>
                    INSCRIBIRME YA
                    <span className="ml-3 text-xl">→</span>
                  </>
                }
                className="inline-flex min-h-14 w-full shrink-0 items-center justify-center bg-[#d7a928] px-7 text-center text-sm font-black text-[#0b1118] transition hover:-translate-y-1 hover:bg-[#e8bd45] sm:w-auto"
              >
                {productConfig.cta}<span className="ml-3 text-xl">→</span>
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
