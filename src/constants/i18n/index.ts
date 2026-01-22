export const LANGUAGES = [
  {
    key: "vi",
    name: "Tiếng Việt",
    flag: "🇻🇳",
  },
  {
    key: "en",
    name: "English",
    flag: "🇬🇧",
  },
];

export const LOCALES = LANGUAGES.map((lang) => lang.key);

export const DEFAULT_LOCALE = LANGUAGES[0].key;

export const LOCALE_PREFIX = "always";
