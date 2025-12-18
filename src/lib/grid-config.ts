import { BentoShape } from "@/components/bento-item";

/**
 * Component keys that map to specific card components in the bento grid.
 */
export type BentoComponentKey =
  | "HERO"
  | "TOMLINSON"
  | "POEM"
  | "STATS"
  | "CONTACT"
  | "SOCIAL_GITHUB"
  | "ACTIVE_INPUT";

/**
 * Configuration for a single grid item.
 */
export interface GridItem {
  id: string;
  component: BentoComponentKey;
  shape: BentoShape;
  eyebrow?: string;
  title?: string;
}

/**
 * Grid layout configuration.
 * The order of items determines their placement in the dense grid.
 */
export const gridItems: GridItem[] = [
  {
    id: "hero",
    component: "HERO",
    shape: "SQUARE_XL", // 2x2
  },
  {
    id: "tomlinson",
    component: "TOMLINSON",
    shape: "BANNER", // 2x1
  },
  {
    id: "poem",
    component: "POEM",
    shape: "TOWER", // 1x2
    eyebrow: "Creative",
    title: "Just a half touch",
  },
  {
    id: "stats",
    component: "STATS",
    shape: "UNIT", // 1x1
    eyebrow: "Stats",
    title: "GitHub activity",
  },
  {
    id: "contact",
    component: "CONTACT",
    shape: "UNIT", // 1x1
    eyebrow: "Contact",
    title: "Let's build",
  },
  {
    id: "social-github",
    component: "SOCIAL_GITHUB",
    shape: "UNIT", // 1x1
  },
  {
    id: "active-input",
    component: "ACTIVE_INPUT",
    shape: "UNIT", // 1x1
  },
];
