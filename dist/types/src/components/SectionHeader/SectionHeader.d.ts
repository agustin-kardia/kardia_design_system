import React from 'react';
export type SectionHeaderLevel = 'one' | 'two';
export type SectionHeaderSize = 'default' | 'small';
export interface SectionHeaderProps {
    level?: SectionHeaderLevel;
    size?: SectionHeaderSize;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}
export declare function SectionHeader({ level, size, title, subtitle, icon, actionLabel, onAction, className, }: SectionHeaderProps): import("react/jsx-runtime").JSX.Element;
