import React from 'react';
import styles from './WorkoutCard.module.css';
import { Icon } from '../Icon/Icon';
import { KardiaIsotipo } from '../../assets/logos/KardiaIsotipo';

export type WorkoutCardVariant = 'idle' | 'low' | 'medium' | 'high' | 'sensor-error' | 'no-sensor';

export interface WorkoutCardProps {
  participantName: string;
  participantImage?: string;
  sensorId?: number | null;
  variant?: WorkoutCardVariant;
  kardiaPoints?: number | null;
  calories?: number | null;
  intensityPercent?: number | null;
  onEdit?: (e: React.MouseEvent) => void;
  className?: string;
  /** Overlay content (e.g. animation layers) rendered inside the root */
  children?: React.ReactNode;
}

const variantClass: Record<WorkoutCardVariant, string> = {
  idle: styles.variantIdle,
  low: styles.variantLow,
  medium: styles.variantMedium,
  high: styles.variantHigh,
  'sensor-error': styles.variantSensorError,
  'no-sensor': styles.variantNoSensor,
};

function formatParticipantName(name: string): string {
  const trimmed = name.trim();
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace === -1) return trimmed;
  return `${trimmed.slice(0, lastSpace)} ${trimmed[lastSpace + 1]}.`;
}

export function WorkoutCard({
  participantName,
  participantImage,
  sensorId,
  variant = 'idle',
  kardiaPoints,
  calories,
  intensityPercent,
  onEdit,
  className,
  children,
}: WorkoutCardProps) {
  const displayName = formatParticipantName(participantName);
  const hasMetrics = kardiaPoints != null || calories != null;
  const showValues = variant === 'low' || variant === 'medium' || variant === 'high';

  return (
    <div
      className={[
        styles.root,
        variantClass[variant],
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}

      <div className={styles.image}>
        <img
          src={
            participantImage ||
            `https://placehold.co/108x108/2A2A2A/666?text=${participantName?.[0] || '?'}`
          }
          alt={participantName}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/108x108/2A2A2A/666?text=${participantName?.[0] || '?'}`;
          }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          <p className={styles.name}>{displayName}</p>
          <div className={styles.metrics}>
            <div className={styles.metricRow}>
              <KardiaIsotipo size={14} className={styles.kardiaIcon} />
              <span className={[styles.metricValue, !hasMetrics || !showValues ? styles.metricDimmed : ''].filter(Boolean).join(' ')}>
                {showValues && kardiaPoints != null ? Math.round(kardiaPoints) : ''}
              </span>
              <span className={[styles.metricUnit, !hasMetrics || !showValues ? styles.metricDimmed : ''].filter(Boolean).join(' ')}>
                puntos
              </span>
            </div>
            <div className={styles.metricRow}>
              <Icon
                name="local_fire_department"
                size={20}
                weight={300}
                variant="rounded"
                fill={showValues ? 1 : 0}
                color={showValues ? 'currentColor' : 'var(--color-icon-secondary)'}
              />
              <span className={[styles.metricValue, !hasMetrics || !showValues ? styles.metricDimmed : ''].filter(Boolean).join(' ')}>
                {showValues && calories != null ? Math.round(calories) : ''}
              </span>
              <span className={[styles.metricUnit, !hasMetrics || !showValues ? styles.metricDimmed : ''].filter(Boolean).join(' ')}>
                kcal
              </span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <button
            className={styles.editBtn}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(e);
            }}
            aria-label="Opciones"
          >
            <Icon
              name="more_horiz"
              size={24}
              weight={300}
              variant="rounded"
              fill={0}
              color="var(--color-icon-primary)"
            />
          </button>

          <div className={styles.valueArea}>
            {(variant === 'idle' || showValues) && (
              <p className={styles.bigNumber}>
                {variant === 'idle'
                  ? intensityPercent != null
                    ? intensityPercent
                    : sensorId != null
                      ? `#${sensorId}`
                      : '--'
                  : (intensityPercent ?? '--')}
              </p>
            )}
            {variant === 'sensor-error' && (
              <div className={styles.statusInfo}>
                <Icon
                  name="warning"
                  size={32}
                  weight={300}
                  variant="rounded"
                  fill={0}
                  color="var(--color-feedback-warning)"
                />
                <span className={styles.statusTextWarning}>Error del sensor</span>
              </div>
            )}
            {variant === 'no-sensor' && (
              <div className={styles.statusInfo}>
                <Icon
                  name="block"
                  size={32}
                  weight={300}
                  variant="rounded"
                  fill={0}
                  color="var(--color-text-secondary)"
                />
                <span className={styles.statusTextSecondary}>Sin sensor</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
