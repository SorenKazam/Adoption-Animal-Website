import AdoptionForm from "@/components/Forms/AdoptionForm/AdoptionForm";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import { getAnimalById } from "@/lib/supabase/animals";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export type LocaleParams = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function AdoptPage({ params }: LocaleParams) {
  const t = await getTranslations("Adopt");
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal?.id || animal.adoption_status !== "available") {
    return redirect("/404");
  }

  return (
    <LabelTitleDescription
      sectionId="adopt"
      label={t("label")}
      title={t("title")}
      titleHighlight={animal.name}
      description={t("description")}
    >
      <AdoptionForm animalId={id} />
    </LabelTitleDescription>
  );
}
