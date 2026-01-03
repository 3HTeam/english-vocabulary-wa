import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ROUTE_PATH } from "@/config/routes";
import LanguageSwitcher from "@/components/shared/language-switcher";

export function ForgotPassword({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "relative bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
        className
      )}
      {...props}
    >
      <div className="absolute right-0 top-0 z-10 p-4">
        <LanguageSwitcher />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {t("auth.forgot_password.title")}
            </CardTitle>
            <CardDescription>{t("auth.forgot_password.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">{t("field.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("field.email_placeholder")}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full cursor-pointer">
                    {t("auth.forgot_password.submit")}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  {t("auth.forgot_password.remember")}{" "}
                  <Link
                    href={ROUTE_PATH.signIn}
                    className="underline underline-offset-4"
                  >
                    {t("auth.forgot_password.back")}
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
