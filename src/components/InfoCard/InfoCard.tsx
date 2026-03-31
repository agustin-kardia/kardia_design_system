import React from 'react';

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

function getContainerStyles(style: InfoCardStyle, orientation: InfoCardOrientation): string {
  const base = 'flex items-start rounded-[12px]';
  const layout = orientation === 'horizontal' ? 'flex-row gap-3 p-4' : 'flex-col gap-4 px-5 py-4';

  switch (style) {
    case 'elevated':
      return `${base} ${layout} bg-white shadow-[0px_2px_16px_0px_rgba(22,22,22,0.12)]`;
    case 'outlined':
      return `${base} ${layout} border border-[var(--color-border-high)]`;
    case 'filled':
      return `${base} ${layout} bg-[var(--color-base-lowest)]`;
  }
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
    <div className={['flex flex-1 flex-col items-start min-w-0', isHorizontal ? 'pl-1' : ''].join(' ')}>
      {eyebrow && (
        <p className="font-[Archivo] font-semibold text-xs text-[var(--color-text-branded)] leading-[1.5]">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col gap-0.5 items-start pb-1 w-full">
        <p className="font-[Archivo] font-semibold text-xl text-[var(--color-text-primary)] leading-[1.5] w-full">
          {title}
        </p>
        {description && (
          <p className="font-[Archivo] font-medium text-base text-[var(--color-text-secondary)] leading-[1.5] w-full">
            {description}
          </p>
        )}
      </div>
      {caption && (
        <p className="font-[Archivo] font-medium text-xs text-[var(--color-text-disabled)] leading-[1.5] whitespace-nowrap pt-1">
          {caption}
        </p>
      )}
    </div>
  );

  return (
    <div className={[getContainerStyles(style, orientation), className ?? ''].join(' ')}>
      {icon && <span className="size-6 shrink-0">{icon}</span>}
      {isHorizontal ? (
        <>
          {content}
          {actions && (
            <div className="flex gap-3 items-start self-stretch shrink-0">
              {actions}
            </div>
          )}
        </>
      ) : (
        <div className="flex gap-4 items-start w-full">
          {content}
          {actions && (
            <div className="flex gap-3 items-start shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
