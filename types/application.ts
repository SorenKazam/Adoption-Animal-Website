import { Animal } from "./animals";

export type ApplicationProps = {
  id: string;
  animal_id: string;
  created_at: string;
  name: string;
  email: string;
  phone_number: string;
  birthdate: string;
  nationality: string;
  address: string;
  city: string;
  housing_type: string;
  housing_status: string;
  pets_allowed: boolean;
  previous_pets: boolean;
  current_pets: string;
  hours_alone: number;
  responsible_person: string;
  resident: boolean;
  stay_duration: string;
  moving_plans: boolean;
  vet_care: boolean;
  comments: string;
  country_code: string;
  updated_at: string;
  animals: Animal;
};
