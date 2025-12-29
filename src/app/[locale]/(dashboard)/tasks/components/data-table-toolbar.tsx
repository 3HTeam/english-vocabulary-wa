"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { AddTaskModal } from "./add-task-modal";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import type { Task } from "../data/schema";

export type FacetOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type FacetFilterConfig = {
  columnId: string;
  title: string;
  options: FacetOption[];
};

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onAddTask?: (task: Task) => void;
  placeholder?: string;
  searchColumn?: string;
  filters?: FacetFilterConfig[];
}

export function DataTableToolbar<TData>({
  table,
  onAddTask,
  placeholder = "Tìm kiếm...",
  searchColumn = "title",
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const activeFilters = filters ?? [];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] cursor-text"
        />
        {activeFilters.map((filter) => {
          const column = table.getColumn(filter.columnId);
          if (!column) return null;
          return (
            <DataTableFacetedFilter
              key={filter.columnId}
              column={column}
              title={filter.title}
              options={filter.options}
            />
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 cursor-pointer"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      <AddTaskModal titleAdd="Thêm mới" onAddTask={onAddTask} />
    </div>
  );
}
