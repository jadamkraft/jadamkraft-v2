---
name: Dense Animated Bento Grid Refactor
overview: Refactor the bento grid architecture to a 4-column dense layout with Framer Motion animations, enabling smooth position transitions and tighter packing similar to nevflynn.com while maintaining the Command Center aesthetic.
todos:
  - id: install-framer-motion
    content: Install framer-motion package via npm
    status: completed
  - id: update-bento-grid
    content: Update bento-grid.tsx to 4-column layout with grid-flow-dense and auto-rows-[minmax(180px,auto)]
    status: completed
  - id: update-bento-item
    content: Add use client directive, wrap in motion.div with layout prop, add colSpan and rowSpan props to BentoItem
    status: completed
  - id: reorganize-page-layout
    content: "Update page.tsx to use colSpan/rowSpan props and reorganize items: Hero (2x2), Flagship (2x2), Stats (1x1), Creative (1x2), Contact (fill)"
    status: completed
  - id: wrap-tomlinson-card
    content: Wrap TomlinsonCard in motion.div with layout prop in page.tsx to enable animations
    status: completed
---

# Dense Animated Bento Grid Refactor

## Overview

Transform the current 6-column grid into a 4-column dense-packed layout with smooth Framer Motion animations. This enables tighter tile placement and animated position transitions when items reflow.

## Architecture Changes

### 1. Dependency Installation

- Install `framer-motion` (clsx and tailwind-merge already present in package.json)
- This provides the `motion.div` component and `layout` prop for smooth position transitions

### 2. Grid Container Update (`src/components/bento-grid.tsx`)

**Current State:**

- Uses `md:grid-cols-6` with `md:auto-rows-[180px]`
- No dense packing

**Changes:**

- Change to `md:grid-cols-4` for 4-column structure
- Add `grid-flow-dense` class to enable automatic backfilling of empty spaces
- Keep `auto-rows-[minmax(180px,auto)]` for consistent base height with expansion capability
- Maintain responsive single column on mobile (`grid-cols-1`)

### 3. BentoItem Component Update (`src/components/bento-item.tsx`)

**Current State:**

- Regular React component with Card wrapper
- Uses className for grid positioning (e.g., `md:col-span-4`)

**Changes:**

- Add `'use client'` directive (required for Framer Motion)
- Wrap the entire component in `motion.div` from `framer-motion`
- Add `layout` prop to `motion.div` - this enables smooth position transitions
- Add `colSpan?: number` and `rowSpan?: number` props to BentoItemProps
- Generate grid classes from props: `col-span-${colSpan}` and `row-span-${rowSpan}` for desktop
- Preserve existing className prop for additional styling
- Maintain all existing functionality (href, Card structure, hover effects)

**Implementation Notes:**

- The `layout` prop on motion.div automatically animates position changes
- Grid classes should be: `md:col-span-${colSpan}` and `md:row-span-${rowSpan}`
- Use `cn()` utility to merge prop-based classes with className prop

### 4. Page Layout Reorganization (`src/app/page.tsx`)

**Current State:**

- Hero: `md:col-span-4` (in 6-column system)
- Flagship (Tomlinson): `md:col-span-2 md:row-span-2`
- Creative: `md:col-span-3`
- Stats: `md:col-span-3`
- Contact: `md:col-span-6`

**New Layout (4-column system):**

- **Hero**: `colSpan={2} rowSpan={2}` - Large top-left anchor (2x2)
- **Flagship (Tomlinson)**: `colSpan={2} rowSpan={2}` - Large top-right (2x2)
- **Stats**: `colSpan={1} rowSpan={1}` - Small data point (1x1)
- **Creative**: `colSpan={1} rowSpan={2}` - Vertical "skyscraper" card (1x2)
- **Contact**: `colSpan={1} rowSpan={1}` or `colSpan={2} rowSpan={1}` - Fill remaining space

**Implementation Notes:**

- Replace className-based grid positioning with `colSpan` and `rowSpan` props
- Remove `md:col-span-*` and `md:row-span-*` classes from BentoItem usage
- For TomlinsonCard: Since it's a separate component, wrap it in a `motion.div` with `layout` prop in page.tsx, or update TomlinsonCard to accept colSpan/rowSpan and wrap internally
- Order items in DOM to maximize dense packing effectiveness (larger items first, smaller fill gaps)

### 5. TomlinsonCard Consideration

**Options:**

- **Option A**: Wrap TomlinsonCard in a motion.div wrapper in page.tsx with layout prop
- **Option B**: Update TomlinsonCard component to accept colSpan/rowSpan and wrap internally

**Recommendation**: Option A (wrapper in page.tsx) keeps TomlinsonCard focused on its content, and the wrapper handles animation. This maintains separation of concerns.

## Technical Details

### Grid Flow Dense Behavior

The `grid-flow-dense` class enables CSS Grid's dense packing algorithm, which:

- Fills gaps left by larger items with smaller items
- Reorders items visually (not in DOM) to maximize space usage
- Creates the "stacked" look similar to nevflynn.com

### Framer Motion Layout Prop

The `layout` prop on `motion.div`:

- Automatically detects position changes in the layout
- Animates smooth transitions when items move to new grid positions
- Works seamlessly with CSS Grid
- No additional animation configuration needed

### Responsive Behavior

- Mobile: Single column (`grid-cols-1`) - no changes needed
- Desktop: 4-column dense grid with animated transitions
- Row height: `minmax(180px, auto)` ensures consistent base height while allowing expansion

## File Changes Summary

1. **package.json**: Add `framer-motion` dependency
2. **src/components/bento-grid.tsx**: Update grid to 4-column with dense packing
3. **src/components/bento-item.tsx**: Add motion.div wrapper, layout prop, colSpan/rowSpan props
4. **src/app/page.tsx**: Reorganize items with new prop-based sizing, wrap TomlinsonCard
5. **src/components/tomlinson-card.tsx**: (Optional) Consider if internal motion wrapper needed, or handle in page.tsx

## Testing Considerations

- Verify dense packing fills gaps correctly
- Confirm smooth animations on layout changes
- Test responsive behavior (mobile single column)
- Ensure hover states and interactions still work
- Validate accessibility (focus states, keyboard navigation)