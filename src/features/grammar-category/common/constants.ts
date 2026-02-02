export const COLUMN_KEYS = {
  id: "id",
  name: "name",
  status: "status",
  imageUrl: "imageUrl",
  slug: "slug",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  actions: "actions",
} as const;

export type ColumnKey = (typeof COLUMN_KEYS)[keyof typeof COLUMN_KEYS];
