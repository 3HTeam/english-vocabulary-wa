import { getSignInSchema } from "../sign-in/schema.module";
import { z } from "zod";

export const getSignUpSchema = (t: (key: string, options?: any) => string) =>
  getSignInSchema(t)
    .extend({
      fullName: z.string().trim().min(1, t("validation.name_required")),
      confirmPassword: z
        .string()
        .min(6, t("validation.password_min", { min: 6 }))
        .max(64, t("validation.password_max", { max: 64 })),
      agreeTerms: z
        .boolean()
        .refine((val) => val === true, t("validation.agree_terms")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.password_mismatch"),
      path: ["confirmPassword"],
    });

export type SignUpFormValues = z.infer<ReturnType<typeof getSignUpSchema>>;
