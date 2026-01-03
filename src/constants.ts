export const LANGUAGES = [
  {
    key: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    key: "vi",
    name: "Tiếng Việt",
    flag: "🇻🇳",
  },
];

export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const EMPTY = {
  str: '',
  obj: {},
  arr: [],
  fn: () => {},
};
