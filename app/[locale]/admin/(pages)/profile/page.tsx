import ProfileCard from "@/components/admin/ProfileCard/ProfileCard";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import { getProfileById } from "@/lib/supabase/profiles";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function ProfilePage() {
  // Get translations
  const t = await getTranslations("ProfilePage");

  // Connect to Supabase
  const supabase = await createClient();

  // Get auth user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Handle fetch data error
  if (error) {
    console.error(error);
  }

  // Redirect if user is not logged in
  if (!user) {
    redirect("/admin/auth/login");
  }

  // Get profile
  const profile = await getProfileById(user.id);

  // Redirect if profile is not found
  if (!profile) {
    redirect("/admin/auth/login");
  }

  return (
    <LabelTitleDescription
      sectionId="profile"
      title={t("title")}
      description={t("description")}
    >
      <ProfileCard profile={profile} />
    </LabelTitleDescription>
  );
}
