// PURE HELPERS, NO CLIENT SIDE

import { createClient } from "../supabase/server";

export async function getAnimalImageUrl(path: string) {
  const supabase = await createClient();

  const { data } = supabase.storage.from("animal_photos").getPublicUrl(path);

  return data.publicUrl;
}
