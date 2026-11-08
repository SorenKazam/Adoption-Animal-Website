export const WEBSITE_CONFIG = {
  name: "ADOPTION",
  url: process.env.NEXT_PUBLIC_SITE_URL!,
  locales: ["pt", "en"] as const,
  defaultLocale: "pt",
  openGraphLocales: {
    pt: "pt_PT",
    en: "en_US",
  },
} as const;
