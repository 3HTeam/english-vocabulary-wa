import z from "zod";

export const getBannerSchema = (t: (t: string) => string) =>
  z.object({
    title: z.string().min(1, t("field.banner_title_required")),
    imageUrl: z
      .string()
      .url(t("field.image_invalid"))
      .optional()
      .or(z.literal("")),
    description: z.string().nullish(),
    status: z.boolean(),
    moduleId: z.string().min(1, t("field.module_required")),
  });

export type BannerFormValues = z.infer<ReturnType<typeof getBannerSchema>>;
