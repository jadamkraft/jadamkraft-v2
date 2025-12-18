"use client";

import { BentoItem, BentoShape } from "./bento-item";
import { TomlinsonCard } from "./tomlinson-card";

interface AnimatedTomlinsonCardProps {
  shape?: BentoShape;
}

export function AnimatedTomlinsonCard({
  shape = "TOWER",
}: AnimatedTomlinsonCardProps) {
  return (
    <BentoItem shape={shape} noCard>
      <TomlinsonCard className="h-full w-full" />
    </BentoItem>
  );
}
