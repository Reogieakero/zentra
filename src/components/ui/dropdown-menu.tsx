"use client";

import { useState, useRef, useEffect, type ReactNode, type MouseEvent } from "react";
import styles from "./dropdown-menu.module.css";

export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
}

export function DropdownMenu({ trigger, items, align = "end", className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | Event) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container}${className ? ` ${className}` : ""}`}
    >
      <div
        role="button"
        tabIndex={0}
        className={styles.trigger}
        onClick={() => setIsOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsOpen((o) => !o); } }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <ul
            className={`${styles.menu} ${align === "start" ? styles.menuStart : styles.menuEnd}`}
            role="menu"
          >
            {items.map((item, i) => (
              <li key={i} role="none">
                <button
                  role="menuitem"
                  className={`${styles.item}${item.danger ? ` ${styles.itemDanger}` : ""}${item.disabled ? ` ${styles.itemDisabled}` : ""}`}
                  onClick={() => { if (!item.disabled) { item.onClick(); setIsOpen(false); } }}
                  disabled={item.disabled}
                >
                  {item.icon && <span className={styles.icon}>{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
