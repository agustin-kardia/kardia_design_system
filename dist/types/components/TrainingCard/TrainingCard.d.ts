import React from 'react';
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
export declare function TrainingCard({ coachImage, coachName, sessionType, specialTag, date, duration, music, spotsUsed, spotsTotal, onCheckin, onClick, className, }: TrainingCardProps): import("react/jsx-runtime").JSX.Element;
