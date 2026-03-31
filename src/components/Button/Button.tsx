import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, string> = {
  small:  'h-8  px-3 gap-1.5 text-sm  rounded-[var(--border-radius-action)]',
  medium: 'h-10 px-3 gap-2  text-base rounded-[var(--border-radius-action)]',
  large:  'h-12 px-4 gap-2  text-base rounded-[var(--border-radius-action)]',
  xlarge: 'h-14 px-5 gap-2  text-base rounded-[var(--border-radius-action)]',
};

const iconSizes: Record<ButtonSize, string> = {
  small:  'size-4',
  medium: 'size-5',
  large:  'size-6',
  xlarge: 'size-6',
};

function getVariantClasses(variant: ButtonVariant, disabled: boolean): string {
  if (disabled) {
    if (variant === 'secondary') return 'border border-[var(--color-border-high)] cursor-not-allowed';
    return 'cursor-not-allowed';
  }
  if (variant === 'secondary') return 'border border-[var(--color-border-high)]';
  return '';
}

function getBaseStyle(variant: ButtonVariant, disabled: boolean): React.CSSProperties {
  if (disabled) {
    return {
      background: variant === 'primary' ? 'var(--color-interaction-primary-disabled)' : undefined,
      color: 'var(--color-text-disabled)',
    };
  }
  if (variant === 'primary') {
    return { background: 'var(--color-interaction-primary-enabled)', color: 'var(--color-text-contained)' };
  }
  if (variant === 'secondary') {
    return { color: 'var(--color-text-primary)' };
  }
  return { color: 'var(--color-text-branded)' };
}

export function Button({
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  className,
  style,
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    const el = e.currentTarget as HTMLElement;
    if (isPrimary) el.style.background = 'var(--color-interaction-primary-hover)';
    if (isSecondary) el.style.borderColor = 'var(--color-text-primary)';
    if (variant === 'tertiary') el.style.textDecoration = 'underline';
  }
  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    const el = e.currentTarget as HTMLElement;
    if (isPrimary) el.style.background = 'var(--color-interaction-primary-enabled)';
    if (isSecondary) el.style.borderColor = '';
    if (variant === 'tertiary') el.style.textDecoration = '';
  }
  function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    const el = e.currentTarget as HTMLElement;
    if (isPrimary) el.style.background = 'var(--color-interaction-primary-pressed)';
    if (isSecondary) el.style.background = 'var(--color-base-low)';
    if (variant === 'tertiary') el.style.opacity = '0.75';
  }
  function handleMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    const el = e.currentTarget as HTMLElement;
    if (isPrimary) el.style.background = 'var(--color-interaction-primary-hover)';
    if (isSecondary) el.style.background = '';
    if (variant === 'tertiary') el.style.opacity = '';
  }

  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-semibold font-[Archivo] transition-colors select-none',
        sizeStyles[size],
        getVariantClasses(variant, !!disabled),
        fullWidth ? 'w-full' : '',
        className ?? '',
      ].join(' ')}
      style={{ ...getBaseStyle(variant, !!disabled), ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {leftIcon && <span className={`shrink-0 inline-flex items-center justify-center ${iconSizes[size]}`}>{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className={`shrink-0 inline-flex items-center justify-center ${iconSizes[size]}`}>{rightIcon}</span>}
    </button>
  );
}
