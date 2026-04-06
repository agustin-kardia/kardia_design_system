import React from 'react';
export interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: React.ReactNode;
    disabled?: boolean;
    indeterminate?: boolean;
    className?: string;
}
export declare function Checkbox({ checked, onChange, label, disabled, indeterminate, className, }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
