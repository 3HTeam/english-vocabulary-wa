import { defaultMessages } from "@/i18n/default-langs";

type Messages = typeof defaultMessages;

declare global {
  // Use type safe message keys from the default dictionary
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
