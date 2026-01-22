export const APP_NAME = process.env.APP_NAME || "Lingo";
export const DEBOUNCE_TIME = 500;
export const MOBILE_BREAKPOINT = 768;

export const DATE_FORMATS = {
  DD_MM_YYYY: "dd-mm-yyyy",
  MM_DD_YYYY: "mm-dd-yyyy",
  YYYY_MM_DD: "yyyy-mm-dd",
};

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const EMPTY = {
  str: "",
  obj: {},
  arr: [],
  fn: () => {},
};

export const MODES = {
  add: 'add',
  edit: 'edit',
  view: 'view',
  clone: 'clone',
};