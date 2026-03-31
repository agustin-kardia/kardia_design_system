export type IconSize = 16 | 20 | 24;
export type IconFill = 0 | 1;
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;
export type IconVariant = 'outlined' | 'rounded' | 'sharp';
export interface IconProps {
    /** Material Symbols icon name, e.g. "home", "favorite", "arrow_forward" */
    name: string;
    size?: IconSize;
    fill?: IconFill;
    weight?: IconWeight;
    variant?: IconVariant;
    color?: string;
    className?: string;
}
export declare function Icon({ name, size, fill, weight, variant, color, className, }: IconProps): import("react/jsx-runtime").JSX.Element;
