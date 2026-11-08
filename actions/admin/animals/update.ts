"use server";

import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export async function updateAnimal(formData: FormData) {
  try {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const image = formData.get("image") as File;
    let imageMeta;

    // Get current image
    const { data: currentAnimal } = await supabase
      .from("animals")
      .select("image_url")
      .eq("id", id)
      .single();

    let imageUrl = currentAnimal?.image_url || "";

    if (image && image.size > 0) {
      // Process image with sharp
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Validate image
      try {
        imageMeta = await sharp(buffer).metadata();
      } catch {
        throw new Error("Invalid image file");
      }

      if (!imageMeta.format) {
        throw new Error("Unsupported image format");
      }

      const processedImage = await sharp(buffer)
        .resize({
          width: 1200,
          height: 1200,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 75 })
        .toBuffer();

      const fileName = `${randomUUID()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("animal_photos")
        .upload(fileName, processedImage, {
          contentType: "image/webp",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("animal_photos").getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    const data = {
      name: formData.get("name"),
      species: formData.get("species"),
      breed: formData.get("breed"),
      age_months: Number(formData.get("age_months")),
      gender: formData.get("gender"),
      description: formData.get("description"),
      image_url: imageUrl,
      adoption_status: formData.get("adoption_status"),
      vaccinated: formData.get("vaccinated") === "on",
      neutered: formData.get("neutered") === "on",
      size: formData.get("size"),
    };

    const { error } = await supabase.from("animals").update(data).eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin/animals");
    revalidatePath(`/admin/animals/${id}/edit`);

    return {
      success: true,
      message: "Animal updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
