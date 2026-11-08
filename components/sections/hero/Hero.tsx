import Container from "@/components/ui/container/Container";
import styles from "./Hero.module.scss";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type HeroButton = {
  label: string;
  url: string;
  ariaLabel: string;
  variant?: "primary" | "secondary";
};

type HeroProps = {
  translationNamespace: string;
  heroCards?: string[];
  showStats?: boolean;
  showCards?: boolean;
  buttons?: HeroButton[];
};

export default async function Hero({
  translationNamespace,
  heroCards = [],
  showStats = false,
  showCards = false,
  buttons,
}: HeroProps) {
  const t = await getTranslations(translationNamespace);
  const heroCardsData = Array.isArray(heroCards) ? heroCards : [];

  const defaultButtons: HeroButton[] = [
    {
      label: t("buttons.primary"),
      url: "/",
      ariaLabel: t("buttons.primaryAriaLabel"),
      variant: "primary",
    },
    {
      label: t("buttons.secondary"),
      url: "/",
      ariaLabel: t("buttons.secondaryAriaLabel"),
      variant: "secondary",
    },
  ];

  const buttonsList = buttons || defaultButtons;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.background} />

      <div className={styles.paws}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{t("backgroundPaw")}</span>
        ))}
      </div>

      <Container>
        <div className={styles.content}>
          <div className={styles.badge}>{t("badge")}</div>
          <h1 className={styles.title}>
            {t("title.line1")}
            <br />
            {t("title.line2")}
            <em>{t("title.highlight")}</em>
          </h1>
          <p className={styles.sub}>{t("subtitle")}</p>
          {}
          <div className={styles.buttons}>
            {buttonsList.map((btn, index) => (
              <Button
                key={index}
                variant={btn.variant || "primary"}
                url={btn.url}
                ariaLabel={btn.ariaLabel}
              >
                {btn.label}
              </Button>
            ))}
          </div>

          {showStats && (
            <div className={styles.stats}>
              <div className={styles.stat}>
                <strong>{t("stats.animalsSaved.value")}</strong>
                <span>{t("stats.animalsSaved.label")}</span>
              </div>

              <div className={styles.stat}>
                <strong>{t("stats.happyAdoptions.value")}</strong>
                <span>{t("stats.happyAdoptions.label")}</span>
              </div>

              <div className={styles.stat}>
                <strong>{t("stats.yearsHelping.value")}</strong>
                <span>{t("stats.yearsHelping.label")}</span>
              </div>
            </div>
          )}
        </div>
      </Container>

      {showCards && heroCardsData.length >= 2 && (
        <div className={styles.imageRow}>
          {heroCardsData.map((card, index) => (
            <div key={index} className={styles.imageCard}>
              <Image
                src={card}
                alt={t("imageRow.alt")}
                width={200}
                height={200}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
