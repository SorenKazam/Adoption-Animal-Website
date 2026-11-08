import Table from "@/components/Table/Table";
import Image from "next/image";
import getApplications, {
  getNumberOfApplications,
} from "@/lib/supabase/applications";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { FaCircleInfo } from "react-icons/fa6";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import ApplicationMobileCards from "@/components/admin/ApplicationMobileCards/ApplicationMobileCards";
import { getTranslations } from "next-intl/server";

const PAGE_SIZE = 25;

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations("AdminApplicationsPage");
  const tMobileCards = await getTranslations("ApplicationMobileCards");

  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const offset = (currentPage - 1) * PAGE_SIZE;
  const [applications, numberOfApplications] = await Promise.all([
    getApplications(PAGE_SIZE, offset),
    getNumberOfApplications(),
  ]);
  const totalPages = Math.ceil(numberOfApplications / PAGE_SIZE);

  return (
    <LabelTitleDescription
      sectionId="applications"
      title={t("title")}
      description={t("description", { count: numberOfApplications })}
    >
      {Array.isArray(applications) && applications.length > 0 ? (
        <>
          <Table
            tableHeaders={[
              t("tableHeaders.photo"),
              t("tableHeaders.animal"),
              t("tableHeaders.candidate"),
              t("tableHeaders.applicationStatus"),
              t("tableHeaders.date"),
              t("tableHeaders.actions"),
            ]}
            tableRows={applications.map((application) => [
              //FOTO
              <Image
                key={application.id}
                src={application.animals.image_url}
                alt={application.animals.name}
                width={100}
                height={100}
              />,

              //ANIMAL
              <Link
                key={application.id}
                href={`/animals/${application.animals.id}`}
              >
                {application.animals.name} <FiArrowUpRight />
              </Link>,
              //CANDIDATO
              application.name,

              //ESTADO
              application.animals.adoption_status,

              //DATA DA SOLICITAÇÃO
              new Date(application.created_at).toLocaleString(),

              //ACTIONS
              <div
                key={application.id}
                style={{ display: "flex", gap: "1rem" }}
              >
                <Link href={`/admin/applications/${application.id}`}>
                  <FaCircleInfo />
                </Link>
              </div>,
            ])}
          />
          {/* Mobile */}
          <ApplicationMobileCards
            applications={applications}
            candidateText={tMobileCards("candidate")}
            animalText={tMobileCards("animal")}
            statusText={tMobileCards("status")}
            dateText={tMobileCards("date")}
          />
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {currentPage > 1 && (
              <Link href={`?page=${currentPage - 1}`}>{t("previousPage")}</Link>
            )}
            <span>{t("pagination", { page: currentPage, totalPages })}</span>
            {currentPage < totalPages && (
              <Link href={`?page=${currentPage + 1}`}>{t("nextPage")}</Link>
            )}
          </div>
        </>
      ) : (
        <p>{t("noApplicationsFound")}</p>
      )}
    </LabelTitleDescription>
  );
}
