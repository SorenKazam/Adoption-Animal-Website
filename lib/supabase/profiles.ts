import { createClient } from "./server";

export async function getProfiles(limit = 25, offset = 0) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data ?? [];
}

export async function getProfileById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
