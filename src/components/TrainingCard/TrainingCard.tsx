import React from 'react';
import styles from './TrainingCard.module.css';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

export interface TrainingCardProps {
  coachImage?: string;
  coachName: string;
  sessionType: string;
  specialTag?: string;
  date: string;
  duration: string;
  music?: string;
  spotsUsed: number;
  spotsTotal: number;
  onCheckin?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  className?: string;
}

export function TrainingCard({
  coachImage,
  coachName,
  sessionType,
  specialTag,
  date,
  duration,
  music,
  spotsUsed,
  spotsTotal,
  onCheckin,
  onClick,
  className,
}: TrainingCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} onClick={onClick}>
      <div className={styles.image}>
        <img
          src={coachImage || 'https://placehold.co/200x200/2A2A2A/fff?text=Coach'}
          alt={coachName}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.typeRow}>
            <Icon name="sports_gymnastics" size={20} weight={300} variant="rounded" fill={0} color="var(--color-text-branded)" />
            <span className={styles.typeName}>{sessionType}</span>
            {specialTag && <span className={styles.specialTag}>{specialTag}</span>}
          </div>
          <p className={styles.coachName}>{coachName}</p>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <Icon name="calendar_today" size={20} weight={300} variant="rounded" fill={0} color="var(--color-icon-primary)" />
              <span className={styles.infoText}>{date}</span>
            </div>
            <div className={styles.infoRow}>
              <Icon name="timer" size={20} weight={300} variant="rounded" fill={0} color="var(--color-icon-primary)" />
              <span className={styles.infoText}>{duration}</span>
            </div>
            {music && (
              <div className={styles.infoRow}>
                <Icon name="play_circle" size={20} weight={300} variant="rounded" fill={0} color="var(--color-icon-primary)" />
                <span className={styles.infoText}>{music}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.spots}>
          <span className={styles.spotsIcon}>
            <Icon name="group" size={24} weight={300} variant="rounded" fill={0} color="var(--color-icon-primary)" />
          </span>
          <p className={styles.spotsCount}>{spotsUsed}/{spotsTotal}</p>
        </div>

        <div className={styles.checkin}>
          <Button
            size="xlarge"
            variant="primary"
            onClick={(e) => { e.stopPropagation(); onCheckin?.(e); }}
          >
            Check-in
          </Button>
        </div>
      </div>
    </div>
  );
}
