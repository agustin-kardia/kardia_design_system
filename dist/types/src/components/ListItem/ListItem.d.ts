import React from 'react';
export type ListItemSize = 'small' | 'medium' | 'large';
export type ListItemStyle = 'plain' | 'contained';
export interface ListItemProps {
    size?: ListItemSize;
    style?: ListItemStyle;
    title: string;
    subtitle?: string;
    tertiaryText?: string;
    leftColumn?: React.ReactNode;
    rightItems?: React.ReactNode;
    divider?: boolean;
    className?: string;
}
export declare function ListItem({ size, style, title, subtitle, tertiaryText, leftColumn, rightItems, divider, className, }: ListItemProps): import("react/jsx-runtime").JSX.Element;
