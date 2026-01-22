import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/assets/images";
import { SignIn } from "@/features/auth";
import { APP_NAME } from "@/constants/common";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.signin" });

  return {
    title: t("title", { name: APP_NAME }),
    description: t("desc", { name: APP_NAME }),
    icons: {
      icon: Logo.src,
    },
  };
}
export default function SignInPage() {
  return <SignIn />;
}
