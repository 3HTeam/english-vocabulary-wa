import z from "zod";

export const getPopupSchema = (t: (t: string) => string) =>
  z.object({
    title: z.string().min(1, t("field.popup_title_required")),
    imageUrl: z
      .string()
      .url(t("field.image_invalid"))
      .optional()
      .or(z.literal("")),
    description: z.string().nullish(),
    status: z.boolean(),
    moduleId: z.string().min(1, t("field.module_required")),
  });

export type PopupFormValues = z.infer<ReturnType<typeof getPopupSchema>>;
