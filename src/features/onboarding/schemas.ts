import z from "zod";

export const getOnboardingSchema = (t: (t: string) => string) =>
  z.object({
    title: z.string().min(1, t("field.onboarding_title_required")),
    imageUrl: z
      .string()
      .url(t("field.image_invalid"))
      .optional()
      .or(z.literal("")),
    description: z.string().nullish(),
    status: z.boolean(),
  });

export type OnboardingFormValues = z.infer<
  ReturnType<typeof getOnboardingSchema>
>;
