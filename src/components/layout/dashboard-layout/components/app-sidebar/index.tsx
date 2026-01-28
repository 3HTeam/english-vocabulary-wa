"use client";

import Image from "next/image";
import Link from "next/link";

import { Icon } from "@iconify/react";
import {
  BookA,
  LayoutDashboard,
  LayoutDashboardIcon,
  LayoutPanelLeft,
  Settings,
  Users,
} from "lucide-react";
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
import { EMPTY } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";

import { NavMain, NavUser } from "./components";

const VocabularyIcon = () => (
  <Icon icon="tabler:vocabulary" className="size-4" />
);
const UserIcon = () => <Icon icon="tdesign:usergroup" className="size-4" />;

const SettingsIcon = () => <Icon icon="tdesign:setting-1" className="size-4" />;

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
      label: t("management.management"),
      items: [
        {
          title: t("vocabulary.vocabulary_management"),
          url: "#",
          icon: VocabularyIcon,
          isActive: true,
          items: [
            {
              title: t("topic.topics"),
              url: ROUTE_PATH.admin.topics,
            },
            {
              title: t("vocabulary.vocabularies"),
              url: ROUTE_PATH.admin.vocabularies,
            },
          ],
        },
        {
          title: t("user.user_management"),
          url: "#",
          icon: UserIcon,
          isActive: true,
          items: [
            {
              title: t("user.users"),
              url: ROUTE_PATH.admin.users,
            },
            {
              title: t("level.levels"),
              url: ROUTE_PATH.admin.levels,
            },
          ],
        },
      ],
    },
    {
      label: t("config.app_config"),
      items: [
        {
          title: t("config.settings"),
          url: ROUTE_PATH.admin.settings,
          icon: SettingsIcon,
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
                  <Image
                    src={Logo}
                    alt="English Vocab"
                    width={40}
                    height={40}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    English Vocabulary
                  </span>
                  <span className="truncate text-xs">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navGroups
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <NavMain
              key={group.label}
              label={group.label}
              items={group.items}
            />
          ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} isLoading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
};
