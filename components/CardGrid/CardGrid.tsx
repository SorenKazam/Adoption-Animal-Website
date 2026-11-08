import styles from "./CardGrid.module.scss";
import Card, { CardProps } from "../Card/Card";
import Button from "../Button/Button";
import { getTranslations } from "next-intl/server";

type CardGridProps = {
  items?: CardProps[];
  cardHasCTA?: boolean;
  children?: React.ReactNode;
};

export default async function CardGrid({
  items,
  cardHasCTA,
  children,
}: CardGridProps) {
  const t = await getTranslations("CardLabels");

  // MANUAL MODE
  if (children) {
    return <div className={styles.grid}>{children}</div>;
  }

  // AUTO MAP MODE
  if (!items || items.length === 0) {
    return <p className={styles.noResults}>{t("noResults")}</p>;
  }

  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <Card key={index} {...item}>
          {cardHasCTA &&
            (item.status === "available" ? (
              <Button
                variant="primary"
                ariaLabel={`${t("statusLabelButton.available")} ${item.title}`}
                url={item.href}
              >
                {t("statusLabelButton.available")}
              </Button>
            ) : (
              <Button
                variant="secondary"
                ariaLabel={t(`statusLabelButton.${item.status}`)}
                url={item.href}
              >
                {t(`statusLabelButton.${item.status}`)}
              </Button>
            ))}
        </Card>
      ))}
    </div>
  );
}
