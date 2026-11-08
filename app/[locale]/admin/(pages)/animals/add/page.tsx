import { getTranslations } from "next-intl/server";
import AnimalForm from "@/components/Forms/AnimalForm/AnimalForm";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import { insertAnimal } from "@/actions/admin/animals/insert";

export default async function AddAnimalPage() {
  const t = await getTranslations("AnimalForm");
  const pageTranslations = await getTranslations("AddAnimalPage");

  const translations = {
    basicInformation: t("basicInformation"),
    name: t("name"),
    species: t("species"),
    cat: t("cat"),
    dog: t("dog"),
    other: t("other"),
    breed: t("breed"),
    details: t("details"),
    ageMonths: t("ageMonths"),
    gender: t("gender"),
    male: t("male"),
    female: t("female"),
    size: t("size"),
    small: t("small"),
    medium: t("medium"),
    large: t("large"),
    adoptionStatus: t("adoptionStatus"),
    available: t("available"),
    pending: t("pending"),
    adopted: t("adopted"),
    media: t("media"),
    uploadTitle: t("uploadTitle"),
    uploadSubtitle: t("uploadSubtitle"),
    removeButton: t("removeButton"),
    healthNotes: t("healthNotes"),
    description: t("description"),
    vaccinated: t("vaccinated"),
    neutered: t("neutered"),
    saveChanges: t("saveChanges"),
    createAnimal: t("createAnimal"),
  };

  return (
    <LabelTitleDescription
      sectionId="animals"
      title={pageTranslations("title")}
      description={pageTranslations("description")}
    >
      <AnimalForm action={insertAnimal} translations={translations} />
    </LabelTitleDescription>
  );
}
