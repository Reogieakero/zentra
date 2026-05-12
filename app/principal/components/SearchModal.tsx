"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SearchModal.module.css";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 200); 
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 50);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`${styles.overlay} ${isClosing ? styles.fadeOut : ""}`} 
      onClick={handleClose}
    >
      <div 
        className={`${styles.modal} ${isClosing ? styles.bounceOut : ""}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search for anything..."
          />
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Recent Searches</h3>
            <div className={styles.item}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
              <span>Student Enrollment 2024</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.commands}>
            <div className={styles.command}>
              <kbd className={styles.kbd}>↵</kbd> <span>to select</span>
            </div>
            <div className={styles.command}>
              <kbd className={styles.kbd}>esc</kbd> <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}