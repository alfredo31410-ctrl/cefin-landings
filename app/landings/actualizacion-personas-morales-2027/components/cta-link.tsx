import { campaign } from "../config";
import styles from "../landing.module.css";

type CtaLinkProps = {
  tone?: "primary" | "light";
  className?: string;
};

export function CtaLink({ tone = "primary", className = "" }: CtaLinkProps) {
  const toneClasses =
    tone === "primary"
      ? "bg-[#13B8A6] text-[#082F32] shadow-[0_18px_45px_rgba(19,184,166,0.28)] hover:bg-[#42D2C2]"
      : "bg-white text-[#102C3A] shadow-[0_18px_45px_rgba(3,19,26,0.2)] hover:bg-[#E7FFFC]";

  return (
    <a
      href={`#${campaign.formAnchor}`}
      className={`${styles.focusRing} inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl px-7 py-4 text-center text-base font-black uppercase tracking-[0.04em] transition duration-200 hover:-translate-y-0.5 sm:px-9 ${toneClasses} ${className}`}
    >
      {campaign.ctaLabel}
      <span aria-hidden="true">→</span>
    </a>
  );
}
