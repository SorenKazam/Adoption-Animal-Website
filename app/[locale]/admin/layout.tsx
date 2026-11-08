import "@/styles/globals.scss";
import styles from "./layout.module.scss";
import { Sidebar } from "@/components/admin/Sidebar/Sidebar";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SonnerProvider from "@/components/Providers/SonnerProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const t = await getTranslations("AdminLayout");
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(`/${locale}/auth/login`);
  }

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className={styles.adminLayout}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Breadcrumbs
            rootHref="/admin"
            rootLabel={t("rootLabel")}
            locale={locale}
          />
          {children}
          <SonnerProvider />
        </main>
      </body>
    </html>
  );
}
