"use client";

import { useMemo, type ComponentProps } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useVerifyEmailMutation } from "@/apis/queries";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { EMPTY } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";
import { AuthHeader } from "@/features/auth/components";
import { useTranslations } from "@/hooks";
import { Link, useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/stores";
import { type ApiResponse } from "@/types/api";
import { cn } from "@/utils/shadcn";

import { verifyEmailSchema, type VerifyEmailFormValues } from "./schemas";

export function VerifyEmail({ className, ...props }: ComponentProps<"div">) {
  const router = useRouter();
  const t = useTranslations();

  const schema = useMemo(() => verifyEmailSchema(t), [t]);

  const signupEmail = useAuthStore((state) => state.signupEmail);
  const clearSignupEmail = useAuthStore((state) => state.clearSignupEmail);
  const setAuth = useAuthStore((state) => state.setAuth);
  const defaultEmail = signupEmail || EMPTY.str;

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: defaultEmail,
      otp: EMPTY.str,
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
        router.push(ROUTE_PATH.auth.signIn);
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
    <div className="relative bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="absolute right-0 top-0 z-10 p-4">
        <LanguageSwitcher />
      </div>
      <div
        className={cn("w-full max-w-sm flex flex-col gap-6", className)}
        {...props}
      >
        <Card className="overflow-hidden p-0">
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(handleSubmit)}
              noValidate
            >
              <div className="flex flex-col gap-4">
                <AuthHeader
                  title={t("auth.verify.title")}
                  description={t("auth.verify.desc")}
                />
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
                  render={() => (
                    <FormItem className="grid gap-3">
                      <FormLabel htmlFor="otp">{t("field.otp_code")}</FormLabel>
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
                              containerClassName="justify-center w-full"
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
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
                      {t("common.loading")}
                    </>
                  ) : (
                    t("auth.verify.send_code")
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
                    {t("auth.verify.resend_code")}
                  </button>
                </div>
                <div className="text-center text-sm">
                  <Link
                    href={ROUTE_PATH.auth.signIn}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {t("auth.back_to_sign_in")}
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
