# Kardia Design System — Design Tokens

Single source of truth for design tokens across all Kardia platforms. Tokens are defined once in `tokens/tokens.json` (DTCG format) and compiled to CSS, TypeScript, and Flutter/Dart via [Style Dictionary](https://styledictionary.io/).

## Token categories

| Category | Description |
|---|---|
| `color.brand` | Brand colors (primary red, dark red, lime green) |
| `color.interaction` | Button/action states (enabled, hover, pressed, disabled) |
| `color.feedback` | Feedback colors: error, warning, success, info, neutral — plus `-light` and `-alpha` variants |
| `color.base` | Surface/background scale (flat → highest), overlay, branded surfaces |
| `color.text` | Text colors including inverted, disabled, branded, semantic |
| `color.icon` | Icon colors (mirrors text) |
| `color.border` | Border colors (high, normal, inverted) |
| `typography` | Archivo type scale: h1–h5, paragraph, secondary, caption, tag — each with multiple weights |
| `spacing` | Spacing scale: none (0) → 8xlarge (64px) |
| `border-radius` | Radius scale: tiny (2px) → 4xlarge (24px) + action (200px) |
| `border-width` | Border widths: thin (1px), small (1.5px), medium (2px), thick (4px) |
| `shadow` | _(coming soon — pending Figma definition)_ |
| `motion` | _(coming soon — pending Figma definition)_ |

## Output files

After running `npm run tokens:build`, outputs are written to `dist/`:

| File | Use |
|---|---|
| `dist/css/variables.css` | CSS custom properties — import globally in web apps |
| `dist/js/tokens.ts` | Typed TypeScript token object |
| `dist/js/tailwind.tokens.ts` | Tailwind `theme.extend` object — plug into `tailwind.config.js` |
| `dist/flutter/app_tokens.dart` | Dart `AppTokens` class with static constants |

## Usage

### Web (CSS variables)

```js
// main.jsx or main.ts
import 'design-tokens/dist/css/variables.css';
```

Then use in CSS or inline styles:
```css
background-color: var(--color-brand-primary);
border-radius: var(--border-radius-2xlarge);
```

### Web (Tailwind)

```js
// tailwind.config.js
import tailwindTokens from './node_modules/design-tokens/dist/js/tailwind.tokens';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: tailwindTokens,
  },
};
```

Then use token-named utilities in JSX:
```jsx
<div className="bg-[var(--color-brand-primary)] rounded-[var(--border-radius-2xlarge)]" />
```

### Flutter

```dart
import 'package:your_app/tokens/app_tokens.dart';

// Use static constants directly
Text('Hello', style: AppTokens.typographyH1700)
Container(color: AppTokens.colorBrandPrimary)
```

## Components

React components live in `src/components/`. Each component is typed with TypeScript and uses CSS custom properties from the token system — the consumer must import `dist/css/variables.css` globally for components to render correctly.

| Component | Key props |
|---|---|
| `Button` | `variant` (primary/secondary/tertiary), `size`, `role`, `leftIcon`, `rightIcon`, `fullWidth` |
| `PillButton` | `variant` (primary/secondary), `size` (small/medium), `iconOnly`, `leftIcon`, `rightIcon` |
| `Link` | `size` (small/medium/large), `weight` (semibold/medium), `leftIcon`, `rightIcon` |
| `Chip` | `size` (small/medium), `state` (idle/selected/disabled), `iconOnly`, `leftIcon`, `rightIcon` |
| `Tag` | `type` (default/branded/info/success/failure), `size` (small/regular), `icon`, `iconOnly` |
| `Divider` | `intensity` (normal/high), `horizontalSpace`, `verticalSpace` |
| `SectionHeader` | `level` (one/two), `size` (default/small), `title`, `subtitle`, `icon`, `actionLabel`, `onAction` |
| `ListItem` | `size` (small/medium/large), `style` (plain/contained), `title`, `subtitle`, `leftColumn`, `rightItems`, `divider` |
| `InfoCard` | `orientation` (horizontal/vertical), `style` (elevated/outlined/filled), `icon`, `eyebrow`, `title`, `description`, `caption`, `actions` |
| `Alert` | `type` (neutral/info/success/warning/critical), `title`, `subtitle`, `icon`, `actions` |
| `Snackbar` | `type` (default/error/success/warning/branded), `message`, `icon`, `action` |

### Component usage

```tsx
// 1. Import CSS variables (once, globally)
import 'design-tokens/dist/css/variables.css';

// 2. Import components
import { Button, Tag, Alert } from 'design-tokens';

<Button variant="primary" size="medium">Save</Button>
<Tag type="success">Active</Tag>
<Alert type="info" title="Heads up" subtitle="Something changed." />
```

## Development

### Prerequisites
- Node.js >= 18

### Install
```bash
npm install
```

### Build components
```bash
npm run build
```

### Build tokens
```bash
npm run tokens:build
```

### Watch for changes
```bash
npm run tokens:watch
```

### Full sync (extract from source + build)
```bash
npm run tokens:sync
```

## Adding or editing tokens

All tokens live in `tokens/tokens.json` in [DTCG format](https://tr.designtokens.org/format/). After editing, run `npm run tokens:build` to regenerate all platform outputs.

Dark mode variants are defined inline using the `$extensions.mode.dark` field:
```json
"primary": {
  "$value": "#161616",
  "$type": "color",
  "$extensions": { "mode": { "dark": "#ffffff" } }
}
```

## Source of truth

Token values are kept in sync with the Figma file **Kardia — Customer App**. The Figma variables panel is the design source of truth. When Figma variables are updated, `tokens.json` should be updated and rebuilt accordingly.
