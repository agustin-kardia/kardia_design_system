import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Dropdown.module.css';
import { Icon } from '../Icon/Icon';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  label,
  value,
  onChange,
  options,
  placeholder = 'Seleccionar',
  disabled = false,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [sheetStyle, setSheetStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;
  const hasValue = value != null && value !== '';

  function openSheet() {
    if (disabled) return;
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setSheetStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 1100,
      });
    }
    setOpen(true);
  }

  function handleSelect(val: string) {
    onChange?.(val);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  const sheet =
    open && typeof document !== 'undefined'
      ? ReactDOM.createPortal(
          <div ref={sheetRef} style={sheetStyle} className={styles.sheet}>
            {options.length === 0 ? (
              <div className={styles.empty}>Sin opciones</div>
            ) : (
              options.map((opt) => (
                <div
                  key={opt.value}
                  className={[
                    styles.option,
                    opt.value === value ? styles.optionSelected : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(opt.value);
                  }}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>,
          document.body
        )
      : null;

  return (
    <div
      className={[
        styles.root,
        disabled ? styles.disabled : '',
        open ? styles.open : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => (open ? setOpen(false) : openSheet())}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open ? setOpen(false) : openSheet();
          }
          if (e.key === 'Escape') setOpen(false);
        }}
      >
        <div className={styles.body}>
          {label && <span className={styles.label}>{label}</span>}
          <span className={[styles.value, !hasValue ? styles.placeholder : ''].filter(Boolean).join(' ')}>
            {hasValue ? selectedLabel ?? value : placeholder}
          </span>
        </div>
        <span className={[styles.chevron, open ? styles.chevronOpen : ''].filter(Boolean).join(' ')}>
          <Icon name="expand_more" size={24} weight={300} variant="rounded" fill={0} />
        </span>
      </div>
      {sheet}
    </div>
  );
}
