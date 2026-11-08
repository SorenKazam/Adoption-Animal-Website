import { getTranslations } from "next-intl/server";
import GoTopButtonClient from "./GoTopButtonClient";

export default async function GoTopButton() {
  const t = await getTranslations("GoTopButton");
  const translations = {
    label: t("label"),
  };
  return <GoTopButtonClient translations={translations} />;
}
