/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

import { getSignInSchema } from "../sign-in";

export const getSignUpSchema = (t: (key: string, options?: any) => string) =>
  getSignInSchema(t)
    .extend({
      fullName: z.string().trim().min(1, t("field.full_name_required")),
      confirmPassword: z
        .string()
        .min(6, t("field.password_min", { min: 6 }))
        .max(64, t("field.password_max", { max: 64 })),
      agreeTerms: z
        .boolean()
        .refine((val) => val === true, t("field.agree_terms")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("field.password_mismatch"),
      path: ["confirmPassword"],
    });

export type SignUpFormValues = z.infer<ReturnType<typeof getSignUpSchema>>;
