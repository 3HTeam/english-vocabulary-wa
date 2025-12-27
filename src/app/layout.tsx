import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProviderWrapper } from "@/components/providers/query-client-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { Toaster } from "@/components/ui/sonner";
import { publicSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Lingo",
  description: "A dashboard to help you build your Lingo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${publicSans.variable} antialiased`}>
      <body className={publicSans.className}>
        <QueryClientProviderWrapper>
          <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
            <SidebarConfigProvider>
              {children}
              <Toaster />
            </SidebarConfigProvider>
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
