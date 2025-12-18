---
name: Standardize Component Registry with BentoCardProps
overview: Create a shared BentoCardProps interface that unifies all component prop types, update the componentRegistry to use this interface, remove legacy TOMLINSON conditional handling, and ensure type safety across all bento grid components.
todos:
  - id: create-bento-card-props
    content: Create BentoCardProps interface in bento-grid.tsx with optional shape and githubStats properties
    status: completed
  - id: update-registry-type
    content: Update componentRegistry type definition to use React.ComponentType<BentoCardProps>
    status: completed
  - id: verify-imports
    content: Ensure BentoShape is imported from @/components/bento-item in bento-grid.tsx
    status: completed
  - id: remove-tomlinson-conditional
    content: Remove the legacy if (item.component === 'TOMLINSON') conditional block (lines 69-79) and handle TOMLINSON through unified rendering path
    status: completed
  - id: update-tomlinson-rendering
    content: Update unified rendering logic to pass shape prop to AnimatedTomlinsonCard via Component props
    status: completed
  - id: handle-bentoitem-wrapper
    content: Determine if AnimatedTomlinsonCard's internal BentoItem wrapper conflicts with unified rendering and adjust accordingly
    status: completed
---

# Standardize Component Registry with BentoCardProps Interface

## Problem Analysis

The current `componentRegistry` in [`src/components/bento-grid.tsx`](src/components/bento-grid.tsx) uses a narrow union type:

```typescript
React.ComponentType<any> | React.ComponentType<{ githubStats: GitHubStats }>;
```

This doesn't include `AnimatedTomlinsonCard`'s prop type `{ shape?: BentoShape }`, causing TypeScript to incorrectly infer the component type when accessing `componentRegistry["TOMLINSON"]`, leading to the build error.Additionally, there's legacy conditional code (lines 69-79) that handles TOMLINSON separately, which should be removed as part of standardizing the interface.

## Solution Strategy

Create a unified `BentoCardProps` interface that includes all possible props as optional, update the componentRegistry to use this interface, and remove the legacy TOMLINSON conditional handling to treat all components uniformly.

## Implementation Steps

### 1. Create BentoCardProps Interface

**File:** [`src/components/bento-grid.tsx`](src/components/bento-grid.tsx)

- Add a new `BentoCardProps` interface at the top of the file (after imports, before `BentoGridProps`):
  ```typescript
    export interface BentoCardProps {
      shape?: BentoShape;
      githubStats?: GitHubStats;
    }
  ```

- Import `BentoShape` from `@/components/bento-item` if not already imported

### 2. Update Component Registry Type

**File:** [`src/components/bento-grid.tsx`](src/components/bento-grid.tsx)

- Replace the current `componentRegistry` type definition (lines 39-41) with:
  ```typescript
    const componentRegistry: Record<
      string,
      React.ComponentType<BentoCardProps>
    > = {
      ...
    };
  ```


This ensures all components in the registry are typed as accepting `BentoCardProps`, which includes both `shape` and `githubStats` as optional properties.

### 3. Verify Component Compatibility

The following components are already compatible with `BentoCardProps` due to TypeScript's structural typing:

- `HeroCard` (no props) - compatible with `BentoCardProps` (all optional)
- `PoemCard` (no props) - compatible
- `ContactCard` (no props) - compatible
- `SocialGitHubCard` (no props) - compatible
- `SocialMailCard` (no props) - compatible
- `StatsCard` (`{ githubStats: GitHubStats }`) - compatible (githubStats is optional in BentoCardProps)
- `AnimatedTomlinsonCard` (`{ shape?: BentoShape }`) - compatible (shape is optional in BentoCardProps)

No changes needed to individual component definitions - TypeScript's structural typing will handle the compatibility.

### 4. Remove Legacy TOMLINSON Conditional Block

**File:** [`src/components/bento-grid.tsx`](src/components/bento-grid.tsx)

- **Delete** the entire conditional block (lines 68-80):
  ```typescript
    // TOMLINSON already wraps itself in BentoItem, so render it directly with shape prop
    if (item.component === "TOMLINSON") {
      const shapeClasses = getShapeClasses(item.shape);
      return (
        <motion.div key={item.id} layout className={cn("w-full", shapeClasses)}>
          <AnimatedTomlinsonCard shape={item.shape} />
        </motion.div>
      );
    }
  ```


This legacy code handles TOMLINSON separately and must be removed as part of standardizing the interface.

### 5. Update Unified Rendering Logic

**File:** [`src/components/bento-grid.tsx`](src/components/bento-grid.tsx)

- Update the unified rendering logic (lines 82-88) to pass props consistently:
  ```typescript
    // For components that need BentoItem wrapper
    const content =
      item.component === "STATS" ? (
        <Component githubStats={githubStats} />
      ) : item.component === "TOMLINSON" ? (
        <Component shape={item.shape} />
      ) : (
        <Component />
      );
  ```


This ensures `AnimatedTomlinsonCard` receives the `shape` prop through the unified path.

### 6. Handle BentoItem Wrapper Conflict

**File:** [`src/components/animated-tomlinson-card.tsx`](src/components/animated-tomlinson-card.tsx)**Issue:** `AnimatedTomlinsonCard` currently wraps itself in `BentoItem` (line 14), but the unified rendering path in `bento-grid.tsx` also wraps all components in `BentoItem` (line 107). This would create a double-wrap.**Solution Options:**

- **Option A (Recommended):** Remove the `BentoItem` wrapper from `AnimatedTomlinsonCard` and let the unified rendering handle it:
- Remove the `BentoItem` import and wrapper from `AnimatedTomlinsonCard`
- Return just `<TomlinsonCard className="h-full w-full" />`
- The unified rendering will wrap it in `BentoItem` with proper shape classes
- **Option B:** Keep the internal wrapper but add a prop to signal that wrapping is already handled (requires more changes)

**Recommendation:** Use Option A to maintain consistency with other components that don't self-wrap.

## Expected Outcome

- TypeScript build error resolved: `Property 'shape' does not exist` error will be fixed
- Legacy code removed: TOMLINSON conditional block eliminated
- Unified rendering: All components handled through the same rendering path
- Type safety maintained: All components remain properly typed
- Future-proof: New components can easily be added to the registry if they accept a subset of `BentoCardProps`