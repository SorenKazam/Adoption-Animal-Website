"use server";

import { setCookie } from "@/lib/utils/cookieJar";
import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import AgeVerification from "@/lib/utils/ageVerification";
import { PHONE_COUNTRY_CODES } from "@/lib/utils/getPhoneCountryCodes";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

async function failRequest(): Promise<never> {
  await setCookie("adoption_status", "false");
  redirect("/adopt/status");
}

export async function submitAdoptionForm(formData: FormData): Promise<void> {
  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d+$/;

  // Valid select values
  const validHousingTypes = ["apartment", "house", "other"];
  const validHousingStatus = ["own", "rent", "other"];
  const validYesNo = ["yes", "no"];

  // Get raw values
  const animalId = getString(formData, "animalId");
  const petsAllowedValue = getString(formData, "petsAllowed");
  const previousPetsValue = getString(formData, "previousPets");
  const residentValue = getString(formData, "resident");
  const movingPlansValue = getString(formData, "movingPlans");
  const vetCareValue = getString(formData, "vetCare");
  const hoursAlone = Number(formData.get("hoursAlone"));

  // Required animal id
  if (!animalId) {
    await failRequest();
  }

  // Validate hours alone
  if (Number.isNaN(hoursAlone) || hoursAlone < 0 || hoursAlone > 24) {
    await failRequest();
  }

  // Build data object
  const data = {
    animal_id: animalId,
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    country_code: getString(formData, "countryCode"),
    phone_number: getString(formData, "phoneNumber"),
    birthdate: getString(formData, "birthdate"),
    nationality: getString(formData, "nationality"),
    address: getString(formData, "address"),
    city: getString(formData, "city"),
    housing_type: getString(formData, "housingType"),
    housing_status: getString(formData, "housingStatus"),
    current_pets: getString(formData, "currentPets"),
    responsible_person: getString(formData, "responsiblePerson"),
    stay_duration: getString(formData, "stayDuration"),
    comments: getString(formData, "comments"),
    hours_alone: hoursAlone,
    pets_allowed: petsAllowedValue === "yes",
    previous_pets: previousPetsValue === "yes",
    resident: residentValue === "yes",
    moving_plans: movingPlansValue === "yes",
    vet_care: vetCareValue === "yes",
  };

  // Lowercase inputs
  data.email = data.email.toLowerCase();
  data.nationality = data.nationality.toLowerCase();
  data.address = data.address.toLowerCase();
  data.city = data.city.toLowerCase();
  data.responsible_person = data.responsible_person.toLowerCase();
  data.comments = data.comments.toLowerCase();

  // Email validation
  if (!emailRegex.test(data.email)) {
    await failRequest();
  }

  // Phone validation
  if (!phoneRegex.test(data.phone_number)) {
    await failRequest();
  }

  // Country code validation
  const validPhoneCountryCodes = PHONE_COUNTRY_CODES.map(
    (country) => country.countryCode,
  );

  if (!validPhoneCountryCodes.includes(data.country_code)) {
    await failRequest();
  }

  // Housing type validation
  if (!validHousingTypes.includes(data.housing_type)) {
    await failRequest();
  }

  // Housing status validation
  if (!validHousingStatus.includes(data.housing_status)) {
    await failRequest();
  }

  // Yes/No validations
  if (
    !validYesNo.includes(petsAllowedValue) ||
    !validYesNo.includes(previousPetsValue) ||
    !validYesNo.includes(residentValue) ||
    !validYesNo.includes(movingPlansValue) ||
    !validYesNo.includes(vetCareValue)
  ) {
    await failRequest();
  }

  // Age verification
  if (!AgeVerification(data.birthdate, 18)) {
    await failRequest();
  }

  // Resident validation
  if (residentValue === "no" && data.stay_duration === "") {
    await failRequest();
  }

  //Check if animal is still available
  const { data: fetchIfAnimalAvailable, error: fetchIfAnimalAvailableError } =
    await supabase.from("animals").select("*").eq("id", animalId).single();
  if (fetchIfAnimalAvailableError) {
    await failRequest();
  }
  if (fetchIfAnimalAvailable.adoption_status !== "available") {
    await failRequest();
  }

  //Insert data
  const { error: insertDataRequestError } = await supabase
    .from("adoption_requests")
    .insert([data]);

  //Handle insert error
  if (insertDataRequestError) {
    await failRequest();
  }

  //Change animal status
  const { error: updateError } = await supabase
    .from("animals")
    .update({ adoption_status: "pending" })
    .eq("id", animalId);

  //Handle animal status change error
  if (updateError) {
    await failRequest();
  }

  //Setting the success cookies
  await setCookie("adoption_status", "true");
  redirect(`/adopt/status`);
}
