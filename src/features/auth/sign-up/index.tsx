"use client";

import { useMemo, type ComponentProps } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useSignUpMutation } from "@/apis/queries";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/utils/shadcn";
import { useAuthStore } from "@/stores";
import { type ApiResponse } from "@/types/api";
import { AuthHeader, SocialAuth } from "@/features/auth/components";
import { APP_NAME, EMPTY } from "@/constants/common";
import { getSignUpSchema, type SignUpFormValues } from "./schemas";

export function SignUp({ className, ...props }: ComponentProps<"div">) {
  const router = useRouter();
  const t = useTranslations();

  const signUpSchema = useMemo(() => getSignUpSchema(t), [t]);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: EMPTY.str,
      password: EMPTY.str,
      fullName: EMPTY.str,
      confirmPassword: EMPTY.str,
      agreeTerms: false,
    },
  });

  const { mutate, isPending } = useSignUpMutation();
  const setSignupEmail = useAuthStore((state) => state.setSignupEmail);

  const handleSubmit = (SignUpValues: SignUpFormValues) => {
    const { email, password, fullName } = SignUpValues;
    mutate(
      { email, password, fullName: fullName.trim() },
      {
        onSuccess: (data) => {
          setSignupEmail(email);
          toast.success(data?.message || t("auth.signup.ok"));
          router.push(ROUTE_PATH.auth.verifyEmail);
        },
        onError: (error: unknown) => {
          const axiosError = error as AxiosError<ApiResponse>;
          const message = axiosError.response?.data?.message;
          const fallbackMessage = axiosError.message || t("auth.signup.err");
          toast.error(message || fallbackMessage);
        },
      },
    );
  };

  return (
    <div className="relative bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="absolute right-0 top-0 z-10 p-4">
        <LanguageSwitcher />
      </div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(handleSubmit)}
              noValidate
            >
              <div className="flex flex-col gap-4">
                <AuthHeader
                  title={t("auth.signup.title", { name: APP_NAME })}
                  description={t("auth.signup.desc", { name: APP_NAME })}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel htmlFor="fullName">
                        {t("field.full_name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder={t("field.full_name_placeholder")}
                          autoComplete="fullName"
                          required
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-3 flex-1">
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">
                            {t("field.password")}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder={t("field.password_placeholder")}
                            autoComplete="current-password"
                            required
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-3 flex-1">
                        <div className="flex items-center">
                          <FormLabel htmlFor="confirmPassword">
                            {t("field.confirm_password")}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder={t("field.password_placeholder")}
                            autoComplete="confirmPassword"
                            required
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {t.rich("auth.signup.agree", {
                          termsLink: (chunks) => (
                            <Link
                              href={ROUTE_PATH.public.home}
                              className="underline underline-offset-4 hover:text-primary"
                            >
                              {chunks}
                            </Link>
                          ),
                          privacyLink: (chunks) => (
                            <Link
                              href={ROUTE_PATH.public.home}
                              className="underline underline-offset-4 hover:text-primary"
                            >
                              {chunks}
                            </Link>
                          ),
                          termsLabel: t("auth.link.terms"),
                          privacyLabel: t("auth.link.privacy"),
                        })}
                      </FormLabel>
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
                    t("auth.signup.signup")
                  )}
                </Button>

                <SocialAuth isPending={isPending} />

                <div className="text-center text-sm">
                  {t("auth.signup.has_account")}{" "}
                  <Link
                    href={ROUTE_PATH.auth.signIn}
                    className="underline underline-offset-4"
                  >
                    {t("auth.signin.signin")}
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
