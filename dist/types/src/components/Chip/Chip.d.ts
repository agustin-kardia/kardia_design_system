import React from 'react';
export type ChipSize = 'small' | 'medium';
export type ChipState = 'idle' | 'selected' | 'disabled';
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ChipSize;
    state?: ChipState;
    iconOnly?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
}
export declare function Chip({ size, state, iconOnly, leftIcon, rightIcon, className, style, children, disabled, ...props }: ChipProps): import("react/jsx-runtime").JSX.Element;
