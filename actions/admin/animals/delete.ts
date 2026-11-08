"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteAnimal(animalId: string) {
  try {
    // Connect to Supabase
    const supabase = await createClient();

    // Get animal image path
    const { data, error: fetchError } = await supabase
      .from("animals")
      .select("image_url")
      .eq("id", animalId)
      .single();

    // Throw error if fetch fails
    if (fetchError) throw new Error(fetchError.message);

    // Throw error if animal not found
    if (!data?.image_url) throw new Error("Animal image not found");

    // Convert public URL to storage path
    const url = new URL(data.image_url);
    const pathParts = url.pathname.split("/");

    const bucketIndex = pathParts.indexOf("animal_photos");

    if (bucketIndex === -1) throw new Error("Image path not found");

    // Get image path
    const imagePath = pathParts.slice(bucketIndex + 1).join("/");

    // Throw error if image path is not found
    if (!imagePath) throw new Error("Image path not found");

    // Delete image
    const { error: storageError } = await supabase.storage
      .from("animal_photos")
      .remove([imagePath]);

    // Throw error if storage delete fails
    if (storageError) throw new Error(storageError.message);

    // Delete animal
    const { error: deleteError } = await supabase
      .from("animals")
      .delete()
      .eq("id", animalId);

    // Throw error if delete fails
    if (deleteError) throw new Error(deleteError.message);

    // Revalidate page
    revalidatePath("/admin/animals");

    return {
      success: true,
      message: "Animal deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete animal",
    };
  }
}
