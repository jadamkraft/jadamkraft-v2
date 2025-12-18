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
 * Category for filtering grid items.
 */
export type GridItemCategory = "work" | "reflect" | "both";

/**
 * Configuration for a single grid item.
 */
export interface GridItem {
  id: string;
  component: BentoComponentKey;
  shape: BentoShape;
  category: GridItemCategory;
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
    category: "both",
  },
  {
    id: "tomlinson",
    component: "TOMLINSON",
    shape: "BANNER", // 2x1
    category: "both",
  },
  {
    id: "poem",
    component: "POEM",
    shape: "TOWER", // 1x2
    eyebrow: "Creative",
    title: "Just a half touch",
    category: "reflect",
  },
  {
    id: "stats",
    component: "STATS",
    shape: "UNIT", // 1x1
    eyebrow: "Stats",
    title: "GitHub activity",
    category: "work",
  },
  {
    id: "contact",
    component: "CONTACT",
    shape: "UNIT", // 1x1
    eyebrow: "Contact",
    category: "both",
  },
  {
    id: "social-github",
    component: "SOCIAL_GITHUB",
    shape: "UNIT", // 1x1
    category: "reflect",
  },
  {
    id: "active-input",
    component: "ACTIVE_INPUT",
    shape: "UNIT", // 1x1
    category: "reflect",
  },
];
