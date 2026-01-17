"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/hooks";

interface DataTableSelectFilterProps {
  title?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  value?: string;
  onFilterChange?: (value: string | undefined) => void;
  className?: string;
}

export function DataTableSelectFilter({
  title,
  placeholder,
  options,
  value,
  onFilterChange,
  className,
}: DataTableSelectFilterProps) {
  const t = useTranslations();

  const handleValueChange = (newValue: string) => {
    if (newValue === "all") {
      onFilterChange?.(undefined);
    } else {
      onFilterChange?.(newValue);
    }
  };

  return (
    <Select value={value || "all"} onValueChange={handleValueChange}>
      <SelectTrigger className={className || "h-8 w-[180px]"}>
        <SelectValue placeholder={placeholder || title} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          {placeholder || title || t("data_table.all")}
        </SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {option.icon && (
                <option.icon className="h-4 w-4 text-muted-foreground" />
              )}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
