import { z } from "zod";

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  otp: z
    .string()
    .trim()
    .length(8, "Mã OTP phải có 8 ký tự")
    .regex(/^[0-9]+$/, "Mã OTP chỉ được chứa chữ số"),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
