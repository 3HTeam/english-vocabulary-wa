import {
  NEXT_PUBLIC_DICTIONARY_API_BASE_URL,
  NEXT_PUBLIC_FREEPIK_API_BASE_URL,
  NEXT_PUBLIC_FREEPIK_API_KEY,
} from "@/constants/api";
import { EMPTY } from "@/constants/common";

export const getDictionaryApiUrl = (word: string): string => {
  const baseUrl = NEXT_PUBLIC_DICTIONARY_API_BASE_URL || EMPTY.str;
  return `${baseUrl}/entries/en/${word}`;
};

export const getFreepikSearchUrl = (term: string): string => {
  const baseUrl = NEXT_PUBLIC_FREEPIK_API_BASE_URL || EMPTY.str;
  return `${baseUrl}?term=${encodeURIComponent(term)}&limit=1&order=relevance`;
};

export const getFreepikHeaders = (): HeadersInit => ({
  "x-freepik-api-key": NEXT_PUBLIC_FREEPIK_API_KEY,
});
