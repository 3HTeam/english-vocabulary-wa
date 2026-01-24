import { notFound } from "next/navigation";

import { hasLocale, NextIntlClientProvider } from "next-intl";

import "@/app/globals.css";

import { getMessages } from "next-intl/server";

import { publicSans } from "@/assets/styles";
import {
  QueryClientProviderWrapper,
  SidebarConfigProvider,
  ThemeProvider,
} from "@/components/shared/providers";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  // Kiểm tra locale hợp lệ
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${publicSans.variable} antialiased`}>
      <body className={publicSans.className}>
        <NextIntlClientProvider messages={messages}>
          <QueryClientProviderWrapper>
            <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
              <SidebarConfigProvider>
                {children}
                <Toaster />
              </SidebarConfigProvider>
            </ThemeProvider>
          </QueryClientProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
