import { productConfig } from "../config";
import { CtaLink } from "./cta-link";

const faqs = [
  {
    question: "¿Incluye cambios para personas físicas y morales?",
    answer:
      "Sí. Incluye los cambios propuestos de RESICO, IVA, deducción de inversiones, control de deducciones, pérdidas fiscales, intereses y otros ajustes relevantes para ambos perfiles.",
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
      <section id="oferta" className="bg-[#fff4ea] text-[#17141d]">
        <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="overflow-hidden border border-black/12 bg-white shadow-[0_28px_80px_rgba(8,25,36,.12)]">
            <div className="grid lg:grid-cols-[1.15fr_.85fr]">
              <div className="p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4967d8]">
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
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-black/65">
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

              <aside className="flex flex-col justify-center bg-[#5a1832] p-7 text-white sm:p-10 lg:p-12">
                {productConfig.originalPrice !== null ? (
                  <p className="text-lg font-bold text-white/65 line-through">
                    {formatPrice(productConfig.originalPrice)}
                  </p>
                ) : null}
                {productConfig.price !== null ? (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#afcbff]">
                      Inversión
                    </p>
                    <p className="mt-2 text-5xl font-black tracking-[-0.05em] text-[#ff9a73] sm:text-6xl">
                      {formatPrice(productConfig.price)}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#afcbff]">
                      Información comercial en preparación
                    </p>
                    <p className="mt-3 text-3xl font-black leading-tight">
                      Conoce el contenido antes de que abramos inscripciones.
                    </p>
                  </>
                )}

                <CtaLink
                  placement="offer"
                  fallbackHref="#preguntas"
                  fallbackChildren={<>CONSULTAR PREGUNTAS FRECUENTES<span className="ml-3 text-xl">→</span></>}
                  className="mt-8 inline-flex min-h-16 w-full items-center justify-center bg-[#ff6b35] px-6 text-center text-sm font-black text-[#17141d] transition hover:-translate-y-1 hover:bg-[#ff825f] sm:text-base"
                >
                  {productConfig.cta}<span className="ml-3 text-xl">→</span>
                </CtaLink>

                {!productConfig.checkoutUrl ? (
                  <p className="mt-4 text-center text-xs leading-relaxed text-white/72">
                    Fecha, modalidad, duración, acceso y precio se publicarán
                    únicamente cuando estén confirmados.
                  </p>
                ) : null}
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section id="preguntas" className="bg-[#fffaf5] text-[#17141d]">
        <div className="mx-auto max-w-[1040px] px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-[#4967d8]">
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 text-center text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Antes de prepararte
          </h2>

          <div className="mx-auto mt-9 max-w-[900px] border-t border-black/12">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-black/12 py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                  {faq.question}
                  <span className="text-2xl text-[#4967d8] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pt-4 leading-relaxed text-black/58">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 grid gap-6 bg-[#301024] p-7 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:text-left">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#afcbff]">
                El momento de anticiparte es ahora
              </p>
              <p className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                Llega a 2027 con mejores preguntas y un mapa más claro.
              </p>
            </div>
            <CtaLink
              placement="final"
              fallbackHref="#oferta"
              fallbackChildren={
                <>
                  REVISAR LA CAPACITACIÓN
                  <span className="ml-3 text-xl">→</span>
                </>
              }
              className="inline-flex min-h-14 w-full items-center justify-center bg-[#ff6b35] px-7 text-center text-sm font-black text-[#17141d] transition hover:-translate-y-1 hover:bg-[#ff825f] sm:w-auto"
            >
              {productConfig.cta}<span className="ml-3 text-xl">→</span>
            </CtaLink>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#17141d] text-white">
        <div className="mx-auto max-w-[1160px] px-5 py-9 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <span className="text-2xl font-black tracking-[-0.04em] text-white">
              CEFIN<span className="text-[#ff6b35]">.</span>
            </span>
            <a
              href="https://cefin.mx"
              data-no-xcod-url=""
              suppressHydrationWarning
              className="text-sm font-bold text-white/72 transition hover:text-white"
            >
              cefin.mx
            </a>
          </div>
          <p className="mt-7 border-t border-white/10 pt-6 text-center text-xs leading-relaxed text-white/70 sm:text-left">
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
