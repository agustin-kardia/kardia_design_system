import React from 'react';
type Theme = 'light' | 'dark';
export declare function ThemeProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): {
    theme: Theme;
    toggle: () => void;
};
export {};
