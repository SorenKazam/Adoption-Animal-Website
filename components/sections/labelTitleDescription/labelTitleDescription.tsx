import Section from "@/components/ui/section/Section";
import Container from "@/components/ui/container/Container";
import styles from "./labelTitleDescription.module.scss";

type Props = {
  sectionId: string;
  sectionStyle?: string;
  label?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function LabelTitleDescription({
  sectionId,
  sectionStyle,
  label,
  title,
  titleHighlight,
  description,
  children,
  actions,
}: Props) {
  return (
    <Section sectionId={sectionId} className={sectionStyle}>
      <Container>
        <div className={styles.labelTitleDescription}>
          {(label || title || description) && (
            <div className={styles.header}>
              {label && <span className={styles.label}>{label}</span>}

              {title && (
                <h1 className={styles.title}>
                  {title}{" "}
                  {titleHighlight && (
                    <em className={styles.titleHighlight}>{titleHighlight}</em>
                  )}
                </h1>
              )}

              {description && (
                <p className={styles.description}>{description}</p>
              )}

              {actions && <div className={styles.actions}>{actions}</div>}
            </div>
          )}

          <div className={styles.content}>{children}</div>
        </div>
      </Container>
    </Section>
  );
}
