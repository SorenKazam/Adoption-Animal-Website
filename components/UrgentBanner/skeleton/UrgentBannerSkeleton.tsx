import styles from "./UrgentBannerSkeleton.module.scss";

export default function UrgentBannerSkeleton() {
  return (
    <div className={styles.banner}>
      <div className={styles.text} />
    </div>
  );
}
