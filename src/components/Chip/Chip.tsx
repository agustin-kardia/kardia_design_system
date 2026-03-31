import React from 'react';
import styles from './Chip.module.css';

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

const iconClass: Record<ChipSize, string> = {
  small:  styles.iconSm,
  medium: styles.iconMd,
};

const sizeClass: Record<ChipSize, string> = {
  small:  styles.small,
  medium: styles.medium,
};

const iconOnlySizeClass: Record<ChipSize, string> = {
  small:  styles.smallIconOnly,
  medium: styles.mediumIconOnly,
};

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

  return (
    <button
      disabled={isDisabled}
      className={[
        styles.root,
        iconOnly ? iconOnlySizeClass[size] : sizeClass[size],
        styles[state],
        className ?? '',
      ].filter(Boolean).join(' ')}
      style={style}
      {...props}
    >
      {!iconOnly && leftIcon && (
        <span className={iconClass[size]}>{leftIcon}</span>
      )}
      {iconOnly ? (
        <span className={iconClass[size]}>{leftIcon ?? children}</span>
      ) : (
        <span className={styles.label}>{children}</span>
      )}
      {!iconOnly && rightIcon && (
        <span className={iconClass[size]}>{rightIcon}</span>
      )}
    </button>
  );
}
