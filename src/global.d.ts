import { defaultMessages } from "./i18n/languages/default";

type Messages = typeof defaultMessages;

declare global {
  // Use type safe message keys from the default dictionary
  interface IntlMessages extends Messages {}
}
