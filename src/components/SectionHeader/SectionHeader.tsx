import React from 'react';
import styles from './SectionHeader.module.css';

export type SectionHeaderLevel = 'one' | 'two';
export type SectionHeaderSize = 'default' | 'small';

export interface SectionHeaderProps {
  level?: SectionHeaderLevel;
  size?: SectionHeaderSize;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeader({
  level = 'one',
  size = 'default',
  title,
  subtitle,
  icon,
  actionLabel,
  onAction,
  className,
}: SectionHeaderProps) {
  if (level === 'two') {
    return (
      <div className={[styles.levelTwo, className ?? ''].filter(Boolean).join(' ')}>
        <p className={[styles.levelTwoTitle, size === 'small' ? styles.levelTwoSmall : styles.levelTwoDefault].join(' ')}>
          {title}
        </p>
      </div>
    );
  }

  const isDefault = size === 'default';

  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.content}>
        <div className={[styles.titleRow, isDefault ? styles.titleRowDefault : styles.titleRowSmall].join(' ')}>
          {icon && (
            <span className={isDefault ? styles.iconSlotDefault : styles.iconSlotSmall}>{icon}</span>
          )}
          <p className={[styles.title, isDefault ? styles.titleDefault : styles.titleSmall].join(' ')}>
            {title}
          </p>
        </div>
        {isDefault && subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <button className={styles.action} onClick={onAction}>
          <span className={isDefault ? styles.actionTextDefault : styles.actionTextSmall}>{actionLabel}</span>
          <span className={isDefault ? styles.actionIconDefault : styles.actionIconSmall} aria-hidden>›</span>
        </button>
      )}
    </div>
  );
}
