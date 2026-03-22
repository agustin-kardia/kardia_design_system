// GENERATED — do not edit by hand

import { useCallback } from 'react';

/**
 * React hook that reads CSS custom-property values at runtime.
 *
 * Useful when you need token values outside of CSS — for example
 * in a <canvas> renderer, react-native-web bridge, or chart library.
 *
 * @example
 *   const { getToken } = useTokens();
 *   const primary = getToken('color-brand-primary'); // → "#eb282c"
 */
export function useTokens() {
  const getToken = useCallback((name: string): string => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${name}`)
      .trim();
  }, []);

  const getColor = useCallback(
    (name: string): string => getToken(`color-${name}`),
    [getToken],
  );

  const getSpacing = useCallback(
    (name: string): number => parseFloat(getToken(`spacing-${name}`)) || 0,
    [getToken],
  );

  return { getToken, getColor, getSpacing } as const;
}

export default useTokens;
