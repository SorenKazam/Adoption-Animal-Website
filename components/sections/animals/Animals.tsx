import { getLocale, getTranslations } from "next-intl/server";
import LabelTitleDescription from "../labelTitleDescription/labelTitleDescription";
import { getAnimals } from "@/lib/supabase/animals";
import type { Animal } from "@/types/animals";
import CardGrid from "@/components/CardGrid/CardGrid";
import { mapAnimalToCard } from "@/mappers/animal.mapper";
import Button from "@/components/Button/Button";
import styles from "./Animals.module.scss";

export default async function Animals() {
  const t = await getTranslations("Animals");
  const locale = await getLocale();
  const animals = await getAnimals();
  const animalsData = Array.isArray(animals) ? animals : [];
  const cardItems = (animalsData as Animal[])
    .filter((a) => a.adoption_status === "available")
    .slice(0, 6)
    .map((animal) => mapAnimalToCard(animal, locale));

  return (
    <LabelTitleDescription
      sectionId="animals"
      label={t("label")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
    >
      {cardItems.length > 0 ? (
        <div className={styles.animals}>
          <CardGrid items={cardItems} cardHasCTA={true} />
          <Button
            variant="primary"
            url="/animals"
            className={styles.showAll}
            ariaLabel={t("showAllAriaLabel")}
          >
            {t("showAll")}
          </Button>
        </div>
      ) : (
        <p className={styles.noResults}>{t("noResults")}</p>
      )}
    </LabelTitleDescription>
  );
}
