"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/assets/images";
import Image from "next/image";
import { useVerifyEmailMutation } from "@/apis/tanstack/hooks/auth.tantack";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/base";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "@/features/auth/schemas/verify-email.schema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/shared/language-switcher";

export function VerifyEmail({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const t = useTranslations();

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
        toast.success(data?.message || t("auth.verify.ok"));
        clearSignupEmail();
        router.push("/sign-in");
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data?.message;
        const fallbackMessage = axiosError.message || t("auth.verify.err");
        toast.error(message || fallbackMessage);
      },
    });
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <Form {...form}>
            <form
              className="relative p-6 md:p-8"
              onSubmit={form.handleSubmit(handleSubmit)}
              noValidate
            >
              <div className="absolute right-0 top-0 z-10 p-4">
                <LanguageSwitcher />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-medium"
                    aria-label={t("link.home")}
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
                  <h1 className="text-xl font-bold">
                    {t("auth.verify.title")}
                  </h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    {t("auth.verify.desc")}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel htmlFor="email">{t("field.email")}</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("field.email_placeholder")}
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
                      <FormLabel htmlFor="otp">{t("field.otp")}</FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="otp"
                          render={({ field: { onChange, value } }) => (
                            <InputOTP
                              maxLength={8}
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
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
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
                      {t("auth.verify.loading")}
                    </>
                  ) : (
                    t("auth.verify.submit")
                  )}
                </Button>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    {t("auth.verify.no_code")}{" "}
                  </span>
                  <button
                    type="button"
                    className="underline underline-offset-4 hover:text-primary cursor-pointer"
                    disabled={isPending}
                  >
                    {t("auth.verify.resend")}
                  </button>
                </div>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    {t("auth.verify.back")}{" "}
                  </span>
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {t("link.signin")}
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
