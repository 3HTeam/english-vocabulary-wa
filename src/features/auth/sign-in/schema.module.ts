import { z } from "zod";

export const getSignInSchema = (t: (key: string, options?: any) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("field.validation.email_required"))
      .email(t("field.validation.email_invalid")),
    password: z
      .string()
      .min(6, t("field.validation.password_min", { min: 6 }))
      .max(64, t("field.validation.password_max", { max: 64 })),
  });

export type SignInFormValues = z.infer<ReturnType<typeof getSignInSchema>>;
