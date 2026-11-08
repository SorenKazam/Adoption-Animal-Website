import type { iContact } from "@/types/contacts";

export const MAIN_CONTACT: iContact[] = [
  {
    icon: "📞",
    labelKey: "contactOptions.phone",
    href: "tel:+123000000000",
    value: "+123 000 000 000",
  },
  {
    icon: "📱",
    labelKey: "contactOptions.mobile",
    href: "tel:+123000000000",
    value: "+123 000 000 000",
  },
  {
    icon: "✉️",
    labelKey: "contactOptions.email",
    href: "mailto:zK4aH@example.com",
    value: "zK4aH@example.com",
  },
  {
    icon: "📍",
    labelKey: "contactOptions.location",
    href: "https://www.google.com/maps",
    value: "Rua da Calheta, 2, 2o andar, 5a",
  },
];
