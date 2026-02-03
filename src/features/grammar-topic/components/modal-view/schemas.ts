import { z } from "zod";

export const getSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, t("field.title_required")),
    imageUrl: z
      .string()
      .min(1, t("field.image_required"))
      .url(t("field.image_invalid")),
    slug: z.string().min(1, t("field.slug_required")),
    description: z.string().nullable().optional(),
    content: z.string().min(1, t("field.content_required")),
    status: z.boolean(),
    order: z.number().min(1),
    difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
    levelId: z.string().min(1, t("field.level_required")),
    grammarCategoryId: z.string().min(1, t("field.grammar_category_required")),
  });

export type FormValues = z.infer<ReturnType<typeof getSchema>>;
