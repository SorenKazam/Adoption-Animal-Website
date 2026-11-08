import { getTranslations } from "next-intl/server";
import styles from "./UrgentBanner.module.scss";

export default async function UrgentBanner() {
  const t = await getTranslations("UrgentBanner");

  const emphasis = t("emphasis");
  const message = t("message");

  if (!emphasis || !message) {
    return null;
  }

  return (
    <div className={styles.container}>
      <p className={styles.message}>
        <strong>{emphasis}</strong> {message}
      </p>
    </div>
  );
}
