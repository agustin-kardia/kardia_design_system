import React from 'react';

export type PillButtonVariant = 'primary' | 'secondary';
export type PillButtonSize = 'small' | 'medium';

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillButtonVariant;
  size?: PillButtonSize;
  iconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const sizeStyles: Record<PillButtonSize, { base: string; icon: string; iconOnly: string }> = {
  small: {
    base: 'h-7 text-sm gap-1',
    icon: 'size-4',
    iconOnly: 'size-7 p-1.5',
  },
  medium: {
    base: 'h-10 text-base gap-2',
    icon: 'size-6',
    iconOnly: 'size-10 p-2',
  },
};

function getVariantClasses(variant: PillButtonVariant, disabled: boolean): string {
  if (disabled) {
    if (variant === 'primary') return 'cursor-not-allowed';
    return 'border border-[var(--color-border-normal)] cursor-not-allowed';
  }
  if (variant === 'secondary') {
    return 'border border-[var(--color-border-high)] text-[var(--color-text-primary)]';
  }
  return '';
}

function getBaseStyle(variant: PillButtonVariant, disabled: boolean): React.CSSProperties {
  if (disabled) {
    return {
      background: variant === 'primary' ? 'var(--color-interaction-primary-disabled)' : undefined,
      color: 'var(--color-text-disabled)',
    };
  }
  if (variant === 'primary') {
    return {
      background: 'var(--color-interaction-primary-enabled)',
      color: 'var(--color-text-contained)',
    };
  }
  return {};
}

export function PillButton({
  variant = 'primary',
  size = 'medium',
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled = false,
  className,
  style,
  children,
  ...props
}: PillButtonProps) {
  const sizes = sizeStyles[size];
  const isPrimary = variant === 'primary';

  function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    if (!disabled && isPrimary) {
      (e.currentTarget as HTMLElement).style.background = 'var(--color-interaction-primary-hover)';
    }
  }
  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    if (!disabled && isPrimary) {
      (e.currentTarget as HTMLElement).style.background = 'var(--color-interaction-primary-enabled)';
    }
  }
  function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    if (!disabled && isPrimary) {
      (e.currentTarget as HTMLElement).style.background = 'var(--color-interaction-primary-pressed)';
    }
  }
  function handleMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
    if (!disabled && isPrimary) {
      (e.currentTarget as HTMLElement).style.background = 'var(--color-interaction-primary-hover)';
    }
  }

  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-semibold font-[Archivo] transition-colors select-none rounded-[var(--border-radius-action)]',
        iconOnly ? sizes.iconOnly : `px-3 ${sizes.base}`,
        getVariantClasses(variant, !!disabled),
        className ?? '',
      ].join(' ')}
      style={{ ...getBaseStyle(variant, !!disabled), ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {!iconOnly && leftIcon && <span className={`shrink-0 inline-flex items-center justify-center ${sizes.icon}`}>{leftIcon}</span>}
      {iconOnly ? (
        <span className={`shrink-0 inline-flex items-center justify-center ${sizes.icon}`}>{leftIcon ?? children}</span>
      ) : (
        <span className="truncate">{children}</span>
      )}
      {!iconOnly && rightIcon && <span className={`shrink-0 inline-flex items-center justify-center ${sizes.icon}`}>{rightIcon}</span>}
    </button>
  );
}
