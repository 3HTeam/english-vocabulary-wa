"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import Logo from "@/assets/logo.png";
import Banner from "@/assets/banner.png";
import Link from "next/link";
import Image from "next/image";
import type { AxiosError } from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { useVerifyEmailMutation } from "@/apis";
import { ApiResponse } from "@/types";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "../../verify-email/schema.module";

export function VerifyEmail({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const signupEmail = useAuthStore((state) => state.signupEmail);
  const clearSignupEmail = useAuthStore((state) => state.clearSignupEmail);
  const setAuth = useAuthStore((state) => state.setAuth);
  const defaultEmail = signupEmail || "";

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: defaultEmail,
      otp: "",
    },
  });

  const { mutate, isPending } = useVerifyEmailMutation();

  const handleSubmit = (values: VerifyEmailFormValues) => {
    mutate(values, {
      onSuccess: (data) => {
        if (data?.data?.user && data?.data?.session) {
          setAuth(data.data.user, data.data.session);
        }
        toast.success(data?.message || "Xác thực email thành công!");
        clearSignupEmail();
        router.push("/sign-in");
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data?.message;
        const fallbackMessage =
          axiosError.message || "Xác thực email thất bại, vui lòng thử lại.";
        toast.error(message || fallbackMessage);
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <Form {...form}>
          <form
            className="p-6 md:p-8"
            onSubmit={form.handleSubmit(handleSubmit)}
            noValidate
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-medium"
                  aria-label="Quay lại trang chủ"
                >
                  <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-md">
                    <Image
                      src={Logo}
                      alt="Logo"
                      width={75}
                      height={75}
                      className="object-cover"
                    />
                  </div>
                </Link>
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-bold">Xác thực email</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Vui lòng nhập mã OTP đã được gửi đến email của bạn
                </p>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="nguyenvana@gmail.com"
                        autoComplete="email"
                        required
                        disabled={isPending || !!signupEmail}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel htmlFor="otp">Mã OTP</FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="otp"
                        render={({ field: { onChange, value } }) => (
                          <InputOTP
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                            value={value}
                            onChange={onChange}
                            disabled={isPending}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-transparent border-l-current border-t-current" />
                    Đang xác thực...
                  </>
                ) : (
                  "Xác thực email"
                )}
              </Button>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Không nhận được mã?{" "}
                </span>
                <button
                  type="button"
                  className="underline underline-offset-4 hover:text-primary"
                  disabled={isPending}
                >
                  Gửi lại mã
                </button>
              </div>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Quay lại </span>
                <Link
                  href="/sign-in"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
