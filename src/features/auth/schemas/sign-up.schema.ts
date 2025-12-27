import { signInSchema } from "./sign-in.schema";
import { z } from "zod";

export const signUpSchema = signInSchema
  .extend({
    fullName: z.string().trim().min(1, "Họ và tên không được để trống"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu cần tối thiểu 6 ký tự")
      .max(64, "Mật khẩu không được vượt quá 64 ký tự"),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, "Bạn phải đồng ý với điều khoản dịch vụ và chính sách bảo mật"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
