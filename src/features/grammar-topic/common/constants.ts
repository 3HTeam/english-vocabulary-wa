export const COLUMN_KEYS = {
  id: "id",
  title: "title",
  status: "status",
  imageUrl: "imageUrl",
  slug: "slug",
  description: "description",
  content: "content",
  difficulty: "difficulty",
  order: "order",
  level: "level",
  grammarCategory: "grammarCategory",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
} as const;

export type ColumnKey = (typeof COLUMN_KEYS)[keyof typeof COLUMN_KEYS];
