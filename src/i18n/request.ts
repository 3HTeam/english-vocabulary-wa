/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Simple deep merge function to handle nested translation objects
function deepMerge(target: any, source: any) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Load default messages (English) as the base
  const defaultMessages = (await import(`@/i18n/locales/${routing.defaultLocale}.json`)).default;
  
  // Load current locale messages
  const userMessages = (await import(`@/i18n/locales/${locale}.json`)).default;

  // Perform a deep merge: Start with English, overlay with the current locale
  // This ensures that if a nested key like "auth.signin.desc" is missing in vi.json,
  // the English version will be preserved.
  const messages = deepMerge(JSON.parse(JSON.stringify(defaultMessages)), userMessages);

  return {
    locale,
    messages
  };
});
