import { z } from "zod";

export const getLevelSchema = (t: (key: string) => string) =>
  z.object({
    code: z.string().min(1, t("field.code_required")),
    name: z.string().min(1, t("field.level_name_required")),
    description: z.string().nullable().optional(),
    order: z.coerce.number(),
    status: z.boolean(),
  });

export type LevelFormValues = z.infer<ReturnType<typeof getLevelSchema>>;
