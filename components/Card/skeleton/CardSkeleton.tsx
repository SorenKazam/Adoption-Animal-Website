"use client";

import styles from "./CardSkeleton.module.scss";

export default function CardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`}>
      <div className={styles.photo}>
        <span className={styles.status} />
      </div>
      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.title} />
          <span className={styles.tags} />
        </div>
        <p className={styles.desc} />
        <div className={styles.btn} />
      </div>
    </div>
  );
}
