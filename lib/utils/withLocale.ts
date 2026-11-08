export function withLocale(href: string, locale: string) {
  // external links
  if (href.startsWith("http")) return href;

  // homepage
  if (href === "/") return `/${locale}`;

  // anchors (#about)
  if (href.startsWith("#")) {
    return `/${locale}/${href}`;
  }

  // already root-relative (/animals, /contact)
  if (href.startsWith("/")) {
    return `/${locale}${href}`;
  }

  // fallback
  return `/${locale}/${href}`;
}
