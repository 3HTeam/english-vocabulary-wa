"use client";

import {
  LayoutPanelLeft,
  LayoutDashboard,
  Mail,
  CheckSquare,
  MessageCircle,
  Calendar,
  Shield,
  AlertTriangle,
  Settings,
  HelpCircle,
  CreditCard,
  LayoutTemplate,
  Users,
  LayoutDashboardIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useProfileQuery } from "@/apis/queries/hooks/auth.queries";
import { Logo } from "@/assets/images";
import { NavMain, NavUser } from "./components";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data: profile, isLoading } = useProfileQuery();
  const data = {
    user: {
      name: profile?.data?.user?.fullName || "",
      email: profile?.data?.user?.email || "",
      avatar: "",
    },
    navGroups: [
      {
        label: "Dashboards",
        items: [
          {
            title: "Dashboard 1",
            url: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Dashboard 2",
            url: "/dashboard-2",
            icon: LayoutPanelLeft,
          },
        ],
      },
      {
        label: "Quản lý",
        items: [
          {
            title: "Mail",
            url: "/mail",
            icon: Mail,
          },
          {
            title: "Tasks",
            url: "/tasks",
            icon: CheckSquare,
          },
          {
            title: "Chủ đề",
            url: "/topics",
            icon: LayoutDashboardIcon,
          },
          {
            title: "Chat",
            url: "/chat",
            icon: MessageCircle,
          },
          {
            title: "Calendar",
            url: "/calendar",
            icon: Calendar,
          },
          {
            title: "Users",
            url: "/users",
            icon: Users,
          },
        ],
      },
      {
        label: "Pages",
        items: [
          {
            title: "Landing",
            url: "/landing",
            target: "_blank",
            icon: LayoutTemplate,
          },
          {
            title: "Auth Pages",
            url: "#",
            icon: Shield,
            items: [
              {
                title: "Sign In 1",
                url: "/sign-in",
              },
              {
                title: "Sign In 2",
                url: "/sign-in-2",
              },
              {
                title: "Sign In 3",
                url: "/sign-in-3",
              },
              {
                title: "Sign Up 1",
                url: "/sign-up",
              },
              {
                title: "Sign Up 2",
                url: "/sign-up-2",
              },
              {
                title: "Sign Up 3",
                url: "/sign-up-3",
              },
              {
                title: "Forgot Password 1",
                url: "/forgot-password",
              },
              {
                title: "Forgot Password 2",
                url: "/forgot-password-2",
              },
              {
                title: "Forgot Password 3",
                url: "/forgot-password-3",
              },
            ],
          },
          {
            title: "Errors",
            url: "#",
            icon: AlertTriangle,
            items: [
              {
                title: "Unauthorized",
                url: "/errors/unauthorized",
              },
              {
                title: "Forbidden",
                url: "/errors/forbidden",
              },
              {
                title: "Not Found",
                url: "/errors/not-found",
              },
              {
                title: "Internal Server Error",
                url: "/errors/internal-server-error",
              },
              {
                title: "Under Maintenance",
                url: "/errors/under-maintenance",
              },
            ],
          },
          {
            title: "Settings",
            url: "#",
            icon: Settings,
            items: [
              {
                title: "User Settings",
                url: "/settings/user",
              },
              {
                title: "Account Settings",
                url: "/settings/account",
              },
              {
                title: "Plans & Billing",
                url: "/settings/billing",
              },
              {
                title: "Appearance",
                url: "/settings/appearance",
              },
              {
                title: "Notifications",
                url: "/settings/notifications",
              },
              {
                title: "Connections",
                url: "/settings/connections",
              },
            ],
          },
          {
            title: "FAQs",
            url: "/faqs",
            icon: HelpCircle,
          },
          {
            title: "Pricing",
            url: "/pricing",
            icon: CreditCard,
          },
        ],
      },
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Image
                    src={Logo}
                    alt="Logo"
                    width={75}
                    height={75}
                    className="object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {profile?.data?.user?.fullName || "ShadcnStore"}
                  </span>
                  <span className="truncate text-xs">
                    {profile?.data?.user?.email || "Admin Dashboard"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
