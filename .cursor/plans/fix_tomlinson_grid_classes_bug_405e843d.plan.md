---
name: Fix TOMLINSON Grid Classes Bug
overview: Export getShapeClasses from bento-item.tsx and apply it to the outer motion.div wrapper for TOMLINSON in bento-grid.tsx so the grid respects the 2-column span.
todos:
  - id: export-getshapeclasses
    content: Export getShapeClasses function from bento-item.tsx
    status: completed
  - id: import-getshapeclasses
    content: Import getShapeClasses in bento-grid.tsx
    status: completed
  - id: apply-shape-classes
    content: Calculate and apply shape classes to TOMLINSON outer motion.div wrapper
    status: completed
---

# Fix TOMLINSON Grid Classes Bug

The TOMLINSON component's outer `motion.div` wrapper in `bento-grid.tsx` is missing the grid span classes, causing it to render as 1 column instead of 2. The grid classes are applied inside the nested `BentoItem`, but the grid container needs them on the direct child element.

## Root Cause

In `bento-grid.tsx` lines 68-74, the TOMLINSON component is wrapped in a `motion.div` with only `className="w-full"`. The grid classes (`md:col-span-2 md:row-span-1`) are applied inside `AnimatedTomlinsonCard` → `BentoItem`, but CSS Grid requires the span classes on the direct grid child, not nested elements.

## Solution

### 1. Export `getShapeClasses` from `bento-item.tsx`

**File**: `src/components/bento-item.tsx`

- Change `getShapeClasses` from a private function to an exported function (line 40)
- Update the function declaration from `function getShapeClasses` to `export function getShapeClasses`
- This allows `bento-grid.tsx` to import and use it

### 2. Import and Apply in `bento-grid.tsx`

**File**: `src/components/bento-grid.tsx`

- Add import: `import { BentoItem, getShapeClasses } from "@/components/bento-item"` (update line 7)
- In the TOMLINSON conditional block (lines 68-74):
- Calculate shape classes: `const shapeClasses = getShapeClasses(item.shape)`
- Update the `motion.div` className to: `className={cn("w-full", shapeClasses)}`
- Keep the `shape={item.shape}` prop passed to `<Component />` since `AnimatedTomlinsonCard` uses it internally

## Expected Result

The outer `motion.div` wrapper will have `className="w-full md:col-span-2 md:row-span-1"` (for BANNER shape), allowing the grid container to properly size the TOMLINSON component as 2 columns wide.

## Note on Nested Grid Classes

The inner `BentoItem` in `AnimatedTomlinsonCard` will still apply grid classes to its own `motion.div`, but since it's nested inside the outer wrapper, those classes won't affect the main grid layout. They're harmless and can remain for consistency.