import { withLocale } from "@/lib/utils/withLocale";
import { redirect } from "next/navigation";

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function AdminAnimalPage({ params }: Props) {
  const { locale, id } = await params;

  redirect(withLocale(`/animals/${id}`, locale));
}
