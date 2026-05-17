# Kardia Animation Guidelines

Kardia is a live, high-intensity workout display. Animations must feel purposeful and immediate — never decorative noise that distracts from real-time data.

---

## Three Categories

### 1. UI Transitions
Triggered by user actions: modal open, card enter, button press.

- **Goal:** Instant-feeling response. The user should never wait for the animation to finish interacting.
- **Duration:** 150–250ms
- **Easing:** `ease-out` for fades · `cubic-bezier(0.16, 1, 0.3, 1)` (spring) for spatial movement

### 2. Live-data Reactions
Triggered by sensor data events: intensity zone change, sensor connected.

- **Goal:** Energetic but non-distracting. Must not obscure the metric being updated.
- **Duration:** 400–500ms
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot spring) for scale · `ease-out` for flash

### 3. Milestone Celebrations
Triggered by threshold crossings: kardia points (10, 20, 30…), calories (100, 200…).

- **Goal:** Most expressive. Can travel across the card. Loop only if data is continuous (shimmer).
- **Duration:** 1.0–1.5s one-shot · 2s looping
- **Easing:** `ease-out` for travel/appear · `ease-in-out` for loops

---

## Duration Tiers

Use these — don't introduce arbitrary new values.

| Name      | Value     | Use                                      |
|-----------|-----------|------------------------------------------|
| micro     | 150ms     | Hover states, opacity flickers           |
| short     | 200ms     | Overlay fade-in                          |
| moderate  | 250ms     | Modal dialog slide-up, card enter        |
| emphasis  | 450ms     | Zone-change impact (scale + flash)       |
| long      | 1.0–1.2s  | Milestone travel animations              |
| loop      | 1.5–2.0s  | Shimmer / looping glows                  |

---

## Easing Reference

| Name             | Value                              | Use                                      |
|------------------|------------------------------------|------------------------------------------|
| ease-out         | `ease-out`                         | Standard fades and exits                 |
| spring           | `cubic-bezier(0.16, 1, 0.3, 1)`   | UI elements sliding into place (modal)   |
| overshoot spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Data-driven reactions (impact scale)   |
| ease-in-out      | `ease-in-out`                      | Symmetric loops (shimmer, ambient glows) |

---

## Where Animations Live

### Design System (`src/components/`)
Component-intrinsic entrance and exit animations. Defined in `ComponentName.module.css`, apply everywhere automatically.

```
Modal.module.css      → modal-overlay-in, modal-dialog-in
WorkoutCard.module.css → .impact (zone-change scale)
```

### Consuming App (`kardia_facility_app/src/App.css`)
Event-driven, workout-context overlays applied via the `className` prop on DS components. These are specific to the workout display and must not live in the DS.

```
participant-card-impact    → Zone goes up (green→orange, orange→red)
preworkout-ready-content   → Sensor connected pre-session (shimmer)
kardia-milestone           → Kardia points threshold crossed
calories-milestone         → Calories threshold crossed
```

---

## Rules

**Do:**
- Only animate `transform` and `opacity` — never `width`, `height`, `top`, `left`. These run on the GPU and never cause reflow.
- Use `forwards` fill mode on one-shot animations so the end state holds.
- Namespace `@keyframes` names (`modal-dialog-in`, not `slide-up`) to avoid collisions across CSS files.
- Wrap DS component animations in `@media (prefers-reduced-motion: no-preference)`.

**Don't:**
- Loop an animation on a metric value itself — only on overlay/highlight elements.
- Put workout-specific animations (impact, milestones, shimmer) in the DS. They belong in the consuming app.
- Invent new duration values — pick the closest tier.

---

## Motion Tokens

The `motion` bucket in `tokens/tokens.json` is reserved for when motion tokens are formally defined in Figma. Until then, use the literal values above.
