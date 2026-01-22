import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { DEFAULT_LOCALE, LOCALE_PREFIX, LOCALES } from "@/constants/i18n";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,

  // Optional: adds locale to URL (recommended)
  localePrefix: LOCALE_PREFIX,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
