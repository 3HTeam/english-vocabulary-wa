import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(6, "Mật khẩu cần tối thiểu 6 ký tự")
    .max(64, "Mật khẩu không được vượt quá 64 ký tự"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
