import styles from "./Section.module.scss";

type SectionProps = {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Section({
  sectionId,
  children,
  className = "",
  style,
}: SectionProps) {
  return (
    <section
      className={`${styles.section} ${className}`}
      id={sectionId}
      style={style}
    >
      {children}
    </section>
  );
}
