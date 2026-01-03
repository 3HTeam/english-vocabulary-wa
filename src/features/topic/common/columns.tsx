"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";
import Image from "next/image";
import { formatDate } from "@/lib/format";
import { TopicFormValues } from "../schemas/topic.schema";

interface CreateColumnsOptions {
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  getId?: (data: TopicFormValues) => string;
}

export const createColumns = (
  options?: CreateColumnsOptions
): ColumnDef<TopicFormValues>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên chủ đề" />
    ),
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant={row.getValue("status") ? "success" : "error"}>
            {row.getValue("status") ? "Hiển thị" : "Tạm ẩn"}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh" />
    ),
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("imageUrl")}
          alt="Ảnh"
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
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả" />
    ),
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="truncate font-medium">
            {formatDate(row.getValue("createdAt"), "dd-mm-yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày cập nhật" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="truncate font-medium">
            {formatDate(row.getValue("updatedAt"), "dd-mm-yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={options?.onView}
        onEdit={options?.onEdit}
        onDelete={options?.onDelete}
        getId={options?.getId}
      />
    ),
  },
];

export const columns = createColumns();
