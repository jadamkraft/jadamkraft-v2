---
name: Command Center Grid Layout Refactor
overview: "Refactor grid shapes to support Command Center layout: Hero becomes 2x2 (SQUARE_XL), Flagship becomes 2x1 (BANNER), Creative stays 1x2 (TOWER). Rename ANCHOR to SQUARE_XL and update grid config accordingly."
todos:
  - id: rename-anchor-to-square-xl
    content: "Rename ANCHOR to SQUARE_XL in bento-item.tsx: update BentoShape type and getShapeClasses() shape map"
    status: completed
  - id: update-hero-shape
    content: Update Hero card shape from BANNER to SQUARE_XL in grid-config.ts
    status: completed
  - id: update-flagship-shape
    content: Update Flagship (Tomlinson) card shape from TOWER to BANNER in grid-config.ts
    status: completed
  - id: update-reference-map
    content: Update shapeClassMap reference in bento-grid.tsx to use SQUARE_XL instead of ANCHOR
    status: completed
  - id: verify-dense-flow
    content: Verify grid-flow-dense is still applied in bento-grid.tsx container (should already be present)
    status: completed
---

# Command Center Grid Layout Refactor

Refactor the grid shape system to support the Command Center layout where Hero is a large 2x2 square, Flagship is a wide 2x1 banner, and Creative remains a tall 1x2 tower.

## Current State

- **Grid Container**: `md:grid-cols-4` with `grid-flow-dense` (already correct)
- **Hero**: Currently `BANNER` (2x1) - needs to become 2x2
- **Flagship**: Currently `TOWER` (1x2) - needs to become 2x1
- **Creative**: Currently `TOWER` (1x2) - stays the same
- **ANCHOR**: Exists as 2x2 but unused - will be renamed to `SQUARE_XL`

## Changes Required

### 1. Update Shape Definitions in `bento-item.tsx`

**File**: `src/components/bento-item.tsx`

- Rename `ANCHOR` to `SQUARE_XL` in the `BentoShape` type (line 14)
- Update `getShapeClasses()` shape map (line 45):
- Change `ANCHOR` key to `SQUARE_XL`
- Keep mapping as `md:col-span-2 md:row-span-2` (2x2)
- Verify `BANNER` maps to `md:col-span-2 md:row-span-1` (2x1) - already correct
- Verify `TOWER` maps to `md:col-span-1 md:row-span-2` (1x2) - already correct

### 2. Update Grid Configuration in `grid-config.ts`

**File**: `src/lib/grid-config.ts`

Update the `gridItems` array:

- **Hero** (line 34): Change `shape: "BANNER"` to `shape: "SQUARE_XL"`
- **Flagship/Tomlinson** (line 39): Change `shape: "TOWER"` to `shape: "BANNER"`
- **Creative/Poem** (line 44): Keep `shape: "TOWER"` (no change)

### 3. Update Reference Map in `bento-grid.tsx`

**File**: `src/components/bento-grid.tsx`

Update the `shapeClassMap` comment/reference (line 33):

- Change `ANCHOR` to `SQUARE_XL` to match the new naming
- Update comment if needed

### 4. Verification

- Confirm `grid-flow-dense` remains in the grid container className (line 56) - already present
- Verify the layout will work: Hero (2x2) + Flagship (2x1) + Creative (1x2) + smaller 1x1 cards will backfill with dense flow

## Expected Layout

With a 4-column grid and dense flow:

- Row 1: Hero (2x2) | Creative (1x2)
- Row 2: Hero (cont.) | Creative (cont.)
- Row 3: Flagship (2x1) | [1x1 cards backfill]
- Row 4: [1x1 cards continue]

The `grid-flow-dense` ensures smaller cards (Stats, Contact, Social) naturally fill empty slots.