---
name: Tomlinson 10 Preview Card Upgrade
overview: Upgrade the Tomlinson 10 grid item from a simple text placeholder to a high-fidelity preview card with background image, hover effects, and interactive "Open Project" button.
todos:
  - id: create-tomlinson-card
    content: Create new client component 'tomlinson-card.tsx' with background image, overlay, title, and hover-interactive 'Open Project' button
    status: completed
  - id: implement-hover-effects
    content: "Add hover effects: image zoom, brightness increase, and button reveal/animation"
    status: completed
  - id: update-page-tsx
    content: Replace the Flagship BentoItem in page.tsx with the new TomlinsonCard component
    status: completed
  - id: verify-styling
    content: Ensure proper contrast, responsive behavior, and accessibility (focus states, ARIA labels)
    status: completed
---

## Overview

Transform the "Tomlinson 10" flagship item from a simple text card to a visually rich preview card using the `tomlinson10.png` image as a background, with hover interactions and an "Open Project" action button.

## Implementation Strategy

Since this card requires hover state interactions and background image zoom effects, we'll create a custom client component that wraps the existing card structure but adds the visual enhancements.

## File Changes

### 1. Create Client Component for Tomlinson 10 Card

**New file: `src/components/tomlinson-card.tsx`**

- Create a client component (`'use client'`) to handle hover states
- Use `next/image` for the background image with proper optimization
- Implement absolute positioning to overlay content on the image
- Add hover effects:
  - Image zoom using CSS `scale` transform on the image element
  - Brightness increase using CSS filter or overlay opacity
  - Button appearance/highlight on hover
- Structure:
  - Background: `next/image` with `fill` and `object-cover`
  - Overlay gradient: Dark overlay to ensure text readability
  - Header section: Badge + Title positioned at top
  - Action button: "Open Project" with ArrowUpRight icon that appears/enhances on hover
  - Clickable: Wrap entire card in anchor tag to `https://tomlinson.jadamkraft.com`

### 2. Update Main Page

**Modify: `src/app/page.tsx`**

- Replace the current `BentoItem` for "Flagship" (lines 88-103) with the new `TomlinsonCard` component
- Import the new component and `next/image` if not already imported
- Maintain the same grid span (`md:col-span-2 md:row-span-2`)

## Design Details

### Layout Structure

```
┌─────────────────────────────────┐
│ [Badge: Flagship]               │
│ Title: Tomlinson 10             │
│                                  │
│                                  │
│         [Background Image]       │
│         (with zoom on hover)     │
│                                  │
│                    [Open Project]│
│                    (hover reveal)│
└─────────────────────────────────┘
```

### Visual Effects

- **Background Image**: 
  - Use `next/image` with `fill`, `object-cover`, and `priority` (since it's above the fold)
  - Apply `group-hover:scale-110` with `transition-transform duration-500 ease-out`
  - Dark overlay (`bg-black/40` or similar) for text contrast

- **Hover States**:
  - Entire card: Slight lift (`hover:-translate-y-0.5`) + shadow increase
  - Image: Zoom effect (`group-hover:scale-110`)
  - Brightness: Increase overlay opacity or apply `brightness-110` filter
  - Button: Opacity transition from `opacity-0` to `opacity-100` on hover, or use `translate-y` animation

- **Typography**:
  - Keep title prominent with good contrast (white/semi-transparent white)
  - Position title in top-left area like a window header
  - Use backdrop blur or solid badge background for readability

### Accessibility

- Maintain focus-visible states for keyboard navigation
- Ensure proper contrast ratios for text over image
- Include proper ARIA labels if needed

## Technical Considerations

- **Image Optimization**: Use `next/image` with appropriate sizing
  - Set `alt` text describing the visual
  - Use `priority` since it's a flagship item
  - Consider `quality` setting if needed

- **Hover Performance**: 
  - Use CSS transforms (GPU-accelerated) instead of layout properties
  - Use `will-change` sparingly if needed
  - Ensure transitions are smooth with `ease-out` timing

- **Responsive Behavior**:
  - Ensure image scales appropriately on mobile
  - Button and text remain readable at all sizes
  - Maintain card aspect ratio on grid