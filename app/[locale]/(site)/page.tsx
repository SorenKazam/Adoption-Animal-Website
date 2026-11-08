import { Animal } from "@/types/animals";
import { getAnimals } from "@/lib/supabase/animals";
import { homepageSections } from "@/config/pages/homepage";
import { sectionRegistry } from "@/components/sections";

export default async function Home() {
  const animals = await getAnimals();
  const animalsData = Array.isArray(animals) ? animals : [];

  const getRandomAnimalImages = (animals: Animal[], count: number) => {
    const shuffled = [...animals].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((a) => a.image_url);
  };

  return (
    <>
      {homepageSections.map((sectionName) => {
        if (sectionName === "hero") {
          const HeroSection = sectionRegistry.hero;

          return (
            <HeroSection
              key={sectionName}
              heroCards={getRandomAnimalImages(animalsData, 3)}
              translationNamespace={"HomePage.hero"}
              showStats={true}
              buttons={[
                {
                  label: "Ver Animais 🐶",
                  url: "/animals",
                  ariaLabel: "Ir para página de adotação",
                  variant: "primary",
                },
                {
                  label: "Como Funciona",
                  url: "#howItWorks",
                  ariaLabel: "Ir para página de como funciona",
                  variant: "secondary",
                },
              ]}
            />
          );
        }
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
