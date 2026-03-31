
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

const variantClass: Record<IconVariant, string> = {
  outlined: 'material-symbols-outlined',
  rounded:  'material-symbols-rounded',
  sharp:    'material-symbols-sharp',
};

export function Icon({
  name,
  size = 24,
  fill = 0,
  weight = 400,
  variant = 'outlined',
  color = 'currentColor',
  className,
}: IconProps) {
  return (
    <span
      className={[variantClass[variant], className ?? ''].join(' ').trim()}
      style={{
        fontVariationSettings: `'opsz' ${size}, 'wght' ${weight}, 'FILL' ${fill}, 'GRAD' 0`,
        fontSize: size,
        lineHeight: 1,
        color,
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {name}
    </span>
  );
}
