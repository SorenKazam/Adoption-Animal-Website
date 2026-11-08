import EditAnimalForm from "@/components/admin/EditAnimalForm/EditAnimalForm";
import { getAnimalById } from "@/lib/supabase/animals";
import { redirect } from "next/navigation";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import { getTranslations } from "next-intl/server";

export type LocaleParams = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function EditAnimalPage({ params }: LocaleParams) {
  const { id } = await params;
  const animal = await getAnimalById(id);
  const t = await getTranslations("AnimalForm");

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

  if (!animal) {
    redirect("/404");
  }

  return (
    <LabelTitleDescription
      sectionId="editAnimal"
      title={`Edit ${animal.name} details`}
    >
      <EditAnimalForm animal={animal} translations={translations} />
    </LabelTitleDescription>
  );
}
