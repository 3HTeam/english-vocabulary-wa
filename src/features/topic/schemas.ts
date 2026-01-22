import { z } from "zod";

export const getTopicSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("field.topic_name_required")),
    imageUrl: z
      .string()
      .min(1, t("field.image_required"))
      .url(t("field.image_invalid")),
    slug: z.string().min(1, t("field.slug_required")),
    description: z.string().nullable().optional(),
    status: z.boolean(),
  });

export type TopicFormValues = z.infer<ReturnType<typeof getTopicSchema>>;
