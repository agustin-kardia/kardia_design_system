export interface DropdownOption {
    value: string;
    label: string;
}
export interface DropdownProps {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    options: DropdownOption[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}
export declare function Dropdown({ label, value, onChange, options, placeholder, disabled, className, }: DropdownProps): import("react/jsx-runtime").JSX.Element;
