import React from 'react';
export interface ModalAction {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}
export interface ModalProps {
    /** Controls visibility */
    open: boolean;
    /** Called when overlay is clicked or close button is pressed */
    onClose?: () => void;
    /** Small branded label rendered above the title */
    eyebrow?: string;
    /** Required heading rendered at the top */
    title: string;
    /** Optional sub-heading below the title */
    description?: string;
    /** Show the close (×) pill button in the header — default true */
    showClose?: boolean;
    /** Primary (filled) action button */
    primaryAction?: ModalAction;
    /** Secondary (branded outline) action button */
    secondaryAction?: ModalAction;
    /** Optional content rendered on the left side of the footer */
    footerLeft?: React.ReactNode;
    /**
     * Fully custom footer — when provided, replaces the default
     * primaryAction / secondaryAction / footerLeft layout entirely.
     */
    footer?: React.ReactNode;
    /** Body content */
    children?: React.ReactNode;
    className?: string;
}
export declare function Modal({ open, onClose, eyebrow, title, description, showClose, primaryAction, secondaryAction, footerLeft, footer, children, className, }: ModalProps): import("react/jsx-runtime").JSX.Element | null;
