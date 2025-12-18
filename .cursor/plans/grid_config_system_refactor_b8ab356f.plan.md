---
name: Grid Config System Refactor
overview: Refactor the bento grid to use a configuration-driven system where layout is defined in `lib/grid-config.ts` and components are rendered based on string keys. Extract card components into separate files and ensure UNIT-sized cards (Stats, Contact) are compact.
todos:
  - id: create-grid-config
    content: Create lib/grid-config.ts with BentoComponentKey type, GridItem type, and gridItems array
    status: completed
  - id: extract-hero-card
    content: Extract Hero content into components/hero-card.tsx
    status: completed
  - id: extract-stats-card
    content: Extract Stats content into components/stats-card.tsx with compact UNIT layout
    status: completed
  - id: extract-contact-card
    content: Extract Contact content into components/contact-card.tsx with compact UNIT layout
    status: completed
  - id: extract-poem-card
    content: Extract Poem content into components/poem-card.tsx
    status: completed
  - id: create-social-cards
    content: Create components/social-github-card.tsx and components/social-mail-card.tsx
    status: completed
  - id: refactor-bento-grid
    content: Refactor components/bento-grid.tsx to map over gridItems and render components via registry
    status: completed
  - id: update-page
    content: Update app/page.tsx to remove hardcoded cards and render BentoGrid with githubStats prop
    status: completed
---

# Grid Configuration System Refactor

## Overview

Transform the bento grid from hardcoded JSX to a configuration-driven system. Layout is defined in a config file, and components are rendered based on string keys. This enables easy Tetris-style grid management.

## Architecture

### Configuration Structure

Create [`lib/grid-config.ts`](lib/grid-config.ts) that exports:

- `BentoComponentKey` type: Union of component keys ("HERO", "TOMLINSON", "POEM", "STATS", "CONTACT", "SOCIAL_GITHUB", "SOCIAL_MAIL")
- `GridItem` type: `{ id: string; component: BentoComponentKey; shape: BentoShape }`
- `gridItems` array: The ordered layout configuration

### Component Extraction

Create separate component files for each card type:

- [`components/hero-card.tsx`](components/hero-card.tsx) - Hero section (ANCHOR shape)
- [`components/stats-card.tsx`](components/stats-card.tsx) - GitHub stats (UNIT shape, compact)
- [`components/contact-card.tsx`](components/contact-card.tsx) - Contact section (UNIT shape, compact)
- [`components/poem-card.tsx`](components/poem-card.tsx) - Creative poem (TOWER shape)
- [`components/social-github-card.tsx`](components/social-github-card.tsx) - GitHub social link (UNIT shape)
- [`components/social-mail-card.tsx`](components/social-mail-card.tsx) - Mail social link (UNIT shape)

### Component Registry

Update [`components/bento-grid.tsx`](components/bento-grid.tsx) to:

- Accept `gridItems` prop (or import from config)
- Map over items and render the correct component based on `component` key
- Pass necessary props (e.g., `githubStats` to StatsCard)
- Wrap each item in `motion.div layout` for animations
- Use `BentoItem` with the appropriate `shape` prop

### Data Flow

Since `page.tsx` is a Server Component that fetches `githubStats`, the data needs to flow:

1. `page.tsx` fetches `githubStats`
2. `page.tsx` passes `githubStats` to `BentoGrid`
3. `BentoGrid` passes `githubStats` to `StatsCard` when rendering

## Implementation Steps

1. **Create Grid Configuration** (`lib/grid-config.ts`)

   - Define `BentoComponentKey` type
   - Define `GridItem` type with `id`, `component`, `shape`
   - Export `gridItems` array with the 7-item layout:
     - Hero (ANCHOR)
     - Tomlinson (TOWER) 
     - Poem (TOWER)
     - Stats (UNIT)
     - Contact (UNIT)
     - Social GitHub (UNIT)
     - Social Mail (UNIT)

2. **Extract Hero Component** (`components/hero-card.tsx`)

   - Extract Hero JSX from `page.tsx`
   - Accept no props (static content)
   - Return content wrapped in appropriate structure

3. **Extract Stats Component** (`components/stats-card.tsx`)

   - Extract Stats JSX from `page.tsx`
   - Accept `githubStats: GitHubStats` prop
   - Design compact layout for UNIT size:
     - Hide verbose text, show key numbers/icons
     - Truncate commit messages
     - Smaller button or icon-only

4. **Extract Contact Component** (`components/contact-card.tsx`)

   - Extract Contact JSX from `page.tsx`
   - Design compact layout for UNIT size:
     - Hide descriptive text or make it very small
     - Show icon buttons only or compact button row
     - Ensure it fits in 1x1 gracefully

5. **Extract Poem Component** (`components/poem-card.tsx`)

   - Extract Poem JSX from `page.tsx`
   - Accept no props (static content)

6. **Create Social Components**

   - `components/social-github-card.tsx`: Simple card with GitHub icon/link
   - `components/social-mail-card.tsx`: Simple card with Mail icon/link
   - Both should be compact UNIT-sized cards

7. **Refactor BentoGrid** (`components/bento-grid.tsx`)

   - Import `gridItems` from `lib/grid-config.ts`
   - Import all card components
   - Create component registry/mapper function
   - Map over `gridItems` and render:
     - Wrap in `motion.div layout`
     - Use `BentoItem` with `shape` from config
     - Render component based on `component` key
     - Pass props (e.g., `githubStats`) where needed

8. **Update Page** (`app/page.tsx`)

   - Remove all hardcoded card JSX
   - Keep header section
   - Fetch `githubStats` (keep existing)
   - Render `<BentoGrid githubStats={githubStats} />`

## Component Props Interface

```typescript
// BentoGrid props
interface BentoGridProps {
  githubStats: GitHubStats;
}

// Component registry signature
type ComponentRenderer = (props?: any) => React.ReactNode;
```

## Layout Configuration

The `gridItems` array order determines Tetris placement:

1. Hero (ANCHOR) - top-left 2x2
2. Tomlinson (TOWER) - right of Hero, 1x2
3. Poem (TOWER) - below Tomlinson, 1x2
4. Stats (UNIT) - bottom row, 1x1
5. Contact (UNIT) - bottom row, 1x1
6. Social GitHub (UNIT) - bottom row, 1x1
7. Social Mail (UNIT) - bottom row, 1x1

Grid flow-dense will automatically pack these efficiently.