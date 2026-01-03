"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DataTableFacetedFilterProps {
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onFilterChange?: (value: string | undefined) => void;
}

export function DataTableFacetedFilter({
  title,
  options,
  onFilterChange,
}: DataTableFacetedFilterProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    undefined
  );

  const handleFilterChange = (value: string) => {
    setSelectedValue(value);
    onFilterChange?.(value);
  };

  const handleClearFilters = () => {
    setSelectedValue(undefined);
    onFilterChange?.(undefined);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed cursor-pointer"
        >
          <PlusCircle />
          {title}
          {selectedValue && selectedOption && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {selectedOption.label}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <RadioGroup
                value={selectedValue}
                onValueChange={handleFilterChange}
              >
                {options.map((option) => {
                  const isSelected = selectedValue === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleFilterChange(option.value)}
                      className="cursor-pointer"
                    >
                      <RadioGroupItem
                        value={option.value}
                        checked={isSelected}
                        className="mr-2"
                      />
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </RadioGroup>
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearFilters}
                    className="justify-center text-center cursor-pointer"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
