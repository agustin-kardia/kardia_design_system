import React from 'react';

export type TagType = 'default' | 'branded' | 'info' | 'success' | 'failure';
export type TagSize = 'small' | 'regular';

export interface TagProps {
  type?: TagType;
  size?: TagSize;
  icon?: React.ReactNode;
  iconOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const typeTokens: Record<TagType, { bg: string; iconBg: string; color: string }> = {
  default: {
    bg:     'var(--color-base-low)',
    iconBg: 'var(--color-base-low)',
    color:  'var(--color-text-primary)',
  },
  branded: {
    bg:     'var(--color-feedback-branded-light)',
    iconBg: 'var(--color-feedback-branded-light)',
    color:  'var(--color-text-branded)',
  },
  info: {
    bg:     'var(--color-feedback-info-light)',
    iconBg: 'var(--color-feedback-info-light)',
    color:  'var(--color-text-information)',
  },
  success: {
    bg:     'var(--color-feedback-success-light)',
    iconBg: 'var(--color-feedback-success-light)',
    color:  'var(--color-text-success)',
  },
  failure: {
    bg:     'var(--color-feedback-error-light)',
    iconBg: 'var(--color-feedback-error-light)',
    color:  'var(--color-text-error)',
  },
};

export function Tag({
  type = 'default',
  size = 'regular',
  icon,
  iconOnly = false,
  className,
  children,
}: TagProps) {
  const { bg, iconBg, color } = typeTokens[type];
  const isSmall = size === 'small';
  const height = isSmall ? 'h-5' : 'h-6';
  const outerPx = isSmall ? 'px-0.5' : 'px-1';
  const iconPadding = isSmall ? 'p-0.5' : 'p-1';

  if (iconOnly && icon) {
    return (
      <div
        className={['inline-flex items-center justify-center rounded-[var(--border-radius-small)]', className ?? ''].join(' ')}
        style={{ background: bg }}
      >
        <span
          className={['inline-flex items-center justify-center rounded-[var(--border-radius-small)]', iconPadding].join(' ')}
          style={{ background: iconBg }}
        >
          <span className="size-4 inline-flex items-center justify-center shrink-0">{icon}</span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={[
        'inline-flex items-center gap-0.5 rounded-[var(--border-radius-small)]',
        height,
        outerPx,
        className ?? '',
      ].join(' ')}
      style={{ background: bg, color }}
    >
      {icon && (
        <span className="size-4 inline-flex items-center justify-center shrink-0">{icon}</span>
      )}
      <span className="inline-flex items-center justify-center px-1 font-[Archivo] font-medium text-[10px] leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}
