"use client";

import { useMemo, type ComponentProps } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { EMPTY } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/shadcn";
import { AuthHeader } from "../components";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "./schemas";

export function ForgotPassword({ className, ...props }: ComponentProps<"div">) {
  const t = useTranslations();

  const schema = useMemo(() => forgotPasswordSchema(t), [t]);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: EMPTY.str,
    },
  });

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    console.log(values);
  };

  return (
    <div
      className={cn(
        "relative bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
        className,
      )}
      {...props}
    >
      <div className="absolute right-0 top-0 z-10 p-4">
        <LanguageSwitcher />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card className="p-6 md:p-8">
          <CardContent className="p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid gap-6"
                noValidate
              >
                <AuthHeader
                  title={t("auth.forgot_password.title")}
                  description={t("auth.forgot_password.desc")}
                />
                <div className="grid gap-4">
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
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full cursor-pointer">
                    {t("auth.forgot_password.submit")}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  {t("auth.forgot_password.remember")}{" "}
                  <Link
                    href={ROUTE_PATH.auth.signIn}
                    className="underline underline-offset-4"
                  >
                    {t("auth.back_to_sign_in")}
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
