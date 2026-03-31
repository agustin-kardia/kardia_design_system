import React from 'react';

export type AlertType = 'neutral' | 'info' | 'success' | 'warning' | 'critical';

export interface AlertProps {
  type?: AlertType;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const typeBg: Record<AlertType, string> = {
  neutral:  'var(--color-base-low)',
  info:     'var(--color-feedback-info-light)',
  success:  'var(--color-feedback-success-light)',
  warning:  'var(--color-feedback-warning-light)',
  critical: 'var(--color-feedback-branded-light)',
};

const typeTextColor: Record<AlertType, string> = {
  neutral:  'var(--color-text-primary)',
  info:     '#00496b',
  success:  '#004f21',
  warning:  '#864611',
  critical: '#710020',
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
      className={['flex flex-row items-start gap-4 p-[var(--spacing-large)] rounded-[var(--border-radius-xlarge)]', className ?? ''].join(' ')}
      style={{ background: typeBg[type] }}
    >
      {icon && (
        <span className="shrink-0 inline-flex items-center justify-center size-6">
          {icon}
        </span>
      )}
      <div className="flex flex-col flex-1 gap-2 min-w-0" style={{ color: typeTextColor[type] }}>
        <div className="flex flex-col gap-1 leading-[1.5] w-full">
          <p className="font-[Archivo] font-semibold text-base w-full">{title}</p>
          {subtitle && (
            <p className="font-[Archivo] font-medium text-sm w-full">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-start">{actions}</div>
        )}
      </div>
    </div>
  );
}
