import React from 'react';
export type AlertType = 'neutral' | 'info' | 'success' | 'warning' | 'critical';
export interface AlertProps {
    type?: AlertType;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}
export declare function Alert({ type, title, subtitle, icon, actions, className, }: AlertProps): import("react/jsx-runtime").JSX.Element;
