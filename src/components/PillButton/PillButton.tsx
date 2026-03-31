import React from 'react';
import styles from './PillButton.module.css';

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

const iconClass: Record<PillButtonSize, string> = {
  small:  styles.iconSm,
  medium: styles.iconMd,
};

const sizeClass: Record<PillButtonSize, string> = {
  small:  styles.small,
  medium: styles.medium,
};

const iconOnlySizeClass: Record<PillButtonSize, string> = {
  small:  styles.smallIconOnly,
  medium: styles.mediumIconOnly,
};

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
  return (
    <button
      disabled={disabled}
      className={[
        styles.root,
        iconOnly ? iconOnlySizeClass[size] : sizeClass[size],
        styles[variant],
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
