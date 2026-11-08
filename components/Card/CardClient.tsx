import styles from "./Card.module.scss";

type Props = {
  id: string;
  ariaLabelledBy: string;
  children: React.ReactNode;
};

export default function CardClient({ ariaLabelledBy, children }: Props) {
  return (
    <article className={styles.card} aria-labelledby={ariaLabelledBy}>
      {children}
    </article>
  );
}
