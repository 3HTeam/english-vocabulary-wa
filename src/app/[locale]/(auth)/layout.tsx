import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/assets/images";

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "auth.meta" })

  return {
    title: t("title"),
    description: t("desc"),
    icons: {
      icon: Logo.src,
    },
  }
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
