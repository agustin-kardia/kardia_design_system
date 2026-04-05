# Kardia Design System — CLAUDE.md

## What this repo is
The single source of truth for all shared UI components and design tokens across Kardia products. Published as a GitHub-hosted npm package consumed by `kardia_facility_app` and other Kardia repos.

## Tech stack
- React 19 + TypeScript + Vite
- **CSS Modules** for component styles (not Tailwind inside components — Tailwind JIT doesn't scan `node_modules`)
- Tailwind CSS is used only in the **docs site** (`src/docs/`)
- Style Dictionary v4 for token compilation (DTCG format → CSS vars)
- Material Symbols (Outlined / Rounded / Sharp) via Google Fonts for icons

## Repo structure
```
src/
  components/        # All DS components (Button, WorkoutCard, Icon, etc.)
  assets/
    logos/           # KardiaIsotipo SVG
    img/             # placeholder.png and other images
  styles/
    gradients.css    # Gradient CSS variables (imported in src/index.ts)
  docs/              # Standalone docs site (Overview / Tokens / Components pages)
    App.tsx          # App shell with sidebar + hamburger menu (≤760px)
    pages/
      Components.tsx # All component demos + WorkoutCard animation demos
      Tokens.tsx
  declarations.d.ts  # Declares *.css and *.png module types for TypeScript
  index.ts           # Package entry: re-exports components + logos
tokens/
  tokens.json        # Design tokens in DTCG format — edit here, not in dist/
dist/                # Built output — committed to git so GitHub npm install works
  kardia-ds.es.js
  kardia-ds.umd.js
  kardia-ds.css
  css/
    variables.css    # Generated CSS custom properties
  types/             # Generated TypeScript declarations
```

## Design tokens
- CSS variable naming: `--color-*`, `--spacing-*`, `--border-radius-*`, `--typography-*`
- Gradient vars defined in `src/styles/gradients.css` (use `color-mix()` for opacity)
- Always use token vars in component CSS — never hardcode hex values

## Build pipeline
```bash
npm run build        # vite build → tsc --emitDeclarationOnly → node sd.config.js
npm run dev          # Vite dev server for the component library itself (not docs)
npm run docs:build   # Build the docs site → docs-dist/
npm run tokens:build # Run Style Dictionary only
```

**Critical:** `node sd.config.js` must run LAST in the build script. Vite's `emptyOutDir: true` deletes `dist/` — if Style Dictionary runs before Vite, `variables.css` gets wiped. The current script order is correct, don't change it.

## Publishing workflow
The package is installed directly from GitHub — no npm registry.

1. Make changes to `src/`
2. `npm run build` (rebuilds `dist/`)
3. Commit **both** source and `dist/` files
4. `git push origin main`
5. In consuming apps: `npm install design-tokens@github:agustin-kardia/kardia_design_system`

The docs site (GitHub Pages) deploys automatically via GitHub Actions on every push to main. It runs `npm run tokens:build && npm run docs:build` and deploys `docs-dist/`.

## Figma source of truth
File: **Kardia — Customer App**
fileKey: `FCCHNyBsztcnSEYYLkPkdZ`
Use the Figma MCP tool (`get_design_context`) when implementing or updating components.

## Component conventions
- One folder per component: `src/components/ComponentName/`
  - `ComponentName.tsx`
  - `ComponentName.module.css`
- Export everything from `src/components/index.ts`
- CSS class names via CSS Modules (`styles.className`)
- Always use design token vars in CSS, never hardcode colors/sizes
- PNG/SVG assets: declare types in `src/declarations.d.ts`

## WorkoutCard specifics
- 6 variants: `idle | low | medium | high | sensor-error | no-sensor`
- Idle/sensor-error/no-sensor background: `linear-gradient(90deg, color-base-flat → color-base-lowest)` — adapts in light/dark
- Low/medium/high: gradient feedback backgrounds
- Metrics (kardiaPoints, calories):
  - `idle` + `no-sensor`: show `0`
  - `sensor-error`: show last known values (pass them as props)
  - `low/medium/high`: show live values
- `no-sensor`: metrics in secondary color; all others use primary
- Fire icon: always `fill={1}`
- Warning icon (sensor-error): `fill={0}`, `color-icon-warning`, `color-text-warning`
- Name formatting: "First L" (last name initial, no period)
- Whole card is clickable via `onEdit` prop (cursor pointer + brightness hover)
- `children` prop renders overlay content (e.g. impact animations from consuming app)
- Impact animation class: `.impact` in `WorkoutCard.module.css`

## Don't touch
- `tokens/tokens.json` structure — consult before reorganising
- Supabase / Firebase wiring lives in `kardia_facility_app`, not here
