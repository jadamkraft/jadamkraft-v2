---
name: Creative module poem update
overview: Update the Creative module in the Bento Grid to display the "Just a half touch" poem with high-fidelity typography, paper texture background, and proper formatting that preserves the poem's structure and hyphenation.
todos:
  - id: update-creative-content
    content: Replace mock poem content in Creative module with 'Just a half touch' poem, structured in three stanzas using separate <p> tags
    status: completed
  - id: apply-typography-styling
    content: Apply font-serif, italic, relaxed leading, and ample padding to the poem content
    status: completed
  - id: add-paper-background
    content: Add paper-texture.png background image to the Creative module content area
    status: completed
  - id: preserve-hyphenation
    content: Ensure the 'Ex-' hyphen in the third stanza is preserved correctly
    status: completed
---

# Creative Module Poem Update

## Overview

Replace the mock poem in the Creative module with "Just a half touch" poem, applying Playfair Display serif typography, paper texture background, and proper formatting to create visual contrast with technical modules.

## Current State

- Creative module located in [`src/app/page.tsx`](src/app/page.tsx) at lines 92-112
- Currently displays mock poem "Clark Kent" with basic `font-serif` styling
- Playfair Display already configured in [`src/app/layout.tsx`](src/app/layout.tsx) and mapped to `font-serif` in [`src/app/globals.css`](src/app/globals.css)
- Paper texture image available at `public/assets/paper-texture.png`

## Implementation

### 1. Update Creative Module Content (`src/app/page.tsx`)

Replace the current Creative module content (lines 98-111) with:

- **Background**: Apply `paper-texture.png` using Tailwind's `bg-[url('/assets/paper-texture.png')]` or inline style
- **Layout**: Use `flex flex-col` with `justify-center` or `justify-start` for top-left positioning
- **Typography**:
- `font-serif` (Playfair Display)
- `italic` for italic styling
- `leading-relaxed` or `leading-loose` for relaxed line-height
- Ample padding: `p-6` or `p-8`
- **Poem Structure**: Use separate `<p>` tags for each stanza to preserve rhythm and spacing
- **Special Handling**: Ensure "Ex-" hyphen is preserved (use non-breaking hyphen or explicit text)

### 2. Poem Content Structure

Three stanzas:

1. "Just a half touch, Incidental. Maybe in times small things stayed small. When did the world change?"
2. "It only ever made my soul scream louder. I can't find any place to rest my body now"
3. "Except in Ex- istential dreams."

### 3. Styling Considerations

- Background image should cover the card area with appropriate sizing (`bg-cover` or `bg-contain`)
- Text color should contrast well with the dark paper texture (likely use `text-foreground` or a lighter variant)
- Consider overlay or opacity adjustments if text readability needs enhancement
- Maintain responsive behavior (mobile-first)

### 4. Technical Details

- Use `whitespace-pre-line` or separate `<p>` tags (prefer `<p>` tags for better semantic structure)
- Preserve the hyphen in "Ex-" using a non-breaking hyphen (`\u2011`) or explicit text
- Ensure the background doesn't interfere with the card's hover effects and gradient overlays from `BentoItem`

## Files to Modify

- [`src/app/page.tsx`](src/app/page.tsx): Update Creative module (lines 92-112)

## Notes

- The `BentoItem` component already handles card styling, hover effects, and gradients
- Background image will be applied to the content area, not the entire card
- Consider using `relative` positioning on the content wrapper if overlay effects are needed
- Test text contrast against the dark paper texture to ensure readability