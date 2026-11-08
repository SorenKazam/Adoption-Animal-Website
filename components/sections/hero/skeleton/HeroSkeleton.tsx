import Container from "@/components/ui/container/Container";
import styles from "./HeroSkeleton.module.scss";

export default function HeroSkeleton() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} />

      {/* Paw decor skeleton */}
      <div className={styles.paws}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={styles.paw} />
        ))}
      </div>

      <Container>
        <div className={styles.content}>
          <div className={styles.badge} />

          <div className={styles.title}>
            <div className={styles.line} />
            <div className={styles.lineShort} />
          </div>

          <div className={styles.sub} />

          <div className={styles.buttons}>
            <div className={styles.buttonPrimary} />
            <div className={styles.buttonSecondary} />
          </div>

          <div className={styles.stats}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statNumber} />
                <div className={styles.statLabel} />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className={styles.imageRow}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.imageCard} />
        ))}
      </div>
    </section>
  );
}
