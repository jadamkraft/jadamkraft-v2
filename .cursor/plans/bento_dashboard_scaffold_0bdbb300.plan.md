---
name: Bento dashboard scaffold
overview: Scaffold a dark-first command-center root layout and a responsive Bento Grid dashboard (Hero, Flagship deep link, Creative poem, Stats placeholder) using Server Components, Tailwind v4 CSS tokens, and Shadcn primitives.
todos:
  - id: shadcn-primitives
    content: Generate Shadcn primitives (card, badge, button, separator) into `src/components/ui`
    status: pending
  - id: layout-fonts-dark
    content: Update `src/app/layout.tsx` to load JetBrains Mono + Playfair Display (and a UI sans) and set default dark mode
    status: pending
    dependencies:
      - shadcn-primitives
  - id: globals-theme-tokens
    content: Update `src/app/globals.css` to add `--font-serif` and tune dark palette tokens for zinc/neutral command-center surfaces
    status: pending
    dependencies:
      - layout-fonts-dark
  - id: bento-components
    content: Create `src/components/bento-grid.tsx` and `src/components/bento-item.tsx` as Server Components using Shadcn Card styling + hover/focus behaviors
    status: pending
    dependencies:
      - shadcn-primitives
      - globals-theme-tokens
  - id: home-dashboard
    content: Rewrite `src/app/page.tsx` to render the Hero, Tomlinson 10 deep-link card, Poem module (serif), and Stats placeholder (mono) in the Bento grid
    status: pending
    dependencies:
      - bento-components
---

# Bento Grid Command Center Scaffold

### Decisions locked

- **Dark mode**: default-dark by adding `className="dark"` on `<html>`.
- **Tailwind**: keep **Tailwind v4 CSS-first** (no `tailwind.config.ts`); extend palette + fonts via `src/app/globals.css` theme tokens.

### 1) Shadcn UI primitives (generate, don’t hand-roll)

- Run:
- `npx shadcn@latest add card badge button separator`
- Expected output:
- Creates `src/components/ui/*` primitives (`card`, `badge`, `button`, `separator`) using the existing aliases from `components.json`.

### 2) Root layout: fonts + command-center baseline

- Update [`src/app/layout.tsx`](src/app/layout.tsx):
- Replace the current `Geist`/`Geist_Mono` pairing with:
- **JetBrains Mono** for code/stats
- **Playfair Display** for poetry/creative
- Keep a clean **sans** for the UI shell (either retain Geist Sans or swap to a neutral sans like Inter).
- Apply font variables on `<body>` and set **dark default**:
- `<html lang="en" className="dark">`
- Update `metadata` to portfolio defaults (title/description).

### I apologize for the confusion. You are absolutely correct to flag this. The discrepancy likely comes from the tension between Tailwind v4's new "CSS-first" philosophy and Shadcn's current reliance on tailwind.config.ts for plugin management (specifically animations) and component installation paths.

Since your .cursorrules explicitly define customizing via tailwind.config.ts, we must align the plan to that rule to prevent the Shadcn CLI from breaking or failing to add animations later.

Here is the corrected replacement for Step 3 of your plan. You can paste this directly into Cursor to overwrite that specific section of the prompt.

3) Tailwind Configuration (Shadcn-Compatible) Create or Update tailwind.config.ts:

Do not rely on a CSS-only configuration. We need the config file to maintain compatibility with the Shadcn CLI and plugins.

Content & Plugins: Ensure the content array covers ./src/**/*.{ts,tsx} and explicitly register plugins: [require("tailwindcss-animate")].

Theme Extensions: Inside theme.extend, map your font tokens to the CSS variables we will define in layout.tsx:

fontFamily.serif → ["var(--font-playfair)", ...]

fontFamily.mono → ["var(--font-jetbrains)", ...]

fontFamily.sans → ["var(--font-geist-sans)", ...]

Colors: You may keep color definitions in globals.css (using CSS variables), but ensure the config file is present so Shadcn knows where to look.

### 4) Bento building blocks (Server Components)

- Add [`src/components/bento-grid.tsx`](src/components/bento-grid.tsx):
- A responsive grid container (mobile-first), e.g. `grid-cols-1` → `md:grid-cols-6` with consistent gaps.
- Props: `className`, children.
- Add [`src/components/bento-item.tsx`](src/components/bento-item.tsx):
- A wrapper around Shadcn `Card` with:
- Subtle hover lift/scale, border/shine, focus-visible ring
- Optional `href` support (wrap card in anchor for internal/external navigation)
- Props: `title`, `eyebrow` (optional), `icon` (optional), `className`, children.

### 5) Root dashboard page scaffold (mock modules)

- Rewrite [`src/app/page.tsx`](src/app/page.tsx) to render the Bento “Command Center” with mock data:
- **Hero**: name, “Solutions Engineer”, photo placeholder
- **Flagship**: “Tomlinson 10” preview card linking to `tomlinson.jadamkraft.com`
- **Creative**: poem snippet styled with `font-serif`
- **Stats**: GitHub contributions placeholder styled with `font-mono`
- Ensure responsive spans collapse cleanly on mobile and use `Badge`, `Button`, `Separator` where appropriate.

### 6) Quick smoke check

- Run `npm run dev` and verify:
- Dark theme is default
- Fonts apply correctly (mono vs serif contrast)
- Grid collapses to 1-column on mobile widths