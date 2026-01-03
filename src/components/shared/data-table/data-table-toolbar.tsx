"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { useState } from "react";

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
  placeholder?: string;
  searchColumn?: string;
  filters?: FacetFilterConfig[];
  search?: string;
  onSearchChange?: (value: string) => void;
  onFilterChange?: (columnId: string, value: string | undefined) => void;
  addButton?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  placeholder = "Tìm kiếm...",
  searchColumn = "title",
  filters,
  search = "",
  onSearchChange,
  onFilterChange,
  addButton,
}: DataTableToolbarProps<TData>) {
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const activeFilters = filters ?? [];

  const handleReset = () => {
    setHasActiveFilters(false);
    setResetKey((prev) => prev + 1);
    activeFilters.forEach((filter) => {
      onFilterChange?.(filter.columnId, undefined);
    });
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(event) => {
            onSearchChange?.(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px] cursor-text"
        />
        {activeFilters.map((filter) => (
          <DataTableFacetedFilter
            key={`${filter.columnId}-${resetKey}`}
            title={filter.title}
            options={filter.options}
            onFilterChange={(value: string | undefined) => {
              setHasActiveFilters(value !== undefined);
              onFilterChange?.(filter.columnId, value);
            }}
          />
        ))}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="h-8 px-2 lg:px-3 cursor-pointer"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        {addButton}
      </div>
    </div>
  );
}
