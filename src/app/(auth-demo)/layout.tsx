import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - English Vocabulary Dashboard",
  description: "Sign in to your account to start building your English vocabulary",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
