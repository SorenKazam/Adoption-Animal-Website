export type AnimalStatus = "available" | "adopted" | "pending";
export type AnimalSpecies = "dog" | "cat" | "other";
export type AnimalGender = "male" | "female" | "unknown";
export type AnimalSize = "small" | "medium" | "large" | "unknown";
type AnimalBreed = {
  id: string;
  name: string;
  species: AnimalSpecies;
};
export const breeds: AnimalBreed[] = [
  // 🐶 Dogs
  { id: "labrador_retriever", name: "Labrador Retriever", species: "dog" },
  { id: "golden_retriever", name: "Golden Retriever", species: "dog" },
  { id: "german_shepherd", name: "Pastor Alemão", species: "dog" },
  { id: "french_bulldog", name: "Bulldog Francês", species: "dog" },
  { id: "english_bulldog", name: "Bulldog Inglês", species: "dog" },
  { id: "poodle", name: "Poodle", species: "dog" },
  { id: "beagle", name: "Beagle", species: "dog" },
  { id: "rottweiler", name: "Rottweiler", species: "dog" },
  { id: "yorkshire_terrier", name: "Yorkshire Terrier", species: "dog" },
  { id: "dachshund", name: "Dachshund", species: "dog" },
  { id: "boxer", name: "Boxer", species: "dog" },
  { id: "shih_tzu", name: "Shih Tzu", species: "dog" },
  { id: "chihuahua", name: "Chihuahua", species: "dog" },
  { id: "siberian_husky", name: "Husky Siberiano", species: "dog" },
  { id: "border_collie", name: "Border Collie", species: "dog" },

  // 🐱 Cats
  { id: "domestic_shorthair", name: "Europeu Comum", species: "cat" },
  { id: "siamese", name: "Siamês", species: "cat" },
  { id: "persian", name: "Persa", species: "cat" },
  { id: "maine_coon", name: "Maine Coon", species: "cat" },
  { id: "ragdoll", name: "Ragdoll", species: "cat" },
  { id: "bengal", name: "Bengal", species: "cat" },
  { id: "british_shorthair", name: "British Shorthair", species: "cat" },
  { id: "sphynx", name: "Sphynx", species: "cat" },
  { id: "scottish_fold", name: "Scottish Fold", species: "cat" },
  { id: "abyssinian", name: "Abissínio", species: "cat" },
  { id: "birman", name: "Birmanês", species: "cat" },
  { id: "oriental_shorthair", name: "Oriental Shorthair", species: "cat" },
  { id: "norwegian_forest", name: "Norueguês da Floresta", species: "cat" },
  { id: "devon_rex", name: "Devon Rex", species: "cat" },
  { id: "russian_blue", name: "Russian Blue", species: "cat" },

  //Other
  { id: "other", name: "Outro", species: "other" },
];

export type Animal = {
  id: string;
  name: string;
  species: AnimalSpecies;
  breed: AnimalBreed["id"];
  age: number;
  gender: AnimalGender;
  description: string;
  image_url: string;
  adoption_status: AnimalStatus;
  created_at: string;
  updated_at: string;
  vaccinated: boolean;
  neutered: boolean;
  size: AnimalSize;
};
