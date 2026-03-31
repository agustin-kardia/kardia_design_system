import React from 'react';

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
  const iconSize = isSmall ? 'size-5' : 'size-6';

  const paddingClasses =
    isSmall
      ? 'gap-[var(--spacing-medium)] p-[var(--spacing-medium)]'
      : size === 'medium'
      ? 'gap-[var(--spacing-large)] px-[var(--spacing-large)] py-[var(--spacing-medium)]'
      : 'gap-[var(--spacing-large)] p-[var(--spacing-large)]';

  const titleSize = isSmall ? 'text-sm' : 'text-base';
  const subtitleSize = isSmall ? 'text-xs' : 'text-sm';

  return (
    <div
      className={[
        'flex flex-col items-start w-full',
        style === 'contained' ? 'border border-[var(--color-border-high)] rounded-[var(--border-radius-large)]' : '',
        className ?? '',
      ].join(' ')}
    >
      <div className={['flex items-start w-full', paddingClasses].join(' ')}>
        {leftColumn && (
          <div className="flex items-start self-stretch shrink-0">
            <span className={`shrink-0 ${iconSize}`}>{leftColumn}</span>
          </div>
        )}
        <div className="flex flex-1 flex-col gap-1 items-start font-[Archivo] font-medium leading-[1.5] min-w-0">
          <p className={['text-[var(--color-text-primary)] w-full', titleSize].join(' ')}>
            {title}
          </p>
          {subtitle && (
            <p className={['text-[var(--color-text-secondary)] w-full', subtitleSize].join(' ')}>
              {subtitle}
            </p>
          )}
        </div>
        {(tertiaryText || rightItems) && (
          <div className="flex gap-2 items-center shrink-0">
            {tertiaryText && (
              <span className="font-[Archivo] font-medium text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                {tertiaryText}
              </span>
            )}
            {rightItems && (
              <div className="flex gap-2 items-center">
                {rightItems}
              </div>
            )}
          </div>
        )}
      </div>
      {style === 'plain' && divider && (
        <div className="h-px w-full bg-[var(--color-border-high)]" />
      )}
    </div>
  );
}
