import z from "zod";

export const getSettingSchema = (t: (key: string) => string) =>
  z.object({
    appName: z.string(),
    appDescription: z.string().optional(),
    logoUrl: z.string().url().optional(),
    faviconUrl: z.string().url().optional(),
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
    tiktok: z.string().url().optional(),
  });

export type SettingFormValues = z.infer<ReturnType<typeof getSettingSchema>>;
