import AnimalFormClient from "@/components/Forms/AnimalForm/AnimalFormClient";
import { AnimalFormTranslations } from "@/types/animalFormTranslations";
import { Animal } from "@/types/animals";

type AnimalFormProps = {
  action: (formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
  animal?: Animal;
  translations: AnimalFormTranslations;
};

export default function AnimalForm({
  action,
  animal,
  translations,
}: AnimalFormProps) {
  return (
    <AnimalFormClient
      action={action}
      animal={animal}
      translations={translations}
    />
  );
}
