import React from 'react';

export type LinkSize = 'small' | 'medium' | 'large';
export type LinkWeight = 'semibold' | 'medium';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: LinkSize;
  weight?: LinkWeight;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const sizeStyles: Record<LinkSize, { text: string; icon: string }> = {
  small:  { text: 'text-xs',  icon: 'size-5' },
  medium: { text: 'text-sm',  icon: 'size-5' },
  large:  { text: 'text-base', icon: 'size-6' },
};

export function Link({
  size = 'small',
  weight = 'semibold',
  leftIcon,
  rightIcon,
  className,
  style,
  children,
  ...props
}: LinkProps) {
  const { text, icon } = sizeStyles[size];
  const fontWeight = weight === 'semibold' ? 'font-semibold' : 'font-medium';

  function handleMouseEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    (e.currentTarget as HTMLElement).style.borderBottomColor = 'currentColor';
  }
  function handleMouseLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
  }
  function handleMouseDown(e: React.MouseEvent<HTMLAnchorElement>) {
    (e.currentTarget as HTMLElement).style.opacity = '0.75';
  }
  function handleMouseUp(e: React.MouseEvent<HTMLAnchorElement>) {
    (e.currentTarget as HTMLElement).style.opacity = '';
  }

  return (
    <a
      className={[
        'inline-flex items-center gap-1 font-[Archivo] text-[var(--color-text-branded)] border-b border-transparent transition-colors select-none',
        text,
        fontWeight,
        className ?? '',
      ].join(' ')}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {leftIcon && <span className={`shrink-0 inline-flex items-center justify-center ${icon}`}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={`shrink-0 inline-flex items-center justify-center ${icon}`}>{rightIcon}</span>}
    </a>
  );
}
