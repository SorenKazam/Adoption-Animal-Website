import { breeds } from "@/types/animals";

export function getBreedName(breedId: string) {
  return breeds.find((b) => b.id === breedId)?.name ?? "Desconhecida";
}
