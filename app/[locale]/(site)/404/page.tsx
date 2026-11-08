import Link from "next/link";
import styles from "@/styles/notFound.module.scss";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");
  return (
    <main className={styles.notFound}>
      <Image src="/assets/images/404.svg" width={250} height={250} alt="" />
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.description}>{t("description")}</p>
      <Link href="/" className={styles.link}>
        {t("cta")}
      </Link>
    </main>
  );
}
