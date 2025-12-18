---
name: Shape Token System Refactor
overview: "Refactor the bento grid system to use a Shape-Token system where layout is completely separated from content. Replace colSpan/rowSpan props with four predefined shape tokens: UNIT (1x1), TOWER (1x2), BANNER (2x1), and ANCHOR (2x2)."
todos:
  - id: define-shape-tokens
    content: Define BentoShape type and shape-to-classes mapping in bento-item.tsx
    status: completed
  - id: update-bento-item
    content: Replace colSpan/rowSpan props with shape prop in BentoItem component
    status: completed
  - id: refactor-tomlinson-card
    content: Wrap AnimatedTomlinsonCard content with BentoItem using ANCHOR shape
    status: completed
  - id: update-page-usage
    content: Update all BentoItem usages in page.tsx to use shape tokens instead of colSpan/rowSpan
    status: completed
---

# Shape-Token System Implementation

## Overview

Separate layout logic from component content by introducing a Shape-Token system. Components will select a shape token (UNIT, TOWER, BANNER, ANCHOR) instead of manually specifying grid dimensions.

## Architecture

### Shape Token Definitions

Create a type-safe shape token system in [`src/components/bento-item.tsx`](src/components/bento-item.tsx):

- **THE UNIT** (1x1): `col-span-1 row-span-1` - Utility & Filler
- **THE TOWER** (1x2): `col-span-1 row-span-2` - Vertical flow
- **THE BANNER** (2x1): `col-span-2 row-span-1` - Cinematic
- **THE ANCHOR** (2x2): `col-span-2 row-span-2` - Heavyweight

### Implementation Steps

1. **Update `BentoItem` Component** (`src/components/bento-item.tsx`)

- Define `BentoShape` type with four shape tokens
- Replace `colSpan` and `rowSpan` props with a single `shape` prop
- Create a mapping function `getShapeClasses(shape: BentoShape)` that returns the appropriate Tailwind grid classes
- Remove the old `getGridSpanClasses` helper function
- Update the component to use shape-based classes

2. **Refactor `AnimatedTomlinsonCard`** (`src/components/animated-tomlinson-card.tsx`)

- Remove the direct `motion.div` wrapper with grid classes
- Wrap `TomlinsonCard` with `BentoItem` using the `ANCHOR` shape (2x2)
- Ensure animation still works (motion can be applied to the BentoItem wrapper if needed)

3. **Update Page Implementation** (`src/app/page.tsx`)

- Replace all `colSpan`/`rowSpan` props with `shape` prop:
- Hero: `shape="ANCHOR"` (currently 2x2)
- AnimatedTomlinsonCard: Will use ANCHOR via BentoItem wrapper
- Creative/Poem: `shape="TOWER"` (currently 1x2)
- Stats: `shape="UNIT"` (currently 1x1)
- Contact: `shape="UNIT"` (currently 1x1)

4. **Type Safety**

- Export `BentoShape` type for use in other components
- Ensure TypeScript enforces shape token usage

## Benefits

- **DRY Principle**: Layout logic centralized in one place
- **Predictability**: Only four valid shapes, no arbitrary dimensions
- **Maintainability**: Change grid dimensions by updating the shape mapping
- **Separation of Concerns**: Components focus on content, not layout

## Migration Path

All existing components will be updated to use shape tokens. The old `colSpan`/`rowSpan` API will be completely removed.