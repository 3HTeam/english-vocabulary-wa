"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { useTranslations } from "@/hooks";

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
  customFilters?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  placeholder,
  searchColumn = "title",
  filters,
  search = "",
  onSearchChange,
  onFilterChange,
  addButton,
  customFilters,
}: DataTableToolbarProps<TData>) {
  const t = useTranslations();
  const activeFilters = filters ?? [];

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder || t("data_table.search_placeholder")}
          value={search}
          onChange={(event) => {
            onSearchChange?.(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px] cursor-text"
        />
        {activeFilters.map((filter) => (
          <DataTableFacetedFilter
            key={filter.columnId}
            title={filter.title}
            options={filter.options}
            onFilterChange={(value: string | undefined) => {
              onFilterChange?.(filter.columnId, value);
            }}
          />
        ))}
        {customFilters}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        {addButton}
      </div>
    </div>
  );
}
