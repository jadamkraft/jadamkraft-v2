---
name: Command center bento scaffold
overview: "Implement the command-center portfolio scaffold: Tailwind config + font system (sans/serif/mono), Shadcn UI primitives, reusable Bento grid components, and a mock dashboard homepage with clear Engineer vs Poet typography."
todos:
  - id: fonts-layout
    content: Update root layout to load Inter/Playfair/JetBrains via next/font and force default dark.
    status: completed
  - id: tailwind-config
    content: Add tailwind.config.ts (content paths + font families + tailwindcss-animate plugin) and point components.json to it.
    status: completed
  - id: globals-theme
    content: Update globals.css to map --font-sans/serif/mono to the new next/font CSS variables and keep zinc/slate dark tokens.
    status: completed
  - id: shadcn-primitives
    content: Run shadcn add for card/badge/button/separator into src/components/ui and install required deps.
    status: completed
  - id: bento-components
    content: Create src/components/bento-grid.tsx and src/components/bento-item.tsx using Shadcn Card + hover/focus states.
    status: completed
  - id: dashboard-page
    content: Rewrite src/app/page.tsx to render Hero/Flagship/Creative/Stats/Contact modules using the Bento components.
    status: completed
  - id: smoke-check
    content: Run dev server and fix any TS/ESLint issues surfaced by the changes.
    status: completed
---

## Goals

- Deliver a **running, responsive Bento Grid dashboard prototype**.
- Enforce **dark-first dashboard aesthetic** and **typographic contrast**:
- **Sans (UI shell)**: Inter
- **Serif (Poet modules)**: Playfair Display
- **Mono (Engineer/stats modules)**: JetBrains Mono
- Keep everything **App Router + Server Components by default**.

## 1) Fonts + dark default (Root layout)

- Update [`src/app/layout.tsx`](src/app/layout.tsx)
- Replace Geist fonts with `next/font/google` imports for `Inter`, `Playfair_Display`, `JetBrains_Mono`.
- Set font variables on `<body>` (e.g. `--font-inter`, `--font-playfair`, `--font-jetbrains`).
- Force dark by default with `<html lang="en" className="dark">`.
- Update `metadata` title/description for the portfolio.

## 2) Tailwind config (Shadcn-compatible; don’t rely on CSS alone)

- Add [`tailwind.config.ts`](tailwind.config.ts)
- **content**: include `./src/**/*.{ts,tsx,mdx}` (and optionally `./public/**/*.svg` if needed later).
- **darkMode**: `['class']`.
- **theme.extend.fontFamily**:
- `sans`: `var(--font-inter)` fallback stack
- `serif`: `var(--font-playfair)` fallback stack
- `mono`: `var(--font-jetbrains)` fallback stack
- **plugins**: register `tailwindcss-animate` (to satisfy Shadcn animation utilities expectations).
- Update [`components.json`](components.json)
- Set `tailwind.config` to `tailwind.config.ts` (currently empty), so `shadcn` CLI knows where to write/validate theme/plugin config.

## 3) Theme tokens + typography wiring (globals)

- Update [`src/app/globals.css`](src/app/globals.css)
- Keep CSS-variable-based theme tokens (Shadcn style), but ensure **Tailwind font tokens map to your new font variables**:
- add `--font-serif` mapping to `--font-playfair`
- switch `--font-sans` to `--font-inter`
- switch `--font-mono` to `--font-jetbrains`
- Keep/lean into a zinc/slate “command center” surface feel via the existing `--background/--card/--border` tokens.
- Ensure base layer applies `bg-background text-foreground` (already present).

## 4) Shadcn UI primitives

- Install/initialize as needed (your repo already has `components.json`, but it’s incomplete until step 2 is done).
- Run:
- `npx shadcn@latest add card badge button separator`
- Expected results:
- `src/components/ui/*` created (Card/Badge/Button/Separator)
- any required Radix deps added to `package.json`

## 5) Bento component architecture

- Add [`src/components/bento-grid.tsx`](src/components/bento-grid.tsx)
- Responsive grid container (mobile-first): `grid-cols-1` → `md:grid-cols-6` (or similar), consistent gaps/padding.
- Props: `className?: string`, `children: React.ReactNode`.
- Add [`src/components/bento-item.tsx`](src/components/bento-item.tsx)
- Wrapper built on Shadcn `Card` with interactive polish:
- subtle hover lift/shine
- `focus-visible` ring
- accepts `className` for spans (e.g. `md:col-span-2 md:row-span-2`)
- Optional link support for external/internal navigation.

## 6) Dashboard scaffold (mock data)

- Rewrite [`src/app/page.tsx`](src/app/page.tsx) to render modules in the Bento grid:
- **Hero**: Name + title (“Solutions Engineer”) + photo placeholder
- **Flagship**: “Tomlinson 10” preview card linking to an external URL (default: `https://tomlinson.jadamkraft.com`)
- **Creative**: Poetry card styled with `font-serif`
- **Stats**: GitHub activity placeholder styled with `font-mono`
- **Contact**: CTA card (Button/links)
- Use Shadcn primitives (`Card`, `Badge`, `Button`, `Separator`) to reinforce consistent dashboard UI.

## 7) Verification

- Run `npm run dev` and confirm:
- dark theme is default
- serif vs mono contrast is obvious per module
- grid collapses to a single column on mobile
- no TypeScript or ESLint errors introduced