"use client";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels } from "../data/data";
import { taskSchema } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  isView?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  isLabel?: boolean;
}

export function DataTableRowActions<TData>({
  row,
  isView = false,
  isEdit = false,
  isDelete = false,
  isLabel = false,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);

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
        {isView && (
          <DropdownMenuItem className="cursor-pointer">Xem</DropdownMenuItem>
        )}
        {isEdit && (
          <DropdownMenuItem className="cursor-pointer">
            Chỉnh sửa
          </DropdownMenuItem>
        )}
        {isLabel && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                Labels
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={task.label}>
                  {labels.map((label) => (
                    <DropdownMenuRadioItem
                      key={label.value}
                      value={label.value}
                      className="cursor-pointer"
                    >
                      {label.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </>
        )}
        {isDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Xóa
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
