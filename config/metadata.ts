import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WEBSITE_CONFIG } from "./website";

type GenerateMetadataProps = {
  locale: string;
};

export async function generateSiteMetadata({
  locale,
}: GenerateMetadataProps): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is missing");
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("default.title"),
      template: `%s | ${WEBSITE_CONFIG.name}`,
    },

    description: t("default.description"),

    keywords: t.raw("default.keywords"),

    authors: [
      {
        name: WEBSITE_CONFIG.name,
        url: siteUrl,
      },
    ],

    creator: WEBSITE_CONFIG.name,
    publisher: WEBSITE_CONFIG.name,

    icons: {
      icon: [
        { url: "/favicon.ico" },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],

      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },

    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: `${siteUrl}/pt`,
        en: `${siteUrl}/en`,
        "x-default": siteUrl,
      },
    },

    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      url: `${siteUrl}/${locale}`,
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      siteName: WEBSITE_CONFIG.name,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt"),
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/twitter-og-image.png"],
    },
    category: "non-profit",
  };
}
