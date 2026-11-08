"use client";

import { updateAnimal } from "@/actions/admin/animals/update";
import AnimalForm from "@/components/Forms/AnimalForm/AnimalForm";

import type { Animal } from "@/types/animals";
import type { AnimalFormTranslations } from "@/types/animalFormTranslations";

interface Props {
  animal: Animal;
  translations: AnimalFormTranslations;
}

export default function EditAnimalForm({ animal, translations }: Props) {
  return (
    <AnimalForm
      action={updateAnimal}
      animal={animal}
      translations={translations}
    />
  );
}
