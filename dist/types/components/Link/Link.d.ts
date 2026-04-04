import React from 'react';
export type LinkSize = 'small' | 'medium' | 'large';
export type LinkWeight = 'semibold' | 'medium';
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    size?: LinkSize;
    weight?: LinkWeight;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}
export declare function Link({ size, weight, leftIcon, rightIcon, className, style, children, ...props }: LinkProps): import("react/jsx-runtime").JSX.Element;
