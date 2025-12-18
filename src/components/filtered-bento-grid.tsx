"use client";

import * as React from "react";
import { BentoGrid } from "@/components/bento-grid";
import { FilterButtons, FilterType } from "@/components/filter-buttons";
import { GitHubStats } from "@/lib/github";

interface FilteredBentoGridProps {
  githubStats: GitHubStats;
}

export function FilteredBentoGrid({ githubStats }: FilteredBentoGridProps) {
  const [activeFilter, setActiveFilter] = React.useState<FilterType>("all");

  return (
    <>
      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <BentoGrid githubStats={githubStats} activeFilter={activeFilter} />
    </>
  );
}
