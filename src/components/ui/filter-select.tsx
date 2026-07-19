"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./filter-select.module.css";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterSelect({ options, value, onChange, className }: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div
      ref={containerRef}
      className={`${styles.container}${className ? ` ${className}` : ""}`}
    >
      <button
        type="button"
        className={`${styles.trigger}${isOpen ? ` ${styles.triggerOpen}` : ""}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selected?.label || "Select..."}</span>
        <svg
          className={`${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <ul className={styles.menu} role="listbox" aria-label="Filter options">
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                tabIndex={0}
                aria-selected={value === opt.value}
                className={`${styles.item}${value === opt.value ? ` ${styles.itemSelected}` : ""}`}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
              >
                {opt.label}
                {value === opt.value && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}