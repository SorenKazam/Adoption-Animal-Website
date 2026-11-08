import styles from "./StatCardSkeleton.module.scss";

export default function StatCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title} />
        <div className={styles.icon} />
      </div>

      <div className={styles.value} />

      <div className={styles.description} />
    </div>
  );
}
