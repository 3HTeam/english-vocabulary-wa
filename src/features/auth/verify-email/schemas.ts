/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const verifyEmailSchema = (t: (key: string, options?: any) => string) =>
  z.object({
    email: z.string().email(t("field.email_invalid")),
    otp: z
      .string()
      .length(6, t("field.otp_length", { length: 6 }))
      .regex(/^[0-9]+$/, t("field.otp_digits")),
  });

export type VerifyEmailFormValues = z.infer<
  ReturnType<typeof verifyEmailSchema>
>;
