import StatCard from "@/components/admin/StatCard/StatCard";
import StatCardSkeleton from "@/components/admin/StatCard/StatCardSkeleton/StatCardSkeleton";
import CardGrid from "@/components/CardGrid/CardGrid";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import {
  getNumberOfAdoptedAnimals,
  getNumberOfAnimals,
  getNumberOfPendingAnimals,
} from "@/lib/supabase/animals";
import { getNumberOfApplications } from "@/lib/supabase/applications";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FaPaw } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";
import { getTranslations } from "next-intl/server";
import { IoTime } from "react-icons/io5";
import Button from "@/components/Button/Button";

export default async function AdminDashboard() {
  const t = await getTranslations("AdminDashboard");

  //Connect to Supabase
  const supabase = await createClient();

  //Get auth user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //Get user data
  const { data: userData, error: userDataError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!user) redirect("/login");
  if (userDataError)
    throw new Error(`Error fetching user data: ${userDataError.message}`);

  //Get number of animals and applications
  const numberOfAnimals = await getNumberOfAnimals();
  const numberOfAdoptedAnimals = await getNumberOfAdoptedAnimals();
  const numberOfApplications = await getNumberOfApplications();
  const numberOfPendingAnimals = await getNumberOfPendingAnimals();

  return (
    <LabelTitleDescription
      sectionId="admin"
      label={t("label")}
      title={t("welcomeTitle", { name: userData?.full_name || "User" })}
      description={t("description")}
      actions={
        <Button
          url="/admin/profiles"
          ariaLabel="Logout"
          type="button"
          variant="primary"
        >
          {t("profile")}
        </Button>
      }
    >
      <CardGrid cardHasCTA={false}>
        {/* LIST OF ALL ANIMALS */}
        <Suspense fallback={<StatCardSkeleton />}>
          <StatCard
            title={t("animals")}
            description={`${numberOfAnimals} ${t("animalsDescription")}`}
            value={numberOfAnimals}
            href="/admin/animals"
            icon={<FaPaw color="white" />}
          />
        </Suspense>

        {/* NUMBER OF ADOPTED ANIMALS */}
        <Suspense fallback={<StatCardSkeleton />}>
          <StatCard
            title={t("adoptedAnimals")}
            description={`${numberOfAdoptedAnimals} ${t("adoptedAnimalsDescription")}`}
            value={numberOfAdoptedAnimals}
            href="/admin/animals"
            icon={<FaPaw color="white" />}
          />
        </Suspense>

        {/* LIST OF TOTAL APPLICATIONS */}
        <Suspense fallback={<StatCardSkeleton />}>
          <StatCard
            title={t("applications")}
            description={`${numberOfApplications} ${t("applicationsDescription")}`}
            value={numberOfApplications}
            href="/admin/applications"
            icon={<SiGoogleforms color="white" />}
          />
        </Suspense>

        {/* LIST OF PENDING APPLICATIONS */}
        <Suspense fallback={<StatCardSkeleton />}>
          <StatCard
            title={t("pendingApplications")}
            description={`${numberOfPendingAnimals} ${t("applicationsDescription")}`}
            value={numberOfPendingAnimals}
            href="/admin/applications"
            icon={<IoTime color="white" />}
          />
        </Suspense>
      </CardGrid>
    </LabelTitleDescription>
  );
}
