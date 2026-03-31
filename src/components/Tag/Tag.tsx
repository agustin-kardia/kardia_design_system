import React from 'react';
import styles from './Tag.module.css';

export type TagType = 'default' | 'branded' | 'info' | 'success' | 'failure';
export type TagSize = 'small' | 'regular';

export interface TagProps {
  type?: TagType;
  size?: TagSize;
  icon?: React.ReactNode;
  iconOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Tag({
  type = 'default',
  size = 'regular',
  icon,
  iconOnly = false,
  className,
  children,
}: TagProps) {
  const sizeClass = size === 'small' ? styles.small : styles.regular;
  const iconPaddingClass = size === 'small' ? styles.smallIconPadding : styles.regularIconPadding;

  if (iconOnly && icon) {
    return (
      <div
        className={[styles.iconOnlyRoot, styles[type], className ?? ''].filter(Boolean).join(' ')}
      >
        <span className={[styles.iconOnlyInner, styles[type], iconPaddingClass].join(' ')}>
          <span className={styles.iconSlot}>{icon}</span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={[
        styles.root,
        sizeClass,
        styles[type],
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {icon && <span className={styles.iconSlot}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </div>
  );
}
