"use client";

import { useMemo, type ComponentProps } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSignInMutation } from "@/apis/queries";
import { Banner } from "@/assets/images";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/utils/shadcn";
import { useAuthStore } from "@/stores";
import { type ApiResponse } from "@/types/api";
import { APP_NAME, EMPTY } from "@/constants/common";
import { AuthHeader, SocialAuth } from "../components";
import { getSignInSchema, type SignInFormValues } from "./schemas";

export function SignIn({ className, ...props }: ComponentProps<"div">) {
  const router = useRouter();
  const t = useTranslations();

  const signInSchema = useMemo(() => getSignInSchema(t), [t]);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: EMPTY.str,
      password: EMPTY.str,
    },
  });

  const { mutate, isPending } = useSignInMutation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = (values: SignInFormValues) => {
    mutate(values, {
      onSuccess: (data) => {
        if (data?.data?.user && data?.data?.session) {
          setAuth(data.data.user, data.data.session);
        }
        toast.success(data?.message || t("auth.signin.ok"));
        router.push(ROUTE_PATH.admin.topics);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data?.message;
        const fallbackMessage = axiosError.message || t("auth.signin.err");
        toast.error(message || fallbackMessage);
      },
    });
  };

  return (
    <div
      className={cn(
        "relative bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10",
        className,
      )}
      {...props}
    >
      <div className="absolute right-0 top-0 z-10 p-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form {...form}>
                <form
                  className="p-6 md:p-8"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  noValidate
                >
                  <div className="flex flex-col gap-4">
                    <AuthHeader
                      title={t("auth.signin.title")}
                      description={t("auth.signin.desc", { name: APP_NAME })}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel htmlFor="email">
                            {t("field.email")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder={t("field.email_placeholder")}
                              autoComplete="email"
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
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <div className="flex items-center">
                            <FormLabel htmlFor="password">
                              {t("field.password")}
                            </FormLabel>
                            <Link
                              href={ROUTE_PATH.auth.forgotPassword}
                              className="ml-auto text-sm underline-offset-2 hover:underline"
                            >
                              {t("auth.signin.forgot")}
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder={t("field.password_placeholder")}
                              autoComplete="current-password"
                              disabled={isPending}
                              {...field}
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
                        t("auth.signin.signin")
                      )}
                    </Button>

                    <SocialAuth isPending={isPending} />

                    <div className="text-center text-sm">
                      {t("auth.signin.no_account")}{" "}
                      <Link
                        href={ROUTE_PATH.auth.signUp}
                        className="underline underline-offset-4"
                      >
                        {t("auth.signup.signup")}
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
              <div className="bg-muted relative hidden md:block">
                <Image
                  src={Banner}
                  alt="Banner"
                  fill
                  className="object-cover dark:brightness-[0.95] dark:invert"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            {t.rich("auth.signin.agree", {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export * from "./schemas";
