"use client";

import type { Row } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "@/hooks";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onForceDelete?: (id: string) => void;
  getId?: (data: TData) => string;
}

export function DataTableRowActions<TData>({
  row,
  onView,
  onEdit,
  onDelete,
  onRestore,
  onForceDelete,
  getId,
}: DataTableRowActionsProps<TData>) {
  const t = useTranslations();
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
          <span className="sr-only">{t("data_table.open_menu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {onView && (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onView?.(id)}
            >
              {t("data_table.view")}
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
            {t("data_table.edit")}
            <DropdownMenuShortcut>
              <Pencil />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        {onRestore && (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onRestore?.(id)}
            >
              {t("data_table.restore")}
              <DropdownMenuShortcut>
                <RotateCcw />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onDelete?.(id)}
            >
              {t("data_table.delete")}
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
        {onForceDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onForceDelete?.(id)}
            >
              {t("data_table.force_delete")}
              <DropdownMenuShortcut>
                <Trash2 />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
