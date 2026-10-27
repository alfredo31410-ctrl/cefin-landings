import { productConfig } from "../config";
import styles from "../reformas.module.css";
import { CtaLink } from "./cta-link";

const faqs = [
  {
    question: "¿Esta capacitación es para contadores?",
    answer:
      "Sí. Está planteada para contadores, asesores fiscales, despachos y profesionales que necesitan entender los cambios rumbo a 2027 y revisar su posible impacto en cada cliente.",
  },
  {
    question: "¿Sirve si trabajo con personas físicas?",
    answer:
      "Sí. Se analizan temas propuestos que pueden ser relevantes para personas físicas, entre ellos los cambios de RESICO y el escenario planteado para IVA.",
  },
  {
    question: "¿También se analizan cambios para personas morales?",
    answer:
      "Sí. El contenido contempla cambios propuestos de RESICO Persona Moral, deducción de inversiones, control de deducciones, pérdidas fiscales, intereses y otros ajustes relacionados.",
  },
  {
    question: "¿Se explica la opción propuesta del 7% de IVA?",
    answer:
      "Sí. Se explica el planteamiento y se comparan escenarios para mostrar por qué el 7% no sería automáticamente la mejor opción para todos los contribuyentes.",
  },
  {
    question: "¿Los cambios ya están aprobados?",
    answer:
      "La capacitación analiza propuestas y cambios rumbo a 2027. Distingue entre iniciativa, aprobación y reglas definitivas; no presenta una propuesta como una disposición vigente.",
  },
  {
    question: "¿Qué pasa si la reforma cambia antes de entrar en vigor?",
    answer:
      "Las disposiciones pueden modificarse durante el proceso legislativo o mediante reglas posteriores. El análisis debe actualizarse con la versión aprobada y las reglas definitivas aplicables.",
  },
];

const commercialDetails = [
  ["Modalidad", productConfig.modality],
  ["Duración", productConfig.duration],
  ["Acceso", productConfig.access],
].filter((item): item is [string, string] => Boolean(item[1]));

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(price);

export function FinalSections() {
  const hasExtraOfferContent =
    commercialDetails.length > 0 ||
    productConfig.materials.length > 0 ||
    productConfig.bonuses.length > 0 ||
    Boolean(productConfig.guarantee);

  return (
    <>
      <section id="oferta" className="bg-[#f4f0e7] text-[#07141e]">
        <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="overflow-hidden border border-black/12 bg-white shadow-[0_28px_80px_rgba(8,25,36,.12)]">
            <div className="grid lg:grid-cols-[1.15fr_.85fr]">
              <div className="p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087c68]">
                  La capacitación
                </p>
                <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">
                  {productConfig.productName}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/60">
                  Una actualización profesional para entender los principales
                  cambios propuestos, identificar a quién podrían afectar y
                  llegar a 2027 con mejores preguntas y un mapa más claro.
                </p>

                {hasExtraOfferContent ? (
                  <div className="mt-9 grid gap-3 sm:grid-cols-2">
                    {commercialDetails.map(([label, value]) => (
                      <div key={label} className="border border-black/10 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-black/40">
                          {label}
                        </p>
                        <p className="mt-2 font-black">{value}</p>
                      </div>
                    ))}
                    {productConfig.materials.map((material) => (
                      <div key={material} className="border border-black/10 p-4 font-bold">
                        {material}
                      </div>
                    ))}
                    {productConfig.bonuses.map((bonus) => (
                      <div key={bonus} className="border border-black/10 p-4 font-bold">
                        {bonus}
                      </div>
                    ))}
                    {productConfig.guarantee ? (
                      <div className="border border-black/10 p-4 font-bold">
                        {productConfig.guarantee}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <aside className="flex flex-col justify-center bg-[#0a1c2b] p-7 text-white sm:p-10 lg:p-12">
                {productConfig.originalPrice !== null ? (
                  <p className="text-lg font-bold text-white/38 line-through">
                    {formatPrice(productConfig.originalPrice)}
                  </p>
                ) : null}
                {productConfig.price !== null ? (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#75e4c3]">
                      Inversión
                    </p>
                    <p className="mt-2 text-5xl font-black tracking-[-0.05em] text-[#c8f55c] sm:text-6xl">
                      {formatPrice(productConfig.price)}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#75e4c3]">
                      Acceso a la capacitación
                    </p>
                    <p className="mt-3 text-3xl font-black leading-tight">
                      Prepárate para analizar antes de decidir.
                    </p>
                  </>
                )}

                <CtaLink
                  placement="offer"
                  fallbackHref="#preguntas"
                  className="mt-8 inline-flex min-h-16 w-full items-center justify-center bg-[#c8f55c] px-6 text-center text-sm font-black text-[#061019] transition hover:-translate-y-1 hover:bg-[#dcff8c] sm:text-base"
                >
                  {productConfig.cta}<span className="ml-3 text-xl">→</span>
                </CtaLink>

                {!productConfig.checkoutUrl ? (
                  <p className="mt-4 text-center text-xs leading-relaxed text-white/45">
                    Los datos comerciales y de acceso se integrarán cuando
                    sean confirmados.
                  </p>
                ) : null}
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section id="preguntas" className="bg-white text-[#07141e]">
        <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-24">
          <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-[#087c68]">
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 text-center text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Antes de prepararte
          </h2>

          <div className="mt-10 border-t border-black/12">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-black/12 py-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                  {faq.question}
                  <span className="text-2xl text-[#087c68] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pt-4 leading-relaxed text-black/58">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a1c2b]">
        <div className={`${styles.grid} absolute inset-0 opacity-30`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(200,245,92,.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-[1020px] px-5 py-20 text-center sm:px-8 lg:py-28">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#75e4c3]">
            El momento de anticiparte es ahora
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl">
            Los cambios fiscales van a llegar.
            <span className="block text-[#c8f55c]">
              La diferencia está en cómo llegas tú.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/62">
            Prepárate para entender los principales cambios rumbo a 2027,
            detectar cómo pueden impactar a tus clientes y tomar decisiones con
            mayor claridad antes de que llegue enero.
          </p>
          <CtaLink
            placement="final"
            className="mt-9 inline-flex min-h-16 w-full items-center justify-center bg-[#c8f55c] px-8 text-center text-sm font-black text-[#061019] transition hover:-translate-y-1 hover:bg-[#dcff8c] sm:w-auto sm:text-base"
          >
            {productConfig.cta}<span className="ml-3 text-xl">→</span>
          </CtaLink>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-white/42">
            Actualización práctica para contadores y profesionales fiscales.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#041019]">
        <div className="mx-auto max-w-[1160px] px-5 py-9 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <span className="text-2xl font-black tracking-[-0.04em] text-white">
              CEFIN<span className="text-[#75e4c3]">.</span>
            </span>
            <a
              href="https://cefin.mx"
              className="text-sm font-bold text-white/45 transition hover:text-white"
            >
              cefin.mx
            </a>
          </div>
          <p className="mt-7 border-t border-white/10 pt-6 text-center text-xs leading-relaxed text-white/38 sm:text-left">
            El contenido de esta capacitación tiene fines educativos y de
            actualización profesional. Las disposiciones analizadas pueden estar
            sujetas a modificaciones durante el proceso legislativo y a reglas
            posteriores para su aplicación.
          </p>
        </div>
      </footer>
    </>
  );
}
