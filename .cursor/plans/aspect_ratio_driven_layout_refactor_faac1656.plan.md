---
name: Aspect Ratio Driven Layout Refactor
overview: Refactor the Bento Grid to use aspect-ratio driven layout instead of fixed row heights. Update shape tokens to use aspect ratios on md breakpoints, remove auto-rows from grid, and ensure all card components use h-full w-full.
todos:
  - id: remove-auto-rows
    content: Remove auto-rows-[minmax(180px,auto)] from bento-grid.tsx grid container
    status: completed
  - id: update-shape-classes
    content: Update getShapeClasses() in bento-item.tsx to use aspect ratios instead of row-span
    status: completed
  - id: update-bento-item-wrapper
    content: Ensure BentoItem wrapper structure properly applies aspect ratios
    status: completed
  - id: add-w-full-cards
    content: Add w-full to all card component root divs (hero, stats, contact, poem, social cards)
    status: completed
  - id: verify-tomlinson
    content: Ensure TomlinsonCard properly handles w-full via className prop
    status: completed
---

# Aspect-Ratio Driven Layout Refactor

## Overview

Replace fixed-height grid rows with aspect-ratio driven layout. Grid items will maintain their proportions based on width, creating a fluid, responsive layout similar to `nevflynn.com`.

## Changes Required

### 1. Update Grid Container (`components/bento-grid.tsx`)

- Remove `auto-rows-[minmax(180px,auto)]` from grid className
- Keep `grid-cols-1 md:grid-cols-4 gap-4 grid-flow-dense`

### 2. Update Shape Token Classes (`components/bento-item.tsx`)

Modify `getShapeClasses()` function to return aspect-ratio classes instead of row-span:

- **UNIT** (1x1): `md:col-span-1 aspect-auto md:aspect-square`
- **BANNER** (2x1): `md:col-span-2 aspect-auto md:aspect-[2/1]`
- **ANCHOR** (2x2): `md:col-span-2 aspect-auto md:aspect-square`
- **TOWER** (1x2): `md:col-span-1 aspect-auto md:aspect-[1/2]`

Remove `row-span` classes entirely. The `aspect-auto` on mobile allows natural height, while `md:aspect-*` enforces ratios on desktop.

### 3. Update BentoItem Wrapper Structure

Ensure the wrapper divs in `BentoItem` apply aspect ratios correctly:

- The `motion.div` wrapper should not interfere with aspect ratio
- The Card/wrapper div should have the aspect ratio classes applied
- Remove any `h-full` constraints that might conflict with aspect ratios

### 4. Ensure Card Components Use Full Dimensions

Update all card components to have `h-full w-full` on their root elements:

- `hero-card.tsx`: Add `w-full` to root div (already has `h-full`)
- `stats-card.tsx`: Add `w-full` to root div (already has `h-full`)
- `contact-card.tsx`: Add `w-full` to root div (already has `h-full`)
- `poem-card.tsx`: Add `w-full` to root div (already has `h-full`)
- `social-github-card.tsx`: Add `w-full` to root div (already has `h-full`)
- `social-mail-card.tsx`: Add `w-full` to root div (check if exists)
- `tomlinson-card.tsx`: Ensure it receives and applies `w-full` via className prop

### 5. Update Motion Wrapper

The `motion.div` wrapper in `BentoItem` should not constrain height. It should allow the aspect ratio to control sizing. Consider removing `h-full` from motion wrapper or ensuring it doesn't interfere.

## Implementation Details

### Aspect Ratio Behavior

- **Mobile**: `aspect-auto` allows content to determine natural height
- **Desktop (md+)**: Aspect ratios enforce consistent proportions:
- UNIT: Square (1:1)
- BANNER: Wide (2:1)
- ANCHOR: Large square (2:2, which is also 1:1 but spans 2 columns)
- TOWER: Tall (1:2)

### Grid Flow

The `grid-flow-dense` will still work, but items will now size based on their aspect ratios rather than row heights. The grid will pack items efficiently while maintaining aspect ratios.

## Files to Modify

1. `components/bento-grid.tsx` - Remove auto-rows
2. `components/bento-item.tsx` - Update getShapeClasses() and wrapper structure
3. `components/hero-card.tsx` - Add w-full
4. `components/stats-card.tsx` - Add w-full
5. `components/contact-card.tsx` - Add w-full
6. `components/poem-card.tsx` - Add w-full
7. `components/social-github-card.tsx` - Add w-full
8. `components/social-mail-card.tsx` - Add w-full (if needed)
9. `components/tomlinson-card.tsx` - Ensure w-full support