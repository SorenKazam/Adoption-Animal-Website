import { Animal } from "@/types/animals";
import { CardProps } from "@/components/Card/Card";
import { formatAnimalAge } from "@/lib/utils/formatAnimalAge";

export function mapAnimalToCard(animal: Animal, locale: string): CardProps {
  return {
    id: animal.id,
    title: animal.name,
    image: animal.image_url,
    imageAlt: animal.name,
    status: animal.adoption_status,
    tags: formatAnimalAge(animal.age, animal.created_at, locale as "pt" | "en"),
    description: animal.description,
    href: `/animals/${animal.id}`,
  };
}

export function mapAnimalToCardDetails(animal: Animal, locale: string) {
  return {
    locale,
    id: animal.id,
    name: animal.name,
    species: animal.species,
    breed: animal.breed,
    age: animal.age,
    gender: animal.gender,
    description: animal.description,
    image_url: animal.image_url,
    adoption_status: animal.adoption_status,
    created_at: animal.created_at,
    updated_at: animal.updated_at,
    vaccinated: animal.vaccinated,
    neutered: animal.neutered,
    size: animal.size,
  };
}
