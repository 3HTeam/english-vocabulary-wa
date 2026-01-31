import { z } from "zod";

export const forgotPasswordSchema = (
  t: (key: string, options?: any) => string,
) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("field.email_required"))
      .email(t("field.email_invalid")),
  });

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;
