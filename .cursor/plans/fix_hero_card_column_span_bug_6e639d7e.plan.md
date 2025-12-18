---
name: Fix Hero Card Column Span Bug
overview: Fix the critical layout bug where Hero card renders as 1x1 instead of 2x1. Update grid-config to use BANNER shape for Hero, temporarily remove aspect-ratio logic, and ensure col-span classes are correctly applied to grid items.
todos:
  - id: update-hero-shape
    content: Change Hero shape from ANCHOR to BANNER in grid-config.ts
    status: completed
  - id: remove-aspect-ratios
    content: Update getShapeClasses() in bento-item.tsx to use pure grid spans without aspect ratios
    status: completed
  - id: verify-class-application
    content: Verify grid span classes are correctly applied to Card/wrapper elements
    status: completed
---

# Fix Hero Card Column Span Bug

## Problem

The Hero card is rendering as a single column (1x1) instead of 2 columns wide (2x1). The `col-span` classes are not being applied correctly.

## Root Causes

1. Hero in `grid-config.ts` is set to `ANCHOR` (2x2) instead of `BANNER` (2x1)
2. Aspect-ratio classes may be interfering with grid column spans
3. Need to ensure grid span classes are explicitly applied to the correct elements

## Solution

### 1. Update Grid Configuration (`lib/grid-config.ts`)

- Change Hero item from `shape: "ANCHOR"` to `shape: "BANNER"`
- Verify Creative/Poem has `shape: "TOWER"` (already correct)

### 2. Temporarily Remove Aspect-Ratio Logic (`components/bento-item.tsx`)

- Update `getShapeClasses()` to return pure grid span classes without aspect ratios:
- `UNIT`: `md:col-span-1 md:row-span-1`
- `BANNER`: `md:col-span-2 md:row-span-1` (Hero needs this)
- `TOWER`: `md:col-span-1 md:row-span-2` (Creative needs this)
- `ANCHOR`: `md:col-span-2 md:row-span-2`
- Remove all `aspect-*` classes temporarily

### 3. Verify Class Application (`components/bento-item.tsx`)

- Ensure `getShapeClasses()` returns the class string
- Verify the classes are applied to the Card component (which is correct)
- The classes should be in the `gridClasses` variable that's passed to the Card's className

### 4. Add Explicit Shape Class Map in `bento-grid.tsx` (Optional Verification)

- Create a `shapeClassMap` constant for reference/verification
- This can serve as documentation, but the actual classes come from `BentoItem.getShapeClasses()`

## Implementation Details

The grid span classes are applied in `BentoItem` component:

- For regular cards: Classes go on the `<Card>` element via `gridClasses`
- For `noCard` mode: Classes go on the wrapper `<div>` via `gridClasses`
- The `motion.div` wrapper should not interfere

## Expected Result

- Hero card will have `md:col-span-2` applied, making it 2 columns wide
- Creative/Poem will have `md:row-span-2` applied, making it 2 rows tall
- Grid will properly lay out items using column and row spans