import styles from "./HowItWorks.module.scss";
import LabelTitleDescription from "../labelTitleDescription/labelTitleDescription";
import { getTranslations } from "next-intl/server";

type HowItWorksProps = {
  translationNamespace: string;
  sectionStyle?: string;
  label?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
};

export default async function HowItWorks(props: HowItWorksProps) {
  const t = await getTranslations(props.translationNamespace);
  const stepsRaw = t.raw("steps");
  const steps = Array.isArray(stepsRaw) ? stepsRaw : [];

  return (
    <LabelTitleDescription
      sectionStyle={styles.section}
      sectionId="howItWorks"
      label={t("label")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
    >
      <div className={styles.howItWorks}>
        {steps.length > 0 && (
          <div className={styles.steps}>
            {steps.map((step, index: number) => (
              <div key={index} className={styles.step}>
                <div className={`${styles.stepNum} ${styles[step.color]}`}>
                  {step.icon}
                </div>
                <div className={styles.stepBody}>
                  {step.type === "urgent" && (
                    <span className={styles.urgenteTag}>{step.tag}</span>
                  )}
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LabelTitleDescription>
  );
}
