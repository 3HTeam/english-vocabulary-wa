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

import { useProfileQuery } from "@/apis/queries";
import { Logo } from "@/assets/images";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "@/hooks";
import { EMPTY } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";

import { NavMain, NavUser } from "./components";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { data: profile, isLoading } = useProfileQuery();
  const t = useTranslations();

  const user = {
    name: get(profile, "data.user.fullName", EMPTY.str),
    email: get(profile, "data.user.email", EMPTY.str),
    avatar: EMPTY.str,
  };

  const navGroups = [
    {
      label: t("dashboard.dashboard"),
      items: [
        {
          title: t("dashboard.dashboard"),
          url: ROUTE_PATH.admin.dashboard,
          icon: LayoutDashboard,
        },
        {
          title: t("dashboard.dashboard2"),
          url: ROUTE_PATH.admin.dashboard2,
          icon: LayoutPanelLeft,
        },
      ],
    },

    {
      label: t("topic.topic_management"),
      items: [
        {
          title: t("topic.topics"),
          url: ROUTE_PATH.admin.topics,
          icon: BookA,
        },
      ],
    },

    {
      label: t("vocabulary.vocabulary_management"),
      items: [
        {
          title: t("vocabulary.vocabularies"),
          url: ROUTE_PATH.admin.vocabularies,
          icon: BookA,
        },
      ],
    },

    {
      label: t("grammar.grammar_management"),
      items: [],
    },
    {
      label: t("lesson.lesson_management"),
      items: [],
    },
    {
      label: t("user.user_management"),
      items: [
        {
          title: t("user.users"),
          url: ROUTE_PATH.admin.users,
          icon: Users,
        },
      ],
    },
    {
      label: t("config.app_config"),
      items: [
        {
          title: t("config.settings"),
          url: ROUTE_PATH.admin.settings,
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
                      className="object-cover rounded-md"
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
