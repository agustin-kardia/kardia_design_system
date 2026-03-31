import React from 'react';

export type SnackbarType = 'default' | 'error' | 'success' | 'warning' | 'branded';

export interface SnackbarProps {
  type?: SnackbarType;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const typeStyles: Record<SnackbarType, { bg: string; text: string }> = {
  default:  { bg: 'bg-[var(--color-base-highest)]',        text: 'text-[var(--color-text-inverted)]' },
  branded:  { bg: 'bg-[var(--color-base-branded)]',        text: 'text-[var(--color-text-contained)]' },
  error:    { bg: 'bg-[var(--color-feedback-error)]',      text: 'text-[var(--color-text-contained)]' },
  success:  { bg: 'bg-[var(--color-feedback-success)]',    text: 'text-[var(--color-text-primary)]' },
  warning:  { bg: 'bg-[var(--color-feedback-warning)]',    text: 'text-[var(--color-text-primary)]' },
};

export function Snackbar({
  type = 'default',
  message,
  icon,
  action,
  className,
}: SnackbarProps) {
  const { bg, text } = typeStyles[type];

  return (
    <div
      className={[
        'flex items-center gap-[var(--spacing-large)] p-[var(--spacing-large)] rounded-[var(--border-radius-xlarge)] min-h-14 w-full max-w-[600px]',
        bg,
        className ?? '',
      ].join(' ')}
    >
      <div className="flex flex-1 gap-[var(--spacing-large)] items-center min-w-0">
        {icon && <span className="shrink-0 size-6">{icon}</span>}
        <p className={['flex-1 font-[Archivo] font-semibold text-base leading-[1.5]', text].join(' ')}>
          {message}
        </p>
      </div>
      {action && (
        <div className="flex items-start shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
