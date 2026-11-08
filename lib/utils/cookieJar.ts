import { cookies } from "next/headers";

//TYPES
type CookieOptions = {
  httpOnly?: boolean;
  path?: string;
  sameSite?: "lax" | "strict" | "none";
  maxAge?: number;
};

//SET COOKIES
export async function setCookie(
  key: string,
  value: string,
  options: CookieOptions = {},
) {
  const cookieStore = await cookies();

  cookieStore.set(key, value, {
    httpOnly: options.httpOnly ?? true, // Auto set to true by default for security
    path: options.path ?? "/", // Auto set to / (root) by default
    sameSite: options.sameSite ?? "strict", // Auto set to strict for security
    secure: process.env.NODE_ENV === "production", // Auto set to true in production
    maxAge: options.maxAge ?? 60, // 60 Seconds by default
  });
}

//GET COOOKIES
export async function getCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}

export async function deleteCookie(key: string) {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}
