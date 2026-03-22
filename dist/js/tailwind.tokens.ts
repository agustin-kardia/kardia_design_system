// GENERATED — do not edit by hand

import tokens from './tokens';

type NestedStringRecord = { [key: string]: string | NestedStringRecord };

/**
 * Recursively converts a nested object of colour values into
 * CSS custom-property references that Tailwind can consume.
 *
 * Example:  { brand: { primary: '#eb282c' } }
 *       →   { brand: { primary: 'var(--color-brand-primary)' } }
 */
function cssVarColors(
  obj: Record<string, unknown>,
  prefix = 'color',
): NestedStringRecord {
  const result: NestedStringRecord = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = `${prefix}-${key}`;
    if (typeof value === 'string') {
      result[key] = `var(--${path})`;
    } else if (value && typeof value === 'object') {
      result[key] = cssVarColors(value as Record<string, unknown>, path);
    }
  }
  return result;
}

/**
 * Converts a flat or nested object of numeric values to px strings.
 */
function toPx(obj: Record<string, unknown>): Record<string, string | Record<string, string>> {
  const result: Record<string, string | Record<string, string>> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'number') {
      result[key] = `${value}px`;
    } else if (value && typeof value === 'object') {
      result[key] = toPx(value as Record<string, unknown>) as Record<string, string>;
    }
  }
  return result;
}

/**
 * Tailwind theme.extend object — import this in tailwind.config.ts:
 *
 *   import { tailwindTokens } from './dist/js/tailwind.tokens';
 *   export default { theme: { extend: tailwindTokens } };
 */
export const tailwindTokens = {
  colors: tokens.color ? cssVarColors(tokens.color as Record<string, unknown>) : {},
  spacing: tokens.spacing ? toPx(tokens.spacing as Record<string, unknown>) : {},
  borderRadius: (tokens as Record<string, unknown>)['border-radius']
    ? toPx((tokens as Record<string, unknown>)['border-radius'] as Record<string, unknown>)
    : {},
};

export default tailwindTokens;
