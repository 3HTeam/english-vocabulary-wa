const PUBLIC_PATH = {
  home: "/",
};

const AUTH_PATH = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  verifyEmail: "/verify-email",
};

// Base paths for better maintainability
const ADMIN_BASE_PATHS = {
  vocabulary: "/vocabulary",
  grammar: "/grammar",
  user: "/user",
} as const;

const ADMIN_PATH = {
  dashboard: "/dashboard",
  dashboard2: "/dashboard-2",

  // Vocabulary routes
  vocabulary: ADMIN_BASE_PATHS.vocabulary,
  vocabularies: `${ADMIN_BASE_PATHS.vocabulary}/vocabularies`,
  vocabularyTopics: `${ADMIN_BASE_PATHS.vocabulary}/topics`,

  // Grammar routes
  grammar: ADMIN_BASE_PATHS.grammar,
  grammarCategories: `${ADMIN_BASE_PATHS.grammar}/categories`,
  grammarExercises: `${ADMIN_BASE_PATHS.grammar}/exercises`,
  grammarTopics: `${ADMIN_BASE_PATHS.grammar}/topics`,

  // User routes
  user: ADMIN_BASE_PATHS.user,
  users: `${ADMIN_BASE_PATHS.user}/users`,
  userLevels: `${ADMIN_BASE_PATHS.user}/levels`,

  settings: "/settings",
  modules: "/modules",
  onboardings: "/onboardings",
  popups: "/popups",
  banners: "/banners",
};

export const ROUTE_PATH = {
  public: PUBLIC_PATH,
  auth: AUTH_PATH,
  admin: ADMIN_PATH,
};

// Helper function to get all routes under a base path
export const getRoutesByBase = (basePath: keyof typeof ADMIN_BASE_PATHS) => {
  return Object.entries(ADMIN_PATH)
    .filter(([_, path]) => path.startsWith(ADMIN_BASE_PATHS[basePath]))
    .reduce((acc, [key, path]) => ({ ...acc, [key]: path }), {});
};
