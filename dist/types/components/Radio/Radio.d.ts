import React from 'react';
export interface RadioProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: React.ReactNode;
    disabled?: boolean;
    name?: string;
    value?: string;
    className?: string;
}
export declare function Radio({ checked, onChange, label, disabled, name, value, className, }: RadioProps): import("react/jsx-runtime").JSX.Element;
