import { EMPTY } from "@/constants/common";

export const AXIOS_CLIENT_TIMEOUT = 15000;
export const AXIOS_REFRESH_TIMEOUT = 60000;

export const AXIOS_CONTENT_TYPE = "application/json";

export const NEXT_PUBLIC_DICTIONARY_API_BASE_URL = process.env.NEXT_PUBLIC_DICTIONARY_API_BASE_URL || EMPTY.str;
export const NEXT_PUBLIC_UNSPLASH_API_BASE_URL = process.env.NEXT_PUBLIC_UNSPLASH_API_BASE_URL || EMPTY.str;
export const NEXT_PUBLIC_ACCESS_KEY_UNSPLASH = process.env.NEXT_PUBLIC_ACCESS_KEY_UNSPLASH || EMPTY.str;
