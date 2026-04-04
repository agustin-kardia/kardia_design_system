import React from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    children: React.ReactNode;
}
export declare function Button({ variant, size, leftIcon, rightIcon, fullWidth, disabled, className, style, children, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
