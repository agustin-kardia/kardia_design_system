import React from 'react';
import styles from './Switch.module.css';

export type SwitchSize = 'small' | 'medium';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  checked = false,
  onChange,
  size = 'medium',
  label,
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <label
      className={[
        styles.root,
        disabled ? styles.disabled : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={[
          styles.track,
          styles[size],
          checked ? styles.on : styles.off,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className={[styles.thumb, styles[`thumb_${size}`]].join(' ')} />
      </button>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
