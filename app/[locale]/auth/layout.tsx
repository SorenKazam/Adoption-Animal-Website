import styles from "./layout.module.scss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth">
      <body className={styles.authLayout}>{children}</body>
    </html>
  );
}
