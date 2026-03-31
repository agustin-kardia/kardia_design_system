import React from 'react';

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
    const textSize = size === 'small' ? 'text-sm' : 'text-base';
    return (
      <div className={['flex items-start pb-[var(--spacing-medium)] w-full', className ?? ''].join(' ')}>
        <p className={['flex-1 font-[Archivo] font-semibold text-[var(--color-text-secondary)] overflow-hidden text-ellipsis whitespace-nowrap', textSize].join(' ')}>
          {title}
        </p>
      </div>
    );
  }

  // Level one
  const isDefault = size === 'default';
  const titleSize = isDefault ? 'text-xl' : 'text-base';
  const iconSize = isDefault ? 'size-6' : 'size-5';
  const actionTextSize = isDefault ? 'text-sm' : 'text-xs';
  const actionIconSize = isDefault ? 'size-5' : 'size-4';

  return (
    <div className={['flex items-center gap-[var(--spacing-large)] pb-[var(--spacing-medium)] w-full', className ?? ''].join(' ')}>
      <div className="flex flex-1 flex-col gap-1 items-start min-w-0">
        <div className={['flex items-center gap-[var(--spacing-small)] w-full', isDefault ? 'items-start' : 'items-center'].join(' ')}>
          {icon && <span className={`shrink-0 inline-flex items-center justify-center ${iconSize}`}>{icon}</span>}
          <p className={['font-[Archivo] font-semibold text-[var(--color-text-primary)] overflow-hidden text-ellipsis whitespace-nowrap', titleSize].join(' ')}>
            {title}
          </p>
        </div>
        {isDefault && subtitle && (
          <p className="font-[Archivo] font-medium text-sm text-[var(--color-text-secondary)] w-full leading-[1.5]">
            {subtitle}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center shrink-0 font-[Archivo] font-semibold text-[var(--color-text-primary)] hover:underline"
        >
          <span className={actionTextSize}>{actionLabel}</span>
          <span className={`shrink-0 ${actionIconSize}`} aria-hidden>›</span>
        </button>
      )}
    </div>
  );
}
