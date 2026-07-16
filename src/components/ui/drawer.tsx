"use client";

import React, { useEffect } from "react";
import styles from "./drawer.module.css";

interface DrawerProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function Drawer({ onClose, title, children }: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <aside className={styles.drawer} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close drawer">
            <XIcon />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </aside>
    </>
  );
}
