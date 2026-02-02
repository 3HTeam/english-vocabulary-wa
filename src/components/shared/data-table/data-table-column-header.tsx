"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "@/hooks";
import { cn } from "@/utils/shadcn";

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const {
    getCanSort,
    getIsSorted,
    getCanHide,
    clearSorting,
    toggleVisibility,
  } = column;
  const t = useTranslations();

  if (!getCanSort() && !getCanHide()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const isSorted = !!getIsSorted();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent cursor-pointer"
          >
            <span>{title}</span>
            {getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {getCanSort() && (
            <>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="cursor-pointer"
              >
                <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                {t("data_table.asc")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="cursor-pointer"
              >
                <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                {t("data_table.desc")}
              </DropdownMenuItem>
              {isSorted && (
                <DropdownMenuItem
                  onClick={() => clearSorting()}
                  className="cursor-pointer"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground/70" />
                  {t("data_table.reset")}
                </DropdownMenuItem>
              )}
            </>
          )}
          {getCanSort() && getCanHide() && (
            <DropdownMenuSeparator />
          )}
          {getCanHide() && (
            <DropdownMenuItem
              onClick={() => toggleVisibility(false)}
              className="cursor-pointer"
            >
              <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
              {t("data_table.hide")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
