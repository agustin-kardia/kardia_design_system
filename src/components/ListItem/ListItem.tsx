import React from 'react';
import styles from './ListItem.module.css';

export type ListItemSize = 'small' | 'medium' | 'large';
export type ListItemStyle = 'plain' | 'contained';

export interface ListItemProps {
  size?: ListItemSize;
  style?: ListItemStyle;
  title: string;
  subtitle?: string;
  tertiaryText?: string;
  leftColumn?: React.ReactNode;
  rightItems?: React.ReactNode;
  divider?: boolean;
  className?: string;
}

export function ListItem({
  size = 'large',
  style = 'plain',
  title,
  subtitle,
  tertiaryText,
  leftColumn,
  rightItems,
  divider = false,
  className,
}: ListItemProps) {
  const isSmall = size === 'small';
  const iconSlotClass = isSmall ? styles.iconSlotSm : styles.iconSlotMd;

  return (
    <div
      className={[
        styles.root,
        style === 'contained' ? styles.contained : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      <div className={[styles.row, styles[size]].join(' ')}>
        {leftColumn && (
          <div className={styles.leftCol}>
            <span className={iconSlotClass}>{leftColumn}</span>
          </div>
        )}
        <div className={styles.textCol}>
          <p className={isSmall ? styles.titleSm : styles.titleMd}>{title}</p>
          {subtitle && (
            <p className={isSmall ? styles.subtitleSm : styles.subtitleMd}>{subtitle}</p>
          )}
        </div>
        {(tertiaryText || rightItems) && (
          <div className={styles.rightCol}>
            {tertiaryText && (
              <span className={styles.tertiaryText}>{tertiaryText}</span>
            )}
            {rightItems && (
              <div className={styles.rightItems}>{rightItems}</div>
            )}
          </div>
        )}
      </div>
      {style === 'plain' && divider && (
        <div className={styles.dividerLine} />
      )}
    </div>
  );
}
