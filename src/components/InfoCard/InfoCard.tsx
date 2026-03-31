import React from 'react';
import styles from './InfoCard.module.css';

export type InfoCardOrientation = 'horizontal' | 'vertical';
export type InfoCardStyle = 'elevated' | 'outlined' | 'filled';

export interface InfoCardProps {
  orientation?: InfoCardOrientation;
  style?: InfoCardStyle;
  icon?: React.ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  caption?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function InfoCard({
  orientation = 'horizontal',
  style = 'outlined',
  icon,
  eyebrow,
  title,
  description,
  caption,
  actions,
  className,
}: InfoCardProps) {
  const isHorizontal = orientation === 'horizontal';

  const content = (
    <div className={[styles.contentCol, isHorizontal ? styles.contentColHorizontal : ''].filter(Boolean).join(' ')}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <div className={styles.titleGroup}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );

  return (
    <div
      className={[
        styles.root,
        styles[orientation],
        styles[style],
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {icon && <span className={styles.iconSlot}>{icon}</span>}
      {isHorizontal ? (
        <>
          {content}
          {actions && <div className={styles.actionsH}>{actions}</div>}
        </>
      ) : (
        <div className={styles.verticalRow}>
          {content}
          {actions && <div className={styles.actionsV}>{actions}</div>}
        </div>
      )}
    </div>
  );
}
