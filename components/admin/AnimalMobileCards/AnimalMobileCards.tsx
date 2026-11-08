import Image from "next/image";
import Link from "next/link";
import DeleteAnimalButton from "@/components/DeleteAnimalButton/DeleteAnimalButton";
import { FaCircleInfo } from "react-icons/fa6";
import styles from "./AnimalMobileCards.module.scss";
import { Animal } from "@/types/animals";
import { RiFileEditFill } from "react-icons/ri";

type Props = {
  animals: Animal[];
  deleteConfirmText: string;
  deleteText: string;
};

export default function AnimalMobileCards({ animals, deleteConfirmText, deleteText }: Props) {
  return (
    <div className={styles.container}>
      {animals.map((animal) => (
        <div key={animal.id} className={styles.card}>
          <div className={styles.top}>
            <Image
              src={animal.image_url}
              alt={animal.name}
              width={60}
              height={60}
              className={styles.image}
            />

            <div className={styles.info}>
              <h3>{animal.name}</h3>
              <p>{animal.species}</p>
              <span>{animal.adoption_status}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href={`/animals/${animal.id}`}>
              <FaCircleInfo />
            </Link>

            <Link href={`/admin/animals/${animal.id}/edit`}>
              <RiFileEditFill />
            </Link>

            <DeleteAnimalButton
              animalId={animal.id}
              animalName={animal.name}
              confirmDeleteText={deleteConfirmText}
              deleteText={deleteText}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
