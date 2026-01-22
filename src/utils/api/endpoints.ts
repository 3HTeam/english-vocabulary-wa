import { EMPTY } from "@/constants/common";
import { NEXT_PUBLIC_DICTIONARY_API_BASE_URL, NEXT_PUBLIC_UNSPLASH_API_BASE_URL, NEXT_PUBLIC_ACCESS_KEY_UNSPLASH } from "@/constants/api";

export const getDictionaryApiUrl = (word: string): string => {
  const baseUrl = NEXT_PUBLIC_DICTIONARY_API_BASE_URL || EMPTY.str;
  return `${baseUrl}/entries/en/${word}`;
};

export const getUnsplashPhotoUrl = (query: string): string => {
  const baseUrl = NEXT_PUBLIC_UNSPLASH_API_BASE_URL || EMPTY.str;
  const clientId = NEXT_PUBLIC_ACCESS_KEY_UNSPLASH || EMPTY.str;
  return `${baseUrl}/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${clientId}`;
};
