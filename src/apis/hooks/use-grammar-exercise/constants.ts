export const GRAMMAR_EXERCISE_QUERY_KEYS = {
  all: ["grammar-exercises"] as const,
  lists: () => [...GRAMMAR_EXERCISE_QUERY_KEYS.all, "list"] as const,
  list: (params?: Record<string, any>) =>
    [...GRAMMAR_EXERCISE_QUERY_KEYS.lists(), params] as const,
  details: () => [...GRAMMAR_EXERCISE_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) =>
    [...GRAMMAR_EXERCISE_QUERY_KEYS.details(), id] as const,
};
