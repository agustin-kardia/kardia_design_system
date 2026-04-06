import React from 'react';
export type SwitchSize = 'small' | 'medium';
export interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: SwitchSize;
    label?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}
export declare function Switch({ checked, onChange, size, label, disabled, className, }: SwitchProps): import("react/jsx-runtime").JSX.Element;
