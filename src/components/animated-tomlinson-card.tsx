"use client";

import { BentoCardProps } from "./bento-grid";
import { TomlinsonCard } from "./tomlinson-card";

export function AnimatedTomlinsonCard({ shape }: BentoCardProps) {
  // Shape is handled by the parent BentoItem wrapper in bento-grid.tsx
  return <TomlinsonCard className="h-full w-full" />;
}
