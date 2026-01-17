"use client";

import {
  LayoutPanelLeft,
  LayoutDashboard,
  Users,
  LayoutDashboardIcon,
  BookA,
  Settings,
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
      label: t("sidebar.vocabulary_management"),
      items: [
        {
          title: t("sidebar.items.topics"),
          url: "/topics",
          icon: LayoutDashboardIcon,
        },
        {
          title: t("sidebar.vocabularies"),
          url: "/vocabularies",
          icon: BookA,
        },
      ],
    },
    {
      label: t("sidebar.grammar_management"),
      items: [],
    },
    {
      label: t("sidebar.lesson_management"),
      items: [],
    },
    {
      label: t("sidebar.user_management"),
      items: [
        {
          title: t("sidebar.items.users"),
          url: "/users",
          icon: Users,
        },
      ],
    },
    {
      label: t("sidebar.app_config"),
      items: [
        {
          title: t("sidebar.items.settings"),
          url: "/settings",
          icon: Settings,
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
