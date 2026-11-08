import Link from "next/link";
import LabelTitleDescription from "../labelTitleDescription/labelTitleDescription";
import styles from "./Contacts.module.scss";
import { MAIN_CONTACT } from "@/config/contacts";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Contacts() {
  const t = await getTranslations("Contacts");
  const imageUrl = t("backgroundImageUrl");
  const imageAlt = t("backgroundImageAlt");

  if (!MAIN_CONTACT) return;
  return (
    <LabelTitleDescription
      sectionId="contacts"
      sectionStyle={styles.section}
      label={t("label")}
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      description={t("description")}
    >
      <div className={styles.contactsWrapper}>
        {MAIN_CONTACT && (
          <div className={styles.contacts} id="contacts">
            {MAIN_CONTACT.map((contact, index) => (
              <div key={index} className={styles.contactItem}>
                <div className={styles.contactIcon}>{contact.icon}</div>

                <div>
                  <div className={styles.contactLabel}>
                    {t(contact.labelKey)}
                  </div>

                  <div className={styles.contactValue}>
                    <Link
                      href={contact.href}
                      aria-label={contact.value}
                      target="_blank"
                    >
                      {contact.value}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {imageUrl && imageAlt && (
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={400}
            height={400}
            className={styles.contactsImg}
            loading="lazy"
          />
        )}
      </div>
    </LabelTitleDescription>
  );
}
