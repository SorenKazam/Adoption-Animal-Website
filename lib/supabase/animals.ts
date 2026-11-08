import { createClient } from "./server";
import { notFound, redirect } from "next/navigation";

export async function getAnimals(limit = 25, offset = 0) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("animals")
    .select("*")
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data ?? [];
}

export async function getAnimalById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("animals")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching animal:", error);
    redirect(notFound());
  }
  return data;
}

export async function getNumberOfAnimals() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("animals")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}

export async function getNumberOfPendingAnimals() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("animals")
    .select("id", { count: "exact", head: true })
    .eq("adoption_status", "pending");
  return count ?? 0;
}

export async function getNumberOfAdoptedAnimals() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("animals")
    .select("id", { count: "exact", head: true })
    .eq("adoption_status", "adopted");
  return count ?? 0;
}
