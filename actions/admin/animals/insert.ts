"use server";

import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export async function insertAnimal(formData: FormData) {
  try {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const image = formData.get("image") as File;
    let imageMeta;

    // Validate if image is received
    if (!image || image.size === 0) {
      throw new Error("Image is required");
    }

    // File -> Buffer
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

    // Process image (resize + convert to webp)
    const processedImage = await sharp(buffer)
      .resize({
        width: 1200,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 75,
        effort: 6,
      })
      .toBuffer();

    // Generate file name ALWAYS webp
    const fileName = `${randomUUID()}.webp`;

    // Upload processed image
    const { error: uploadError } = await supabase.storage
      .from("animal_photos")
      .upload(fileName, processedImage, {
        contentType: "image/webp",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // Public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("animal_photos").getPublicUrl(fileName);

    // Insert DB
    const data = {
      name: formData.get("name"),
      species: formData.get("species"),
      breed: formData.get("breed"),
      age_months: Number(formData.get("age_months")),
      gender: formData.get("gender"),
      description: formData.get("description"),
      image_url: publicUrl,
      adoption_status: formData.get("adoption_status"),
      vaccinated: formData.get("vaccinated") === "on",
      neutered: formData.get("neutered") === "on",
      size: formData.get("size"),
    };

    const { error } = await supabase.from("animals").insert([data]);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin/animals");
    revalidatePath(`/admin/animals/${id}/edit`);

    return {
      success: true,
      message: "Animal added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
