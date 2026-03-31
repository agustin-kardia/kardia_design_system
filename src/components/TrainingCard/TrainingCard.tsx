import React from 'react';
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
    <div
      className={['flex items-stretch overflow-hidden cursor-pointer transition-opacity hover:opacity-95', className ?? ''].join(' ')}
      style={{
        background: 'var(--color-base-lowest)',
        borderRadius: 'var(--border-radius-3xlarge)',
      }}
      onClick={onClick}
    >
      {/* Coach image */}
      <div className="shrink-0 overflow-hidden" style={{ width: 200, minHeight: 200 }}>
        <img
          src={coachImage || 'https://placehold.co/200x200/2A2A2A/fff?text=Coach'}
          alt={coachName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div
        className="flex flex-1 items-center"
        style={{
          gap: 'var(--spacing-3xlarge)',
          paddingTop: 'var(--spacing-2xlarge)',
          paddingBottom: 'var(--spacing-2xlarge)',
          paddingLeft: 'var(--spacing-3xlarge)',
          paddingRight: 'var(--spacing-8xlarge)',
        }}
      >
        {/* Left: session info */}
        <div className="flex flex-1 flex-col" style={{ gap: 'var(--spacing-small)' }}>

          {/* Session type + special tag */}
          <div className="flex items-center flex-wrap" style={{ gap: 'var(--spacing-xsmall)' }}>
            <Icon
              name="sports_gymnastics"
              size={20}
              weight={300}
              variant="rounded"
              fill={0}
              color="var(--color-text-branded)"
            />
            <span
              className="font-[Archivo] font-semibold text-sm leading-[1.5]"
              style={{ color: 'var(--color-text-branded)' }}
            >
              {sessionType}
            </span>
            {specialTag && (
              <span
                className="font-[Archivo] font-semibold text-xs leading-[1.5]"
                style={{
                  color: 'var(--color-text-branded)',
                  background: 'color-mix(in srgb, var(--color-brand-primary) 20%, transparent)',
                  borderRadius: 'var(--border-radius-action)',
                  padding: '2px var(--spacing-small)',
                }}
              >
                {specialTag}
              </span>
            )}
          </div>

          {/* Coach name */}
          <p
            className="font-[Archivo] font-semibold leading-[1.25]"
            style={{ fontSize: 'var(--typography-h4-600-font-size)', color: 'var(--color-text-primary)' }}
          >
            {coachName}
          </p>

          {/* Info rows */}
          <div className="flex flex-col" style={{ gap: 'var(--spacing-small)' }}>
            <div className="flex items-center" style={{ gap: 'var(--spacing-small)' }}>
              <Icon name="calendar_today" size={20} weight={300} variant="rounded" fill={0} color="var(--color-icon-secondary)" />
              <span className="font-[Archivo] font-medium text-sm leading-[1.5]" style={{ color: 'var(--color-text-primary)' }}>
                {date}
              </span>
            </div>
            <div className="flex items-center" style={{ gap: 'var(--spacing-small)' }}>
              <Icon name="timer" size={20} weight={300} variant="rounded" fill={0} color="var(--color-icon-secondary)" />
              <span className="font-[Archivo] font-medium text-sm leading-[1.5]" style={{ color: 'var(--color-text-primary)' }}>
                {duration}
              </span>
            </div>
            {music && (
              <div className="flex items-center" style={{ gap: 'var(--spacing-small)' }}>
                <Icon name="play_circle" size={20} weight={300} variant="rounded" fill={0} color="var(--color-icon-secondary)" />
                <span className="font-[Archivo] font-medium text-sm leading-[1.5]" style={{ color: 'var(--color-text-primary)' }}>
                  {music}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Middle: spots */}
        <div className="flex flex-1 items-center" style={{ gap: 'var(--spacing-medium)' }}>
          <Icon name="group" size={24} weight={300} variant="rounded" fill={0} color="var(--color-icon-primary)" />
          <p
            className="font-[Archivo] font-medium leading-[1.25] whitespace-nowrap"
            style={{ fontSize: 'var(--typography-h3-500-font-size)', color: 'var(--color-text-primary)' }}
          >
            {spotsUsed}/{spotsTotal}
          </p>
        </div>

        {/* Right: check-in button */}
        <div className="flex items-center shrink-0">
          <Button
            size="xlarge"
            variant="primary"
            leftIcon={
              <Icon name="calendar_add_on" size={24} weight={300} variant="rounded" fill={0} color="var(--color-icon-contained)" />
            }
            onClick={(e) => { e.stopPropagation(); onCheckin?.(e); }}
          >
            Check-in
          </Button>
        </div>
      </div>
    </div>
  );
}
