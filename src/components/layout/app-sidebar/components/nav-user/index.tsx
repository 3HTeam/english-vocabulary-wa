"use client";

import {
  CreditCard,
  EllipsisVertical,
  LogOut,
  BellDot,
  CircleUser,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { get } from "radash";

import { useAuthStore } from "@/stores";
import { useSignOutMutation } from "@/apis";
import { Logo } from "@/assets/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  Skeleton,
} from "@/components/ui";
import { useTranslations } from "@/hooks";

const NavUser = ({
  user,
  isLoading = false,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  isLoading?: boolean;
}) => {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const t = useTranslations();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { mutate: signOut } = useSignOutMutation();

  const handleLogout = () => {
    signOut(undefined, {
      onSuccess: (data) => {
        clearAuth();
        toast.success(get(data, "message", t("auth.logout_ok")));
        router.push("/sign-in");
      },
      onError: (error: any) => {
        clearAuth();
        toast.error(get(error, "response.data.message", t("auth.signin.err")));
        router.push("/sign-in");
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
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
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </>
                )}
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="h-8 w-8 rounded-lg">
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
                      <span className="text-muted-foreground truncate text-xs">
                        {user.email}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings/account">
                  <CircleUser />
                  {t("auth.user_menu.account")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings/billing">
                  <CreditCard />
                  {t("auth.user_menu.billing")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings/notifications">
                  <BellDot />
                  {t("auth.user_menu.notifications")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut />
              {t("auth.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
