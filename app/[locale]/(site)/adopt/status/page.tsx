import Button from "@/components/Button/Button";
import { getCookie } from "@/lib/utils/cookieJar";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

export default async function AdoptionStatusPage() {
  const t = await getTranslations("AdoptionStatusPage");
  const status = await getCookie("adoption_status");
  if (!status) return redirect("/404");
  return (
    <div className={styles.status}>
      <h1 className={styles.title}>
        {status === "true" ? <FaCircleCheck /> : <FaCircleExclamation />}{" "}
        {t(`status.${status}`)}
      </h1>
      <p>{t(`description.${status}`)}</p>
      <Button variant="primary" url="/" ariaLabel={t("cta")}>
        {t("cta")}
      </Button>
    </div>
  );
}
