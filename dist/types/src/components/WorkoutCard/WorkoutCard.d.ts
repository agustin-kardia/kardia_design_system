import React from 'react';
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
export declare function WorkoutCard({ participantName, participantImage, sensorId, variant, kardiaPoints, calories, intensityPercent, onEdit, className, children, }: WorkoutCardProps): import("react/jsx-runtime").JSX.Element;
