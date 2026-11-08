import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import {
  FOOTER_NAV,
  SOCIAL_NAV,
  DONATE_NAV,
  AUTHOR_INFO,
} from "@/config/navigation";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Button from "../Button/Button";
import Logo from "@/components/Logo/Logo";
import { CurrentDate } from "@/lib/utils/date";
import { withLocale } from "@/lib/utils/withLocale";
import Image from "next/image";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const currentYear = CurrentDate("year");
  const links = FOOTER_NAV.map((link) => ({
    href: link.href,
    label: t(`${link.labelKey}`),
  }));
  const socialLinks = SOCIAL_NAV.map((link) => ({
    logo: link.logo,
    href: link.href,
    label: link.label,
  }));
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a href="#" className={styles.footerLogo}>
              <span className={styles.paw}>
                <Logo />
              </span>
              <span className={styles.title}>{t("top.title")}</span>
            </a>
            <p className={styles.footerDescription}>{t("top.description")}</p>
            {socialLinks.length > 0 ? (
              <div className={styles.socialLinks}>
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    className={styles.socialLink}
                    href={link.href}
                    aria-label={`${link.label}`}
                    target="_blank"
                  >
                    <Image
                      src={link.logo}
                      alt={link.label}
                      width={30}
                      height={30}
                    />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className={styles.footerLinks}>
            <h2 className={styles.title}>{t("top.links.title")}</h2>
            {links.length > 0 ? (
              <ul className={styles.links}>
                {links.map((link, index) => (
                  <li key={index} className={styles.link}>
                    <Link
                      href={withLocale(link.href, locale)}
                      aria-label={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className={styles.footerNewsletter}>
            <h3 className={styles.title}>{t("top.newsletter.title")}</h3>
            <p className={styles.description}>
              {t("top.newsletter.description")}
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder={t("top.newsletter.form.emailInputPlaceholder")}
                aria-label={t("top.newsletter.form.emailInputPlaceholder")}
              />
              <Button
                type="button"
                ariaLabel={t("top.newsletter.form.submitButtonLabel")}
                className={styles.newsletterSubmitButton}
              >
                {t("top.newsletter.form.submitButtonText")}
              </Button>
            </form>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            {currentYear} {t("bottom.copyright")}
          </p>
          <p className={styles.copyright}>
            {t("bottom.createdBy")}{" "}
            <Link
              href={AUTHOR_INFO.href}
              target="_blank"
              aria-label={AUTHOR_INFO.name}
              referrerPolicy="no-referrer"
              className={styles.link}
            >
              {AUTHOR_INFO.name}
            </Link>
          </p>
          {DONATE_NAV.length > 0 ? (
            <ul className={styles.donateLinks}>
              {DONATE_NAV.map((item, index) => (
                <li key={index} className={styles.donateLink}>
                  <p key={index} className={styles.text}>
                    {item.label}: {item.value}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
