import React from 'react';
export type InfoCardOrientation = 'horizontal' | 'vertical';
export type InfoCardStyle = 'elevated' | 'outlined' | 'filled';
export interface InfoCardProps {
    orientation?: InfoCardOrientation;
    style?: InfoCardStyle;
    icon?: React.ReactNode;
    eyebrow?: string;
    title: string;
    description?: string;
    caption?: string;
    actions?: React.ReactNode;
    className?: string;
}
export declare function InfoCard({ orientation, style, icon, eyebrow, title, description, caption, actions, className, }: InfoCardProps): import("react/jsx-runtime").JSX.Element;
