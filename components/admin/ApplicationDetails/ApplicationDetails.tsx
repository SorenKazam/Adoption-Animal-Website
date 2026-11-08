import Link from "next/link";
import styles from "./ApplicationDetails.module.scss";
import { ApplicationProps } from "@/types/application";
import { getTranslations } from "next-intl/server";
import ApplicationActions from "./ApplicationActions";
import Image from "next/image";

export default async function ApplicationDetails({
  application,
}: {
  application: ApplicationProps;
}) {
  const animal = application.animals;
  const t = await getTranslations("ApplicationDetails");
  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>{application.name}</h2>
        <p className={styles.meta}>
          {t("createdAt")}{" "}
          {new Date(application.created_at).toLocaleDateString()}
        </p>

        <span className={styles.status}>{animal.adoption_status}</span>
      </div>

      {/* ANIMAL */}
      <section className={styles.card}>
        <h3>{t("requestedAnimal")}</h3>

        <div className={styles.animal}>
          <Image
            src={animal.image_url}
            alt={animal.name}
            width={60}
            height={60}
          />

          <div>
            <Link href={`/animals/${animal.id}`}>
              <h4>{animal.name}</h4>
            </Link>

            <p>
              {animal.species} • {animal.breed} • {animal.gender}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTOS */}
      <section className={styles.card}>
        <h3>{t("contacts")}</h3>

        <div className={styles.grid}>
          <div>
            <label>{t("email")}</label>
            <p>{application.email}</p>
          </div>

          <div>
            <label>{t("phone")}</label>
            <p>
              {application.country_code} {application.phone_number}
            </p>
          </div>
        </div>
      </section>

      {/* DADOS PESSOAIS */}
      <section className={styles.card}>
        <h3>{t("personalData")}</h3>

        <div className={styles.grid}>
          <div>
            <label>{t("birthdate")}</label>
            <p>{application.birthdate}</p>
          </div>

          <div>
            <label>{t("nationality")}</label>
            <p>{application.nationality}</p>
          </div>

          <div>
            <label>{t("address")}</label>
            <p>
              {application.address}, {application.city}
            </p>
          </div>

          <div>
            <label>{t("housing")}</label>
            <p>
              {application.housing_type} • {application.housing_status}
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section className={styles.card}>
        <h3>{t("experienceRoutine")}</h3>

        <div className={styles.grid}>
          <div>
            <label>{t("previousPets")}</label>
            <p>{application.previous_pets ? t("yes") : t("no")}</p>
          </div>

          <div>
            <label>{t("currentPets")}</label>
            <p>{application.current_pets || t("none")}</p>
          </div>

          <div>
            <label>{t("hoursAlone")}</label>
            <p>{application.hours_alone}h</p>
          </div>

          <div>
            <label>{t("stayDuration")}</label>
            <p>{application.stay_duration}</p>
          </div>
        </div>
      </section>

      {/* EXTRAS */}
      {application.comments && (
        <section className={styles.card}>
          <h3>{t("comments")}</h3>
          <p className={styles.comments}>{application.comments}</p>
        </section>
      )}

      {/* ACTIONS */}
      <ApplicationActions
        application={application}
        acceptText={t("accept")}
        rejectText={t("reject")}
      />
    </div>
  );
}
