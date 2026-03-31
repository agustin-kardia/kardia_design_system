import React from 'react';

export type DividerIntensity = 'normal' | 'high';

export interface DividerProps {
  intensity?: DividerIntensity;
  horizontalSpace?: boolean;
  verticalSpace?: boolean;
  className?: string;
}

export function Divider({
  intensity = 'normal',
  horizontalSpace = false,
  verticalSpace = false,
  className,
}: DividerProps) {
  const lineColor = intensity === 'high'
    ? 'bg-[var(--color-border-high)] border border-[var(--color-border-high)]'
    : 'bg-[var(--color-border-normal)]';

  if (verticalSpace) {
    return (
      <div className={['flex flex-col items-start w-full py-[var(--spacing-small)]', className ?? ''].join(' ')}>
        <div className={['h-px w-full shrink-0', lineColor].join(' ')} />
      </div>
    );
  }

  if (horizontalSpace) {
    return (
      <div className={['flex flex-col items-start h-px w-full px-[var(--spacing-large)]', className ?? ''].join(' ')}>
        <div className={['flex-1 min-h-px min-w-px w-full', lineColor].join(' ')} />
      </div>
    );
  }

  return (
    <div className={['relative h-px w-full', className ?? ''].join(' ')}>
      <div className={['absolute inset-0', lineColor].join(' ')} />
    </div>
  );
}
