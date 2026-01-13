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
import { get } from "radash";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
} from "@/components/ui";
import { useProfileQuery } from "@/apis";
import { Logo } from "@/assets/images";
import { useTranslations } from "@/hooks";
import { EMPTY } from "@/config";
import { NavMain, NavUser } from "./components";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data: profile, isLoading } = useProfileQuery();
  const t = useTranslations();

  const user = {
    name: get(profile, "data.user.fullName", EMPTY.str),
    email: get(profile, "data.user.email", EMPTY.str),
    avatar: EMPTY.str,
  };

  const navGroups = [
    {
      label: t("sidebar.groups.dashboards"),
      items: [
        {
          title: t("sidebar.items.dashboard"),
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: t("sidebar.items.dashboard2"),
          url: "/dashboard-2",
          icon: LayoutPanelLeft,
        },
      ],
    },
    {
      label: t("sidebar.groups.management"),
      items: [
        {
          title: t("sidebar.items.mail"),
          url: "/mail",
          icon: Mail,
        },
        {
          title: t("sidebar.items.tasks"),
          url: "/tasks",
          icon: CheckSquare,
        },
        {
          title: t("sidebar.items.topics"),
          url: "/topics",
          icon: LayoutDashboardIcon,
        },
        {
          title: t("sidebar.items.chat"),
          url: "/chat",
          icon: MessageCircle,
        },
        {
          title: t("sidebar.items.calendar"),
          url: "/calendar",
          icon: Calendar,
        },
        {
          title: t("sidebar.items.users"),
          url: "/users",
          icon: Users,
        },
      ],
    },
    {
      label: t("sidebar.groups.pages"),
      items: [
        {
          title: t("sidebar.items.landing"),
          url: "/landing",
          target: "_blank",
          icon: LayoutTemplate,
        },
        {
          title: t("sidebar.items.auth"),
          url: "#",
          icon: Shield,
          items: [
            {
              title: `${t("sidebar.items.signin")} 1`,
              url: "/sign-in",
              target: "_blank",
            },
            {
              title: `${t("sidebar.items.signin")} 2`,
              url: "/sign-in-2",
              target: "_blank",
            },
            {
              title: `${t("sidebar.items.signin")} 3`,
              url: "/sign-in-3",
              target: "_blank",
            },
            {
              title: `${t("sidebar.items.signup")} 1`,
              url: "/sign-up",
              target: "_blank",
            },
            {
              title: `${t("sidebar.items.signup")} 2`,
              url: "/sign-up-2",
              target: "_blank",
            },
            {
              title: `${t("sidebar.items.signup")} 3`,
              url: "/sign-up-3",
              target: "_blank",
            },
            {
              title: `${t("sidebar.items.forgot")} 1`,
              url: "/forgot-password",
              target: "_blank",
            },
            {
              title: `${t("sidebar.items.forgot")} 2`,
              url: "/forgot-password-2",
              target: "_blank",
            },
            {
              title: `${t("sidebar.items.forgot")} 3`,
              url: "/forgot-password-3",
              target: "_blank",
            },
          ],
        },
        {
          title: t("sidebar.items.errors"),
          url: "#",
          icon: AlertTriangle,
          items: [
            {
              title: t("sidebar.items.unauthorized"),
              url: "/errors/unauthorized",
              target: "_blank",
            },
            {
              title: t("sidebar.items.forbidden"),
              url: "/errors/forbidden",
              target: "_blank",
            },
            {
              title: t("sidebar.items.not_found"),
              url: "/errors/not-found",
              target: "_blank",
            },
            {
              title: t("sidebar.items.internal_error"),
              url: "/errors/internal-server-error",
              target: "_blank",
            },
            {
              title: t("sidebar.items.maintenance"),
              url: "/errors/under-maintenance",
              target: "_blank",
            },
          ],
        },
        {
          title: t("sidebar.items.settings"),
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
          title: t("sidebar.items.faqs"),
          url: "/faqs",
          icon: HelpCircle,
        },
        {
          title: t("sidebar.items.pricing"),
          url: "/pricing",
          icon: CreditCard,
        },
      ],
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-primary-foreground">
                  {isLoading ? (
                    <Skeleton className="size-full rounded-lg" />
                  ) : (
                    <Image
                      src={Logo}
                      alt="Logo"
                      width={75}
                      height={75}
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-1 h-3 w-32" />
                    </>
                  ) : (
                    <>
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} isLoading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
