import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { PillButton } from '../PillButton/PillButton';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';

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

export function Modal({
  open,
  onClose,
  eyebrow,
  title,
  description,
  showClose = true,
  primaryAction,
  secondaryAction,
  footerLeft,
  footer,
  children,
  className,
}: ModalProps) {
  // Trap Escape key
  React.useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const hasFooter =
    footer != null ||
    primaryAction != null ||
    secondaryAction != null ||
    footerLeft != null;

  const dialog = (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
      aria-hidden="true"
    >
      <div
        className={[styles.dialog, className ?? ''].filter(Boolean).join(' ')}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* ── Main content area ─────────────────────── */}
        <div className={styles.main}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerStart}>
              {eyebrow && (
                <p className={styles.eyebrow}>{eyebrow}</p>
              )}
              <div className={styles.heading}>
                <h2 id="modal-title" className={styles.title}>
                  {title}
                </h2>
              </div>
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
            {showClose && onClose && (
              <PillButton
                variant="secondary"
                size="medium"
                iconOnly
                leftIcon={
                  <Icon
                    name="close"
                    size={24}
                    weight={300}
                    variant="rounded"
                    fill={0}
                  />
                }
                onClick={onClose}
                aria-label="Cerrar"
              />
            )}
          </div>

          {/* Body */}
          {children != null && (
            <div className={styles.body}>{children}</div>
          )}
        </div>

        {/* ── Footer ────────────────────────────────── */}
        {hasFooter && (
          <div className={styles.footer}>
            {footer != null ? (
              footer
            ) : (
              <>
                <div className={styles.footerLeft}>{footerLeft}</div>
                <div className={styles.footerRight}>
                  {secondaryAction && (
                    <Button
                      variant="secondary-branded"
                      size="xlarge"
                      onClick={secondaryAction.onClick}
                      disabled={secondaryAction.disabled}
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                  {primaryAction && (
                    <Button
                      variant="primary"
                      size="xlarge"
                      onClick={primaryAction.onClick}
                      disabled={primaryAction.disabled}
                    >
                      {primaryAction.label}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document === 'undefined') return dialog;
  return ReactDOM.createPortal(dialog, document.body);
}
