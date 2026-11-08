import { getApplicationById } from "@/lib/supabase/applications";
import LabelTitleDescription from "@/components/sections/labelTitleDescription/labelTitleDescription";
import ApplicationDetails from "@/components/admin/ApplicationDetails/ApplicationDetails";

export type LocaleParams = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function AdminApplicationPage({ params }: LocaleParams) {
  const { id } = await params;
  const application = await getApplicationById(id);
  return (
    <LabelTitleDescription
      sectionId="application"
      title={`Pedido de adocão: ${application.animals.name}`}
    >
      <ApplicationDetails application={application} />
    </LabelTitleDescription>
  );
}
