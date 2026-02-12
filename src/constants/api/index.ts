import { EMPTY } from "@/constants/common";

export const AXIOS_CLIENT_TIMEOUT = 15000;
export const AXIOS_REFRESH_TIMEOUT = 60000;

export const AXIOS_CONTENT_TYPE = "application/json";

export const NEXT_PUBLIC_DICTIONARY_API_BASE_URL =
  process.env.NEXT_PUBLIC_DICTIONARY_API_BASE_URL || EMPTY.str;
export const NEXT_PUBLIC_FREEPIK_API_BASE_URL =
  process.env.NEXT_PUBLIC_FREEPIK_API_BASE_URL || EMPTY.str;
export const NEXT_PUBLIC_FREEPIK_API_KEY =
  process.env.NEXT_PUBLIC_FREEPIK_API_KEY || EMPTY.str;
