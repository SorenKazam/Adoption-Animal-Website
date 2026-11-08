import { SIDEBAR_NAV } from "@/config/admin/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import SidebarClient from "./SidebarClient";

export async function Sidebar() {
  const locale = await getLocale();
  const t = await getTranslations("Admin.Sidebar");

  const links = SIDEBAR_NAV.map((link) => ({
    icon: link.icon,
    href: link.href,
    label: t(`${link.labelKey}`),
  }));

  const translations = {
    navTitle: t("navTitle"),
    navLogout: t("navLogout"),
    links: links,
  };
  return <SidebarClient locale={locale} translations={translations} />;
}
