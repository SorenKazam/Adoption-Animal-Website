"use client";

import ImageUploadPreview from "@/components/ImageUploadPreview/ImageUploadPreview";
import styles from "./AnimalForm.module.scss";
import { toast } from "sonner";

type AnimalFormClientProps = {
  action: (formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
  animal?: {
    id?: string;
    name?: string;
    species?: string;
    breed?: string;
    age_months?: number;
    gender?: string;
    description?: string;
    image_url?: string;
    adoption_status?: string;
    vaccinated?: boolean;
    neutered?: boolean;
    size?: string;
  };
  translations: AnimalFormTranslations;
};

export type AnimalFormTranslations = {
  basicInformation: string;
  name: string;
  species: string;
  cat: string;
  dog: string;
  other: string;
  breed: string;
  details: string;
  ageMonths: string;
  gender: string;
  male: string;
  female: string;
  size: string;
  small: string;
  medium: string;
  large: string;
  adoptionStatus: string;
  available: string;
  pending: string;
  adopted: string;
  media: string;
  uploadTitle: string;
  uploadSubtitle: string;
  removeButton: string;
  healthNotes: string;
  description: string;
  vaccinated: string;
  neutered: string;
  saveChanges: string;
  createAnimal: string;
};

export default function AnimalFormClient({
  action,
  animal,
  translations: t,
}: AnimalFormClientProps) {
  return (
    <form
      className={styles.form}
      action={async (formData) => {
        const result = await action(formData);

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }}
    >
      {animal?.id && <input type="hidden" name="id" value={animal.id} />}

      {/* BASIC INFO */}
      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>{t.basicInformation}</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.name}</label>
          <input
            type="text"
            name="name"
            defaultValue={animal?.name}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.species}</label>
          <select
            name="species"
            defaultValue={animal?.species || "cat"}
            className={styles.formSelect}
          >
            <option value="cat">{t.cat}</option>
            <option value="dog">{t.dog}</option>
            <option value="other">{t.other}</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.breed}</label>
          <input
            type="text"
            name="breed"
            defaultValue={animal?.breed}
            className={styles.formInput}
          />
        </div>
      </div>

      {/* DETAILS */}
      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>{t.details}</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.ageMonths}</label>
          <input
            type="number"
            name="age_months"
            defaultValue={animal?.age_months}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.gender}</label>
          <select
            name="gender"
            defaultValue={animal?.gender}
            className={styles.formSelect}
          >
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.size}</label>
          <select
            name="size"
            defaultValue={animal?.size}
            className={styles.formSelect}
          >
            <option value="small">{t.small}</option>
            <option value="medium">{t.medium}</option>
            <option value="large">{t.large}</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.adoptionStatus}</label>
          <select
            name="adoption_status"
            defaultValue={animal?.adoption_status}
            className={styles.formSelect}
          >
            <option value="available">{t.available}</option>
            <option value="pending">{t.pending}</option>
            <option value="adopted">{t.adopted}</option>
          </select>
        </div>
      </div>

      {/* MEDIA */}
      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>{t.media}</h2>

        <div className={styles.formGroup}>
          <ImageUploadPreview
            imageDefaultValue={animal?.image_url}
            uploadTitle={t.uploadTitle}
            uploadSubtitle={t.uploadSubtitle}
            removeButtonText={t.removeButton}
          />
        </div>
      </div>

      {/* EXTRA */}
      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>{t.healthNotes}</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.description}</label>
          <textarea
            name="description"
            defaultValue={animal?.description}
            className={styles.formTextarea}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              name="vaccinated"
              defaultChecked={animal?.vaccinated}
              className={styles.formCheckbox}
            />
            <span>{t.vaccinated}</span>
          </label>

          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              name="neutered"
              defaultChecked={animal?.neutered}
              className={styles.formCheckbox}
            />
            <span>{t.neutered}</span>
          </label>
        </div>
      </div>

      {/* SUBMIT */}
      <button type="submit" className={styles.submitButton}>
        {animal ? t.saveChanges : t.createAnimal}
      </button>
    </form>
  );
}
