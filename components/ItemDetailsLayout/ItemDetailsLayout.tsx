import Image from "next/image";
import styles from "./ItemDetailsLayout.module.scss";
import type { Animal } from "@/types/animals";
import { IoFemale, IoMale } from "react-icons/io5";
import Button from "../Button/Button";
import { FaCat, FaDog, FaEgg, FaRuler } from "react-icons/fa6";
import { MdCake } from "react-icons/md";
import { TbVaccine } from "react-icons/tb";
import { HiScissors } from "react-icons/hi";
import { getBreedName } from "@/lib/features/animals/animals.utils";
import { formatAnimalAge } from "@/lib/utils/formatAnimalAge";
import { getTranslations } from "next-intl/server";

type ItemDetailsProps = {
  locale: string;
  item: Animal;
};

export default async function ItemDetailsLayout({
  item,
  locale,
}: ItemDetailsProps) {
  const t = await getTranslations("ItemDetailsLayout");

  let pronoun;
  let status;
  if (locale === "pt") {
    pronoun = t(`pronouns.${item.gender}`);
  } else {
    pronoun = "";
  }
  if (item.adoption_status === "available") {
    status = t("status.available");
  } else if (item.adoption_status === "adopted") {
    status = t("status.unavailable");
  } else if (item.adoption_status === "pending") {
    status = t("status.pending");
  }
  const animalBreed = getBreedName(item.breed);
  const animalAge = formatAnimalAge(item.age, item.created_at, locale);
  const animalSpecies = t(`animalInfo.species.${item.species}`);
  const animalGender = t(`animalInfo.gender.${item.gender}`);
  const animalVaccinated = t(`animalInfo.vaccinated.${item.vaccinated}`);
  const animalNeutered = t(`animalInfo.neutrized.${item.neutered}`);
  const animalSize = t(`animalInfo.size.${item.size}`);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={item.image_url}
          width={400}
          height={400}
          alt={item.name}
          loading="eager"
        />
      </div>
      <div className={styles.body}>
        {item.name && (
          <h1
            className={styles.title}
          >{`${t("greeting")} ${pronoun} ${item.name}!`}</h1>
        )}
        {item.species && (
          <span className={styles.species}>
            {item.species === "cat" ? <FaCat /> : <FaDog />} {animalSpecies}
          </span>
        )}
        {item.gender && (
          <span className={styles.gender}>
            {item.gender === "male" ? <IoMale /> : <IoFemale />}
            {animalGender}
          </span>
        )}
        {item.description && (
          <p className={styles.description}>{item.description}</p>
        )}
        <hr className={styles.separator} />
        <h2 className={styles.subtitle}>{t("animalInfo.subtitle")}</h2>
        {item.adoption_status && (
          <p className={`${styles.itemDetail} ${styles[item.adoption_status]}`}>
            {status}
          </p>
        )}
        {item.age && (
          <p className={styles.itemDetail}>
            <MdCake /> {t("animalInfo.age")}: {animalAge}
          </p>
        )}
        {item.size && (
          <p className={styles.itemDetail}>
            <FaRuler />
            {t("animalInfo.size.label")}: {animalSize}
          </p>
        )}
        {item.breed && (
          <p className={styles.itemDetail}>
            <FaEgg />
            {t("animalInfo.breed.label")}: {animalBreed}
          </p>
        )}
        {animalVaccinated && (
          <p className={styles.itemDetail}>
            <TbVaccine />
            {t("animalInfo.vaccinated.label")}: {animalVaccinated}
          </p>
        )}
        {animalNeutered && (
          <p className={styles.itemDetail}>
            <HiScissors />
            {t("animalInfo.neutrized.label")}: {animalNeutered}
          </p>
        )}
        {item.adoption_status === "available" ? (
          <Button
            variant="primary"
            url={`/adopt/${item.id}`}
            ariaLabel={`${t("adoptionButtonLabel.available")} ${item.name}`}
          >
            {t("adoptionButtonLabel.available")} {item.name}
          </Button>
        ) : (
          <Button
            variant="disabled"
            ariaLabel={`${t("adoptionButtonLabel.unavailable")}`}
          >
            {status}
          </Button>
        )}
      </div>
    </div>
  );
}
