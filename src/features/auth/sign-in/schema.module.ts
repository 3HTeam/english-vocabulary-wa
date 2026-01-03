import { z } from "zod";

export const getSignInSchema = (t: (key: string, options?: any) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("validation.email_required"))
      .email(t("validation.email_invalid")),
    password: z
      .string()
      .min(6, t("validation.password_min", { min: 6 }))
      .max(64, t("validation.password_max", { max: 64 })),
  });

export type SignInFormValues = z.infer<ReturnType<typeof getSignInSchema>>;
