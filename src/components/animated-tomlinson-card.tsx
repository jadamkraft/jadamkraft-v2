"use client";

import { BentoShape } from "./bento-item";
import { TomlinsonCard } from "./tomlinson-card";

interface AnimatedTomlinsonCardProps {
  shape?: BentoShape;
}

export function AnimatedTomlinsonCard({ shape }: AnimatedTomlinsonCardProps) {
  // Shape is handled by the parent BentoItem wrapper in bento-grid.tsx
  return <TomlinsonCard className="h-full w-full" />;
}
