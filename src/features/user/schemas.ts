import { z } from "zod";

export const getUserSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("field.email_invalid")),
    fullName: z.string().min(1, t("field.full_name_required")),
    role: z.enum(["ADMIN", "USER"]),
    avatar: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    levelId: z.string().nullable().optional(),
    targetLevel: z.string().nullable().optional(),
    dailyGoal: z.coerce.number().min(0).default(0),
    streak: z.coerce.number().min(0).default(0),
    emailVerified: z.boolean().optional(),
  });

export type UserFormValues = z.infer<ReturnType<typeof getUserSchema>>;
