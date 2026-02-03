import Image from "next/image";

import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DATE_FORMATS } from "@/constants/common";
import { formatDate } from "@/utils/date";

import { COLUMN_KEYS } from ".";

interface CreateColumnsOptions {
  t: (key: string, options?: any) => string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onForceDelete?: (id: string) => void;
}

export const createColumns = ({
  t,
  onView,
  onEdit,
  onDelete,
  onRestore,
  onForceDelete,
}: CreateColumnsOptions): ColumnDef<any>[] => [
  {
    id: COLUMN_KEYS.id,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="cursor-pointer mr-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="cursor-pointer mr-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: COLUMN_KEYS.title,
    meta: { name: t("field.title") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.title")} />
    ),
    cell: ({ row }) => (
      <span className="max-w-[300px] truncate font-medium">
        {row.getValue("title")}
      </span>
    ),
  },
  {
    accessorKey: COLUMN_KEYS.difficulty,
    meta: { name: t("field.difficulty") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.difficulty")} />
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      const variants = {
        BEGINNER: "default",
        INTERMEDIATE: "secondary",
        ADVANCED: "destructive",
      } as const;
      return (
        <Badge
          variant={variants[difficulty as keyof typeof variants] || "default"}
        >
          {t(`common.difficulty.${difficulty?.toLowerCase()}`)}
        </Badge>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.order,
    meta: { name: t("field.order") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.order")} />
    ),
    cell: ({ row }) => <Badge variant="outline">{row.getValue("order")}</Badge>,
  },
  {
    accessorKey: COLUMN_KEYS.status,
    meta: { name: t("field.status") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.status")} />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={status ? "success" : "error"}>
          {status ? t("common.status.active") : t("common.status.inactive")}
        </Badge>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.grammarCategory,
    meta: { name: t("field.grammar_category") },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={t("field.grammar_category")}
      />
    ),
    cell: ({ row }) => {
      const category = row.original.grammarCategory;
      return (
        <span className="max-w-[200px] truncate">{category?.name || "-"}</span>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.level,
    meta: { name: t("field.level") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.level")} />
    ),
    cell: ({ row }) => {
      const level = row.original.level;
      return level ? (
        <Badge variant="outline">
          {level.code} - {level.name}
        </Badge>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.imageUrl,
    meta: { name: t("field.image") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.image")} />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue(COLUMN_KEYS.imageUrl) as string;
      return (
        <Image
          src={imageUrl || "/placeholder.png"}
          alt="Image"
          width={50}
          height={50}
          className="w-[50px] h-[50px] object-contain rounded"
        />
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.createdAt,
    meta: { name: t("field.created_at") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.created_at")} />
    ),
    cell: ({ row }) => (
      <span className="truncate font-medium">
        {formatDate(row.getValue("createdAt"), DATE_FORMATS.DD_MM_YYYY)}
      </span>
    ),
  },
  {
    id: COLUMN_KEYS.actions,
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onRestore={onRestore}
        onForceDelete={onForceDelete}
      />
    ),
  },
];
