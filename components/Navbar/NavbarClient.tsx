"use client";

import Link from "next/link";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import Logo from "@/components/Logo/Logo";
import { useState } from "react";
import { withLocale } from "@/lib/utils/withLocale";

type NavbarTranslations = {
  navTitle: string;
  cta: string;
  links: { href: string; label: string }[];
  hamburgerAriaLabel: string;
  ctaAriaLabel: string;
};

type NavbarClientProps = {
  locale: string;
  translations: NavbarTranslations;
};

export default function NavbarClient({
  locale,
  translations,
}: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => {
      return !prev;
    });
  };

  return (
    <nav
      className={`
        ${styles.nav}
        ${mobileMenuOpen ? styles.open : ""}
      `}
    >
      {/* LOGO */}
      <Link href="/" className={styles.logo} aria-label="">
        <span className={styles.image}>
          <Logo size={50} />
        </span>
        <span className={styles.text}>{translations.navTitle}</span>
      </Link>

      {/* HAMBURGER */}
      <Button
        type="button"
        variant="hamburger"
        onClick={toggleMenu}
        className={styles.hamburger}
        isActive={mobileMenuOpen}
        ariaLabel={translations.hamburgerAriaLabel}
      />

      {/* CTA DESKTOP */}
      <Button
        type="button"
        variant="primary"
        className={styles.cta}
        ariaLabel={translations.ctaAriaLabel}
        url="/animals"
      >
        {translations.cta}
      </Button>

      {/* LINKS */}
      <ul
        className={`
          ${styles.links}
          ${mobileMenuOpen ? styles.open : ""}
        `}
      >
        {translations.links.map((navItem) => (
          <li key={navItem.href} className={styles.item}>
            <Link
              href={withLocale(navItem.href, locale)}
              onClick={() => setMobileMenuOpen(false)}
            >
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
