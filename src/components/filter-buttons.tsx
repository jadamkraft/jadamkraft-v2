"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FilterType = "all" | "work" | "reflect";

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  className?: string;
}

export function FilterButtons({
  activeFilter,
  onFilterChange,
  className,
}: FilterButtonsProps) {
  return (
    <div className={cn("mb-6 flex items-center gap-2", className)}>
      <Button
        variant={activeFilter === "all" ? "default" : "secondary"}
        onClick={() => onFilterChange("all")}
        className="transition-all"
      >
        All
      </Button>
      <Button
        variant={activeFilter === "work" ? "default" : "secondary"}
        onClick={() => onFilterChange("work")}
        className="transition-all"
      >
        Work
      </Button>
      <Button
        variant={activeFilter === "reflect" ? "default" : "secondary"}
        onClick={() => onFilterChange("reflect")}
        className="transition-all"
      >
        Reflect
      </Button>
    </div>
  );
}
