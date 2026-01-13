/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { defaultMessages } from "./languages/default";

// Simple deep merge function to handle nested translation objects
function deepMerge(target: any, source: any) {
  const output = { ...target };
  if (source && typeof source === "object") {
    Object.keys(source).forEach((key) => {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let userMessages = {};
  try {
    userMessages = (await import(`./locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
  }

  // Perform a deep merge: Start with the default JS-defined messages, overlay with current locale JSON
  // This ensures that if a key is missing in the JSON file, the default TS version will be used.
  const messages = deepMerge(defaultMessages, userMessages);

  return {
    locale,
    messages,
  };
});
