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
