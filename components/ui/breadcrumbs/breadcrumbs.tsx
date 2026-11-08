"use client";

import Link from "next/link";
import styles from "./breadcrumbs.module.scss";
import { usePathname } from "next/navigation";
import { withLocale } from "@/lib/utils/withLocale";
import { FaHome } from "react-icons/fa";

type BreadcrumbsProps = {
  locale: string;
  rootHref?: string;
  rootLabel?: string;
};

export default function Breadcrumbs({
  locale,
  rootHref = "/",
  rootLabel = "Home",
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const localizedRootHref = withLocale(rootHref, locale);
  const segments = pathname.split("/").filter(Boolean);
  const withoutLocale = segments.filter((segment) => segment !== locale);
  const rootSegment = rootHref.replace("/", "");
  const breadcrumbSegments = withoutLocale.filter(
    (segment) => segment !== rootSegment,
  );

  return (
    <nav className={styles.breadcrumbs}>
      {/* ROOT */}
      <Link href={localizedRootHref} className={styles.root}>
        <FaHome />
        <span>{rootLabel}</span>
      </Link>

      {/* SEGMENTS */}
      {breadcrumbSegments.map((segment, index) => {
        const href =
          "/" +
          [locale, rootSegment]
            .filter(Boolean)
            .concat(breadcrumbSegments.slice(0, index + 1))
            .join("/");

        const isLast = index === breadcrumbSegments.length - 1;

        return (
          <div key={href} className={styles.segment}>
            <span className={styles.separator}>/</span>

            {isLast ? (
              <span className={styles.current}>{formatSegment(segment)}</span>
            ) : (
              <Link href={href} className={styles.link}>
                {formatSegment(segment)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
