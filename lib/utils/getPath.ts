import type { iGetPath } from "@/types/getPath";

//This helper helps creating the correct URL for i18 url path
export function getPath({ locale, path = "" }: iGetPath) {
  if (!path.startsWith("/") && path !== "") {
    path = `/${path}`;
  }
  return `/${locale}${path}`;
}
