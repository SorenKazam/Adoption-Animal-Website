import { getTranslations } from "next-intl/server";
import Image from "next/image";
import LabelTitleDescription from "../labelTitleDescription/labelTitleDescription";
import styles from "./About.module.scss";

type Pillar = {
  icon: string;
  title: string;
  text: string;
};

export default async function About() {
  const t = await getTranslations("About");
  const pillars = t.raw("pillars") as Pillar[];
  const bodyImageUrl = t("bodyImage.url");
  const bodyImageAlt = t("bodyImage.alt");
  if (!bodyImageUrl || !bodyImageAlt) {
    return null;
  }
  return (
    <LabelTitleDescription
      sectionId="about"
      label={t("label")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
    >
      <div className={styles.about}>
        {pillars?.length > 0 && (
          <div className={styles.pillars}>
            {pillars.map((pillar, index) => (
              <div className={styles.pillar} key={index}>
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h2 className={styles.pillarTitle}>{pillar.title}</h2>
                <p className={styles.pillarDescription}>{pillar.text}</p>
              </div>
            ))}
          </div>
        )}
        <Image
          src={bodyImageUrl}
          alt={bodyImageAlt}
          className={styles.aboutImage}
          width={400}
          height={400}
          loading="lazy"
        />
      </div>
    </LabelTitleDescription>
  );
}
