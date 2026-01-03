"use client";

import type { Row } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  getId?: (data: TData) => string;
}

export function DataTableRowActions<TData>({
  row,
  onView,
  onEdit,
  onDelete,
  getId,
}: DataTableRowActionsProps<TData>) {
  // Use getId function if provided, otherwise try to extract id from data
  const id = getId 
    ? getId(row.original) 
    : (row.original as { id?: string })?.id || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted cursor-pointer"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {onView && (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onView?.(id)}
            >
              Xem
              <DropdownMenuShortcut>
                <Eye />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
        {onEdit && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onEdit?.(id)}
          >
            Chỉnh sửa
            <DropdownMenuShortcut>
              <Pencil />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onDelete?.(id)}
            >
              Xóa
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
