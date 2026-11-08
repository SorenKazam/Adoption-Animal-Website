"use client";

import { logout } from "@/actions/auth/logout";
import { FaPowerOff } from "react-icons/fa6";
import Logo from "@/components/Logo/Logo";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { withLocale } from "@/lib/utils/withLocale";
import Image from "next/image";

type SidebarTranslations = {
  navTitle: string;
  navLogout: string;
  links: { icon: string; href: string; label: string }[];
};

type SidebarClientProps = {
  locale: string;
  translations: SidebarTranslations;
};

export default function SidebarClient({
  locale,
  translations,
}: SidebarClientProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Logo size={50} />
          <span className={styles.title}>{translations.navTitle}</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {translations.links.map((item) => (
            <li key={item.href} className={styles.menuItem}>
              <Link
                href={withLocale(item.href, locale)}
                className={styles.link}
              >
                <Image src={item.icon} width={20} height={20} alt="" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button onClick={logout} className={styles.logout}>
          <FaPowerOff />
          <span>{translations.navLogout}</span>
        </button>
      </nav>
    </aside>
  );
}
