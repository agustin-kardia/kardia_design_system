import React from 'react';

export type ChipSize = 'small' | 'medium';
export type ChipState = 'idle' | 'selected' | 'disabled';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ChipSize;
  state?: ChipState;
  iconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

function getBorderStyle(state: ChipState): React.CSSProperties {
  if (state === 'disabled') return { borderColor: 'var(--color-interaction-primary-disabled)' };
  if (state === 'selected') return { borderColor: 'var(--color-interaction-primary-enabled)' };
  return { borderColor: 'var(--color-border-high)' };
}

function getTextStyle(state: ChipState): React.CSSProperties {
  if (state === 'disabled') return { color: 'var(--color-text-disabled)' };
  if (state === 'selected') return { color: 'var(--color-text-branded)' };
  return { color: 'var(--color-text-primary)' };
}

export function Chip({
  size = 'medium',
  state = 'idle',
  iconOnly = false,
  leftIcon,
  rightIcon,
  className,
  style,
  children,
  disabled,
  ...props
}: ChipProps) {
  const isDisabled = state === 'disabled' || disabled;
  const isSmall = size === 'small';
  const iconSize = isSmall ? 'size-4' : 'size-6';

  const sizeClasses = iconOnly
    ? isSmall ? 'size-7' : 'size-10'
    : isSmall ? 'h-7 px-2 gap-1' : 'h-10 px-4 gap-1';

  function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    if (isDisabled) return;
    (e.currentTarget as HTMLElement).style.background = 'var(--color-base-lowest)';
  }
  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    if (isDisabled) return;
    (e.currentTarget as HTMLElement).style.background = '';
  }
  function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    if (isDisabled) return;
    (e.currentTarget as HTMLElement).style.opacity = '0.75';
  }
  function handleMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
    if (isDisabled) return;
    (e.currentTarget as HTMLElement).style.opacity = '';
  }

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-[Archivo] border transition-colors select-none rounded-[var(--border-radius-action)]',
        sizeClasses,
        isSmall ? 'text-sm font-medium' : 'text-base font-semibold',
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className ?? '',
      ].join(' ')}
      style={{ ...getBorderStyle(state), ...getTextStyle(state), ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {!iconOnly && leftIcon && (
        <span className={`shrink-0 inline-flex items-center justify-center ${iconSize}`}>{leftIcon}</span>
      )}
      {iconOnly ? (
        <span className={`shrink-0 inline-flex items-center justify-center ${iconSize}`}>{leftIcon ?? children}</span>
      ) : (
        <span className="truncate">{children}</span>
      )}
      {!iconOnly && rightIcon && (
        <span className={`shrink-0 inline-flex items-center justify-center ${iconSize}`}>{rightIcon}</span>
      )}
    </button>
  );
}
