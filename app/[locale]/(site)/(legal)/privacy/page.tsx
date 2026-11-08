import { privacypageSections } from "@/config/pages/privacypage";
import { sectionRegistry } from "@/components/sections";

export default function PrivacyPage() {
  return (
    <>
      {privacypageSections.map((sectionName) => {
        const Section = sectionRegistry[sectionName];
        return (
          <Section
            key={sectionName}
            translationNamespace={`HomePage.${sectionName}`}
          />
        );
      })}
    </>
  );
}
