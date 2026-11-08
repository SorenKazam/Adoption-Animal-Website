import { CardProps } from "@/components/Card/Card";
import { ApplicationProps } from "@/types/application";

export function mapApplicationToCard(application: ApplicationProps): CardProps {
  return {
    id: application.id,
    title: application.animals.name,
    image: application.animals.image_url,
    imageAlt: application.animals.name,
    status: application.animals.adoption_status,
    description: application.animals.description,
    href: `/admin/applications/${application.id}`,
  };
}

export function mapApplicationToTable(application: ApplicationProps) {
  return {
    hasdasda: application.animals.name,
  };
}
