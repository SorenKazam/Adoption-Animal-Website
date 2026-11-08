"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCircleInfo } from "react-icons/fa6";
import styles from "./ApplicationMobileCards.module.scss";
import { ApplicationProps } from "@/types/application";

type Props = {
  applications: ApplicationProps[];
  candidateText: string;
  animalText: string;
  statusText: string;
  dateText: string;
};

export default function ApplicationMobileCards({
  applications,
  candidateText,
  animalText,
  statusText,
  dateText,
}: Props) {
  return (
    <div className={styles.container}>
      {applications.map((application) => (
        <div key={application.id} className={styles.card}>
          <div className={styles.top}>
            <Image
              src={application.animals.image_url}
              alt={application.animals.name}
              width={60}
              height={60}
              className={styles.image}
            />

            <div className={styles.info}>
              <h3>{candidateText}: {application.name}</h3>
              <p>
                {animalText}: {" "}
                <Link href={`/animals/${application.animals.id}`}>
                  {application.animals.name}
                </Link>
              </p>
              <p>{statusText}: {application.animals.adoption_status}</p>
              <p>{dateText}: {application.created_at}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href={`/admin/applications/${application.id}`}>
              <FaCircleInfo />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
