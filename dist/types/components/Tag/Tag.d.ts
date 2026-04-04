import React from 'react';
export type TagType = 'default' | 'branded' | 'info' | 'success' | 'failure';
export type TagSize = 'small' | 'regular';
export interface TagProps {
    type?: TagType;
    size?: TagSize;
    icon?: React.ReactNode;
    iconOnly?: boolean;
    className?: string;
    children?: React.ReactNode;
}
export declare function Tag({ type, size, icon, iconOnly, className, children, }: TagProps): import("react/jsx-runtime").JSX.Element;
