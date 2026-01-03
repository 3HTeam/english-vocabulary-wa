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
import { useAuthStore } from "@/stores/auth.store";
import { useSignOutMutation } from "@/apis/queries/hooks/auth.queries";
import { Logo } from "@/assets/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const NavUser = ({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { mutate: signOut, data } = useSignOutMutation();

  const handleLogout = () => {
    signOut(undefined, {
      onSuccess: (data) => {
        clearAuth();
        toast.success(data?.message || "Đăng xuất thành công!");
        router.push("/sign-in");
      },
      onError: () => {
        clearAuth();
        toast.success(data?.message || "Đăng xuất thành công!");
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
                <Image
                  src={Logo}
                  alt="Logo"
                  width={75}
                  height={75}
                  className="object-cover"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
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
                  <Image
                    src={Logo}
                    alt="Logo"
                    width={75}
                    height={75}
                    className="object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings/account">
                  <CircleUser />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings/billing">
                  <CreditCard />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings/notifications">
                  <BellDot />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
