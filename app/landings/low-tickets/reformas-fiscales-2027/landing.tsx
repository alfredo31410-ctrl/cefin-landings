import { AudienceLearningTransformation } from "./components/audience-learning-transformation";
import { FinalSections } from "./components/final-sections";
import { HeroAndPain } from "./components/hero-and-pain";
import { ReformSections } from "./components/reform-sections";
import { MetaTracking } from "./components/tracking";
import { VatComparison } from "./components/vat-comparison";
import styles from "./reformas.module.css";

export function ReformasFiscalesLanding() {
  return (
    <>
      <MetaTracking />
      <main
        className={`${styles.landing} overflow-x-hidden bg-[#fff4ea] text-[#17141d]`}
      >
        <HeroAndPain />
        <ReformSections />
        <VatComparison />
        <AudienceLearningTransformation />
        <FinalSections />
      </main>
    </>
  );
}
