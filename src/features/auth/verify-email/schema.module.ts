import { z } from "zod";

export const verifyEmailSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("validation.email_required"))
      .email(t("validation.email_invalid")),
    otp: z
      .string()
      .trim()
      .length(6, t("validation.otp_length"))
      .regex(/^[0-9]+$/, t("validation.otp_digits")),
  });

export type VerifyEmailFormValues = z.infer<
  ReturnType<typeof verifyEmailSchema>
>;
