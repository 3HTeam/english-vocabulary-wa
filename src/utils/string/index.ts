import { EMPTY } from "@/constants/common";

/**
 * Generates a URL-friendly slug from a given string
 * @param text - The input string to convert to a slug
 * @returns A lowercase, hyphenated slug string
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, EMPTY.str)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, EMPTY.str);
};
