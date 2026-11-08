import Image from "next/image";
import styles from "./ProfileCard.module.scss";
import { logout } from "@/actions/auth/logout";
import Button from "@/components/Button/Button";
import { getTranslations } from "next-intl/server";

interface ProfileCardProps {
  profile: {
    id: string;
    full_name: string;
    avatar_url: string;
    role: string;
    created_at: string;
  };
}

export default async function ProfileCard({ profile }: ProfileCardProps) {
  // Get translations
  const t = await getTranslations("ProfileCard");

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <Image
          src={profile.avatar_url}
          alt={profile.full_name}
          width={64}
          height={64}
          className={styles.avatar}
        />

        <div className={styles.info}>
          <h3>{profile.full_name}</h3>
          <span className={styles.role}>{profile.role}</span>
        </div>
      </div>

      <div className={styles.content}>
        <p>
          <strong>{t("created")}</strong>{" "}
          {new Date(profile.created_at).toLocaleDateString("pt-PT")}
        </p>

        <Button onClick={logout} className={styles.logout}>
          {t("logout")}
        </Button>
      </div>
    </article>
  );
}
