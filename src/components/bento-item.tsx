"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Shape tokens for the Bento Grid system.
 * These define the four valid container shapes for grid items.
 */
export type BentoShape = "UNIT" | "TOWER" | "BANNER" | "SQUARE_XL";

export type BentoItemProps = {
  className?: string;
  title?: string | React.ReactNode;
  eyebrow?: string;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  shape: BentoShape;
  /**
   * When true, renders as a simple grid wrapper without Card styling.
   * Useful for components that provide their own Card wrapper.
   */
  noCard?: boolean;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

/**
 * Maps shape tokens to their corresponding Tailwind grid classes.
 * Uses pure grid spans for reliable column/row sizing.
 * Tailwind JIT requires explicit class names.
 */
export function getShapeClasses(shape: BentoShape): string {
  const shapeMap: Record<BentoShape, string> = {
    UNIT: "md:col-span-1 md:row-span-1", // 1x1 - Utility & Filler
    TOWER: "md:col-span-1 md:row-span-2", // 1x2 - Vertical flow
    BANNER: "md:col-span-2 md:row-span-1", // 2x1 - Cinematic
    SQUARE_XL: "md:col-span-2 md:row-span-2", // 2x2 - Heavyweight
  };

  return shapeMap[shape];
}

export function BentoItem({
  className,
  title,
  eyebrow,
  icon,
  href,
  children,
  shape,
  noCard = false,
}: BentoItemProps) {
  const external = href ? isExternalHref(href) : false;

  // Generate grid classes from shape token
  const gridClasses = getShapeClasses(shape);

  // Simple wrapper mode for components that provide their own Card
  if (noCard) {
    const wrapper = (
      <div className={cn("w-full h-full", className)}>{children}</div>
    );

    return (
      <motion.div layout className={cn("w-full", gridClasses)}>
        {wrapper}
      </motion.div>
    );
  }

  const card = (
    <Card
      className={cn(
        "group relative w-full h-full overflow-hidden border-border/60 bg-card/60 shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        className
      )}
    >
      {(title || eyebrow || icon) && (
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-2">
              {eyebrow && (
                <Badge
                  variant="secondary"
                  className="w-fit bg-secondary/60 text-foreground/80"
                >
                  {eyebrow}
                </Badge>
              )}
              {title && (
                <CardTitle className="text-base leading-tight tracking-tight">
                  {title}
                </CardTitle>
              )}
            </div>
            {icon && (
              <div className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground">
                {icon}
              </div>
            )}
          </div>
        </CardHeader>
      )}

      <CardContent className={cn(title || eyebrow || icon ? "pt-0" : "pt-6")}>
        {children}
      </CardContent>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100",
          "bg-[radial-gradient(1200px_circle_at_0%_0%,hsl(var(--foreground)/0.08),transparent_55%)]"
        )}
      />
    </Card>
  );

  const motionCard = (
    <motion.div layout className={cn("w-full", gridClasses)}>
      {card}
    </motion.div>
  );

  if (!href) return motionCard;

  return (
    <motion.div layout className={cn("w-full", gridClasses)}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="block w-full h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {card}
      </a>
    </motion.div>
  );
}
