import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/app/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProviderWrapper } from "@/components/providers/query-client-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { Toaster } from "@/components/ui/sonner";
import { publicSans } from "@/lib/fonts";
import { routing } from "@/lib/i18n/routing";


export const metadata: Metadata = {
  title: "Lingo",
  description: "A dashboard to help you build your Lingo",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${publicSans.variable} antialiased mdl-js`}>
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
