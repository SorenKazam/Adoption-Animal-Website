export type iAccessLevel = "public" | "protected" | "admin";

export type iNav = {
  icon?: string;
  labelKey: string;
  href: string;
  accessLevel: iAccessLevel;
};

export type iFooterNav = {
  labelKey: string;
  href: string;
};
