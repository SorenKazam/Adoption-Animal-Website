//LIBRARIES
import { DM_Sans, Fraunces } from "next/font/google";
import { Suspense } from "react";

//COMPONENTS
import Navbar from "@/components/Navbar/Navbar";
import NavbarSkeleton from "@/components/Navbar/skeleton/NavbarSkeleton";
import Footer from "@/components/Footer/Footer";

//i18n and routing config
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { generateSiteMetadata } from "@/config/metadata";

//STYLES
import "@/styles/globals.scss";
import styles from "./layout.module.scss";
import GoTopButton from "@/components/GoTopButton/GoTopButton";

//Types
type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

//Metadata
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  return generateSiteMetadata({
    locale,
  });
}

//FONTS
const fontDMSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fontFraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${fontDMSans.variable} ${fontFraunces.variable} sans-serif`}
      data-scroll-behavior="smooth"
    >
      <body className={`${styles.body}`}>
        <NextIntlClientProvider>
          <Suspense fallback={<NavbarSkeleton />}>
            <Navbar />
          </Suspense>
          <main>{children}</main>
          <Footer />
          <GoTopButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
