import CardGrid from "@/components/CardGrid/CardGrid";
import type { LocaleParams } from "@/types/locales";
import { mapAnimalToCard } from "@/mappers/animal.mapper";
import { Animal } from "@/types/animals";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import { getAnimals } from "@/lib/supabase/animals";
import { getTranslations } from "next-intl/server";

export default async function Animals({ params }: LocaleParams) {
  const t = await getTranslations("Animals");
  const animals = await getAnimals();
  const locale = await params;
  const localetop = locale.locale;
  const cardItems = (animals as Animal[]).map((animal) =>
    mapAnimalToCard(animal, localetop),
  );
  return (
    <LabelTitleDescription
      sectionId="animals"
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
    >
      <CardGrid items={cardItems} cardHasCTA={true} />
    </LabelTitleDescription>
  );
}
