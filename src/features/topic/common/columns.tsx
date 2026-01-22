import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";
import { formatDate } from "@/utils/date";
import { DATE_FORMATS } from "@/constants/common";
import { COLUMN_KEYS } from ".";
import { type TopicFormValues } from "../schemas";

interface CreateColumnsOptions {
  t: (key: string, options?: any) => string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onForceDelete?: (id: string) => void;
  getId?: (data: TopicFormValues) => string;
}

export const createColumns = (
  options: CreateColumnsOptions,
): ColumnDef<TopicFormValues>[] => [
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
    accessorKey: COLUMN_KEYS.name,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.topic_name")}
      />
    ),
    meta: {
      name: options.t("field.topic_name"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.status,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.status")}
      />
    ),
    meta: {
      name: options.t("field.status"),
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex items-center">
          <Badge variant={status ? "success" : "error"}>
            {status
              ? options.t("common.status.active")
              : options.t("common.status.inactive")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: COLUMN_KEYS.imageUrl,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.t("field.image")} />
    ),
    meta: {
      name: options.t("field.image"),
    },
    cell: ({ row }) => {
      const imageUrl = row.getValue(COLUMN_KEYS.imageUrl) as string;
      return (
        <Image
          src={imageUrl || "/placeholder.png"}
          alt="Image"
          width={50}
          height={50}
          className="w-[50px] h-[50px] object-contain"
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: COLUMN_KEYS.slug,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.t("field.slug")} />
    ),
    meta: {
      name: options.t("field.slug"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant="outline">{row.getValue("slug")}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: COLUMN_KEYS.description,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.description")}
      />
    ),
    meta: {
      name: options.t("field.description"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    accessorKey: COLUMN_KEYS.updatedAt,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={options.t("field.updated_at")}
      />
    ),
    meta: {
      name: options.t("field.updated_at"),
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="truncate font-medium">
            {formatDate(row.getValue("updatedAt"), DATE_FORMATS.DD_MM_YYYY)}
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
        onDelete={options?.onDelete}
        onRestore={options?.onRestore}
        onForceDelete={options?.onForceDelete}
        getId={options?.getId}
      />
    ),
  },
];
