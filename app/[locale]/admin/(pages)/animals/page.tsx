import Table from "@/components/Table/Table";
import { getAnimals, getNumberOfAnimals } from "@/lib/supabase/animals";
import Image from "next/image";
import { FaCircleInfo } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
import DeleteAnimalButton from "@/components/DeleteAnimalButton/DeleteAnimalButton";
import Link from "next/link";
import { IoAddCircle } from "react-icons/io5";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import AnimalMobileCards from "@/components/admin/AnimalMobileCards/AnimalMobileCards";
import Button from "@/components/Button/Button";
import { getTranslations } from "next-intl/server";

const PAGE_SIZE = 25;

export default async function AdminAnimals({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const t = await getTranslations("AdminAnimalsPage");
  const tDelete = await getTranslations("DeleteAnimalButton");

  const params = await searchParams;

  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const offset = (currentPage - 1) * PAGE_SIZE;

  const [animals, numberOfAnimals] = await Promise.all([
    getAnimals(PAGE_SIZE, offset),
    getNumberOfAnimals(),
  ]);

  const totalPages = Math.ceil(numberOfAnimals / PAGE_SIZE);

  return (
    <LabelTitleDescription
      sectionId="animals"
      title={t("title")}
      description={t("description", { count: numberOfAnimals })}
      actions={
        <Button variant="primary" url="/admin/animals/add">
          <IoAddCircle /> {t("addAnimalButton")}
        </Button>
      }
    >
      {Array.isArray(animals) && animals.length > 0 ? (
        <>
          <Table
            tableHeaders={[
              t("tableHeaders.photo"),
              t("tableHeaders.name"),
              t("tableHeaders.species"),
              t("tableHeaders.adoptionStatus"),
              t("tableHeaders.actions"),
            ]}
            tableRows={animals.map((animal) => [
              <Image
                key={animal.id}
                src={animal.image_url}
                alt={animal.name}
                width={100}
                height={100}
              />,
              animal.name,
              animal.species,
              animal.adoption_status,
              <div key={animal.id} style={{ display: "flex", gap: "1rem" }}>
                <Link href={`/animals/${animal.id}`}>
                  <FaCircleInfo />
                </Link>
                <Link href={`/admin/animals/${animal.id}/edit`}>
                  <PiNotePencilBold />
                </Link>
                <DeleteAnimalButton
                  animalId={animal.id}
                  animalName={animal.name}
                  confirmDeleteText={tDelete("confirmDelete")}
                  deleteText={tDelete("delete")}
                />
              </div>,
            ])}
          />
          {/* Mobile */}
          <AnimalMobileCards
            animals={animals}
            deleteConfirmText={tDelete("confirmDelete")}
            deleteText={tDelete("delete")}
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
        <p>{t("noAnimalsFound")}</p>
      )}
    </LabelTitleDescription>
  );
}
