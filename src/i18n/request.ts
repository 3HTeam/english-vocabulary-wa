/* eslint-disable @typescript-eslint/no-explicit-any */
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { defaultMessages } from "./default-langs";
import { routing } from "./routing";

// Merges messages based ONLY on keys defined in target (default-langs)
function deepMerge(target: any, source: any) {
  const output: any = {};

  if (!target || typeof target !== "object") {
    return target;
  }

  Object.keys(target).forEach((key) => {
    const targetValue = target[key];
    const sourceValue =
      source && typeof source === "object" ? source[key] : undefined;

    if (
      targetValue &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      // If target is an object, recurse
      output[key] = deepMerge(targetValue, sourceValue);
    } else {
      // If target is a primitive, use source if it exists, otherwise use target
      output[key] = sourceValue !== undefined ? sourceValue : targetValue;
    }
  });

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

  // Perform a target-driven merge: The JS-defined messages (defaultMessages) serve as the template.
  // Only keys present in defaultMessages will be included in the final output.
  // Values from userMessages override defaults if they exist.
  const messages = deepMerge(defaultMessages, userMessages);

  return {
    locale,
    messages,
  };
});
