import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  value?: string;
  className?: string;
}

export function Radio({
  checked = false,
  onChange,
  label,
  disabled = false,
  name,
  value,
  className,
}: RadioProps) {
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
      <div
        className={[styles.circle, checked ? styles.checked : '']
          .filter(Boolean)
          .join(' ')}
      >
        <input
          type="radio"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          name={name}
          value={value}
          className={styles.input}
        />
        {checked && <span className={styles.dot} />}
      </div>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
