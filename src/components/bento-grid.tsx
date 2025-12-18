"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { BentoItem, getShapeClasses } from "@/components/bento-item";
import { gridItems } from "@/lib/grid-config";
import { GitHubStats } from "@/lib/github";

// Component imports
import { HeroCard } from "@/components/hero-card";
import { AnimatedTomlinsonCard } from "@/components/animated-tomlinson-card";
import { PoemCard } from "@/components/poem-card";
import { StatsCard } from "@/components/stats-card";
import { ContactCard } from "@/components/contact-card";
import { SocialGitHubCard } from "@/components/social-github-card";
import { SocialMailCard } from "@/components/social-mail-card";

interface BentoGridProps {
  githubStats: GitHubStats;
  className?: string;
}

/**
 * Shape class map for reference/verification.
 * Actual classes are applied via BentoItem.getShapeClasses().
 */
const shapeClassMap = {
  UNIT: "md:col-span-1 md:row-span-1",
  BANNER: "md:col-span-2 md:row-span-1", // FLAGSHIP needs this
  TOWER: "md:col-span-1 md:row-span-2", // CREATIVE needs this
  SQUARE_XL: "md:col-span-2 md:row-span-2", // HERO needs this
} as const;

/**
 * Component registry mapping component keys to their React components.
 */
const componentRegistry: Record<
  string,
  React.ComponentType<any> | React.ComponentType<{ githubStats: GitHubStats }>
> = {
  HERO: HeroCard,
  TOMLINSON: AnimatedTomlinsonCard,
  POEM: PoemCard,
  STATS: StatsCard,
  CONTACT: ContactCard,
  SOCIAL_GITHUB: SocialGitHubCard,
  SOCIAL_MAIL: SocialMailCard,
};

export function BentoGrid({ githubStats, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 grid-flow-dense",
        className
      )}
    >
      {gridItems.map((item) => {
        const Component = componentRegistry[item.component];

        if (!Component) {
          console.warn(`Unknown component key: ${item.component}`);
          return null;
        }

        // TOMLINSON already wraps itself in BentoItem, so render it directly with shape prop
        if (item.component === "TOMLINSON") {
          const shapeClasses = getShapeClasses(item.shape);
          return (
            <motion.div
              key={item.id}
              layout
              className={cn("w-full", shapeClasses)}
            >
              <Component shape={item.shape} />
            </motion.div>
          );
        }

        // For components that need BentoItem wrapper
        const content =
          item.component === "STATS" ? (
            <Component githubStats={githubStats} />
          ) : (
            <Component />
          );

        // Handle dynamic title for STATS with status indicator
        const title =
          item.component === "STATS" ? (
            <div className="flex items-center gap-2">
              <span>{item.title}</span>
              {githubStats.status === "online" && (
                <span
                  className="inline-block size-2 rounded-full bg-green-500"
                  aria-label="Systems Online"
                />
              )}
            </div>
          ) : (
            item.title
          );

        return (
          <BentoItem
            key={item.id}
            shape={item.shape}
            eyebrow={item.eyebrow}
            title={title}
          >
            {content}
          </BentoItem>
        );
      })}
    </div>
  );
}
