type SidebarNavProps = {
  icon: string;
  labelKey: string;
  href: string;
};

export const SIDEBAR_NAV: SidebarNavProps[] = [
  {
    icon: "/assets/icons/home.svg",
    labelKey: "nav.home",
    href: "/admin",
  },
  {
    icon: "/assets/icons/paw.svg",
    labelKey: "nav.animals",
    href: "/admin/animals",
  },
  {
    icon: "/assets/icons/form.svg",
    labelKey: "nav.applications",
    href: "/admin/applications",
  },
  {
    icon: "/assets/icons/profile.svg",
    labelKey: "nav.profile",
    href: "/admin/profile",
  },
];
