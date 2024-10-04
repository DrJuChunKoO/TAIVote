"use server";

import { cookies, headers } from "next/headers";
import { match } from "@formatjs/intl-localematcher";
import { Locale, defaultLocale, locales } from "../i18n/config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
  const userPreferences = [
    cookies().get(COOKIE_NAME)?.value,
    headers().get("accept-language")?.split(",")[0],
  ].filter(Boolean) as string[];

  return match(userPreferences, locales, defaultLocale) as Locale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
