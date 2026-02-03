export const AUTH_ENDPOINTS = {
  login: "admin/auth/login",
  logout: "admin/auth/logout",
  refresh: "admin/auth/refresh",
  register: "admin/auth/register",
  me: "admin/auth/me",
  verifyEmail: "admin/auth/verify-email",
  profile: "admin/auth/profile",
} as const;

export const TOPIC_ENDPOINTS = {
  base: "admin/topics",
};

export const UPLOAD_ENDPOINTS = {
  upload: "/uploads",
} as const;

export const VOCABULARY_ENDPOINTS = {
  base: "admin/vocabularies",
} as const;

export const LEVEL_ENDPOINTS = {
  base: "admin/levels",
} as const;

export const USER_ENDPOINTS = {
  base: "admin/users",
} as const;

export const SETTING_ENDPOINTS = {
  base: "admin/settings",
} as const;

export const GRAMMAR_CATEGORY_ENDPOINTS = {
  base: "admin/grammar-categories",
} as const;

export const GRAMMAR_TOPIC_ENDPOINTS = {
  base: "admin/grammar-topics",
} as const;

export const GRAMMAR_EXERCISE_ENDPOINTS = {
  base: "admin/grammar-exercises",
} as const;
