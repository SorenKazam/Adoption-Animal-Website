import { getTranslations } from "next-intl/server";
import Button from "@/components/Button/Button";
import styles from "./AdoptionForm.module.scss";
import { submitAdoptionForm } from "@/actions/adoption";
import PhoneInput from "@/components/PhoneInput/PhoneInput";

type AdoptionFormProps = {
  animalId: string;
};

export default async function AdoptionForm({ animalId }: AdoptionFormProps) {
  const t = await getTranslations("AdoptForm");
  return (
    <form className={styles.form} action={submitAdoptionForm}>
      <input type="hidden" name="animalId" value={animalId} />
      <h2 className={styles.formSectionTitle}>{t("userData.sectionTitle")}</h2>

      <label htmlFor="name" className={styles.formNameLabel}>
        {t("userData.name")}
      </label>
      <input
        type="text"
        name="name"
        id="name"
        minLength={3}
        maxLength={120}
        required
      />

      <label htmlFor="email" className={styles.formNameLabel}>
        {t("userData.email")}
      </label>
      <input type="email" name="email" id="email" required />

      <label htmlFor="telephone" className={styles.formNameLabel}>
        {t("userData.phone")}
      </label>
      <PhoneInput />

      <label htmlFor="birthdate" className={styles.formNameLabel}>
        {t("userData.birthdate")}
      </label>
      <input type="date" name="birthdate" id="birthdate" required />

      <label htmlFor="nationality" className={styles.formNameLabel}>
        {t("userData.nationality")}
      </label>
      <input type="text" name="nationality" id="nationality" required />

      <h2 className={styles.formSectionTitle}>{t("address.sectionTitle")}</h2>

      <label htmlFor="address" className={styles.formNameLabel}>
        {t("address.address")}
      </label>
      <input type="text" name="address" id="address" required />

      <label htmlFor="city" className={styles.formNameLabel}>
        {t("address.city")}
      </label>
      <input type="text" name="city" id="city" required />

      <label htmlFor="housingType" className={styles.formNameLabel}>
        {t("address.housingType.title")}
      </label>
      <select name="housingType" id="housingType" required>
        <option value="apartment">{t("address.housingType.apartment")}</option>
        <option value="house">{t("address.housingType.house")}</option>
        <option value="other">{t("address.housingType.other")}</option>
      </select>

      <label htmlFor="housingStatus" className={styles.formNameLabel}>
        {t("address.housingStatus.title")}
      </label>
      <select name="housingStatus" id="housingStatus" required>
        <option value="own">{t("address.housingStatus.own")}</option>
        <option value="rent">{t("address.housingStatus.rent")}</option>
        <option value="other">{t("address.housingStatus.other")}</option>
      </select>

      <label htmlFor="petsAllowed" className={styles.formNameLabel}>
        {t("address.petsAllowed.title")}
      </label>
      <select name="petsAllowed" id="petsAllowed" required>
        <option value="yes">{t("address.petsAllowed.yes")}</option>
        <option value="no">{t("address.petsAllowed.no")}</option>
      </select>

      <h2 className={styles.formSectionTitle}>
        {t("previousPets.sectionTitle")}
      </h2>

      <label htmlFor="previousPets" className={styles.formNameLabel}>
        {t("previousPets.options.title")}
      </label>
      <select name="previousPets" id="previousPets" required>
        <option value="yes">{t("previousPets.options.yes")}</option>
        <option value="no">{t("previousPets.options.no")}</option>
      </select>

      <label htmlFor="currentPets" className={styles.formNameLabel}>
        {t("previousPets.currentPets")}
      </label>
      <textarea name="currentPets" id="currentPets" />

      <h2 className={styles.formSectionTitle}>{t("routine.sectionTitle")}</h2>

      <label htmlFor="hoursAlone" className={styles.formNameLabel}>
        {t("routine.hoursAlone")}
      </label>
      <input
        type="number"
        name="hoursAlone"
        id="hoursAlone"
        min="0"
        max="24"
        required
      />

      <label htmlFor="responsiblePerson" className={styles.formNameLabel}>
        {t("routine.responsiblePerson")}
      </label>
      <input
        type="text"
        name="responsiblePerson"
        id="responsiblePerson"
        required
      />

      <h2 className={styles.formSectionTitle}>{t("resident.sectionTitle")}</h2>

      <label htmlFor="resident" className={styles.formNameLabel}>
        {t("resident.isResident.title")}
      </label>
      <select name="resident" id="resident" required>
        <option value="yes">{t("resident.isResident.yes")}</option>
        <option value="no">{t("resident.isResident.no")}</option>
      </select>

      <label htmlFor="stayDuration" className={styles.formNameLabel}>
        {t("resident.duration")}
      </label>
      <input type="text" name="stayDuration" id="stayDuration" />

      <label htmlFor="movingPlans" className={styles.formNameLabel}>
        {t("resident.movePlans.title")}
      </label>
      <select name="movingPlans" id="movingPlans" required>
        <option value="no">{t("resident.movePlans.no")}</option>
        <option value="yes">{t("resident.movePlans.yes")}</option>
      </select>

      <h2 className={styles.formSectionTitle}>
        {t("commitment.sectionTitle")}
      </h2>

      <label htmlFor="vetCare" className={styles.formNameLabel}>
        {t("commitment.commitment.title")}
      </label>
      <select name="vetCare" id="vetCare" required>
        <option value="yes">{t("commitment.commitment.yes")}</option>
        <option value="no">{t("commitment.commitment.no")}</option>
      </select>

      <label htmlFor="comments" className={styles.formNameLabel}>
        {t("otherInfo")}
      </label>
      <textarea name="comments" id="comments" />

      <Button type="submit" variant="primary" ariaLabel={t("submitAriaLabel")}>
        {t("submit")}
      </Button>
    </form>
  );
}
