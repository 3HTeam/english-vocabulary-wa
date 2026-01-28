import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DATE_FORMATS } from "@/constants/common";
import { TUser } from "@/types/features/user";
import { formatDate } from "@/utils/date";

import { COLUMN_KEYS } from "./constants";

interface CreateColumnsOptions {
  t: (key: string, options?: any) => string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  getId?: (data: TUser) => string;
}

const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const createColumns = (
  options: CreateColumnsOptions,
): ColumnDef<TUser>[] => [
  {
    id: COLUMN_KEYS.id,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="translate-y-[2px] cursor-pointer"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] cursor-pointer"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: COLUMN_KEYS.fullName,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.full_name")}
      />
    ),
    meta: {
      name: options.t("field.full_name"),
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || undefined} alt={user.fullName} />
            <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
          </Avatar>
          <span className="max-w-[200px] truncate font-medium">
            {user.fullName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.t("field.email")} />
    ),
    meta: {
      name: options.t("field.email"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[250px] truncate">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.role,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.t("field.role")} />
    ),
    meta: {
      name: options.t("field.role"),
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={role === "ADMIN" ? "default" : "secondary"}>
          {role === "ADMIN"
            ? options.t("user.role.admin")
            : options.t("user.role.user")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: COLUMN_KEYS.emailVerified,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.email_verified")}
      />
    ),
    meta: {
      name: options.t("field.email_verified"),
    },
    cell: ({ row }) => {
      const verified = row.getValue("emailVerified");
      return (
        <Badge variant={verified ? "success" : "error"}>
          {verified
            ? options.t("common.status.verified")
            : options.t("common.status.unverified")}
        </Badge>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.dailyGoal,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.daily_goal")}
      />
    ),
    meta: {
      name: options.t("field.daily_goal"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="font-medium">{row.getValue("dailyGoal")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.streak,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.streak")}
      />
    ),
    meta: {
      name: options.t("field.streak"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant="outline">{row.getValue("streak")} 🔥</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.createdAt,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.created_at")}
      />
    ),
    meta: {
      name: options.t("field.created_at"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="truncate font-medium">
            {formatDate(row.getValue("createdAt"), DATE_FORMATS.DD_MM_YYYY)}
          </span>
        </div>
      );
    },
  },
  {
    id: COLUMN_KEYS.actions,
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={options?.onView}
        onEdit={options?.onEdit}
        getId={options?.getId}
      />
    ),
  },
];
