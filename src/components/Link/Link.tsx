import React from 'react';
import styles from './Link.module.css';

export type LinkSize = 'small' | 'medium' | 'large';
export type LinkWeight = 'semibold' | 'medium';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: LinkSize;
  weight?: LinkWeight;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const iconClass: Record<LinkSize, string> = {
  small:  styles.iconSm,
  medium: styles.iconSm,
  large:  styles.iconLg,
};

const weightClass: Record<LinkWeight, string> = {
  semibold: styles.semibold,
  medium:   styles.medium_weight,
};

export function Link({
  size = 'small',
  weight = 'semibold',
  leftIcon,
  rightIcon,
  className,
  style,
  children,
  ...props
}: LinkProps) {
  return (
    <a
      className={[
        styles.root,
        styles[size],
        weightClass[weight],
        className ?? '',
      ].filter(Boolean).join(' ')}
      style={style}
      {...props}
    >
      {leftIcon && <span className={iconClass[size]}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={iconClass[size]}>{rightIcon}</span>}
    </a>
  );
}
