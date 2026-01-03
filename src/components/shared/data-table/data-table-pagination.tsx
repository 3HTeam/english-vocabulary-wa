"use client";

import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  page?: number;
  pageCount?: number;
  limit?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

export function DataTablePagination<TData>({
  table,
  page,
  pageCount,
  limit,
  total,
  onPageChange,
}: DataTablePaginationProps<TData>) {
  const isServerPagination =
    typeof page === "number" && typeof pageCount === "number";

  const currentPage = isServerPagination
    ? page
    : table.getState().pagination.pageIndex + 1;

  const totalPages = isServerPagination ? pageCount : table.getPageCount();

  const rowsPerPage = isServerPagination
    ? limit ?? table.getState().pagination.pageSize
    : table.getState().pagination.pageSize;

  const handleFirstPage = () => {
    if (!isServerPagination) {
      table.setPageIndex(0);
      return;
    }
    onPageChange?.(1);
  };

  const handlePrevPage = () => {
    if (!isServerPagination) {
      table.previousPage();
      return;
    }
    if (page && page > 1) {
      onPageChange?.(page - 1);
    }
  };

  const handleNextPage = () => {
    if (!isServerPagination) {
      table.nextPage();
      return;
    }
    if (page && page < (pageCount ?? 0)) {
      onPageChange?.(page + 1);
    }
  };

  const handleLastPage = () => {
    if (!isServerPagination) {
      table.setPageIndex(table.getPageCount() - 1);
      return;
    }
    if (pageCount) {
      onPageChange?.(pageCount);
    }
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {isServerPagination
          ? total ?? table.getFilteredRowModel().rows.length
          : table.getFilteredRowModel().rows.length}{" "}
        row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          {isServerPagination ? (
            <div className="text-sm">{rowsPerPage}</div>
          ) : (
            <Select
              value={`${rowsPerPage}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px] cursor-pointer">
                <SelectValue placeholder={rowsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem
                    key={pageSize}
                    value={`${pageSize}`}
                    className="cursor-pointer"
                  >
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex cursor-pointer disabled:cursor-not-allowed"
            onClick={handleFirstPage}
            disabled={
              isServerPagination
                ? currentPage <= 1
                : !table.getCanPreviousPage()
            }
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 cursor-pointer disabled:cursor-not-allowed"
            onClick={handlePrevPage}
            disabled={
              isServerPagination
                ? currentPage <= 1
                : !table.getCanPreviousPage()
            }
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 cursor-pointer disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={
              isServerPagination
                ? currentPage >= totalPages
                : !table.getCanNextPage()
            }
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex cursor-pointer disabled:cursor-not-allowed"
            onClick={handleLastPage}
            disabled={
              isServerPagination
                ? currentPage >= totalPages
                : !table.getCanNextPage()
            }
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
