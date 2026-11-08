import styles from "./Window.module.scss";

type windowProps = {
  title: string;
  children: React.ReactNode;
};

export default function Window({ title, children }: windowProps) {
  return (
    <div className={styles.window}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
