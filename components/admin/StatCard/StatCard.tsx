import Link from "next/link";
import styles from "./StatCard.module.scss";

type StatCardProps = {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  href,
}: StatCardProps) {
  const Content = (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>

      <div className={styles.value}>{value}</div>

      {description && <div className={styles.description}>{description}</div>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={styles.link}>
        {Content}
      </Link>
    );
  }

  return Content;
}
