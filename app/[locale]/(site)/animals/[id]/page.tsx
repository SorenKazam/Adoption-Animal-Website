import ItemDetailsLayout from "@/components/ItemDetailsLayout/ItemDetailsLayout";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import { getAnimalById } from "@/lib/supabase/animals";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import ItemDetailsLayoutSkeleton from "@/components/ItemDetailsLayout/ItemDetailsLayoutSkeleton/ItemDetailsLayoutSkeleton";

export type LocaleParams = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function AnimalPage({ params }: LocaleParams) {
  const { locale, id } = await params;
  const animal = await getAnimalById(id);
  if (!animal.id) return redirect(notFound());
  return (
    <LabelTitleDescription sectionId="animalPage">
      <Suspense fallback={<ItemDetailsLayoutSkeleton />}>
        <ItemDetailsLayout item={animal} locale={locale} />
      </Suspense>
    </LabelTitleDescription>
  );
}
