import styles from './Divider.module.css';

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
  const lineColorClass = intensity === 'high' ? styles.high : styles.normal;

  if (verticalSpace) {
    return (
      <div className={[styles.wrapper, styles.wrapperVerticalSpace, className ?? ''].filter(Boolean).join(' ')}>
        <div className={[styles.line, lineColorClass].join(' ')} />
      </div>
    );
  }

  if (horizontalSpace) {
    return (
      <div className={[styles.wrapper, styles.wrapperHorizontalSpace, className ?? ''].filter(Boolean).join(' ')}>
        <div className={[styles.lineFlex, lineColorClass].join(' ')} />
      </div>
    );
  }

  return (
    <div className={[styles.wrapper, styles.wrapperPlain, className ?? ''].filter(Boolean).join(' ')}>
      <div className={[styles.lineAbsolute, lineColorClass].join(' ')} />
    </div>
  );
}
