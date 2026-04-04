import React from 'react';
export type SnackbarType = 'default' | 'error' | 'success' | 'warning' | 'branded';
export interface SnackbarProps {
    type?: SnackbarType;
    message: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}
export declare function Snackbar({ type, message, icon, action, className }: SnackbarProps): import("react/jsx-runtime").JSX.Element;
