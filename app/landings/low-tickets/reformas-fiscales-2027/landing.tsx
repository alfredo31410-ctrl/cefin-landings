import { AudienceLearningTransformation } from "./components/audience-learning-transformation";
import { FinalSections } from "./components/final-sections";
import { HeroAndPain } from "./components/hero-and-pain";
import { InstructorSection } from "./components/instructor-section";
import { ReformSections } from "./components/reform-sections";
import { MetaTracking } from "./components/tracking";
import { VatComparison } from "./components/vat-comparison";
import styles from "./reformas.module.css";

export function ReformasFiscalesLanding() {
  return (
    <>
      <MetaTracking />
      <main
        className={`${styles.landing} overflow-x-hidden bg-[#0b1118] text-[#f5f3ee]`}
      >
        <HeroAndPain />
        <ReformSections />
        <VatComparison />
        <AudienceLearningTransformation />
        <InstructorSection />
        <FinalSections />
      </main>
    </>
  );
}
