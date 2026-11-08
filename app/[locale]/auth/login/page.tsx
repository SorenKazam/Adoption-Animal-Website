import { LoginForm } from "@/components/admin/LoginForm/LoginForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("LoginPage");
  const tForm = await getTranslations("Login");
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/admin");
  }
  return (
    <main>
      <h1>{t("title")}</h1>
      <LoginForm
        emailLabel={tForm("email")}
        passwordLabel={tForm("password")}
        loginLabel={tForm("login")}
        resetFieldsLabel={tForm("resetFields")}
      />
    </main>
  );
}
