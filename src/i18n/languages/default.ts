import { auth } from "./dicts/auth";
import { field } from "./dicts/field";
import { sidebar } from "./dicts/sidebar";
import { common } from "./dicts/common";

export const defaultMessages = {
  auth,
  field,
  sidebar,
  common,
} as const;

export type MessageKeys = typeof defaultMessages;
