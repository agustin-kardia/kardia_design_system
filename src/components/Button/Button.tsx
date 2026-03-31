import React from 'react';
import styles from './Button.module.css';

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

const iconClass: Record<ButtonSize, string> = {
  small: styles.iconSm,
  medium: styles.iconMd,
  large: styles.iconLg,
  xlarge: styles.iconLg,
};

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
  return (
    <button
      disabled={disabled}
      className={[
        styles.root,
        styles[size],
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      style={style}
      {...props}
    >
      {leftIcon && <span className={iconClass[size]}>{leftIcon}</span>}
      <span className={styles.label}>{children}</span>
      {rightIcon && <span className={iconClass[size]}>{rightIcon}</span>}
    </button>
  );
}
