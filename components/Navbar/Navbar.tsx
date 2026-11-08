import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import NavbarClient from "./NavbarClient";
import UrgentBanner from "../UrgentBanner/UrgentBanner";
import { MAIN_NAV } from "@/config/navigation";

export default async function Navbar() {
  const locale = await getLocale();
  const t = await getTranslations("Navbar");

  const links = MAIN_NAV.map((link) => ({
    href: link.href,
    label: t(`${link.labelKey}`),
  }));

  const translations = {
    navTitle: t("navTitle"),
    cta: t("cta"),
    links: links,
    hamburgerAriaLabel: t("hamburgerAriaLabel"),
    ctaAriaLabel: t("ctaAriaLabel"),
  };
  return (
    <header>
      <UrgentBanner />
      <NavbarClient locale={locale} translations={translations} />
    </header>
  );
}
