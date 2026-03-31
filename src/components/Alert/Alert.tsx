import React from 'react';
import styles from './Alert.module.css';

export type AlertType = 'neutral' | 'info' | 'success' | 'warning' | 'critical';

export interface AlertProps {
  type?: AlertType;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const colorClass: Record<AlertType, string> = {
  neutral:  styles.colorNeutral,
  info:     styles.colorInfo,
  success:  styles.colorSuccess,
  warning:  styles.colorWarning,
  critical: styles.colorCritical,
};

export function Alert({
  type = 'neutral',
  title,
  subtitle,
  icon,
  actions,
  className,
}: AlertProps) {
  return (
    <div
      className={[styles.root, styles[type], className ?? ''].filter(Boolean).join(' ')}
    >
      {icon && <span className={styles.iconSlot}>{icon}</span>}
      <div className={[styles.body, colorClass[type]].join(' ')}>
        <div className={styles.textGroup}>
          <p className={styles.titleText}>{title}</p>
          {subtitle && <p className={styles.subtitleText}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
}
