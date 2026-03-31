import React from 'react';

export interface KardiaIsotipoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function KardiaIsotipo({ size, width, height, ...props }: KardiaIsotipoProps) {
  return (
    <svg
      viewBox="0 0 177.96 202.2"
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? width ?? 177.96}
      height={size ?? height ?? 202.2}
      {...props}
    >
      <polygon fill="currentColor" points="138.29 202.2 177.96 202.2 158.38 101.1 118.74 101.1 138.32 0 98.65 0 79.07 101.1 118.72 101.1 138.29 202.2"/>
      <polygon fill="currentColor" points="0 0 0 202.2 19.83 202.2 59.5 202.2 79.07 101.1 39.67 101.1 39.67 0 0 0"/>
    </svg>
  );
}