import React from 'react';
import styles from './Snackbar.module.css';

export type SnackbarType = 'default' | 'error' | 'success' | 'warning' | 'branded';

export interface SnackbarProps {
  type?: SnackbarType;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const textClass: Record<SnackbarType, string> = {
  default: styles.textInverted,
  branded: styles.textContained,
  error:   styles.textContained,
  success: styles.textPrimary,
  warning: styles.textPrimary,
};

export function Snackbar({ type = 'default', message, icon, action, className }: SnackbarProps) {
  return (
    <div
      className={[styles.root, styles[type], className ?? ''].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
    >
      <div className={styles.body}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <p className={[styles.message, textClass[type]].join(' ')}>{message}</p>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
