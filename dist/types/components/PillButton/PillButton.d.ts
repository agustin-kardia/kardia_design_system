import React from 'react';
export type PillButtonVariant = 'primary' | 'secondary';
export type PillButtonSize = 'small' | 'medium';
export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: PillButtonVariant;
    size?: PillButtonSize;
    iconOnly?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
}
export declare function PillButton({ variant, size, iconOnly, leftIcon, rightIcon, disabled, className, style, children, ...props }: PillButtonProps): import("react/jsx-runtime").JSX.Element;
