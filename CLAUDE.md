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

1. Make changes to `src/components/`
2. **Update the docs page** — reflect the change in `src/docs/pages/Components.tsx` (update the demo for the affected component to match the new design/API)
3. `npm run build` (rebuilds `dist/`)
4. Commit **both** source and `dist/` files
5. `git push origin main`
6. In consuming apps: `npm install design-tokens@github:agustin-kardia/kardia_design_system`

**Critical:** Always update the docs demo when a component's visual design or API changes. The docs site is the source of truth for what components look like and how to use them.

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

## Animation guidelines

Kardia is a live, high-intensity workout display. Animations must feel purposeful and immediate — never decorative noise that distracts from real-time data.

### Three animation categories

**1. UI transitions** — triggered by user actions or state changes (modal open, button press, card enter)
- Fast and clean. User should feel instant response.
- Easing: `ease-out` for fades, `cubic-bezier(0.16, 1, 0.3, 1)` (spring) for spatial movement
- Duration: 150–250ms

**2. Live-data reactions** — triggered by sensor data events (zone change, preworkout ready)
- Energetic but not distracting. Must not obscure the metric being updated.
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot spring) for scale, `ease-out` for fades
- Duration: 400–500ms

**3. Milestone celebrations** — triggered by kardia/calorie thresholds (10pts, 100cal, etc.)
- Most expressive category. Can travel across the card. Loop only if the data is continuous (shimmer).
- Easing: `ease-out` for travel/appear, `ease-in-out` for loops
- Duration: 1.0–1.5s (one-shot); 2s (looping shimmer)

### Duration tiers (use these, don't invent new ones)
| Name | Value | Use |
|---|---|---|
| micro | 150ms | Hover states, opacity flickers |
| short | 200ms | Overlay fade-in |
| moderate | 250ms | Modal dialog slide-up, card enter |
| emphasis | 450ms | Zone-change impact (scale + flash) |
| long | 1.0–1.2s | Milestone travel animations |
| loop | 1.5–2.0s | Shimmer / looping glows |

### Easing reference
- `ease-out` — standard for fades and exits; decelerates naturally
- `cubic-bezier(0.16, 1, 0.3, 1)` — spring, for UI elements sliding into place (modal dialog)
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — overshoot spring, for data-driven reactions (impact scale)
- `ease-in-out` — for symmetric loops (shimmer, ambient glows)

### Where animations live
- **DS components** (`Modal.module.css`, `WorkoutCard.module.css`): entrance/exit animations intrinsic to the component. Added in the DS, consumed everywhere automatically.
- **Consuming app** (`App.css` in `kardia_facility_app`): event-driven overlays and milestone effects that are specific to the workout context (impact, preworkout shimmer, kardia/calories milestones). These are applied via `className` prop on DS components — do not embed workout-specific logic in the DS.

### Rules
- Never animate layout properties (`width`, `height`, `top`, `left`) — use `transform` and `opacity` only. They stay on the GPU and never cause reflow.
- Never loop an animation on a metric value itself — only on overlay/highlight elements.
- Always `forwards` fill mode for one-shot animations so the end state holds.
- Keep `@keyframes` names namespaced (`modal-dialog-in`, `participant-card-impact-scale`) — avoid generic names that could collide.
- Respect `prefers-reduced-motion`: DS components should wrap animations in a `@media (prefers-reduced-motion: no-preference)` guard.
- The motion token bucket in `tokens/tokens.json` is reserved — add values when motion tokens are formally defined in Figma.

## Don't touch
- `tokens/tokens.json` structure — consult before reorganising
- Supabase / Firebase wiring lives in `kardia_facility_app`, not here
