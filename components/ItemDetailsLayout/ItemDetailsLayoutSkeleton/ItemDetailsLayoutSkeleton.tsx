import Skeleton from "@/components/Skeleton/Skeleton";
import styles from "./ItemDetailsLayoutSkeleton.module.scss";

export default function ItemDetailsLayoutSkeleton() {
  return (
    <div className={styles.container}>
      <Skeleton variant="image" />

      <div className={styles.body}>
        <Skeleton variant="title" />

        <div className={styles.badges}>
          <Skeleton variant="button" width="120px" height="32px" />
          <Skeleton variant="button" width="100px" height="32px" />
        </div>

        <div className={styles.description}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="70%" />
        </div>

        <hr className={styles.separator} />

        <Skeleton variant="title" width="200px" />

        <div className={styles.details}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="text" width="80%" />
          ))}
        </div>

        <Skeleton variant="button" />
      </div>
    </div>
  );
}
