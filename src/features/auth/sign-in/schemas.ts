/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const getSignInSchema = (t: (key: string, options?: any) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("field.email_required"))
      .email(t("field.email_invalid")),
    password: z
      .string()
      .min(6, t("field.password_min", { min: 6 }))
      .max(64, t("field.password_max", { max: 64 })),
  });

export type SignInFormValues = z.infer<ReturnType<typeof getSignInSchema>>;
