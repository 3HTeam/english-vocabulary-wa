import { DashboardLayout as DashboardLayoutContainer } from "@/components/layout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutContainer>{children}</DashboardLayoutContainer>;
}
