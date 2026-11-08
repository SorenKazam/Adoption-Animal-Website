import type { iNav, iFooterNav } from "@/types/navigation";

export const MAIN_NAV: iNav[] = [
  {
    labelKey: "nav.home",
    href: "/",
    accessLevel: "public",
  },
  {
    labelKey: "nav.about",
    href: "#about",
    accessLevel: "public",
  },
  {
    labelKey: "nav.donate",
    href: "#donate",
    accessLevel: "public",
  },
  {
    labelKey: "nav.howItWorks",
    href: "#howItWorks",
    accessLevel: "public",
  },
  {
    labelKey: "nav.contacts",
    href: "#contacts",
    accessLevel: "public",
  },
  {
    labelKey: "nav.animals",
    href: "/animals",
    accessLevel: "public",
  },
];

export const FOOTER_NAV: iFooterNav[] = [
  {
    labelKey: "links.animals",
    href: "/animals",
  },
  {
    labelKey: "links.about",
    href: "#about",
  },
  {
    labelKey: "links.howItWorks",
    href: "#howItWorks",
  },
  {
    labelKey: "links.contacts",
    href: "#contacts",
  },
  {
    labelKey: "links.privacyPolicy",
    href: "/privacy",
  },
];

export const SOCIAL_NAV = [
  {
    logo: "/assets/logos/socials/facebook.svg",
    label: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    logo: "/assets/logos/socials/instagram.svg",
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    logo: "/assets/logos/socials/whatsapp.svg",
    label: "Whatsapp",
    href: "https://www.whatsapp.com/",
  },
];

export const DONATE_NAV = [
  {
    label: "IBAN",
    value: "PT00 0000 0000 00000000000 00",
  },
];

export const AUTHOR_INFO = {
  name: "Tiago Guerreiro",
  href: "https://github.com/sorenkazam",
};
