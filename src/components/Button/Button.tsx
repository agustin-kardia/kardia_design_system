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

const sizeInlineStyles: Record<ButtonSize, React.CSSProperties> = {
  small:  { height: 32,  paddingLeft: 12, paddingRight: 12, gap: 6,  fontSize: 14 },
  medium: { height: 40,  paddingLeft: 12, paddingRight: 12, gap: 8,  fontSize: 16 },
  large:  { height: 48,  paddingLeft: 16, paddingRight: 16, gap: 8,  fontSize: 16 },
  xlarge: { height: 56,  paddingLeft: 20, paddingRight: 20, gap: 8,  fontSize: 20 },
};

const iconSizePx: Record<ButtonSize, number> = {
  small: 16, medium: 20, large: 24, xlarge: 24,
};

function getVariantStyle(variant: ButtonVariant, disabled: boolean): React.CSSProperties {
  if (disabled) {
    return {
      background: variant === 'primary' ? 'var(--color-interaction-primary-disabled)' : undefined,
      color: 'var(--color-text-disabled)',
      border: variant === 'secondary' ? '1px solid var(--color-border-high)' : undefined,
      cursor: 'not-allowed',
    };
  }
  if (variant === 'primary') {
    return { background: 'var(--color-interaction-primary-enabled)', color: 'var(--color-text-contained)' };
  }
  if (variant === 'secondary') {
    return { color: 'var(--color-text-primary)', border: '1px solid var(--color-border-high)' };
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
    if (isSecondary) el.style.borderColor = 'var(--color-border-high)';
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

  const iconSize = iconSizePx[size];

  return (
    <button
      disabled={disabled}
      className={[className ?? ''].join(' ').trim() || undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Archivo, sans-serif',
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: 'var(--border-radius-action)',
        width: fullWidth ? '100%' : undefined,
        transition: 'background 0.15s, opacity 0.15s',
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        flexShrink: 0,
        ...sizeInlineStyles[size],
        ...getVariantStyle(variant, !!disabled),
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {leftIcon && (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: iconSize, height: iconSize, flexShrink: 0 }}>
          {leftIcon}
        </span>
      )}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}</span>
      {rightIcon && (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: iconSize, height: iconSize, flexShrink: 0 }}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}
