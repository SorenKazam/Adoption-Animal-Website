import { getTranslations } from "next-intl/server";
import styles from "./Features.module.scss";
import LabelTitleDescription from "../labelTitleDescription/labelTitleDescription";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

type FeaturesProps = {
  translationNamespace: string;
};
export default async function Features(props: FeaturesProps) {
  const t = await getTranslations(props.translationNamespace);
  const features = await t.raw("features");
  return (
    <LabelTitleDescription
      sectionId="donate"
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
      label={t("label")}
      sectionStyle={styles.section}
    >
      <div className={styles.features}>
        {Array.isArray(features) &&
          features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.header}>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={45}
                  height={45}
                />
                <h2 className={styles.title}>{feature.title}</h2>
                <p className={styles.description}>{feature.description}</p>
              </div>
              <Link href={feature.cta.href} className={styles.cta}>
                {feature.cta.label} <FiArrowUpRight />
              </Link>
            </div>
          ))}
      </div>
    </LabelTitleDescription>
  );
}
