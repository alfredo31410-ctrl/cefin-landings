import { benefits } from "../config";

export function BenefitsSection() {
  return (
    <section className="mt-6" aria-labelledby="benefits-title">
      <h2 id="benefits-title" className="text-xs font-black uppercase tracking-[0.18em] text-[#7EE9DD]">
        En esta clase conocerás
      </h2>
      <ul className="mt-3 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.055] p-3 text-[13px] font-bold leading-snug text-white/82 sm:p-3.5 sm:text-sm">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#13B8A6] text-[11px] font-black text-[#082A31]" aria-hidden="true">
              ✓
            </span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
