export type DividerIntensity = 'normal' | 'high';
export interface DividerProps {
    intensity?: DividerIntensity;
    horizontalSpace?: boolean;
    verticalSpace?: boolean;
    className?: string;
}
export declare function Divider({ intensity, horizontalSpace, verticalSpace, className, }: DividerProps): import("react/jsx-runtime").JSX.Element;
