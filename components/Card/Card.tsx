import Image from "next/image";
import styles from "./Card.module.scss";
import CardSkeleton from "./skeleton/CardSkeleton";
import CardClient from "./CardClient";
import { getTranslations } from "next-intl/server";

type CardStatus = "available" | "adopted" | "pending";

export type CardProps = {
  id: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  status?: CardStatus;
  title?: string;
  tags?: string;
  description?: string;
  children?: React.ReactNode;
};

export default async function Card(props: CardProps) {
  const t = await getTranslations("CardLabels");
  const { image, imageAlt } = props;
  if (!props.id) return <CardSkeleton />;

  return (
    <CardClient id={props.id} ariaLabelledBy={`card-${props.id}`}>
      {image && imageAlt && (
        <div className={styles.photo}>
          <Image
            src={image}
            alt={imageAlt}
            width={400}
            height={300}
            loading="eager"
          />
          {props.status && (
            <span className={`${styles.status} ${styles[props.status]}`}>
              {t(`statusLabel.${props.status}`)}
            </span>
          )}
        </div>
      )}
      <div className={styles.info}>
        {props.title || props.tags || props.description ? (
          <div className={styles.meta}>
            {props.title && (
              <h2 className={styles.title} id={`card-${props.id}`}>
                {props.title}
              </h2>
            )}
            {props.tags && <p className={styles.tags}>{props.tags}</p>}
          </div>
        ) : null}
        {props.description && (
          <p className={styles.desc}>{props.description}</p>
        )}
        {props.children}
      </div>
    </CardClient>
  );
}
