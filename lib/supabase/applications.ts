import { createClient } from "./server";

export default async function getApplications(limit = 25, offset = 0) {
  const supabase = await createClient();

  const { data: applications, error: applicationsError } = await supabase
    .from("adoption_requests")
    .select("*, animals(*)")
    .range(offset, offset + limit - 1);

  if (applicationsError) {
    return [];
  }

  if (!applications) return [];
  return applications;
}

export async function getNumberOfApplications() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("adoption_requests")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}

export async function getApplicationById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("adoption_requests")
    .select("*, animals(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) return [];
  return data;
}
