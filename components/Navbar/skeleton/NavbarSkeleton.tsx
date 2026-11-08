import styles from "./NavbarSkeleton.module.scss";

export default function NavbarSkeleton() {
  return (
    <>
      <div className={styles.banner} />
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoIcon} />
          <div className={styles.logoText} />
        </div>
        <div className={styles.cta} />
        <ul className={styles.links}>
          <li />
          <li />
          <li />
        </ul>
      </nav>
    </>
  );
}
