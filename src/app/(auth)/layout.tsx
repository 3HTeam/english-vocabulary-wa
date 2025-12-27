import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - Lingo",
  description:
    "Sign in to your account to start building your Lingo",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}
