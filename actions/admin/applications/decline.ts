"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function declineApplication(applicationId: string) {
  try {
    // Connect to Supabase
    const supabase = await createClient();

    // Get application data
    const { data: applicationData, error: applicationError } = await supabase
      .from("adoption_requests")
      .select("*")
      .eq("id", applicationId)
      .single();

    // Handle fetch data error
    if (applicationError) throw new Error(applicationError.message);

    // Handle if application not found
    if (!applicationData) throw new Error("Application not found");

    // Get animal data
    const { data: animalData, error: animalError } = await supabase
      .from("animals")
      .select("*")
      .eq("id", applicationData.animal_id)
      .single();

    // Handle fetch data error
    if (animalError) throw new Error(animalError.message);

    // Handle if animal not found
    if (!animalData) throw new Error("Animal not found");

    // Change animal adoption status to available
    const { error: updateAnimalError } = await supabase
      .from("animals")
      .update({ adoption_status: "available" })
      .eq("id", animalData.id);

    // Handle fetch data error
    if (updateAnimalError) throw new Error(updateAnimalError.message);

    // Delete application from database
    const { error: updateApplicationError } = await supabase
      .from("adoption_requests")
      .delete()
      .eq("id", applicationId);

    // Handle update application updated_at error
    if (updateApplicationError) throw new Error(updateApplicationError.message);

    // Revalidate page
    revalidatePath("/admin/applications");

    return {
      success: true,
      message: "Application declined successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
